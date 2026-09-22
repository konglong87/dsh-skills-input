export const PLUGIN_ID = 'dsh-skills-input'
export const SLOT = 'conversation.input.right'
export const EXPLORER_ROUTE = '/api/dsh-skill-explorer/list'
export const SEARCH_LIMIT = 100

const SKILL_NAME = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
const PROJECT_LEVELS = new Set(['project-dsh', 'project-agents'])

export const CATALOG_ERROR = Object.freeze({
  missing: 'missing',
  failed: 'failed',
  invalid: 'invalid',
})

export class CatalogError extends Error {
  constructor(kind, message, options = {}) {
    super(message, options)
    this.name = 'CatalogError'
    this.kind = kind
    this.status = options.status
  }
}

export function isSkillName(name) {
  return typeof name === 'string' && SKILL_NAME.test(name)
}

export function normalizePath(value) {
  if (typeof value !== 'string' || value === '') return ''
  const normalized = value.replaceAll('\\', '/')
  return normalized.length > 1 ? normalized.replace(/\/+$/u, '') : normalized
}

export function isPathWithin(path, root) {
  const child = normalizePath(path)
  const parent = normalizePath(root)
  return child !== '' && parent !== '' && (child === parent || child.startsWith(`${parent}/`))
}

export function projectRootFor(cwd, projectRoots) {
  const normalizedCwd = normalizePath(cwd)
  if (!normalizedCwd || !Array.isArray(projectRoots)) return ''
  return projectRoots
    .map(normalizePath)
    .filter(root => root !== '' && isPathWithin(normalizedCwd, root))
    .sort((left, right) => right.length - left.length)[0] || ''
}

function rawSkillEntries(payload) {
  if (!payload || typeof payload !== 'object' || !Array.isArray(payload.groups)) {
    throw new CatalogError(CATALOG_ERROR.invalid, 'Skill Explorer 返回的数据格式无法识别')
  }
  return payload.groups.flatMap(group => {
    if (!group || typeof group !== 'object' || !Array.isArray(group.skills)) return []
    return group.skills.map(skill => ({ ...skill, level: skill.level ?? group.key }))
  })
}

function isCurrentContextSkill(skill, currentRoot) {
  if (!PROJECT_LEVELS.has(skill.level)) return true
  return currentRoot !== '' && isPathWithin(skill.path, currentRoot)
}

export function normalizeCatalog(payload, context = {}) {
  const entries = rawSkillEntries(payload)
  const currentRoot = projectRootFor(context.cwd ?? payload.cwd, payload.projectRoots ?? context.projectRoots)
  const seen = new Set()
  const skills = []
  for (const skill of entries) {
    if (!isSkillName(skill.name) || skill.userInvocable === false) continue
    if (!isCurrentContextSkill(skill, currentRoot) || seen.has(skill.name)) continue
    seen.add(skill.name)
    skills.push({
      name: skill.name,
      description: typeof skill.description === 'string' ? skill.description : '',
      whenToUse: typeof skill.whenToUse === 'string' ? skill.whenToUse : undefined,
      level: typeof skill.level === 'string' ? skill.level : 'unknown',
      path: typeof skill.path === 'string' ? skill.path : undefined,
      modelInvocable: skill.modelInvocable !== false,
    })
  }
  return {
    cwd: typeof payload.cwd === 'string' ? payload.cwd : context.cwd,
    complete: payload.complete !== false,
    skills,
    currentRoot,
  }
}

export async function loadCatalog({ cwd, fetchImpl = globalThis.fetch, signal } = {}) {
  if (typeof fetchImpl !== 'function') {
    throw new CatalogError(CATALOG_ERROR.failed, '当前环境不支持网络请求')
  }
  if (typeof cwd !== 'string' || cwd.trim() === '') {
    throw new CatalogError(CATALOG_ERROR.failed, '当前会话没有可用的工作区路径')
  }
  const url = `${EXPLORER_ROUTE}?cwd=${encodeURIComponent(cwd)}`
  let response
  try {
    response = await fetchImpl(url, {
      method: 'GET',
      credentials: 'same-origin',
      headers: { accept: 'application/json' },
      signal,
    })
  } catch (error) {
    if (signal?.aborted) throw error
    throw new CatalogError(CATALOG_ERROR.failed, `无法连接 Skill Explorer：${error instanceof Error ? error.message : String(error)}`, { cause: error })
  }
  let payload
  try {
    payload = await response.json()
  } catch (error) {
    throw new CatalogError(response.status === 404 ? CATALOG_ERROR.missing : CATALOG_ERROR.failed,
      response.status === 404
        ? '缺少 Skill Explorer 组件：未找到 /api/dsh-skill-explorer/list'
        : `Skill Explorer 返回了无法解析的响应（HTTP ${response.status}）`,
      { status: response.status, cause: error })
  }
  if (!response.ok) {
    const detail = typeof payload?.error === 'string' ? payload.error : `HTTP ${response.status}`
    const kind = response.status === 404 || response.status === 405 ? CATALOG_ERROR.missing : CATALOG_ERROR.failed
    const message = kind === CATALOG_ERROR.missing
      ? '缺少 Skill Explorer 组件：需要提供 /api/dsh-skill-explorer/list 接口'
      : `Skill Explorer 请求失败：${detail}`
    throw new CatalogError(kind, message, { status: response.status })
  }
  return normalizeCatalog(payload, { cwd })
}

function subsequencePositions(name, query) {
  const positions = []
  let cursor = 0
  for (const character of query) {
    const found = name.indexOf(character, cursor)
    if (found === -1) return null
    positions.push(found)
    cursor = found + 1
  }
  return positions
}

export function searchSkills(skills, query = '') {
  const normalizedQuery = query.trim().toLocaleLowerCase()
  if (!normalizedQuery) return [...skills].slice(0, SEARCH_LIMIT)
  return skills
    .map((skill, index) => {
      const name = skill.name.toLocaleLowerCase()
      const positions = subsequencePositions(name, normalizedQuery)
      if (positions === null) return null
      const prefix = name.startsWith(normalizedQuery) ? 0 : 1
      const spread = positions.at(-1) - positions[0] - normalizedQuery.length
      return { skill, index, score: [prefix, spread, positions[0], index] }
    })
    .filter(Boolean)
    .sort((left, right) => left.score[0] - right.score[0]
      || left.score[1] - right.score[1]
      || left.score[2] - right.score[2]
      || left.score[3] - right.score[3])
    .slice(0, SEARCH_LIMIT)
    .map(item => item.skill)
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/gu, '\\$&')
}

export function containsSkillInvocation(draft, name) {
  if (!isSkillName(name)) return false
  return new RegExp(`(?:^|\\s)/${escapeRegExp(name)}(?=\\s|$)`, 'u').test(draft)
}

export function leadingSlashCommand(draft) {
  const firstLine = draft.split(/\r?\n/u).find(line => line.trim() !== '')?.trimStart() ?? ''
  const match = /^\/([a-z0-9]+(?:-[a-z0-9]+)*)(?:\s|$)/u.exec(firstLine)
  return match?.[1] ?? null
}

export function insertSkillInvocation(draft, name) {
  if (!isSkillName(name)) {
    return { kind: 'conflict', draft, reason: 'Skill 名称格式无效' }
  }
  if (containsSkillInvocation(draft, name)) {
    return { kind: 'unchanged', draft }
  }
  const existingCommand = leadingSlashCommand(draft)
  if (existingCommand !== null && existingCommand !== name) {
    return {
      kind: 'conflict',
      draft,
      reason: `当前草稿已有 /${existingCommand} 斜杠命令，未插入 /${name}，避免产生歧义`,
    }
  }
  const separator = draft === '' || draft.endsWith('\n') ? '' : '\n'
  return { kind: 'inserted', draft: `${draft}${separator}/${name} ` }
}

import assert from 'node:assert/strict'
import { test } from 'node:test'
import {
  containsSkillInvocation,
  insertSkillInvocation,
  normalizeCatalog,
  projectRootFor,
  searchSkills,
} from '../src/model.js'

const skills = [
  { name: 'code-review', description: 'Review code' },
  { name: 'commit-helper', description: 'Commit changes' },
  { name: 'deploy', description: 'Deploy safely' },
]

test('normalizes grouped explorer data and keeps only current user-invocable skills', () => {
  const catalog = normalizeCatalog({
    cwd: '/work/repo',
    projectRoots: ['/work/repo', '/work/other'],
    complete: true,
    groups: [
      {
        key: 'project-agents',
        skills: [
          { name: 'local', description: 'Local', path: '/work/repo/.agents/skills/local/SKILL.md', userInvocable: true },
          { name: 'other', description: 'Other', path: '/work/other/.agents/skills/other/SKILL.md', userInvocable: true },
          { name: 'model-only', description: 'Hidden', path: '/work/repo/.agents/skills/model-only/SKILL.md', userInvocable: false },
        ],
      },
      { key: 'user-agents', skills: [{ name: 'global', description: 'Global', userInvocable: true }] },
      { key: 'runtime', skills: [{ name: 'local', description: 'Duplicate', userInvocable: true }] },
    ],
  })
  assert.equal(catalog.currentRoot, '/work/repo')
  assert.deepEqual(catalog.skills.map(skill => skill.name), ['local', 'global'])
})

test('selects the deepest current project root without reading the filesystem', () => {
  assert.equal(projectRootFor('/work/repo/packages/app', ['/work/repo', '/work/repo/packages/app']), '/work/repo/packages/app')
})

test('searches by case-insensitive ordered subsequence with prefix priority', () => {
  assert.deepEqual(searchSkills(skills, 'co').map(skill => skill.name), ['code-review', 'commit-helper'])
  assert.deepEqual(searchSkills(skills, 'dp').map(skill => skill.name), ['deploy'])
  assert.deepEqual(searchSkills(skills, '').map(skill => skill.name), ['code-review', 'commit-helper', 'deploy'])
})

test('inserts a skill invocation without sending or duplicating it', () => {
  assert.deepEqual(insertSkillInvocation('', 'code-review'), { kind: 'inserted', draft: '/code-review ' })
  assert.deepEqual(insertSkillInvocation('已有内容', 'code-review'), { kind: 'inserted', draft: '已有内容\n/code-review ' })
  assert.deepEqual(insertSkillInvocation('已有内容\n', 'code-review'), { kind: 'inserted', draft: '已有内容\n/code-review ' })
  assert.deepEqual(insertSkillInvocation('/code-review 已在草稿', 'code-review'), { kind: 'unchanged', draft: '/code-review 已在草稿' })
  assert.equal(containsSkillInvocation('说明 /code-review 后继续', 'code-review'), true)
})

test('rejects a different leading slash command to avoid ambiguity', () => {
  const result = insertSkillInvocation('/help 说明', 'code-review')
  assert.equal(result.kind, 'conflict')
  assert.match(result.reason, /已有 \/help/)
  assert.equal(result.draft, '/help 说明')
})

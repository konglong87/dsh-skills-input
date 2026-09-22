import assert from 'node:assert/strict'
import { test } from 'node:test'
import { CATALOG_ERROR, CatalogError, loadCatalog } from '../src/catalog.js'

function response(status, body) {
  return {
    ok: status >= 200 && status < 300,
    status,
    json: async () => body,
  }
}

test('loads the Explorer endpoint with the current cwd and same-origin credentials', async () => {
  let call
  const value = await loadCatalog({
    cwd: '/work/repo',
    fetchImpl: async (...args) => {
      call = args
      return response(200, { cwd: '/work/repo', projectRoots: ['/work/repo'], groups: [] })
    },
  })
  assert.match(call[0], /cwd=%2Fwork%2Frepo/)
  assert.equal(call[1].credentials, 'same-origin')
  assert.deepEqual(value.skills, [])
})

test('distinguishes a missing dependency from an empty catalog', async () => {
  await assert.rejects(
    loadCatalog({ cwd: '/work/repo', fetchImpl: async () => response(404, { error: 'missing' }) }),
    error => error instanceof CatalogError && error.kind === CATALOG_ERROR.missing,
  )
})

test('reports an HTTP failure instead of treating it as no skills', async () => {
  await assert.rejects(
    loadCatalog({ cwd: '/work/repo', fetchImpl: async () => response(500, { error: 'boom' }) }),
    error => error instanceof CatalogError && error.kind === CATALOG_ERROR.failed && /boom/.test(error.message),
  )
})

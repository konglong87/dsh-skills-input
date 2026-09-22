import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'
import vm from 'node:vm'
import React from 'react'
import * as ReactDOM from 'react-dom'
import { Context } from '@deepseek-ai/cordis'
import { PLUGIN_ID, SLOT } from '../src/model.js'

const source = readFileSync(new URL('../client.js', import.meta.url), 'utf8')

function loadPlugin(document) {
  let registration
  vm.runInNewContext(source, {
    document,
    window: { __ModuleLoader__: { load(value) { registration = value } } },
  })
  assert.equal(registration.id, PLUGIN_ID)
  return registration.factory((name) => {
    assert.ok(['react', 'react-dom'].includes(name))
    return name === 'react' ? React : ReactDOM
  })
}

test('declares slots and sessions, registers and unregisters the button', async () => {
  const ctx = new Context()
  const entries = []
  const styleNodes = []
  const originalDocument = globalThis.document
  globalThis.document = {
    head: { appendChild(node) { styleNodes.push(node) } },
    createElement() {
      return { dataset: {}, remove() { styleNodes.splice(0, styleNodes.length) } }
    },
  }
  const provider = ctx.plugin({
    apply(scope) {
      scope.provide('slots', {
        inject(name, callback) {
          assert.equal(name, SLOT)
          return callback()
        },
        register(options, component) {
          entries.push({ options, component })
          return () => { entries.splice(entries.findIndex(entry => entry.options.id === options.id), 1) }
        },
      })
      scope.provide('sessions', {
        list: { getSnapshot: () => ({ byId: {} }) },
      })
    },
  })
  try {
    await provider.await()
    const fiber = ctx.plugin(loadPlugin(globalThis.document))
    await fiber.await()
    assert.equal(entries.length, 1)
    assert.equal(entries[0].options.id, PLUGIN_ID)
    await fiber.dispose()
    assert.equal(entries.length, 0)
  } finally {
    await provider.dispose()
    globalThis.document = originalDocument
  }
})

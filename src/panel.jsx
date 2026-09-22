import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { RefreshCw, Search, X } from 'lucide-react'
import { insertSkillInvocation, searchSkills } from './model.js'
import { CatalogError } from './catalog.js'

const EDGE = 12
const GAP = 8
const PANEL_WIDTH = 390

function IconButton({ label, icon: Icon, ...props }) {
  return <button type="button" className="dsh-skills-input-icon" aria-label={label} title={label} {...props}>
    <Icon size={16} />
  </button>
}

function panelPosition(anchor) {
  const rect = anchor.current.getBoundingClientRect()
  const width = Math.min(PANEL_WIDTH, window.innerWidth - EDGE * 2)
  const above = rect.top - EDGE - GAP
  const below = window.innerHeight - rect.bottom - EDGE - GAP
  const up = above >= below
  return {
    width,
    left: Math.max(EDGE, Math.min(rect.right - width, window.innerWidth - width - EDGE)),
    maxHeight: Math.max(180, up ? above : below),
    ...(up ? { bottom: window.innerHeight - rect.top + GAP } : { top: rect.bottom + GAP }),
  }
}

export function SkillPanel({ anchor, onClose, getContext, load, useInput, inputActions }) {
  const input = useInput(value => value)
  const panel = useRef(null)
  const searchInput = useRef(null)
  const [position, setPosition] = useState(null)
  const [query, setQuery] = useState('')
  const [catalog, setCatalog] = useState(null)
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const [notice, setNotice] = useState('')
  const requestRef = useRef(0)
  const controllerRef = useRef(null)

  const refresh = () => {
    const requestId = ++requestRef.current
    controllerRef.current?.abort()
    const controller = new AbortController()
    controllerRef.current = controller
    const context = getContext()
    if (!context.sessionId || !context.cwd) {
      setStatus('failed')
      setError('当前没有可用的会话工作区')
      return () => controller.abort()
    }
    setStatus('loading')
    setError('')
    setNotice('')
    load({ cwd: context.cwd, signal: controller.signal })
      .then(value => {
        if (requestId !== requestRef.current) return
        setCatalog(value)
        setStatus('ready')
        setActiveIndex(0)
      })
      .catch(value => {
        if (controller.signal.aborted || requestId !== requestRef.current) return
        setStatus('failed')
        setError(value instanceof CatalogError ? value.message : String(value))
      })
    return () => controller.abort()
  }

  useEffect(() => {
    const dispose = refresh()
    return () => {
      dispose?.()
      controllerRef.current = null
    }
  }, [])

  useLayoutEffect(() => {
    const place = () => setPosition(panelPosition(anchor))
    place()
    window.addEventListener('resize', place)
    window.addEventListener('scroll', place, true)
    return () => {
      window.removeEventListener('resize', place)
      window.removeEventListener('scroll', place, true)
    }
  }, [anchor])

  useEffect(() => {
    searchInput.current?.focus()
  }, [])

  useEffect(() => {
    const outside = event => {
      if (!panel.current?.contains(event.target) && !anchor.current?.contains(event.target)) onClose()
    }
    document.addEventListener('pointerdown', outside)
    return () => document.removeEventListener('pointerdown', outside)
  }, [anchor, onClose])

  const items = searchSkills(catalog?.skills || [], query)
  const select = skill => {
    const result = insertSkillInvocation(input?.draft || '', skill.name)
    if (result.kind === 'conflict') {
      setNotice(result.reason)
      return
    }
    if (result.kind === 'inserted') inputActions.setDraft(result.draft)
    onClose()
  }

  const onSearchKeyDown = event => {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setActiveIndex(index => items.length ? (index + 1) % items.length : 0)
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setActiveIndex(index => items.length ? (index - 1 + items.length) % items.length : 0)
    } else if (event.key === 'Enter') {
      event.preventDefault()
      if (items[activeIndex]) select(items[activeIndex])
    } else if (event.key === 'Escape') {
      event.preventDefault()
      onClose()
    }
  }

  return createPortal(
    <section
      ref={panel}
      className="dsh-skills-input-panel"
      role="dialog"
      aria-label="选择 Skill"
      style={{ ...position, visibility: position ? 'visible' : 'hidden' }}
      onKeyDown={onSearchKeyDown}
    >
      <header className="dsh-skills-input-header">
        <strong>选择 Skill</strong>
        <div className="dsh-skills-input-actions">
          <IconButton label="刷新 Skill 列表" icon={RefreshCw} disabled={status === 'loading'} onClick={refresh} />
          <IconButton label="关闭 Skill 列表" icon={X} onClick={onClose} />
        </div>
      </header>
      <label className="dsh-skills-input-search">
        <Search size={15} aria-hidden="true" />
        <input
          ref={searchInput}
          type="search"
          aria-label="搜索 Skill"
          placeholder="搜索名称"
          value={query}
          onChange={event => { setQuery(event.target.value); setActiveIndex(0) }}
        />
      </label>
      {status === 'loading' && <p className="dsh-skills-input-status" role="status">加载 Skill 列表…</p>}
      {status === 'failed' && <p className="dsh-skills-input-status dsh-skills-input-error" role="alert">{error}</p>}
      {status === 'ready' && !items.length && <p className="dsh-skills-input-status" role="status">当前工作区没有可手动调用的 Skill</p>}
      {notice && <p className="dsh-skills-input-notice" role="alert">{notice}</p>}
      {status === 'ready' && items.length > 0 && (
        <ul className="dsh-skills-input-list" role="listbox" aria-label="Skill 列表">
          {items.map((skill, index) => (
            <li key={skill.name} role="option" aria-selected={index === activeIndex}>
              <button
                type="button"
                className={`dsh-skills-input-item${index === activeIndex ? ' is-active' : ''}`}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => select(skill)}
              >
                <strong>/{skill.name}</strong>
                <span>{skill.description || '暂无描述'}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
      {catalog?.complete === false && <p className="dsh-skills-input-warning" role="status">Skill Explorer 返回了不完整的目录，已显示当前能确认的项目。</p>}
    </section>,
    document.body,
  )
}

import React, { useEffect, useRef } from 'react'
import { Sparkles } from 'lucide-react'
import { loadCatalog } from './catalog.js'
import { PLUGIN_ID, SLOT } from './model.js'
import { SkillPanel } from './panel.jsx'
import styles from './styles.css'

export const inject = ['slots', 'sessions']

function currentSessionId(props) {
  return props.session?.sessionId || props.sessionId || null
}

function currentCwd(sessions, sessionId) {
  return sessions.list.getSnapshot().byId[sessionId]?.cwd || ''
}

function SkillButton(props) {
  const { sessions } = props
  const anchor = useRef(null)
  const [open, setOpen] = React.useState(false)

  useEffect(() => {
    if (!open) return undefined
    const onKeyDown = event => {
      if (event.key === 'Escape') {
        event.stopPropagation()
        setOpen(false)
        anchor.current?.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open])

  const close = () => {
    setOpen(false)
    anchor.current?.focus()
  }

  return <>
    <button
      ref={anchor}
      type="button"
      className="dsh-skills-input-button"
      aria-label="选择 Skill"
      title="选择 Skill"
      aria-haspopup="dialog"
      aria-expanded={open}
      onMouseDown={event => event.preventDefault()}
      onClick={() => setOpen(value => !value)}
    >
      <Sparkles size={15} aria-hidden="true" />
      <span>选择 Skill</span>
    </button>
    {open && (
      <SkillPanel
        {...props}
        anchor={anchor}
        onClose={close}
        getContext={() => {
          const sessionId = currentSessionId(props)
          return {
            sessionId,
            cwd: sessionId === null ? '' : currentCwd(sessions, sessionId),
          }
        }}
        load={loadCatalog}
      />
    )}
  </>
}

export function apply(ctx) {
  const sessions = ctx.sessions

  ctx.effect(() => {
    if (typeof document === 'undefined') return undefined
    const style = document.createElement('style')
    style.dataset.plugin = PLUGIN_ID
    style.textContent = styles
    document.head.appendChild(style)
    return () => style.remove()
  }, `${PLUGIN_ID}: styles`)

  ctx.effect(() => ctx.slots.inject(SLOT, () => ctx.slots.register({
    name: SLOT,
    id: PLUGIN_ID,
    order: 110,
  }, props => <SkillButton {...props} sessions={sessions} />)), `${PLUGIN_ID}: slot`)
}

import { Component, useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { StatusBar } from '../components/ui.jsx'
import { translate } from '../i18n/index.js'
import { useAppStore } from '../store/AppStore.jsx'

/* ------------------------------------------------------------ Error boundary */

/**
 * Catches a crash inside one micro-frontend's screen so the rest of the app keeps working
 * (GIGW: clear, recoverable error messages). Resets when the route changes.
 */
export class MfeBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }
  static getDerivedStateFromError(error) { return { error } }
  componentDidCatch(error) {
    // eslint-disable-next-line no-console
    console.error(`[${this.props.mfe}] screen crashed:`, error)
  }
  componentDidUpdate(prev) {
    if (prev.resetKey !== this.props.resetKey && this.state.error) this.setState({ error: null })
  }
  render() {
    if (!this.state.error) return this.props.children
    return <CrashScreen onRetry={() => this.setState({ error: null })} />
  }
}

function CrashScreen({ onRetry }) {
  const { language } = useAppStore()
  const t = (s) => translate(language, s)
  return (
    <div className="flex h-full flex-col bg-surface">
      <StatusBar variant="light" />
      <main className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
        <h1 tabIndex={-1} className="text-[1.25rem] font-semibold leading-7 text-ink">{t('Something went wrong')}</h1>
        <p className="text-[0.875rem] leading-5 text-ink-muted">{t('This screen couldn’t load. Your saved work is safe.')}</p>
        <div className="flex w-full max-w-[320px] flex-col gap-2 pt-3">
          <button type="button" onClick={onRetry} className="tap min-h-12 rounded-full bg-brand text-[0.9375rem] font-semibold text-white">{t('Try again')}</button>
          <a href="#/home" className="tap grid min-h-12 place-items-center rounded-full border border-line bg-white text-[0.9375rem] font-semibold text-ink-2">{t('Go to Home')}</a>
        </div>
      </main>
    </div>
  )
}

/* ------------------------------------------------------------ Loading skeleton */

/** Shown while a micro-frontend's screen downloads (first visit only). */
export function ScreenSkeleton() {
  return (
    <div className="flex h-full flex-col bg-surface" aria-busy="true" aria-live="polite">
      <StatusBar variant="light" />
      <div className="h-[68px] shrink-0 bg-appbar px-4 py-5"><div className="skeleton h-6 w-40" /></div>
      <div className="flex flex-col gap-3 p-4">
        <div className="skeleton h-7 w-3/5" />
        <div className="skeleton h-4 w-4/5" />
        <div className="skeleton mt-2 h-24 w-full rounded-2xl" />
        <div className="skeleton h-24 w-full rounded-2xl" />
        <div className="skeleton h-24 w-full rounded-2xl" />
      </div>
      <span className="sr-only">Loading…</span>
    </div>
  )
}

/* ------------------------------------------------------------ Titles & focus */

/**
 * On every navigation: sets document.title from the screen's heading (GIGW: every page has a
 * meaningful title), moves keyboard/screen-reader focus to that heading, and announces it.
 * Works for lazy screens by waiting until the heading exists.
 */
export function RouteAnnouncer() {
  const location = useLocation()
  const { language } = useAppStore()
  const [msg, setMsg] = useState('')
  const first = useRef(true)

  useEffect(() => {
    let tries = 0
    let timer
    const find = () => {
      const frame = document.getElementById('phone-frame')
      const pick = (sel) => [...(frame?.querySelectorAll(sel) ?? [])].find((n) => !n.closest('[data-statusbar],[aria-hidden="true"]') && n.innerText?.trim())
      const el = pick('h1') || pick('header h2, header p.font-semibold, header p.font-bold, main h2')
      if (!el && tries++ < 20) { timer = setTimeout(find, 100); return }
      const text = (el?.innerText || '').trim().replace(/\s+/g, ' ')
      const app = translate(language, 'Holistic Progress Card')
      document.title = text ? `${text} · ${app}` : app
      if (first.current) { first.current = false; return } // don't steal focus on first load
      if (el) {
        if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '-1')
        el.focus({ preventScroll: true })
        setMsg(text)
      }
    }
    timer = setTimeout(find, 120)
    return () => clearTimeout(timer)
  }, [location.pathname, language])

  return <p className="sr-only" role="status" aria-live="polite">{msg}</p>
}

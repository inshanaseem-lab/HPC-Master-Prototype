import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useNavigate } from 'react-router-dom'
import bgPattern from '../assets/common/bg-pattern.png'
import backIcon from '../assets/common/back.svg'
import sbSignalLight from '../assets/common/sb-signal-light.svg'
import sbWifiLight from '../assets/common/sb-wifi-light.svg'
import sbBatteryLight from '../assets/common/sb-battery-light.svg'
import sbSignalDark from '../assets/common/sb-signal-dark.svg'
import sbWifiDark from '../assets/common/sb-wifi-dark.svg'
import sbBatteryDark from '../assets/common/sb-battery-dark.svg'
import { useAppStore } from '../store/AppStore.jsx'
import { useT } from '../i18n/index.js'

const cx = (...c) => c.filter(Boolean).join(' ')
export { cx }

/* ---------------------------------------------------------------- Screen */

const BACKGROUNDS = {
  // Doodle pattern over warm grey (onboarding, most inner screens)
  pattern: { backgroundColor: '#f4f2ef', backgroundImage: `url(${bgPattern})`, backgroundSize: '180px 180px' },
  // Peach → grey gradient + pattern (home)
  gradient: {
    backgroundColor: '#f4f2ef',
    backgroundImage: `url(${bgPattern}), linear-gradient(180deg, #ffeee2 0%, #e8e7e3 100%)`,
    backgroundSize: '180px 180px, 100% 100%',
  },
  plain: { backgroundColor: '#f4f2ef' },
  white: { backgroundColor: '#ffffff' },
}

/**
 * One app screen. Header (status bar + app bar) stays fixed, body scrolls,
 * `footer` is pinned at the bottom with the home indicator.
 */
export function Screen({ bg = 'pattern', statusBar = 'dark', header, footer, children, className, bodyClassName, bodyRef }) {
  // When the pinned footer would take more than ~1/3 of the screen (large text, short phones),
  // it scrolls with the content instead, so there is always room to read (WCAG 1.4.10 reflow).
  const rootRef = useRef(null)
  const footRef = useRef(null)
  const [unpinned, setUnpinned] = useState(false)
  useLayoutEffect(() => {
    const root = rootRef.current, foot = footRef.current
    if (!root || !foot || typeof ResizeObserver === 'undefined') return
    const check = () => {
      const ratio = foot.offsetHeight / Math.max(1, root.clientHeight)
      setUnpinned((u) => (u ? ratio > 0.28 : ratio > 0.33))
    }
    const ro = new ResizeObserver(check)
    ro.observe(root); ro.observe(foot)
    check()
    return () => ro.disconnect()
  }, [unpinned, !!footer])
  const foot = footer && <footer ref={footRef} className="shrink-0">{footer}</footer>
  return (
    <div ref={rootRef} className={cx('flex h-full w-full flex-col overflow-hidden', className)} style={BACKGROUNDS[bg]}>
      <header className="shrink-0">
        <StatusBar variant={statusBar} />
        {header}
      </header>
      {/* tabIndex: keyboard users can scroll screens that have no controls (WCAG 2.1.1) */}
      <main ref={bodyRef} tabIndex={0} className={cx('no-scrollbar relative flex-1 overflow-y-auto', bodyClassName)}>
        {children}
        {unpinned && foot}
      </main>
      {!unpinned && foot}
    </div>
  )
}

/**
 * Phone status bar. `dark` = black bar/white text (inner screens), `light` = warm grey bar (home),
 * `clear` = transparent with white text (over a coloured hero).
 */
export function StatusBar({ variant = 'dark' }) {
  const dark = variant === 'dark' || variant === 'clear'
  const bar = { dark: 'bg-ink', light: 'bg-surface', clear: 'bg-transparent' }[variant]
  return (
    // Prototype device status bar: decorative, hidden from assistive tech
    <div aria-hidden="true" data-statusbar className={cx('relative z-10 flex shrink-0 items-center justify-between px-4 py-2', bar)}>
      <p className={cx('text-[0.875rem] font-semibold leading-5', dark ? 'text-white' : 'text-ink')}>9:30</p>
      <div className="flex items-center gap-1">
        <img alt="" width="16" height="11" src={dark ? sbSignalLight : sbSignalDark} />
        <img alt="" width="15" height="11" src={dark ? sbWifiLight : sbWifiDark} />
        <img alt="" width="24" height="11" src={dark ? sbBatteryLight : sbBatteryDark} />
      </div>
    </div>
  )
}

/** 68px top app bar with back chevron and title. */
export function TopAppBar({ title, subtitle, onBack, right, className }) {
  const navigate = useNavigate()
  const t = useT()
  return (
    <div className={cx('relative flex min-h-[68px] shrink-0 items-center bg-appbar py-2 pl-2 pr-4', className)}>
      <button
        aria-label={t('Back')}
        onClick={onBack ?? (() => navigate(-1))}
        className="tap grid size-11 place-items-center rounded-lg hover:bg-black/5"
      >
        <img alt="" width="20" height="20" src={backIcon} />
      </button>
      <div className="ml-3 min-w-0 flex-1">
        <h1 className="break-words text-[1.125rem] font-semibold leading-6 text-black">{title}</h1>
        {subtitle && <p className="break-words text-[0.75rem] leading-4 text-ink-muted">{subtitle}</p>}
      </div>
      {right}
    </div>
  )
}

/* --------------------------------------------------------------- Buttons */

export function PrimaryButton({ children, disabled, loading, className, ...props }) {
  return (
    <button
      disabled={disabled || loading}
      className={cx(
        'tap flex min-h-12 w-full items-center justify-center gap-2 rounded-full border px-6 text-[0.9375rem] font-medium leading-[1.375rem] transition-colors duration-200',
        disabled
          ? 'border-[#d6d3cf] bg-[#d6d3cf] text-[#8f8c95] active:scale-100'
          : 'border-brand bg-brand text-white hover:bg-brand-hover hover:shadow-[0_6px_16px_rgba(255,121,0,0.32)]',
        className,
      )}
      {...props}
    >
      {loading ? <Spinner /> : children}
    </button>
  )
}

export function OutlineButton({ children, className, ...props }) {
  return (
    <button
      className={cx(
        'tap flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-brand-700 bg-brand-50 px-4 py-3 text-[0.875rem] font-medium leading-[1.375rem] text-brand-700 hover:bg-[#ffe8d4]',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export function Spinner({ className }) {
  return <span className={cx('inline-block size-5 animate-spin rounded-full border-2 border-white/40 border-t-white', className)} />
}

/** Footer area with 24px bottom padding and the gesture home indicator. */
export function BottomActions({ children, className }) {
  return (
    <div className={cx('shrink-0 px-4 pb-6 pt-3', className)}>
      {children}
      <HomeIndicator />
    </div>
  )
}

export function HomeIndicator() {
  return (
    <div className="flex justify-center pt-3">
      <div className="h-1 w-10 rounded-full bg-[rgba(63,61,69,0.7)]" />
    </div>
  )
}

/* -------------------------------------------------------------- Overlays */

/** Keeps a node mounted while its exit animation plays. */
function usePresence(open, ms = 220) {
  const [mounted, setMounted] = useState(open)
  const [closing, setClosing] = useState(false)
  useEffect(() => {
    if (open) { setMounted(true); setClosing(false); return }
    if (!mounted) return
    setClosing(true)
    const t = setTimeout(() => { setMounted(false); setClosing(false) }, ms)
    return () => clearTimeout(t)
  }, [open]) // eslint-disable-line react-hooks/exhaustive-deps
  return { mounted, closing }
}

/** Overlays render into the phone frame, above the screen's header and footer. */
const overlay = (node) => createPortal(node, document.getElementById('phone-frame') ?? document.body)

/** Bottom sheet that slides up over the current screen (rendered inside the phone frame). */
export function Sheet({ open, onClose, children, className }) {
  const { mounted, closing } = usePresence(open)
  if (!mounted) return null
  return overlay(
    <div className="absolute inset-0 z-40 flex flex-col justify-end">
      <div
        className={cx('absolute inset-0 bg-black/40 transition-opacity duration-200', closing ? 'opacity-0' : 'animate-fade-in')}
        onClick={onClose}
      />
      <div
        className={cx(
          'relative max-h-[85%] overflow-y-auto rounded-t-3xl bg-white transition-transform duration-200',
          closing ? 'translate-y-full' : 'animate-sheet-up',
          className,
        )}
      >
        <div className="flex justify-center pt-2"><div className="h-1 w-10 rounded-full bg-line" /></div>
        {children}
      </div>
    </div>
  )
}

/** Centered dialog with a pop-in. */
export function Modal({ open, onClose, children, className }) {
  const { mounted, closing } = usePresence(open)
  if (!mounted) return null
  return overlay(
    <div className="absolute inset-0 z-40 grid place-items-center p-4">
      <div
        className={cx('absolute inset-0 bg-black/40 transition-opacity duration-200', closing ? 'opacity-0' : 'animate-fade-in')}
        onClick={onClose}
      />
      <div
        className={cx(
          'relative w-full rounded-2xl bg-white transition-all duration-200',
          closing ? 'scale-95 opacity-0' : 'animate-pop-in',
          className,
        )}
      >
        {children}
      </div>
    </div>
  )
}

/** Global toast, driven by `showToast()` from the store. */
export function ToastHost() {
  const { toast } = useAppStore()
  if (!toast) return null
  return (
    <div key={toast.id} role="status" aria-live="polite" className="pointer-events-none absolute inset-x-4 bottom-24 z-50 flex justify-center">
      <div
        className={cx(
          'animate-fade-up rounded-full px-4 py-2.5 text-[0.8125rem] font-medium text-white shadow-card',
          toast.tone === 'error' ? 'bg-[#b54a45]' : 'bg-ink',
        )}
      >
        {toast.message}
      </div>
    </div>
  )
}

/* --------------------------------------------------------------- Filters */

/**
 * Collapsible filter, e.g. All (40) / Submitted (12) / Not submitted (28). Closed, it is a single
 * row showing the current selection with a chevron; tapping it opens the other options as a list
 * underneath (never a row of buttons crammed together). The selected row fills solid ink/black —
 * matching how the design kit shows a selected option elsewhere — and orange is reserved for
 * primary actions, never used as a selection fill here.
 */
export function FilterChips({ options, value, onChange, className, label }) {
  const [open, setOpen] = useState(false)
  const current = options.find((o) => o.value === value) ?? options[0]
  return (
    <div className={cx('flex flex-col gap-2', className)}>
      <button
        type="button"
        aria-expanded={open}
        aria-label={label}
        onClick={() => setOpen((o) => !o)}
        className={cx(
          'tap-soft flex min-h-12 w-full items-center gap-3 rounded-xl border px-3.5 text-left text-[0.875rem] font-semibold transition-colors duration-200',
          open ? 'border-ink bg-ink text-white' : 'border-line bg-white text-ink-2 hover:border-[#d2cdc7] hover:bg-cream',
        )}
      >
        <span className="min-w-0 flex-1 truncate">{current.label}</span>
        {current.count != null && (
          <span className={cx('min-w-6 shrink-0 rounded-full px-1.5 text-center text-[0.75rem] font-bold leading-5 transition-colors', open ? 'bg-white/20 text-white' : 'bg-surface text-ink-muted')}>
            {current.count}
          </span>
        )}
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden
          className={cx('shrink-0 transition-transform duration-200', open && 'rotate-180')}>
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      {open && (
        <div role="radiogroup" aria-label={label} className="animate-fade-up flex flex-col gap-2">
          {options.map((o) => {
            const on = o.value === value
            return (
              <button
                key={o.value}
                type="button"
                role="radio"
                aria-checked={on}
                onClick={() => { onChange(o.value); setOpen(false) }}
                className={cx(
                  'tap-soft flex min-h-12 w-full items-center gap-3 rounded-xl border px-3.5 text-left text-[0.875rem] font-semibold transition-colors duration-200',
                  on ? 'border-ink bg-ink text-white' : 'border-line bg-white text-ink-2 hover:border-[#d2cdc7] hover:bg-cream',
                )}
              >
                <span className={cx('grid size-5 shrink-0 place-items-center rounded-full border-2 transition-colors', on ? 'border-white bg-white/15' : 'border-[#cfcac4] bg-white')}>
                  {on && <span className="size-2 animate-check-pop rounded-full bg-white" />}
                </span>
                <span className="min-w-0 flex-1 truncate">{o.label}</span>
                {o.count != null && (
                  <span
                    className={cx(
                      'min-w-6 shrink-0 rounded-full px-1.5 text-center text-[0.75rem] font-bold leading-5 transition-colors',
                      on ? 'bg-white/20 text-white' : 'bg-surface text-ink-muted',
                    )}
                  >
                    {o.count}
                  </span>
                )}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

/* ----------------------------------------------------------- Cover art */

/** Paper-plane trail (as on the login screen), sized for ~200px orange covers (teacher profile, student HPC). Static. */
export function CoverTrails() {
  return (
    <svg aria-hidden viewBox="0 0 412 214" preserveAspectRatio="xMidYMid slice" className="pointer-events-none absolute inset-0 h-full w-full">
      {/* kept to the right edge and the bottom strip so it never crosses the name or the switch */}
      <path d="M356 166 C340 184 318 194 296 198 C250 205 210 200 170 200 C130 200 100 204 70 204 C40 204 18 206 0 208"
        fill="none" stroke="#fff" strokeOpacity=".7" strokeWidth="2.2" strokeLinecap="round" strokeDasharray="0.1 7" />
      <circle cx="296" cy="198" r="9" fill="#fff" fillOpacity=".28" />
      <circle cx="296" cy="198" r="5.5" fill="#d7eef5" />
      <circle cx="170" cy="200" r="4.5" fill="#fde2a4" />
      <circle cx="70" cy="204" r="3.5" fill="#c9c6ff" />
      <circle cx="54" cy="44" r="3" fill="#fde2a4" />
      <path d="M340 150 L400 138 L366 162 Z" fill="#fff" />
      <path d="M400 138 L370 182 L366 162 Z" fill="#fde2a4" />
      <path d="M366 162 L370 182 L358 164 Z" fill="#7a3a12" />
      <g stroke="#c9c6ff" strokeWidth="2.2" strokeLinecap="round"><path d="M30 94v12M24 100h12" /></g>
      <g stroke="#f7c3d6" strokeWidth="2.2" strokeLinecap="round"><path d="M386 92v10M381 97h10" /></g>
    </svg>
  )
}

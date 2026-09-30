import { useEffect, useState } from 'react'
import { TopAppBar, cx } from '../../components/ui.jsx'
import { SECTIONS } from '../../student/data.js'
import { useT } from '../../i18n/index.js'

/* ------------------------------------------------------------------ Icons */

const Svg = ({ size = 24, className, children, strokeWidth = 2 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth}
    strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
    {children}
  </svg>
)
export const UserIcon = (p) => <Svg {...p}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></Svg>
export const ArrowRight = (p) => <Svg {...p}><path d="M5 12h14M13 6l6 6-6 6" /></Svg>
export const FileIcon = (p) => <Svg {...p}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6M8 13h8M8 17h5" /></Svg>
export const ClipboardIcon = (p) => (
  <Svg {...p}><rect x="8" y="2" width="8" height="4" rx="1" /><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /><path d="M9 12h6M9 16h4" /></Svg>
)
export const HelpCircle = (p) => <Svg {...p}><circle cx="12" cy="12" r="10" /><path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3M12 17h.01" /></Svg>
export const WifiOff = (p) => (
  <Svg {...p}><path d="M2 2l20 20M8.5 16.4a5 5 0 0 1 7 0M5 12.9a10 10 0 0 1 5.2-2.8M19 12.9a10 10 0 0 0-2.5-1.7M2 8.8a15 15 0 0 1 4.2-2.6M22 8.8A15 15 0 0 0 11.6 5M12 20h.01" /></Svg>
)
export const CheckVerified = (p) => (
  <Svg {...p}><path d="M9 12l2 2 4-4" /><path d="M12 2l2.4 1.8 3-.2.9 2.9 2.5 1.7-1 2.8 1 2.8-2.5 1.7-.9 2.9-3-.2L12 22l-2.4-1.8-3 .2-.9-2.9-2.5-1.7 1-2.8-1-2.8 2.5-1.7.9-2.9 3 .2z" /></Svg>
)
export const LogoutIcon = (p) => <Svg {...p}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" /></Svg>
export const Chevron = (p) => <Svg {...p}><path d="M9 6l6 6-6 6" /></Svg>

/* --------------------------------------------------------------- Pieces */

// Kit S01-02 section chip colours (tailwind tokens section-a…d)
const SECTION_CLS = {
  A: 'bg-section-a-bg text-section-a',
  B: 'bg-section-b-bg text-section-b',
  C: 'bg-section-c-bg text-section-c',
  D: 'bg-section-d-bg text-section-d',
}

/** "Section B · Group Project" badge in the section's colours. */
export function SectionBadge({ section }) {
  const t = useT()
  const s = SECTIONS[section]
  if (!s) return null
  return (
    <span className={cx('inline-flex min-h-[22px] items-center rounded-md px-2 py-0.5 text-[0.75rem] font-medium leading-[1.125rem]', SECTION_CLS[section])}>
      {t('Section {letter} · {name}', { letter: s.letter, name: t(s.name) })}
    </span>
  )
}

const TAG_TONES = {
  error: 'bg-danger-50 text-danger',
  warning: 'bg-[#fff4e0] text-[#a15c00]',
  success: 'bg-[#e6f2ea] text-[#1b6b34]',
  neutral: 'bg-[#f1efec] text-ink-2',
}
export function Tag({ tone = 'neutral', children, className }) {
  return (
    <span className={cx('inline-flex min-h-[22px] shrink-0 items-center rounded-md px-2 py-0.5 text-[0.75rem] font-medium leading-[1.125rem]', TAG_TONES[tone], className)}>
      {children}
    </span>
  )
}

export const initialsOf = (name) => name.split(' ').map((p) => p[0]).slice(0, 2).join('').toUpperCase()

export function Avatar({ name, className }) {
  return (
    <span className={cx('grid size-10 shrink-0 place-items-center rounded-full bg-[#ffe3cc] text-[0.875rem] font-semibold text-brand-700', className)}>
      {initialsOf(name)}
    </span>
  )
}

export function Overline({ children, className, tone = 'muted' }) {
  return (
    <p className={cx('text-[0.75rem] font-bold uppercase leading-4 tracking-[0.96px]', tone === 'brand' ? 'text-brand-600' : 'text-ink-muted', className)}>
      {children}
    </p>
  )
}

export function Card({ children, className, ...props }) {
  return <div className={cx('rounded-2xl border border-[#e5e6e1] bg-white', className)} {...props}>{children}</div>
}

/** Small button used inside cards ("Start", "View"). */
export function SmallButton({ variant = 'solid', children, className, ...props }) {
  return (
    <button
      className={cx(
        'tap inline-flex min-h-11 shrink-0 items-center justify-center rounded-full border px-4 py-1.5 text-[0.8125rem] font-medium transition-colors',
        variant === 'solid'
          ? 'border-brand bg-brand text-white hover:bg-brand-hover'
          : 'border-brand-700 bg-brand-50 text-brand-700 hover:bg-[#ffe8d4]',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}

/** Dashed empty-state box (8.1–8.4). */
export function EmptyBox({ icon, title, body, action, className }) {
  return (
    <div className={cx('flex animate-fade-up flex-col items-center gap-2 rounded-2xl border border-dashed border-[#cdcac5] bg-[#f1efec] px-5 py-8 text-center', className)}>
      {icon && (
        <span className="mb-1 grid size-12 place-items-center rounded-xl bg-white text-brand-700 shadow-[inset_0_0_0_1px_#e4e1dd]">{icon}</span>
      )}
      <p className="text-[0.9375rem] font-semibold leading-[1.375rem] text-ink">{title}</p>
      <p className="max-w-[17.5rem] text-[0.8125rem] leading-[1.1875rem] text-ink-muted">{body}</p>
      {action && <div className="pt-2">{action}</div>}
    </div>
  )
}

/** App bar used on student inner screens (board: #FFFBF9 with a hairline). */
export function StudentAppBar(props) {
  return <TopAppBar className="border-b border-[#f1efec] bg-[#fffbf9]" {...props} />
}

/** Tracks navigator.onLine via the online/offline events. */
export function useOnline() {
  const [online, setOnline] = useState(() => (typeof navigator === 'undefined' ? true : navigator.onLine))
  useEffect(() => {
    const on = () => setOnline(true)
    const off = () => setOnline(false)
    window.addEventListener('online', on)
    window.addEventListener('offline', off)
    return () => { window.removeEventListener('online', on); window.removeEventListener('offline', off) }
  }, [])
  return online
}

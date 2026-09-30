import { useNavigate } from 'react-router-dom'
import { BottomActions, OutlineButton, PrimaryButton, Sheet, cx } from '../../components/ui.jsx'
import { useDate, useT } from '../../i18n/index.js'
import { SECTIONS } from '../../student/data.js'
import { daysLeft } from './data.js'

export { FileIcon } from '../../student/HandbookRow.jsx'

/* ---------------------------------------------------------------- Icons */

const Svg = ({ size = 20, children, strokeWidth = 1.8 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {children}
  </svg>
)
export const ArrowLeftIcon = (p) => <Svg {...p}><path d="M19 12H5M12 19l-7-7 7-7" /></Svg>
export const CloseIcon = (p) => <Svg {...p}><path d="M18 6 6 18M6 6l12 12" /></Svg>
export const CheckIcon = (p) => <Svg strokeWidth={2.4} {...p}><path d="M20 6 9 17l-5-5" /></Svg>
export const TrashIcon = (p) => <Svg {...p}><path d="M3 6h18M8 6V4h8v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6M10 11v6M14 11v6" /></Svg>
export const HelpIcon = (p) => (
  <Svg {...p}><circle cx="12" cy="12" r="10" /><path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3M12 17h.01" /></Svg>
)
export const CameraIcon = (p) => (
  <Svg {...p}><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" /></Svg>
)
export const UploadIcon = (p) => <Svg {...p}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" /></Svg>
export const LinkIcon = (p) => (
  <Svg {...p}><path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7" /><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7" /></Svg>
)
export function VerifiedIcon({ size = 36 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2.5 14.4 4l2.8-.2.9 2.7 2.3 1.6-.9 2.7.9 2.7-2.3 1.6-.9 2.7-2.8-.2L12 21.5 9.6 20l-2.8.2-.9-2.7-2.3-1.6.9-2.7-.9-2.7 2.3-1.6.9-2.7 2.8.2z" />
      <path d="m8.5 12 2.4 2.4 4.6-4.8" />
    </svg>
  )
}

/* ----------------------------------------------------------- Navigation */

/** Go back if there is in-app history, otherwise to a fallback route. */
export function useGoBack() {
  const navigate = useNavigate()
  return (fallback = '/s/home', steps = 1) => {
    const idx = typeof window !== 'undefined' ? window.history.state?.idx ?? 0 : 0
    if (idx >= steps) navigate(-steps)
    else navigate(fallback, { replace: true })
  }
}

/* ------------------------------------------------------------- Header */

/** Student 68px app bar: back arrow or close (×), title, optional right label. */
export function AppBar({ title, right, close, onBack }) {
  const t = useT()
  const goBack = useGoBack()
  return (
    <div className="flex min-h-[68px] shrink-0 flex-wrap items-center gap-x-2 gap-y-0.5 border-b border-[#f1efec] bg-[#fffbf9] py-2 pl-2 pr-4">
      <button
        type="button"
        aria-label={close ? t('Close') : t('Back')}
        onClick={onBack ?? (() => goBack())}
        className="tap grid size-11 shrink-0 place-items-center rounded-lg text-black hover:bg-black/5"
      >
        {close ? <CloseIcon /> : <ArrowLeftIcon />}
      </button>
      <p className="min-w-[min(8rem,100%)] flex-1 break-words text-[1.125rem] font-semibold leading-6 text-ink">{title}</p>
      {right && <span className="shrink-0 text-[0.8125rem] font-medium leading-[1.1875rem] text-ink-muted">{right}</span>}
    </div>
  )
}

/** Thin progress bar under the question app bar. */
export function ProgressBar({ value }) {
  return (
    <div className="h-1 w-full shrink-0 bg-[#ece9e5]">
      <div className="h-full origin-left bg-brand transition-[width] duration-300 ease-out" style={{ width: `${Math.round(value * 100)}%` }} />
    </div>
  )
}

/* ------------------------------------------------------------- Badges */

const TONES = {
  warning: 'bg-[#fff1dc] text-[#9a5b00]',
  error: 'bg-[#fbedec] text-[#b54a45]',
  neutral: 'bg-[#f1efec] text-ink-muted',
  success: 'bg-[#e6f2ea] text-[#1b6b34]',
}
export function Badge({ tone = 'neutral', children, className }) {
  return (
    <span className={cx('inline-flex min-h-[22px] items-center rounded-md px-2 text-[0.75rem] font-semibold leading-4', TONES[tone], className)}>
      {children}
    </span>
  )
}

export function SectionBadge({ letter }) {
  const t = useT()
  const s = SECTIONS[letter]
  return (
    <span className="inline-flex min-h-[22px] items-center rounded-md px-2 text-[0.75rem] font-semibold leading-4" style={{ background: s.bg, color: s.color }}>
      {t('Section {letter} · {name}', { letter, name: t(s.name) })}
    </span>
  )
}

/** Badge + big title + subtitle at the top of an activity screen. */
export function ActivityHead({ letter, title, subtitle }) {
  return (
    <div className="flex flex-col items-start gap-2">
      <SectionBadge letter={letter} />
      <div>
        <h1 className="text-[1.5rem] font-semibold leading-[1.875rem] text-ink">{title}</h1>
        {subtitle && <p className="py-1 text-[0.8125rem] leading-[1.1875rem] text-ink-muted">{subtitle}</p>}
      </div>
    </div>
  )
}

export function DaysLeftBadge({ deadline }) {
  const t = useT()
  const n = daysLeft(deadline)
  if (n == null) return null
  if (n < 0) return <Badge tone="error">{t('Closed')}</Badge>
  if (n === 0) return <Badge tone="warning">{t('Due today')}</Badge>
  return <Badge tone="warning">{n === 1 ? t('1 day left') : t('{n} days left', { n })}</Badge>
}

/** Deadline card. `missed` switches to the red 9.1 style. */
export function DeadlineCard({ deadline, missed }) {
  const t = useT()
  const d = useDate()
  return (
    <div
      className={cx(
        'flex flex-wrap items-center gap-3 rounded-[10px] border px-3.5 py-3',
        missed ? 'border-[#e3a8a5] bg-[#fbedec]' : 'border-[#ffa554] bg-[#fffaf5]',
      )}
    >
      <span className="flex min-w-[min(8rem,100%)] flex-1 flex-col gap-0.5">
        <span className="text-[0.75rem] font-bold uppercase leading-4 tracking-[0.96px] text-ink-muted">{t('Deadline')}</span>
        <span className="text-[0.9375rem] font-semibold leading-[1.375rem] text-ink">{d(deadline)}</span>
      </span>
      {missed ? <Badge tone="error">{t('Missed')}</Badge> : <DaysLeftBadge deadline={deadline} />}
    </div>
  )
}

export function InfoCard({ label, children }) {
  return (
    <div className="flex flex-col gap-1.5 rounded-2xl border border-[#e5e6e1] bg-white p-4">
      <p className="text-[0.75rem] font-bold uppercase leading-4 tracking-[0.96px] text-brand-600">{label}</p>
      <div className="text-[0.8125rem] leading-[1.1875rem] text-ink">{children}</div>
    </div>
  )
}

export function Alert({ children, className }) {
  return (
    <div className={cx('flex items-start gap-2.5 rounded-[10px] bg-[#fbedec] px-3.5 py-3 text-[#b54a45]', className)}>
      <span className="shrink-0"><HelpIcon /></span>
      <span className="text-[0.8125rem] font-medium leading-[1.1875rem]">{children}</span>
    </div>
  )
}

export const SectionLabel = ({ children }) => (
  <p className="text-[0.75rem] font-bold uppercase leading-4 tracking-[0.96px] text-brand-600">{children}</p>
)

/** One row of the "Your steps" list. status: 'current' | 'locked' | 'done' | 'closed' */
export function StepRow({ n, title, desc, status, action }) {
  const current = status === 'current'
  return (
    <div
      className={cx(
        'flex flex-wrap items-center gap-3 rounded-[10px] border px-4 py-3.5 transition-colors',
        current ? 'border-brand-600 bg-[#fffaf5]' : 'border-line bg-white',
      )}
    >
      {status === 'done' ? (
        <span className="grid size-7 shrink-0 animate-check-pop place-items-center rounded-full bg-[#e6f2ea] text-[#1b6b34]"><CheckIcon size={14} /></span>
      ) : (
        <span className={cx('grid size-7 shrink-0 place-items-center rounded-full text-[0.8125rem] font-semibold', current ? 'bg-brand text-white' : 'bg-[#f1efec] text-ink-muted')}>
          {n}
        </span>
      )}
      <span className="flex min-w-[min(10rem,100%)] flex-1 flex-col gap-0.5">
        <span className={cx('text-[0.875rem] font-bold leading-5', current ? 'text-brand-600' : status === 'done' ? 'text-ink' : 'text-ink-muted')}>{title}</span>
        <span className="text-[0.8125rem] leading-[1.1875rem] text-ink-muted">{desc}</span>
      </span>
      {action}
    </div>
  )
}

/** Small solid button used inside step rows. */
export function SmallButton({ children, className, ...props }) {
  return (
    <button
      type="button"
      className={cx('tap min-h-11 shrink-0 rounded-full bg-brand px-4 text-[0.875rem] font-medium leading-5 text-white transition-colors hover:bg-brand-hover', className)}
      {...props}
    >
      {children}
    </button>
  )
}

export function TextLink({ children, className, ...props }) {
  return (
    <button type="button" className={cx('tap -my-2 inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-lg px-2 text-[0.8125rem] font-medium leading-[1.1875rem] text-brand-700 hover:bg-brand-50 hover:underline', className)} {...props}>
      {children}
    </button>
  )
}

/* ------------------------------------------------------------ Choices */

/** Answer option card. Selected = orange border + orange title. */
export function OptionCard({ title, desc, selected, multi, onClick }) {
  return (
    <button
      type="button"
      role={multi ? 'checkbox' : 'radio'}
      aria-checked={selected}
      onClick={onClick}
      className={cx(
        'tap-soft flex w-full items-start gap-3 rounded-[10px] border p-4 text-left transition-colors',
        selected ? 'border-brand-600 bg-[#fffaf5]' : 'border-line bg-white hover:border-[#d6d3cf] hover:bg-[#fffdfb]',
      )}
    >
      <span className="flex min-w-0 flex-1 flex-col">
        <span className={cx('text-[0.9375rem] font-bold leading-[1.375rem] transition-colors', selected ? 'text-brand-600' : 'text-ink')}>{title}</span>
        {desc && <span className="py-1 text-[0.8125rem] leading-[1.1875rem] text-ink-muted">{desc}</span>}
      </span>
      {multi && (
        <span
          className={cx(
            'mt-0.5 grid size-5 shrink-0 place-items-center rounded border transition-colors',
            selected ? 'border-brand bg-brand text-white' : 'border-[#cdcac5] bg-white',
          )}
        >
          {selected && <span className="animate-check-pop"><CheckIcon size={12} /></span>}
        </span>
      )}
    </button>
  )
}

/* ------------------------------------------------------------ Footers */

export function Footer({ children }) {
  return <BottomActions className="flex flex-col gap-3">{children}</BottomActions>
}

export function PrevNext({ onPrev, prevDisabled, onNext, nextDisabled, nextLabel, loading }) {
  const t = useT()
  return (
    <Footer>
      <div className="flex flex-wrap gap-3">
        <OutlineButton
          onClick={onPrev}
          disabled={prevDisabled}
          className={cx('min-w-[min(8rem,100%)] flex-1 text-[0.9375rem]', prevDisabled && 'pointer-events-none opacity-40')}
        >
          {t('Previous')}
        </OutlineButton>
        <PrimaryButton onClick={onNext} disabled={nextDisabled} loading={loading} className="min-w-[min(8rem,100%)] flex-1">
          {nextLabel ?? t('Next')}
        </PrimaryButton>
      </div>
    </Footer>
  )
}

/* ------------------------------------------------------------ Sheets */

/** Bottom sheet with title, body and a primary + optional secondary action (4.3, 9.3, 11.2). */
export function ActionSheet({ open, onClose, icon, title, body, primary, onPrimary, secondary, onSecondary, loading }) {
  return (
    <Sheet open={open} onClose={onClose}>
      <div className="flex flex-col gap-4 px-4 pb-6 pt-5" role="dialog" aria-modal="true" aria-label={title}>
        <div className="flex items-start gap-3">
          {icon && (
            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-[#fbedec] text-[#b54a45]">
              <HelpIcon />
            </span>
          )}
          <div className="flex min-w-0 flex-1 flex-col gap-1.5">
            <p className="text-[1.125rem] font-semibold leading-6 text-ink">{title}</p>
            <p className="text-[0.8125rem] leading-[1.1875rem] text-ink-muted">{body}</p>
          </div>
        </div>
        <PrimaryButton onClick={onPrimary} loading={loading}>{primary}</PrimaryButton>
        {secondary && <OutlineButton onClick={onSecondary} className="text-[0.9375rem]">{secondary}</OutlineButton>}
      </div>
    </Sheet>
  )
}

/* ------------------------------------------------------ Success screen */

export function SuccessBody({ title, body, children }) {
  return (
    <div className="flex min-h-full flex-col items-center justify-center gap-4 px-8 py-8 text-center">
      <span className="grid size-[72px] animate-pop-in place-items-center rounded-full bg-[#e6f2ea] text-[#1b6b34]">
        <VerifiedIcon />
      </span>
      <h1 className="animate-fade-up text-[1.5rem] font-semibold leading-[1.875rem] text-ink">{title}</h1>
      <p className="max-w-[20rem] animate-fade-up text-[0.8125rem] leading-[1.1875rem] text-ink-muted">{body}</p>
      {children}
    </div>
  )
}

/* ---------------------------------------------------- Simulated failures */

const failedOnce = new Set()
/** True the first time `key` is attempted while `?fail=<kind>` is in the URL (then retry succeeds). */
export function shouldFailOnce(search, kind, key) {
  const want = new URLSearchParams(search).getAll('fail').some((v) => v.split(',').includes(kind))
  if (!want || failedOnce.has(key)) return false
  failedOnce.add(key)
  return true
}

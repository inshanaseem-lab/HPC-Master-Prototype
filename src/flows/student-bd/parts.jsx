import { useNavigate } from 'react-router-dom'
import { cx, HomeIndicator, Sheet } from '../../components/ui.jsx'
import { useT, useDate } from '../../i18n/index.js'
import { SECTIONS, GROUPS } from '../../student/data.js'

/* ------------------------------------------------------------------ Icons */

const Svg = ({ size = 20, children, strokeWidth = 1.8 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {children}
  </svg>
)
export const ArrowLeftIcon = (p) => <Svg {...p}><path d="M19 12H5M12 19l-7-7 7-7" /></Svg>
export const CloseIcon = (p) => <Svg {...p}><path d="M18 6 6 18M6 6l12 12" /></Svg>
export const CheckIcon = (p) => <Svg strokeWidth={2.4} {...p}><path d="M20 6 9 17l-5-5" /></Svg>
export const ChevronRightIcon = (p) => <Svg {...p}><path d="m9 18 6-6-6-6" /></Svg>
export const HelpCircleIcon = (p) => (
  <Svg {...p}><circle cx="12" cy="12" r="10" /><path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3M12 17h.01" /></Svg>
)
export const VerifiedIcon = (p) => (
  <Svg {...p}>
    <path d="M9 12l2 2 4-4" />
    <path d="M12 2.5l2.4 1.7 2.9-.2.9 2.8 2.4 1.7-.9 2.8.9 2.8-2.4 1.7-.9 2.8-2.9-.2L12 21.5l-2.4-1.7-2.9.2-.9-2.8-2.4-1.7.9-2.8-.9-2.8 2.4-1.7.9-2.8 2.9.2z" />
  </Svg>
)
export const FileIcon = (p) => (
  <Svg {...p}><path d="M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7z" /><path d="M14 2v5h5M9 13h6M9 17h4" /></Svg>
)

/* ------------------------------------------------------------ Navigation */

/** Back = previous screen when there is one, otherwise student home. */
export function useGoBack() {
  const navigate = useNavigate()
  return () => (window.history.state?.idx > 0 ? navigate(-1) : navigate('/s/home'))
}

/** Student app bar: 68px, warm white, back arrow (or close X), title, optional right text. */
export function AppBar({ title, onBack, close = false, right }) {
  const t = useT()
  const goBack = useGoBack()
  return (
    <div className="relative flex min-h-[68px] shrink-0 items-center gap-2 border-b border-[#f1efec] bg-[#fffbf9] py-2 pl-2 pr-4">
      <button
        type="button"
        aria-label={close ? t('Close') : t('Back')}
        onClick={onBack ?? goBack}
        className="tap grid size-11 shrink-0 place-items-center rounded-lg text-black hover:bg-black/5"
      >
        {close ? <CloseIcon /> : <ArrowLeftIcon />}
      </button>
      {/* Title and counter share a row; with large text the counter wraps under the title (never truncated) */}
      <div className="flex min-w-0 flex-1 flex-wrap items-center gap-x-3">
        <h1 className="min-w-[min(9rem,100%)] flex-1 text-[1.125rem] font-semibold leading-6 text-ink">{title}</h1>
        {right && <span className="text-[0.8125rem] font-medium leading-[1.1875rem] text-ink-muted">{right}</span>}
      </div>
    </div>
  )
}

/* --------------------------------------------------------------- Pieces */

const BADGE = {
  success: 'bg-[#e6f2ea] text-[#1b6b34]',
  warning: 'bg-brand-50 text-brand-700',
  error: 'bg-[#fbedec] text-[#b54a45]',
  neutral: 'bg-[#f1efec] text-ink-muted',
}
export function Badge({ tone = 'neutral', children, className }) {
  return (
    <span className={cx('inline-flex min-h-[22px] shrink-0 items-center rounded-full px-2.5 text-[0.75rem] font-medium leading-4', BADGE[tone], className)}>
      {children}
    </span>
  )
}

export function Eyebrow({ children, tone = 'muted', className }) {
  return (
    <p className={cx('text-[0.75rem] font-bold uppercase leading-4 tracking-[0.96px]', tone === 'brand' ? 'text-brand-600' : 'text-ink-muted', className)}>
      {children}
    </p>
  )
}

export function Card({ children, className }) {
  return <div className={cx('flex flex-col rounded-2xl border border-[#e5e6e1] bg-white', className)}>{children}</div>
}

/** Section tag + activity title + subtitle. */
export function ActivityHeader({ activity, subtitle }) {
  const t = useT()
  const s = SECTIONS[activity.section]
  return (
    <div className="flex flex-col items-start gap-2">
      <span className="inline-flex min-h-[22px] items-center rounded-full px-2.5 text-[0.75rem] font-medium leading-4" style={{ background: s.bg, color: s.color }}>
        {t('Section {letter} · {name}', { letter: s.letter, name: t(s.name) })}
      </span>
      <div>
        <h2 className="text-[1.5rem] font-semibold leading-[1.875rem] text-ink">{t(activity.title)}</h2>
        <p className="py-1 text-[0.8125rem] leading-[1.1875rem] text-ink-muted">{subtitle}</p>
      </div>
    </div>
  )
}

/** Deadline row with a status badge. `closed` turns it red. */
export function DeadlineBox({ label, date, badge, closed }) {
  const t = useT()
  return (
    <div className={cx('flex flex-wrap items-center gap-3 rounded-[10px] border px-3.5 py-3', closed ? 'border-[#e3a8a5] bg-[#fbedec]' : 'border-[#ffa554] bg-[#fffaf5]')}>
      <div className="flex min-w-[min(9rem,100%)] flex-1 flex-col gap-0.5">
        <Eyebrow>{label ?? t('Deadline')}</Eyebrow>
        <p className="text-[0.9375rem] font-semibold leading-[1.375rem] text-ink">{date}</p>
      </div>
      {badge}
    </div>
  )
}

/** Section D: preparation deadline + activity-in-class date side by side. */
export function TwoDates({ activity }) {
  const t = useT()
  const d = useDate()
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(min(9rem,100%),1fr))] gap-2">
      {[
        [t('Preparation deadline'), activity.prepDeadline],
        [t('Activity in class'), activity.classDate],
      ].map(([label, date]) => (
        <div key={label} className="flex flex-col rounded-[10px] border border-[#ffa554] bg-[#fffaf5] px-3.5 py-3">
          <Eyebrow>{label}</Eyebrow>
          <p className="text-[0.9375rem] font-semibold leading-[1.375rem] text-ink">{d(date)}</p>
        </div>
      ))}
    </div>
  )
}

export function NextStepBox({ title, body }) {
  const t = useT()
  return (
    <div className="flex flex-col gap-1.5 rounded-[18px] border border-dashed border-[#cdcac5] bg-[#f1efec] p-4">
      <Eyebrow>{t('Next step')}</Eyebrow>
      <p className="text-[0.9375rem] font-semibold leading-[1.375rem] text-ink">{title}</p>
      <p className="text-[0.8125rem] leading-[1.1875rem] text-ink-muted">{body}</p>
    </div>
  )
}

const NOTICE = {
  success: ['bg-[#e6f2ea] text-[#1b6b34]', VerifiedIcon],
  warning: ['bg-brand-50 text-brand-700', HelpCircleIcon],
  neutral: ['bg-[#f1efec] text-ink-2', HelpCircleIcon],
}
export function Notice({ tone = 'success', children }) {
  const [cls, Icon] = NOTICE[tone]
  return (
    <div className={cx('flex items-start gap-2.5 rounded-[10px] px-3.5 py-3 animate-fade-up', cls)}>
      <span className="mt-px shrink-0"><Icon /></span>
      <p className="text-[0.8125rem] font-medium leading-[1.1875rem]">{children}</p>
    </div>
  )
}

export function TextCard({ label, children }) {
  return (
    <Card>
      <div className="flex flex-col gap-1.5 p-4">
        <Eyebrow tone="brand">{label}</Eyebrow>
        <p className="text-[0.8125rem] leading-[1.1875rem] text-ink">{children}</p>
      </div>
    </Card>
  )
}

export const initialsOf = (name) => name.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase()

export function Avatar({ name, className }) {
  return (
    <span aria-hidden className={cx('grid size-10 shrink-0 place-items-center rounded-full bg-brand-50 text-[0.875rem] font-semibold text-brand-700', className)}>
      {initialsOf(name)}
    </span>
  )
}

/** "My group" card listing every member (you first). */
export function GroupCard({ groupId, withName }) {
  const t = useT()
  const g = GROUPS[groupId]
  if (!g) return null
  return (
    <Card>
      <div className="px-4 pt-3.5">
        <Eyebrow>{withName ? t('My group · {name}', { name: t(g.name) }) : t('My group')}</Eyebrow>
      </div>
      <div className="stagger">
        {g.members.map((m, i) => (
          <div key={m.id} className={cx('flex items-center gap-3 px-4 py-3.5', i < g.members.length - 1 && 'border-b border-[#f1efec]')}>
            <Avatar name={m.name} />
            <div className="flex min-w-0 flex-1 flex-col gap-0.5">
              <p className="text-[0.875rem] font-semibold leading-5 text-ink">{m.you ? t('{name} (You)', { name: m.name }) : m.name}</p>
              <p className="text-[0.8125rem] leading-[1.1875rem] text-ink-muted">{t('Student ID {id}', { id: m.idMasked })}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}

/** Small solid "Start" / "Continue" pill used inside step rows. */
export function SmallButton({ children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="tap min-h-11 shrink-0 rounded-full bg-brand px-4 py-2 text-[0.875rem] font-medium leading-5 text-white transition-colors hover:bg-brand-hover hover:shadow-[0_6px_16px_rgba(255,121,0,0.28)]"
    >
      {children}
    </button>
  )
}

/**
 * One row in "Your steps".
 * status: 'active' (orange, button) | 'done' (green check, View) | 'locked' | 'closed'
 */
export function StepRow({ n, title, subtitle, status, action, onAction, onView }) {
  const t = useT()
  const active = status === 'active'
  return (
    <div className={cx('flex flex-wrap items-center gap-3 rounded-[10px] border px-4 py-3.5 transition-colors', active ? 'border-brand-600 bg-[#fffaf5]' : 'border-line bg-white')}>
      {status === 'done' ? (
        <span className="grid size-7 shrink-0 animate-check-pop place-items-center rounded-full bg-[#e6f2ea] text-[#1b6b34]"><CheckIcon size={14} /><span className="sr-only">{t('Done')}</span></span>
      ) : (
        <span className={cx('grid size-7 shrink-0 place-items-center rounded-full text-[0.8125rem] font-semibold', active ? 'bg-brand text-white' : 'bg-[#f1efec] text-ink-muted')}>{n}</span>
      )}
      <div className="flex min-w-[min(9rem,100%)] flex-1 flex-col gap-0.5">
        <p className={cx('text-[0.875rem] font-bold leading-5', active ? 'text-brand-600' : status === 'done' ? 'text-ink' : 'text-ink-muted')}>{title}</p>
        <p className="text-[0.8125rem] leading-[1.1875rem] text-ink-muted">{subtitle}</p>
      </div>
      {active && <SmallButton onClick={onAction}>{action}</SmallButton>}
      {status === 'done' && onView && (
        <button type="button" onClick={onView} aria-label={`${t('View')} · ${title}`} className="tap min-h-11 min-w-11 shrink-0 rounded-md px-1 text-[0.8125rem] font-medium leading-[1.1875rem] text-brand-700 hover:underline">
          {t('View')}
        </button>
      )}
      {status === 'locked' && <Badge>{t('Locked')}</Badge>}
      {status === 'closed' && <Badge tone="error">{t('Closed')}</Badge>}
    </div>
  )
}

/** Recorded submission card (5.2 / 5.6) with a preview sheet on View. */
export function SubmissionCard({ submission, onView }) {
  const t = useT()
  const d = useDate()
  return (
    <Card>
      <div className="flex flex-col gap-2.5 p-4">
        <Eyebrow>{t('Submission')}</Eyebrow>
        <p className="text-[0.9375rem] font-semibold leading-[1.375rem] text-ink">{t('Recorded by your teacher')}</p>
        <p className="text-[0.8125rem] leading-[1.1875rem] text-ink-muted">{t(submission.kind)} · {d(submission.at)}</p>
        <button
          type="button"
          onClick={onView}
          className="tap-soft flex min-h-11 items-center gap-2.5 rounded-[10px] border border-line px-3 py-2.5 text-left hover:bg-[#fffaf5]"
        >
          <span className="shrink-0 text-[#ff7900]"><FileIcon /></span>
          <span className="min-w-0 flex-1 break-all text-[0.8125rem] font-medium leading-[1.1875rem] text-ink">{submission.file}</span>
          <span className="shrink-0 text-[0.8125rem] font-medium leading-[1.1875rem] text-brand-700">{t('View')}</span>
        </button>
      </div>
    </Card>
  )
}

export function FilePreviewSheet({ open, onClose, file }) {
  const t = useT()
  return (
    <Sheet open={open} onClose={onClose}>
      <div className="flex flex-col gap-4 px-4 pb-6 pt-4">
        <h2 className="break-all text-[1rem] font-semibold leading-6 text-ink">{file}</h2>
        <div className="grid min-h-56 place-items-center p-4 rounded-2xl border border-line bg-[linear-gradient(135deg,#fff2e6,#f1efec)] text-ink-muted">
          <div className="flex flex-col items-center gap-2">
            <FileIcon size={36} />
            <p className="text-[0.8125rem] leading-[1.1875rem]">{t('Photo recorded by your teacher')}</p>
          </div>
        </div>
        <button type="button" onClick={onClose} className="tap min-h-12 rounded-full border border-brand-700 bg-brand-50 text-[0.9375rem] font-medium text-brand-700 hover:bg-[#ffe8d4]">
          {t('Close')}
        </button>
      </div>
    </Sheet>
  )
}

/**
 * Two buttons side by side + gesture bar (Previous/Next, Later/Continue). When they don't fit
 * (Hindi, large text) they stack with the primary (`right`) on top and the secondary below it.
 */
export function FooterPair({ left, right }) {
  return (
    <div className="shrink-0 px-4 pb-6 pt-3">
      <div className="flex flex-wrap-reverse gap-3 [&>*]:min-w-[min(8rem,100%)] [&>*]:flex-1">{left}{right}</div>
      <HomeIndicator />
    </div>
  )
}

/** Exit warning bottom sheet (5.4). */
export function ExitSheet({ open, title, body, onStay, onLeave }) {
  const t = useT()
  return (
    <Sheet open={open} onClose={onStay}>
      <div className="flex flex-col gap-4 px-4 pb-6 pt-5">
        <div className="flex flex-col gap-1.5">
          <h2 className="text-[1.125rem] font-semibold leading-6 text-ink">{title}</h2>
          <p className="text-[0.8125rem] leading-[1.1875rem] text-ink-muted">{body}</p>
        </div>
        <button type="button" onClick={onStay} className="tap min-h-12 rounded-full border border-brand bg-brand text-[0.9375rem] font-medium text-white hover:bg-brand-hover">
          {t('Keep Going')}
        </button>
        <button type="button" onClick={onLeave} className="tap min-h-12 rounded-full border border-brand-700 bg-brand-50 text-[0.9375rem] font-medium text-brand-700 hover:bg-[#ffe8d4]">
          {t('Leave Anyway')}
        </button>
        <HomeIndicator />
      </div>
    </Sheet>
  )
}

/** Green verified circle used on success screens. */
export function SuccessMark() {
  return (
    <span className="grid size-[72px] animate-pop-in place-items-center rounded-full bg-[#e6f2ea] text-[#1b6b34]">
      <VerifiedIcon size={36} />
    </span>
  )
}

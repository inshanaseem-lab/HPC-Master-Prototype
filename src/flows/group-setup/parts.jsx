import { useNavigate, useParams } from 'react-router-dom'
import { Modal, Spinner, cx } from '../../components/ui.jsx'
import { useAppStore } from '../../store/AppStore.jsx'
import chevronIcon from '../../assets/group-setup/chevron.svg'
import alertIcon from '../../assets/group-setup/alert-circle.svg'
import { useT } from '../../i18n/index.js'
import { classInfo } from '../group-live/lib.js'
import { groupLabel } from '../group-live/parts.jsx'

/** Class context for setup: grade/section/stream, size (40–60) and the learner list. */
export function useClassInfo() {
  const { classId } = useParams()
  const { classes } = useAppStore()
  const t = useT()
  const cls = classInfo(classes, classId)
  const name = cls.stream
    ? t('Class {grade} {section} - {stream}', { grade: cls.grade, section: cls.section, stream: t(cls.stream) })
    : t('Class {grade} {section}', { grade: cls.grade, section: cls.section })
  return { classId, cls: { ...cls, students: cls.size }, name, label: t('{cls} · {n} students', { cls: name, n: cls.size }) }
}

export { groupLabel }

/** White app bar used across the group project screens: title, orange class line, step counter. */
export function GPHeader({ step, onBack }) {
  const navigate = useNavigate()
  const t = useT()
  const { label } = useClassInfo()
  return (
    <div className="flex min-h-[68px] shrink-0 items-center gap-3 bg-appbar px-4 py-2">
      <button
        aria-label={t('Back')}
        onClick={onBack ?? (() => navigate(-1))}
        className="tap -ml-2 grid size-11 shrink-0 place-items-center rounded-lg hover:bg-black/5"
      >
        <img alt="" width="20" height="20" src={chevronIcon} />
      </button>
      {/* Title block and step counter share one row; with large text the counter wraps under the title */}
      <div className="flex min-w-0 flex-1 flex-wrap items-center gap-x-3">
        <div className="min-w-[min(9rem,100%)] flex-1">
          <h1 className="text-[1.125rem] font-semibold leading-6 text-ink">{t('Group Project')}</h1>
          <p className="text-[0.875rem] font-bold leading-[1.1875rem] text-brand-700">{label}</p>
        </div>
        {step && <p className="shrink-0 text-[1rem] leading-6 text-ink"><span className="sr-only">{t('Step')} </span>{step}</p>}
      </div>
    </div>
  )
}

export function SectionLabel({ children, className }) {
  return (
    <p className={cx('text-[0.75rem] font-bold uppercase leading-4 tracking-[0.96px] text-brand-600', className)}>{children}</p>
  )
}

/** Name chip used in group cards and success modal. */
export function Chip({ children }) {
  return <span className="rounded-full bg-[#f1efec] px-3 py-1.5 text-[0.8125rem] leading-[1.1875rem] text-ink-2">{children}</span>
}

/** Alert-style confirm dialog (delete group / leave creation). */
export function ConfirmDialog({ open, title, body, primary, secondary, onPrimary, onSecondary, onClose, loading }) {
  return (
    <Modal open={open} onClose={onClose} className="max-w-[21rem] rounded-lg border border-[#e2c7b0] !bg-[#fefefe] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.06)]">
      <div className="flex flex-col items-center gap-4 p-4 text-center">
        <div className="animate-pop-in rounded-[47.5px] bg-[#fde7d6] p-6">
          <img alt="" width="54" height="54" src={alertIcon} />
        </div>
        <h2 className="text-[1.125rem] font-bold leading-7 text-[#0e0805]">{title}</h2>
        <p className="max-w-[19rem] text-[0.875rem] leading-[1.1875rem] text-ink-muted">{body}</p>
        <div className="flex w-full flex-wrap items-center gap-2">
          <button
            onClick={onPrimary}
            disabled={loading}
            className="tap flex min-h-11 min-w-[min(8rem,100%)] flex-1 items-center justify-center rounded-full bg-brand px-3 py-2 text-[0.875rem] font-medium leading-5 text-white shadow-[inset_-2px_-2px_2px_rgba(15,23,42,0.14),inset_2px_2px_2px_rgba(255,255,255,0.35)] transition-colors hover:bg-brand-hover"
          >
            {loading ? <Spinner className="size-4" /> : primary}
          </button>
          <button
            onClick={onSecondary}
            className="tap flex min-h-11 min-w-[min(8rem,100%)] flex-1 items-center justify-center rounded-full px-3 py-2 text-[0.875rem] font-medium leading-5 text-brand-700 transition-colors hover:bg-[#fff2e6]"
          >
            {secondary}
          </button>
        </div>
      </div>
    </Modal>
  )
}

/** Round +/− stepper button. `small` keeps the compact 28px circle inside a 44px touch target. */
export function StepButton({ label, onClick, disabled, small, children }) {
  const circle = cx(
    'grid shrink-0 place-items-center rounded-full bg-brand-50 transition-colors',
    !disabled && 'group-hover:bg-[#ffe3c8]',
    disabled ? 'text-ink-muted opacity-60' : 'text-brand-700',
  )
  return (
    <button
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      className={cx('tap group grid size-11 shrink-0 place-items-center rounded-full disabled:active:scale-100', small && '-m-2')}
    >
      <span aria-hidden className={cx(circle, small ? 'size-7' : 'size-11')}>
        <span className={cx('leading-none', small ? 'text-[1rem] font-semibold' : 'text-[1.25rem]')}>{children}</span>
      </span>
    </button>
  )
}

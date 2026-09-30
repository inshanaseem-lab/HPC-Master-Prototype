import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { BottomActions, PrimaryButton, Screen, TopAppBar, cx } from '../../components/ui.jsx'
import { useAppStore } from '../../store/AppStore.jsx'
import radioChecked from '../../assets/group-live/radio-checked.svg'
import checkIcon from '../../assets/group-live/check.svg'
import closeIcon from '../../assets/group-live/close.svg'
import { useT } from '../../i18n/index.js'
import { classInfo, nameOf, useBActivity } from './lib.js'

/** Translated default group name ("Group 3" → "समूह 3"); custom names stay as typed. */
export function groupLabel(t, name) {
  const m = /^Group (\d+)$/.exec(name ?? '')
  return m ? t('Group {n}', { n: m[1] }) : name
}

/** "Class 9 A" / "Class 11 B - Humanities" */
export function useClassName(classId) {
  const t = useT()
  const { classes } = useAppStore()
  const c = classInfo(classes, classId)
  const name = c.stream
    ? t('Class {grade} {section} - {stream}', { grade: c.grade, section: c.section, stream: t(c.stream) })
    : t('Class {grade} {section}', { grade: c.grade, section: c.section })
  return { name, size: c.size, cls: c, line: t('{cls} · {n} students', { cls: name, n: c.size }) }
}

/** Common page context for group-live screens. */
export function useBPage() {
  const params = useParams()
  const { classId } = params
  const a = useBActivity(classId)
  return { ...params, classId, a, base: `/group-project/${classId}/progress` }
}

/** Redirect to the hub when there is no live project for the class. */
export function NoActivityRedirect({ classId }) {
  return <Navigate to={`/group-project/${classId}/progress`} replace />
}

/** Kit app bar (T10-01): title + orange class line. */
export function AppBar({ title, subtitle, right, onBack }) {
  return (
    <TopAppBar
      title={title}
      onBack={onBack}
      subtitle={subtitle && <span className="text-[0.875rem] font-bold leading-[1.1875rem] text-brand-700">{subtitle}</span>}
      right={right}
    />
  )
}

/** "Question 1 of 3" strip with animated bar (kit T10-10); `action` = optional text button (e.g. View submission). */
export function StepProgress({ label, pct, action }) {
  return (
    <div className="relative z-10 flex shrink-0 flex-wrap items-center gap-x-4 gap-y-2 bg-surface px-4 pb-3 pt-4">
      <p className="text-[0.875rem] font-medium leading-5 text-ink" aria-live="polite">{label}</p>
      <div aria-hidden className="h-2 min-w-[min(8rem,100%)] flex-1 overflow-hidden rounded-full bg-[#ffd5b0]">
        <div className="h-full origin-left animate-grow-x rounded-full bg-brand-bright transition-[width] duration-500 ease-out" style={{ width: `${pct}%` }} />
      </div>
      {action}
    </div>
  )
}

/** Text button that opens the submission sheet during an evaluation. */
export function ViewSubmission({ onClick }) {
  const t = useT()
  return (
    <button type="button" onClick={onClick} className="tap -mr-2 min-h-11 rounded-lg px-2 py-1 text-[0.9375rem] font-bold leading-[1.1875rem] text-brand-700 hover:bg-brand-50">
      {t('View submission')}
    </button>
  )
}

export function SectionLabel({ children, className }) {
  return <p className={cx('text-[0.75rem] font-bold uppercase leading-4 tracking-[0.96px] text-brand-600', className)}>{children}</p>
}

export function Card({ children, className }) {
  return <div className={cx('rounded-2xl border border-line bg-white p-4', className)}>{children}</div>
}

export function Chips({ names }) {
  return (
    <div className="flex flex-wrap gap-2 pt-2.5">
      {names.map((s, i) => <span key={i} className="rounded-full bg-[#f1efec] px-3 py-1.5 text-[0.8125rem] leading-[1.1875rem] text-ink-2">{s}</span>)}
    </div>
  )
}

/** Group members card (kit T10-09 / T10-10). */
export function GroupCard({ a, group, children }) {
  const t = useT()
  return (
    <Card>
      <p className="text-[0.9375rem] font-semibold leading-[1.375rem] text-brand-600">{groupLabel(t, group.name)}</p>
      <Chips names={group.members.map((m) => nameOf(a, m))} />
      {children}
    </Card>
  )
}

const TONES = {
  neutral: 'bg-surface text-ink-2',
  ok: 'bg-[#eaf7ef] text-[#1e6b3a]',
  brand: 'bg-brand-50 text-brand-700',
  danger: 'bg-danger-50 text-danger',
  info: 'bg-[#eef4fd] text-[#2f4fb3]',
  muted: 'bg-surface text-ink-muted',
}
/** Small status pill: label + value, always with text (never colour only). */
export function StatusPill({ tone = 'neutral', label, children, className }) {
  return (
    <span className={cx('inline-flex max-w-full flex-wrap items-center gap-x-1 rounded-full px-2 text-[0.75rem] font-semibold leading-5', TONES[tone], className)}>
      {label && <span className="font-medium">{label}</span>}
      {children}
    </span>
  )
}

export function Radio({ checked }) {
  return checked ? (
    <img alt="" width="24" height="24" src={radioChecked} className="shrink-0 animate-check-pop" />
  ) : (
    <span className="block size-6 shrink-0 rounded-full border-2 border-line" />
  )
}

export function Checkbox({ checked }) {
  return (
    <span className={cx('relative grid size-6 shrink-0 place-items-center rounded-[4px] border-2 transition-colors duration-200', checked ? 'border-brand bg-brand' : 'border-[#e5e7eb] bg-white')}>
      {checked && <img alt="" width="14" height="14" src={checkIcon} className="animate-check-pop" />}
    </span>
  )
}

export const areaCls =
  'w-full resize-none rounded-xl border bg-white p-3 text-[1rem] leading-6 text-ink outline-none transition-colors duration-200 placeholder:text-[#8a8790] focus:border-brand'

/** Labelled textarea with optional hint and inline error. */
export function Field({ label, hint, value, onChange, placeholder, rows = 3, error, readOnly, id }) {
  return (
    <div className={cx(error && 'animate-shake')}>
      <label htmlFor={id} className="block text-[1rem] font-semibold leading-6 text-ink">{label}</label>
      {hint && <p className="pt-0.5 text-[0.8125rem] leading-[1.1875rem] text-ink-muted">{hint}</p>}
      {readOnly ? (
        <p className="mt-2 whitespace-pre-wrap rounded-xl bg-surface p-3 text-[0.9375rem] leading-[1.375rem] text-ink-2">{value || '—'}</p>
      ) : (
        <textarea id={id} rows={rows} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
          aria-invalid={!!error} className={cx(areaCls, 'mt-2', error ? 'border-danger' : 'border-line')} />
      )}
      {error && <p role="alert" className="animate-fade-in pt-1.5 text-[0.75rem] leading-4 text-danger">{error}</p>}
    </div>
  )
}

/** Thumbnail with remove (x) and simulated upload progress. */
export function FileThumb({ file, onRemove }) {
  const t = useT()
  const uploading = (file.progress ?? 100) < 100
  const isImage = file.type?.startsWith('image/') && file.url
  return (
    <div className="flex animate-fade-up flex-col items-end gap-1">
      {onRemove && (
        <button aria-label={t('Remove {name}', { name: file.name })} onClick={onRemove} className="tap -mr-2 grid size-11 place-items-center rounded-full hover:bg-black/5">
          <img alt="" width="16" height="16" src={closeIcon} />
        </button>
      )}
      <div className="relative min-h-32 w-full overflow-hidden rounded-[10px] border border-line bg-[#f1efec]">
        {isImage ? (
          <img alt={file.name} src={file.url} width="320" height="128" className="block h-32 w-full object-contain" />
        ) : (
          <div className="flex min-h-32 w-full flex-col items-center justify-center gap-2 px-4 py-3">
            <span className="rounded-md bg-danger px-2 py-1 text-[0.6875rem] font-bold tracking-[0.96px] text-white">
              {file.type === 'application/pdf' ? 'PDF' : file.type?.startsWith('image/') ? t('Image') : t('FILE')}
            </span>
            <p className="w-full break-all text-center text-[0.8125rem] leading-[1.1875rem] text-ink-2">{file.name}</p>
          </div>
        )}
        <div className={cx('absolute inset-0 flex flex-col justify-end bg-black/45 transition-opacity duration-300', uploading ? 'opacity-100' : 'pointer-events-none opacity-0')}>
          <p className="px-3 pb-2 text-[0.75rem] font-semibold leading-4 text-white">{t('Uploading… {n}%', { n: Math.round(file.progress ?? 100) })}</p>
          <div className="h-1 w-full bg-white/40"><div className="h-full bg-brand-bright transition-[width] duration-150 ease-linear" style={{ width: `${file.progress}%` }} /></div>
        </div>
      </div>
    </div>
  )
}

/** Full-screen empty / waiting state with one action (real screen, never a silent state). */
export function StateScreen({ title, subtitle, heading, body, action, onAction, icon }) {
  const navigate = useNavigate()
  const t = useT()
  return (
    <Screen
      bg="plain"
      header={<AppBar title={title} subtitle={subtitle} />}
      footer={<BottomActions><PrimaryButton onClick={onAction ?? (() => navigate(-1))}>{action ?? t('Back')}</PrimaryButton></BottomActions>}
    >
      <div className="stagger flex min-h-full flex-col items-center justify-center gap-3 px-6 pb-16 text-center">
        {icon}
        <h2 className="text-[1.25rem] font-semibold leading-7 text-ink">{heading}</h2>
        {body && <p className="max-w-[20rem] text-[0.9375rem] leading-[1.375rem] text-ink-muted">{body}</p>}
      </div>
    </Screen>
  )
}

/** Kit T09-13 success: green tick + heading + body + one button. */
export function SavedScreen({ title, heading, body, primary, onPrimary, secondary, onSecondary }) {
  return (
    <Screen
      bg="plain"
      header={<div className="flex min-h-[68px] shrink-0 items-center bg-appbar px-4 py-2"><h1 className="text-[1.125rem] font-semibold leading-6 text-ink">{title}</h1></div>}
      footer={
        <BottomActions>
          <div className="flex flex-col gap-3">
            <PrimaryButton className="font-semibold" onClick={onPrimary}>{primary}</PrimaryButton>
            {secondary && (
              <button onClick={onSecondary} className="tap min-h-12 rounded-full border border-brand-700 bg-white px-4 py-2 text-[0.9375rem] font-semibold text-brand-700 hover:bg-brand-50">{secondary}</button>
            )}
          </div>
        </BottomActions>
      }
    >
      <div className="flex min-h-full flex-col items-center justify-center gap-3 px-6 pb-12 text-center">
        <div className="grid size-16 animate-pop-in place-items-center rounded-full bg-[#e3f4e6] text-[#1e6b3a]">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="m5 12.5 4.5 4.5L19 7.5" /></svg>
        </div>
        <div className="stagger flex flex-col items-center gap-2">
          <h2 className="text-[1.5rem] font-semibold leading-8 text-ink">{heading}</h2>
          <p className="max-w-[20rem] whitespace-pre-line text-[0.9375rem] leading-[1.375rem] text-ink-muted">{body}</p>
        </div>
      </div>
    </Screen>
  )
}

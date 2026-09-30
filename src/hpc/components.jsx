import { useEffect, useMemo, useState } from 'react'
import { Modal, Sheet, cx } from '../components/ui.jsx'
import { useT, useDate } from '../i18n/index.js'
import { ABILITIES, LEVELS, bandFor } from './config.js'

/**
 * Shared components for the multi-stage (handbook) flows, following the HPC design kit:
 * tick cards (T09-06), Previous/Next footer (T09-06), leave sheet (S02-04), calendar sheet (T04-10),
 * provenance chips (T10-09), stage stepper, band badge and assessor summary.
 */

/* ---------------------------------------------------------------- Icons */
const I = (p) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden {...p} />
export const Icons = {
  check: (p) => <I strokeWidth="2.6" {...p}><path d="m5 12.5 4.5 4.5L19 7.5" /></I>,
  lock: (p) => <I {...p}><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></I>,
  chevronL: (p) => <I {...p}><path d="m15 6-6 6 6 6" /></I>,
  chevronR: (p) => <I {...p}><path d="m9 6 6 6-6 6" /></I>,
  person: (p) => <I {...p}><circle cx="12" cy="8" r="3.5" /><path d="M5 20c.8-3.6 3.6-5.5 7-5.5s6.2 1.9 7 5.5" /></I>,
  people: (p) => <I {...p}><circle cx="9" cy="8" r="3" /><path d="M3 19c.6-3 2.8-4.6 6-4.6s5.4 1.6 6 4.6" /><path d="M16 5.5a3 3 0 0 1 0 5.8M18 14.6c1.8.6 2.8 2 3 4.4" /></I>,
  sync: (p) => <I {...p}><path d="M20 11a8 8 0 0 0-14.3-4.9L4 8" /><path d="M4 4v4h4M4 13a8 8 0 0 0 14.3 4.9L20 16" /><path d="M20 20v-4h-4" /></I>,
  calendar: (p) => <I {...p}><rect x="3.5" y="5" width="17" height="15" rx="2.5" /><path d="M8 3v4M16 3v4M3.5 10h17" /></I>,
  eye: (p) => <I {...p}><path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z" /><circle cx="12" cy="12" r="3" /></I>,
  heart: (p) => <I {...p}><path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7a4.3 4.3 0 0 1 7.5 2.8C19.5 15.4 12 20 12 20z" /></I>,
  spark: (p) => <I {...p}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8" /></I>,
  info: (p) => <I {...p}><circle cx="12" cy="12" r="9" /><path d="M12 11v5M12 8h.01" /></I>,
  unlock: (p) => <I {...p}><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 0 1 7.7-1.5" /></I>,
}

/* ------------------------------------------------------------ Provenance */

const PROV = {
  teacher: { cls: 'bg-provenance-teacher-bg text-provenance-teacher', label: 'Filled by teacher', icon: Icons.person },
  student: { cls: 'bg-provenance-student-bg text-provenance-student', label: 'Filled by student', icon: Icons.person },
  peer: { cls: 'bg-provenance-peer-bg text-provenance-peer', label: 'Filled by peer', icon: Icons.people },
  group: { cls: 'bg-provenance-student-bg text-provenance-student', label: 'Filled by group', icon: Icons.people },
  vsk: { cls: 'bg-provenance-vsk-bg text-provenance-vsk', label: 'VSK synced', icon: Icons.sync },
}
/** "Filled by teacher" / "Filled by student" / "Filled by peer" chip — icon + text, never colour only. */
export function ProvenanceChip({ kind, className, children }) {
  const t = useT()
  const p = PROV[kind]
  const Icon = p.icon
  return (
    <span className={cx('inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[0.75rem] font-semibold leading-5', p.cls, className)}>
      <Icon width="14" height="14" />
      {children ?? t(p.label)}
    </span>
  )
}

/* ---------------------------------------------------------- Stage stepper */

const STEP_STATE = {
  locked: { dot: 'border-line bg-surface text-ink-muted', label: 'Locked' },
  open: { dot: 'border-brand bg-white text-brand-700', label: 'Open' },
  submitted: { dot: 'border-brand bg-brand-50 text-brand-700', label: 'Submitted' },
  evaluated: { dot: 'border-[#1e6b3a] bg-[#1e6b3a] text-white', label: 'Evaluated' },
  late: { dot: 'border-danger bg-danger-50 text-danger', label: 'Late' },
  closed: { dot: 'border-ink-muted bg-ink-muted text-white', label: 'Closed' },
}
/**
 * Stage 1 / 2 / 3 with a state each. stages: [{ id, label, name, state, note? }]
 * (state ∈ locked|open|submitted|evaluated|late|closed).
 * Collapsed by default: only the live stage shows; a chevron toggle reveals the rest.
 */
export function StageStepper({ stages, current, className, collapsible = true }) {
  const t = useT()
  const [open, setOpen] = useState(!collapsible)
  const liveId = current ?? stages.find((s) => s.state !== 'evaluated' && s.state !== 'closed')?.id ?? stages[stages.length - 1]?.id
  const shown = open ? stages : stages.filter((s) => s.id === liveId)
  const hidden = stages.length - shown.length
  return (
    <div className={cx('flex flex-col', className)}>
      <ol className="flex flex-col" aria-label={t('Stages')}>
        {shown.map((s) => {
          const i = stages.indexOf(s)
          const st = STEP_STATE[s.state] ?? STEP_STATE.locked
          const done = s.state === 'evaluated' || s.state === 'closed'
          const last = shown.indexOf(s) === shown.length - 1
          return (
            <li key={s.id} className={cx('relative flex gap-3', !last && 'pb-4', open && 'animate-fade-up')} aria-current={s.id === liveId ? 'step' : undefined}>
              {!last && (
                <span aria-hidden className={cx('absolute left-[15px] top-8 h-[calc(100%-24px)] w-0.5 transition-colors duration-500', done ? 'bg-[#1e6b3a]' : 'bg-line')} />
              )}
              <span className={cx('relative z-10 grid size-8 shrink-0 place-items-center rounded-full border-2 text-[0.8125rem] font-bold transition-colors duration-300', st.dot, s.id === liveId && 'ring-4 ring-brand/15')}>
                {done ? <Icons.check width="16" height="16" className="animate-check-pop" /> : s.state === 'locked' ? <Icons.lock width="14" height="14" /> : i + 1}
              </span>
              <div className="min-w-0 flex-1 pt-0.5">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                  <p className="text-[0.9375rem] font-semibold leading-[1.375rem] text-ink">{t(s.label)} · {t(s.name)}</p>
                  <span className="rounded-full bg-surface px-2 text-[0.75rem] font-semibold leading-5 text-ink-muted">{t(st.label)}</span>
                </div>
                {s.note && <p className="pt-0.5 text-[0.8125rem] leading-[1.1875rem] text-ink-muted">{s.note}</p>}
              </div>
            </li>
          )
        })}
      </ol>
      {collapsible && stages.length > 1 && (
        <button
          type="button"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className="tap mt-3 flex min-h-11 items-center justify-between gap-2 rounded-xl border border-line bg-white px-3.5 text-left text-[0.875rem] font-semibold text-ink-2 transition-colors hover:bg-cream"
        >
          <span>{open ? t('Show only the current stage') : t('Show all stages ({n} more)', { n: hidden })}</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden
            className={cx('shrink-0 transition-transform duration-200', open && 'rotate-180')}>
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>
      )}
    </div>
  )
}

/** Visible message for a named unlock event (never a silent UI change). */
export function EventNotice({ tone = 'success', title, children, className }) {
  const tones = {
    success: 'border-[#bfe3cc] bg-[#eaf7ef] text-[#1e6b3a]',
    info: 'border-[#c9d8f2] bg-[#eef4fd] text-[#2f4fb3]',
    warning: 'border-[#f1d3a8] bg-[#fff6e8] text-brand-700',
    danger: 'border-[#efc9c6] bg-danger-50 text-danger',
  }
  return (
    <div role="status" className={cx('animate-fade-up flex gap-3 rounded-xl border px-3.5 py-3', tones[tone], className)}>
      {tone === 'success' ? <Icons.unlock className="mt-0.5 shrink-0" /> : <Icons.info className="mt-0.5 shrink-0" />}
      <div className="min-w-0 text-[0.8125rem] leading-[1.1875rem]">
        {title && <p className="font-semibold">{title}</p>}
        {children && <div className={cx(title && 'pt-0.5', 'text-ink-2')}>{children}</div>}
      </div>
    </div>
  )
}

/** "Can't be edited once saved" / read-only notice. */
export function LockNotice({ children }) {
  const t = useT()
  return (
    <div className="flex items-center gap-2 rounded-xl bg-surface px-3 py-2.5 text-[0.8125rem] leading-[1.1875rem] text-ink-2">
      <Icons.lock width="16" height="16" className="shrink-0 text-ink-muted" />
      {children ?? t('This can’t be edited once saved.')}
    </div>
  )
}

/* ------------------------------------------------------------ Tick list */

/**
 * Statement-tick cards (kit T09-06). statements: string[]; value: index[]; onChange(index[]).
 * readOnly shows ticks without interaction. Live count badge "3 of 5 ticked".
 */
export function TickList({ ability, statements, value = [], onChange, readOnly, prompt, className, extraStart }) {
  const t = useT()
  const a = ABILITIES.find((x) => x.id === ability)
  const Icon = Icons[a?.icon] ?? Icons.eye
  const toggle = (i) => onChange?.(value.includes(i) ? value.filter((x) => x !== i) : [...value, i].sort((x, y) => x - y))
  return (
    <section className={cx('flex flex-col gap-3', className)}>
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1.5">
        <p className="flex items-center gap-1.5 text-[0.75rem] font-bold uppercase tracking-[0.96px] text-brand-600">
          <Icon width="16" height="16" /> {t(a?.label ?? ability)}
        </p>
        <span aria-live="polite" className="rounded-full bg-white px-2.5 text-[0.75rem] font-semibold leading-6 text-ink-2 shadow-[inset_0_0_0_1px_#e4e1dd]">
          {t('{n} of {total} ticked', { n: value.length, total: statements.length })}
        </span>
      </div>
      {prompt && <p className="text-[1.125rem] leading-[1.625rem] text-ink">{prompt}</p>}
      <div className="stagger flex flex-col gap-2.5">
        {statements.map((s, i) => {
          const on = value.includes(i)
          const custom = extraStart != null && i >= extraStart
          return (
            <button
              key={i}
              type="button"
              role="checkbox"
              aria-checked={on}
              disabled={readOnly}
              onClick={() => toggle(i)}
              className={cx(
                'flex w-full items-start gap-3 rounded-2xl border bg-white px-4 py-3.5 text-left transition-colors duration-200',
                !readOnly && 'tap-soft hover:border-[#d2cdc7]',
                on ? 'border-brand-600 bg-[#fffaf5]' : 'border-line',
                readOnly && !on && 'opacity-60',
              )}
            >
              <span className={cx('mt-0.5 grid size-6 shrink-0 place-items-center rounded-md border-2 transition-colors', on ? 'border-brand bg-brand text-white' : 'border-[#cfcac4] bg-white')}>
                {on && <Icons.check width="14" height="14" className="animate-check-pop" />}
              </span>
              <span className="min-w-0 flex-1 text-[0.9375rem] leading-[1.375rem] text-ink">
                {t(s)}
                {custom && <span className="ml-2 inline-block rounded bg-surface px-1.5 align-middle text-[0.75rem] font-semibold leading-5 text-ink-muted">{t('Chosen by teacher')}</span>}
              </span>
            </button>
          )
        })}
      </div>
    </section>
  )
}

/* ------------------------------------------------------ Evaluation footer */

/** Kit T09-06 footer: white "Previous" pill + orange-outline "Next" pill. */
export function EvalFooter({ onPrev, onNext, prevDisabled, nextDisabled, nextLabel, loading }) {
  const t = useT()
  return (
    <div className="flex shrink-0 flex-wrap items-center justify-between gap-3 px-4 pb-6 pt-3">
      <button
        type="button"
        onClick={onPrev}
        disabled={prevDisabled}
        className="tap flex min-h-12 min-w-[min(8rem,100%)] flex-1 items-center justify-center gap-1.5 rounded-full border border-line bg-white px-5 text-[1rem] font-semibold text-ink transition-opacity hover:bg-surface disabled:opacity-40 disabled:active:scale-100"
      >
        <Icons.chevronL width="18" height="18" /> {t('Previous')}
      </button>
      <button
        type="button"
        onClick={onNext}
        disabled={nextDisabled || loading}
        className="tap flex min-h-12 min-w-[min(8rem,100%)] flex-1 items-center justify-center gap-1.5 rounded-full border border-brand-700 bg-white px-5 text-[1rem] font-semibold text-brand-700 transition-colors hover:bg-brand-50 disabled:border-line disabled:text-ink-muted disabled:active:scale-100"
      >
        {loading ? <span className="inline-block size-5 animate-spin rounded-full border-2 border-brand-700/30 border-t-brand-700" /> : <>{nextLabel ?? t('Next')} <Icons.chevronR width="18" height="18" /></>}
      </button>
    </div>
  )
}

/* ------------------------------------------------------------ Leave sheet */

/** Kit S02-04: "Leave this …?" with Keep Going / Leave Anyway. */
export function LeaveSheet({ open, title, body, onStay, onLeave }) {
  const t = useT()
  return (
    <Sheet open={open} onClose={onStay}>
      <div role="alertdialog" aria-label={title} className="flex flex-col gap-3 px-4 pb-6 pt-4">
        <p className="text-[1.25rem] font-semibold leading-7 text-ink">{title}</p>
        <p className="text-[0.9375rem] leading-[1.375rem] text-ink-muted">{body ?? t('Your progress will be lost.')}</p>
        <button type="button" onClick={onStay} className="tap mt-2 min-h-12 rounded-full bg-brand text-[1rem] font-semibold text-white hover:bg-brand-hover">{t('Keep Going')}</button>
        <button type="button" onClick={onLeave} className="tap min-h-12 rounded-full border border-brand-700 bg-[#fffaf6] text-[1rem] font-semibold text-brand-700 hover:bg-brand-50">{t('Leave Anyway')}</button>
      </div>
    </Sheet>
  )
}

/* --------------------------------------------------------- Calendar sheet */

const WEEK = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
export const DEMO_TODAY = '2026-09-10'
const iso = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`

/** "15 September 2026" from an ISO date. */
export function formatLong(isoDate) {
  if (!isoDate) return ''
  const [y, m, d] = isoDate.split('-').map(Number)
  return `${d} ${MONTHS[m - 1]} ${y}`
}
/** "15 Sep" from an ISO date. */
export function formatShort(isoDate) {
  if (!isoDate) return ''
  const [, m, d] = isoDate.split('-').map(Number)
  return `${d} ${MONTHS[m - 1].slice(0, 3)}`
}

/**
 * Kit T04-10 calendar sheet. Dates before `min` (default: demo today) are disabled.
 * Dates after `max` (optional, e.g. a later stage's date) are disabled too.
 * onSet(isoDate).
 */
export function CalendarSheet({ open, title, value, min = DEMO_TODAY, max, onClose, onSet }) {
  const t = useT()
  const d = useDate()
  const start = new Date((value || min) + 'T00:00')
  const [month, setMonth] = useState(new Date(start.getFullYear(), start.getMonth(), 1))
  const [picked, setPicked] = useState(value)
  useEffect(() => { if (open) { setPicked(value); const s = new Date((value || min) + 'T00:00'); setMonth(new Date(s.getFullYear(), s.getMonth(), 1)) } }, [open]) // eslint-disable-line react-hooks/exhaustive-deps
  const days = useMemo(() => {
    const first = (month.getDay() + 6) % 7
    const count = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate()
    return [...Array(first).fill(null), ...Array.from({ length: count }, (_, i) => new Date(month.getFullYear(), month.getMonth(), i + 1))]
  }, [month])
  const minMonth = new Date(min.slice(0, 7) + '-01T00:00')
  const maxMonth = max ? new Date(max.slice(0, 7) + '-01T00:00') : null
  const canPrev = month > minMonth
  const canNext = !maxMonth || month < maxMonth
  return (
    <Sheet open={open} onClose={onClose}>
      <div className="px-4 pb-6 pt-3">
        <p className="text-[1.125rem] font-semibold leading-7 text-ink">{title}</p>
        <div className="flex items-center justify-between pt-3">
          <button type="button" aria-label={t('Previous month')} disabled={!canPrev} onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))} className="tap grid size-11 place-items-center rounded-full text-ink hover:bg-surface disabled:text-line"><Icons.chevronL /></button>
          <p className="text-[1rem] font-semibold text-ink">{d(`${MONTHS[month.getMonth()]} ${month.getFullYear()}`)}</p>
          <button type="button" aria-label={t('Next month')} disabled={!canNext} onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))} className="tap grid size-11 place-items-center rounded-full text-ink hover:bg-surface disabled:text-line"><Icons.chevronR /></button>
        </div>
        <div className="grid grid-cols-7 gap-y-1 pt-2 text-center">
          {WEEK.map((w) => <span key={w} className="py-1 text-[0.75rem] font-medium text-ink-muted">{t(w)}</span>)}
          {days.map((day, i) => {
            if (!day) return <span key={`x${i}`} />
            const k = iso(day)
            const disabled = k < min || (max && k > max)
            const on = k === picked
            const today = k === DEMO_TODAY
            return (
              <button
                key={k}
                type="button"
                disabled={disabled}
                aria-pressed={on}
                aria-label={d(formatLong(k))}
                onClick={() => setPicked(k)}
                className={cx(
                  'mx-auto grid size-11 place-items-center rounded-full text-[0.9375rem] transition-colors duration-150',
                  disabled ? 'text-[#b9b5b0]' : 'tap text-ink hover:bg-brand-50',
                  today && !on && 'ring-1 ring-inset ring-brand-600',
                  on && 'animate-check-pop bg-brand font-semibold text-white hover:bg-brand',
                )}
              >
                {day.getDate()}
              </button>
            )
          })}
        </div>
        <div className="flex gap-3 pt-4">
          <button type="button" onClick={onClose} className="tap min-h-12 flex-1 rounded-full border border-line bg-white text-[1rem] font-semibold text-ink hover:bg-surface">{t('Cancel')}</button>
          <button type="button" disabled={!picked} onClick={() => onSet(picked)} className="tap min-h-12 flex-1 rounded-full bg-brand text-[1rem] font-semibold text-white hover:bg-brand-hover disabled:bg-[#d6d3cf] disabled:text-[#77737c]">{t('Set date')}</button>
        </div>
      </div>
    </Sheet>
  )
}

/* ------------------------------------------------------------- Tag sheet */

/**
 * Multi-select with search (subjects, curricular goals, competencies, pedagogies).
 * options: string[] | { code, label }[]; value: string[] (labels or codes).
 */
export function TagSheet({ open, title, options, value, onClose, onDone, searchable = true }) {
  const t = useT()
  const [q, setQ] = useState('')
  const [sel, setSel] = useState(value ?? [])
  useEffect(() => { if (open) { setSel(value ?? []); setQ('') } }, [open]) // eslint-disable-line react-hooks/exhaustive-deps
  const norm = options.map((o) => (typeof o === 'string' ? { key: o, text: o } : { key: o.code, text: `${o.code} · ${o.label}` }))
  const shown = norm.filter((o) => t(o.text).toLowerCase().includes(q.toLowerCase()) || o.text.toLowerCase().includes(q.toLowerCase()))
  return (
    <Sheet open={open} onClose={onClose}>
      <div className="flex max-h-[70vh] flex-col px-4 pb-6 pt-3">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[1.125rem] font-semibold leading-7 text-ink">{title}</p>
            <span className="text-[0.8125rem] text-ink-muted">{t('{n} selected', { n: sel.length })}</span>
          </div>
          <button type="button" onClick={() => onDone(sel)} className="tap min-h-11 shrink-0 rounded-full bg-brand px-5 text-[0.9375rem] font-semibold text-white hover:bg-brand-hover">{t('Done')}</button>
        </div>
        {searchable && (
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={t('Search')} className="mt-3 h-11 shrink-0 rounded-xl border border-line bg-surface px-3 text-[0.9375rem] outline-none transition-colors focus:border-brand focus:bg-white" />
        )}
        <div className="no-scrollbar -mx-1 mt-3 flex-1 overflow-y-auto px-1">
          <div className="flex flex-col gap-2">
            {shown.map((o) => {
              const on = sel.includes(o.key)
              return (
                <button key={o.key} type="button" role="checkbox" aria-checked={on} onClick={() => setSel(on ? sel.filter((x) => x !== o.key) : [...sel, o.key])}
                  className={cx('tap-soft flex items-start gap-3 rounded-xl border px-3 py-3 text-left transition-colors', on ? 'border-brand-600 bg-[#fffaf5]' : 'border-line bg-white hover:bg-cream')}>
                  <span className={cx('mt-0.5 grid size-5 shrink-0 place-items-center rounded border-2', on ? 'border-brand bg-brand text-white' : 'border-[#cfcac4]')}>
                    {on && <Icons.check width="12" height="12" className="animate-check-pop" />}
                  </span>
                  <span className="text-[0.875rem] leading-5 text-ink">{t(o.text)}</span>
                </button>
              )
            })}
            {shown.length === 0 && <p className="py-6 text-center text-[0.8125rem] text-ink-muted">{t('No matches')}</p>}
          </div>
        </div>
      </div>
    </Sheet>
  )
}

/* --------------------------------------------------- Bands & assessor table */

const LEVEL_STYLE = {
  B: 'bg-[#eef4fd] text-[#2f4fb3]',
  P: 'bg-[#fff2e6] text-brand-700',
  A: 'bg-[#eaf7ef] text-[#1e6b3a]',
  unbanded: 'bg-danger-50 text-danger',
}
/** Performance level pill — growth framing (Beginner → Proficient → Advanced), label always shown. */
export function LevelBadge({ level, className }) {
  const t = useT()
  const l = LEVELS.find((x) => x.id === level)
  return (
    <span className={cx('inline-flex items-center gap-1 rounded-full px-2.5 text-[0.75rem] font-semibold leading-6', LEVEL_STYLE[level] ?? LEVEL_STYLE.unbanded, className)}>
      <span aria-hidden className="flex gap-0.5">
        {['B', 'P', 'A'].map((x, i) => <span key={x} className={cx('h-2 w-1 rounded-full', ['B', 'P', 'A'].indexOf(level) >= i ? 'bg-current' : 'bg-current/25 opacity-30')} />)}
      </span>
      {l ? t(l.label) : t('Outside band table')}
    </span>
  )
}

/**
 * Assessor summary (Overview page): rows teacher / learner / peer × 3 abilities.
 * scores: { teacher: { awareness: n, … }, learner: {…}, peer: {…} }; max: same shape.
 * Bands are looked up from config — never computed here.
 */
export function AssessorTable({ instrument, scores, max, className }) {
  const t = useT()
  const rows = [
    ['teacher', 'Teacher'],
    ['learner', 'Learner'],
    ['peer', 'Peer'],
  ]
  // One stacked card per assessor (never a wide table that scrolls sideways on small phones)
  return (
    <section aria-label={t('Scores by assessor and ability')} className={cx('flex flex-col gap-2', className)}>
      {rows.map(([key, label]) => (
        <div key={key} className="rounded-2xl border border-line bg-white px-3.5 py-3">
          <ProvenanceChip kind={key === 'learner' ? 'student' : key}>{t(label)}</ProvenanceChip>
          <dl className="mt-2 flex flex-col divide-y divide-line">
            {ABILITIES.map((a) => {
              const score = scores?.[key]?.[a.id]
              const band = score == null ? null : bandFor(instrument, key, score)
              return (
                <div key={a.id} className="flex flex-wrap items-center gap-x-3 gap-y-1 py-2">
                  <dt className="min-w-[min(7rem,100%)] flex-1 text-[0.875rem] font-medium text-ink-2">{t(a.label)}</dt>
                  <dd className="flex flex-wrap items-center gap-2">
                    {score == null ? (
                      <span className="text-[0.875rem] text-ink-muted">—</span>
                    ) : (
                      <>
                        <span className="text-[0.875rem] font-semibold text-ink">{score}<span className="font-normal text-ink-muted"> / {max?.[key]?.[a.id] ?? '—'}</span></span>
                        <LevelBadge level={band.id} />
                      </>
                    )}
                  </dd>
                </div>
              )
            })}
          </dl>
        </div>
      ))}
    </section>
  )
}

/** Small info dot that opens the open-question text (so config gaps stay visible). */
export function OpenQuestion({ code, text }) {
  const t = useT()
  const [open, setOpen] = useState(false)
  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className="tap inline-flex min-h-11 items-center gap-1 rounded-full bg-danger-50 px-3 text-[0.75rem] font-semibold text-danger">
        <Icons.info width="14" height="14" /> {code}
      </button>
      <Modal open={open} onClose={() => setOpen(false)} className="max-w-[340px] p-5">
        <p className="text-[0.75rem] font-bold uppercase tracking-[0.96px] text-danger">{t('Open question')} · {code}</p>
        <p className="pt-2 text-[0.9375rem] leading-[1.375rem] text-ink">{t(text)}</p>
        <button type="button" onClick={() => setOpen(false)} className="tap mt-4 min-h-11 w-full rounded-full bg-brand text-[0.9375rem] font-semibold text-white hover:bg-brand-hover">{t('OK')}</button>
      </Modal>
    </>
  )
}

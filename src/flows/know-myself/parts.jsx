import { useCallback } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { cx } from '../../components/ui.jsx'
import backIcon from '../../assets/common/back.svg'
import { useAppStore } from '../../store/AppStore.jsx'
import { useDate, useT } from '../../i18n/index.js'
import { findClass, fmtLong, getLive, getSurvey } from './data.js'

const HI_MONTHS_LONG = {
  January: 'जनवरी', February: 'फ़रवरी', March: 'मार्च', April: 'अप्रैल', May: 'मई', June: 'जून',
  July: 'जुलाई', August: 'अगस्त', September: 'सितंबर', October: 'अक्टूबर', November: 'नवंबर', December: 'दिसंबर',
}

/** Long date ("15 September 2026") from an ISO string, with Hindi month names in Hindi mode. */
export function useLongDate() {
  const { language } = useAppStore()
  const d = useDate()
  return useCallback(
    (iso) => {
      const s = fmtLong(iso)
      if (language !== 'hi') return s
      return d(s.replace(/\b(January|February|March|April|May|June|July|August|September|October|November|December)\b/g, (m) => HI_MONTHS_LONG[m]))
    },
    [language, d],
  )
}

/** Class + survey resolved from the route (`:classId`, `?s=A3`, or the live activity). */
export function useKnowMyself() {
  const { classId } = useParams()
  const [params] = useSearchParams()
  const { classes } = useAppStore()
  const t = useT()
  const cls = findClass(classes, classId)
  const live = getLive(classId)
  const survey = getSurvey(params.get('s') ?? live?.surveyId ?? 'A3')
  const grade = `${cls.grade}${cls.section}`
  return {
    classId,
    cls,
    live,
    survey,
    gradeLabel: t('Grade {grade}', { grade }),
    /** "Grade 9A · 40 students" */
    classSubtitle: t('Grade {grade} · {n} students', { grade, n: cls.students }),
  }
}

/** "Class 9 A" / "Class 11 B - Humanities" (kit T01-01 card title). */
export const classTitle = (c, t) => {
  const base = t('Class {grade} {section}', { grade: c.grade, section: c.section })
  return c.stream ? `${base} - ${t(c.stream)}` : base
}

/**
 * White app bar: back, title (+ orange "Grade 9A · 40 students" subtitle), optional step counter
 * or trailing control. Text wraps instead of truncating (200 % text, long Hindi titles). The title
 * is the screen's <h1> only when the body has no heading of its own (`heading`).
 */
export function KMAppBar({ title, subtitle, step, onBack, subtitleClassName, right, heading = false }) {
  const navigate = useNavigate()
  const t = useT()
  const Title = heading ? 'h1' : 'p'
  return (
    <div className="flex min-h-[69px] shrink-0 items-center gap-2 border-b border-line bg-white py-2 pl-2 pr-4">
      <button
        aria-label={t('Back')}
        onClick={onBack ?? (() => navigate(-1))}
        className="tap grid size-[44px] shrink-0 place-items-center rounded-lg hover:bg-black/5"
      >
        <img alt="" width="20" height="20" src={backIcon} />
      </button>
      <div className="flex min-w-0 flex-1 flex-wrap items-center gap-x-3 gap-y-1 py-1">
        <div className="min-w-[min(8rem,100%)] flex-1">
          <Title className="break-words text-[1.125rem] font-semibold leading-6 text-black">{title}</Title>
          {subtitle && (
            <p className={cx('break-words text-[0.875rem] font-bold leading-[1.1875rem] text-brand-700', subtitleClassName)}>{subtitle}</p>
          )}
        </div>
        {right}
        {step && <p className="shrink-0 text-[1rem] leading-6 text-ink">{step}</p>}
      </div>
    </div>
  )
}

export function SectionLabel({ children, className, id }) {
  return (
    <p id={id} className={cx('text-[0.75rem] font-bold uppercase leading-4 tracking-[0.96px] text-brand-600', className)}>{children}</p>
  )
}

/** Row of bordered stat cells (Section / Questions / Competency). */
export function MetaCells({ items }) {
  return (
    // gap-px over the line colour draws the dividers, so cells can wrap onto a second row (200 % text)
    <div className="flex w-full flex-wrap gap-px overflow-hidden rounded-[10px] border border-line bg-line">
      {items.map(([value, label]) => (
        <div key={label} className="flex min-w-[min(5.5rem,100%)] flex-auto flex-col items-center justify-center bg-white px-2 py-3">
          <p className="break-words text-center text-[0.9375rem] font-bold leading-[1.375rem] text-ink [overflow-wrap:anywhere]">{value}</p>
          <p className="pt-1 text-center text-[0.75rem] font-bold uppercase leading-4 tracking-[0.96px] text-ink-muted [overflow-wrap:anywhere]">{label}</p>
        </div>
      ))}
    </div>
  )
}

/** Two-option segmented control with a sliding white pill. */
export function SegTabs({ tabs, value, onChange, size = 'md' }) {
  const idx = Math.max(0, tabs.findIndex((t) => t.value === value))
  return (
    <div className="relative flex w-full rounded-full bg-[#ece1d9] p-1" role="tablist">
      <div
        className={cx(
          'absolute bottom-1 left-1 top-1 rounded-full bg-white transition-transform duration-300 ease-[cubic-bezier(.2,.8,.2,1)]',
          size === 'md'
            ? 'shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.06)]'
            : 'shadow-[0_1px_1px_rgba(0,0,0,0.05)]',
        )}
        style={{ width: `calc((100% - 8px) / ${tabs.length})`, transform: `translateX(${idx * 100}%)` }}
      />
      {tabs.map((t) => {
        const active = t.value === value
        return (
          <button
            key={t.value}
            role="tab"
            aria-selected={active}
            onClick={() => onChange(t.value)}
            className={cx(
              'tap relative z-10 flex min-h-11 min-w-0 flex-1 items-center justify-center rounded-full text-center transition-colors duration-200',
              size === 'md' ? 'px-4 py-2 text-[0.875rem] leading-5' : 'px-3.5 py-2 text-[0.8125rem] leading-4',
              active ? 'font-semibold text-slate-900' : 'font-medium text-ink-muted hover:text-ink-2',
            )}
          >
            {t.label}
          </button>
        )
      })}
    </div>
  )
}

/** Card on the materials list (Discussion guide / Activity Sample). */
export function MaterialCard({ title, desc, action, onAction, variant = 'soft' }) {
  return (
    <div className="flex w-full flex-wrap items-center gap-3 rounded-[10px] border border-line bg-white p-4">
      <div className="min-w-[min(10rem,100%)] flex-1">
        <p className="text-[0.9375rem] font-bold leading-[1.375rem] text-ink">{title}</p>
        <p className="pt-0.5 text-[0.8125rem] leading-[1.1875rem] text-ink-muted">{desc}</p>
      </div>
      <button
        onClick={onAction}
        className={cx(
          'tap max-w-full transition-colors',
          variant === 'soft'
            ? 'min-h-11 min-w-11 rounded-full bg-brand-50 px-4 text-[0.8125rem] font-bold leading-[1.1875rem] text-brand-700 hover:bg-[#ffe8d4]'
            : 'min-h-12 min-w-[min(8rem,100%)] rounded-lg border border-line bg-white px-6 text-[0.9375rem] font-bold leading-[1.375rem] text-ink hover:bg-surface',
        )}
      >
        {action}
      </button>
    </div>
  )
}

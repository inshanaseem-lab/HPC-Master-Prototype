import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { cx } from '../../components/ui.jsx'
import { useAppStore } from '../../store/AppStore.jsx'
import { useT, useDate } from '../../i18n/index.js'
import { fmtDate, fmtShort } from './data.js'
import backIcon from '../../assets/common/back.svg'
import checkCircle from '../../assets/classroom/check-circle.svg'
import checkIcon from '../../assets/classroom/check.svg'

/**
 * White app bar: back, title (+ orange subtitle), step counter. Text wraps rather than truncating
 * (200 % text, Hindi). The title is the screen's <h1> only when the body has none (`heading`).
 */
export function Header({ title, subtitle, step, onBack, heading = false }) {
  const navigate = useNavigate()
  const t = useT()
  const Title = heading ? 'h1' : 'p'
  return (
    <div className="flex min-h-[69px] shrink-0 items-center gap-3 border-b border-line bg-white px-4 py-2">
      <button
        aria-label={t('Back')}
        onClick={onBack ?? (() => navigate(-1))}
        className="tap -ml-2 grid size-[44px] shrink-0 place-items-center rounded-lg hover:bg-black/5"
      >
        <img alt="" width="20" height="20" src={backIcon} />
      </button>
      <div className="flex min-w-0 flex-1 flex-wrap items-center gap-x-3 gap-y-1">
        <div className="min-w-[min(8rem,100%)] flex-1">
          <Title className="break-words text-[1.125rem] font-semibold leading-6 text-ink">{title}</Title>
          {subtitle && <p className="break-words text-[0.875rem] font-bold leading-[1.1875rem] text-brand-700">{subtitle}</p>}
        </div>
        {step && <p className="shrink-0 text-[1rem] leading-6 text-ink">{step}</p>}
      </div>
    </div>
  )
}

/** "Class 9 A" / "Class 11 B - Humanities" (kit T01-01 card title). */
export const classTitle = (c, t) => {
  const base = t('Class {grade} {section}', { grade: c.grade, section: c.section })
  return c.stream ? `${base} - ${t(c.stream)}` : base
}

export const classLabel = (cls, t) => t('Grade {grade} · {n} students', { grade: cls.id, n: cls.students ?? 40 })

const LONG_MONTHS_HI = {
  January: 'जनवरी', February: 'फ़रवरी', March: 'मार्च', April: 'अप्रैल', May: 'मई', June: 'जून',
  July: 'जुलाई', August: 'अगस्त', September: 'सितंबर', October: 'अक्टूबर', November: 'नवंबर', December: 'दिसंबर',
}
/** Localised date formatters: long ("15 September 2026") and short ("15 Sep 2026"). */
export function useDates() {
  const { language } = useAppStore()
  const d = useDate()
  return {
    long: (iso) => {
      const s = fmtDate(iso)
      return language === 'hi' ? s.replace(/\b(January|February|March|April|May|June|July|August|September|October|November|December)\b/g, (m) => LONG_MONTHS_HI[m]) : s
    },
    short: (iso) => d(fmtShort(iso)),
  }
}

export function SectionLabel({ children, className, id }) {
  return <p id={id} className={cx('text-[0.75rem] font-bold uppercase leading-4 tracking-[0.96px] text-brand-600', className)}>{children}</p>
}

/** "Why this matters" beige card. */
export function WhyCard({ children }) {
  const t = useT()
  return (
    <div className="w-full rounded-[10px] border border-line bg-[#faf8f6] p-4">
      <SectionLabel>{t('Why this matters')}</SectionLabel>
      <p className="pt-2 text-[1rem] font-medium leading-6 text-ink">{children}</p>
    </div>
  )
}

/** Row of centred value/label cells separated by vertical rules. */
export function MetaCells({ cells }) {
  return (
    // gap-px over the line colour draws the dividers, so cells can wrap onto a second row (200 % text)
    <div className="flex min-h-[68px] w-full flex-wrap gap-px overflow-hidden rounded-[10px] border border-line bg-line">
      {cells.map((c) => (
        <div key={c.label} className="flex min-w-[min(5.5rem,100%)] flex-auto flex-col items-center justify-center bg-white px-2 py-3">
          <p className="text-center text-[0.9375rem] font-bold leading-[1.375rem] text-ink [overflow-wrap:anywhere]">{c.value}</p>
          <p className="pt-1 text-center [overflow-wrap:anywhere] text-[0.75rem] font-bold uppercase leading-4 tracking-[0.96px] text-ink-muted">{c.label}</p>
        </div>
      ))}
    </div>
  )
}

/** Orange-filled square checkbox (rubric statements). */
export function CheckBox({ checked }) {
  return (
    <span
      className={cx(
        'relative grid size-6 shrink-0 place-items-center rounded-[4px] border-2 transition-colors duration-200',
        checked ? 'border-brand bg-brand' : 'border-[#e5e7eb] bg-white',
      )}
    >
      {checked && <img alt="" width="14" height="14" src={checkIcon} className="animate-check-pop" />}
    </span>
  )
}

/** Centered green-check success message. */
export function SuccessBody({ title, lines }) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 p-4 text-center">
      <div className="grid size-14 animate-pop-in place-items-center rounded-full bg-[#eaf6ec]">
        <img alt="" width="28" height="28" src={checkCircle} />
      </div>
      <div className="stagger flex flex-col items-center gap-1">
        <h1 className="text-[1.375rem] font-semibold leading-7 text-ink">{title}</h1>
        {lines.map((l) => (
          <p key={l} className="max-w-[22rem] text-[1rem] font-medium leading-6 text-ink-muted">{l}</p>
        ))}
      </div>
    </div>
  )
}

/** Segmented pill tabs with a sliding white indicator. */
export function SegmentedTabs({ tabs, value, onChange, className }) {
  const idx = Math.max(0, tabs.findIndex((t) => t.id === value))
  return (
    <div role="tablist" className={cx('relative flex w-full gap-1 rounded-full bg-[#ece1d9] p-1', className)}>
      <span
        aria-hidden
        className="absolute bottom-1 left-1 top-1 rounded-full bg-white shadow-[0_1px_1px_rgba(0,0,0,0.05),0_2px_4px_rgba(0,0,0,0.06)] transition-transform duration-300 ease-out"
        style={{ width: `calc((100% - 8px - ${(tabs.length - 1) * 4}px) / ${tabs.length})`, transform: `translateX(calc(${idx * 100}% + ${idx * 4}px))` }}
      />
      {tabs.map((t) => (
        <button
          key={t.id}
          role="tab"
          aria-selected={t.id === value}
          onClick={() => onChange(t.id)}
          className={cx(
            'tap relative z-10 min-h-11 min-w-0 flex-1 rounded-full px-3.5 py-2 text-center text-[0.8125rem] font-medium leading-4 transition-colors duration-200',
            t.id === value ? 'text-black' : 'text-ink-muted hover:text-ink',
          )}
        >
          {t.label}
        </button>
      ))}
    </div>
  )
}

/** Counts from 0 to `to` quickly. */
export function CountUp({ to, ms = 600 }) {
  const [n, setN] = useState(0)
  useEffect(() => {
    let raf
    const start = performance.now()
    const tick = (t) => {
      const p = Math.min(1, (t - start) / ms)
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [to, ms])
  return n
}

import { useCallback, useState } from 'react'
import { useParams } from 'react-router-dom'
import { TopAppBar, Modal, cx } from '../../components/ui.jsx'
import { useAppStore, DEFAULT_CLASSES } from '../../store/AppStore.jsx'
import { useDate, useT } from '../../i18n/index.js'
import { formatLong, formatShort, Icons } from '../../hpc/components.jsx'

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
      const s = formatLong(iso)
      if (language !== 'hi') return s
      return d(s.replace(/\b(January|February|March|April|May|June|July|August|September|October|November|December)\b/g, (m) => HI_MONTHS_LONG[m]))
    },
    [language, d],
  )
}
/** Short date ("15 Sep") from an ISO string, localised. */
export function useShortDate() {
  const d = useDate()
  return useCallback((iso) => (iso ? d(formatShort(iso.slice(0, 10))) : ''), [d])
}

/**
 * Resolves the class from the route. Reads the teacher's saved classes first, then the demo
 * defaults; unknown ids fall back to a 9–12 class parsed from the id (never grades 7/8).
 */
export function useClassInfo() {
  const { classId = '9A' } = useParams()
  const { classes } = useAppStore()
  const t = useT()
  const parsed = () => {
    const g = classId.replace(/\D/g, '')
    const grade = ['9', '10', '11', '12'].includes(g) ? g : '9'
    return { id: classId, grade, section: classId.replace(/\d/g, '') || 'A', students: 46 }
  }
  const cls = classes.find((c) => c.id === classId) ?? DEFAULT_CLASSES.find((c) => c.id === classId) ?? parsed()
  const stream = cls.stream ? t(cls.stream) : null
  /** "Class 9 A" or "Class 12 A - Science" */
  const className = stream
    ? t('Class {grade} {section} - {stream}', { grade: cls.grade, section: cls.section, stream })
    : t('Class {grade} {section}', { grade: cls.grade, section: cls.section })
  /** "Grade 9A · 46 students" or "Grade 12A · Science · 58 students" (kit T06-01) */
  const classSubtitle = stream
    ? t('Grade {grade} · {stream} · {n} students', { grade: cls.id, stream, n: cls.students })
    : t('Grade {grade} · {n} students', { grade: cls.id, n: cls.students })
  return { classId, cls, className, classSubtitle }
}

/** App bar used across PBI screens: title + bold orange subtitle + optional right slot. */
export function PbiAppBar({ title, subtitle, right, onBack }) {
  const t = useT()
  return (
    <TopAppBar
      onBack={onBack}
      title={title ?? t('Problem Based Enquiry')}
      subtitle={subtitle && <span className="block text-[0.875rem] font-bold leading-[1.1875rem] text-brand-700">{subtitle}</span>}
      right={right}
    />
  )
}

export function StepCount({ children }) {
  return <p className="shrink-0 text-[1rem] leading-6 text-ink">{children}</p>
}

export function SectionLabel({ children, className }) {
  return <p className={cx('text-[0.75rem] font-bold uppercase leading-4 tracking-[0.96px] text-brand-600', className)}>{children}</p>
}

export function Card({ children, className, tone = 'white' }) {
  return (
    <div className={cx('w-full rounded-[18px] border border-line p-4', tone === 'soft' ? 'bg-[#faf8f6]' : 'bg-white', className)}>
      {children}
    </div>
  )
}

/** Kit "Section C · Problem Based Enquiry" chip (S01-02 colours). */
export function SectionChip({ className }) {
  const t = useT()
  return (
    <span className={cx('inline-flex w-fit rounded-md bg-section-c-bg px-2.5 py-1 text-[0.875rem] font-medium leading-5 text-section-c', className)}>
      {t('Section C · Problem Based Enquiry')}
    </span>
  )
}

/** Row of centered meta cells (value + caption) split by vertical rules. */
export function MetaCells({ items }) {
  return (
    <div className="flex min-h-[68px] w-full overflow-hidden rounded-[18px] border border-line bg-white">
      {items.map(([value, label], i) => (
        <div key={label} className={cx('flex min-w-0 flex-1 flex-col items-center px-2 py-3', i > 0 && 'border-l border-line')}>
          <p className="max-w-full break-words text-center text-[0.9375rem] font-bold leading-[1.375rem] text-ink">{value}</p>
          <p className="pt-1 text-center text-[0.75rem] leading-4 text-ink-muted">{label}</p>
        </div>
      ))}
    </div>
  )
}

/**
 * Pill segmented tabs. The selected tab carries its own white fill (rather than one sliding
 * indicator) so the row can wrap onto two lines with large text or long Hindi labels.
 */
export function SegmentedTabs({ tabs, value, onChange, className }) {
  return (
    <div className={cx('flex w-full flex-wrap gap-1 rounded-[1.625rem] bg-[#ece8e3] p-1', className)} role="tablist">
      {tabs.map((t) => (
        <button
          key={t.value}
          type="button"
          role="tab"
          aria-selected={t.value === value}
          onClick={() => onChange(t.value)}
          className={cx(
            'tap flex min-h-11 min-w-[min(4.5rem,100%)] flex-1 items-center justify-center break-words rounded-full px-2 py-1.5 text-center text-[0.8125rem] font-medium leading-4 transition-colors duration-200',
            t.value === value ? 'bg-white text-black shadow-[0_1px_1px_rgba(0,0,0,0.05),0_2px_4px_rgba(0,0,0,0.06)]' : 'text-ink-muted hover:text-ink',
          )}
        >
          {t.label}
        </button>
      ))}
    </div>
  )
}

export function Avatar({ children, className }) {
  return (
    <div className={cx('grid size-11 shrink-0 place-items-center rounded-full bg-brand-50 text-[0.875rem] font-semibold text-brand-700', className)}>
      {children}
    </div>
  )
}

/** Small status pill: tone ∈ done | wait | todo | danger | muted. Always text, never colour only. */
export function Pill({ tone = 'muted', children, className }) {
  const tones = {
    done: 'bg-[#e3f4e8] text-[#1e6b3a]',
    wait: 'bg-brand-50 text-brand-700',
    todo: 'bg-surface text-ink-2',
    danger: 'bg-danger-50 text-danger',
    muted: 'bg-surface text-ink-muted',
    info: 'bg-[#eef4fd] text-[#2f4fb3]',
  }
  return <span className={cx('inline-flex max-w-full shrink-0 items-center gap-1 rounded-full px-2.5 text-[0.75rem] font-semibold leading-6', tones[tone], className)}>{children}</span>
}

/** Textarea with label, hint, counter and invalid (shake) state. */
export function Field({ label, hint, value, onChange, placeholder, rows = 3, invalid, error, max, readOnly, optional }) {
  const t = useT()
  return (
    <label className="flex flex-col gap-1.5">
      {label && (
        <span className="text-[0.9375rem] font-semibold leading-[1.375rem] text-ink">
          {label} {optional && <span className="text-[0.8125rem] font-normal text-ink-muted">· {t('Optional')}</span>}
        </span>
      )}
      {hint && <span className="-mt-1 text-[0.8125rem] leading-[1.1875rem] text-ink-muted">{hint}</span>}
      <textarea
        value={value}
        readOnly={readOnly}
        maxLength={max}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        aria-invalid={invalid || undefined}
        className={cx(
          'w-full resize-none rounded-2xl border bg-white px-4 py-3 text-[0.9375rem] leading-[1.375rem] text-ink outline-none transition-colors duration-200 placeholder:text-[#8f8c95] focus:border-brand',
          invalid ? 'animate-shake border-danger' : 'border-line',
          readOnly && 'bg-surface',
        )}
      />
      <span className="flex justify-between gap-3">
        <span className="text-[0.75rem] leading-4 text-danger">{invalid && error}</span>
        {max && <span className={cx('text-[0.75rem] leading-4', value.length >= max ? 'text-danger' : 'text-ink-muted')}>{value.length} / {max}</span>}
      </span>
    </label>
  )
}

/** Kit T09-05 file row with View (preview modal) and Download. */
export function FileRow({ name, size = '1.2 MB', onDownload }) {
  const t = useT()
  const [open, setOpen] = useState(false)
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 rounded-2xl border border-line bg-white px-4 py-3">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ff7900" strokeWidth="1.8" aria-hidden><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" /><path d="M14 3v5h5" /></svg>
      <div className="min-w-[min(8rem,100%)] flex-1">
        <p className="break-words text-[0.9375rem] font-medium leading-[1.375rem] text-ink">{name}</p>
        <p className="text-[0.8125rem] leading-[1.1875rem] text-ink-muted">{size}</p>
      </div>
      <button type="button" onClick={() => setOpen(true)} className="tap min-h-11 rounded-lg px-2 text-[0.9375rem] font-medium text-brand-700 hover:bg-brand-50">{t('View')}</button>
      <button type="button" onClick={onDownload} className="tap min-h-11 rounded-lg px-2 text-[0.9375rem] font-medium text-brand-700 hover:bg-brand-50">{t('Download')}</button>
      <Modal open={open} onClose={() => setOpen(false)} className="max-w-[360px] overflow-hidden">
        <div className="flex items-center justify-between gap-2 border-b border-line px-4 py-3">
          <p className="min-w-0 break-words text-[0.9375rem] font-semibold text-ink">{name}</p>
          <button type="button" aria-label={t('Close')} onClick={() => setOpen(false)} className="tap grid size-11 place-items-center rounded-full hover:bg-surface">✕</button>
        </div>
        <div className="grid h-[360px] max-h-[50vh] place-items-center bg-surface p-6">
          <div className="flex h-full w-[70%] flex-col gap-2 rounded-md bg-white p-4 shadow-card" aria-label={t('File preview')}>
            <div className="h-3 w-2/3 rounded bg-line" />
            {Array.from({ length: 9 }, (_, i) => <div key={i} className="h-2 rounded bg-surface" style={{ width: `${90 - (i % 3) * 15}%` }} />)}
          </div>
        </div>
        <p className="px-4 py-3 text-center text-[0.75rem] text-ink-muted">{t('Preview only in this prototype')}</p>
      </Modal>
    </div>
  )
}

/** Centered success state (kit T06-03 / T09-13). */
export function SuccessState({ title, body }) {
  return (
    <div className="flex min-h-full flex-col items-center justify-center gap-3 px-8 py-16 text-center">
      <span className="grid size-16 animate-pop-in place-items-center rounded-full bg-[#e3f4e8] text-[#1e6b3a]"><Icons.check width="30" height="30" /></span>
      <p className="animate-fade-up pt-2 text-[1.375rem] font-semibold leading-7 text-ink">{title}</p>
      <p className="animate-fade-up text-[0.9375rem] leading-[1.375rem] text-ink-muted">{body}</p>
    </div>
  )
}

/** Loading skeleton shown while a screen "fetches" (~500 ms). */
export function Skeleton({ rows = 4 }) {
  return (
    <div className="flex flex-col gap-3 p-4" aria-busy="true">
      {Array.from({ length: rows }, (_, i) => (
        <div key={i} className="h-20 animate-shimmer rounded-[18px] bg-[linear-gradient(90deg,#ece8e3_0%,#f7f5f2_50%,#ece8e3_100%)] bg-[length:800px_100%]" />
      ))}
    </div>
  )
}

/** Offline guard used before every save. Returns true when the save may proceed. */
export function useOnlineGuard() {
  const { showToast } = useAppStore()
  const t = useT()
  return useCallback(() => {
    if (typeof navigator !== 'undefined' && navigator.onLine === false) {
      showToast(t('You’re offline. Your draft is kept — try again when you’re connected.'), 'error')
      return false
    }
    return true
  }, [showToast, t])
}

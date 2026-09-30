import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { cx } from '../../components/ui.jsx'
import { useT } from '../../i18n/index.js'
import { useAppStore } from '../../store/AppStore.jsx'
import { MAX_BYTES, MAX_FILES, formatSize, isSupported } from './data.js'
import { deadlinePassedParam } from './pbiModel.js'
import { ActionSheet, CameraIcon, CheckIcon, FileIcon, TextLink, TrashIcon, UploadIcon, shouldFailOnce } from './parts.jsx'

/** Kit progress bar: track #ffd5b0, fill brand-bright (decorative). */
export function StepProgress({ value }) {
  return (
    <div className="h-1 w-full shrink-0 bg-[#ffd5b0]" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(value * 100)}>
      <div className="h-full origin-left bg-brand-bright transition-[width] duration-300 ease-out" style={{ width: `${Math.round(value * 100)}%` }} />
    </div>
  )
}

/** Labelled textarea / input with inline error + shake. */
export function Field({ label, hint, value, onChange, error, shake, rows = 3, placeholder, input, max = 1000, optional, children, id }) {
  const t = useT()
  const cls = cx(
    'w-full rounded-lg border bg-white px-[15px] text-[0.875rem] leading-5 text-ink outline-none transition-colors placeholder:text-[#8a8790] focus:border-brand',
    error ? 'border-danger' : 'border-line',
  )
  return (
    <label className="flex flex-col gap-1.5" id={id}>
      <span className="text-[0.8125rem] font-medium leading-[1.1875rem] text-ink">
        {label}
        {optional && <span className="font-normal text-ink-muted"> · {t('optional')}</span>}
      </span>
      {hint && <span className="-mt-1 text-[0.75rem] leading-[1.125rem] text-ink-muted">{hint}</span>}
      {children ?? (input ? (
        <input value={value} onChange={(e) => onChange(e.target.value.slice(0, max))} placeholder={placeholder} className={cx(cls, 'min-h-[50px] py-3')} />
      ) : (
        <textarea value={value} rows={rows} onChange={(e) => onChange(e.target.value.slice(0, max))} placeholder={placeholder} className={cx(cls, 'min-h-[80px] resize-none py-3.5')} />
      ))}
      {error && <span key={shake} role="alert" className={cx('text-[0.75rem] leading-4 text-danger', shake ? 'animate-shake' : '')}>{error}</span>}
    </label>
  )
}

/** A white card block with an overline and optional right slot (chips). */
export function Block({ label, right, children, className }) {
  return (
    <div className={cx('flex flex-col gap-2.5 rounded-2xl border border-[#e5e6e1] bg-white p-4', className)}>
      {(label || right) && (
        <div className="flex flex-wrap items-start justify-between gap-2">
          {label && <p className="min-w-0 pt-0.5 text-[0.75rem] font-bold uppercase leading-4 tracking-[0.96px] text-ink-muted">{label}</p>}
          {right}
        </div>
      )}
      {children}
    </div>
  )
}

/** Question → answer rows (read-only view of a submitted form). */
export function AnswerList({ rows }) {
  const t = useT()
  return (
    <div className="flex flex-col">
      {rows.map(([q, v], i) => (
        <div key={q} className={cx('flex flex-col gap-0.5 py-2.5', i > 0 && 'border-t border-[#f1efec]')}>
          <span className="text-[0.8125rem] leading-[1.1875rem] text-ink-muted">{t(q)}</span>
          <span className="whitespace-pre-wrap break-words text-[0.9375rem] font-medium leading-[1.375rem] text-ink">{v || '—'}</span>
        </div>
      ))}
    </div>
  )
}

/* ------------------------------------------------------------ Submit helper */

/**
 * Save/submit with the handbook states: ~650 ms spinner, offline → error toast (draft kept),
 * ?deadline=passed → S06-03 sheet, ?fail=submit → S06-02 sheet (retry works).
 *   const s = useSubmitter(); s.run('pbi-s1', () => emit(...), onDone, onOffline)
 */
export function useSubmitter() {
  const t = useT()
  const { search } = useLocation()
  const { showToast } = useAppStore()
  const [loading, setLoading] = useState(false)
  const [sheet, setSheet] = useState(null) // 'failed' | 'deadline'
  const last = useRef(null)
  const run = (key, action, done, keepDraft) => {
    last.current = [key, action, done, keepDraft]
    setSheet(null)
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      if (typeof navigator !== 'undefined' && navigator.onLine === false) {
        keepDraft?.()
        showToast(t('You’re offline. Your draft is saved on this phone.'), 'error')
        return
      }
      if (deadlinePassedParam(search)) { setSheet('deadline'); return }
      if (shouldFailOnce(search, 'submit', key)) { keepDraft?.(); setSheet('failed'); return }
      action()
      done?.()
    }, 650)
  }
  const retry = () => last.current && run(...last.current)
  return { loading, sheet, setSheet, run, retry }
}

/** The two failure sheets used by every submit (kit S06-02 / S06-03). */
export function SubmitSheets({ s, onDeadline, what }) {
  const t = useT()
  return (
    <>
      <ActionSheet
        open={s.sheet === 'failed'}
        onClose={() => s.setSheet(null)}
        icon
        title={t('Couldn’t submit')}
        body={t('Check your internet connection and try again. Your work is still here.')}
        primary={t('Try Again')}
        onPrimary={s.retry}
        loading={s.loading}
        secondary={t('Cancel')}
        onSecondary={() => s.setSheet(null)}
      />
      <ActionSheet
        open={s.sheet === 'deadline'}
        onClose={() => s.setSheet(null)}
        title={t('The deadline has passed')}
        body={t('The deadline for {what} passed before you submitted, so your work wasn’t recorded.', { what })}
        primary={t('Back to My Activities')}
        onPrimary={onDeadline}
      />
    </>
  )
}

/* ------------------------------------------------------------ Files */

const liveUrls = new Set()
let uid = 0

/**
 * Optional files with real <input type=file>, upload progress, format/size checks and the
 * fail-once hook (?fail=upload or a file name containing "fail") — kit S04-02/03, S06-06.
 * value: [{ id, name, size, type }]; onChange(files); onBusy(bool)
 */
export function FilePicker({ value, onChange, onBusy, failKey }) {
  const t = useT()
  const { search } = useLocation()
  const { showToast } = useAppStore()
  const [files, setFiles] = useState(() => (value ?? []).map((f) => ({ ...f, progress: 100, error: null })))
  const deviceRef = useRef(null)
  const cameraRef = useRef(null)
  const uploading = files.some((f) => !f.error && f.progress < 100)

  useEffect(() => {
    onBusy?.(uploading || files.some((f) => f.error))
    onChange(files.filter((f) => !f.error && f.progress >= 100).map(({ id, name, size, type }) => ({ id, name, size, type })))
  }, [files]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!uploading) return
    const timer = setInterval(() => {
      setFiles((fs) => fs.map((f) => {
        if (f.error || f.progress >= 100) return f
        const p = Math.min(100, f.progress + 8 + Math.random() * 14)
        if (f.willFail && p >= 55) return { ...f, progress: 55, error: 'upload', willFail: false }
        return { ...f, progress: p }
      }))
    }, 110)
    return () => clearInterval(timer)
  }, [uploading])

  const onFiles = (e) => {
    const list = Array.from(e.target.files || [])
    e.target.value = ''
    if (!list.length) return
    const room = MAX_FILES - files.length
    if (list.length > room) showToast(t('You can add up to {n} files', { n: MAX_FILES }), 'error')
    const added = list.slice(0, Math.max(0, room)).map((f) => {
      const url = URL.createObjectURL(f)
      liveUrls.add(url)
      const base = { id: `f${Date.now()}-${++uid}`, name: f.name, size: f.size, type: f.type || '', url, progress: 0, error: null }
      if (!isSupported(f)) return { ...base, progress: 100, error: 'format' }
      if (f.size > MAX_BYTES) return { ...base, progress: 100, error: 'size' }
      return { ...base, willFail: /fail/i.test(f.name) || shouldFailOnce(search, 'upload', `${failKey}:${files.length}`) }
    })
    setFiles((fs) => [...fs, ...added])
  }
  const errorText = (f) =>
    f.error === 'size' ? t('{size} · Too large. Max 10 MB.', { size: formatSize(f.size) })
      : f.error === 'format' ? t('Format not supported') : t('Upload failed. Check your internet.')

  return (
    <div className="flex flex-col gap-2">
      <input ref={deviceRef} type="file" multiple accept="image/*,application/pdf,video/*,.doc,.docx,.ppt,.pptx" className="hidden" onChange={onFiles} />
      <input ref={cameraRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={onFiles} />
      {files.length < MAX_FILES && (
        <div className="flex flex-col items-center gap-1 rounded-2xl border-2 border-dashed border-[#ffa554] bg-[#fffaf5] px-4 py-4 text-center">
          <button type="button" onClick={() => deviceRef.current?.click()} className="tap flex flex-col items-center gap-1.5 rounded-xl px-6 py-1 text-brand-600">
            <UploadIcon size={22} />
            <span className="text-[0.9375rem] font-semibold leading-5">{t('Tap to upload')}</span>
          </button>
          <button type="button" onClick={() => cameraRef.current?.click()} className="tap flex min-h-11 items-center gap-1.5 rounded-full px-3 py-1 text-[0.8125rem] leading-[1.125rem] text-ink-muted hover:bg-black/5 hover:text-ink">
            <CameraIcon size={14} /> {t('or take a photo')}
          </button>
        </div>
      )}
      {files.map((f) => (
        <div key={f.id} className={cx('animate-fade-up flex flex-wrap items-center gap-3 rounded-[10px] border px-3.5 py-3', f.error ? 'border-[#e3a8a5] bg-danger-50' : 'border-line bg-white')}>
          <span className={cx('grid size-10 shrink-0 place-items-center rounded-lg', f.error ? 'bg-white/70 text-danger' : 'bg-brand-50 text-brand-600')}><FileIcon /></span>
          <span className="flex min-w-[min(8rem,100%)] flex-1 flex-col">
            <span className="break-words text-[0.875rem] font-semibold leading-5 text-ink">{f.name}</span>
            {f.error ? (
              <span className="text-[0.75rem] leading-[1.125rem] text-danger">{errorText(f)}</span>
            ) : f.progress < 100 ? (
              <span className="flex items-center gap-2 pt-1">
                <span className="h-1 flex-1 overflow-hidden rounded-full bg-[#ffd5b0]"><span className="block h-full rounded-full bg-brand-bright transition-[width] duration-100" style={{ width: `${f.progress}%` }} /></span>
                <span className="text-[0.75rem] leading-4 text-ink-muted">{Math.round(f.progress)}%</span>
              </span>
            ) : (
              <span className="flex items-center gap-1 text-[0.75rem] leading-[1.125rem] text-ink-muted">
                {formatSize(f.size)} <span className="animate-check-pop text-[#1b6b34]"><CheckIcon size={12} /></span>
              </span>
            )}
          </span>
          {f.error === 'upload' && <TextLink onClick={() => setFiles((fs) => fs.map((x) => (x.id === f.id ? { ...x, error: null, progress: 0, willFail: false } : x)))}>{t('Retry')}</TextLink>}
          <button type="button" aria-label={t('Remove {name}', { name: f.name })} onClick={() => setFiles((fs) => fs.filter((x) => x.id !== f.id))} className="tap -my-1 grid size-11 shrink-0 place-items-center rounded-lg text-ink-muted hover:bg-black/5 hover:text-danger">
            <TrashIcon size={18} />
          </button>
        </div>
      ))}
    </div>
  )
}

/** Plain checkbox row ("I confirm this is my own work."). */
export function ConfirmBox({ checked, onChange, children, error }) {
  return (
    <button type="button" role="checkbox" aria-checked={checked} onClick={() => onChange(!checked)} className={cx('tap-soft flex min-h-11 items-start gap-2.5 self-start rounded-lg py-3 pr-2 text-left', error && 'animate-shake')}>
      <span className={cx('mt-px grid size-5 shrink-0 place-items-center rounded border transition-colors', checked ? 'border-brand bg-brand text-white' : error ? 'border-danger bg-white' : 'border-[#9d9aa2] bg-white')}>
        {checked && <span className="animate-check-pop"><CheckIcon size={12} /></span>}
      </span>
      <span className={cx('text-[0.8125rem] leading-[1.1875rem]', error ? 'text-danger' : 'text-ink')}>{children}</span>
    </button>
  )
}

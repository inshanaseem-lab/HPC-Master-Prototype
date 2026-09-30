import { useState } from 'react'
import { useT } from '../i18n/index.js'
import { useAppStore } from '../store/AppStore.jsx'

export function FileIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7z" />
      <path d="M14 2v5h5M9 13h6M9 17h4" />
    </svg>
  )
}

/**
 * "Student Handbook · PDF · 1.2 MB · Download" row (5.1 / 6.1 / 7.1).
 * Download shows a spinner then a toast. The 11.4 failed state shows when the
 * browser is offline, when `failOnce` is set (first attempt fails), or with `?fail=handbook` in the URL.
 * Props: size (subtitle), failOnce (bool), className.
 */
export default function HandbookRow({ size = 'PDF · 1.2 MB', failOnce = false, className = '' }) {
  const t = useT()
  const { showToast } = useAppStore()
  const [status, setStatus] = useState('idle') // idle | loading | failed | done
  const [attempts, setAttempts] = useState(0)

  const shouldFail = () => {
    if (typeof navigator !== 'undefined' && navigator.onLine === false) return true
    const q = typeof window !== 'undefined' ? window.location.hash + window.location.search : ''
    if (attempts === 0 && (failOnce || /fail=handbook/.test(q))) return true
    return false
  }

  const download = () => {
    if (status === 'loading') return
    const fail = shouldFail()
    setAttempts((n) => n + 1)
    setStatus('loading')
    setTimeout(() => {
      if (fail) { setStatus('failed'); return }
      setStatus('done')
      showToast(t('Handbook downloaded'))
    }, 900)
  }

  const failed = status === 'failed'
  return (
    <div className={`rounded-2xl border border-[#e5e6e1] bg-white ${className}`}>
      <button
        type="button"
        onClick={download}
        className="tap-soft flex w-full flex-wrap items-center gap-3 rounded-2xl px-4 py-3.5 text-left hover:bg-[#fffaf5]"
      >
        <span className={`grid size-10 shrink-0 place-items-center rounded-[10px] transition-colors ${failed ? 'bg-[#fbedec] text-[#b54a45]' : 'bg-brand-50 text-[#ff7900]'}`}>
          <FileIcon />
        </span>
        <span className="flex min-w-[min(8rem,100%)] flex-1 flex-col gap-0.5">
          <span className="text-[0.875rem] font-semibold leading-5 text-ink">{t('Student Handbook')}</span>
          {failed ? (
            <span className="animate-fade-up text-[0.8125rem] leading-[1.1875rem] text-[#b54a45]">{t('Download failed. Check your internet.')}</span>
          ) : (
            <span className="text-[0.8125rem] leading-[1.1875rem] text-ink-muted">{t(size)}</span>
          )}
        </span>
        <span className="shrink-0 text-[0.8125rem] font-medium leading-[1.1875rem] text-brand-700">
          {status === 'loading' ? (
            <span className="inline-block size-5 animate-spin rounded-full border-2 border-brand/30 border-t-brand align-middle" />
          ) : failed ? t('Retry') : status === 'done' ? t('Downloaded') : t('Download')}
        </span>
      </button>
    </div>
  )
}

import { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { PrimaryButton, Screen, TopAppBar, cx } from '../../components/ui.jsx'
import { useAppStore } from '../../store/AppStore.jsx'
import { useT } from '../../i18n/index.js'
import { PAGES, APP_VERSION, LAST_UPDATED } from './content.js'

/**
 * About & policies (GIGW 3.0 mandatory information for government apps).
 * /about           list of pages + version / last updated
 * /about/:page     help, accessibility, privacy, terms, feedback
 * Text the state department must own is marked "Content from Samagra Shiksha, Himachal Pradesh".
 */
export default function AboutList() {
  const t = useT()
  return (
    <Screen bg="plain" statusBar="light" header={<TopAppBar title={t('About & policies')} />}>
      <div className="flex flex-col gap-4 p-4">
        <ul className="stagger flex flex-col gap-2" aria-label={t('About & policies')}>
          {PAGES.map((p) => (
            <li key={p.id}>
              <Link to={`/about/${p.id}`} className="tap-soft flex min-h-14 items-center gap-3 rounded-2xl border border-line bg-white px-4 py-3 hover:bg-cream">
                <span className="min-w-0 flex-1">
                  <span className="block text-[0.9375rem] font-semibold leading-[1.375rem] text-ink">{t(p.title)}</span>
                  <span className="block text-[0.8125rem] leading-[1.1875rem] text-ink-muted">{t(p.summary)}</span>
                </span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="shrink-0 text-ink-muted"><path d="m9 6 6 6-6 6" /></svg>
              </Link>
            </li>
          ))}
        </ul>
        <dl className="rounded-2xl border border-line bg-white px-4 py-3 text-[0.8125rem] leading-5">
          <div className="flex justify-between gap-3 py-1"><dt className="text-ink-muted">{t('App version')}</dt><dd className="font-semibold text-ink">{APP_VERSION}</dd></div>
          <div className="flex justify-between gap-3 py-1"><dt className="text-ink-muted">{t('Last updated')}</dt><dd className="font-semibold text-ink">{t(LAST_UPDATED)}</dd></div>
          <div className="flex justify-between gap-3 py-1"><dt className="text-ink-muted">{t('Owned by')}</dt><dd className="text-right font-semibold text-ink">{t('Samagra Shiksha, Himachal Pradesh')}</dd></div>
        </dl>
      </div>
    </Screen>
  )
}

export function AboutPage() {
  const t = useT()
  const { page } = useParams()
  const p = PAGES.find((x) => x.id === page)
  if (!p) return <Navigate to="/about" replace />
  return (
    <Screen bg="plain" statusBar="light" header={<TopAppBar title={t(p.title)} />}>
      <article className="flex flex-col gap-4 p-4 pb-8">
        {p.owner && (
          <p className="rounded-xl bg-[#fff6e8] px-3.5 py-2.5 text-[0.8125rem] leading-5 text-brand-700">{t('Content from Samagra Shiksha, Himachal Pradesh — to be confirmed before launch.')}</p>
        )}
        {p.sections.map((s) => (
          <section key={s.heading} className="rounded-2xl border border-line bg-white px-4 py-3.5">
            <h2 className="text-[1rem] font-semibold leading-6 text-ink">{t(s.heading)}</h2>
            {s.body && <p className="pt-1.5 text-[0.875rem] leading-[1.375rem] text-ink-2">{t(s.body)}</p>}
            {s.list && (
              <ul className="list-disc pl-5 pt-1.5 text-[0.875rem] leading-[1.375rem] text-ink-2">
                {s.list.map((li) => <li key={li} className="py-0.5">{t(li)}</li>)}
              </ul>
            )}
          </section>
        ))}
        {page === 'feedback' && <FeedbackForm />}
      </article>
    </Screen>
  )
}

function FeedbackForm() {
  const t = useT()
  const { showToast } = useAppStore()
  const [text, setText] = useState('')
  const [err, setErr] = useState(false)
  const [loading, setLoading] = useState(false)
  const send = () => {
    if (!text.trim()) { setErr(true); return }
    setLoading(true)
    setTimeout(() => { setLoading(false); setText(''); setErr(false); showToast(t('Thank you. Your feedback has been sent.')) }, 700)
  }
  return (
    <section className="rounded-2xl border border-line bg-white px-4 py-3.5">
      <label htmlFor="fb" className="text-[1rem] font-semibold leading-6 text-ink">{t('Your feedback')}</label>
      <textarea
        id="fb"
        rows={5}
        value={text}
        maxLength={1000}
        onChange={(e) => { setText(e.target.value); setErr(false) }}
        aria-invalid={err}
        aria-describedby="fb-help"
        className={cx('mt-2 w-full rounded-xl border bg-white p-3 text-[1rem] leading-6 text-ink outline-none focus:border-brand', err ? 'border-danger' : 'border-line')}
      />
      <p id="fb-help" className={cx('pt-1 text-[0.75rem] leading-4', err ? 'text-danger' : 'text-ink-muted')}>
        {err ? t('Please write your feedback before sending.') : t('{n} of 1000 characters', { n: text.length })}
      </p>
      <PrimaryButton className="mt-3 font-semibold" loading={loading} onClick={send}>{t('Send feedback')}</PrimaryButton>
    </section>
  )
}

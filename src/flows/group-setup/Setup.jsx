import { useEffect, useState } from 'react'
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom'
import { BottomActions, PrimaryButton, Screen, cx } from '../../components/ui.jsx'
import { useAppStore } from '../../store/AppStore.jsx'
import { useT } from '../../i18n/index.js'
import { GROUP_PROJECT_CATALOG } from '../../hpc/config.js'
import { Icons } from '../../hpc/components.jsx'
import { Sheet } from '../../components/ui.jsx'
import { useBActivity } from '../group-live/lib.js'
import { MATERIALS } from './data.js'
import { GPHeader, SectionLabel, useClassInfo } from './parts.jsx'
import { EMPTY_SETUP, useGroupSetup } from './store.js'

/**
 * Group Project · 1/3 · Setup (handbook Part B Page 1; kit T05-01/02 layout):
 * the teacher picks a project from the registry (GROUP_PROJECT_CATALOG); subjects, goals,
 * competencies, pedagogies, prompt and output are all pulled from it. Then "Discussion held". When a project is already live for the class the
 * entry goes to the progress hub (?setup=1 opens setup again).
 */
export default function Setup() {
  const navigate = useNavigate()
  const t = useT()
  const { showToast } = useAppStore()
  const [params] = useSearchParams()
  const { classId } = useClassInfo()
  const live = useBActivity(classId)
  const [draft, update] = useGroupSetup(classId)
  const [pickOpen, setPickOpen] = useState(false)
  const [downloading, setDownloading] = useState(null)

  // Re-opening setup for a class with a live project starts from that project's details
  useEffect(() => {
    if (!draft.seeded && live?.setup) update({ seeded: true, title: live.title, setup: { ...EMPTY_SETUP, ...live.setup } })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  if (live?.status === 'live' && params.get('setup') !== '1') return <Navigate to={`/group-project/${classId}/progress`} replace />

  const topic = GROUP_PROJECT_CATALOG.find((p) => p.id === draft.topicId) ?? GROUP_PROJECT_CATALOG.find((p) => p.title === draft.title)
  const pick = (p) => {
    update((d) => ({
      ...d, topicId: p.id, title: p.title,
      setup: { ...EMPTY_SETUP, subjects: p.subjects, goals: p.goals, competencies: p.competencies, pedagogies: p.pedagogies, prompt: p.prompt, output: p.output },
    }))
    setPickOpen(false)
  }
  const count = topic ? 0 : 1

  const next = () => {
    if (!topic) return
    update({ discussed: true })
    navigate(`/group-project/${classId}/groups`)
  }
  const download = (m) => {
    setDownloading(m.id)
    setTimeout(() => { setDownloading(null); showToast(t('{title} downloaded', { title: t(m.title) })) }, 700)
  }

  return (
    <Screen
      bg="plain"
      statusBar="light"
      header={<GPHeader step="1 / 3" onBack={() => navigate(`/activity/${classId}/type`)} />}
      footer={
        <BottomActions className="border-t border-line bg-surface">
          <div className="flex flex-col gap-3">
            {!topic && <p className="text-center text-[0.75rem] leading-4 text-ink-muted">{t('Select a topic to continue')}</p>}
            <PrimaryButton className="font-bold" disabled={count > 0} onClick={next}>{t('Discussion held')}</PrimaryButton>
            <button onClick={() => navigate('/home')} className="tap flex min-h-12 w-full items-center justify-center rounded-full border border-line bg-white px-6 text-[0.9375rem] font-bold leading-[1.375rem] text-ink-2 hover:bg-[#faf8f6]">
              {t('I will do this later')}
            </button>
          </div>
        </BottomActions>
      }
    >
      <div className="stagger flex flex-col gap-3 p-4">
        <div className="rounded-[18px] border border-line bg-white p-4">
          <SectionLabel>{t('Why this matters')}</SectionLabel>
          <p className="pt-2 text-[1rem] leading-6 text-ink">{t(topic?.why ?? 'Students work in teams on a real problem in their village, building planning, observation and communication skills.')}</p>
        </div>

        <div className="rounded-[18px] border border-line bg-white p-4">
          <span className="inline-block rounded-md bg-section-b-bg px-2.5 py-1 text-[0.8125rem] font-medium text-section-b">{t('Section B · Group Project')}</span>
        </div>

        <div className="rounded-[18px] border border-line bg-white p-4">
          <SectionLabel>{t('Select topic')}</SectionLabel>
          <button type="button" onClick={() => setPickOpen(true)} aria-haspopup="dialog"
            className="tap-soft mt-2 flex min-h-14 w-full items-center gap-2 rounded-xl border border-line bg-white px-3.5 py-2 text-left hover:bg-cream">
            <span className="min-w-0 flex-1">
              {topic ? (
                <>
                  <span className="block text-[1rem] font-semibold leading-6 text-ink">{t(topic.title)}</span>
                  <span className="block text-[0.8125rem] leading-5 text-ink-muted">{t(topic.subject)}</span>
                </>
              ) : (
                <span className="text-[0.9375rem] text-[#77737c]">{t('Select a Group Project')}</span>
              )}
            </span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="shrink-0 text-ink-muted"><path d="m6 9 6 6 6-6" /></svg>
          </button>
        </div>

        {topic && (
          <div key={topic.id} className="animate-fade-up rounded-[18px] border border-line bg-white px-4 py-3">
            <SectionLabel className="pb-1">{t('Topic details')}</SectionLabel>
            <dl>
              {[
                ['Learning outcome', topic.learningOutcome],
                ['Competency', topic.competency],
                ['Pedagogy', topic.pedagogy],
                ['Rubric', 'Awareness · Creativity · Sensitivity'],
                ['Stages', 'Plan → Observe → Final'],
              ].map(([k, v]) => (
                <div key={k} className="flex flex-wrap gap-x-3 gap-y-0.5 border-t border-[#f1efec] py-2.5 first:border-t-0">
                  <dt className="w-28 shrink-0 text-[0.8125rem] leading-5 text-ink-muted">{t(k)}</dt>
                  <dd className="min-w-[min(10rem,100%)] flex-1 text-[0.8125rem] font-semibold leading-5 text-ink">{t(v)}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}

        <div className="rounded-[18px] border border-line bg-white px-4 py-1.5">
          <SectionLabel className="py-3">{t('Materials')}</SectionLabel>
          {MATERIALS.map((m) => (
            <div key={m.id} className="flex min-h-[58px] flex-wrap items-center gap-x-3 gap-y-2 border-t border-[#f1efec] py-2">
              <div className="min-w-[min(10rem,100%)] flex-1">
                <p className="text-[0.9375rem] font-bold leading-[1.375rem] text-ink">{t(m.title)}</p>
                <p className="pt-0.5 text-[0.75rem] leading-4 text-ink-muted">{t(m.meta)}</p>
              </div>
              <button onClick={() => download(m)} disabled={downloading === m.id} aria-label={`${t('Download')} · ${t(m.title)}`} className="tap flex min-h-11 min-w-[6rem] items-center justify-center rounded-full bg-brand-50 px-3.5 text-[0.8125rem] font-bold text-brand-700 hover:bg-[#ffe3c8]">
                {downloading === m.id ? <span className="inline-block size-4 animate-spin rounded-full border-2 border-brand-700/30 border-t-brand-700" /> : t('Download')}
              </button>
            </div>
          ))}
        </div>
      </div>

      <Sheet open={pickOpen} onClose={() => setPickOpen(false)}>
        <div className="px-4 pb-6 pt-3">
          <h2 className="text-[1.125rem] font-semibold leading-7 text-ink">{t('Select topic')}</h2>
          <div role="radiogroup" aria-label={t('Select topic')} className="stagger flex flex-col gap-2 pt-3">
            {GROUP_PROJECT_CATALOG.map((p) => {
              const on = topic?.id === p.id
              return (
                <button key={p.id} type="button" role="radio" aria-checked={on} onClick={() => pick(p)}
                  className={cx('tap-soft flex min-h-14 w-full items-center gap-3 rounded-xl border px-3.5 py-2 text-left transition-colors', on ? 'border-brand-600 bg-[#fffaf5]' : 'border-line bg-white hover:bg-cream')}>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[0.9375rem] font-semibold leading-[1.375rem] text-ink">{t(p.title)}</span>
                    <span className="block text-[0.8125rem] leading-5 text-ink-muted">{t(p.subject)}</span>
                  </span>
                  {on && <Icons.check width="18" height="18" className="shrink-0 animate-check-pop text-brand-700" />}
                </button>
              )
            })}
          </div>
        </div>
      </Sheet>
    </Screen>
  )
}

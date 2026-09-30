import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { Screen, PrimaryButton, BottomActions, Sheet, Modal, cx } from '../../components/ui.jsx'
import { useAppStore } from '../../store/AppStore.jsx'
import { useT } from '../../i18n/index.js'
import { Header, SectionLabel, WhyCard, MetaCells, classLabel } from './parts.jsx'
import { INTERACTION_TYPES, TOPICS, MATERIALS } from './data.js'
import { useClassroom, updateClass } from './store.js'
import chevron from '../../assets/classroom/chevron-down.svg'
import alertCircle from '../../assets/classroom/alert-circle.svg'

/** Figma 278:27601 (setup) + 288:27989 ("Will students work in groups?" dialog). */
export default function Setup() {
  const navigate = useNavigate()
  const t = useT()
  const { showToast } = useAppStore()
  const { classId, cls, ci } = useClassroom()
  const [topicOpen, setTopicOpen] = useState(false)
  const [askGroups, setAskGroups] = useState(false)
  const [downloading, setDownloading] = useState(null)

  const type = INTERACTION_TYPES.find((it) => it.id === ci.typeId)
  if (!type) return <Navigate to={`/classroom/${classId}`} replace />
  const topic = TOPICS.find((tp) => tp.id === ci.topicId) || TOPICS[0]

  const details = [
    ['Learning outcome', topic.outcome],
    ['Competency', topic.competency],
    ['Pedagogy', topic.pedagogy],
    ['Rubric', topic.rubric],
    ['Stages', topic.stages],
  ]

  const download = (m) => {
    setDownloading(m.id)
    setTimeout(() => { setDownloading(null); showToast(t('{name} downloaded', { name: t(m.name) })) }, 600)
  }

  const answer = (grouped) => {
    updateClass(classId, { grouped })
    setAskGroups(false)
    navigate(`/classroom/${classId}/${grouped ? 'groups' : 'live'}`)
  }

  return (
    <Screen statusBar="light"
      bg="plain"
      header={<Header heading title={t('Classroom Interaction')} subtitle={classLabel(cls, t)} step="2 / 3" />}
      footer={
        <BottomActions className="flex flex-col gap-3 border-t border-line bg-surface">
          <PrimaryButton className="font-bold" onClick={() => setAskGroups(true)}>{t('Discussion held')}</PrimaryButton>
          <button
            onClick={() => { showToast(t('Saved — you can finish this later')); navigate('/home') }}
            className="tap min-h-12 w-full rounded-lg border border-line bg-white px-6 text-[0.9375rem] font-bold leading-[1.375rem] text-ink-2 hover:bg-[#faf8f6]"
          >
            {t('I will do this later')}
          </button>
        </BottomActions>
      }
    >
      <div className="stagger flex flex-col gap-3 p-4">
        <WhyCard>{t(type.why)}</WhyCard>
        <MetaCells cells={[{ value: 'D', label: t('Section') }]} />

        <section className="rounded-[18px] bg-white px-5 py-4">
          <SectionLabel>{t('Select Topic')}</SectionLabel>
          <button
            onClick={() => setTopicOpen(true)}
            aria-haspopup="dialog"
            className="tap-soft mt-2.5 flex min-h-14 w-full items-center gap-3 rounded-xl border border-line bg-white px-3.5 py-2.5 text-left hover:border-cream-border hover:bg-[#fffdfb]"
          >
            <div className="min-w-0 flex-1">
              <p key={topic.id} className="animate-fade-in break-words text-[1rem] font-bold leading-6 text-ink">{t(topic.name)}</p>
              <p className="pt-0.5 text-[0.75rem] leading-4 text-ink-muted">{t(topic.subject)}</p>
            </div>
            <img alt="" width="20" height="20" src={chevron} className="shrink-0 -rotate-90" />
          </button>
        </section>

        <section className="rounded-[18px] bg-white px-5 py-4">
          <SectionLabel>{t('Topic details')}</SectionLabel>
          <div key={topic.id} className="animate-fade-in">
            {details.map(([k, v], i) => (
              <div key={k} className={cx('flex flex-wrap gap-x-3 gap-y-0.5 py-2.5', i > 0 && 'border-t border-[#f1efec]')}>
                <p className="w-24 shrink-0 text-[0.8125rem] leading-[1.1875rem] text-ink-muted">{t(k)}</p>
                <p className="min-w-[min(10rem,100%)] flex-1 text-[0.8125rem] font-bold leading-[1.1875rem] text-ink">{t(v)}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[18px] bg-white px-5 py-1.5">
          <SectionLabel className="py-3">{t('Materials')}</SectionLabel>
          {MATERIALS.map((m) => (
            <div key={m.id} className="flex min-h-[58px] flex-wrap items-center gap-3 border-t border-[#f1efec] py-2">
              <div className="min-w-[min(10rem,100%)] flex-1">
                <p className="text-[0.9375rem] font-bold leading-[1.375rem] text-ink">{t(m.name)}</p>
                <p className="pt-0.5 text-[0.75rem] leading-4 text-ink-muted">{t(m.meta)}</p>
              </div>
              <button
                onClick={() => download(m)}
                disabled={downloading === m.id}
                className="tap flex min-h-11 min-w-[min(6rem,100%)] items-center justify-center rounded-full bg-brand-50 px-4 text-[0.8125rem] font-bold leading-[1.1875rem] text-brand-700 hover:bg-[#ffe8d4]"
              >
                {downloading === m.id ? <span className="inline-block size-4 animate-spin rounded-full border-2 border-brand-700/30 border-t-brand-700" /> : t('Download')}
              </button>
            </div>
          ))}
        </section>
      </div>

      <Sheet open={topicOpen} onClose={() => setTopicOpen(false)}>
        <div className="px-4 pb-6 pt-3">
          <h2 className="pb-3 text-[1.125rem] font-semibold leading-6 text-ink">{t('Select topic')}</h2>
          <div className="stagger flex flex-col gap-2" role="radiogroup" aria-label={t('Select topic')}>
            {TOPICS.map((tp) => {
              const on = tp.id === topic.id
              return (
                <button
                  key={tp.id}
                  role="radio"
                  aria-checked={on}
                  onClick={() => { updateClass(classId, { topicId: tp.id }); setTopicOpen(false) }}
                  className={cx(
                    'tap-soft flex items-center gap-3 rounded-xl border px-3.5 py-3 text-left transition-colors duration-200',
                    on ? 'border-brand-600 bg-[#fffaf5]' : 'border-line bg-white hover:bg-[#fffdfb]',
                  )}
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-[0.9375rem] font-bold leading-[1.375rem] text-ink">{t(tp.name)}</p>
                    <p className="text-[0.75rem] leading-4 text-ink-muted">{t(tp.subject)}</p>
                  </div>
                  <span className={cx('grid size-5 shrink-0 place-items-center rounded-full border-2 transition-colors', on ? 'border-brand' : 'border-line')}>
                    {on && <span className="size-2.5 animate-check-pop rounded-full bg-brand" />}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </Sheet>

      <Modal open={askGroups} onClose={() => setAskGroups(false)} className="max-w-[336px] rounded-lg border border-[#e2c7b0] bg-[#fefefe] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.06)]">
        <div className="flex flex-col items-center gap-4 p-4">
          <div className="grid place-items-center rounded-[47.5px] bg-[#fde7d6] p-6">
            <img alt="" width="54" height="54" src={alertCircle} />
          </div>
          <h2 className="text-center text-[1.125rem] font-bold leading-7 text-[#0e0805]">{t('Will students work in groups?')}</h2>
          <p className="text-center text-[0.8125rem] leading-[1.1875rem] text-ink-muted">{t('A debate usually has two sides. A discussion may not need groups at all.')}</p>
          <div className="flex w-full flex-wrap items-center gap-2">
            <button
              onClick={() => answer(true)}
              className="tap min-h-11 min-w-[min(7rem,100%)] flex-1 rounded-full bg-brand px-3 text-[0.875rem] font-medium leading-5 text-white shadow-[inset_-2px_-2px_2px_rgba(15,23,42,0.14),inset_2px_2px_2px_rgba(255,255,255,0.35)] hover:bg-[#dc4f08]"
            >
              {t('Yes')}
            </button>
            <button onClick={() => answer(false)} className="tap min-h-11 min-w-[min(7rem,100%)] flex-1 rounded-full px-3 text-[0.875rem] font-medium leading-5 text-brand-700 hover:bg-[#fff1e8]">
              {t('No, Individual')}
            </button>
          </div>
        </div>
      </Modal>
    </Screen>
  )
}

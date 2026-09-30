import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Screen, PrimaryButton, BottomActions, Sheet } from '../../components/ui.jsx'
import { useAppStore } from '../../store/AppStore.jsx'
import { useT } from '../../i18n/index.js'
import { Header, SectionLabel, WhyCard, MetaCells, CountUp, classLabel } from './parts.jsx'
import { INTERACTION_TYPES, RUBRIC, RESPONDED_COUNT } from './data.js'
import { useClassroom } from './store.js'

function ResourceCard({ title, meta, action, onClick, busy }) {
  return (
    <div className="flex flex-wrap items-center gap-3 rounded-[10px] border border-line bg-white p-4">
      <div className="min-w-[min(10rem,100%)] flex-1">
        <p className="text-[0.9375rem] font-bold leading-[1.375rem] text-ink">{title}</p>
        <p className="pt-0.5 text-[0.8125rem] leading-[1.1875rem] text-ink-muted">{meta}</p>
      </div>
      <button
        onClick={onClick}
        disabled={busy}
        className="tap flex min-h-12 min-w-[min(8rem,100%)] max-w-full items-center justify-center rounded-lg border border-line bg-white px-6 text-[0.9375rem] font-bold leading-[1.375rem] text-ink hover:bg-[#faf8f6]"
      >
        {busy ? <span className="inline-block size-5 animate-spin rounded-full border-2 border-ink/20 border-t-ink" /> : action}
      </button>
    </div>
  )
}

/** Figma 346:4634 — interaction overview with submission progress. */
export default function Overview() {
  const navigate = useNavigate()
  const t = useT()
  const { showToast } = useAppStore()
  const { classId, cls, ci } = useClassroom()
  const [sample, setSample] = useState(false)
  const [busy, setBusy] = useState(false)
  const total = cls.students ?? 40
  const type = INTERACTION_TYPES.find((t) => t.id === ci.typeId)
  const pct = (RESPONDED_COUNT / total) * 100
  // '{n}' is left unfilled so the animated counter can sit wherever the language puts it.
  const ofParts = t('{n} of {total}', { total }).split('{n}')

  const download = () => {
    setBusy(true)
    setTimeout(() => { setBusy(false); showToast(t('Discussion guide downloaded')) }, 600)
  }

  return (
    <Screen statusBar="light"
      bg="plain"
      header={<Header heading title={t('Classroom Interaction')} subtitle={classLabel(cls, t)} step="1 / 2" />}
      footer={
        <BottomActions>
          <PrimaryButton className="font-bold" onClick={() => navigate(`/classroom/${classId}/responses`)}>{t('View Responses')}</PrimaryButton>
        </BottomActions>
      }
    >
      <div className="stagger flex flex-col gap-4 p-4">
        <div className="rounded-[10px] border border-line bg-white p-4">
          <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
            <SectionLabel>{t('Track Progress')}</SectionLabel>
            <p className="text-[0.9375rem] font-bold leading-[1.375rem] text-ink">{ofParts[0]}<CountUp to={RESPONDED_COUNT} />{ofParts[1]}</p>
          </div>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-[#f1efec]">
            <div className="h-full origin-left animate-grow-x rounded-full bg-[#1b6b34]" style={{ width: `${pct}%` }} />
          </div>
          <p className="pt-2 text-[0.8125rem] leading-[1.1875rem] text-ink-muted">{t('View submissions by learners and nudge those who haven’t submitted')}</p>
        </div>
        <WhyCard>{t(type ? type.why : 'A reflection on what students notice, enjoy learning about, and find interesting.')}</WhyCard>
        <MetaCells cells={[{ value: 'D', label: t('Section') }, { value: RUBRIC.length, label: t('Rubrics') }, { value: t('Critical'), label: t('Competency') }]} />
        <ResourceCard title={t('Discussion guide')} meta={t('PDF · 2 pages · supplied by the state admin')} action={t('Download')} onClick={download} busy={busy} />
        <ResourceCard title={t('Activity Sample')} meta={t('View the questions learner’s will be asked')} action={t('View')} onClick={() => setSample(true)} />
      </div>

      <Sheet open={sample} onClose={() => setSample(false)}>
        <div className="px-4 pb-6 pt-3">
          <h2 className="text-[1.125rem] font-semibold leading-6 text-ink">{t('Activity sample')}</h2>
          <p className="pb-3 text-[0.8125rem] leading-[1.1875rem] text-ink-muted">{t('Statements used to evaluate each learner.')}</p>
          <div className="stagger flex flex-col gap-3">
            {RUBRIC.map((r) => (
              <div key={r.id} className="rounded-[10px] border border-line p-3.5">
                <SectionLabel>{t(r.label)}</SectionLabel>
                <ul className="list-disc pl-5 pt-2 text-[0.8125rem] leading-[1.1875rem] text-ink-2">
                  {r.statements.map((s) => <li key={s}>{t(s)}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Sheet>
    </Screen>
  )
}

import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Screen, PrimaryButton, BottomActions, Sheet, cx } from '../../components/ui.jsx'
import { useAppStore } from '../../store/AppStore.jsx'
import { useT } from '../../i18n/index.js'
import { ABILITIES, PBI, SUBJECTS, CURRICULAR_GOALS, COMPETENCIES, PEDAGOGIES, OPEN_QUESTIONS, PBI_CATALOG } from '../../hpc/config.js'
import { emit, createActivity, ROSTER } from '../../hpc/store.js'
import { TagSheet, CalendarSheet, LeaveSheet, OpenQuestion, EventNotice, LockNotice, Icons, DEMO_TODAY } from '../../hpc/components.jsx'
import { WHY, MATERIALS, TOPIC_MODES, ASSIGN_MODES } from './data.js'
import {
  useDraft, updateDraft, startDraft, hasDraft, clearDraft, useActivity, paramsComplete, allParamsComplete,
  datesError, MAX_OWN_PARAM, STAGES, STAGE_IDS, learnerIds, nameOf, stageCounts,
} from './store.js'
import {
  useClassInfo, useLongDate, PbiAppBar, StepCount, SectionLabel, Card, SectionChip, Field, SegmentedTabs,
  SuccessState, useOnlineGuard, Pill,
} from './parts.jsx'

const TOTAL_STEPS = 4

/* ---------------------------------------------------------------- shared bits */

function PickerRow({ label, values, placeholder, onClick, invalid }) {
  const t = useT()
  return (
    <div className="flex flex-col gap-1.5">
      <p className="text-[0.9375rem] font-semibold leading-[1.375rem] text-ink">{label}</p>
      <button
        type="button"
        onClick={onClick}
        aria-invalid={invalid || undefined}
        className={cx('tap-soft flex min-h-14 w-full items-center gap-3 rounded-2xl border bg-white px-4 py-2.5 text-left hover:bg-cream', invalid ? 'animate-shake border-danger' : 'border-line')}
      >
        <span className="flex min-w-0 flex-1 flex-wrap gap-1.5">
          {values.length === 0 && <span className="text-[0.9375rem] text-[#8f8c95]">{placeholder}</span>}
          {values.map((v) => <span key={v} className="rounded-md bg-surface px-2 py-0.5 text-[0.8125rem] font-medium leading-5 text-ink-2">{t(v)}</span>)}
        </span>
        <Icons.chevronR className="shrink-0 text-ink-muted" />
      </button>
      {invalid && <p className="text-[0.75rem] text-danger">{t('Choose at least one.')}</p>}
    </div>
  )
}

function useSetupGuard(classId) {
  // Deep link into a later step without a draft → start one
  const existing = useActivity(classId)
  useEffect(() => { if (!hasDraft(classId)) startDraft(classId, classId === '9A' ? existing : null) }, [classId]) // eslint-disable-line react-hooks/exhaustive-deps
}

/* =============================================== Step 1 · Details (kit T06-01) */

export function SetupDetails() {
  const navigate = useNavigate()
  const t = useT()
  const { showToast } = useAppStore()
  const { classId, classSubtitle, className } = useClassInfo()
  useSetupGuard(classId)
  const existing = useActivity(classId)
  const draft = useDraft(classId)
  const s = draft.setup
  const [sheet, setSheet] = useState(null)
  const [tried, setTried] = useState(false)
  const [leave, setLeave] = useState(false)

  const set = (patch) => updateDraft(classId, (d) => ({ setup: { ...d.setup, ...patch } }))
  const goalCodes = s.goals
  const comps = COMPETENCIES.filter((c) => goalCodes.length === 0 || goalCodes.includes(c.goal))
  // Topic from the registry (PBI_CATALOG) fills every Page 1 field; hypothesis stays optional
  const topic = PBI_CATALOG.find((p) => p.id === draft.topicId) ?? PBI_CATALOG.find((p) => p.title === draft.title)
  const [pickOpen, setPickOpen] = useState(false)
  const pick = (p) => {
    updateDraft(classId, (d) => ({ topicId: p.id, title: p.title, setup: { ...d.setup, subjects: p.subjects, goals: p.goals, competencies: p.competencies, pedagogies: p.pedagogies, prompt: p.prompt, output: p.output } }))
    setPickOpen(false)
  }
  const valid = !!topic
  const next = () => { if (!valid) return navigate(`/pbi/${classId}/setup/topics`) }
  const back = () => (draft.dirty ? setLeave(true) : navigate(-1))

  const sheets = {
    subjects: { title: t('Subject(s)'), options: SUBJECTS },
    goals: { title: t('Curricular goal(s)'), options: CURRICULAR_GOALS },
    competencies: { title: t('Competency(-ies)'), options: comps },
    pedagogies: { title: t('Pedagogies'), options: PEDAGOGIES },
  }

  return (
    <Screen
      bg="plain"
      statusBar="light"
      header={<PbiAppBar subtitle={classSubtitle} onBack={back} right={<StepCount>1 / {TOTAL_STEPS}</StepCount>} />}
      footer={
        <BottomActions className="flex flex-col gap-3 border-t border-line bg-surface">
          {!topic && <p className="text-center text-[0.75rem] leading-4 text-ink-muted">{t('Select a topic to continue')}</p>}
          <PrimaryButton className="font-semibold" disabled={!valid} onClick={next}>{t('Next')}</PrimaryButton>
          <button
            type="button"
            onClick={() => { showToast(t('Saved as a draft on this device')); navigate('/home') }}
            className="tap flex min-h-12 w-full items-center justify-center rounded-full border border-line bg-white px-6 text-[0.9375rem] font-semibold text-ink hover:bg-cream"
          >
            {t('I will do this later')}
          </button>
        </BottomActions>
      }
    >
      <div className="stagger flex flex-col gap-3 p-4">
        {classId === '9A' && existing && (
          <EventNotice tone="info" title={t('{title} is already live for {cls}', { title: t(existing.title), cls: className })}>
            {t('Making this live again updates its setup. Learners’ work so far is kept.')}
          </EventNotice>
        )}
        <Card>
          <SectionLabel>{t('Why this matters')}</SectionLabel>
          <p className="pt-2 text-[1rem] leading-6 text-ink">{t(topic?.why ?? WHY)}</p>
        </Card>
        <Card><SectionChip /></Card>

        <Card>
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
                <span className="text-[0.9375rem] text-[#77737c]">{t('Select a Problem Based Enquiry')}</span>
              )}
            </span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="shrink-0 text-ink-muted"><path d="m6 9 6 6 6-6" /></svg>
          </button>
        </Card>

        {topic && (
          <Card key={topic.id} className="animate-fade-up">
            <SectionLabel className="pb-1">{t('Topic details')}</SectionLabel>
            <dl>
              {[
                ['Learning outcome', topic.learningOutcome],
                ['Competency', topic.competency],
                ['Pedagogy', topic.pedagogy],
                ['Rubric', 'Awareness · Creativity · Sensitivity'],
                ['Stages', 'Draft plan → Data & summary → Peer review'],
              ].map(([k, v]) => (
                <div key={k} className="flex flex-wrap gap-x-3 gap-y-0.5 border-t border-[#f1efec] py-2.5 first:border-t-0">
                  <dt className="w-28 shrink-0 text-[0.8125rem] leading-5 text-ink-muted">{t(k)}</dt>
                  <dd className="min-w-[min(10rem,100%)] flex-1 text-[0.8125rem] font-semibold leading-5 text-ink">{t(v)}</dd>
                </div>
              ))}
            </dl>
            <div className="border-t border-[#f1efec] pt-3">
              <Field optional label={t('Hypothesis')} hint={t('Supplied by the teacher for learners who are struggling; confident learners propose their own.')} rows={2} value={s.hypothesis} onChange={(v) => set({ hypothesis: v })} max={200} placeholder={t('e.g. Most families would support rooftop solar if the cost is shared.')} />
            </div>
          </Card>
        )}

        <section className="rounded-[18px] border border-line bg-white px-5 py-1.5">
          <SectionLabel className="py-3">{t('Materials')}</SectionLabel>
          {MATERIALS.map((m) => (
            <div key={m.id} className="flex min-h-[58px] flex-wrap items-center gap-3 border-t border-[#f1efec] py-2">
              <div className="min-w-[min(10rem,100%)] flex-1">
                <p className="text-[0.9375rem] font-semibold leading-[1.375rem] text-ink">{t(m.title)}</p>
                <p className="pt-0.5 text-[0.75rem] leading-4 text-ink-muted">{t(m.meta)}</p>
              </div>
              <button type="button" onClick={() => showToast(t('{title} downloaded', { title: t(m.title) }))} className="tap flex min-h-11 items-center rounded-full bg-brand-50 px-4 text-[0.875rem] font-semibold text-brand-700 hover:bg-[#ffe8d4]">
                {t('Download')}
              </button>
            </div>
          ))}
        </section>
      </div>

      <Sheet open={pickOpen} onClose={() => setPickOpen(false)}>
        <div className="px-4 pb-6 pt-3">
          <h2 className="text-[1.125rem] font-semibold leading-7 text-ink">{t('Select topic')}</h2>
          <div role="radiogroup" aria-label={t('Select topic')} className="stagger flex flex-col gap-2 pt-3">
            {PBI_CATALOG.map((p) => {
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
      <LeaveSheet
        open={leave}
        title={t('Leave this setup?')}
        body={t('Your setup for this enquiry will be lost.')}
        onStay={() => setLeave(false)}
        onLeave={() => { clearDraft(classId); setLeave(false); navigate(-1) }}
      />
    </Screen>
  )
}

/* =============================================== Step 2 · Topics & assignment */

export function SetupTopics() {
  const navigate = useNavigate()
  const t = useT()
  const { showToast } = useAppStore()
  const { classId, classSubtitle } = useClassInfo()
  useSetupGuard(classId)
  const existing = useActivity(classId)
  const draft = useDraft(classId)
  const [newTopic, setNewTopic] = useState('')
  const [tried, setTried] = useState(false)
  const [pickFor, setPickFor] = useState(null) // learnerId for manual topic sheet
  const [hypSheet, setHypSheet] = useState(false)
  const ids = existing && classId === '9A' ? learnerIds(existing) : ROSTER.map((r) => r.id)
  const topics = draft.topics
  const listNeeded = draft.topicMode !== 'self'
  const unassigned = draft.topicMode === 'assigned' && draft.assignMode === 'manual' ? ids.filter((id) => !topics.includes(draft.assignments[id])) : []
  const valid = (!listNeeded || topics.length > 0) && unassigned.length === 0 && (draft.assignMode !== 'bulk' || draft.topicMode !== 'assigned' || topics.includes(draft.bulkTopic))

  const addTopic = () => {
    const v = newTopic.trim()
    if (!v) return
    if (topics.some((x) => x.toLowerCase() === v.toLowerCase())) { showToast(t('That topic is already in the list.'), 'error'); return }
    updateDraft(classId, (d) => ({ topics: [...d.topics, v] }))
    setNewTopic('')
  }
  const removeTopic = (tp) => updateDraft(classId, (d) => ({
    topics: d.topics.filter((x) => x !== tp),
    bulkTopic: d.bulkTopic === tp ? d.topics.find((x) => x !== tp) ?? '' : d.bulkTopic,
  }))
  const next = () => { if (!valid) { setTried(true); return } navigate(`/pbi/${classId}/setup/params`) }
  const counts = useMemo(() => {
    const c = {}
    ids.forEach((id) => { const tp = draft.assignments[id]; if (tp) c[tp] = (c[tp] ?? 0) + 1 })
    return c
  }, [draft.assignments, ids])

  return (
    <Screen
      bg="plain"
      statusBar="light"
      header={<PbiAppBar subtitle={classSubtitle} right={<StepCount>2 / {TOTAL_STEPS}</StepCount>} />}
      footer={<BottomActions className="border-t border-line bg-surface"><PrimaryButton className="font-semibold" onClick={next}>{t('Next')}</PrimaryButton></BottomActions>}
    >
      <div className="stagger flex flex-col gap-3 p-4">
        <div>
          <h2 className="text-[1.375rem] font-semibold leading-7 text-ink">{t('Topics')}</h2>
          <p className="pt-1 text-[0.8125rem] leading-[1.1875rem] text-ink-muted">{t('Not every learner needs the same problem. Choose how learners get their topic.')}</p>
        </div>

        <div role="radiogroup" aria-label={t('How learners get a topic')} className="flex flex-col gap-2">
          {TOPIC_MODES.map((m) => {
            const on = draft.topicMode === m.id
            return (
              <button key={m.id} type="button" role="radio" aria-checked={on} onClick={() => updateDraft(classId, () => ({ topicMode: m.id }))}
                className={cx('tap-soft flex items-start gap-3 rounded-2xl border px-4 py-3 text-left transition-colors', on ? 'border-brand-600 bg-[#fffaf5]' : 'border-line bg-white hover:bg-cream')}>
                <span className={cx('mt-0.5 grid size-5 shrink-0 place-items-center rounded-full border-2', on ? 'border-brand' : 'border-[#cfcac4]')}>{on && <span className="size-2.5 animate-check-pop rounded-full bg-brand" />}</span>
                <span className="min-w-0 flex-1"><span className="block text-[0.9375rem] font-semibold leading-[1.375rem] text-ink">{t(m.label)}</span><span className="block text-[0.8125rem] leading-[1.1875rem] text-ink-muted">{t(m.desc)}</span></span>
              </button>
            )
          })}
        </div>

        {listNeeded && (
          <Card className="flex flex-col gap-3">
            <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1"><SectionLabel>{t('Topic list')}</SectionLabel><span className="text-[0.8125rem] text-ink-muted">{t('{n} topics', { n: topics.length })}</span></div>
            {topics.length === 0 && <p className={cx('rounded-xl border border-dashed px-3 py-4 text-center text-[0.8125rem]', tried ? 'border-danger text-danger' : 'border-line text-ink-muted')}>{t('Add at least one topic.')}</p>}
            <div className="stagger flex flex-col gap-2">
              {topics.map((tp) => (
                <div key={tp} className="flex flex-wrap items-center gap-2 rounded-xl border border-line px-3 py-2">
                  <p className="min-w-[min(8rem,100%)] flex-1 break-words text-[0.9375rem] leading-[1.375rem] text-ink">{t(tp)}</p>
                  {draft.topicMode === 'assigned' && draft.assignMode === 'manual' && <Pill tone="muted">{t('{n} learners', { n: counts[tp] ?? 0 })}</Pill>}
                  <button type="button" aria-label={t('Remove {topic}', { topic: t(tp) })} onClick={() => removeTopic(tp)} className="tap grid size-11 shrink-0 place-items-center rounded-full text-ink-muted hover:bg-surface hover:text-danger">✕</button>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              <input value={newTopic} maxLength={80} onChange={(e) => setNewTopic(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && addTopic()} placeholder={t('Add a topic')} aria-label={t('Add a topic')} className="h-12 min-w-[min(10rem,100%)] flex-1 rounded-xl border border-line bg-white px-3 text-[0.9375rem] outline-none focus:border-brand" />
              <button type="button" onClick={addTopic} disabled={!newTopic.trim()} className="tap min-h-12 rounded-full border border-brand-700 bg-brand-50 px-4 text-[0.875rem] font-semibold text-brand-700 disabled:border-line disabled:bg-surface disabled:text-ink-muted">{t('Add')}</button>
            </div>
          </Card>
        )}

        {draft.topicMode === 'assigned' && topics.length > 0 && (
          <Card className="flex flex-col gap-3">
            <SectionLabel>{t('Assign topics')}</SectionLabel>
            <SegmentedTabs tabs={ASSIGN_MODES.map((m) => ({ value: m.id, label: t(m.label) }))} value={draft.assignMode} onChange={(v) => updateDraft(classId, () => ({ assignMode: v }))} className="[&_button]:text-[0.75rem]" />
            {draft.assignMode === 'bulk' && (
              <div className="flex flex-wrap gap-2">
                {topics.map((tp) => (
                  <button key={tp} type="button" aria-pressed={draft.bulkTopic === tp} onClick={() => updateDraft(classId, () => ({ bulkTopic: tp }))}
                    className={cx('tap min-h-11 rounded-full border px-4 text-[0.8125rem] font-semibold', draft.bulkTopic === tp ? 'border-brand bg-brand text-white' : 'border-line bg-white text-ink-2')}>{t(tp)}</button>
                ))}
              </div>
            )}
            {draft.assignMode === 'random' && <p className="text-[0.8125rem] leading-[1.1875rem] text-ink-muted">{t('Topics are spread evenly across {n} learners when you make this live.', { n: ids.length })}</p>}
            {draft.assignMode === 'manual' && (
              <>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className={cx('text-[0.8125rem]', unassigned.length && tried ? 'text-danger' : 'text-ink-muted')}>{t('{n} learners without a topic', { n: unassigned.length })}</p>
                  <button type="button" onClick={() => updateDraft(classId, (d) => ({ assignments: Object.fromEntries(ids.map((id, i) => [id, d.assignments[id] && d.topics.includes(d.assignments[id]) ? d.assignments[id] : d.topics[i % d.topics.length]])) }))}
                    className="tap min-h-11 rounded-full px-3 text-[0.8125rem] font-semibold text-brand-700 hover:bg-brand-50">{t('Fill the rest at random')}</button>
                </div>
                <div className="flex max-h-[360px] flex-col overflow-y-auto rounded-xl border border-line">
                  {ids.map((id) => {
                    const tp = draft.assignments[id]
                    const missing = !topics.includes(tp)
                    return (
                      <button key={id} type="button" onClick={() => setPickFor(id)} className="tap-soft flex min-h-12 flex-wrap items-center gap-x-2 gap-y-0.5 border-b border-line px-3 py-2 text-left last:border-0 hover:bg-cream">
                        <span className="min-w-[min(8rem,100%)] flex-1 break-words text-[0.875rem] font-medium text-ink">{nameOf(id)}</span>
                        <span className={cx('min-w-0 break-words text-[0.8125rem]', missing ? (tried ? 'text-danger' : 'text-ink-muted') : 'text-ink-2')}>{missing ? t('Choose topic') : t(tp)}</span>
                        <Icons.chevronR width="16" height="16" className="shrink-0 text-ink-muted" />
                      </button>
                    )
                  })}
                </div>
              </>
            )}
          </Card>
        )}

        {draft.setup.hypothesis.trim() && (
          <Card className="flex flex-col gap-2">
            <SectionLabel>{t('Teacher’s hypothesis')}</SectionLabel>
            <p className="text-[0.875rem] leading-5 text-ink-2">“{draft.setup.hypothesis}”</p>
            <p className="text-[0.8125rem] leading-[1.1875rem] text-ink-muted">{t('Give it to learners who are struggling. Everyone else proposes their own.')}</p>
            <button type="button" onClick={() => setHypSheet(true)} className="tap-soft flex min-h-12 items-center justify-between gap-2 rounded-xl border border-line px-3 py-2 text-left hover:bg-cream">
              <span className="min-w-0 flex-1 text-[0.875rem] font-medium text-ink">{t('{n} learners get this hypothesis', { n: draft.hypothesisFor.length })}</span>
              <Icons.chevronR className="shrink-0 text-ink-muted" />
            </button>
          </Card>
        )}
      </div>

      <Sheet open={!!pickFor} onClose={() => setPickFor(null)}>
        <div className="px-4 pb-6 pt-3">
          <p className="pb-3 text-[1.125rem] font-semibold text-ink">{t('Topic for {name}', { name: pickFor ? nameOf(pickFor) : '' })}</p>
          <div className="stagger flex flex-col gap-2">
            {topics.map((tp) => {
              const on = pickFor && draft.assignments[pickFor] === tp
              return (
                <button key={tp} type="button" role="radio" aria-checked={!!on}
                  onClick={() => { updateDraft(classId, (d) => ({ assignments: { ...d.assignments, [pickFor]: tp } })); setTimeout(() => setPickFor(null), 150) }}
                  className={cx('tap-soft flex min-h-12 items-center gap-3 rounded-xl border px-3 text-left', on ? 'border-brand bg-brand-50' : 'border-line bg-white hover:bg-cream')}>
                  <span className="min-w-0 flex-1 break-words py-2 text-[0.9375rem] text-ink">{t(tp)}</span>
                  <span className={cx('grid size-5 shrink-0 place-items-center rounded-full border-2', on ? 'border-brand' : 'border-[#cfcac4]')}>{on && <span className="size-2.5 animate-check-pop rounded-full bg-brand" />}</span>
                </button>
              )
            })}
          </div>
        </div>
      </Sheet>
      <TagSheet
        open={hypSheet}
        title={t('Who gets the hypothesis?')}
        options={ids.map((id) => ({ code: id, label: nameOf(id) }))}
        value={draft.hypothesisFor}
        onClose={() => setHypSheet(false)}
        onDone={(v) => { updateDraft(classId, () => ({ hypothesisFor: v })); setHypSheet(false) }}
      />
    </Screen>
  )
}

/* =============================================== Parameter picker (Step 3 + standalone) */

/**
 * Per stage × ability: the fixed statements (read-only, "Applies automatically") and EXACTLY 2 extra
 * parameters, picked from the handbook bank or written by the teacher (≤ 120 characters).
 */
export function ParamPicker({ stage, params, onChange, tried, readOnly }) {
  const t = useT()
  const [bankFor, setBankFor] = useState(null)
  const [own, setOwn] = useState(null) // { ability, text }
  const cur = (ab) => params?.[stage]?.[ab] ?? []
  const setAb = (ab, list) => onChange({ ...params, [stage]: { ...(params?.[stage] ?? {}), [ab]: list } })
  const need = PBI.extraParamsPerAbility

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <p className="flex-1 text-[0.8125rem] leading-[1.1875rem] text-ink-muted">{t('Pick exactly {n} extra parameters for each ability, from the handbook bank or in your own words.', { n: need })}</p>
        <OpenQuestion code="OQ-SEC-6" text={OPEN_QUESTIONS['OQ-SEC-6']} />
      </div>
      {ABILITIES.map((ab) => {
        const list = cur(ab.id)
        const Icon = Icons[ab.icon]
        const incomplete = list.length !== need
        return (
          <Card key={ab.id} className={cx('flex flex-col gap-3', tried && incomplete && 'animate-shake border-danger')}>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="flex items-center gap-1.5 text-[0.75rem] font-bold uppercase tracking-[0.96px] text-brand-600"><Icon width="16" height="16" /> {t(ab.label)}</p>
              <Pill tone={incomplete ? (tried ? 'danger' : 'wait') : 'done'}>{t('{n} of {total} chosen', { n: list.length, total: need })}</Pill>
            </div>
            <div className="flex flex-col gap-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-[0.75rem] font-semibold text-ink-muted">{t('Applies automatically')}</p>
                {stage === 'S3' && ab.id === 'awareness' && <OpenQuestion code="OQ-SEC-11" text={OPEN_QUESTIONS['OQ-SEC-11']} />}
              </div>
              {PBI.fixed[stage][ab.id].map((s) => (
                <p key={s} className="flex items-start gap-2 rounded-xl bg-surface px-3 py-2 text-[0.875rem] leading-5 text-ink-2">
                  <Icons.lock width="14" height="14" className="mt-0.5 shrink-0 text-ink-muted" /> {t(s)}
                </p>
              ))}
            </div>
            <div className="flex flex-col gap-1.5">
              <p className="text-[0.75rem] font-semibold text-ink-muted">{t('Your extra parameters')}</p>
              {list.map((s, i) => (
                <div key={s + i} className="flex animate-fade-up items-start gap-2 rounded-xl border border-brand-600 bg-[#fffaf5] px-3 py-2">
                  <p className="min-w-0 flex-1 text-[0.875rem] leading-5 text-ink">{t(s)}</p>
                  {!readOnly && <button type="button" aria-label={t('Remove')} onClick={() => setAb(ab.id, list.filter((_, j) => j !== i))} className="tap -my-1.5 -mr-1.5 grid size-11 shrink-0 place-items-center rounded-full text-ink-muted hover:bg-white hover:text-danger">✕</button>}
                </div>
              ))}
              {!readOnly && list.length < need && (
                <div className="flex flex-wrap gap-2">
                  <button type="button" onClick={() => setBankFor(ab.id)} className="tap min-h-11 min-w-[min(8rem,100%)] flex-1 rounded-full border border-brand-700 bg-brand-50 px-3 text-[0.8125rem] font-semibold text-brand-700 hover:bg-[#ffe8d4]">{t('Pick from bank')}</button>
                  <button type="button" onClick={() => setOwn({ ability: ab.id, text: '' })} className="tap min-h-11 min-w-[min(8rem,100%)] flex-1 rounded-full border border-line bg-white px-3 text-[0.8125rem] font-semibold text-ink hover:bg-cream">{t('Write my own')}</button>
                </div>
              )}
            </div>
          </Card>
        )
      })}

      <Sheet open={!!bankFor} onClose={() => setBankFor(null)}>
        {bankFor && (
          <div className="flex max-h-[70vh] flex-col px-4 pb-6 pt-3">
            <p className="text-[1.125rem] font-semibold leading-7 text-ink">{t('Parameter bank · {ability}', { ability: t(ABILITIES.find((a) => a.id === bankFor).label) })}</p>
            <p className="pb-3 text-[0.8125rem] text-ink-muted">{t('Illustrative — adapt to your enquiry. {n} left to choose.', { n: need - cur(bankFor).length })}</p>
            <div className="no-scrollbar flex flex-col gap-2 overflow-y-auto">
              {PBI.bank[bankFor].map((s) => {
                const taken = cur(bankFor).includes(s)
                return (
                  <button key={s} type="button" disabled={taken}
                    onClick={() => { const next = [...cur(bankFor), s]; setAb(bankFor, next); if (next.length >= need) setBankFor(null) }}
                    className={cx('tap-soft rounded-xl border px-3 py-3 text-left text-[0.875rem] leading-5', taken ? 'border-line bg-surface text-ink-muted' : 'border-line bg-white text-ink hover:bg-cream')}>
                    {t(s)} {taken && <span className="ml-1 text-[0.75rem]">· {t('Added')}</span>}
                  </button>
                )
              })}
            </div>
          </div>
        )}
      </Sheet>
      <Sheet open={!!own} onClose={() => setOwn(null)}>
        {own && (
          <div className="flex flex-col gap-3 px-4 pb-6 pt-3">
            <p className="text-[1.125rem] font-semibold leading-7 text-ink">{t('Write my own · {ability}', { ability: t(ABILITIES.find((a) => a.id === own.ability).label) })}</p>
            <Field value={own.text} onChange={(v) => setOwn({ ...own, text: v.slice(0, MAX_OWN_PARAM) })} max={MAX_OWN_PARAM} rows={3} placeholder={t('e.g. Explains the trade-offs of each option to respondents')} />
            <PrimaryButton disabled={!own.text.trim()} onClick={() => { setAb(own.ability, [...cur(own.ability), own.text.trim()]); setOwn(null) }}>{t('Add parameter')}</PrimaryButton>
          </div>
        )}
      </Sheet>
    </div>
  )
}

function StageTabs({ value, onChange, params }) {
  const t = useT()
  return (
    <SegmentedTabs
      value={value}
      onChange={onChange}
      tabs={STAGES.map((s) => ({ value: s.id, label: <span className="flex items-center gap-1">{paramsComplete(params, s.id) && <Icons.check width="14" height="14" className="text-[#1e6b3a]" />}{t(s.label)}</span> }))}
    />
  )
}

export function SetupParams() {
  const navigate = useNavigate()
  const t = useT()
  const { classId, classSubtitle } = useClassInfo()
  useSetupGuard(classId)
  const draft = useDraft(classId)
  const [stage, setStage] = useState('S1')
  const [tried, setTried] = useState(false)
  const next = () => {
    const missing = STAGE_IDS.find((s) => !paramsComplete(draft.params, s))
    if (missing) { setTried(true); setStage(missing); return }
    navigate(`/pbi/${classId}/live`)
  }
  return (
    <Screen
      bg="plain"
      statusBar="light"
      header={<PbiAppBar subtitle={classSubtitle} right={<StepCount>3 / {TOTAL_STEPS}</StepCount>} />}
      footer={<BottomActions className="border-t border-line bg-surface"><PrimaryButton className="font-semibold" onClick={next}>{t('Next')}</PrimaryButton></BottomActions>}
    >
      <div className="flex flex-col gap-3 p-4">
        <div>
          <h2 className="text-[1.375rem] font-semibold leading-7 text-ink">{t('Assessment parameters')}</h2>
          <p className="pt-1 text-[0.8125rem] leading-[1.1875rem] text-ink-muted">{t('You will tick these when you assess each learner at every stage.')}</p>
        </div>
        <StageTabs value={stage} onChange={setStage} params={draft.params} />
        <p className="text-[0.9375rem] font-semibold text-ink">{t(STAGES.find((s) => s.id === stage).label)} · {t(STAGES.find((s) => s.id === stage).name)}</p>
        <div key={stage} className="animate-fade-up">
          <ParamPicker stage={stage} params={draft.params} tried={tried} onChange={(p) => updateDraft(classId, () => ({ params: p }))} />
        </div>
      </div>
    </Screen>
  )
}

/** Standalone: /pbi/:classId/params/:stage — complete a live activity's params (e.g. the seeded demo). */
export function EditParams() {
  const navigate = useNavigate()
  const t = useT()
  const { showToast } = useAppStore()
  const guard = useOnlineGuard()
  const { stage = 'S1' } = useParams()
  const { classId, classSubtitle } = useClassInfo()
  const a = useActivity(classId)
  const [params, setParams] = useState(() => structuredClone(a?.params ?? { S1: {}, S2: {}, S3: {} }))
  const [tried, setTried] = useState(false)
  const [loading, setLoading] = useState(false)
  const [leave, setLeave] = useState(false)
  if (!a) return null
  const saved = paramsComplete(a.params, stage)
  const assessedAlready = stageCounts(a, stage).assessed > 0
  const readOnly = saved && assessedAlready
  const dirty = JSON.stringify(params[stage] ?? {}) !== JSON.stringify(a.params?.[stage] ?? {})
  const save = () => {
    if (!paramsComplete(params, stage)) { setTried(true); return }
    if (!guard()) return
    setLoading(true)
    setTimeout(() => {
      emit(a.id, 'C.params_set', (x) => { x.params = { ...(x.params ?? {}), [stage]: params[stage] } }, { target: stage })
      showToast(t('Parameters saved for {stage}', { stage: t(STAGES.find((s) => s.id === stage).label) }))
      navigate(-1)
    }, 600)
  }
  return (
    <Screen
      bg="plain"
      statusBar="light"
      header={<PbiAppBar title={t('Assessment parameters')} subtitle={classSubtitle} onBack={() => (dirty && !readOnly ? setLeave(true) : navigate(-1))} />}
      footer={!readOnly && <BottomActions className="border-t border-line bg-surface"><PrimaryButton loading={loading} onClick={save}>{t('Save parameters')}</PrimaryButton></BottomActions>}
    >
      <div className="flex flex-col gap-3 p-4">
        <p className="text-[1.125rem] font-semibold text-ink">{t(STAGES.find((s) => s.id === stage).label)} · {t(STAGES.find((s) => s.id === stage).name)}</p>
        {readOnly && <LockNotice>{t('Assessments for this stage have started, so these parameters are locked.')}</LockNotice>}
        <ParamPicker stage={stage} params={params} tried={tried} readOnly={readOnly} onChange={setParams} />
      </div>
      <LeaveSheet open={leave} title={t('Leave without saving?')} body={t('The parameters you picked will be lost.')} onStay={() => setLeave(false)} onLeave={() => navigate(-1)} />
    </Screen>
  )
}

/* =============================================== Step 4 · Timeline, review & make live (kit T06-02 / T04-10) */

function CheckRow({ ok, children }) {
  return (
    <div className="flex items-center gap-3 py-1.5">
      <span className={cx('grid size-6 shrink-0 place-items-center rounded-full', ok ? 'animate-check-pop bg-[#1e6b3a] text-white' : 'border-2 border-line bg-white')}>{ok && <Icons.check width="13" height="13" />}</span>
      <p className={cx('text-[0.875rem] leading-5', ok ? 'text-ink-2' : 'text-ink-muted')}>{children}</p>
    </div>
  )
}

function assignTopics(draft, ids) {
  if (draft.topicMode !== 'assigned') return Object.fromEntries(ids.map((id) => [id, '']))
  if (draft.assignMode === 'bulk') return Object.fromEntries(ids.map((id) => [id, draft.bulkTopic]))
  if (draft.assignMode === 'manual') return Object.fromEntries(ids.map((id) => [id, draft.assignments[id]]))
  // random but even: shuffle deterministically by index
  const shuffled = [...ids].sort((x, y) => ((x.charCodeAt(x.length - 1) * 7) % 11) - ((y.charCodeAt(y.length - 1) * 7) % 11))
  return Object.fromEntries(shuffled.map((id, i) => [id, draft.topics[i % draft.topics.length]]))
}

export function PbiMakeLive() {
  const navigate = useNavigate()
  const t = useT()
  const long = useLongDate()
  const { showToast } = useAppStore()
  const guard = useOnlineGuard()
  const { classId, cls, classSubtitle } = useClassInfo()
  useSetupGuard(classId)
  const existing = useActivity(classId)
  const draft = useDraft(classId)
  const [cal, setCal] = useState(null)
  const [tried, setTried] = useState(false)
  const [loading, setLoading] = useState(false)
  const dErr = datesError(draft.stageDates)
  const s = draft.setup
  const detailsOk = !!(draft.title.trim() && s.subjects.length && s.goals.length && s.competencies.length && s.pedagogies.length && s.prompt.trim() && s.output.trim())
  const paramsOk = allParamsComplete(draft.params)
  const ready = detailsOk && paramsOk && !dErr

  const submit = () => {
    if (!ready) { setTried(true); return }
    if (!guard()) return
    setLoading(true)
    setTimeout(() => {
      const setup = { ...s, topics: draft.topics, topicMode: draft.topicMode }
      let id
      if (classId === '9A' && existing) {
        id = existing.id
        const ids = learnerIds(existing)
        const topics = assignTopics(draft, ids)
        emit(id, 'C.live', (a) => {
          a.title = draft.title.trim(); a.status = 'live'; a.setup = setup; a.params = draft.params; a.stageDates = draft.stageDates
          ids.forEach((lid) => {
            a.learners[lid].topic = topics[lid]
            a.learners[lid].hypothesis = draft.hypothesisFor.includes(lid) ? s.hypothesis : ''
          })
        })
      } else {
        const ids = ROSTER.slice(0, Math.min(ROSTER.length, cls.students ?? ROSTER.length)).map((r) => r.id)
        const topics = assignTopics(draft, ids)
        id = createActivity({
          id: `pbi-${classId}-${Date.now().toString(36)}`, type: 'C', classId, title: draft.title.trim(), status: 'live', setup,
          stageDates: draft.stageDates, currentStage: 'S1', params: draft.params, pairs: {},
          learners: Object.fromEntries(ids.map((lid) => [lid, { topic: topics[lid], hypothesis: draft.hypothesisFor.includes(lid) ? s.hypothesis : '' }])),
        }, 'C.live')
      }
      clearDraft(classId)
      showToast(t('Problem Based Enquiry is live for {cls}', { cls: cls.id }))
      navigate(`/pbi/${classId}/success`, { replace: true })
    }, 700)
  }

  const renderRow = (stage, i) => {
    const v = draft.stageDates[stage.id]
    const prev = i > 0 ? draft.stageDates[STAGE_IDS[i - 1]] : null
    const bad = tried && (!v || (prev && v <= prev))
    return (
      <div key={stage.id} className="flex flex-col gap-1.5">
        <p className="text-[0.8125rem] font-semibold text-ink-2">{t(stage.label)} · {t(stage.name)}</p>
        <button type="button" onClick={() => setCal(stage.id)} aria-invalid={bad || undefined}
          className={cx('tap-soft flex min-h-14 items-center justify-between gap-3 rounded-2xl border bg-white px-4 py-2 text-left hover:bg-cream', bad ? 'animate-shake border-danger' : 'border-line')}>
          <span className={cx('text-[1rem] font-medium', v ? 'text-ink' : 'text-[#8f8c95]')}>{v ? long(v) : t('Select a date')}</span>
          <Icons.calendar className="shrink-0 text-brand-600" />
        </button>
      </div>
    )
  }

  return (
    <Screen
      bg="plain"
      statusBar="light"
      header={<PbiAppBar subtitle={classSubtitle} right={<StepCount>4 / {TOTAL_STEPS}</StepCount>} />}
      footer={<BottomActions className="border-t border-line bg-surface"><PrimaryButton className="font-semibold" loading={loading} onClick={submit}>{t('Make Project live')}</PrimaryButton></BottomActions>}
    >
      <div className="stagger flex flex-col gap-4 p-4">
        <div>
          <h2 className="text-[1.5rem] font-semibold leading-[1.875rem] text-ink">{t('Make Problem Based Enquiry live for {cls}', { cls: cls.id })}</h2>
          <p className="pt-1 text-[0.8125rem] leading-[1.1875rem] text-ink-muted">{t('{n} students will get this in their to-do list straight away.', { n: cls.students })}</p>
        </div>
        <div className="flex flex-col gap-3">
          <SectionLabel>{t('Stage timeline · Required')}</SectionLabel>
          {STAGES.map((st, i) => renderRow(st, i))}
          {tried && dErr && <p role="alert" className="text-[0.8125rem] text-danger">{t(dErr)}</p>}
        </div>
        <Card>
          <SectionLabel>{t('Check before you confirm')}</SectionLabel>
          <div className="flex flex-col pt-2">
            <button type="button" onClick={() => navigate(`/pbi/${classId}`)} className="min-h-11 w-full text-left"><CheckRow ok={detailsOk}>{detailsOk ? t('Details reviewed') : t('Details incomplete — tap to finish')}</CheckRow></button>
            <CheckRow ok>{draft.topicMode === 'assigned' ? t('Topics assigned by you ({n} topics)', { n: draft.topics.length }) : draft.topicMode === 'choose' ? t('Learners choose from {n} topics', { n: draft.topics.length }) : t('Learners suggest their own topic')}</CheckRow>
            <button type="button" onClick={() => navigate(`/pbi/${classId}/setup/params`)} className="min-h-11 w-full text-left"><CheckRow ok={paramsOk}>{paramsOk ? t('2 extra parameters per ability for every stage') : t('Parameters incomplete — tap to finish')}</CheckRow></button>
            <CheckRow ok={!dErr}>{!dErr ? t('Stage 1 ends {a} · Stage 2 {b} · Stage 3 {c}', { a: long(draft.stageDates.S1), b: long(draft.stageDates.S2), c: long(draft.stageDates.S3) }) : t('Stage dates not set')}</CheckRow>
          </div>
        </Card>
      </div>
      <CalendarSheet
        open={!!cal}
        title={cal ? t('{stage} ends on', { stage: t(STAGES.find((x) => x.id === cal).label) }) : ''}
        value={cal ? draft.stageDates[cal] : ''}
        min={DEMO_TODAY}
        onClose={() => setCal(null)}
        onSet={(v) => { updateDraft(classId, (d) => ({ stageDates: { ...d.stageDates, [cal]: v } })); setCal(null) }}
      />
    </Screen>
  )
}

/* =============================================== Live success (kit T06-03) */

export function PbiLiveSuccess() {
  const navigate = useNavigate()
  const t = useT()
  const { classId, cls } = useClassInfo()
  const a = useActivity(classId)
  return (
    <Screen
      bg="plain"
      statusBar="light"
      header={<PbiAppBar onBack={() => navigate('/home')} />}
      footer={
        <BottomActions className="flex flex-col gap-3">
          <PrimaryButton onClick={() => navigate(`/pbi/${classId}/progress`, { replace: true })}>{t('Track progress')}</PrimaryButton>
          <button type="button" onClick={() => navigate('/home', { replace: true })} className="tap min-h-12 w-full rounded-full border border-line bg-white text-[0.9375rem] font-semibold text-ink hover:bg-cream">{t('Back to Home')}</button>
        </BottomActions>
      }
    >
      <SuccessState title={t('Activity is live')} body={t('{title} is live for {cls}. Learners start with Stage 1 · Draft plan.', { title: t(a?.title ?? ''), cls: cls.id })} />
    </Screen>
  )
}


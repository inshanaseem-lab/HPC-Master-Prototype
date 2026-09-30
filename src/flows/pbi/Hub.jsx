import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { Screen, PrimaryButton, BottomActions, Modal, FilterChips, cx } from '../../components/ui.jsx'
import { useAppStore } from '../../store/AppStore.jsx'
import { useT } from '../../i18n/index.js'
import { StageStepper, EventNotice, Icons, DEMO_TODAY } from '../../hpc/components.jsx'
import { emit, lastEvent, learner } from '../../hpc/store.js'
import { WHY, MATERIALS } from './data.js'
import {
  useActivity, learnerIds, nameOf, initialsOf, stageStatus, stageCounts, stepperStages, isOpen, STAGES,
  paramsComplete, nextNudge, NUDGE_GAP_DAYS,
} from './store.js'
import { useClassInfo, useShortDate, PbiAppBar, SectionLabel, Card, SectionChip, MetaCells, SegmentedTabs, Avatar, Pill, Skeleton, useOnlineGuard } from './parts.jsx'
import { DemoPanel } from './Demo.jsx'

/** Human text for the last named event (so a change is never silent). */
export function eventText(t, e) {
  if (!e) return null
  const who = e.target && e.target.startsWith?.('s-') ? nameOf(e.target) : ''
  const map = {
    'C.live': 'The enquiry is live.',
    'C.S1.submitted': '{who} submitted a Stage 1 draft plan.',
    'C.S1.self_evaluated': '{who} finished the Stage 1 reflection.',
    'C.S1.teacher_evaluated': 'You assessed {who} for Stage 1.',
    'C.S2.opened': 'You opened Stage 2 · Data and draft summary.',
    'C.S2.submitted': '{who} submitted Stage 2 data and summary.',
    'C.S2.self_evaluated': '{who} finished the Stage 2 reflection.',
    'C.S2.teacher_evaluated': 'You assessed {who} for Stage 2.',
    'C.S3.paired': 'You paired learners for peer review.',
    'C.S3.opened': 'You opened Stage 3 · Peer review and revise.',
    'C.S3.peer_reviewed': '{who}’s draft was peer reviewed.',
    'C.S3.resubmitted': '{who} resubmitted a revised draft.',
    'C.S3.teacher_evaluated': 'You assessed {who} for Stage 3.',
    'C.overview_saved': 'You saved final levels for {who}.',
    'C.post_submitted': '{who} submitted the post-inquiry reflection.',
    'C.params_set': 'You saved the extra parameters.',
    'C.nudged': 'Reminders sent.',
  }
  return map[e.name] ? t(map[e.name], { who }) : e.name
}

/* ======================================================= Class overview (kept) */

export function PbiClassLive() {
  const navigate = useNavigate()
  const t = useT()
  const short = useShortDate()
  const { classId, cls, className } = useClassInfo()
  const a = useActivity(classId)
  const [tab, setTab] = useState('activities')
  const [filter, setFilter] = useState('all')
  const stage = a && ['S1', 'S2', 'S3'].includes(a.currentStage) ? a.currentStage : 'S3'
  const ids = a ? learnerIds(a) : []
  const rows = ids.map((id) => ({ id, ...stageStatus(a, id, stage) }))
  const shown = rows.filter((r) => filter === 'all' || (filter === 'submitted' ? r.submitted : !r.submitted))

  return (
    <Screen bg="plain" statusBar="light" header={<PbiAppBar title={className} />}>
      <div className="flex flex-col gap-4 px-4 pb-24 pt-4">
        <div>
          <p className="text-[1.375rem] font-semibold leading-7 text-ink">{t('Class Overview')}</p>
          <div className="pt-2"><MetaCells items={[[ids.length || cls.students, t('Students')]]} /></div>
        </div>
        <SegmentedTabs tabs={[{ value: 'activities', label: t('Activities') }, { value: 'students', label: t('Student List') }]} value={tab} onChange={setTab} />
        {tab === 'activities' ? (
          <div key="a" className="stagger flex flex-col gap-3">
            {!a && (
              <div className="rounded-[18px] border border-dashed border-line bg-white px-4 py-6 text-center">
                <p className="text-[0.875rem] text-ink-muted">{t('No Problem Based Enquiry is live for this class yet.')}</p>
                <button type="button" onClick={() => navigate(`/pbi/${classId}`)} className="tap mt-3 min-h-11 rounded-full border border-brand-700 bg-brand-50 px-4 text-[0.875rem] font-semibold text-brand-700">{t('Set up Problem Based Enquiry')}</button>
              </div>
            )}
            {a && (
              <button type="button" onClick={() => navigate(`/pbi/${classId}/progress`)} className="tap-soft flex w-full flex-col rounded-[18px] border border-line bg-white p-4 text-left hover:shadow-card">
                <div className="flex w-full flex-wrap items-center gap-3">
                  <Avatar>{t('C')}</Avatar>
                  <div className="min-w-[min(10rem,100%)] flex-1">
                    <p className="break-words text-[0.75rem] font-bold uppercase tracking-[0.96px] text-brand-600">{t('Problem Based Enquiry')}</p>
                    <p className="break-words text-[0.9375rem] font-semibold leading-[1.375rem] text-ink">{t(a.title)}</p>
                  </div>
                  <Pill tone="wait">{t('LIVE')}</Pill>
                  <Icons.chevronR className="text-ink-muted" />
                </div>
                <div className="mt-3 flex w-full flex-wrap gap-x-4 gap-y-2 border-t border-line pt-3">
                  <div className="min-w-[min(8rem,100%)] flex-1"><p className="text-[0.9375rem] font-medium text-ink">{t(STAGES.find((s) => s.id === stage)?.label ?? 'Overview')}</p><p className="text-[0.8125rem] text-ink-muted">{t('Current stage')}</p></div>
                  <div className="min-w-[min(8rem,100%)] flex-1"><p className="text-[0.9375rem] font-medium text-danger">{short(a.stageDates?.[stage])}</p><p className="text-[0.8125rem] text-ink-muted">{t('Stage ends')}</p></div>
                </div>
              </button>
            )}
          </div>
        ) : (
          <div key="s" className="flex flex-col gap-3">
            <FilterChips
              label={t('Filter students')}
              value={filter}
              onChange={setFilter}
              options={[
                { value: 'all', label: t('All'), count: rows.length },
                { value: 'submitted', label: t('Submitted'), count: rows.filter((r) => r.submitted).length },
                { value: 'not-submitted', label: t('Not submitted'), count: rows.filter((r) => !r.submitted).length },
              ]}
            />
            {a && <p className="text-[0.8125rem] text-ink-muted">{t('Showing {stage}', { stage: t(STAGES.find((s) => s.id === stage).label) })}</p>}
            <div key={filter} className="stagger flex flex-col gap-2">
              {shown.length === 0 && (
                <p className="animate-fade-up rounded-[18px] border border-dashed border-line bg-white px-4 py-6 text-center text-[0.8125rem] text-ink-muted">
                  {!a ? t('No learners yet.') : filter === 'submitted' ? t('No one has submitted yet.') : t('Everyone has submitted.')}
                </p>
              )}
              {shown.map((r) => (
                <div key={r.id} className="flex flex-wrap items-center gap-3 rounded-[18px] border border-line bg-white p-3">
                  <Avatar>{initialsOf(r.id)}</Avatar>
                  <div className="min-w-[min(10rem,100%)] flex-1">
                    <p className="break-words text-[0.9375rem] font-semibold leading-[1.375rem] text-ink">{nameOf(r.id)}</p>
                    <p className="text-[0.8125rem] text-ink-muted">{t('Student ID {id}', { id: learner(r.id)?.studentId ?? r.id })}</p>
                  </div>
                  <Pill tone={r.submitted ? 'done' : 'todo'}>{r.submitted ? t('Submitted') : t('Not submitted')}</Pill>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Screen>
  )
}

/* ======================================================= Progress hub (kit T09-01/02/03) */

function StatusCell({ label, on, tone }) {
  return <Pill tone={on ? tone ?? 'done' : 'todo'}>{on ? <Icons.check width="12" height="12" /> : null}{label}</Pill>
}

function LearnerRow({ a, id, stage, classId, onNudge }) {
  const navigate = useNavigate()
  const t = useT()
  const short = useShortDate()
  const st = stageStatus(a, id, stage)
  const next = nextNudge(a, id, stage)
  const l = a.learners[id]
  const waitingResubmit = stage === 'S3' && !st.submitted
  const reflLabel = { S1: 'Reflection', S2: 'Reflection', S3: 'Peer review given', overview: 'Post-inquiry reflection' }[stage]
  const subLabel = { S1: 'Draft plan', S2: 'Data & summary', S3: 'Revised draft', overview: 'Stage 3 assessed' }[stage]
  return (
    <div className="flex flex-col gap-2.5 border-b border-line px-4 py-3.5 last:border-0">
      <div className="flex items-center gap-3">
        <Avatar>{initialsOf(id)}</Avatar>
        <div className="min-w-0 flex-1">
          <p className="break-words text-[0.9375rem] font-semibold leading-[1.375rem] text-ink">{nameOf(id)}</p>
          <p className="break-words text-[0.8125rem] leading-[1.1875rem] text-ink-muted">{l.topic ? t(l.topic) : t('Topic not chosen yet')}</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-1.5" aria-label={t('Status')}>
        <StatusCell on={st.submitted} label={t(st.submitted ? '{what} submitted' : '{what} not submitted', { what: t(subLabel) })} />
        <StatusCell on={st.reflected} tone="info" label={t(st.reflected ? '{what} done' : '{what} pending', { what: t(reflLabel) })} />
        {stage === 'S3' && <StatusCell on={st.peerReviewed} tone="info" label={t(st.peerReviewed ? 'Peer review received' : 'Peer review not received')} />}
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {stage !== 'overview' && st.submitted && (
          <button type="button" onClick={() => navigate(`/pbi/${classId}/response/${stage}/${id}`)} className="tap min-h-11 rounded-full border border-line bg-white px-4 text-[0.875rem] font-medium text-ink hover:bg-surface">{t('View')}</button>
        )}
        {stage === 'overview' ? (
          st.assessed
            ? <button type="button" onClick={() => navigate(`/pbi/${classId}/overview/${id}`)} className="tap flex min-h-11 items-center gap-1 rounded-full bg-[#e3f4e8] px-4 text-[0.875rem] font-medium text-[#1e6b3a]"><Icons.check width="14" height="14" />{t('Final levels saved')}</button>
            : <button type="button" onClick={() => navigate(`/pbi/${classId}/overview/${id}`)} className="tap min-h-11 rounded-full bg-[#e3f4e8] px-4 text-[0.875rem] font-medium text-[#1e6b3a] hover:bg-[#d3eedb]">{t('Complete the Overview')}</button>
        ) : st.assessed ? (
          <button type="button" onClick={() => navigate(`/pbi/${classId}/evaluated/${stage}/${id}`)} className="tap flex min-h-11 items-center gap-1 rounded-full bg-[#e3f4e8] px-4 text-[0.875rem] font-medium text-[#1e6b3a]"><Icons.check width="14" height="14" />{t('Evaluated')}</button>
        ) : st.submitted ? (
          <button type="button" onClick={() => navigate(`/pbi/${classId}/assess/${stage}/${id}`)} className="tap min-h-11 rounded-full bg-[#e3f4e8] px-4 text-[0.875rem] font-medium text-[#1e6b3a] hover:bg-[#d3eedb]">{t('Evaluate')}</button>
        ) : next ? (
          <span className="text-[0.8125rem] text-ink-muted">{t('Nudged · again after {date}', { date: short(next.toISOString()) })}</span>
        ) : waitingResubmit && !st.peerReviewed ? (
          <span className="text-[0.8125rem] text-ink-muted">{t('Waiting for peer review')}</span>
        ) : (
          <button type="button" onClick={() => onNudge([id])} className="tap min-h-11 rounded-full px-3 text-[0.875rem] font-semibold text-brand-700 hover:bg-brand-50">{t('Nudge')}</button>
        )}
      </div>
    </div>
  )
}

export function PbiProgress() {
  const navigate = useNavigate()
  const location = useLocation()
  const [params, setParams] = useSearchParams()
  const t = useT()
  const short = useShortDate()
  const { showToast } = useAppStore()
  const guard = useOnlineGuard()
  const { classId, cls, classSubtitle } = useClassInfo()
  const a = useActivity(classId)
  const [loading, setLoading] = useState(true)
  const stageParam = params.get('stage')
  const stage = stageParam ?? (a ? (['S1', 'S2', 'S3'].includes(a.currentStage) ? a.currentStage : 'overview') : 'S1')
  const [filter, setFilter] = useState(location.state?.filter ?? params.get('filter') ?? 'all')
  const [confirm, setConfirm] = useState(null) // 'S2' | 'S3'
  const [opening, setOpening] = useState(false)
  useEffect(() => { const id = setTimeout(() => setLoading(false), 450); return () => clearTimeout(id) }, [])

  if (!a) {
    return (
      <Screen bg="plain" statusBar="light" header={<PbiAppBar subtitle={classSubtitle} />}>
        <div className="flex flex-col items-center gap-3 px-8 py-20 text-center">
          <SectionChip />
          <p className="pt-3 text-[1.125rem] font-semibold text-ink">{t('Nothing live yet')}</p>
          <p className="text-[0.875rem] text-ink-muted">{t('Set up a Problem Based Enquiry for {cls} to track it here.', { cls: cls.id })}</p>
          <PrimaryButton className="mt-3" onClick={() => navigate(`/pbi/${classId}`)}>{t('Set up Problem Based Enquiry')}</PrimaryButton>
        </div>
      </Screen>
    )
  }

  const ids = learnerIds(a)
  const c = stageCounts(a, stage)
  const rows = ids.map((id) => ({ id, ...stageStatus(a, id, stage) }))
  const byFilter = {
    all: rows,
    submitted: rows.filter((r) => r.submitted && !r.assessed),
    'not-submitted': rows.filter((r) => !r.submitted),
    assessed: rows.filter((r) => r.assessed),
  }
  const shown = byFilter[filter] ?? rows
  const nudgeable = byFilter['not-submitted'].filter((r) => !nextNudge(a, r.id, stage) && !(stage === 'S3' && !r.peerReviewed)).map((r) => r.id)
  const last = lastEvent(a)
  const stageMeta = STAGES.find((s) => s.id === stage)
  const openable = stage === 'S1' || stage === 'S2' || stage === 'S3' ? isOpen(a, stage) : isOpen(a, 'S3')
  const hasPairs = Object.keys(a.pairs ?? {}).length > 0
  const nextStage = a.currentStage === 'S1' ? 'S2' : a.currentStage === 'S2' ? 'S3' : null
  const setStage = (s) => { setParams((p) => { const n = new URLSearchParams(p); n.set('stage', s); return n }, { replace: true }); setFilter('all') }

  const nudge = (list) => {
    if (!list.length || !guard()) return
    emit(a.id, 'C.nudged', (x) => {
      x.nudges = { ...(x.nudges ?? {}) }
      x.nudges[stage] = { ...(x.nudges[stage] ?? {}) }
      list.forEach((id) => { x.nudges[stage][id] = new Date().toISOString() })
    }, { target: list.length === 1 ? list[0] : 'many' })
    showToast(list.length === 1 ? t('Reminder sent to {name}', { name: nameOf(list[0]) }) : t('Reminder sent to {n} students', { n: list.length }))
  }
  const openStage = () => {
    if (!guard()) return
    setOpening(true)
    setTimeout(() => {
      emit(a.id, `C.${confirm}.opened`, (x) => { x.currentStage = confirm })
      showToast(t('{stage} is open for learners', { stage: t(STAGES.find((s) => s.id === confirm).label) }))
      setOpening(false)
      setConfirm(null)
      setStage(confirm)
    }, 600)
  }
  const prevCounts = confirm ? stageCounts(a, confirm === 'S2' ? 'S1' : 'S2') : null

  return (
    <Screen
      bg="plain"
      statusBar="light"
      header={<PbiAppBar subtitle={classSubtitle} onBack={() => navigate(-1)} />}
      footer={
        filter === 'not-submitted' && nudgeable.length > 0 && openable && stage !== 'overview' ? (
          <BottomActions className="animate-fade-up border-t border-line bg-surface">
            <PrimaryButton onClick={() => nudge(nudgeable)}>{t(nudgeable.length === 1 ? 'Send nudge to {n} student' : 'Send nudge to {n} students', { n: nudgeable.length })}</PrimaryButton>
          </BottomActions>
        ) : null
      }
    >
      <div className="flex flex-col gap-4 p-4 pb-10">
        <div className="flex flex-col gap-1">
          <SectionChip />
          <h2 className="pt-2 text-[1.375rem] font-semibold leading-7 text-ink">{t(a.title)}</h2>
          {a.setup?.prompt && <p className="text-[0.8125rem] leading-[1.1875rem] text-ink-muted">{t(a.setup.prompt)}</p>}
        </div>

        {last && last.name !== 'C.nudged' && <EventNotice tone={last.name.includes('opened') || last.name === 'C.live' ? 'success' : 'info'} title={t('Latest update')}>{eventText(t, last)}</EventNotice>}

        <Card>
          <SectionLabel>{t('Stages')}</SectionLabel>
          <StageStepper className="pt-3" current={a.currentStage} stages={stepperStages(a, t, short)} />
          {nextStage && (
            <button type="button" onClick={() => (nextStage === 'S3' && !hasPairs ? navigate(`/pbi/${classId}/pairs`) : setConfirm(nextStage))}
              className="tap mt-4 flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-brand-700 bg-brand-50 text-[0.9375rem] font-semibold text-brand-700 hover:bg-[#ffe8d4]">
              {nextStage === 'S3' && !hasPairs ? t('Pair learners before opening Stage 3') : t('Open {stage}', { stage: t(STAGES.find((s) => s.id === nextStage).label) })}
            </button>
          )}
          {isOpen(a, 'S2') && (
            <button type="button" onClick={() => navigate(`/pbi/${classId}/pairs`)} className="tap mt-2 flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-line bg-white text-[0.9375rem] font-semibold text-ink hover:bg-cream">
              <Icons.people width="18" height="18" /> {hasPairs ? t('View peer pairs') : t('Pair learners for Stage 3')}
            </button>
          )}
        </Card>

        <SegmentedTabs
          tabs={[...STAGES.map((s) => ({ value: s.id, label: t(s.label) })), { value: 'overview', label: t('Overview') }]}
          value={stage}
          onChange={setStage}
          className="[&_button]:text-[0.75rem]"
        />

        {!openable ? (
          <div key={stage} className="animate-fade-up rounded-[18px] border border-dashed border-line bg-white px-4 py-8 text-center">
            <Icons.lock className="mx-auto text-ink-muted" />
            <p className="pt-2 text-[0.9375rem] font-semibold text-ink">{t('{stage} is not open yet', { stage: t(stageMeta?.label ?? 'Overview') })}</p>
            <p className="pt-1 text-[0.8125rem] text-ink-muted">{t('Learners can’t see it until you open it.')}</p>
          </div>
        ) : (
          <div key={stage} className="flex animate-fade-up flex-col gap-4">
            {stage !== 'overview' && !paramsComplete(a.params, stage) && (
              <EventNotice tone="warning" title={t('Choose 2 extra parameters per ability for {stage}', { stage: t(stageMeta.label) })}>
                <button type="button" onClick={() => navigate(`/pbi/${classId}/params/${stage}`)} className="tap mt-1 min-h-11 rounded-full border border-brand-700 bg-white px-3 text-[0.8125rem] font-semibold text-brand-700">{t('Choose parameters')}</button>
              </EventNotice>
            )}
            <Card>
              <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
                <SectionLabel>{t('Track Progress')}</SectionLabel>
                <p className="text-[0.9375rem] font-semibold text-ink">{t('{n} of {total}', { n: c.submitted, total: c.total })}</p>
              </div>
              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-[#ffd5b0]">
                <div key={c.submitted} className="h-full origin-left animate-grow-x rounded-full bg-brand-bright" style={{ width: `${c.total ? (c.submitted / c.total) * 100 : 0}%` }} />
              </div>
              <p className="pt-2 text-[0.8125rem] leading-[1.1875rem] text-ink-muted">
                {stage === 'overview'
                  ? t('{m} learners ready for the Overview · {n} final levels saved', { m: c.submitted, n: c.assessed })
                  : t('{w} waiting for you · {n} assessed · {r} reflections done', { w: c.waiting, n: c.assessed, r: c.reflected })}
              </p>
              {stage !== 'overview' && <p className="pt-1 text-[0.8125rem] font-medium text-danger">{t(a.stageDates?.[stage] < DEMO_TODAY ? 'Stage ended {date}' : 'Stage ends {date}', { date: short(a.stageDates?.[stage]) })}</p>}
            </Card>

            <FilterChips
              label={t('Filter students')}
              value={filter}
              onChange={setFilter}
              options={[
                { value: 'all', label: t('All'), count: rows.length },
                { value: 'submitted', label: t(stage === 'overview' ? 'Ready' : 'Submitted'), count: byFilter.submitted.length },
                { value: 'not-submitted', label: t(stage === 'overview' ? 'Not ready' : 'Not submitted'), count: byFilter['not-submitted'].length },
                { value: 'assessed', label: t(stage === 'overview' ? 'Final saved' : 'Assessed'), count: byFilter.assessed.length },
              ]}
            />
            {filter === 'not-submitted' && stage !== 'overview' && (
              <p className="-mt-2 text-[0.8125rem] leading-[1.1875rem] text-ink-muted">{t('A reminder goes straight to the learner. You can nudge the same learner again after {n} days.', { n: NUDGE_GAP_DAYS })}</p>
            )}
            {loading ? <Skeleton rows={3} /> : (
              <div key={filter} className="overflow-hidden rounded-[18px] border border-line bg-white">
                {shown.length === 0 ? (
                  <p className="px-4 py-8 text-center text-[0.8125rem] text-ink-muted">
                    {{ submitted: t('No submissions waiting for you.'), 'not-submitted': t('Everyone has submitted.'), assessed: t('No one assessed yet.'), all: t('No learners yet.') }[filter]}
                  </p>
                ) : (
                  <div className="stagger">
                    {shown.map((r) => <LearnerRow key={r.id} a={a} id={r.id} stage={stage} classId={classId} onNudge={nudge} />)}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        <Card>
          <SectionLabel>{t('Why this matters')}</SectionLabel>
          <p className="pt-2 text-[0.9375rem] leading-[1.375rem] text-ink">{t(WHY)}</p>
        </Card>
        <section className="rounded-[18px] border border-line bg-white px-5 py-1.5">
          <SectionLabel className="py-3">{t('Materials')}</SectionLabel>
          {MATERIALS.map((m) => (
            <div key={m.id} className="flex min-h-[58px] flex-wrap items-center gap-3 border-t border-[#f1efec] py-2">
              <div className="min-w-[min(10rem,100%)] flex-1">
                <p className="text-[0.9375rem] font-semibold text-ink">{t(m.title)}</p>
                <p className="text-[0.75rem] text-ink-muted">{t(m.meta)}</p>
              </div>
              <button type="button" onClick={() => showToast(t('{title} downloaded', { title: t(m.title) }))} className="tap min-h-11 rounded-full bg-brand-50 px-4 text-[0.875rem] font-semibold text-brand-700">{t('Download')}</button>
            </div>
          ))}
        </section>

        {params.get('demo') === '1' && <DemoPanel a={a} />}
      </div>

      <Modal open={!!confirm} onClose={() => !opening && setConfirm(null)} className="max-w-[340px] p-5">
        {confirm && (
          <div className="flex flex-col gap-3">
            <p className="text-[1.125rem] font-semibold leading-6 text-ink">{t('Open {stage} · {name}?', { stage: t(STAGES.find((s) => s.id === confirm).label), name: t(STAGES.find((s) => s.id === confirm).name) })}</p>
            <p className="text-[0.875rem] leading-5 text-ink-2">{t('All learners will see the next stage straight away. This can’t be undone.')}</p>
            {prevCounts && (prevCounts.notSubmitted > 0 || prevCounts.waiting > 0) && (
              <p className="rounded-xl bg-danger-50 px-3 py-2 text-[0.8125rem] leading-[1.1875rem] text-danger">
                {t('{n} learners have not submitted and {m} submissions are not assessed yet. You can still assess them later.', { n: prevCounts.notSubmitted, m: prevCounts.waiting })}
              </p>
            )}
            <PrimaryButton loading={opening} onClick={openStage}>{t('Open {stage}', { stage: t(STAGES.find((s) => s.id === confirm).label) })}</PrimaryButton>
            <button type="button" disabled={opening} onClick={() => setConfirm(null)} className="tap min-h-12 rounded-full border border-line bg-white text-[0.9375rem] font-semibold text-ink">{t('Cancel')}</button>
          </div>
        )}
      </Modal>
    </Screen>
  )
}

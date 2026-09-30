import { useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Modal, OutlineButton, PrimaryButton, Screen, FilterChips, cx } from '../../components/ui.jsx'
import { useAppStore } from '../../store/AppStore.jsx'
import { useT, useDate } from '../../i18n/index.js'
import { GROUP_PROJECT } from '../../hpc/config.js'
import { EventNotice, Icons, LockNotice, StageStepper, formatShort } from '../../hpc/components.jsx'
import {
  emit, groupStage, groupsOf, nameOf, nudgeWait, peerStatus, planningStatus, recordNudge, reflectionStatus,
  s1Submission, stageIdx, stageOpen, postSubmitted,
} from './lib.js'
import { AppBar, Card, SectionLabel, StatusPill, groupLabel, useBPage, useClassName } from './parts.jsx'
import DemoPanel from './DemoPanel.jsx'

const TABS = [
  ['S1', 'Stage 1'],
  ['S2', 'Stage 2'],
  ['S3', 'Stage 3'],
  ['overview', 'Overview'],
]

/** Visible messages for the named events (the latest one is shown on the hub). */
const EVENT_TEXT = {
  'B.live': ['success', 'Group Project is live', 'Students can see Stage 1 in their app.'],
  'B.S1.submitted': ['info', '{group} submitted Stage 1 planning', 'Their learners are ready for your Stage 1 assessment.'],
  'B.S1.teacher_evaluated': ['success', 'Stage 1 assessment saved for {name}', 'Their Stage 1 self-reflection is now open.'],
  'B.S1.self_submitted': ['info', '{name} submitted the Stage 1 self-reflection', null],
  'B.S2.opened': ['success', 'Stage 2 is open', 'Students were notified.'],
  'B.S2.recorded': ['success', 'Stage 2 draft recorded for {group}', 'You can now assess each learner in the group.'],
  'B.S2.teacher_evaluated': ['success', 'Stage 2 assessment saved for {name}', null],
  'B.S3.opened': ['success', 'Stage 3 is open', 'Students were notified.'],
  'B.S3.rubric_saved': ['success', 'Stage 3 rubric saved', null],
  'B.S3.recorded': ['success', 'Final output recorded for {group}', 'Their Stage 3 self-reflection and peer review are now open.'],
  'B.S3.teacher_evaluated': ['success', 'Stage 3 assessment saved for {name}', null],
  'B.S3.self_submitted': ['info', '{name} submitted the Stage 3 self-reflection', null],
  'B.S3.peer_submitted': ['info', '{name} submitted peer reviews', null],
  'B.overview_saved': ['success', 'Overview saved for {name}', null],
  'B.post_submitted': ['info', '{name} submitted the post-project reflection', null],
}

export default function Progress() {
  const { classId, a, base } = useBPage()
  const navigate = useNavigate()
  const t = useT()
  const d = useDate()
  const { showToast } = useAppStore()
  const { line } = useClassName(classId)
  const [params, setParams] = useSearchParams()
  const demo = params.get('demo') === '1'
  const current = a?.currentStage === 'closed' ? 'overview' : a?.currentStage ?? 'S1'
  const tab = TABS.some(([id]) => id === params.get('stage')) ? params.get('stage') : current
  const setTab = (s) => setParams((p) => { const n = new URLSearchParams(p); n.set('stage', s); return n }, { replace: true })
  const [confirm, setConfirm] = useState(null)
  const [opening, setOpening] = useState(false)

  if (!a) {
    return (
      <Screen bg="plain" header={<AppBar title={t('Group Project')} subtitle={line} onBack={() => navigate('/home')} />}>
        <div className="stagger flex min-h-full flex-col items-center justify-center gap-5 px-6 pb-20 text-center">
          <h2 className="text-[1.25rem] font-semibold leading-7 text-ink">{t('No Group Project is live for this class')}</h2>
          <p className="text-[0.9375rem] leading-[1.375rem] text-ink-muted">{t('Set up the project, form groups and pick the three stage dates to make it live.')}</p>
          <PrimaryButton className="!w-auto px-10" onClick={() => navigate(`/group-project/${classId}?setup=1`)}>{t('Set up Group Project')}</PrimaryButton>
        </div>
      </Screen>
    )
  }

  const groups = groupsOf(a)
  const L = a.learners
  const nextStage = a.currentStage === 'S1' ? 'S2' : a.currentStage === 'S2' ? 'S3' : null
  const anyS3 = groups.some((g) => g.members.some((m) => L[m]?.s3Teacher?.savedAt))
  const allOverview = groups.every((g) => g.members.every((m) => L[m]?.overview?.savedAt))
  const stageState = (s) => {
    const i = stageIdx(s); const c = stageIdx(a.currentStage)
    const allAssessed = groups.every((g) => g.members.every((m) => L[m]?.[`${s.toLowerCase()}Teacher`]?.savedAt))
    if (i < c) return allAssessed ? 'evaluated' : 'closed'
    if (i === c) return 'open'
    return 'locked'
  }
  const stages = [
    ...GROUP_PROJECT.stages.map((s) => ({
      id: s.id, label: s.label, name: s.name, state: stageState(s.id),
      note: t('Due {date}', { date: d(formatShort(a.stageDates?.[s.id])) }) + (s.teacherOnly ? ` · ${t('Teacher only')}` : ''),
    })),
    { id: 'overview', label: 'Overview', name: 'Final levels', state: allOverview ? 'evaluated' : anyS3 ? 'open' : 'locked', note: t('You pick the final level for each ability') },
  ]

  const lastEv = [...(a.events ?? [])].reverse().find((e) => EVENT_TEXT[e.name])
  const evText = lastEv && EVENT_TEXT[lastEv.name]
  const evVars = lastEv && { group: groupLabel(t, a.groups[lastEv.target]?.name ?? ''), name: nameOf(a, lastEv.target) }

  const notAssessed = nextStage ? groups.flatMap((g) => g.members).filter((m) => !L[m]?.[`${a.currentStage.toLowerCase()}Teacher`]?.savedAt).length : 0
  const openStage = () => {
    const s = confirm
    setOpening(true)
    setTimeout(() => {
      emit(a.id, `B.${s}.opened`, (x) => { x.currentStage = s })
      setOpening(false)
      setConfirm(null)
      setTab(s)
      showToast(t('{stage} is open · students notified', { stage: t(s === 'S2' ? 'Stage 2' : 'Stage 3') }))
    }, 600)
  }

  return (
    <Screen bg="plain" header={<AppBar title={t('Group Project')} subtitle={line} onBack={() => navigate('/home')} />}>
      <div className="flex flex-col gap-4 p-4 pb-8">
        <div className="animate-fade-in">
          <h2 className="text-[1.5rem] font-semibold leading-[1.875rem] text-ink">{t(a.title)}</h2>
          <p className="pt-1 text-[0.8125rem] leading-[1.1875rem] text-ink-muted">
            {t('{g} groups · {n} learners', { g: groups.length, n: groups.reduce((n, g) => n + g.members.length, 0) })}
          </p>
        </div>

        {evText && (
          <EventNotice key={lastEv.at + lastEv.name} tone={evText[0]} title={t(evText[1], evVars)}>
            {evText[2] && t(evText[2])}
          </EventNotice>
        )}

        <Card>
          <SectionLabel className="pb-3">{t('Stages')}</SectionLabel>
          <StageStepper stages={stages} current={current} />
          {nextStage && (
            <OutlineButton className="mt-4 font-semibold" onClick={() => setConfirm(nextStage)}>
              {t(nextStage === 'S2' ? 'Open Stage 2 · Draft' : 'Open Stage 3 · Final')}
            </OutlineButton>
          )}
        </Card>

        <Tabs tab={tab} onChange={setTab} />

        <div key={tab} className="animate-fade-in">
          {tab === 'overview' ? <OverviewList a={a} base={base} /> : <StageList a={a} stage={tab} base={base} />}
        </div>

        {demo && <DemoPanel a={a} />}
      </div>

      <Modal open={!!confirm} onClose={() => !opening && setConfirm(null)} className="max-w-[21rem] p-5">
        <h2 className="text-[1.25rem] font-semibold leading-7 text-ink">{t(confirm === 'S2' ? 'Open Stage 2 · Draft?' : 'Open Stage 3 · Final?')}</h2>
        <p className="pt-2 text-[0.9375rem] leading-[1.375rem] text-ink-2">{t('Students will be notified.')}</p>
        {notAssessed > 0 && (
          <p className="pt-2 text-[0.8125rem] leading-[1.1875rem] text-ink-muted">
            {t('{n} learners are not assessed for the current stage yet. You can still assess them after opening.', { n: notAssessed })}
          </p>
        )}
        <div className="flex flex-wrap gap-3 pt-5">
          <button onClick={() => setConfirm(null)} disabled={opening} className="tap min-h-12 min-w-[min(8rem,100%)] flex-1 rounded-full px-4 border border-line bg-white text-[0.9375rem] font-semibold text-ink hover:bg-surface">{t('Cancel')}</button>
          <PrimaryButton className="min-w-[min(8rem,100%)] flex-1 font-semibold" loading={opening} onClick={openStage}>{t('Open')}</PrimaryButton>
        </div>
      </Modal>
    </Screen>
  )
}

function Tabs({ tab, onChange }) {
  const t = useT()
  // 4 across normally; with large text or long Hindi labels the grid wraps to 2 × 2 instead of squeezing
  return (
    <div role="tablist" aria-label={t('Stages')} className="grid grid-cols-[repeat(auto-fit,minmax(min(4rem,100%),1fr))] gap-1 rounded-[1.5rem] bg-[#ece1d9] p-1">
      {TABS.map(([id, label]) => (
        <button key={id} role="tab" aria-selected={tab === id} onClick={() => onChange(id)}
          className={cx('tap min-h-11 min-w-0 rounded-full px-1 py-1.5 text-center text-[0.8125rem] font-medium leading-4 transition-colors duration-300', tab === id ? 'bg-white text-black shadow-[0_1px_1px_rgba(0,0,0,0.05)]' : 'text-ink-muted hover:text-ink-2')}>
          {t(label)}
        </button>
      ))}
    </div>
  )
}

/* -------------------------------------------------------------- Stage lists */

const SUB = {
  submitted: ['ok', 'Submitted'], late: ['brand', 'Submitted late'], pending: ['muted', 'Not submitted'], missing: ['danger', 'Missing'],
}
const REFL = {
  done: ['ok', 'Done'], 'done-late': ['brand', 'Done late'], pending: ['neutral', 'Not started'], late: ['danger', 'Late'], locked: ['muted', 'Locked'],
}

function StageList({ a, stage, base }) {
  const t = useT()
  const navigate = useNavigate()
  const [filter, setFilter] = useState('all')
  const groups = groupsOf(a)
  const statuses = useMemo(() => Object.fromEntries(groups.map((g) => [g.id, groupStage(a, g, stage)])), [a, stage]) // eslint-disable-line react-hooks/exhaustive-deps
  const open = stageOpen(a, stage)
  const key = stage.toLowerCase()

  const count = (s) => groups.filter((g) => statuses[g.id] === s).length
  const opts = [
    { value: 'all', label: t('All'), count: groups.length },
    stage === 'S1'
      ? { value: 'waiting', label: t('Planning not in'), count: count('waiting') }
      : { value: 'to-record', label: t('To record'), count: count('to-record') },
    { value: 'to-assess', label: t('To assess'), count: count('to-assess') },
    { value: 'assessed', label: t('Assessed'), count: count('assessed') },
  ]
  const shown = groups.filter((g) => filter === 'all' || statuses[g.id] === filter)

  return (
    <div className="flex flex-col gap-3">
      {stage === 'S2' && <EventNotice tone="info" title={t('Teacher-only stage')}>{t('No self or peer evaluation at this stage.')}</EventNotice>}
      {stage === 'S3' && <RubricCard a={a} base={base} />}
      {!open ? (
        <LockNotice>{t('{stage} opens when you open it from the Stages card. Students are notified then.', { stage: t(stage === 'S2' ? 'Stage 2' : 'Stage 3') })}</LockNotice>
      ) : (
        <>
          <FilterChips label={t('Filter groups')} options={opts} value={filter} onChange={setFilter} />
          {shown.length === 0 ? (
            <p className="py-10 text-center text-[0.875rem] leading-5 text-ink-muted">{t('No groups here.')}</p>
          ) : (
            <div className="stagger flex flex-col gap-3">
              {shown.map((g) => (
                <GroupBlock key={g.id} a={a} g={g} status={statuses[g.id]} stage={stage}>
                  {g.members.map((m) => {
                    const l = a.learners[m] ?? {}
                    const done = l[`${key}Teacher`]?.savedAt
                    const ready = stage === 'S1' ? !!g.planning?.submittedAt : stage === 'S2' ? !!g.draft?.recordedAt : !!g.final?.recordedAt && !!a.rubricSavedAt
                    return (
                      <LearnerRow key={m} name={nameOf(a, m)} onClick={() => navigate(`${base}/${key}/${m}`)}
                        action={done ? t('View') : ready ? t('Assess') : null}
                        pills={
                          <>
                            {stage === 'S1' && <Pill map={SUB} v={s1Submission(a, m)} label={t('Submission')} />}
                            {stage === 'S1' && <Pill map={REFL} v={reflectionStatus(a, m, 'S1')} label={t('Reflection')} />}
                            {stage === 'S3' && <Pill map={REFL} v={reflectionStatus(a, m, 'S3')} label={t('Self')} />}
                            {stage === 'S3' && <PeerPill a={a} m={m} />}
                            <StatusPill tone={done ? 'ok' : ready ? 'brand' : 'muted'} label={t('You')}>
                              {done ? t('Assessed') : ready ? t('To assess') : stage === 'S1' ? t('Waiting for planning') : stage === 'S3' && g.final?.recordedAt ? t('Write the rubric first') : t('Record first')}
                            </StatusPill>
                          </>
                        }
                      />
                    )
                  })}
                </GroupBlock>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}

function Pill({ map, v, label }) {
  const t = useT()
  const [tone, text] = map[v]
  return <StatusPill tone={tone} label={label}>{t(text)}</StatusPill>
}
function PeerPill({ a, m }) {
  const t = useT()
  const p = peerStatus(a, m)
  if (p.state === 'locked') return <StatusPill tone="muted" label={t('Peer')}>{t('Locked')}</StatusPill>
  return <StatusPill tone={p.state === 'done' ? 'ok' : 'neutral'} label={t('Peer')}>{t('{n} of {total}', { n: p.given, total: p.total })}</StatusPill>
}

const GROUP_TONE = {
  waiting: ['muted', 'Planning not submitted'], 'to-record': ['muted', 'Not recorded'], 'to-assess': ['brand', 'To assess'], assessed: ['ok', 'All assessed'],
}

function GroupBlock({ a, g, status, stage, children }) {
  const t = useT()
  const d = useDate()
  const navigate = useNavigate()
  const { showToast } = useAppStore()
  const [open, setOpen] = useState(status === 'to-assess')
  const [, force] = useState(0)
  const base = `/group-project/${a.classId}/progress`
  const [tone, label] = GROUP_TONE[status]
  const nudgeKey = `${a.id}:${g.id}:${stage}`
  const wait = nudgeWait(nudgeKey)
  const idx = Number(/\d+/.exec(g.id)?.[0] ?? 0)
  const out = stage === 'S2' ? g.draft : stage === 'S3' ? g.final : null
  const plan = planningStatus(a, g)

  const nudge = () => { recordNudge(nudgeKey); force((n) => n + 1); showToast(t('Reminder sent to {name}', { name: groupLabel(t, g.name) })) }

  return (
    <div className="rounded-2xl border border-line bg-white">
      <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} className="tap-soft flex w-full flex-wrap items-center gap-3 px-4 py-3 text-left">
        <span aria-hidden className="rounded-lg bg-brand-50 px-2.5 py-1 text-[0.75rem] font-bold leading-4 tracking-[0.96px] text-brand-700">{String(idx).padStart(2, '0')}</span>
        <span className="min-w-[min(8rem,100%)] flex-1">
          <span className="block text-[0.9375rem] font-bold leading-[1.375rem] text-ink">{groupLabel(t, g.name)}</span>
          <span className="block text-[0.8125rem] leading-[1.1875rem] text-ink-muted">{t('{n} students', { n: g.members.length })}</span>
        </span>
        <StatusPill tone={tone}>{t(label)}</StatusPill>
        <Icons.chevronR width="18" height="18" className={cx('shrink-0 text-ink-muted transition-transform duration-200', open && 'rotate-90')} />
      </button>

      <div className="flex flex-wrap items-center gap-2 border-t border-[#f1efec] px-4 py-2.5">
        {stage === 'S1' ? (
          <>
            <p className="min-w-[min(10rem,100%)] flex-1 text-[0.8125rem] leading-[1.1875rem] text-ink-2">
              {g.planning?.submittedAt
                ? t('Planning submitted {date}', { date: d(formatShort(g.planning.submittedAt.slice(0, 10))) }) + (plan === 'late' ? ` · ${t('late')}` : '')
                : plan === 'missing' ? t('Planning missing · past the due date') : t('Planning not submitted yet')}
            </p>
            {!g.planning?.submittedAt && (
              <button onClick={nudge} disabled={wait > 0} className="tap min-h-11 rounded-full py-2 bg-brand-50 px-3.5 text-[0.8125rem] font-semibold text-brand-700 hover:bg-[#ffe3c8] disabled:bg-surface disabled:text-ink-muted">
                {wait > 0 ? t('Nudged · again in {n} days', { n: wait }) : t('Nudge')}
              </button>
            )}
          </>
        ) : (
          <>
            <p className="min-w-[min(10rem,100%)] flex-1 text-[0.8125rem] leading-[1.1875rem] text-ink-2">
              {out?.recordedAt
                ? t('{what} recorded {date}', { what: t(stage === 'S2' ? 'Draft' : 'Final output'), date: d(formatShort(out.recordedAt.slice(0, 10))) })
                : t(stage === 'S2' ? 'Draft not recorded yet' : 'Final output not recorded yet')}
            </p>
            {stageOpen(a, stage) && (
              out?.recordedAt ? (
                <button onClick={() => navigate(`${base}/${stage.toLowerCase()}/group/${g.id}`)} aria-label={`${t('View')} · ${groupLabel(t, g.name)}`} className="tap min-h-11 min-w-11 rounded-full px-3.5 text-[0.8125rem] font-semibold text-brand-600 hover:bg-brand-50">{t('View')}</button>
              ) : (
                <button onClick={() => navigate(`${base}/${stage.toLowerCase()}/record/${g.id}`)} className="tap min-h-11 rounded-full bg-brand px-3.5 py-2 text-[0.8125rem] font-semibold text-white hover:bg-brand-hover">
                  {t(stage === 'S2' ? 'Record draft' : 'Record final')}
                </button>
              )
            )}
          </>
        )}
      </div>

      {open && <div className="animate-fade-in border-t border-line">{children}</div>}
    </div>
  )
}

function LearnerRow({ name, pills, action, onClick }) {
  return (
    <button type="button" onClick={onClick} className="tap-soft flex w-full items-center gap-3 border-b border-[#f1efec] px-4 py-3 text-left last:border-b-0 hover:bg-cream">
      <span className="min-w-0 flex-1">
        <span className="block text-[0.9375rem] font-semibold leading-[1.375rem] text-ink">{name}</span>
        <span className="flex flex-wrap gap-1.5 pt-1">{pills}</span>
      </span>
      {action && <span className="shrink-0 text-[0.8125rem] font-semibold text-brand-600">{action}</span>}
      <Icons.chevronR width="16" height="16" className="shrink-0 text-ink-muted" />
    </button>
  )
}

/* ------------------------------------------------------------- Rubric card */

function RubricCard({ a, base }) {
  const t = useT()
  const navigate = useNavigate()
  const saved = !!a.rubricSavedAt
  return (
    <Card className="flex flex-wrap items-center gap-3">
      <div className="min-w-[min(10rem,100%)] flex-1">
        <SectionLabel>{t('Stage 3 rubric')}</SectionLabel>
        <p className="pt-1 text-[0.875rem] leading-5 text-ink-2">
          {saved
            ? a.rubricShared ? t('Saved · shared with learners') : t('Saved · not shared with learners')
            : t('Write the descriptors for Beginner, Proficient and Advanced before you assess Stage 3.')}
        </p>
      </div>
      <button onClick={() => navigate(`${base}/s3/rubric`)} className={cx('tap min-h-11 shrink-0 rounded-full px-4 py-2 text-[0.8125rem] font-semibold', saved ? 'text-brand-600 hover:bg-brand-50' : 'bg-brand text-white hover:bg-brand-hover')}>
        {saved ? t('View') : t('Write rubric')}
      </button>
    </Card>
  )
}

/* ------------------------------------------------------------ Overview list */

function OverviewList({ a, base }) {
  const t = useT()
  const navigate = useNavigate()
  const [filter, setFilter] = useState('all')
  const groups = groupsOf(a)
  const st = (m) => (a.learners[m]?.overview?.savedAt ? 'saved' : a.learners[m]?.s3Teacher?.savedAt ? 'ready' : 'waiting')
  const all = groups.flatMap((g) => g.members)
  const c = (s) => all.filter((m) => st(m) === s).length
  const opts = [
    { value: 'all', label: t('All'), count: all.length },
    { value: 'ready', label: t('Ready'), count: c('ready') },
    { value: 'saved', label: t('Saved'), count: c('saved') },
    { value: 'waiting', label: t('Not ready'), count: c('waiting') },
  ]
  const tone = { saved: ['ok', 'Overview saved'], ready: ['brand', 'Ready for overview'], waiting: ['muted', 'Needs Stage 3 assessment'] }
  return (
    <div className="flex flex-col gap-3">
      <p className="text-[0.8125rem] leading-[1.1875rem] text-ink-muted">{t('Teacher, learner and peer scores stay separate. You pick the final level for each ability.')}</p>
      <FilterChips label={t('Filter learners')} options={opts} value={filter} onChange={setFilter} />
      <div className="stagger flex flex-col gap-3">
        {groups.map((g) => {
          const ms = g.members.filter((m) => filter === 'all' || st(m) === filter)
          if (!ms.length) return null
          return (
            <div key={g.id} className="overflow-hidden rounded-2xl border border-line bg-white">
              <h3 className="bg-surface/60 px-4 py-2 text-[0.8125rem] font-bold text-ink-2">{groupLabel(t, g.name)}</h3>
              {ms.map((m) => {
                const s = st(m)
                const post = a.learners[m]?.post
                return (
                  <LearnerRow key={m} name={nameOf(a, m)} onClick={() => navigate(`${base}/overview/${m}`)} action={s === 'ready' ? t('Open') : s === 'saved' ? t('View') : null}
                    pills={
                      <>
                        <StatusPill tone={tone[s][0]}>{t(tone[s][1])}</StatusPill>
                        <StatusPill tone={postSubmitted(post) ? 'ok' : 'muted'} label={t('Post-project')}>{postSubmitted(post) ? t('Submitted') : t('Not yet')}</StatusPill>
                      </>
                    }
                  />
                )
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}

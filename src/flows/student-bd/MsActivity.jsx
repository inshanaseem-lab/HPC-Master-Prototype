import { useNavigate, useSearchParams } from 'react-router-dom'
import { BottomActions, OutlineButton, PrimaryButton, Screen, cx } from '../../components/ui.jsx'
import { useT, useDate } from '../../i18n/index.js'
import { useAppStore } from '../../store/AppStore.jsx'
import { GROUP_PROJECT } from '../../hpc/config.js'
import { DEMO_TODAY, EventNotice, ProvenanceChip, StageStepper, formatLong, formatShort } from '../../hpc/components.jsx'
import { TEACHER, emit, learner, resetMultiStage } from '../../hpc/store.js'
import HandbookRow from '../../student/HandbookRow.jsx'
import { ActivityHeader, AppBar, Avatar, Badge, Card, ChevronRightIcon, DeadlineBox, Eyebrow, FileIcon, NextStepBox, Notice, StepRow, TextCard } from './parts.jsx'
import { CONTENT, DEFAULT_CONTENT } from './data.js'
import { withMs } from './MsParts.jsx'
import { rubricShared, hasRubricText } from './MsViews.jsx'
import { DEMO_S1_TEACHER, addDays, clearDrafts, nameOf, pathFor, readDraft, setDemoToday, shortOf, stageStates, unpackFilled, stamp } from './msLogic.js'

const daysBetween = (from, to) => Math.round((new Date(to + 'T00:00') - new Date(from + 'T00:00')) / 86400000)

/** /s/project/:id for a multi-stage Group Project (handbook Part B, kit S03-01…S03-13). */
export const MsActivity = withMs(function MsActivity({ a, p, me, base, now }) {
  const t = useT()
  const d = useDate()
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const demo = params.get('demo') === '1'
  const content = { ...DEFAULT_CONTENT.B, ...CONTENT[a.id] }
  const teacher = a.teacher ?? TEACHER
  const subtitle = t('{group} · Teacher: {teacher}', { group: p.g ? t(p.g.name) : t('Group Project'), teacher })
  const done = p.step === 'done'

  /* ---- current step: deadline, primary action */
  const unpackDraft = readDraft(a.id, me, 'unpacking')
  const action = {
    unpack: [unpackDraft || p.g?.planningDraft ? t('Continue Stage 1') : t('Start Stage 1'), a.stageDates.S1],
    plan: [t('Continue to group plan'), a.stageDates.S1],
    's1-self': [t('Start self-reflection'), p.w1.state === 'late' ? p.w1.lateUntil : p.w1.due],
    's3-self': [t('Start self-reflection'), p.w3.state === 'late' ? p.w3.lateUntil : p.w3.due],
    peers: [p.given.length ? t('Continue peer review') : t('Start peer review'), p.w3.state === 'late' ? p.w3.lateUntil : p.w3.due],
    post: [t('Start post-project reflection'), p.w3.state === 'late' ? p.w3.lateUntil : p.w3.due],
  }[p.step]
  const waitingDue = p.step === 'waiting-s1' ? a.stageDates.S2 : a.stageDates.S3
  const dueIso = action?.[1] ?? waitingDue
  const left = daysBetween(now, dueIso)
  const badge = left < 0 ? <Badge tone="error">{t('Deadline Missed')}</Badge>
    : <Badge tone={left <= 2 ? 'error' : 'warning'}>{left === 0 ? t('Due today') : left === 1 ? t('1 day left') : t('{n} days left', { n: left })}</Badge>
  const deadlineLabel = {
    unpack: t('Stage 1 due'), plan: t('Stage 1 due'), 's1-self': t('Self-reflection due'),
    's3-self': t('Stage 3 reflections due'), peers: t('Stage 3 reflections due'), post: t('Stage 3 reflections due'),
    'waiting-s1': t('Stage 2 date'), 'waiting-s3': t('Stage 3 date'),
  }[p.step]

  /* ---- stepper */
  const states = stageStates(a, p)
  const notes = [
    p.s1Assessed
      ? (p.s1SelfDone ? t('Assessed by your teacher · your self-reflection is submitted')
        : p.w1.state === 'closed' ? t('Assessed by your teacher · self-reflection window closed')
        : t('Assessed by your teacher · your self-reflection is open'))
      : p.s1Submitted ? t('Submitted {date} · Next: your teacher assesses Stage 1, then your self-reflection opens', { date: d(shortOf(p.g.planning.submittedAt)) })
      : t('Due {date} · Unpack the project, then plan with your group', { date: d(formatShort(a.stageDates.S1)) }),
    `${t('Assessed by your teacher only — no self or peer review.')} ${p.draft ? t('Draft recorded {date}.', { date: d(shortOf(p.draft.recordedAt)) }) : t('Due {date}.', { date: d(formatShort(a.stageDates.S2)) })}`,
    p.final
      ? t('Final work recorded · self-reflection, peer review of {n} members and post-project reflection', { n: p.peers.length })
      : t('Due {date} · Unlocks when your teacher records your final work', { date: d(formatShort(a.stageDates.S3)) }),
  ]
  const stages = states.map((s, i) => ({ ...s, note: notes[i] }))
  const current = !p.s1Submitted || p.s1SelfOpen ? 'S1' : p.final ? 'S3' : p.s1Assessed ? 'S2' : 'S1'

  /* ---- notices */
  const s1Closed = p.s1Assessed && !p.s1SelfDone && p.w1.state === 'closed'
  const s3Pending = p.final && !p.postDone
  const lateLine = (w) => t('The deadline has passed, but you can still submit your pending reflection until {date} (1 week after the deadline).', { date: d(formatShort(w.lateUntil)) })

  return (
    <Screen
      bg="plain"
      statusBar="light"
      header={<AppBar title={t('Group Project')} onBack={() => navigate('/s/home')} />}
      footer={action ? (
        <BottomActions><PrimaryButton onClick={() => navigate(pathFor(a, p))}>{action[0]}</PrimaryButton></BottomActions>
      ) : done ? (
        <BottomActions><OutlineButton onClick={() => navigate('/s/activities?tab=completed')}>{t('Back to My Activities')}</OutlineButton></BottomActions>
      ) : null}
    >
      <div className="stagger flex flex-col gap-5 px-4 pb-8 pt-4">
        <ActivityHeader activity={{ section: 'B', title: a.title }}
          subtitle={done && p.postDone ? t('{group} · Completed on {date}', { group: t(p.g.name), date: d(shortOf(p.L.post.savedAt)) }) : subtitle} />

        {/* Named-event notices (never a silent change) */}
        {p.s1SelfOpen && p.step === 's1-self' && (
          <EventNotice title={t('Your teacher has assessed Stage 1. Your self-reflection is open.')}>{t('It has 3 short questions, one for each ability.')}</EventNotice>
        )}
        {p.final && p.s3Open && !p.s3SelfDone && (
          <EventNotice title={t('Your teacher has recorded your group’s final work. Stage 3 is open.')}>{t('Reflect on your work, then review each member of your group.')}</EventNotice>
        )}
        {p.draft && !p.final && p.step === 'waiting-s3' && (
          <EventNotice tone="info" title={t('Your teacher has recorded your group’s draft.')}>{t('Stage 2 is assessed by your teacher only — no self or peer review.')}</EventNotice>
        )}
        {((p.step === 's1-self' && p.w1.state === 'late') || (['s3-self', 'peers', 'post'].includes(p.step) && p.w3.state === 'late')) && (
          <Notice tone="warning">{lateLine(p.step === 's1-self' ? p.w1 : p.w3)}</Notice>
        )}
        {s1Closed && <Notice tone="neutral">{t('The Stage 1 self-reflection window closed on {date}. It was not submitted.', { date: d(formatShort(p.w1.lateUntil)) })}</Notice>}
        {s3Pending && p.s3Closed && <Notice tone="neutral">{t('The Stage 3 reflection window closed on {date}. Only the steps you finished were recorded.', { date: d(formatShort(p.w3.lateUntil)) })}</Notice>}

        {!done && <DeadlineBox label={deadlineLabel} date={d(formatLong(dueIso))} badge={badge} closed={left < 0} />}

        {p.step === 'waiting-s1' && (
          <NextStepBox title={t('Waiting for your teacher')} body={t('Your group submitted Stage 1. Your teacher assesses it, then your Stage 1 self-reflection opens.')} />
        )}
        {p.step === 'waiting-s3' && (
          <NextStepBox title={p.draft ? t('Finish your final work with your group') : t('Work on your draft with your group')}
            body={p.draft ? t('Your teacher records your group’s final work. Stage 3 self-reflection and peer review open after that.')
              : t('Your teacher records and assesses your group’s draft (Stage 2). There is nothing to fill in for Stage 2.')} />
        )}

        {/* Stages */}
        <div className="flex flex-col gap-3">
          <Eyebrow tone="brand">{t('Stages')}</Eyebrow>
          <Card className="p-4"><StageStepper stages={stages} current={done ? undefined : current} /></Card>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(6rem,100%),1fr))] gap-2">
            {GROUP_PROJECT.stages.map((s) => (
              <div key={s.id} className="flex flex-col rounded-[10px] border border-line bg-white px-3 py-2.5">
                <Eyebrow>{t(s.label)}</Eyebrow>
                <p className="text-[0.875rem] font-semibold leading-5 text-ink">{d(formatShort(a.stageDates[s.id]))}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Your steps */}
        <YourSteps a={a} p={p} me={me} base={base} />

        {/* Teacher-recorded work */}
        {p.final && <RecordedCard label={t('Stage 3 · Final work')} rec={p.final} />}
        {p.draft && <RecordedCard label={t('Stage 2 · Draft')} rec={p.draft} />}

        {rubricShared(a) && hasRubricText(a) && (
          <button type="button" onClick={() => navigate(`${base}/rubric`)} className="tap-soft flex min-h-11 items-center gap-3 rounded-2xl border border-line bg-white px-4 py-3.5 text-left hover:bg-[#fffaf5]">
            <span aria-hidden className="grid size-10 shrink-0 place-items-center rounded-[10px] bg-brand-50 text-[#ff7900]"><FileIcon /></span>
            <span className="flex min-w-0 flex-1 flex-col gap-0.5">
              <span className="text-[0.875rem] font-semibold leading-5 text-ink">{t('Stage 3 rubric')}</span>
              <span className="text-[0.8125rem] leading-[1.1875rem] text-ink-muted">{t('Shared by your teacher · read only')}</span>
            </span>
            <ChevronRightIcon />
          </button>
        )}

        {!done && <TextCard label={t('Why this matters')}>{t(content.why)}</TextCard>}
        <Members p={p} me={me} />
        {!done && <HandbookRow />}

        {demo && <DemoPanel a={a} p={p} me={me} now={now} />}
      </div>
    </Screen>
  )
})

/* ----------------------------------------------------------- Your steps */

function YourSteps({ a, p, me, base }) {
  const t = useT()
  const d = useDate()
  const navigate = useNavigate()
  const go = (path) => () => navigate(base + path)
  const sub = (rec, at) => t('Submitted {date}', { date: d(shortOf(at ?? rec?.savedAt)) })
  const unpackDraft = readDraft(a.id, me, 'unpacking')
  const rows = []

  // Stage 1 · Unpacking + group plan
  rows.push({
    key: 'unpack', title: t('Stage 1 · Unpacking (just you)'),
    ...(p.unpackDone ? { status: 'done', subtitle: sub(null, p.L.unpacking.submittedAt), onView: go('/answers/unpacking') }
      : { status: 'active', subtitle: unpackFilled(unpackDraft) ? t('Draft saved · submit it with the group plan') : t('Guiding questions · what I know · what I need to find out'), action: unpackDraft ? t('Continue') : t('Start'), onAction: go('/unpack') }),
  })
  rows.push({
    key: 'plan', title: t('Stage 1 · Group plan (shared)'),
    ...(p.s1Submitted ? { status: 'done', subtitle: sub(null, p.g.planning.submittedAt), onView: go('/answers/planning') }
      : p.g?.planningDraft ? { status: 'active', subtitle: t('Last edited by {name} · {date}', { name: p.g.planningDraft.editedBy === me ? t('you') : nameOf(p.g.planningDraft.editedBy), date: d(shortOf(p.g.planningDraft.editedAt)) }), action: t('Continue'), onAction: go('/plan') }
      : { status: 'active', subtitle: t('Schedule · resources · roles · barriers'), action: t('Start'), onAction: go('/plan') }),
  })
  // Stage 1 · Self-reflection
  rows.push({
    key: 's1', title: t('Stage 1 · Self-reflection'),
    ...(p.s1SelfDone ? { status: 'done', subtitle: sub(p.L.s1Self), onView: go('/answers/s1self') }
      : p.s1Assessed && p.w1.state === 'closed' ? { status: 'closed', subtitle: t('Not submitted') }
      : p.s1SelfOpen ? { status: 'active', subtitle: t('{n} questions · about {m} min', { n: 3, m: 4 }), action: t('Start'), onAction: go('/s1-reflect') }
      : { status: 'locked', subtitle: t('Opens after your teacher assesses Stage 1') }),
  })
  // Stage 3
  const s3Closed = p.s3Closed
  rows.push({
    key: 's3', title: t('Stage 3 · Self-reflection'),
    ...(p.s3SelfDone ? { status: 'done', subtitle: sub(p.L.s3Self), onView: go('/answers/s3self') }
      : s3Closed ? { status: 'closed', subtitle: t('Not submitted') }
      : p.final ? { status: 'active', subtitle: t('{n} questions · about {m} min', { n: 3, m: 3 }), action: t('Start'), onAction: go('/s3-reflect') }
      : { status: 'locked', subtitle: t('Opens after your teacher records your final work') }),
  })
  const count = t('{k} of {n} reviewed', { k: p.given.length, n: p.peers.length })
  rows.push({
    key: 'peer', title: t('Stage 3 · Peer review'),
    ...(p.peerDone ? { status: 'done', subtitle: count }
      : s3Closed ? { status: 'closed', subtitle: count }
      : p.s3SelfDone ? { status: 'active', subtitle: t('{count} · about 2 min each', { count }), action: p.given.length ? t('Continue') : t('Start'), onAction: go('/peers') }
      : { status: 'locked', subtitle: t('Review {n} group members · opens after self-reflection', { n: p.peers.length }) }),
  })
  rows.push({
    key: 'post', title: t('Post-project reflection'),
    ...(p.postDone ? { status: 'done', subtitle: sub(p.L.post), onView: go('/answers/post') }
      : s3Closed ? { status: 'closed', subtitle: t('Not submitted') }
      : p.peerDone ? { status: 'active', subtitle: t('{n} questions · about {m} min', { n: GROUP_PROJECT.postReflection.length, m: 8 }), action: t('Start'), onAction: go('/post') }
      : { status: 'locked', subtitle: t('Opens after peer review') }),
  })

  // Only one "active" row gets the orange treatment: the current step. Others that are open stay neutral-active.
  return (
    <div className="flex flex-col gap-2">
      <Eyebrow tone="brand">{p.step === 'done' ? t('My responses') : t('Your steps')}</Eyebrow>
      {rows.map((r, i) => <StepRow key={r.key} n={i + 1} {...r} />)}
      {p.given.length > 0 && (
        <Card className="mt-1">
          <div className="flex flex-wrap items-center justify-between gap-2 px-4 pt-3.5">
            <Eyebrow>{t('Peer reviews I gave')}</Eyebrow>
            <ProvenanceChip kind="student" />
          </div>
          <div className="stagger">
            {p.peers.map((m, i) => {
              const isDone = p.given.includes(m)
              return (
                <div key={m} className={cx('flex flex-wrap items-center gap-3 px-4 py-3', i < p.peers.length - 1 && 'border-b border-[#f1efec]')}>
                  <Avatar name={nameOf(m)} />
                  <span className="min-w-[min(8rem,100%)] flex-1 text-[0.875rem] font-semibold text-ink">{nameOf(m)}</span>
                  {isDone
                    ? <button type="button" onClick={() => navigate(`${base}/given/${m}`)} aria-label={`${t('View')} · ${nameOf(m)}`} className="tap min-h-11 min-w-11 rounded-md px-1 text-[0.8125rem] font-medium text-brand-700 hover:underline">{t('View')}</button>
                    : <Badge>{t('To do')}</Badge>}
                </div>
              )
            })}
          </div>
        </Card>
      )}
    </div>
  )
}

/* --------------------------------------------------- Teacher-recorded work */

function RecordedCard({ label, rec }) {
  const t = useT()
  const d = useDate()
  const files = (rec.files ?? []).map((f) => (typeof f === 'string' ? f : f?.name)).filter(Boolean)
  return (
    <Card>
      <div className="flex flex-col gap-2.5 p-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <Eyebrow>{label}</Eyebrow>
          <ProvenanceChip kind="teacher" />
        </div>
        <p className="text-[0.9375rem] font-semibold leading-[1.375rem] text-ink">{t('Recorded by your teacher')}</p>
        <p className="text-[0.8125rem] leading-[1.1875rem] text-ink-muted">{[rec.kind && t(rec.kind), d(shortOf(rec.recordedAt))].filter(Boolean).join(' · ')}</p>
        {rec.note && <p className="text-[0.875rem] leading-5 text-ink-2">{t(rec.note)}</p>}
        {files.map((f) => (
          <div key={f} className="flex items-center gap-2.5 rounded-[10px] border border-line px-3 py-2.5">
            <span aria-hidden className="shrink-0 text-[#ff7900]"><FileIcon /></span>
            <span className="min-w-0 flex-1 break-all text-[0.8125rem] font-medium text-ink">{f}</span>
          </div>
        ))}
        {rec.link && <p className="break-all text-[0.8125rem] font-medium text-brand-700">{rec.link}</p>}
      </div>
    </Card>
  )
}

/* -------------------------------------------------------------- Members */

function Members({ p, me }) {
  const t = useT()
  if (!p.g) return null
  const roles = p.g.planning?.roles ?? {}
  const members = [me, ...p.g.members.filter((m) => m !== me)]
  return (
    <Card>
      <div className="px-4 pt-3.5"><Eyebrow>{t('My group · {name}', { name: t(p.g.name) })}</Eyebrow></div>
      <div className="stagger">
        {members.map((m, i) => (
          <div key={m} className={cx('flex flex-wrap items-center gap-3 px-4 py-3', i < members.length - 1 && 'border-b border-[#f1efec]')}>
            <Avatar name={nameOf(m)} />
            <div className="flex min-w-[min(8rem,100%)] flex-1 flex-col gap-0.5">
              <p className="text-[0.875rem] font-semibold leading-5 text-ink">{m === me ? t('{name} (You)', { name: nameOf(m) }) : nameOf(m)}</p>
              <p className="text-[0.8125rem] leading-[1.1875rem] text-ink-muted">{t('Student ID {id}', { id: learner(m)?.idMasked ?? '' })}</p>
            </div>
            {roles[m] && <span className="rounded-full bg-surface px-2.5 text-[0.75rem] font-medium leading-6 text-ink-2">{t(roles[m])}</span>}
          </div>
        ))}
      </div>
    </Card>
  )
}

/* ------------------------------------------------------------ Demo panel */

/** ?demo=1 — emulate the teacher so a reviewer can walk the whole student journey alone. */
function DemoPanel({ a, p, me, now }) {
  const t = useT()
  const { showToast } = useAppStore()
  const g = p.g
  const at = stamp
  const other = g?.members.find((m) => m !== me)
  const actions = [
    {
      label: '{name} edits the group plan', disabled: p.s1Submitted,
      run: () => emit(a.id, 'B.S1.planning_saved', (x) => {
        const prev = x.groups[g.id].planningDraft ?? {}
        x.groups[g.id].planningDraft = {
          schedule: ['Day 1 — List water sources in our ward', 'Day 2 — Visit the kuhl', 'Day 3 — Interview 5 households'],
          resources: ['Chart paper and colours'], barriers: ['Rain may stop field visits'],
          roles: Object.fromEntries(g.members.map((m) => [m, ''])), ...prev, editedBy: other, editedAt: at(),
        }
      }, { by: other, target: g.id }),
    },
    {
      label: 'Group 2 submits Stage 1 (skip the forms)', disabled: p.s1Submitted,
      run: () => emit(a.id, 'B.S1.submitted', (x) => {
        const n = at()
        x.groups[g.id].planning = {
          schedule: ['Day 1 — List water sources', 'Day 2 — Visit the kuhl and the hand pump', 'Day 3 — Interview 5 households', 'Day 4 — Draw the water map'],
          resources: ['Chart paper and colours', 'Phone camera'],
          roles: Object.fromEntries(g.members.map((m, i) => [m, ['Leader', 'Note-taker', 'Photographer', 'Map maker', 'Presenter'][i % 5]])),
          barriers: ['Rain may stop field visits'], editedBy: me, editedAt: n, submittedAt: n,
        }
        delete x.groups[g.id].planningDraft
        x.learners[me].unpacking = { questions: 'Where does our village get its water?', know: 'We use the kuhl and a hand pump.', need: 'How much water each household uses.', submittedAt: n }
      }, { by: me, target: g.id }),
    },
    {
      label: 'Teacher assesses Riya · Stage 1', disabled: !p.s1Submitted || p.s1Assessed,
      run: () => emit(a.id, 'B.S1.teacher_evaluated', (x) => { x.learners[me].s1Teacher = { ...DEMO_S1_TEACHER, savedAt: at() } }, { by: TEACHER, target: me }),
    },
    {
      label: 'Teacher records Group 2 draft · Stage 2', disabled: Boolean(p.draft),
      run: () => emit(a.id, 'B.S2.recorded', (x) => {
        x.groups[g.id].draft = { kind: 'Digital · photo', files: ['group2-water-map-draft.jpg'], link: '', note: 'First sketch of the village water map.', recordedAt: at() }
        x.currentStage = 'S2'
      }, { by: TEACHER, target: g.id }),
    },
    {
      label: 'Teacher records Group 2 final · Stage 3', disabled: Boolean(p.final),
      run: () => emit(a.id, 'B.S3.recorded', (x) => {
        x.groups[g.id].final = { kind: 'Physical · model', files: ['group2-water-map-final.jpg', 'group2-action-plan.pdf'], link: '', note: 'Village water map with a 5-point action plan.', recordedAt: at() }
        x.currentStage = 'S3'
      }, { by: TEACHER, target: g.id }),
    },
    {
      label: 'Teacher shares the Stage 3 rubric', disabled: rubricShared(a),
      run: () => emit(a.id, 'B.S3.rubric_shared', (x) => {
        const fill = (b, pr, ad) => ({ B: b, P: pr, A: ad })
        x.rubricS3 = {
          awareness: fill('Names one water source and its use.', 'Explains how the village uses its main sources.', 'Links water use to its causes and proposes fixes.'),
          sensitivity: fill('Listens to some group members.', 'Includes every member’s ideas.', 'Brings out quieter voices and community views.'),
          creativity: fill('Uses a standard chart.', 'Adds an original idea to the map.', 'Designs a new, useful solution for the village.'),
        }
        x.rubricS3Shared = true
      }, { by: TEACHER, target: a.id }),
    },
  ]
  const days = [
    [DEMO_TODAY, 'Demo today'],
    [addDays(a.stageDates.S2, 1), 'After Stage 1 reflection due (late)'],
    [addDays(a.stageDates.S3, 1), 'After Stage 3 due (late)'],
    [addDays(a.stageDates.S3, 8), 'After late window (closed)'],
  ]
  return (
    <section aria-label={t('Demo')} className="flex flex-col gap-3 rounded-2xl border border-dashed border-[#cdcac5] bg-white/70 p-4">
      <Eyebrow>{t('Demo · emulate the teacher')}</Eyebrow>
      <div className="flex flex-col gap-2">
        {actions.map((x) => (
          <button key={x.label} type="button" disabled={x.disabled} onClick={() => { x.run(); showToast(t(x.label)) }}
            className="tap min-h-11 rounded-xl border border-line bg-white px-3 py-2 text-left text-[0.8125rem] font-medium text-ink hover:bg-cream disabled:opacity-40">
            {t(x.label, { name: nameOf(other) })}
          </button>
        ))}
      </div>
      <Eyebrow>{t('Pretend today is')}</Eyebrow>
      <div className="flex flex-wrap gap-1.5">
        {days.map(([iso, label]) => (
          <button key={iso} type="button" onClick={() => setDemoToday(iso === DEMO_TODAY ? null : iso)} aria-pressed={now === iso}
            className={cx('tap min-h-11 rounded-full border px-3 py-1.5 text-[0.75rem] font-medium', now === iso ? 'border-brand bg-brand text-white' : 'border-line bg-white text-ink-2')}>
            {t(label)} · {formatShort(iso)}
          </button>
        ))}
      </div>
      <button type="button" onClick={() => { resetMultiStage(); clearDrafts(); setDemoToday(null); showToast(t('Demo data reset')) }}
        className="tap min-h-11 self-start rounded-full px-3 text-[0.8125rem] font-semibold text-danger hover:bg-danger-50">
        {t('Reset demo data (Parts B and C)')}
      </button>
    </section>
  )
}

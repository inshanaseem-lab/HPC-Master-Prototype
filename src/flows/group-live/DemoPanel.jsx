import { useState } from 'react'
import { useAppStore } from '../../store/AppStore.jsx'
import { useT } from '../../i18n/index.js'
import { ABILITIES, GROUP_PROJECT } from '../../hpc/config.js'
import { STUDENT_ID, emit, groupOf, resetMultiStage } from '../../hpc/store.js'
import { cx } from '../../components/ui.jsx'
import { groupsOf, nameOf } from './lib.js'

/**
 * QA fast-forward panel (?demo=1 on the progress hub). Every button goes through emit() with the
 * same named events the real screens use, so both apps react exactly as they would in use.
 */
const now = () => new Date().toISOString()
const pick = (n, k) => Array.from({ length: n }, (_, i) => i).filter((i) => (i + k) % 3 !== 0)
const ticks = (list, k) => Object.fromEntries(ABILITIES.map((ab, j) => [ab.id, pick(list[ab.id].length, k + j)]))

function planningFor(g) {
  return {
    schedule: ['Day 1 — List water sources in our ward', 'Day 2 — Visit the kuhl and the hand pump', 'Day 3 — Interview 5 households', 'Day 4 — Draw the water map'],
    resources: ['Chart paper and colours', 'Phone camera'],
    roles: Object.fromEntries(g.members.map((m, i) => [m, ['Leader', 'Note-taker', 'Photographer', 'Map maker', 'Presenter', 'Researcher'][i % 6]])),
    barriers: ['Rain may stop field visits'],
    editedBy: g.members[1] ?? g.members[0], editedAt: now(), submittedAt: now(),
  }
}
const unpacking = () => ({
  questions: 'Where does our water come from? Which sources are drying up?',
  know: 'The kuhl feeds the fields; the hand pump gives drinking water.',
  need: 'How much water each household uses.',
  submittedAt: now(),
})

function submitS1(a, gid) {
  emit(a.id, 'B.S1.submitted', (x) => {
    const g = x.groups[gid]
    g.planning = planningFor(g)
    g.members.forEach((m) => { x.learners[m].unpacking ??= unpacking() })
  }, { by: a.groups[gid].members[0], target: gid })
}
function assess(a, stage, ids) {
  const key = `${stage}Teacher`
  ids.forEach((m, k) => {
    if (a.learners[m]?.[key]?.savedAt) return
    emit(a.id, `B.${stage.toUpperCase()}.teacher_evaluated`, (x) => {
      x.learners[m][key] = stage === 's3'
        ? { levels: Object.fromEntries(ABILITIES.map((ab, j) => [ab.id, ['B', 'P', 'A'][(k + j) % 3]])), comments: 'Good final output.', savedAt: now() }
        : { ticks: ticks(GROUP_PROJECT[key], k), comments: 'Steady progress.', intervention: '', savedAt: now() }
    }, { target: m })
  })
}
function record(a, stage, gid) {
  const field = stage === 'S2' ? 'draft' : 'final'
  if (a.groups[gid][field]?.recordedAt) return
  emit(a.id, `B.${stage}.recorded`, (x) => {
    x.groups[gid][field] = { kind: 'digital', files: [], link: `https://drive.example.com/${gid.toLowerCase()}-${field}`, note: '', recordedAt: now() }
  }, { target: gid })
}

export default function DemoPanel({ a }) {
  const t = useT()
  const { showToast } = useAppStore()
  const [open, setOpen] = useState(true)
  const groups = groupsOf(a)
  const g2 = a.groups.G2
  const riya = STUDENT_ID

  const run = (label, fn) => { fn(); showToast(t('Demo: {label}', { label: t(label) })) }
  const actions = [
    ['Group 2 submits Stage 1 planning', () => g2 && submitS1(a, 'G2'), !g2?.planning?.submittedAt],
    ['All groups submit Stage 1 planning', () => groups.forEach((g) => !g.planning?.submittedAt && submitS1(a, g.id)), groups.some((g) => !g.planning?.submittedAt)],
    ['Assess all of Group 2 for Stage 1', () => assess(a, 's1', g2?.members ?? []), !!g2?.planning?.submittedAt],
    ['Riya submits S1 self-reflection', () => {
      if (!a.learners[riya]?.s1Teacher?.savedAt) assess(a, 's1', [riya])
      emit(a.id, 'B.S1.self_submitted', (x) => { x.learners[riya].s1Self = { ticks: ticks(GROUP_PROJECT.s1Self, 1), savedAt: now() } }, { by: riya, target: riya })
    }, !!a.learners[riya] && !!groupOf(a, riya)?.planning?.submittedAt && !a.learners[riya]?.s1Self?.savedAt],
    ['Assess everyone for Stage 1', () => assess(a, 's1', groups.filter((g) => g.planning?.submittedAt).flatMap((g) => g.members)), true],
    ['Assessed learners submit S1 self-reflection', () => groups.flatMap((g) => g.members).forEach((m, k) => {
      if (a.learners[m]?.s1Teacher?.savedAt && !a.learners[m]?.s1Self?.savedAt) emit(a.id, 'B.S1.self_submitted', (x) => { x.learners[m].s1Self = { ticks: ticks(GROUP_PROJECT.s1Self, k), savedAt: now() } }, { by: m, target: m })
    }), true],
    ['Record every Stage 2 draft', () => groups.forEach((g) => record(a, 'S2', g.id)), a.currentStage !== 'S1'],
    ['Assess everyone for Stage 2', () => assess(a, 's2', groups.filter((g) => g.draft?.recordedAt).flatMap((g) => g.members)), a.currentStage !== 'S1'],
    ['Save a sample Stage 3 rubric', () => emit(a.id, 'B.S3.rubric_saved', (x) => {
      x.rubricS3 = Object.fromEntries(ABILITIES.map((ab) => [ab.id, {
        B: `Shows a basic ${ab.label.toLowerCase()} of the water problem with help.`,
        P: `Shows clear ${ab.label.toLowerCase()} and applies it to the village plan.`,
        A: `Shows deep ${ab.label.toLowerCase()} and inspires others to act on the plan.`,
      }]))
      x.rubricShared = true; x.rubricSavedAt = now()
    }), !a.rubricSavedAt],
    ['Record every Stage 3 final output', () => groups.forEach((g) => record(a, 'S3', g.id)), a.currentStage === 'S3' || a.currentStage === 'overview'],
    ['All learners finish S3 self + peer', () => groups.forEach((g) => g.members.forEach((m, k) => {
      if (!a.groups[g.id].final?.recordedAt) return
      emit(a.id, 'B.S3.self_submitted', (x) => { x.learners[m].s3Self = { ticks: ticks(GROUP_PROJECT.s3Self, k), savedAt: now() } }, { by: m, target: m })
      emit(a.id, 'B.S3.peer_submitted', (x) => {
        x.learners[m].peerGiven = Object.fromEntries(g.members.filter((p) => p !== m).map((p, j) => [p, { ticks: ticks(GROUP_PROJECT.s3Peer, k + j), savedAt: now() }]))
      }, { by: m, target: m })
    })), a.currentStage === 'S3' || a.currentStage === 'overview'],
    ['Assess everyone for Stage 3', () => assess(a, 's3', groups.filter((g) => g.final?.recordedAt).flatMap((g) => g.members)), !!a.rubricSavedAt],
    ['Riya submits post-project reflection', () => emit(a.id, 'B.post_submitted', (x) => {
      x.learners[riya].post = {
        ...(x.learners[riya].post ?? {}),
        answers: Object.fromEntries(GROUP_PROJECT.postReflection.map((q, i) => [q, [
          'How our village gets its water and why the kuhl matters.', 'Walking to the kuhl with my group.', 'Listening, drawing maps, asking questions',
          'Speaking in front of the class; finishing on time', 'Some families did not want to talk.', 'How can we clean the hand pump water?',
          'Let us visit the panchayat office and share our map with them.'][i]])),
        submittedAt: now(),
      }
    }, { by: riya, target: riya }), !!a.learners[riya] && !a.learners[riya]?.post?.submittedAt],
  ]

  return (
    <section aria-label={t('Demo controls')} className="rounded-2xl border border-dashed border-[#c9d8f2] bg-[#f5f8fe] p-3">
      <button onClick={() => setOpen((o) => !o)} aria-expanded={open} className="tap flex min-h-11 w-full flex-wrap items-center justify-between gap-x-3 text-left">
        <span className="text-[0.75rem] font-bold uppercase tracking-[0.96px] text-[#2f4fb3]">{t('Demo · fast-forward')}</span>
        <span className="text-[0.75rem] text-ink-muted">{open ? t('Hide') : t('Show')}</span>
      </button>
      {open && (
        <div className="flex flex-col gap-1.5 pt-3">
          <p className="pb-1 text-[0.75rem] leading-4 text-ink-muted">{t('Each button emits the same named event as the real screen (e.g. {e}).', { e: 'B.S1.submitted' })}</p>
          {actions.map(([label, fn, enabled]) => (
            <button key={label} disabled={!enabled} onClick={() => run(label, fn)}
              className={cx('tap min-h-11 rounded-xl border px-3 py-2 text-left text-[0.8125rem] font-medium', enabled ? 'border-[#c9d8f2] bg-white text-[#2f4fb3] hover:bg-[#eef4fd]' : 'border-line bg-white/60 text-ink-muted')}>
              {t(label)}
            </button>
          ))}
          <button onClick={() => { resetMultiStage(); showToast(t('Demo data reset')) }} className="tap mt-1 min-h-11 rounded-xl border px-3 py-2 border-[#efc9c6] bg-white px-3 text-left text-[0.8125rem] font-medium text-danger hover:bg-danger-50">
            {t('Reset demo data (both apps)')}
          </button>
          {a.learners[riya] && <p className="pt-1 text-[0.75rem] text-ink-muted">{t('Sample student: {name}, Group 2', { name: nameOf(a, riya) })}</p>}
        </div>
      )}
    </section>
  )
}

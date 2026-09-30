import { lazy } from 'react'
import { AllDone, PeerMembers, PeerReview, Reflect, ReflectionView, Reflected, forSection } from './Steps.jsx'
import { registerStudentStep } from '../../hpc/registry.js'
import { formatShort } from '../../hpc/components.jsx'
import { getToday, pathFor, progressOf } from './msLogic.js'

// Screens are code-split: this micro-frontend's screens download on first visit
const ClassScreen = lazy(() => import('./ActivityScreen.jsx').then((m) => ({ default: m.ClassScreen })))
const ProjectScreen = lazy(() => import('./ActivityScreen.jsx').then((m) => ({ default: m.ProjectScreen })))
const Plan = lazy(() => import('./MsStage1.jsx').then((m) => ({ default: m.Plan })))
const S1Reflect = lazy(() => import('./MsStage1.jsx').then((m) => ({ default: m.S1Reflect })))
const S1Reflected = lazy(() => import('./MsStage1.jsx').then((m) => ({ default: m.S1Reflected })))
const S1Submitted = lazy(() => import('./MsStage1.jsx').then((m) => ({ default: m.S1Submitted })))
const Unpack = lazy(() => import('./MsStage1.jsx').then((m) => ({ default: m.Unpack })))
const MsAllDone = lazy(() => import('./MsStage3.jsx').then((m) => ({ default: m.AllDone })))
const PeerForm = lazy(() => import('./MsStage3.jsx').then((m) => ({ default: m.PeerForm })))
const PeerSaved = lazy(() => import('./MsStage3.jsx').then((m) => ({ default: m.PeerSaved })))
const Peers = lazy(() => import('./MsStage3.jsx').then((m) => ({ default: m.Peers })))
const Post = lazy(() => import('./MsStage3.jsx').then((m) => ({ default: m.Post })))
const S3Reflect = lazy(() => import('./MsStage3.jsx').then((m) => ({ default: m.S3Reflect })))
const S3Reflected = lazy(() => import('./MsStage3.jsx').then((m) => ({ default: m.S3Reflected })))
const AnswersView = lazy(() => import('./MsViews.jsx').then((m) => ({ default: m.AnswersView })))
const GivenView = lazy(() => import('./MsViews.jsx').then((m) => ({ default: m.GivenView })))
const RubricView = lazy(() => import('./MsViews.jsx').then((m) => ({ default: m.RubricView })))

/**
 * Student app · Section B (Group Project) and Section D (Classroom Interaction).
 *
 * Multi-stage Group Project (handbook Part B, when getMultiStage(id) exists — demo 'gp-water'):
 *   /s/project/:id                 activity page: stepper, dates, steps, members, handbook (S03-01/02/03/10/11/13); ?demo=1 teacher emulator
 *   /s/project/:id/unpack          S1 Page 1 Unpacking (individual)
 *   /s/project/:id/plan            S1 Page 2 group planning (shared, OQ-SEC-10)
 *   /s/project/:id/s1-submitted    Stage 1 submitted → Waiting for your teacher (S03-02)
 *   /s/project/:id/s1-reflect      S1 self-reflection, 3 steps (S03-04/05) · /s1-reflected (S03-06)
 *   /s/project/:id/s3-reflect      S3 self-reflection · /s3-reflected (Continue / I Will Do This Later)
 *   /s/project/:id/peers           S3 peer review members (S03-07) · /peers/:peerId (S03-08) · /peers/:peerId/saved (S03-09)
 *   /s/project/:id/post            Page 8 post-project reflection · /all-done
 *   /s/project/:id/answers/:kind   my answers (S03-14) · /given/:peerId peer review I gave (S03-15) · /rubric shared S3 rubric
 *
 * Single-cycle (other B activities, and all of Section D):
 *   /s/project/:id            5.1 in progress · 10.1 waiting · 5.2 recorded · 5.6 coming back · 9.4 late · 9.5 closed
 *   /s/project/:id/reflect    5.3 self-reflection (5.4 exit warning)
 *   /s/project/:id/reflected  5.5 Continue / I Will Do This Later
 *   /s/project/:id/reflection own self-reflection answers (View)
 *   /s/project/:id/peer       5.7 members
 *   /s/project/:id/peer/:memberId  5.8 peer review
 *   /s/project/:id/done       5.9 all done
 * Same shape under /s/class/:id for Section D (7.1 · 10.2 · 7.2 · 7.5 · 7.3 · 7.4 · 7.6).
 */
const steps = (prefix, section) => [
  { path: `${prefix}/reflect`, element: wrap(Reflect, section) },
  { path: `${prefix}/reflected`, element: wrap(Reflected, section) },
  { path: `${prefix}/reflection`, element: wrap(ReflectionView, section) },
  { path: `${prefix}/peer`, element: wrap(PeerMembers, section) },
  { path: `${prefix}/peer/:memberId`, element: wrap(PeerReview, section) },
  { path: `${prefix}/done`, element: wrap(AllDone, section) },
]
function wrap(Component, section) {
  const W = forSection(Component, section)
  return <W />
}

const P = '/s/project/:id'
const multiStage = [
  { path: `${P}/unpack`, element: <Unpack /> },
  { path: `${P}/plan`, element: <Plan /> },
  { path: `${P}/s1-submitted`, element: <S1Submitted /> },
  { path: `${P}/s1-reflect`, element: <S1Reflect /> },
  { path: `${P}/s1-reflected`, element: <S1Reflected /> },
  { path: `${P}/s3-reflect`, element: <S3Reflect /> },
  { path: `${P}/s3-reflected`, element: <S3Reflected /> },
  { path: `${P}/peers`, element: <Peers /> },
  { path: `${P}/peers/:peerId`, element: <PeerForm /> },
  { path: `${P}/peers/:peerId/saved`, element: <PeerSaved /> },
  { path: `${P}/post`, element: <Post /> },
  { path: `${P}/all-done`, element: <MsAllDone /> },
  { path: `${P}/answers/:kind`, element: <AnswersView /> },
  { path: `${P}/given/:peerId`, element: <GivenView /> },
  { path: `${P}/rubric`, element: <RubricView /> },
]

/**
 * Home-screen hook: "Next: …" line, due date and an optional Today's Focus card.
 * Strings are English keys (callers translate). `due` is a short date like "15 Sep".
 */
const NEXT = {
  unpack: 'Next: Stage 1 · Unpack the project',
  plan: 'Next: Stage 1 · Plan with your group',
  'waiting-s1': 'Waiting for your teacher to assess Stage 1',
  's1-self': 'Next: Stage 1 self-reflection',
  'waiting-s3': 'Stage 2 · Your teacher records your draft',
  's3-self': 'Next: Stage 3 self-reflection',
  peers: 'Next: Peer review of your group',
  post: 'Next: Post-project reflection',
  done: 'All steps done',
}
registerStudentStep('B', (a, learnerId) => {
  const p = progressOf(a, learnerId, getToday())
  if (!p.g) return null
  let dueIso = null
  if (p.step === 'unpack' || p.step === 'plan') dueIso = a.stageDates?.S1
  else if (p.step === 's1-self') dueIso = p.w1.state === 'late' ? p.w1.lateUntil : p.w1.due
  else if (['s3-self', 'peers', 'post'].includes(p.step)) dueIso = p.w3.state === 'late' ? p.w3.lateUntil : p.w3.due
  else if (p.step === 'waiting-s3') dueIso = a.stageDates?.S3
  let focus
  if (p.step === 's1-self') focus = { title: 'Your Stage 1 self-reflection is open', sub: 'Your teacher has assessed Stage 1 of {title}.', vars: { title: a.title } }
  else if (p.step === 's3-self') focus = { title: 'Stage 3 is open', sub: 'Reflect on {title} and review your group.', vars: { title: a.title } }
  else if (p.step === 'peers') focus = { title: 'Peer review due', sub: '{k} of {n} reviewed', vars: { k: p.given.length, n: p.peers.length } }
  else if (p.step === 'post') focus = { title: 'Post-project reflection', sub: 'The last step for {title}.', vars: { title: a.title } }
  return {
    next: NEXT[p.step],
    due: dueIso ? formatShort(dueIso) : null,
    dueIso,
    late: (p.step === 's1-self' && p.w1.state === 'late') || (['s3-self', 'peers', 'post'].includes(p.step) && p.w3.state === 'late'),
    path: pathFor(a, p),
    step: p.step,
    completed: p.step === 'done',
    focus,
  }
})

export default [
  { path: '/s/project/:id', element: <ProjectScreen /> },
  ...multiStage,
  ...steps('/s/project/:id', 'B'),
  { path: '/s/class/:id', element: <ClassScreen /> },
  ...steps('/s/class/:id', 'D'),
]

import { lazy } from 'react'
import { registerStudentStep } from '../../hpc/registry.js'
import { TASK_PATH, TASK_TITLE, WAIT_TEXT, dueFor, dueShort, isMultiPbi, progressOf, unlockEvent } from './pbiModel.js'

// Screens are code-split: this micro-frontend's screens download on first visit
const SurveyQuestion = lazy(() => import('./Survey.jsx').then((m) => ({ default: m.SurveyQuestion })))
const SurveyStart = lazy(() => import('./Survey.jsx').then((m) => ({ default: m.SurveyStart })))
const SurveySubmitted = lazy(() => import('./Survey.jsx').then((m) => ({ default: m.SurveySubmitted })))
const PbiAdd = lazy(() => import('./Pbi.jsx').then((m) => ({ default: m.PbiAdd })))
const PbiConfirm = lazy(() => import('./Pbi.jsx').then((m) => ({ default: m.PbiConfirm })))
const PbiDone = lazy(() => import('./Pbi.jsx').then((m) => ({ default: m.PbiDone })))
const PbiReflect = lazy(() => import('./Pbi.jsx').then((m) => ({ default: m.PbiReflect })))
const PbiSubmitted = lazy(() => import('./Pbi.jsx').then((m) => ({ default: m.PbiSubmitted })))
const PbiEntry = lazy(() => import('./PbiStages.jsx').then((m) => ({ default: m.PbiEntry })))
const PbiSent = lazy(() => import('./PbiStages.jsx').then((m) => ({ default: m.PbiSent })))
const PbiStagesCompleted = lazy(() => import('./PbiStages.jsx').then((m) => ({ default: m.PbiStagesCompleted })))
const PbiPeer = lazy(() => import('./PbiForms.jsx').then((m) => ({ default: m.PbiPeer })))
const PbiPlan = lazy(() => import('./PbiForms.jsx').then((m) => ({ default: m.PbiPlan })))
const PbiPlanCheck = lazy(() => import('./PbiForms.jsx').then((m) => ({ default: m.PbiPlanCheck })))
const PbiPost = lazy(() => import('./PbiForms.jsx').then((m) => ({ default: m.PbiPost })))
const PbiRevise = lazy(() => import('./PbiForms.jsx').then((m) => ({ default: m.PbiRevise })))
const PbiS2 = lazy(() => import('./PbiForms.jsx').then((m) => ({ default: m.PbiS2 })))
const PbiS2Check = lazy(() => import('./PbiForms.jsx').then((m) => ({ default: m.PbiS2Check })))
const PbiSelfReflect = lazy(() => import('./PbiForms.jsx').then((m) => ({ default: m.PbiSelfReflect })))

/**
 * Student · Section A surveys and Section C Problem Based Enquiry.
 * Demo switches: ?deadline=passed on a survey question or a PBI form (S06-03), ?fail=upload / ?fail=submit
 * (S06-06 / S06-02), ?fail=handbook, ?missed=1 on the PBI activity page (S04-08), ?demo=1 on the PBI
 * activity page (emulate teacher and partner). Files named with "fail" always fail their first upload.
 *
 * /s/pbi/:id is the handbook 3-stage flow when the shared multi-stage record exists (demo 'pbi-energy');
 * otherwise the single-stage screens (/add, /confirm, /submitted, /reflect, /done) are used.
 */

const FOCUS = {
  s1self: { title: 'Your teacher has assessed your Stage 1 plan', sub: 'Your Stage 1 self-reflection is now open.' },
  s2: { title: 'Stage 2 is open', sub: 'Collect at least 10 responses and write your draft summary.' },
  s2self: { title: 'Your teacher has assessed Stage 2', sub: 'Your Stage 2 self-reflection is now open.' },
  peer: { title: 'You’ve been paired for peer review', sub: 'Review your partner’s draft.' },
  revise: { title: 'Your partner has reviewed your draft', sub: 'Read their note and revise your summary.' },
}

registerStudentStep('C', (a, learnerId) => {
  if (!isMultiPbi(a, learnerId)) return null
  const p = progressOf(a, learnerId)
  const base = `/s/pbi/${a.id}`
  if (p.postDone) return { next: 'All steps done', due: null, path: `${base}/completed` }
  const due = dueShort(dueFor(a, p.focus))
  if (!p.primary) return { next: p.waiting === 'peer' ? 'Waiting for your partner to review your draft' : WAIT_TEXT[p.waiting], due, path: base }
  const focus = unlockEvent(a, p.primary, learnerId) && FOCUS[p.primary]
  return { next: TASK_TITLE[p.primary], due, path: `${base}/${TASK_PATH[p.primary]}`, focus: focus ? { ...focus, vars: {} } : undefined }
})

export default [
  { path: '/s/survey/:id', element: <SurveyStart /> },
  { path: '/s/survey/:id/q/:n', element: <SurveyQuestion /> },
  { path: '/s/survey/:id/submitted', element: <SurveySubmitted /> },
  { path: '/s/pbi/:id', element: <PbiEntry /> },
  // single-stage (no multi-stage record)
  { path: '/s/pbi/:id/add', element: <PbiAdd /> },
  { path: '/s/pbi/:id/confirm', element: <PbiConfirm /> },
  { path: '/s/pbi/:id/submitted', element: <PbiSubmitted /> },
  { path: '/s/pbi/:id/reflect', element: <PbiReflect /> },
  { path: '/s/pbi/:id/done', element: <PbiDone /> },
  // handbook 3-stage flow
  { path: '/s/pbi/:id/plan', element: <PbiPlan /> },
  { path: '/s/pbi/:id/plan/check', element: <PbiPlanCheck /> },
  { path: '/s/pbi/:id/reflect/:stage', element: <PbiSelfReflect /> },
  { path: '/s/pbi/:id/s2/check', element: <PbiS2Check /> },
  { path: '/s/pbi/:id/s2/:step', element: <PbiS2 /> },
  { path: '/s/pbi/:id/peer', element: <PbiPeer /> },
  { path: '/s/pbi/:id/revise', element: <PbiRevise /> },
  { path: '/s/pbi/:id/post', element: <PbiPost /> },
  { path: '/s/pbi/:id/sent/:kind', element: <PbiSent /> },
  { path: '/s/pbi/:id/completed', element: <PbiStagesCompleted /> },
]

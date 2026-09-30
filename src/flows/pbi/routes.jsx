import { lazy } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { registerTeacherActions } from '../../hpc/registry.js'
import { stageCounts, paramsComplete, isOpen, classWords } from './store.js'

// Screens are code-split: this micro-frontend's screens download on first visit
const SetupDetails = lazy(() => import('./Setup.jsx').then((m) => ({ default: m.SetupDetails })))
const SetupTopics = lazy(() => import('./Setup.jsx').then((m) => ({ default: m.SetupTopics })))
const SetupParams = lazy(() => import('./Setup.jsx').then((m) => ({ default: m.SetupParams })))
const EditParams = lazy(() => import('./Setup.jsx').then((m) => ({ default: m.EditParams })))
const PbiMakeLive = lazy(() => import('./Setup.jsx').then((m) => ({ default: m.PbiMakeLive })))
const PbiLiveSuccess = lazy(() => import('./Setup.jsx').then((m) => ({ default: m.PbiLiveSuccess })))
const PbiClassLive = lazy(() => import('./Hub.jsx').then((m) => ({ default: m.PbiClassLive })))
const PbiProgress = lazy(() => import('./Hub.jsx').then((m) => ({ default: m.PbiProgress })))
const PbiSubmission = lazy(() => import('./Submission.jsx').then((m) => ({ default: m.PbiSubmission })))
const PbiAssess = lazy(() => import('./Assess.jsx').then((m) => ({ default: m.PbiAssess })))
const PbiEvaluated = lazy(() => import('./Assess.jsx').then((m) => ({ default: m.PbiEvaluated })))
const PbiPairs = lazy(() => import('./Pairs.jsx').then((m) => ({ default: m.PbiPairs })))
const PbiOverview = lazy(() => import('./Overview.jsx').then((m) => ({ default: m.PbiOverview })))

/* Home "next steps" for Part C (English keys + vars; the home screen translates them). */
registerTeacherActions('C', (a) => {
  if (!a || a.status !== 'live') return []
  const cls = classWords(a.classId)
  const base = `/pbi/${a.classId}`
  const out = []
  ;['S1', 'S2', 'S3'].forEach((s, i) => {
    if (!isOpen(a, s)) return
    const c = stageCounts(a, s)
    if (!paramsComplete(a.params, s)) {
      out.push({ title: 'Choose Stage {n} parameters for {cls}', sub: 'Pick 2 extra parameters per ability', vars: { n: i + 1, cls }, path: `${base}/params/${s}` })
    }
    if (c.waiting > 0) {
      out.push({
        title: 'Assess Stage {n} for {cls}',
        sub: { S1: '{count} plans waiting', S2: '{count} summaries waiting', S3: '{count} revised drafts waiting' }[s],
        vars: { n: i + 1, cls, count: c.waiting }, count: c.waiting, path: `${base}/progress?stage=${s}&filter=submitted`,
      })
    }
  })
  if (a.currentStage === 'S2' && !Object.keys(a.pairs ?? {}).length) {
    out.push({ title: 'Pair learners for Stage 3', sub: 'Peer review works best across different topics', vars: { cls }, path: `${base}/pairs` })
  }
  if (isOpen(a, 'S3')) {
    const ov = stageCounts(a, 'overview')
    const ready = ov.submitted - ov.assessed
    if (ready > 0) out.push({ title: 'Complete the Overview', sub: '{count} learners ready for final levels', vars: { cls, count: ready }, count: ready, path: `${base}/progress?stage=overview` })
  }
  return out
})

function Legacy({ to }) {
  const { classId, studentId } = useParams()
  return <Navigate replace to={to.replace(':classId', classId).replace(':studentId', studentId ?? '')} />
}

export default [
  // Setup (handbook Page 1 · kit T06-01…T06-03, T04-10)
  { path: '/pbi/:classId', element: <SetupDetails /> },
  { path: '/pbi/:classId/setup/topics', element: <SetupTopics /> },
  { path: '/pbi/:classId/setup/params', element: <SetupParams /> },
  { path: '/pbi/:classId/live', element: <PbiMakeLive /> },
  { path: '/pbi/:classId/success', element: <PbiLiveSuccess /> },
  { path: '/pbi/:classId/params/:stage', element: <EditParams /> },
  // Class overview + progress hub (kit T09-01…T09-03)
  { path: '/pbi/:classId/class', element: <PbiClassLive /> },
  { path: '/pbi/:classId/progress', element: <PbiProgress /> },
  // Submissions, assessment, read-only (kit T09-04…T09-13)
  { path: '/pbi/:classId/response/:stage/:studentId', element: <PbiSubmission /> },
  { path: '/pbi/:classId/assess/:stage/:studentId', element: <PbiAssess /> },
  { path: '/pbi/:classId/evaluated/:stage/:studentId', element: <PbiEvaluated /> },
  // Stage 3 pairing, Overview (Pages 9–10)
  { path: '/pbi/:classId/pairs', element: <PbiPairs /> },
  { path: '/pbi/:classId/overview/:studentId', element: <PbiOverview /> },
  // Old links
  { path: '/pbi/:classId/submissions', element: <Legacy to="/pbi/:classId/progress" /> },
  { path: '/pbi/:classId/response/:studentId', element: <Legacy to="/pbi/:classId/response/S1/:studentId" /> },
  { path: '/pbi/:classId/evaluate/:studentId', element: <Legacy to="/pbi/:classId/assess/S1/:studentId" /> },
]

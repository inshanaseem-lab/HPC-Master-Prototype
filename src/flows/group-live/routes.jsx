import { lazy } from 'react'
import { registerTeacherActions } from '../../hpc/registry.js'
import { teacherActions } from './lib.js'

// Screens are code-split: this micro-frontend's screens download on first visit
const Progress = lazy(() => import('./Progress.jsx'))
const RecordSubmission = lazy(() => import('./RecordSubmission.jsx'))
const GroupOutput = lazy(() => import('./GroupOutput.jsx'))
const TickAssess = lazy(() => import('./TickAssess.jsx'))
const LevelAssess = lazy(() => import('./LevelAssess.jsx'))
const Rubric = lazy(() => import('./Rubric.jsx'))
const Overview = lazy(() => import('./Overview.jsx'))
const PostProject = lazy(() => import('./PostProject.jsx'))

// Teacher Today's Focus items for Part B (English keys + `vars`; the home screen translates them)
registerTeacherActions('B', teacherActions)

const P = '/group-project/:classId/progress'
// Handbook Part B · pages 3–8 (kit T10 record/evaluate, T09 evaluation pattern)
export default [
  { path: P, element: <Progress /> },
  { path: `${P}/:stage/record/:groupId`, element: <RecordSubmission /> },
  { path: `${P}/:stage/group/:groupId`, element: <GroupOutput /> },
  { path: `${P}/s1/:learnerId`, element: <TickAssess stage="S1" /> },
  { path: `${P}/s2/:learnerId`, element: <TickAssess stage="S2" /> },
  { path: `${P}/s3/rubric`, element: <Rubric /> },
  { path: `${P}/s3/:learnerId`, element: <LevelAssess /> },
  { path: `${P}/overview/:learnerId`, element: <Overview /> },
  { path: `${P}/post/:learnerId`, element: <PostProject /> },
]

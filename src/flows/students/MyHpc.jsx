import StudentReport from './StudentReport.jsx'
import { ROSTER, STUDENT_ID } from '../../hpc/store.js'
import { useT } from '../../i18n/index.js'

// Riya Thakur's HPC record (Student ID 123451000) in the teacher-side report
const RIYA_ID = ROSTER.find((r) => r.id === STUDENT_ID)?.studentId ?? '123451000'

/** 2.1 My Live HPC (student app, /s/hpc) — the Live HPC report, read-only. Owned here because this MFE owns the report. */
export default function Hpc() {
  const t = useT()
  return <StudentReport studentId={RIYA_ID} title={t('My Live HPC')} readOnly />
}

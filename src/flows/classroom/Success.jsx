import { useNavigate, useParams } from 'react-router-dom'
import { Screen, PrimaryButton, BottomActions } from '../../components/ui.jsx'
import { useT } from '../../i18n/index.js'
import { Header, SuccessBody, classLabel, useDates } from './parts.jsx'
import { INTERACTION_TYPES } from './data.js'
import { useClassroom } from './store.js'

/** Figma 278:27495 — activity is live. */
export function LiveSuccess() {
  const navigate = useNavigate()
  const t = useT()
  const { long } = useDates()
  const { classId, cls, ci } = useClassroom()
  const type = INTERACTION_TYPES.find((t) => t.id === ci.typeId)
  return (
    <Screen statusBar="light"
      bg="plain"
      header={<Header title={t('Classroom Interaction')} subtitle={classLabel(cls, t)} step="3 / 3" onBack={() => navigate('/home')} />}
      footer={
        <BottomActions>
          <PrimaryButton className="font-bold" onClick={() => navigate('/home')}>{t('Back to Home')}</PrimaryButton>
        </BottomActions>
      }
    >
      <SuccessBody
        title={t('Activity is now live!')}
        lines={[
          t('{type} is now live for Grade {classId}. Students will see it in their app.', { type: t(type ? type.name : 'Classroom interaction'), classId }),
          t('Deadline is set to be {date}', { date: long(ci.deadline) }),
        ]}
      />
    </Screen>
  )
}

/** Figma 346:8108 — evaluation submitted. */
export function EvaluationSuccess() {
  const navigate = useNavigate()
  const t = useT()
  const { classId } = useParams()
  // Return to the original Responses entry (responses → evaluate → [feedback replaced by this])
  const back = () =>
    (window.history.state?.idx ?? 0) >= 2 ? navigate(-2) : navigate(`/classroom/${classId}/responses`, { replace: true })
  return (
    <Screen statusBar="light"
      bg="plain"
      header={<Header title={t('Student Evaluation')} onBack={back} />}
      footer={
        <BottomActions>
          <PrimaryButton className="font-bold" onClick={back}>{t('Back to Responses')}</PrimaryButton>
        </BottomActions>
      }
    >
      <SuccessBody title={t('Evaluation Submitted')} lines={[t('Student Evaluation has been submitted for classroom interaction.')]} />
    </Screen>
  )
}

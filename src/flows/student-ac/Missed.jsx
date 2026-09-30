import { useNavigate } from 'react-router-dom'
import { PrimaryButton, Screen } from '../../components/ui.jsx'
import { useT } from '../../i18n/index.js'
import { SECTIONS } from '../../student/data.js'
import { surveyQuestions } from './data.js'
import { ActivityHead, Alert, AppBar, Badge, DeadlineCard, Footer, SectionLabel, StepRow } from './parts.jsx'

/** 9.1 · Activity missed — Section A surveys and Section C work the student didn't submit by the deadline. */
export default function Missed({ activity: a }) {
  const t = useT()
  const navigate = useNavigate()
  const isSurvey = a.section === 'A'
  const n = isSurvey ? surveyQuestions(a.id).length : 0

  return (
    <Screen
      bg="plain"
      statusBar="light"
      header={<AppBar title={t(SECTIONS[a.section].name)} />}
      footer={
        <Footer>
          <PrimaryButton onClick={() => navigate('/s/activities?tab=completed')}>{t('Back to My Activities')}</PrimaryButton>
        </Footer>
      }
    >
      <div className="stagger flex flex-col gap-5 px-4 pb-8 pt-4">
        <ActivityHead
          letter={a.section}
          title={isSurvey ? `${a.code} · ${t(a.title)}` : t(a.title)}
          subtitle={
            isSurvey
              ? t('{n} questions · about {m} min', { n, m: a.minutes ?? 10 })
              : a.individual
                ? t('Individual · Teacher: {name}', { name: a.teacher })
                : a.teacher && t('Teacher: {name}', { name: a.teacher })
          }
        />
        {a.deadline && <DeadlineCard deadline={a.deadline} missed />}
        <Alert>{t('You missed the deadline for this activity. Submission is closed.')}</Alert>
        {!isSurvey && (
          <div className="flex flex-col gap-2">
            <SectionLabel>{t('Your steps')}</SectionLabel>
            <StepRow n={1} status="closed" title={t('Submission')} desc={t('Not submitted')} action={<Badge tone="error">{t('Closed')}</Badge>} />
            <StepRow n={2} status="closed" title={t('Self-reflection')} desc={t('Not available')} action={<Badge tone="error">{t('Closed')}</Badge>} />
          </div>
        )}
      </div>
    </Screen>
  )
}

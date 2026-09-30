import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BottomActions, PrimaryButton, Screen } from '../../components/ui.jsx'
import { useT } from '../../i18n/index.js'
import { MAX_GROUP, MIN_GROUP } from './data.js'
import { GPHeader, SectionLabel, StepButton, useClassInfo } from './parts.jsx'
import { useGroupSetup } from './store.js'

/** Group Creation Screen01 · rules + students per group (263:21877) */
export default function GroupRules() {
  const navigate = useNavigate()
  const t = useT()
  const { classId, cls } = useClassInfo()
  const [setup, update] = useGroupSetup(classId)
  const [size, setSize] = useState(setup.groupSize || 5)
  const max = Math.min(MAX_GROUP, cls.students)
  const groupCount = Math.floor(cls.students / size) || 1
  // Sentence with the bold group count spliced in, so word order can differ in Hindi
  const [aboutBefore, aboutAfter = ''] = t(
    'About {groups} for {n} students. You can change the number of students in a group as needed while creating groups.',
    { groups: '\u0000', n: cls.students },
  ).split('\u0000')

  const onContinue = () => {
    update({ groupSize: size })
    navigate(`/group-project/${classId}/groups/manage`)
  }

  return (
    <Screen
      bg="plain"
      statusBar="light"
      header={<GPHeader step="2 / 3" />}
      footer={
        <BottomActions className="border-t border-line bg-surface">
          <PrimaryButton className="font-bold" onClick={onContinue}>
            {t('Continue')}
          </PrimaryButton>
        </BottomActions>
      }
    >
      <div className="stagger flex flex-col gap-4 p-4">
        <h2 className="text-[1.5rem] font-semibold leading-[1.875rem] text-ink">{t('Create Groups')}</h2>

        <div className="flex flex-col gap-4 rounded-[18px] border border-line bg-white p-4">
          <SectionLabel>{t('Group formation rules')}</SectionLabel>
          <ul className="flex flex-col gap-4">
            <li className="text-[1rem] font-medium leading-6 text-ink">{t('Minimum {n} students in a group', { n: MIN_GROUP })}</li>
            <li className="text-[1rem] font-medium leading-6 text-ink">{t('Each student can belong to only one group')}</li>
            <li className="text-[1rem] font-medium leading-6 text-ink">{t('The last group takes any students left over')}</li>
          </ul>
        </div>

        <div className="flex flex-col gap-4 rounded-[18px] border border-line bg-white p-4">
          <div>
            <SectionLabel>{t('Select No. of Students per Group')}</SectionLabel>
            <p className="pt-1 text-[0.8125rem] leading-[1.1875rem] text-ink-muted">
              {t('Minimum stays at {n}. Set the upper limit that suits your class.', { n: MIN_GROUP })}
            </p>
          </div>
          <div className="flex items-center justify-between gap-3">
            <StepButton label={t('Decrease students per group')} disabled={size <= MIN_GROUP} onClick={() => setSize((s) => Math.max(MIN_GROUP, s - 1))}>−</StepButton>
            <div className="flex min-w-0 flex-1 flex-col items-center">
              <p key={size} aria-live="polite" className="animate-check-pop text-[1.5rem] font-semibold leading-6 text-ink">{size}</p>
              <p className="pt-1 text-center text-[0.8125rem] leading-[1.1875rem] text-ink-muted">{t('students per group')}</p>
            </div>
            <StepButton label={t('Increase students per group')} disabled={size >= max} onClick={() => setSize((s) => Math.min(max, s + 1))}>+</StepButton>
          </div>
          <p className="text-center text-[0.8125rem] leading-[1.1875rem] text-ink-muted">
            {aboutBefore}
            <span className="font-semibold text-ink-2">{groupCount === 1 ? t('1 group') : t('{n} groups', { n: groupCount })}</span>
            {aboutAfter}
          </p>
        </div>

      </div>
    </Screen>
  )
}

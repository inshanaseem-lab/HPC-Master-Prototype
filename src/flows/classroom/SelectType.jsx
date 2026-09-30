import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Screen, PrimaryButton, BottomActions, cx } from '../../components/ui.jsx'
import { useT } from '../../i18n/index.js'
import { Header, SectionLabel } from './parts.jsx'
import { INTERACTION_TYPES } from './data.js'
import { useClassroom, updateClass } from './store.js'

/** Figma 263:26881 (nothing selected) / 263:26960 (selected). */
export default function SelectType() {
  const navigate = useNavigate()
  const t = useT()
  const { classId, ci } = useClassroom()
  const [selected, setSelected] = useState(ci.typeId)

  const onContinue = () => {
    updateClass(classId, { typeId: selected })
    navigate(`/classroom/${classId}/setup`)
  }

  return (
    <Screen statusBar="light"
      bg="plain"
      header={<Header title={t('Classroom Interaction · {classId}', { classId })} step="1 / 3" />}
      footer={
        <BottomActions className="border-t border-line bg-white">
          <PrimaryButton disabled={!selected} onClick={onContinue}>{t('Continue')}</PrimaryButton>
        </BottomActions>
      }
    >
      <div className="flex flex-col gap-4 p-4">
        <div>
          <h1 className="text-[1.5rem] font-semibold leading-[1.875rem] text-ink">{t('Choose the kind of classroom interaction you will run')}</h1>
          <p className="pt-1 text-[0.8125rem] leading-[1.1875rem] text-ink-muted">{t('Each one is evaluated with its own rubric statements.')}</p>
        </div>
        <SectionLabel>{t('Interaction types')}</SectionLabel>
        <div className="stagger flex flex-col gap-3" role="radiogroup" aria-label={t('Interaction types')}>
          {INTERACTION_TYPES.map((it) => {
            const on = selected === it.id
            return (
              <button
                key={it.id}
                role="radio"
                aria-checked={on}
                onClick={() => setSelected(it.id)}
                className={cx(
                  'tap-soft w-full rounded-[10px] border p-4 text-left transition-colors duration-200',
                  on ? 'border-brand-600 bg-[#fffaf5]' : 'border-line bg-white hover:border-cream-border hover:bg-[#fffdfb]',
                )}
              >
                <p className="text-[0.9375rem] font-bold leading-[1.375rem] text-ink">{t(it.name)}</p>
                <p className="pt-1 text-[0.8125rem] leading-[1.1875rem] text-ink-muted">{t(it.meta)}</p>
              </button>
            )
          })}
        </div>
        <p className="text-[0.8125rem] leading-[1.1875rem] text-ink-muted">{t('List and rubrics configured by the state. Nothing is selected for you.')}</p>
      </div>
    </Screen>
  )
}

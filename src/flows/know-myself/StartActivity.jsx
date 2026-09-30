import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { BottomActions, OutlineButton, PrimaryButton, Screen, Sheet, cx } from '../../components/ui.jsx'
import { useAppStore } from '../../store/AppStore.jsx'
import arrowLeft from '../../assets/know-myself/arrow-left.svg'
import chevronRight from '../../assets/know-myself/chevron-right.svg'
import chevronRightOrange from '../../assets/know-myself/chevron-right-orange.svg'
import chevronDown from '../../assets/know-myself/chevron-down.svg'
import { useT } from '../../i18n/index.js'
import { ACTIVITY_TYPES, findClass } from './data.js'
import { KMAppBar } from './parts.jsx'

/* ------------------------------------------------ 263:17182 / 263:17250 */

export function SelectClass() {
  const navigate = useNavigate()
  const { classes } = useAppStore()
  const t = useT()
  const [selected, setSelected] = useState(null)

  return (
    <Screen
      bg="pattern"
      statusBar="light"
      header={
        <div className="relative flex min-h-16 shrink-0 items-center justify-center border-b border-[#e6ddd6] bg-white px-[3.5rem] py-2">
          <button
            aria-label={t('Back')}
            onClick={() => navigate(-1)}
            className="tap absolute left-2 top-1/2 grid size-[44px] -translate-y-1/2 place-items-center rounded-lg hover:bg-black/5"
          >
            <img alt="" width="24" height="24" src={arrowLeft} />
          </button>
          <p className="text-center text-[1.125rem] font-bold leading-6 text-[#211a17]">{t('Start a New Activity')}</p>
        </div>
      }
      footer={
        <BottomActions>
          <PrimaryButton disabled={!selected} onClick={() => navigate(`/activity/${selected}/type`)}>
            {t('Continue')}
          </PrimaryButton>
        </BottomActions>
      }
    >
      <div className="flex flex-col gap-3 p-4">
        <div>
          <h1 className="text-[1.5rem] font-semibold leading-[1.875rem] text-ink">{t('Select the class')}</h1>
          <p className="pt-1 text-[0.8125rem] leading-[1.1875rem] text-ink-muted">{t('Please select the class to begin the activity')}</p>
        </div>

        {classes.length === 0 ? (
          <div className="animate-fade-up flex flex-col items-center gap-3 rounded-xl border border-[#e5e6e1] bg-white p-6 text-center">
            <p className="text-[0.9375rem] font-semibold text-ink">{t('No classes added yet')}</p>
            <p className="text-[0.8125rem] leading-[1.1875rem] text-ink-muted">{t('Add a class to your workspace to start an activity.')}</p>
            <OutlineButton onClick={() => navigate('/classes/manage')}>{t('Add classes')}</OutlineButton>
          </div>
        ) : (
          <div className="stagger flex flex-col gap-3" role="radiogroup">
            {classes.map((c) => {
              const active = selected === c.id
              return (
                <button
                  key={c.id}
                  role="radio"
                  aria-checked={active}
                  onClick={() => setSelected(c.id)}
                  className={cx(
                    'tap-soft flex w-full items-center gap-2 rounded-xl border p-3 text-left transition-colors duration-200',
                    active ? 'border-brand bg-[#fffaf5]' : 'border-[#e5e6e1] bg-white hover:bg-[#fffdfb]',
                  )}
                >
                  <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2.5">
                    <div
                      className={cx(
                        'grid min-h-[3.375rem] min-w-[min(3.375rem,100%)] shrink-0 place-items-center rounded-xl border bg-[#fffaf5] px-1.5 transition-colors',
                        active ? 'border-transparent' : 'border-[#e1e1e1]',
                      )}
                    >
                      <p className="whitespace-nowrap text-[0.875rem] font-semibold leading-5 text-[#b54a45]">
                        {c.grade} {c.section}
                      </p>
                    </div>
                    <div className="min-w-[min(9rem,100%)] flex-1 leading-5">
                      <p className="break-words text-[0.875rem] font-semibold text-[#20231f]">
                        {c.stream ? t('Class {grade} {section} - {stream}', { grade: c.grade, section: c.section, stream: t(c.stream) }) : t('Class {grade} {section}', { grade: c.grade, section: c.section })}
                      </p>
                      <p className="pt-0.5 text-[0.8125rem] text-[#6d726b]">{t('{n} students', { n: c.students })}</p>
                    </div>
                  </div>
                  <img
                    alt=""
                    width="20"
                    height="20"
                    src={active ? chevronRightOrange : chevronRight}
                    className={cx('shrink-0 transition-transform duration-200', active && 'translate-x-0.5')}
                  />
                </button>
              )
            })}
          </div>
        )}
      </div>
    </Screen>
  )
}

/* ------------------------------------------------ 263:17318 / 263:20670 */

export function ActivityType() {
  const navigate = useNavigate()
  const { classId } = useParams()
  const { classes } = useAppStore()
  const t = useT()
  const cls = findClass(classes, classId)
  const [selected, setSelected] = useState(null)
  const [switcher, setSwitcher] = useState(false)
  const type = ACTIVITY_TYPES.find((a) => a.id === selected)

  return (
    <Screen
      bg="plain"
      statusBar="light"
      header={
        <KMAppBar
          title={t('Start activity')}
          right={
            <button
              onClick={() => setSwitcher(true)}
              aria-haspopup="dialog"
              className="tap flex min-h-11 shrink-0 items-center gap-2 rounded-full border border-line bg-white py-1.5 pl-3.5 pr-3 hover:bg-surface"
            >
              <span className="text-[0.9375rem] font-bold leading-[1.375rem] text-ink">
                {t('Grade {grade}', { grade: `${cls.grade}${cls.section}` })}
              </span>
              <img alt="" width="14" height="14" src={chevronDown} />
            </button>
          }
        />
      }
      footer={
        <BottomActions>
          <PrimaryButton disabled={!type} onClick={() => navigate(type.route(classId))}>
            {t('Continue')}
          </PrimaryButton>
        </BottomActions>
      }
    >
      <div className="flex flex-col gap-5 p-4">
        <div>
          <h1 className="text-[1.5rem] font-semibold leading-[1.875rem] text-ink">
            {t('Start activity for grade {grade} {section}', { grade: cls.grade, section: cls.section })}
          </h1>
          <p className="pt-1 text-[0.8125rem] leading-[1.1875rem] text-ink-muted">{t("Choose the type of activity you'd like to create.")}</p>
        </div>
        <div className="stagger flex flex-col gap-3" role="radiogroup">
          {ACTIVITY_TYPES.map((a) => {
            const active = selected === a.id
            return (
              <button
                key={a.id}
                role="radio"
                aria-checked={active}
                onClick={() => setSelected(a.id)}
                className={cx(
                  'tap-soft w-full rounded-[10px] border p-4 text-left transition-colors duration-200',
                  active ? 'border-brand bg-[#fffaf5]' : 'border-line bg-white hover:bg-[#fffdfb]',
                )}
              >
                <p className="text-[0.9375rem] font-bold leading-[1.375rem] text-ink">{t(a.title)}</p>
                <p className="pt-1 text-[0.8125rem] leading-[1.1875rem] text-ink-muted">{t(a.desc)}</p>
              </button>
            )
          })}
        </div>
        <p className="text-[0.8125rem] leading-[1.1875rem] text-ink-muted">{t('Note : You can add details in the next step.')}</p>
      </div>

      <Sheet open={switcher} onClose={() => setSwitcher(false)}>
        <div className="p-4 pb-6">
          <h2 className="pb-3 text-[1rem] font-semibold text-ink">{t('Switch class')}</h2>
          <div className="stagger flex flex-col gap-2">
            {classes.map((c) => (
              <button
                key={c.id}
                onClick={() => {
                  setSwitcher(false)
                  if (c.id !== classId) navigate(`/activity/${c.id}/type`, { replace: true })
                }}
                className={cx(
                  'tap-soft flex min-h-12 flex-wrap items-center justify-between gap-x-3 gap-y-1 rounded-xl border px-4 py-3 text-left transition-colors',
                  c.id === classId ? 'border-brand bg-[#fffaf5]' : 'border-line hover:bg-surface',
                )}
              >
                <span className="text-[0.9375rem] font-semibold text-ink">
                  {t('Grade {grade}', { grade: `${c.grade}${c.section}` })}
                </span>
                <span className="text-[0.8125rem] text-ink-muted">{t('{n} students', { n: c.students })}</span>
              </button>
            ))}
          </div>
        </div>
      </Sheet>
    </Screen>
  )
}

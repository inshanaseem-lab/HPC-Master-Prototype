import { useId, useRef, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { Screen, PrimaryButton, BottomActions, cx } from '../../components/ui.jsx'
import { useT } from '../../i18n/index.js'
import { Header, SectionLabel, classLabel, useDates } from './parts.jsx'
import { useClassroom, updateClass } from './store.js'
import calendarIcon from '../../assets/classroom/calendar.svg'

function DateField({ label, value, onChange, hint, error, min }) {
  const ref = useRef(null)
  const id = useId()
  const t = useT()
  const { long } = useDates()
  const open = () => {
    const el = ref.current
    if (!el) return
    try { el.showPicker ? el.showPicker() : el.focus() } catch { el.focus() }
  }
  return (
    <div className="flex flex-col gap-2">
      <SectionLabel id={`${id}-label`}>{label}</SectionLabel>
      <div className="relative">
        <button
          type="button"
          onClick={open}
          aria-labelledby={`${id}-label ${id}-value`}
          aria-describedby={`${id}-note`}
          aria-invalid={error ? true : undefined}
          className={cx(
            'tap-soft flex min-h-12 w-full items-center justify-between gap-3 rounded-lg border bg-white p-3.5 text-left transition-colors duration-200 hover:border-cream-border',
            error ? 'animate-shake border-[#b54a45]' : 'border-line',
          )}
        >
          <span id={`${id}-value`} className={cx('text-[1rem] font-medium leading-6', value ? 'text-ink' : 'text-ink-muted')}>{value ? long(value) : t('Select a date')}</span>
          <img alt="" width="18" height="18" src={calendarIcon} className="shrink-0" />
        </button>
        <input
          ref={ref}
          type="date"
          value={value}
          min={min}
          onChange={(e) => onChange(e.target.value)}
          tabIndex={-1}
          aria-label={label}
          className="pointer-events-none absolute inset-0 opacity-0"
        />
      </div>
      {error ? <p id={`${id}-note`} role="alert" className="text-[0.8125rem] leading-[1.1875rem] text-[#b54a45]">{error}</p> : hint && <p id={`${id}-note`} className="text-[0.8125rem] leading-[1.1875rem] text-ink-muted">{hint}</p>}
    </div>
  )
}

/** Figma 350:1340 — set dates and make the interaction live. */
export default function MakeLive() {
  const navigate = useNavigate()
  const t = useT()
  const { long } = useDates()
  const { classId, cls, ci } = useClassroom()
  const [deadline, setDeadline] = useState(ci.deadline)
  const [activityDate, setActivityDate] = useState(ci.activityDate)
  const [loading, setLoading] = useState(false)

  if (!ci.typeId) return <Navigate to={`/classroom/${classId}`} replace />

  const orderError = deadline && activityDate && activityDate < deadline ? t('Activity date must be on or after the preparation deadline.') : null
  const valid = deadline && activityDate && !orderError

  const checks = [
    { label: t('Survey reviewed'), ok: true },
    { label: t('Discussion held with learners'), ok: true },
    ...(ci.grouped ? [{ label: t('{n} groups created', { n: ci.groups.length || 2 }), ok: ci.groups.length > 0 }] : [{ label: t('Students work individually'), ok: true }]),
    { label: deadline ? t('Deadline {date}', { date: long(deadline) }) : t('Deadline not set'), ok: !!deadline },
  ]

  const submit = () => {
    if (!valid) return
    setLoading(true)
    setTimeout(() => {
      updateClass(classId, { deadline, activityDate, live: true })
      navigate(`/classroom/${classId}/live/success`, { replace: true })
    }, 600)
  }

  return (
    <Screen statusBar="light"
      bg="plain"
      header={<Header title={t('Classroom Interaction')} subtitle={classLabel(cls, t)} step="3 / 3" />}
      footer={
        <BottomActions>
          <PrimaryButton className="font-bold" disabled={!valid} loading={loading} onClick={submit}>{t('Make Project live')}</PrimaryButton>
        </BottomActions>
      }
    >
      <div className="flex flex-col gap-5 p-4">
        <div>
          <h1 className="text-[1.5rem] font-semibold leading-[1.875rem] text-ink">{t('Make Classroom Interaction live for {classId}', { classId })}</h1>
          <p className="pt-1 text-[0.8125rem] leading-[1.1875rem] text-ink-muted">{t('{n} students will get this in their to-do list straight away.', { n: cls.students ?? 40 })}</p>
        </div>

        <div className="flex flex-col gap-3">
          <DateField
            label={t('Preparation deadline')}
            value={deadline}
            onChange={setDeadline}
            hint={t('Deadline for students to prepare for discussion with teacher.')}
          />
          <DateField
            label={t('Classroom activity date')}
            value={activityDate}
            min={deadline}
            onChange={setActivityDate}
            error={orderError}
            hint={t('Planned date for activity to be held in class')}
          />
        </div>

        <div className="rounded-[10px] border border-line bg-[#faf8f6] p-4">
          <SectionLabel>{t('Check before you confirm')}</SectionLabel>
          <div className="stagger flex flex-col gap-2 pt-2">
            {checks.map((c) => (
              <div key={c.label} className="flex items-start gap-3 py-1.5">
                <span
                  className={cx(
                    'mt-px grid size-5 shrink-0 place-items-center rounded-full text-[0.6875rem] leading-none text-white transition-colors duration-200',
                    c.ok ? 'animate-check-pop bg-[#1b6b34]' : 'bg-[#d6d3cf]',
                  )}
                >
                  {c.ok ? '✓' : '!'}
                </span>
                <p className="text-[0.8125rem] leading-[1.1875rem] text-ink-2">{c.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Screen>
  )
}

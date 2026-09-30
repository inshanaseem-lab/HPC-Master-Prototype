import { useId, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BottomActions, PrimaryButton, Screen, Sheet, cx } from '../../components/ui.jsx'
import { useAppStore } from '../../store/AppStore.jsx'
import calendarIcon from '../../assets/know-myself/calendar.svg'
import checkCircle from '../../assets/know-myself/check-circle.svg'
import { useT } from '../../i18n/index.js'
import { SURVEYS, setLive, todayIso } from './data.js'
import { KMAppBar, MetaCells, MaterialCard, SectionLabel, useKnowMyself, useLongDate } from './parts.jsx'

/* ------------------------------------------------ 263:19934 / 263:21544 */

export function KnowMyself() {
  const navigate = useNavigate()
  const t = useT()
  const { classId, classSubtitle } = useKnowMyself()
  const [selected, setSelected] = useState(null)

  return (
    <Screen
      bg="plain"
      statusBar="light"
      header={<KMAppBar heading title={t('Know Myself')} subtitle={classSubtitle} />}
      footer={
        <BottomActions>
          <PrimaryButton disabled={!selected} onClick={() => navigate(`/know-myself/${classId}/review?s=${selected}`)}>
            {t('Start Activity')}
          </PrimaryButton>
        </BottomActions>
      }
    >
      <div className="flex flex-col gap-4 p-4">
        <div>
          <SectionLabel>{t('Section A · Profile, Reflection & Planning')}</SectionLabel>
          <p className="pt-1 text-[0.8125rem] leading-[1.1875rem] text-ink-muted">{t('You guide each learner to fill these surveys one by one.')}</p>
        </div>
        <div className="stagger flex flex-col gap-2" role="radiogroup" aria-label={t('Section A · Profile, Reflection & Planning')}>
          {SURVEYS.map((s) => {
            const active = selected === s.id
            return (
              <button
                key={s.id}
                role="radio"
                aria-checked={active}
                aria-disabled={s.disabled}
                disabled={s.disabled}
                onClick={() => setSelected(s.id)}
                className={cx(
                  'w-full rounded-lg border p-4 text-left transition-colors duration-200',
                  s.disabled
                    ? 'cursor-not-allowed border-line bg-[#e0e0e0]'
                    : active
                      ? 'tap-soft border-brand bg-[#fffaf5]'
                      : 'tap-soft border-line bg-white hover:bg-[#fffdfb]',
                )}
              >
                <p className={cx('text-[0.9375rem] font-bold leading-[1.375rem]', s.disabled ? 'text-ink-muted' : 'text-ink')}>
                  {s.id} · {t(s.short ?? s.title)}
                </p>
              </button>
            )
          })}
        </div>
      </div>
    </Screen>
  )
}

/* ------------------------------------------------ Activity sample sheet */

export function SampleSheet({ open, onClose, survey }) {
  const t = useT()
  return (
    <Sheet open={open} onClose={onClose}>
      <div className="p-4 pb-8">
        <SectionLabel>{t('Activity sample · {id}', { id: survey.id })}</SectionLabel>
        <h2 className="pt-1 text-[1.125rem] font-semibold leading-6 text-ink">{t(survey.title)}</h2>
        <p className="pt-1 text-[0.8125rem] leading-[1.1875rem] text-ink-muted">{t('Learners will be asked questions like these.')}</p>
        <ol className="stagger mt-4 flex flex-col gap-3">
          {survey.sample.map((s, i) => (
            <li key={i} className="flex gap-3 rounded-[10px] border border-line bg-[#faf8f6] p-3">
              <span className="grid size-6 shrink-0 place-items-center rounded-full bg-ink text-[0.75rem] font-bold text-white">{i + 1}</span>
              <p className="pt-0.5 text-[0.875rem] leading-5 text-ink-2">{t(s.q)}</p>
            </li>
          ))}
        </ol>
      </div>
    </Sheet>
  )
}

/* ------------------------------------------------------------ 263:21329 */

export function Review() {
  const navigate = useNavigate()
  const { showToast } = useAppStore()
  const t = useT()
  const { classId, cls, survey, classSubtitle } = useKnowMyself()
  const [sample, setSample] = useState(false)
  const [downloading, setDownloading] = useState(false)

  const download = () => {
    setDownloading(true)
    setTimeout(() => {
      setDownloading(false)
      showToast(t('Discussion guide downloaded'))
    }, 600)
  }

  return (
    <Screen
      bg="plain"
      statusBar="light"
      header={<KMAppBar title={t(survey.title)} subtitle={classSubtitle} step="1 / 2" />}
      footer={
        <BottomActions className="flex flex-col gap-3 border-t border-line bg-white">
          <PrimaryButton className="font-bold" onClick={() => navigate(`/know-myself/${classId}/live?s=${survey.id}`)}>
            {t('Discussion held')}
          </PrimaryButton>
          <button
            onClick={() => {
              showToast(t('Saved. You can make it live later.'))
              navigate('/home')
            }}
            className="tap min-h-12 w-full rounded-lg border border-line bg-white px-6 text-[0.9375rem] font-bold leading-[1.375rem] text-ink-2 hover:bg-surface"
          >
            {t('I will do this later')}
          </button>
        </BottomActions>
      }
    >
      <div className="flex flex-col gap-4 p-4 pb-8">
        <div className="stagger flex flex-col gap-4">
          <h1 className="text-[1.5rem] font-semibold leading-[1.875rem] text-ink">{t(survey.title)}</h1>
          <div className="rounded-[10px] border border-line bg-[#faf8f6] p-4">
            <SectionLabel>{t('Why this matters')}</SectionLabel>
            <p className="pt-2 text-[1rem] font-medium leading-6 text-ink">{t(survey.why)}</p>
          </div>
          <MetaCells items={[[survey.id, t('Section')], [survey.questions, t('Questions')], [t(survey.competency), t('Competency')]]} />
        </div>

        <div className="flex flex-col gap-5">
          <div>
            <h2 className="text-[1rem] font-semibold leading-6 text-ink">{t('Before you make this live')}</h2>
            <p className="pt-1 text-[0.8125rem] leading-[1.1875rem] text-ink-muted">
              {t('Hold a short discussion with {cls} so students understand what the reflection is for.', { cls: `${cls.grade}${cls.section}` })}
            </p>
          </div>

          <div className="rounded-[10px] border border-line bg-[#faf8f6] p-4">
            <SectionLabel>{t('How to run it · 15 min')}</SectionLabel>
            <ol className="stagger flex flex-col gap-4 pt-3">
              {survey.steps.map((s, i) => (
                <li key={i} className="flex gap-3">
                  <span className="grid size-6 shrink-0 place-items-center rounded-full bg-ink text-[0.75rem] font-bold leading-4 tracking-[0.96px] text-white">
                    {i + 1}
                  </span>
                  <p className="flex-1 pt-0.5 text-[0.8125rem] leading-[1.1875rem] text-ink-2">{t(s)}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className="flex flex-col gap-2">
            <SectionLabel>{t('Materials')}</SectionLabel>
            <MaterialCard
              title={t('Discussion guide')}
              desc={t('PDF · 2 pages · supplied by the state admin')}
              action={downloading ? t('Downloading…') : t('Download')}
              onAction={download}
            />
            <MaterialCard
              title={t('Activity Sample')}
              desc={t('View the questions learner’s will be asked')}
              action={t('View')}
              onAction={() => setSample(true)}
            />
          </div>
        </div>
      </div>
      <SampleSheet open={sample} onClose={() => setSample(false)} survey={survey} />
    </Screen>
  )
}

/* ------------------------------------------------------------ 263:21438 */

export function MakeLive() {
  const navigate = useNavigate()
  const t = useT()
  const longDate = useLongDate()
  const { classId, cls, survey, classSubtitle } = useKnowMyself()
  const [deadline, setDeadline] = useState('')
  const [loading, setLoading] = useState(false)
  const inputRef = useRef(null)
  const fieldId = useId()

  const openPicker = () => {
    const el = inputRef.current
    if (!el) return
    try { el.showPicker() } catch { el.focus() }
  }

  const confirm = () => {
    setLoading(true)
    setTimeout(() => {
      setLive(classId, { surveyId: survey.id, deadline, startedAt: todayIso() })
      navigate(`/know-myself/${classId}/success?s=${survey.id}`, { replace: true })
    }, 700)
  }

  const checks = [
    [t('Survey reviewed'), true],
    [t('Discussion held with learners'), true],
    [deadline ? t('Deadline {date}', { date: longDate(deadline) }) : t('Deadline not set yet'), !!deadline],
  ]

  return (
    <Screen
      bg="plain"
      statusBar="light"
      header={<KMAppBar title={t(survey.title)} subtitle={classSubtitle} step="2/2" />}
      footer={
        <BottomActions>
          <PrimaryButton className="font-bold" disabled={!deadline} loading={loading} onClick={confirm}>
            {t('Make survey live')}
          </PrimaryButton>
        </BottomActions>
      }
    >
      <div className="stagger flex flex-col gap-5 p-4">
        <div>
          <h1 className="text-[1.5rem] font-semibold leading-[1.875rem] text-ink">
            {t('Make {title} live for {cls}', { title: t(survey.title), cls: `${cls.grade}${cls.section}` })}
          </h1>
          <p className="pt-1 text-[0.8125rem] leading-[1.1875rem] text-ink-muted">
            {t('{n} students will get this in their to-do list straight away.', { n: cls.students })}
          </p>
        </div>

        <div>
          <SectionLabel id={`${fieldId}-label`}>{t('Submission deadline · Required')}</SectionLabel>
          <div
            role="button"
            tabIndex={0}
            aria-labelledby={`${fieldId}-label ${fieldId}-value`}
            onClick={openPicker}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && openPicker()}
            className={cx(
              'tap-soft relative mt-2 flex min-h-12 cursor-pointer items-center justify-between gap-3 rounded-lg border bg-white p-3.5 transition-colors duration-200',
              deadline ? 'border-line' : 'border-line hover:border-brand/60',
            )}
          >
            <p id={`${fieldId}-value`} className={cx('text-[1rem] font-medium leading-6', deadline ? 'text-ink' : 'text-ink-muted')}>
              {deadline ? longDate(deadline) : t('Select a date')}
            </p>
            <img alt="" width="18" height="18" src={calendarIcon} />
            <input
              ref={inputRef}
              type="date"
              aria-label={t('Submission deadline')}
              min={todayIso()}
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="pointer-events-none absolute bottom-0 left-0 h-px w-full opacity-0"
              tabIndex={-1}
            />
          </div>
        </div>

        <div className="rounded-[10px] border border-line bg-[#faf8f6] p-4">
          <SectionLabel>{t('Check before you confirm')}</SectionLabel>
          <div className="flex flex-col gap-2 pt-2">
            {checks.map(([label, done], i) => (
              <div key={i} className="flex items-start gap-3 py-1.5">
                <span
                  key={String(done)}
                  className={cx(
                    'mt-px grid size-5 shrink-0 place-items-center rounded-full text-[0.6875rem] leading-[1.0312rem] text-white transition-colors duration-200',
                    done ? 'animate-check-pop bg-[#1b6b34]' : 'border border-[#c9c5c0] bg-white',
                  )}
                >
                  {done && '✓'}
                </span>
                <p className={cx('text-[0.8125rem] leading-[1.1875rem] transition-colors', done ? 'text-ink-2' : 'text-ink-muted')}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Screen>
  )
}

/* ------------------------------------------------------------ 263:21506 */

export function LiveSuccess() {
  const navigate = useNavigate()
  const t = useT()
  const longDate = useLongDate()
  const { classId, survey, live, gradeLabel, classSubtitle } = useKnowMyself()

  return (
    <Screen
      bg="plain"
      statusBar="light"
      header={
        <KMAppBar
          title={t(survey.title)}
          subtitle={classSubtitle}
          step="2/2"
          onBack={() => navigate('/home')}
        />
      }
      footer={
        <BottomActions>
          <PrimaryButton className="font-bold" onClick={() => navigate('/home')}>
            {t('Back to Home')}
          </PrimaryButton>
        </BottomActions>
      }
      bodyClassName="flex flex-col"
    >
      <div className="flex flex-1 flex-col items-center justify-center gap-3 p-4 text-center">
        <div className="animate-pop-in grid size-14 place-items-center rounded-full bg-[#eaf6ec]">
          <img alt="" width="28" height="28" src={checkCircle} />
        </div>
        <div className="stagger flex flex-col items-center gap-3">
          <h1 className="text-[1.375rem] font-semibold leading-7 text-ink">{t('Survey is now live!')}</h1>
          <div className="max-w-[22rem] text-[1rem] font-medium leading-6 text-ink-muted">
            <p>{t('{title} is live for {grade}. Students will see it in their app.', { title: t(survey.title), grade: gradeLabel })}</p>
            {live?.deadline && <p>{t('Deadline is set to be {date}', { date: longDate(live.deadline) })}</p>}
          </div>
          <button
            onClick={() => navigate(`/know-myself/${classId}/progress`)}
            className="tap mt-2 min-h-11 rounded-full px-4 py-2 text-[0.875rem] font-semibold text-brand-700 hover:bg-brand-50"
          >
            {t('Track progress')} <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    </Screen>
  )
}

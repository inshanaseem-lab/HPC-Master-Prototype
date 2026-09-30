import { useEffect, useState } from 'react'
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom'
import { OutlineButton, PrimaryButton, Screen, cx } from '../../components/ui.jsx'
import { useT } from '../../i18n/index.js'
import { useStudentState, updateActivity } from '../../student/store.js'
import { surveyQuestions, todayLabel } from './data.js'
import Missed from './Missed.jsx'
import {
  ActionSheet, ActivityHead, AppBar, DeadlineCard, Footer, InfoCard, OptionCard, PrevNext, ProgressBar, SuccessBody,
  shouldFailOnce, useGoBack,
} from './parts.jsx'

/**
 * In-progress answers, kept in memory only (never saved): leaving midway or
 * reloading loses them, exactly as the exit warning (4.3) says.
 */
const drafts = {}

function useSurvey() {
  const { id } = useParams()
  const { activities } = useStudentState()
  const a = activities.find((x) => x.id === id)
  return { id, a, questions: surveyQuestions(id) }
}

const surveyName = (a, t) => `${a.code} · ${t(a.title)}`

/* ------------------------------------------------------ 4.1 Survey start */

export function SurveyStart() {
  const t = useT()
  const navigate = useNavigate()
  const { search } = useLocation()
  const { id, a, questions } = useSurvey()

  useEffect(() => { delete drafts[id] }, [id])

  if (!a || a.section !== 'A') return <Navigate to="/s/home" replace />
  if (a.state === 'missed') return <Missed activity={a} />
  if (a.state === 'submitted') return <Navigate to={`/s/completed/${id}`} replace />

  return (
    <Screen
      bg="plain"
      statusBar="light"
      header={<AppBar title={t('Know Myself')} />}
      footer={
        <Footer>
          <PrimaryButton onClick={() => navigate(`/s/survey/${id}/q/1${search}`, { state: { depth: 1 } })}>
            {t('Start Survey')}
          </PrimaryButton>
        </Footer>
      }
    >
      <div className="stagger flex flex-col gap-5 px-4 pb-8 pt-4">
        <ActivityHead
          letter="A"
          title={surveyName(a, t)}
          subtitle={t('{n} questions · about {m} min', { n: questions.length, m: a.minutes ?? 10 })}
        />
        <DeadlineCard deadline={a.deadline} />
        {a.why && <InfoCard label={t('Why this matters')}>{t(a.why)}</InfoCard>}
        <InfoCard label={t('Before you start')}>
          {t('There are no right or wrong answers, and this survey is not marked. Finish it in one go: if you leave midway, your answers won’t be saved.')}
        </InfoCard>
      </div>
    </Screen>
  )
}

/* --------------------------------------- 4.2 Question (+ 4.3, 9.3, 11.2) */

const HINTS = { single: 'Choose one.', multi: 'Choose all that apply.', text: 'Write a short answer.' }
const MAX_TEXT = 300

export function SurveyQuestion() {
  const t = useT()
  const navigate = useNavigate()
  const goBack = useGoBack()
  const location = useLocation()
  const { search } = location
  const depth = location.state?.depth ?? 0
  const { n: nParam } = useParams()
  const { id, a, questions } = useSurvey()
  const n = Number(nParam)
  const idx = n - 1
  const q = questions[idx]
  const last = n === questions.length

  // Snapshot so the guards below don't fire while the 9.3 sheet updates the activity
  const [initialState] = useState(a?.state)
  const draft = (drafts[id] ??= { answers: [] })
  const [value, setValue] = useState(() => draft.answers[idx] ?? (q?.type === 'multi' ? [] : ''))
  const [sheet, setSheet] = useState(null) // 'exit' | 'deadline' | 'failed'
  const [loading, setLoading] = useState(false)
  const [shake, setShake] = useState(0)

  if (!a || a.section !== 'A') return <Navigate to="/s/home" replace />
  if (initialState === 'submitted') return <Navigate to={`/s/completed/${id}`} replace />
  if (initialState === 'missed') return <Navigate to={`/s/survey/${id}`} replace />
  if (!q) return <Navigate to={`/s/survey/${id}${search}`} replace />
  // Answers are lost on reload / deep link: start again from question 1
  if (idx > 0 && draft.answers.filter((x) => x != null).length < idx) return <Navigate to={`/s/survey/${id}${search}`} replace />

  const set = (v) => { setValue(v); draft.answers[idx] = v }
  const toggle = (opt) => set(value.includes(opt) ? value.filter((x) => x !== opt) : [...value, opt])

  const valid = q.type === 'multi' ? value.length > 0 : String(value).trim().length > 0

  const submit = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      if (new URLSearchParams(search).get('deadline') === 'passed') {
        delete drafts[id]
        updateActivity(id, { state: 'missed' })
        setSheet('deadline')
        return
      }
      if ((typeof navigator !== 'undefined' && navigator.onLine === false) || shouldFailOnce(search, 'submit', `survey:${id}`)) {
        setSheet('failed')
        return
      }
      const answers = questions.map((qq, i) => {
        const v = draft.answers[i]
        return { q: qq.q, a: Array.isArray(v) ? v.join(', ') : String(v ?? '').trim() }
      })
      delete drafts[id]
      updateActivity(id, { state: 'submitted', submittedOn: todayLabel(), answers })
      navigate(`/s/survey/${id}/submitted`, { replace: true })
    }, 650)
  }

  const next = () => {
    if (!valid) { setShake((s) => s + 1); return }
    if (last) submit()
    else navigate(`/s/survey/${id}/q/${n + 1}${search}`, { state: { depth: depth + 1 } })
  }
  const prev = () => {
    if (n <= 1) return
    if (depth > 1) navigate(-1)
    else navigate(`/s/survey/${id}/q/${n - 1}${search}`, { replace: true, state: { depth: 0 } })
  }
  const leave = () => {
    delete drafts[id]
    setSheet(null)
    // Back past the question screens and the start screen, to wherever the survey was opened from
    if (depth > 0) goBack('/s/activities', depth + 1)
    else navigate('/s/activities', { replace: true })
  }
  const toActivities = () => navigate('/s/activities?tab=completed', { replace: true })

  return (
    <Screen
      bg="plain"
      statusBar="light"
      header={
        <>
          <AppBar
            close
            title={surveyName(a, t)}
            right={t('Question {n} of {total}', { n, total: questions.length })}
            onBack={() => setSheet('exit')}
          />
          <ProgressBar value={n / questions.length} />
        </>
      }
      footer={
        <PrevNext
          onPrev={prev}
          prevDisabled={n <= 1}
          onNext={next}
          nextDisabled={!valid}
          nextLabel={last ? t('Submit') : t('Next')}
          loading={loading}
        />
      }
    >
      <div className="flex flex-col gap-5 px-4 pb-8 pt-4">
        <div className="animate-fade-up">
          <h1 className="text-[1.5rem] font-semibold leading-[1.875rem] text-ink">{t(q.q)}</h1>
          <p className="py-1 text-[0.8125rem] leading-[1.1875rem] text-ink-muted">{t(HINTS[q.type])}</p>
        </div>

        {q.type === 'text' ? (
          <div key={shake} className={cx('flex flex-col gap-1.5', shake > 0 && 'animate-shake')}>
            <textarea
              value={value}
              onChange={(e) => set(e.target.value.slice(0, MAX_TEXT))}
              placeholder={t(q.placeholder ?? 'Type your answer')}
              aria-label={t(q.q)}
              rows={5}
              className="min-h-[140px] w-full resize-none rounded-lg border border-line bg-white px-[15px] py-3.5 text-[0.9375rem] leading-[1.375rem] text-ink outline-none transition-colors placeholder:text-[#a7a4ac] focus:border-brand"
            />
            <p className="self-end text-[0.75rem] leading-4 text-ink-muted">{value.length}/{MAX_TEXT}</p>
          </div>
        ) : (
          <div key={shake} role={q.type === 'multi' ? 'group' : 'radiogroup'} aria-label={t(q.q)} className={cx('stagger flex flex-col gap-3', shake > 0 && 'animate-shake')}>
            {q.options.map((opt) => (
              <OptionCard
                key={opt}
                title={t(opt)}
                multi={q.type === 'multi'}
                selected={q.type === 'multi' ? value.includes(opt) : value === opt}
                onClick={() => (q.type === 'multi' ? toggle(opt) : set(opt))}
              />
            ))}
          </div>
        )}
      </div>

      <ActionSheet
        open={sheet === 'exit'}
        onClose={() => setSheet(null)}
        title={t('Leave this survey?')}
        body={t('Your answers won’t be saved. You’ll need to start {code} again from the first question.', { code: a.code })}
        primary={t('Keep Going')}
        onPrimary={() => setSheet(null)}
        secondary={t('Leave Anyway')}
        onSecondary={leave}
      />
      <ActionSheet
        open={sheet === 'deadline'}
        onClose={toActivities}
        icon
        title={t('The deadline has passed')}
        body={t('The deadline for {name} passed before you submitted, so your answers weren’t recorded.', { name: surveyName(a, t) })}
        primary={t('Back to My Activities')}
        onPrimary={toActivities}
      />
      <ActionSheet
        open={sheet === 'failed'}
        onClose={() => setSheet(null)}
        icon
        title={t('Couldn’t submit')}
        body={t('Check your internet connection and try again. Your answers are still here.')}
        primary={t('Try Again')}
        onPrimary={() => { setSheet(null); submit() }}
        secondary={t('Cancel')}
        onSecondary={() => setSheet(null)}
      />
    </Screen>
  )
}

/* -------------------------------------------------------- 4.4 Submitted */

export function SurveySubmitted() {
  const t = useT()
  const navigate = useNavigate()
  const { a } = useSurvey()
  if (!a) return <Navigate to="/s/home" replace />
  return (
    <Screen
      bg="plain"
      statusBar="light"
      footer={
        <Footer>
          <PrimaryButton onClick={() => navigate('/s/activities?tab=completed', { replace: true })}>{t('Back to My Activities')}</PrimaryButton>
          <OutlineButton onClick={() => navigate('/s/home', { replace: true })} className="text-[0.9375rem]">{t('Go Home')}</OutlineButton>
        </Footer>
      }
    >
      <SuccessBody
        title={t('Survey submitted')}
        body={t('{name} is now in your Completed activities.', { name: surveyName(a, t) })}
      />
    </Screen>
  )
}

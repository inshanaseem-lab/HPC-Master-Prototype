import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { BottomActions, OutlineButton, PrimaryButton, Screen, cx } from '../../components/ui.jsx'
import { useT, useDate } from '../../i18n/index.js'
import { updateActivity } from '../../student/store.js'
import { GROUPS } from '../../student/data.js'
import { getMultiStage } from '../../hpc/store.js'
import { useFlowActivity } from './ActivityScreen.jsx'
import QuestionRunner from './QuestionRunner.jsx'
import { AppBar, Avatar, Badge, Card, ChevronRightIcon, Eyebrow, FooterPair, SuccessMark } from './parts.jsx'
import { PEER_REVIEW, SELF_REFLECTION, TODAY_LABEL, basePath, firstName, lateUntil, reviewees } from './data.js'

const canReflectState = (a) => (a.section === 'B' ? a.state === 'recorded' : a.state === 'marked-complete')
const hasGroup = (a) => Boolean(GROUPS[a.groupId])
const doneReviews = (a) => (a.peerDone ?? []).filter((id) => reviewees(a).some((m) => m.id === id))

/** Route wrapper: picks the activity by :id for section B or D. */
export const forSection = (Component, section) => function Wrapped() {
  const { id } = useParams()
  const [a, redirect] = useFlowActivity(section)
  // Multi-stage Group Projects use their own step routes (see routes.jsx)
  if (section === 'B' && getMultiStage(id)) return <Navigate to={`/s/project/${id}`} replace />
  if (redirect) return redirect
  return <Component a={a} />
}

/* ------------------------------------------------ 5.3 / 7.3 Self-reflection */

export function Reflect({ a }) {
  const t = useT()
  const navigate = useNavigate()
  const base = basePath(a)
  if (!canReflectState(a) || a.closed) return <Navigate to={base} replace />

  const questions = SELF_REFLECTION[a.section].map((q) => ({ q: t(q.q), hint: q.hint && t(q.hint), options: q.options.map((o) => t(o)) }))
  const submit = (answers) => {
    const finished = !hasGroup(a)
    updateActivity(a.id, {
      state: finished ? 'done' : 'reflected',
      reflection: { answers, at: TODAY_LABEL, late: Boolean(a.late) },
      ...(finished ? { submittedOn: TODAY_LABEL } : {}),
    })
    navigate(finished ? `${base}/done` : `${base}/reflected`, { replace: true })
  }
  return (
    <QuestionRunner
      title={t('Self-Reflection')}
      questions={questions}
      exitTitle={t('Leave self-reflection?')}
      exitBody={t('Your answers won’t be saved. You’ll need to start self-reflection again.')}
      onExit={() => navigate(base, { replace: true })}
      onSubmit={submit}
    />
  )
}

/* ------------------------------------------- 5.5 / 7.4 Self-reflection done */

export function Reflected({ a }) {
  const t = useT()
  const d = useDate()
  const navigate = useNavigate()
  const base = basePath(a)
  if (a.state !== 'reflected') return <Navigate to={base} replace />
  const isB = a.section === 'B'
  const n = reviewees(a).length
  const until = d(a.late ? lateUntil(a) : a.due)

  const next = () => {
    if (isB) return navigate(`${base}/peer`, { replace: true })
    const m = reviewees(a).find((x) => !doneReviews(a).includes(x.id))
    navigate(m ? `${base}/peer/${m.id}` : `${base}/peer`, { replace: true })
  }

  return (
    <Screen
      bg="plain"
      statusBar="light"
      bodyClassName="flex flex-col"
      footer={
        <FooterPair
          left={<OutlineButton className="flex-1" onClick={() => navigate('/s/home', { replace: true })}>{t('I Will Do This Later')}</OutlineButton>}
          right={<PrimaryButton className="flex-1" onClick={next}>{t('Continue')}</PrimaryButton>}
        />
      }
    >
      <div className="flex flex-1 flex-col items-center justify-center gap-4 px-4 py-8 text-center">
        <SuccessMark />
        <h1 className="animate-fade-up text-[1.5rem] font-semibold leading-[1.875rem] text-ink">{t('Self-reflection submitted')}</h1>
        <p className="max-w-[20rem] animate-fade-up text-[0.8125rem] leading-[1.1875rem] text-ink-muted">
          {isB
            ? t('You can review your group now, or come back any time before {date}.', { date: until })
            : t('You can review your side now, or come back any time before {date}.', { date: until })}
        </p>
        <div className="mt-2 flex animate-fade-up flex-col gap-1 self-stretch rounded-[18px] border border-brand-600 bg-[#fffaf5] p-4 text-left">
          <Eyebrow tone="brand">{t('Next step')}</Eyebrow>
          <p className="text-[0.9375rem] font-semibold leading-[1.375rem] text-ink">{t('Peer review')}</p>
          <p className="text-[0.8125rem] leading-[1.1875rem] text-ink-muted">
            {isB
              ? t('Review {n} group members · about 2 min each', { n })
              : t('Review {n} members of your side · about 2 min each', { n })}
          </p>
        </div>
      </div>
    </Screen>
  )
}

/* ------------------------------------ "View" on a done self-reflection step */

export function ReflectionView({ a }) {
  const t = useT()
  const d = useDate()
  const base = basePath(a)
  const saved = a.reflection
  if (!saved) return <Navigate to={base} replace />
  const qs = SELF_REFLECTION[a.section]
  return (
    <Screen bg="plain" statusBar="light" header={<AppBar title={t('My Self-Reflection')} />}>
      <div className="flex flex-col gap-4 px-4 pb-8 pt-4">
        <div>
          <h2 className="text-[1.25rem] font-semibold leading-7 text-ink">{t(a.title)}</h2>
          <p className="py-1 text-[0.8125rem] leading-[1.1875rem] text-ink-muted">{t('Submitted {date}', { date: d(saved.at) })}</p>
        </div>
        <div className="stagger flex flex-col gap-3">
          {qs.map((q, i) => (
            <Card key={q.q} className="gap-1.5 p-4">
              <Eyebrow>{t('Question {n} of {total}', { n: i + 1, total: qs.length })}</Eyebrow>
              <p className="text-[0.9375rem] font-semibold leading-[1.375rem] text-ink">{t(q.q)}</p>
              <p className="text-[0.875rem] font-medium leading-5 text-brand-600">
                {saved.answers?.[i] != null ? t(q.options[saved.answers[i]]) : t('Not answered')}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </Screen>
  )
}

/* -------------------------------------------------- 5.7 Peer review members */

export function PeerMembers({ a }) {
  const t = useT()
  const navigate = useNavigate()
  const base = basePath(a)
  if (!hasGroup(a)) return <Navigate to={base} replace />
  if (a.state === 'done') return <Navigate to={`${base}/done`} replace />
  if (a.state !== 'reflected' || a.closed) return <Navigate to={base} replace />

  const members = reviewees(a)
  const done = doneReviews(a)
  const nextMember = members.find((m) => !done.includes(m.id))
  const nQ = PEER_REVIEW[a.section].length

  return (
    <Screen
      bg="plain"
      statusBar="light"
      header={<AppBar title={t('Peer Review')}/>}
      footer={
        <FooterPair
          left={<OutlineButton className="flex-1" onClick={() => navigate('/s/home')}>{t('I Will Do This Later')}</OutlineButton>}
          right={<PrimaryButton className="flex-1" onClick={() => nextMember && navigate(`${base}/peer/${nextMember.id}`)}>{t('Continue')}</PrimaryButton>}
        />
      }
    >
      <div className="flex flex-col gap-5 px-4 pb-8 pt-4">
        <div>
          <h2 className="text-[1.5rem] font-semibold leading-[1.875rem] text-ink">
            {a.section === 'B' ? t('Review your group') : t('Review your side')}
          </h2>
          <p className="py-1 text-[0.8125rem] leading-[1.1875rem] text-ink-muted">
            {t('Each review is saved when you finish it.')} {t('{k} of {n} reviewed', { k: done.length, n: members.length })}
          </p>
        </div>
        <Card>
          <div className="stagger">
            {members.map((m, i) => {
              const isDone = done.includes(m.id)
              const isNext = nextMember?.id === m.id
              const row = cx('flex w-full flex-wrap items-center gap-3 px-4 py-3.5 text-left', i < members.length - 1 && 'border-b border-[#f1efec]')
              const body = (
                <>
                  <Avatar name={m.name} />
                  <span className="flex min-w-[min(8rem,100%)] flex-1 flex-col gap-0.5">
                    <span className="text-[0.875rem] font-semibold leading-5 text-ink">{m.name}</span>
                    <span className="text-[0.8125rem] leading-[1.1875rem] text-ink-muted">{t('{n} questions', { n: nQ })}</span>
                  </span>
                </>
              )
              if (isDone) {
                return (
                  <div key={m.id} className={row}>
                    {body}
                    <Badge tone="success" className="animate-check-pop">{t('Done')}</Badge>
                  </div>
                )
              }
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => navigate(`${base}/peer/${m.id}`)}
                  className={cx(row, 'tap-soft hover:bg-[#fffaf5]', i === 0 && 'rounded-t-2xl', i === members.length - 1 && 'rounded-b-2xl')}
                >
                  {body}
                  {isNext && <Badge tone="warning">{t('Next')}</Badge>}
                  <span className="flex shrink-0 items-center gap-0.5 text-[0.8125rem] font-medium leading-[1.1875rem] text-brand-700">
                    {t('Start')}<ChevronRightIcon size={16} />
                  </span>
                </button>
              )
            })}
          </div>
        </Card>
      </div>
    </Screen>
  )
}

/* ---------------------------------------- 5.8 / 7.6 Peer review questionnaire */

export function PeerReview({ a }) {
  const t = useT()
  const navigate = useNavigate()
  const { memberId } = useParams()
  const base = basePath(a)
  const members = reviewees(a)
  const member = members.find((m) => m.id === memberId)
  if (!hasGroup(a) || a.state !== 'reflected' || a.closed) return <Navigate to={base} replace />
  if (!member) return <Navigate to={`${base}/peer`} replace />
  const done = doneReviews(a)
  if (done.includes(member.id)) return <Navigate to={`${base}/peer`} replace />

  const isB = a.section === 'B'
  const name = firstName(member.name)
  const g = GROUPS[a.groupId]
  const questions = PEER_REVIEW[a.section].map((q) => ({ q: t(q.q, { name }), options: q.options.map((o) => t(o)) }))
  const position = done.length + 1

  const submit = (answers) => {
    const peerDone = [...done, member.id]
    const all = members.every((m) => peerDone.includes(m.id))
    updateActivity(a.id, {
      peerDone,
      peerAnswers: { ...(a.peerAnswers ?? {}), [member.id]: answers },
      ...(all ? { state: 'done', submittedOn: TODAY_LABEL } : {}),
    })
    navigate(all ? `${base}/done` : `${base}/peer`, { replace: true })
  }

  return (
    <QuestionRunner
      title={isB ? t('Reviewing {name}', { name }) : t('Peer Review')}
      right={isB ? undefined : t('Member {n} of {total}', { n: position, total: members.length })}
      intro={
        <div className="flex items-center gap-3">
          <Avatar name={member.name} />
          <div className="flex min-w-0 flex-1 flex-col gap-0.5">
            <p className="text-[0.875rem] font-semibold leading-5 text-ink">{member.name}</p>
            <p className="text-[0.8125rem] leading-[1.1875rem] text-ink-muted">
              {isB || !a.side ? `${t(g.name)} · ${t(a.title)}` : `${t(a.side)} · ${t(a.title)}`}
            </p>
          </div>
        </div>
      }
      questions={questions}
      exitTitle={t('Leave this review?')}
      exitBody={t('Your answers for {name} won’t be saved. Reviews you finished are kept.', { name })}
      onExit={() => navigate(`${base}/peer`, { replace: true })}
      onSubmit={submit}
    />
  )
}

/* --------------------------------------------------------- 5.9 All done */

export function AllDone({ a }) {
  const t = useT()
  const navigate = useNavigate()
  const base = basePath(a)
  if (a.state !== 'done') return <Navigate to={base} replace />
  const n = doneReviews(a).length
  const title = t(a.title)
  const body = !hasGroup(a)
    ? t('Your self-reflection is submitted. {title} moves to Completed.', { title })
    : n === 1
      ? t('Your self-reflection and 1 peer review are submitted. {title} moves to Completed.', { title })
      : t('Your self-reflection and {n} peer reviews are submitted. {title} moves to Completed.', { n, title })
  return (
    <Screen
      bg="plain"
      statusBar="light"
      bodyClassName="flex flex-col"
      footer={
        <BottomActions className="flex flex-col gap-3">
          <PrimaryButton onClick={() => navigate(`/s/completed/${a.id}`, { replace: true })}>{t('View My Responses')}</PrimaryButton>
          <OutlineButton onClick={() => navigate('/s/activities?tab=completed', { replace: true })}>{t('Back to My Activities')}</OutlineButton>
        </BottomActions>
      }
    >
      <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
        <SuccessMark />
        <h1 className="animate-fade-up text-[1.5rem] font-semibold leading-[1.875rem] text-ink">{t('All steps done')}</h1>
        <p className="max-w-[20rem] animate-fade-up text-[0.8125rem] leading-[1.1875rem] text-ink-muted">{body}</p>
      </div>
    </Screen>
  )
}


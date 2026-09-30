import { useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { BottomActions, PrimaryButton, Screen, cx } from '../../components/ui.jsx'
import { useT, useDate } from '../../i18n/index.js'
import { useStudentState } from '../../student/store.js'
import { GROUPS, activityPath } from '../../student/data.js'
import HandbookRow from '../../student/HandbookRow.jsx'
import { useMultiStage } from '../../hpc/store.js'
import { MsActivity } from './MsActivity.jsx'
import {
  AppBar, ActivityHeader, Badge, DeadlineBox, Eyebrow, FilePreviewSheet, GroupCard, NextStepBox,
  Notice, StepRow, SubmissionCard, TextCard, TwoDates,
} from './parts.jsx'
import {
  REFLECTION_MIN, SELF_REFLECTION, TODAY_LABEL, basePath, contentFor, daysLeft, deadlineText, lateUntil, reviewees,
} from './data.js'

/** Looks up the activity for this flow; returns [activity, redirectElement]. */
export function useFlowActivity(section) {
  const { id } = useParams()
  const { activities } = useStudentState()
  const a = activities.find((x) => x.id === id)
  if (!a) return [null, <Navigate to="/s/home" replace />]
  if (a.section !== section) return [null, <Navigate to={activityPath(a)} replace />]
  return [a, null]
}

/** Section B project screen: 5.1 / 10.1 / 5.2 / 5.6 / 9.4 / 9.5 by state. */
export function ProjectScreen() {
  const { id } = useParams()
  const ms = useMultiStage(id)
  const [a, redirect] = useFlowActivity('B')
  // Handbook 3-stage flow when the shared multi-stage record exists (e.g. 'gp-water'); otherwise the single cycle
  if (ms) return <MsActivity />
  if (redirect) return redirect
  return <ActivityScreen a={a} />
}

/** Section D classroom screen: 7.1 / 10.2 / 7.2 / 7.5 / 9.4 / 9.5 by state. */
export function ClassScreen() {
  const [a, redirect] = useFlowActivity('D')
  if (redirect) return redirect
  return <ActivityScreen a={a} />
}

function ActivityScreen({ a }) {
  const t = useT()
  const d = useDate()
  const navigate = useNavigate()
  const [preview, setPreview] = useState(false)

  if (a.state === 'done') return <Navigate to={`/s/completed/${a.id}`} replace />

  const isB = a.section === 'B'
  const base = basePath(a)
  const content = contentFor(a)
  const group = GROUPS[a.groupId]
  const hasGroup = Boolean(group)
  const members = reviewees(a)
  const reviewed = (a.peerDone ?? []).filter((id) => members.some((m) => m.id === id)).length

  // Phases
  const before = isB ? a.state === 'in-progress' : a.state === 'before-class'
  const waiting = a.state === 'waiting-teacher'
  const canReflect = isB ? a.state === 'recorded' : a.state === 'marked-complete'
  const reflected = a.state === 'reflected'
  const afterSubmission = canReflect || reflected
  const late = afterSubmission && a.late && !a.closed
  const closed = afterSubmission && a.closed
  const until = d(lateUntil(a))

  /* ---- deadline badge */
  let badge
  if (late || closed) badge = <Badge tone="error">{t('Closed')}</Badge>
  else if (waiting && isB) badge = <Badge tone="error">{t('Deadline Missed')}</Badge>
  else {
    const n = daysLeft(a)
    if (n != null) {
      const label = n < 0 ? t('Closed') : n === 0 ? t('Due today') : n === 1 ? t('1 day left') : t('{n} days left', { n })
      badge = <Badge tone={n <= 2 ? 'error' : 'warning'}>{label}</Badge>
    }
  }

  const subtitle = isB
    ? t('{group} · Teacher: {teacher}', { group: group ? t(group.name) : t('Group Project'), teacher: a.teacher })
    : t('{type} · Teacher: {teacher}', { type: t(a.type ?? 'Classroom Interaction'), teacher: a.teacher })

  /* ---- steps */
  const selfQ = SELF_REFLECTION[a.section].length
  const selfStep = (() => {
    if (reflected) return { status: 'done', subtitle: t('Submitted {date}', { date: d(a.reflection?.at ?? TODAY_LABEL) }) }
    if (closed) return { status: 'closed', subtitle: t('Not submitted') }
    if (canReflect) {
      return {
        status: 'active',
        subtitle: late
          ? t('{n} questions · deadline passed, submit by {date}', { n: selfQ, date: until })
          : t('{n} questions · about {m} min', { n: selfQ, m: REFLECTION_MIN[a.section] }),
      }
    }
    return {
      status: 'locked',
      subtitle: waiting && isB ? t('Opens after your teacher records the submission')
        : waiting ? t('Opens when the activity is marked complete')
        : t('Opens after your teacher records the submission'),
    }
  })()
  const peerStep = (() => {
    const count = t('{k} of {n} reviewed', { k: reviewed, n: members.length })
    if (closed) return { status: 'closed', subtitle: count }
    if (reflected) {
      return {
        status: 'active',
        subtitle: late
          ? t('{count} · deadline passed, submit by {date}', { count, date: until })
          : t('{count} · about 2 min each', { count }),
        action: reviewed === 0 ? t('Start') : t('Continue'),
      }
    }
    return { status: 'locked', subtitle: t('Opens after self-reflection') }
  })()

  const showSteps = !before
  const title = isB ? t('Group Project') : t('Classroom Interaction')

  return (
    <>
    <Screen
      bg="plain"
      statusBar="light"
      header={<AppBar title={title} />}
      footer={closed ? (
        <BottomActions>
          <PrimaryButton onClick={() => navigate('/s/activities?tab=live')}>{t('Back to My Activities')}</PrimaryButton>
        </BottomActions>
      ) : null}
    >
      <div className="stagger flex flex-col gap-5 px-4 pb-8 pt-4">
        <ActivityHeader activity={a} subtitle={subtitle} />

        {/* Dates */}
        {!isB && (before || waiting)
          ? <TwoDates activity={a} />
          : <DeadlineBox date={d(deadlineText(a))} badge={badge} closed={late || closed} />}

        {/* Next step (before / waiting) */}
        {before && isB && (
          <NextStepBox
            title={t('Work on your project with your group')}
            body={t('Your teacher will record your group’s submission. Self-reflection opens after that.')}
          />
        )}
        {before && !isB && (
          <NextStepBox
            title={hasGroup
              ? t('Prepare with your group for the activity on {date}', { date: d(a.classDate) })
              : t('Prepare for the activity on {date}', { date: d(a.classDate) })}
            body={t('Your teacher observes the activity. Reflection opens once your teacher marks it complete.')}
          />
        )}
        {waiting && (
          <NextStepBox
            title={t('Waiting for your teacher')}
            body={isB
              ? t('Your teacher hasn’t recorded your group’s submission yet. Self-reflection opens after that.')
              : t('Your teacher hasn’t marked this activity complete yet. Self-reflection opens after that.')}
          />
        )}

        {/* Submission (B, once recorded) */}
        {isB && afterSubmission && !late && !closed && a.submission && (
          <SubmissionCard submission={a.submission} onView={() => setPreview(true)} />
        )}

        {/* Notices */}
        {canReflect && !late && !closed && (
          <Notice tone="success">
            {isB
              ? t('Your teacher has submitted your project report. Next step is reflection.')
              : t('Your teacher has marked this activity as complete. Next step is reflection.')}
          </Notice>
        )}
        {late && (
          <Notice tone="warning">
            {hasGroup
              ? t('The deadline has passed, but you can still submit your pending reflection and peer review until {date} (1 week after the deadline).', { date: until })
              : t('The deadline has passed, but you can still submit your pending reflection until {date} (1 week after the deadline).', { date: until })}
          </Notice>
        )}
        {closed && (
          <Notice tone="neutral">
            {!reflected
              ? t('The reflection window closed on {date}. Your self-reflection was not submitted.', { date: until })
              : reviewed === 1
                ? t('The reflection window closed on {date}. Your self-reflection and 1 finished review were recorded.', { date: until })
                : t('The reflection window closed on {date}. Your self-reflection and {n} finished reviews were recorded.', { date: until, n: reviewed })}
          </Notice>
        )}
        {(late || closed) && (
          <Notice tone="success">{isB ? t('Your project is counted as submitted.') : t('Your activity is counted as complete.')}</Notice>
        )}

        {/* Why / before you start (before the activity) */}
        {before && <TextCard label={t('Why this matters')}>{t(content.why)}</TextCard>}
        {before && <TextCard label={t('Before you start')}>{t(content.before)}</TextCard>}

        {/* Steps */}
        {showSteps && (
          <div className="flex flex-col gap-2">
            <Eyebrow tone="brand">{t('Your steps')}</Eyebrow>
            <StepRow
              n={1}
              title={t('Self-reflection')}
              {...selfStep}
              action={t('Start')}
              onAction={() => navigate(`${base}/reflect`)}
              onView={() => navigate(`${base}/reflection`)}
            />
            {hasGroup && (
              <StepRow
                n={2}
                title={t('Peer review')}
                {...peerStep}
                onAction={() => navigate(`${base}/peer`)}
              />
            )}
          </div>
        )}

        {/* Group card: B before; D before + marked complete */}
        {hasGroup && (isB ? before : before || (canReflect && !late)) && <GroupCard groupId={a.groupId} withName={!isB} />}

        {/* Stages (B, in progress) */}
        {before && isB && content.stages && <Stages stages={content.stages} />}

        {before && content.handbook && <HandbookRow />}
      </div>
    </Screen>
    {a.submission && <FilePreviewSheet open={preview} onClose={() => setPreview(false)} file={a.submission.file} />}
    </>
  )
}

function Stages({ stages }) {
  const t = useT()
  return (
    <div className="flex flex-col gap-2">
      <Eyebrow tone="brand">{t('Stages')}</Eyebrow>
      <div>
        {stages.map((s, i) => (
          <div key={s.name} className="flex gap-3">
            <div className="flex w-2.5 flex-col items-center">
              <div className={cx('mt-1.5 size-2.5 shrink-0 rounded-full', s.done ? 'bg-ink-2' : 'border border-line bg-[#f1efec]')} />
              {i < stages.length - 1 && <div className="w-px flex-1 bg-line" />}
            </div>
            <div className="flex flex-1 flex-col pb-4">
              <Eyebrow>{t('Stage {n}', { n: i + 1 })}</Eyebrow>
              <p className="text-[0.9375rem] font-bold leading-[1.375rem] text-ink">{t(s.name)}</p>
              <p className="text-[0.8125rem] leading-[1.1875rem] text-ink-muted">{t(s.body)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

import { useParams, useNavigate } from 'react-router-dom'
import { Screen, BottomActions, PrimaryButton, cx } from '../../components/ui.jsx'
import { useAppStore } from '../../store/AppStore.jsx'
import { useT } from '../../i18n/index.js'
import { PBI, ABILITIES } from '../../hpc/config.js'
import { learner } from '../../hpc/store.js'
import { ProvenanceChip, EventNotice, Icons } from '../../hpc/components.jsx'
import { useActivity, nameOf, stageStatus, reviewerOf, STAGES } from './store.js'
import { useClassInfo, useShortDate, PbiAppBar, SectionLabel, Card, FileRow, Pill } from './parts.jsx'

function QA({ q, a }) {
  const t = useT()
  return (
    <div className="flex flex-col gap-1">
      <p className="text-[0.8125rem] font-semibold leading-[1.1875rem] text-ink-muted">{t(q)}</p>
      <p className={cx('rounded-xl bg-surface px-3 py-2.5 text-[0.9375rem] leading-[1.375rem]', a ? 'text-ink' : 'italic text-ink-muted')}>{a || t('Not answered')}</p>
    </div>
  )
}

/** Read-only reflection ticks (learner self or peer). */
function TickSummary({ statements, ticks }) {
  const t = useT()
  return (
    <div className="flex flex-col gap-3">
      {ABILITIES.map((ab) => {
        const on = ticks?.[ab.id] ?? []
        return (
          <div key={ab.id} className="flex flex-col gap-1.5">
            <p className="flex flex-wrap items-center justify-between gap-x-3 gap-y-0.5 text-[0.75rem] font-bold uppercase tracking-[0.96px] text-brand-600">
              {t(ab.label)} <span className="font-semibold normal-case tracking-normal text-ink-muted">{t('{n} of {total} ticked', { n: on.length, total: statements[ab.id].length })}</span>
            </p>
            {statements[ab.id].map((s, i) => (
              <p key={s} className={cx('flex items-start gap-2 text-[0.875rem] leading-5', on.includes(i) ? 'text-ink' : 'text-ink-muted')}>
                <span className={cx('mt-0.5 grid size-4 shrink-0 place-items-center rounded border', on.includes(i) ? 'border-brand bg-brand text-white' : 'border-[#cfcac4]')}>{on.includes(i) && <Icons.check width="10" height="10" />}</span>
                {t(s)}
                <span className="sr-only">{on.includes(i) ? t('Ticked') : t('Not ticked')}</span>
              </p>
            ))}
          </div>
        )
      })}
    </div>
  )
}

function Block({ label, kind = 'student', children, meta }) {
  return (
    <Card className="flex flex-col gap-3">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div className="min-w-0">
          <SectionLabel className="text-ink-muted">{label}</SectionLabel>
          {meta && <p className="pt-1 text-[0.8125rem] text-ink-muted">{meta}</p>}
        </div>
        <ProvenanceChip kind={kind} />
      </div>
      {children}
    </Card>
  )
}

/** Everything a learner handed in for one stage (used by the page and the evaluation overlay). */
export function SubmissionContent({ a, id, stage, showReflection = true }) {
  const t = useT()
  const short = useShortDate()
  const { showToast } = useAppStore()
  const l = a.learners[id] ?? {}
  const dl = (f) => showToast(t('{title} downloaded', { title: f }))

  if (stage === 'S1') {
    return (
      <div className="stagger flex flex-col gap-3">
        <Block label={t('Stage 1 · Draft plan')} meta={l.plan?.submittedAt && t('Submitted {date}', { date: short(l.plan.submittedAt) })}>
          <QA q="Topic" a={l.topic ? t(l.topic) : ''} />
          {l.hypothesis && (
            <div className="flex flex-col gap-1">
              <p className="flex flex-wrap items-center gap-2 text-[0.8125rem] font-semibold text-ink-muted">{t('Hypothesis')} <ProvenanceChip kind="teacher">{t('Given by teacher')}</ProvenanceChip></p>
              <p className="rounded-xl bg-surface px-3 py-2.5 text-[0.9375rem] text-ink">{l.hypothesis}</p>
            </div>
          )}
          {PBI.draftPlan.map((q) => <QA key={q} q={q} a={l.plan?.answers?.[q]} />)}
        </Block>
        {showReflection && (
          <Block label={t('Stage 1 · Learner reflection')}>
            {l.s1Self ? (
              <>
                <TickSummary statements={PBI.self.S1} ticks={l.s1Self.ticks} />
                <QA q={PBI.s1SelfExtra[0]} a={l.s1Self.problems} />
                <QA q={PBI.s1SelfExtra[1]} a={l.s1Self.help} />
              </>
            ) : <p className="text-[0.875rem] text-ink-muted">{t('Reflection not done yet.')}</p>}
          </Block>
        )}
      </div>
    )
  }

  if (stage === 'S2') {
    const n = l.roster?.length ?? 0
    const few = n < PBI.instrument.minResponses
    const items = l.instrument?.items ?? []
    return (
      <div className="stagger flex flex-col gap-3">
        <Block label={t('Research instrument')} meta={l.instrument && t(l.instrument.kind === 'interview' ? 'Interview script · up to {m} minutes' : 'Questionnaire · up to {n} questions', { n: PBI.instrument.maxQuestions, m: PBI.instrument.interviewMinutes })}>
          <ol className="flex list-decimal flex-col gap-1.5 pl-5 text-[0.9375rem] leading-[1.375rem] text-ink">
            {items.map((q, i) => <li key={i}>{t(q)}</li>)}
          </ol>
          {items.length > PBI.instrument.maxQuestions && <Pill tone="danger">{t('More than {n} questions', { n: PBI.instrument.maxQuestions })}</Pill>}
          <QA q="Target group" a={l.instrument?.targetGroup && t(l.instrument.targetGroup)} />
          <QA q="Why this group" a={l.instrument?.justification && t(l.instrument.justification)} />
        </Block>
        <Block label={t('Responses collected')}>
          <div className={cx('flex items-center gap-3 rounded-xl px-3 py-2.5', few ? 'bg-danger-50' : 'bg-[#e3f4e8]')}>
            <p className={cx('text-[1.75rem] font-semibold leading-8', few ? 'text-danger' : 'text-[#1e6b3a]')}>{n}</p>
            <p className={cx('text-[0.8125rem] leading-[1.1875rem]', few ? 'text-danger' : 'text-[#1e6b3a]')}>
              {few ? t('Fewer than {min} responses — the handbook asks for at least {min}.', { min: PBI.instrument.minResponses }) : t('At least {min} responses, as the handbook asks.', { min: PBI.instrument.minResponses })}
            </p>
          </div>
          <details className="group">
            <summary className="tap flex min-h-11 cursor-pointer list-none items-center justify-between gap-2 text-[0.875rem] font-semibold text-brand-700">{t('See respondents')} <Icons.chevronR className="shrink-0 transition-transform group-open:rotate-90" /></summary>
            <div className="flex flex-col divide-y divide-line rounded-xl border border-line">
              {(l.roster ?? []).map((r, i) => (
                <div key={i} className="flex flex-wrap items-center justify-between gap-x-2 gap-y-0.5 px-3 py-2 text-[0.8125rem]">
                  <span className="font-medium text-ink">{r.name}</span>
                  <span className="text-ink-muted">{t(r.role)} · {t(r.mode)} · {short(r.date)}</span>
                </div>
              ))}
            </div>
          </details>
        </Block>
        <Block label={t('Draft summary (1–2 pages)')} meta={l.summary?.submittedAt && t('Submitted {date}', { date: short(l.summary.submittedAt) })}>
          {PBI.summary.map((q) => <QA key={q} q={q} a={l.summary?.answers?.[q] && t(l.summary.answers[q])} />)}
          {(l.summary?.files ?? []).length > 0 && <SectionLabel>{t('Files')}</SectionLabel>}
          {(l.summary?.files ?? []).map((f) => <FileRow key={f} name={f} onDownload={() => dl(f)} />)}
        </Block>
        {showReflection && (
          <Block label={t('Stage 2 · Learner reflection')}>
            {l.s2Self ? (
              <>
                <TickSummary statements={PBI.self.S2} ticks={l.s2Self.ticks} />
                <QA q={PBI.s2SelfExtra[0]} a={l.s2Self.appreciation} />
              </>
            ) : <p className="text-[0.875rem] text-ink-muted">{t('Reflection not done yet.')}</p>}
          </Block>
        )}
      </div>
    )
  }

  // S3
  const reviewer = reviewerOf(a, id)
  const review = reviewer ? a.learners[reviewer]?.peerGiven : null
  return (
    <div className="stagger flex flex-col gap-3">
      <Block label={t('Stage 3 · Revised draft')} meta={l.revision?.resubmittedAt && t('Resubmitted {date}', { date: short(l.revision.resubmittedAt) })}>
        <QA q="What I changed after peer review" a={l.revision?.note && t(l.revision.note)} />
        {(l.revision?.files ?? []).map((f) => <FileRow key={f} name={f} onDownload={() => dl(f)} />)}
      </Block>
      <Block label={t('Peer review received')} kind="peer" meta={reviewer && t('Reviewed by {name}', { name: nameOf(reviewer) })}>
        {review ? (
          <>
            <TickSummary statements={PBI.peer} ticks={review.ticks} />
            <QA q={PBI.peerExtra[0]} a={review.appreciation && t(review.appreciation)} />
          </>
        ) : <p className="text-[0.875rem] text-ink-muted">{reviewer ? t('Peer review not done yet.') : t('Not paired yet.')}</p>}
      </Block>
    </div>
  )
}

/* ======================================================= Submission page (kit T09-04) */

export function PbiSubmission() {
  const navigate = useNavigate()
  const t = useT()
  const { stage = 'S1', studentId } = useParams()
  const { classId, cls } = useClassInfo()
  const a = useActivity(classId)
  if (!a || !a.learners[studentId]) {
    return <Screen bg="plain" statusBar="light" header={<PbiAppBar title={t('Submission')} />}><p className="p-8 text-center text-ink-muted">{t('This submission could not be found.')}</p></Screen>
  }
  const st = stageStatus(a, studentId, stage)
  const stageMeta = STAGES.find((s) => s.id === stage)
  return (
    <Screen
      bg="plain"
      statusBar="light"
      header={<PbiAppBar title={t('{name} submission', { name: nameOf(studentId) })} subtitle={t('Grade {grade}', { grade: cls.id })} />}
      footer={st.submitted && (
        <BottomActions className="border-t border-line bg-surface">
          {st.assessed
            ? <PrimaryButton onClick={() => navigate(`/pbi/${classId}/evaluated/${stage}/${studentId}`)}>{t('View evaluation')}</PrimaryButton>
            : <PrimaryButton onClick={() => navigate(`/pbi/${classId}/assess/${stage}/${studentId}`, { replace: true })}>{t('Evaluate')}</PrimaryButton>}
        </BottomActions>
      )}
    >
      <div className="flex flex-col gap-3 p-4">
        <Card className="flex items-center gap-3">
          <span className={cx('grid size-11 shrink-0 animate-pop-in place-items-center rounded-full', st.submitted ? 'bg-[#e3f4e8] text-[#1e6b3a]' : 'bg-surface text-ink-muted')}>
            {st.submitted ? <Icons.check /> : <Icons.info />}
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[1rem] font-semibold text-ink">{st.submitted ? t('Submission received') : t('Not submitted yet')}</p>
            <p className="text-[0.8125rem] leading-[1.1875rem] text-ink-muted">{t(stageMeta.label)} · {t(stageMeta.name)} · {t('Student ID {id}', { id: learner(studentId)?.studentId })}</p>
          </div>
        </Card>
        {stage === 'S3' && !st.submitted && <EventNotice tone="info" title={t('Waiting for the revised draft')}>{t('The learner revises after peer review and resubmits. You can assess once it arrives.')}</EventNotice>}
        <SubmissionContent a={a} id={studentId} stage={stage} />
      </div>
    </Screen>
  )
}

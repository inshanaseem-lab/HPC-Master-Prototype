import { useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { BottomActions, OutlineButton, Screen, Sheet, cx } from '../../components/ui.jsx'
import { useAppStore } from '../../store/AppStore.jsx'
import { useT, useDate } from '../../i18n/index.js'
import { GROUPS, SECTIONS, STUDENT } from '../../student/data.js'
import { useStudentState } from '../../student/store.js'
import { DEFAULT_SURVEY, PEER_ANSWERS, REFLECTION_ANSWERS, SUBMISSIONS, SURVEY_ANSWERS } from './data.js'
import { Avatar, Card, FileIcon, HelpCircle, Overline, SectionBadge, StudentAppBar, Tag, UserIcon } from './parts.jsx'

/** /s/completed/:id → 3.4 (Section A survey), 3.3 (B/C/D with steps) or 9.1 (missed). */
export default function CompletedView() {
  const { id } = useParams()
  const { activities } = useStudentState()
  const a = activities.find((x) => x.id === id)
  if (!a) return <Navigate to="/s/activities?tab=completed" replace />
  if (a.state === 'missed') return <MissedView a={a} />
  if (a.section === 'A') return <SurveyView a={a} />
  return <StepsView a={a} />
}

const fullTitle = (t, a) => (a.code ? `${a.code} · ${t(a.title)}` : t(a.title))

function Header({ a, sub, title }) {
  const t = useT()
  return (
    <div className="flex animate-fade-up flex-col items-start gap-2">
      <SectionBadge section={a.section} />
      <div>
        <h2 className="text-[1.5rem] font-semibold leading-[1.875rem] text-ink">{title ?? t(a.title)}</h2>
        {sub && <p className="py-1 text-[0.8125rem] leading-[1.1875rem] text-ink-muted">{sub}</p>}
      </div>
    </div>
  )
}

/** Normalises answers saved by the survey flow ({question, answer} / [q, a] / strings) or falls back to mock. */
function surveyAnswers(a) {
  if (Array.isArray(a.answers) && a.answers.length) {
    return a.answers.map((x, i) =>
      Array.isArray(x) ? x
        : typeof x === 'object' && x ? [x.question ?? x.q ?? `Question ${i + 1}`, x.answer ?? x.a ?? x.label ?? '']
        : [`Question ${i + 1}`, String(x)])
  }
  return SURVEY_ANSWERS[a.code] ?? DEFAULT_SURVEY
}

/* ------------------------------------------------------------------ 3.4 */

function SurveyView({ a }) {
  const t = useT()
  const d = useDate()
  const answers = surveyAnswers(a)
  const sub = [
    a.submittedOn && t('Submitted on {date}', { date: d(a.submittedOn) }),
    t('{n} of {total} questions answered', { n: answers.filter(([, v]) => v !== '').length, total: answers.length }),
  ].filter(Boolean).join(' · ')
  return (
    <Screen bg="plain" statusBar="light" header={<StudentAppBar title={fullTitle(t, a)} />}>
      <div className="flex flex-col gap-5 px-4 pb-8 pt-4">
        <Header a={a} sub={sub} />
        <Card className="stagger">
          {answers.map(([q, v], i) => (
            <div key={i} className={cx('flex flex-col gap-1 px-4 py-3.5', i < answers.length - 1 && 'border-b border-[#f1efec]')}>
              <span className="text-[0.8125rem] leading-[1.1875rem] text-ink-muted">{`${i + 1}. ${t(q)}`}</span>
              <span className="text-[0.9375rem] font-semibold leading-[1.375rem] text-ink">{t(v)}</span>
            </div>
          ))}
        </Card>
      </div>
    </Screen>
  )
}

/* ------------------------------------------------------------------ 3.3 */

function StepsView({ a }) {
  const t = useT()
  const d = useDate()
  const { showToast } = useAppStore()
  const [sheet, setSheet] = useState(null) // { title, rows } | { file }
  const [downloading, setDownloading] = useState(false)
  const group = a.groupId ? GROUPS[a.groupId] : null
  const extra = SUBMISSIONS[a.id] ?? {}
  const sub = a.submission ?? (extra.file ? extra : null)
  const cFile = a.section === 'C' && (a.files?.length ? (a.files[0].name ?? a.files[0]) : extra.file)
  const file = a.section === 'C' ? cFile : sub?.file
  const hasSubmission = a.section === 'B' || a.section === 'C'
  const peers = (a.section === 'B' || a.section === 'D') && group ? group.members.filter((m) => !m.you) : []
  // A closed reflection window (9.5) keeps finished steps only
  const reflected = !a.closed || a.state === 'done' || a.state === 'reflected'
  const peerDone = (m) => !a.closed || a.state === 'done' || (a.peerDone ?? []).includes(m.id)
  const finishedOn = a.submittedOn ?? extra.reflectedOn

  const headerSub = [
    group ? t(group.name) : a.individual ? t('Individual') : a.type && t(a.type),
    finishedOn ? t('Completed on {date}', { date: d(finishedOn) }) : a.closed ? t('Reflection window closed') : t('Completed'),
  ].filter(Boolean).join(' · ')

  const download = () => {
    setDownloading(true)
    setTimeout(() => { setDownloading(false); showToast(t('{file} downloaded', { file })) }, 800)
  }

  return (
    <Screen bg="plain" statusBar="light" header={<StudentAppBar title={t(a.title)} />}>
      <div className="stagger flex flex-col gap-5 px-4 pb-8 pt-4">
        <Header a={a} sub={headerSub} />

        {hasSubmission && (
          <Card className="flex flex-col gap-2.5 p-4">
            <Overline>{t('Submission')}</Overline>
            <span className="text-[0.9375rem] font-semibold leading-[1.375rem] text-ink">
              {a.section === 'B' ? t('Recorded by your teacher') : t('Submitted by you')}
            </span>
            {sub?.kind && <span className="text-[0.8125rem] leading-[1.1875rem] text-ink-muted">{`${t(sub.kind)} · ${d(sub.at)}`}</span>}
            {file ? (
              <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 rounded-[10px] border border-line px-3 py-1.5">
                <FileIcon size={20} className="shrink-0 text-brand-700" />
                <span className="min-w-[8rem] flex-1 break-all text-[0.8125rem] font-medium leading-[1.1875rem] text-ink">{file}</span>
                <span className="ml-auto flex shrink-0 items-center gap-2">
                  <button className="tap min-h-11 px-2 text-[0.8125rem] font-medium text-brand-700 hover:underline" onClick={() => setSheet({ file })}>{t('View')}</button>
                  <button className="tap flex min-h-11 min-w-[4rem] items-center justify-center px-2 text-[0.8125rem] font-medium text-brand-700 hover:underline" onClick={download} disabled={downloading}>
                    {downloading ? <span className="inline-block size-4 animate-spin rounded-full border-2 border-brand/30 border-t-brand" /> : t('Download')}
                  </button>
                </span>
              </div>
            ) : (
              <span className="text-[0.8125rem] leading-[1.1875rem] text-ink-muted">{t('No file attached')}</span>
            )}
          </Card>
        )}

        <Card>
          <div className="px-4 pt-3.5"><Overline>{t('My self-reflection')}</Overline></div>
          <Row
            icon={<span className="grid size-10 shrink-0 place-items-center rounded-[10px] bg-brand-50 text-brand-700"><UserIcon size={20} /></span>}
            name={t('{name} (You)', { name: STUDENT.name })}
            meta={reflected
              ? [t('{n} answers', { n: REFLECTION_ANSWERS.length }), extra.reflectedOn && t('submitted {date}', { date: d(extra.reflectedOn) })].filter(Boolean).join(' · ')
              : t('Not submitted')}
            onView={reflected ? () => setSheet({ title: t('My self-reflection'), rows: REFLECTION_ANSWERS }) : null}
          />
        </Card>

        {peers.length > 0 && (
          <Card>
            <div className="px-4 pt-3.5"><Overline>{t('My peer reviews')}</Overline></div>
            {peers.map((m, i) => (
              <Row key={m.id} last={i === peers.length - 1}
                icon={<Avatar name={m.name} />}
                name={m.name}
                meta={peerDone(m) ? t('{n} answers', { n: PEER_ANSWERS.length }) : t('Not submitted')}
                onView={peerDone(m) && (() => setSheet({ title: t('Peer review · {name}', { name: m.name }), rows: PEER_ANSWERS, vars: { name: m.name } }))}
              />
            ))}
          </Card>
        )}
      </div>

      <Sheet open={!!sheet} onClose={() => setSheet(null)}>
        {sheet?.file ? (
          <div className="flex flex-col gap-4 p-5">
            <p className="break-all text-[1rem] font-semibold text-ink">{sheet.file}</p>
            <div className="grid h-56 place-items-center rounded-xl border border-line bg-surface text-ink-muted">
              <div className="flex flex-col items-center gap-2">
                <FileIcon size={36} className="text-brand-700" />
                <span className="text-[0.8125rem]">{t('Preview')}</span>
              </div>
            </div>
            <OutlineButton onClick={() => setSheet(null)}>{t('Close')}</OutlineButton>
          </div>
        ) : sheet && (
          <div className="flex flex-col gap-3 p-5">
            <p className="text-[1rem] font-semibold text-ink">{sheet.title}</p>
            <div className="stagger flex flex-col">
              {sheet.rows.map(([q, v], i) => (
                <div key={i} className={cx('flex flex-col gap-1 py-3', i > 0 && 'border-t border-[#f1efec]')}>
                  <span className="text-[0.8125rem] leading-[1.1875rem] text-ink-muted">{`${i + 1}. ${t(q, sheet.vars)}`}</span>
                  <span className="text-[0.9375rem] font-semibold leading-[1.375rem] text-ink">{t(v)}</span>
                </div>
              ))}
            </div>
            <OutlineButton onClick={() => setSheet(null)}>{t('Close')}</OutlineButton>
          </div>
        )}
      </Sheet>
    </Screen>
  )
}

function Row({ icon, name, meta, onView, last = true }) {
  const t = useT()
  return (
    <div className={cx('flex flex-wrap items-center gap-3 px-4 py-3.5', !last && 'border-b border-[#f1efec]')}>
      {icon}
      <div className="flex min-w-[9rem] flex-1 flex-col gap-0.5">
        <span className="text-[0.875rem] font-semibold leading-5 text-ink">{name}</span>
        <span className="text-[0.8125rem] leading-[1.1875rem] text-ink-muted">{meta}</span>
      </div>
      {onView && <button onClick={onView} className="tap -mr-2 min-h-11 shrink-0 px-2 text-[0.8125rem] font-medium text-brand-700 hover:underline">{t('View')}</button>}
    </div>
  )
}

/* ------------------------------------------------------------------ 9.1 */

function MissedView({ a }) {
  const t = useT()
  const navigate = useNavigate()
  const d = useDate()
  const steps = a.section === 'A'
    ? [[t('Survey'), t('Not submitted')]]
    : [[t('Submission'), t('Not submitted')], [t('Self-reflection'), t('Not available')]]
  const sub = [a.individual ? t('Individual') : null, a.teacher && t('Teacher: {name}', { name: a.teacher })].filter(Boolean).join(' · ')
  return (
    <Screen bg="plain" statusBar="light" header={<StudentAppBar title={t(SECTIONS[a.section].name)} />}
      footer={<BottomActions><OutlineButton onClick={() => navigate('/s/activities?tab=completed')}>{t('Back to My Activities')}</OutlineButton></BottomActions>}>
      <div className="stagger flex flex-col gap-5 px-4 pb-8 pt-4">
        <Header a={a} title={fullTitle(t, a)} sub={sub} />
        <div className="flex flex-wrap items-center gap-3 rounded-[10px] border border-[#ffa554] bg-[#fffaf5] px-3.5 py-3">
          <div className="flex min-w-[9rem] flex-1 flex-col gap-0.5">
            <Overline>{t('Deadline')}</Overline>
            <span className="text-[0.9375rem] font-semibold leading-[1.375rem] text-ink">{d(a.deadline ?? a.due)}</span>
          </div>
          <Tag tone="error">{t('Missed')}</Tag>
        </div>
        <div className="flex items-start gap-2.5 rounded-[10px] bg-[#fbedec] px-3.5 py-3 text-[#b54a45]">
          <HelpCircle size={20} className="mt-px shrink-0" />
          <span className="text-[0.8125rem] leading-[1.1875rem] text-ink-2">{t('You missed the deadline for this activity. Submission is closed.')}</span>
        </div>
        <Card>
          <div className="px-4 pt-3.5"><Overline>{t('Your steps')}</Overline></div>
          {steps.map(([name, status], i) => (
            <div key={name} className={cx('flex items-center gap-3 px-4 py-3.5', i < steps.length - 1 && 'border-b border-[#f1efec]')}>
              <span className="grid size-7 shrink-0 place-items-center rounded-full bg-[#f1efec] text-[0.8125rem] font-semibold text-ink-muted">{i + 1}</span>
              <div className="flex min-w-0 flex-1 flex-col">
                <span className="text-[0.875rem] font-semibold leading-5 text-ink">{name}</span>
                <span className="text-[0.8125rem] leading-[1.1875rem] text-ink-muted">{status}</span>
              </div>
              <Tag tone="error">{t('Closed')}</Tag>
            </div>
          ))}
        </Card>
      </div>
    </Screen>
  )
}

import { Navigate, useParams } from 'react-router-dom'
import { Screen, cx } from '../../components/ui.jsx'
import { useT, useDate } from '../../i18n/index.js'
import { ABILITIES, GROUP_PROJECT, LEVELS } from '../../hpc/config.js'
import { LockNotice, ProvenanceChip } from '../../hpc/components.jsx'
import { AppBar, Avatar, Card, Eyebrow } from './parts.jsx'
import { TickSummary, withMs } from './MsParts.jsx'
import { nameOf, shortOf } from './msLogic.js'

const UNPACK = [['questions', GROUP_PROJECT.unpacking[0]], ['know', GROUP_PROJECT.unpacking[1]], ['need', GROUP_PROJECT.unpacking[2]]]

/** Is the teacher's Stage 3 rubric shared with learners? (flag set by the teacher side) */
export const rubricShared = (a) => Boolean(a.rubricS3Shared || a.rubricShared?.S3 || a.rubricS3?.shared)
const hasRubricText = (a) => ABILITIES.some((ab) => LEVELS.some((l) => a.rubricS3?.[ab.id]?.[l.id]?.trim?.()))

function Head({ chip, title, sub }) {
  return (
    <div className="flex flex-col items-start gap-2">
      {chip}
      <h2 className="text-[1.375rem] font-semibold leading-[1.75rem] text-ink">{title}</h2>
      {sub && <p className="text-[0.8125rem] leading-[1.1875rem] text-ink-muted">{sub}</p>}
    </div>
  )
}

/** /answers/:kind — my own answers, read-only (kit S03-14). kind: unpacking | planning | s1self | s3self | post */
export const AnswersView = withMs(function AnswersView({ a, p, me, base }) {
  const t = useT()
  const d = useDate()
  const { kind } = useParams()
  const L = p.L
  const submittedOn = (at) => t('Submitted {date}', { date: d(shortOf(at)) })
  let title, chip, sub, body
  if (kind === 'unpacking' && L.unpacking?.submittedAt) {
    title = t('My unpacking'); chip = <ProvenanceChip kind="student" />; sub = submittedOn(L.unpacking.submittedAt)
    body = UNPACK.map(([k, q]) => <QA key={k} q={t(q)} a={L.unpacking[k]} />)
  } else if (kind === 'planning' && p.g?.planning?.submittedAt) {
    const pl = p.g.planning
    title = t('Group plan'); chip = <ProvenanceChip kind="group" />
    sub = `${submittedOn(pl.submittedAt)} · ${t('Last edited by {name} · {date}', { name: pl.editedBy === me ? t('you') : nameOf(pl.editedBy), date: d(shortOf(pl.editedAt)) })}`
    body = (
      <>
        <ListCard label={t(GROUP_PROJECT.planning[0].label)} items={pl.schedule} numbered />
        <ListCard label={t(GROUP_PROJECT.planning[1].label)} items={pl.resources} />
        <Card className="p-4">
          <Eyebrow tone="brand">{t(GROUP_PROJECT.planning[2].label)}</Eyebrow>
          <div className="flex flex-col gap-2.5 pt-2.5">
            {Object.entries(pl.roles ?? {}).map(([m, r]) => (
              <div key={m} className="flex flex-wrap items-center gap-3">
                <Avatar name={nameOf(m)} className="size-9 text-[0.8125rem]" />
                <span className="min-w-[min(8rem,100%)] flex-1 text-[0.875rem] font-semibold text-ink">{m === me ? t('{name} (You)', { name: nameOf(m) }) : nameOf(m)}</span>
                <span className="text-[0.875rem] text-ink-2">{t(r)}</span>
              </div>
            ))}
          </div>
        </Card>
        <ListCard label={t(GROUP_PROJECT.planning[3].label)} items={pl.barriers} />
      </>
    )
  } else if ((kind === 's1self' && L.s1Self) || (kind === 's3self' && L.s3Self)) {
    const rec = kind === 's1self' ? L.s1Self : L.s3Self
    title = kind === 's1self' ? t('My Stage 1 self-reflection') : t('My Stage 3 self-reflection')
    chip = <ProvenanceChip kind="student" />; sub = submittedOn(rec.savedAt)
    body = <TickSummary statements={kind === 's1self' ? GROUP_PROJECT.s1Self : GROUP_PROJECT.s3Self} ticks={rec.ticks} />
  } else if (kind === 'post' && L.post) {
    title = t('My post-project reflection'); chip = <ProvenanceChip kind="student" />; sub = submittedOn(L.post.savedAt)
    body = GROUP_PROJECT.postReflection.map((q, i) => <QA key={q} q={`${i + 1}. ${t(q)}`} a={L.post.answers?.[q]} />)
  } else {
    return <Navigate to={base} replace />
  }
  return (
    <Screen bg="plain" statusBar="light" header={<AppBar title={t(a.title)} />}>
      <div className="flex flex-col gap-4 px-4 pb-8 pt-4">
        <Head chip={chip} title={title} sub={sub} />
        <LockNotice>{t('Submitted answers can’t be edited.')}</LockNotice>
        <div className="stagger flex flex-col gap-3">{body}</div>
      </div>
    </Screen>
  )
})

function QA({ q, a }) {
  const t = useT()
  return (
    <Card className="gap-1.5 p-4">
      <p className="text-[0.8125rem] leading-[1.1875rem] text-ink-muted">{q}</p>
      <p className="whitespace-pre-wrap text-[0.9375rem] font-medium leading-[1.375rem] text-ink">{a || t('Not answered')}</p>
    </Card>
  )
}
function ListCard({ label, items = [], numbered }) {
  const t = useT()
  return (
    <Card className="p-4">
      <Eyebrow tone="brand">{label}</Eyebrow>
      <ol className="flex flex-col gap-1.5 pt-2.5">
        {items.map((x, i) => (
          <li key={i} className="flex gap-2 text-[0.875rem] leading-5 text-ink">
            <span className="w-12 shrink-0 text-ink-muted">{numbered ? t('Day {n}', { n: i + 1 }) : `${i + 1}.`}</span>
            <span className="min-w-0 flex-1">{t(x)}</span>
          </li>
        ))}
      </ol>
    </Card>
  )
}

/** /given/:peerId — a peer review I gave (kit S03-15). Shows only my ticks, never the classmate's teacher feedback. */
export const GivenView = withMs(function GivenView({ a, p, base }) {
  const t = useT()
  const d = useDate()
  const { peerId } = useParams()
  const rec = p.L.peerGiven?.[peerId]
  if (!rec?.savedAt) return <Navigate to={base} replace />
  return (
    <Screen bg="plain" statusBar="light" header={<AppBar title={t('Peer review I gave')} />}>
      <div className="flex flex-col gap-4 px-4 pb-8 pt-4">
        <div className="flex flex-wrap items-center gap-3">
          <Avatar name={nameOf(peerId)} />
          <div className="flex min-w-[min(8rem,100%)] flex-1 flex-col gap-0.5">
            <h2 className="text-[1rem] font-semibold leading-6 text-ink">{nameOf(peerId)}</h2>
            <p className="text-[0.8125rem] leading-[1.1875rem] text-ink-muted">{t(p.g.name)} · {t('Submitted {date}', { date: d(shortOf(rec.savedAt)) })}</p>
          </div>
          <ProvenanceChip kind="student" />
        </div>
        <LockNotice>{t('Submitted answers can’t be edited.')}</LockNotice>
        <TickSummary statements={GROUP_PROJECT.s3Peer} ticks={rec.ticks} />
        <p className="text-[0.75rem] leading-[1.125rem] text-ink-muted">{t(a.title)}</p>
      </div>
    </Screen>
  )
})

/** /rubric — the Stage 3 rubric, read-only, only when the teacher has shared it. */
export const RubricView = withMs(function RubricView({ a, base }) {
  const t = useT()
  if (!rubricShared(a) || !hasRubricText(a)) return <Navigate to={base} replace />
  return (
    <Screen bg="plain" statusBar="light" header={<AppBar title={t('Stage 3 rubric')} />}>
      <div className="flex flex-col gap-4 px-4 pb-8 pt-4">
        <Head chip={<ProvenanceChip kind="teacher">{t('Shared by your teacher')}</ProvenanceChip>} title={t('How your final work is assessed')}
          sub={t('Your teacher picks one level for each ability. Use this to check your work.')} />
        <div className="stagger flex flex-col gap-3">
          {ABILITIES.map((ab) => (
            <Card key={ab.id} className="p-4">
              <Eyebrow tone="brand">{t(ab.label)}</Eyebrow>
              <dl className="flex flex-col gap-2.5 pt-2.5">
                {LEVELS.map((l) => (
                  <div key={l.id} className={cx('rounded-xl bg-surface px-3 py-2.5')}>
                    <dt className="text-[0.75rem] font-bold uppercase tracking-[0.6px] text-ink-muted">{t(l.label)}</dt>
                    <dd className="pt-0.5 text-[0.875rem] leading-5 text-ink">{a.rubricS3?.[ab.id]?.[l.id]?.trim() ? t(a.rubricS3[ab.id][l.id]) : '—'}</dd>
                  </div>
                ))}
              </dl>
            </Card>
          ))}
        </div>
        <LockNotice>{t('Read only')}</LockNotice>
      </div>
    </Screen>
  )
})
export { hasRubricText }

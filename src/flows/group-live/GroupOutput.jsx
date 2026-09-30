import { Navigate, useNavigate } from 'react-router-dom'
import { BottomActions, PrimaryButton, Screen } from '../../components/ui.jsx'
import { useDate, useT } from '../../i18n/index.js'
import { EventNotice, ProvenanceChip } from '../../hpc/components.jsx'
import { firstName, nameOf } from './lib.js'
import { AppBar, Card, FileThumb, GroupCard, NoActivityRedirect, SectionLabel, groupLabel, useBPage, useClassName } from './parts.jsx'

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
/** "10 Sep, 4:32 pm" */
export function formatStamp(ts) {
  const d = new Date(ts)
  let h = d.getHours()
  const ampm = h >= 12 ? 'pm' : 'am'
  h = h % 12 || 12
  return `${d.getDate()} ${MONTHS[d.getMonth()]}, ${h}:${String(d.getMinutes()).padStart(2, '0')} ${ampm}`
}

/** Recorded draft / final output card (kit T10-09 · Filled by teacher). */
export function OutputBlock({ output, label }) {
  const t = useT()
  const d = useDate()
  if (!output?.recordedAt) return <Card><p className="text-[0.875rem] leading-5 text-ink-muted">{t('Not recorded yet.')}</p></Card>
  return (
    <Card>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-[0.75rem] font-bold uppercase tracking-[0.96px] text-ink-muted">{label}</p>
        <ProvenanceChip kind="teacher" />
      </div>
      <p className="pt-2 text-[1.125rem] font-semibold leading-6 text-ink">{t('Recorded by you')}</p>
      <p className="pt-1 text-[0.875rem] leading-5 text-ink-muted">
        {t(output.kind === 'physical' ? 'Physical submission' : 'Digital submission')} · {d(formatStamp(output.recordedAt))}
      </p>
      {output.link && (
        <>
          <SectionLabel className="pt-4">{t('Link')}</SectionLabel>
          <a href={/^https?:\/\//i.test(output.link) ? output.link : `https://${output.link}`} target="_blank" rel="noreferrer"
            className="tap-soft mt-2 block break-all rounded-xl border border-line bg-white p-3 text-[0.9375rem] leading-6 text-brand-700 underline decoration-brand/40 underline-offset-2 hover:bg-cream">
            {output.link}
          </a>
        </>
      )}
      {output.files?.length > 0 && (
        <div className={`grid gap-3 pt-4 ${output.files.length > 1 ? 'grid-cols-2' : ''}`}>
          {output.files.map((f) => <FileThumb key={f.id ?? f.name} file={{ ...f, progress: 100 }} />)}
        </div>
      )}
    </Card>
  )
}

export default function GroupOutput() {
  const { classId, groupId, stage: sp, a, base } = useBPage()
  const navigate = useNavigate()
  const t = useT()
  const { name: cls } = useClassName(classId)
  if (!a) return <NoActivityRedirect classId={classId} />
  const stage = sp?.toUpperCase()
  const group = a.groups?.[groupId]
  if (!group || !['S2', 'S3'].includes(stage)) return <Navigate to={base} replace />
  const output = stage === 'S2' ? group.draft : group.final
  if (!output?.recordedAt) return <Navigate to={`${base}/${sp}/record/${groupId}`} replace />
  const key = `${sp}Teacher`
  const next = group.members.find((m) => !a.learners[m]?.[key]?.savedAt)
  const needsRubric = stage === 'S3' && !a.rubricSavedAt

  return (
    <Screen
      bg="plain"
      header={<AppBar title={t('{name} · {what}', { name: groupLabel(t, group.name), what: t(stage === 'S2' ? 'Draft' : 'Final output') })} subtitle={cls} onBack={() => navigate(`${base}?stage=${stage}`)} />}
      footer={
        <BottomActions>
          {needsRubric ? (
            <PrimaryButton onClick={() => navigate(`${base}/s3/rubric`)}>{t('Write the Stage 3 rubric')}</PrimaryButton>
          ) : next ? (
            <PrimaryButton onClick={() => navigate(`${base}/${sp}/${next}`)}>{t('Assess {name}', { name: firstName(nameOf(a, next)) })}</PrimaryButton>
          ) : (
            <PrimaryButton onClick={() => navigate(`${base}?stage=${stage}`)}>{t('Back to progress')}</PrimaryButton>
          )}
        </BottomActions>
      }
    >
      <div className="stagger flex flex-col gap-4 p-4">
        <GroupCard a={a} group={group} />
        <OutputBlock output={output} label={t(stage === 'S2' ? 'Stage 2 · Draft' : 'Stage 3 · Final output')} />
        {stage === 'S3' && <EventNotice tone="success" title={t('Learners can now reflect')}>{t('Recording the final output opened the Stage 3 self-reflection and peer review for this group.')}</EventNotice>}
        {stage === 'S2' && <EventNotice tone="info" title={t('Teacher-only stage')}>{t('No self or peer evaluation at this stage.')}</EventNotice>}
        {needsRubric && <p className="text-[0.8125rem] leading-[1.1875rem] text-ink-muted">{t('Write the rubric before you assess Stage 3.')}</p>}
      </div>
    </Screen>
  )
}

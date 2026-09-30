import { useDate, useT } from '../../i18n/index.js'
import { GROUP_PROJECT } from '../../hpc/config.js'
import { OpenQuestion, ProvenanceChip } from '../../hpc/components.jsx'
import { formatStamp } from './GroupOutput.jsx'
import { nameOf } from './lib.js'
import { Card, SectionLabel } from './parts.jsx'

function List({ items }) {
  if (!items?.length) return <p className="pt-1 text-[0.875rem] text-ink-muted">—</p>
  return (
    <ul className="flex flex-col gap-1 pt-1">
      {items.map((x, i) => <li key={i} className="flex gap-2 text-[0.875rem] leading-5 text-ink-2"><span aria-hidden className="text-ink-muted">•</span>{x}</li>)}
    </ul>
  )
}

/** Group's shared Stage 1 planning (Filled by group · last edited by). */
export function PlanningBlock({ a, group }) {
  const t = useT()
  const d = useDate()
  const p = group.planning
  const [schedule, resources, roles, barriers] = GROUP_PROJECT.planning
  return (
    <Card>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-[0.75rem] font-bold uppercase tracking-[0.96px] text-ink-muted">{t('Group planning')}</p>
        <ProvenanceChip kind="group" />
      </div>
      {!p?.submittedAt ? (
        <p className="pt-2 text-[0.875rem] leading-5 text-ink-muted">{t('The group has not submitted its planning yet.')}</p>
      ) : (
        <>
          <div className="flex flex-wrap items-center gap-2 pt-2">
            <p className="text-[0.8125rem] leading-[1.1875rem] text-ink-muted">{t('Last edited by {name} · {date}', { name: nameOf(a, p.editedBy), date: d(formatStamp(p.editedAt ?? p.submittedAt)) })}</p>
            <OpenQuestion code="OQ-SEC-10" text="Who in the group may edit shared Stage 1 fields. Here any member can edit; the last editor is shown." />
          </div>
          <SectionLabel className="pt-4">{t(schedule.label)}</SectionLabel>
          <List items={p.schedule} />
          <SectionLabel className="pt-4">{t(resources.label)}</SectionLabel>
          <List items={p.resources} />
          <SectionLabel className="pt-4">{t(roles.label)}</SectionLabel>
          <div className="flex flex-col gap-1 pt-1">
            {group.members.map((m) => (
              <p key={m} className="flex flex-wrap justify-between gap-x-3 text-[0.875rem] leading-5"><span className="text-ink">{nameOf(a, m)}</span><span className="text-ink-2">{p.roles?.[m] ?? '—'}</span></p>
            ))}
          </div>
          <SectionLabel className="pt-4">{t(barriers.label)}</SectionLabel>
          <List items={p.barriers} />
        </>
      )}
    </Card>
  )
}

/** Learner's own unpacking (Filled by student). */
export function UnpackingBlock({ a, learnerId }) {
  const t = useT()
  const d = useDate()
  const u = a.learners[learnerId]?.unpacking
  const [q, know, need] = GROUP_PROJECT.unpacking
  return (
    <Card>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-[0.75rem] font-bold uppercase tracking-[0.96px] text-ink-muted">{t('Unpacking the prompt')}</p>
        <ProvenanceChip kind="student" />
      </div>
      {!u?.submittedAt ? (
        <p className="pt-2 text-[0.875rem] leading-5 text-ink-muted">{t('{name} has not submitted their unpacking yet.', { name: nameOf(a, learnerId) })}</p>
      ) : (
        <>
          <p className="pt-2 text-[0.8125rem] leading-[1.1875rem] text-ink-muted">{t('Submitted {date}', { date: d(formatStamp(u.submittedAt)) })}</p>
          {[[q, u.questions], [know, u.know], [need, u.need]].map(([label, v]) => (
            <div key={label}>
              <SectionLabel className="pt-4">{t(label)}</SectionLabel>
              <p className="pt-1 whitespace-pre-wrap text-[0.875rem] leading-5 text-ink-2">{v || '—'}</p>
            </div>
          ))}
        </>
      )}
    </Card>
  )
}

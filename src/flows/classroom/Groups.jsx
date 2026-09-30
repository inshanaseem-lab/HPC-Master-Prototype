import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Screen, PrimaryButton, BottomActions, cx } from '../../components/ui.jsx'
import { useAppStore } from '../../store/AppStore.jsx'
import { useT } from '../../i18n/index.js'
import { Header, SectionLabel, classLabel } from './parts.jsx'
import { getStudents } from './data.js'
import { useClassroom, updateClass } from './store.js'
import { GROUP_PROJECT } from '../../hpc/config.js'

// Handbook rule: a group needs at least 3 learners
const MIN = GROUP_PROJECT.minGroupSize ?? 3

/** Split ids round-robin into n groups (optionally shuffled). */
function split(ids, n, shuffle) {
  const list = [...ids]
  if (shuffle) for (let i = list.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [list[i], list[j]] = [list[j], list[i]] }
  const groups = Array.from({ length: n }, () => [])
  list.forEach((id, i) => groups[i % n].push(id))
  return groups
}

/**
 * Group creation (Figma note 278:27811 "Group Creation flow" — no screen in this section,
 * built to match the flow's visual language).
 */
export default function Groups() {
  const navigate = useNavigate()
  const t = useT()
  const { showToast } = useAppStore()
  const { classId, cls, ci } = useClassroom()
  const students = useMemo(() => getStudents(classId, cls.students ?? 40), [classId, cls.students])
  const byId = useMemo(() => Object.fromEntries(students.map((s) => [s.id, s])), [students])
  const [groups, setGroups] = useState(() =>
    ci.groups?.length ? ci.groups : split(students.map((s) => s.id), ci.typeId === 'debate' ? 2 : 4, false),
  )
  const [saving, setSaving] = useState(false)
  const [moved, setMoved] = useState(null)
  const n = groups.length
  const sides = ci.typeId === 'debate' && n === 2
  const groupName = (i) => (sides ? t('Side {x}', { x: String.fromCharCode(65 + i) }) : t('Group {n}', { n: i + 1 }))

  const maxGroups = Math.max(2, Math.min(8, Math.floor(students.length / MIN)))
  const tooSmall = groups.some((g) => g.length < MIN)
  const setCount = (next) => {
    if (next < 2 || next > maxGroups) return
    setGroups(split(groups.flat(), next, false))
  }
  const shuffle = () => { setGroups(split(groups.flat(), n, true)); showToast(t('Students shuffled')) }
  const move = (gi, id) => {
    if (groups[gi].length <= MIN) { showToast(t('A group needs at least {n} students', { n: MIN }), 'error'); return }
    const to = (gi + 1) % n
    setGroups((gs) => gs.map((g, i) => (i === gi ? g.filter((x) => x !== id) : i === to ? [...g, id] : g)))
    setMoved(id)
  }
  const save = () => {
    setSaving(true)
    setTimeout(() => {
      updateClass(classId, { groups, grouped: true })
      showToast(t('{n} groups created', { n }))
      navigate(`/classroom/${classId}/live`)
    }, 600)
  }

  return (
    <Screen statusBar="light"
      bg="plain"
      header={<Header title={t('Create groups')} subtitle={classLabel(cls, t)} step="2 / 3" />}
      footer={
        <BottomActions className="border-t border-line bg-white">
          <PrimaryButton className="font-bold" loading={saving} disabled={tooSmall} onClick={save}>
            {t('Save groups')}
          </PrimaryButton>
        </BottomActions>
      }
    >
      <div className="flex flex-col gap-4 p-4">
        <div>
          <h1 className="text-[1.5rem] font-semibold leading-[1.875rem] text-ink">{t('Create groups for {classId}', { classId })}</h1>
          <p className="pt-1 text-[0.8125rem] leading-[1.1875rem] text-ink-muted">{t('Students are split evenly. Tap a student to move them to the next group.')} {t('Each group needs at least {n} students.', { n: MIN })}</p>
        </div>

        <div className="flex flex-wrap items-center gap-3 rounded-[10px] border border-line bg-white p-4">
          <div className="min-w-[min(10rem,100%)] flex-1">
            <SectionLabel>{t('Number of groups')}</SectionLabel>
            <p className="pt-1 text-[0.8125rem] leading-[1.1875rem] text-ink-muted">{t('About {n} students each', { n: Math.round(students.length / n) })}</p>
          </div>
          <div className="flex shrink-0 items-center gap-2 rounded-full border border-line p-1">
            <button aria-label={t('Fewer groups')} disabled={n <= 2} onClick={() => setCount(n - 1)} className="tap grid size-[44px] place-items-center rounded-full text-[1.25rem] leading-none text-ink hover:bg-surface disabled:opacity-30">−</button>
            <span key={n} aria-live="polite" className="min-w-6 animate-check-pop text-center text-[1rem] font-bold text-ink">{n}</span>
            <button aria-label={t('More groups')} disabled={n >= maxGroups} onClick={() => setCount(n + 1)} className="tap grid size-[44px] place-items-center rounded-full text-[1.25rem] leading-none text-ink hover:bg-surface disabled:opacity-30">+</button>
          </div>
        </div>

        <button onClick={shuffle} className="tap min-h-11 self-start rounded-full bg-brand-50 px-4 py-2 text-[0.8125rem] font-bold leading-[1.1875rem] text-brand-700 hover:bg-[#ffe8d4]">
          {t('Shuffle students')}
        </button>

        <div className="stagger flex flex-col gap-3">
          {groups.map((g, gi) => (
            <section key={`${n}-${gi}`} className="rounded-[18px] bg-white px-5 py-4">
              <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 pb-3">
                <SectionLabel>{groupName(gi)}</SectionLabel>
                <p className="text-[0.8125rem] font-bold leading-[1.1875rem] text-ink">{t(g.length === 1 ? '{n} student' : '{n} students', { n: g.length })}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {g.map((id) => (
                  <button
                    key={id}
                    onClick={() => move(gi, id)}
                    title={t('Move to {group}', { group: groupName((gi + 1) % n) })}
                    aria-label={`${byId[id]?.name ?? ''} · ${t('Move to {group}', { group: groupName((gi + 1) % n) })}`}
                    className={cx(
                      'tap flex min-h-11 items-center gap-1.5 rounded-full border border-line bg-[#faf8f6] py-1 pl-1.5 pr-3 text-[0.75rem] leading-4 text-ink-2 hover:border-cream-border hover:bg-brand-50',
                      moved === id && 'animate-pop-in border-brand-600',
                    )}
                  >
                    <span aria-hidden="true" className="grid size-7 shrink-0 place-items-center rounded-full bg-brand-50 text-[0.625rem] font-bold text-brand-700">{byId[id]?.initials}</span>
                    {byId[id]?.name}
                  </button>
                ))}
                {g.length < MIN && <p role="alert" className="w-full animate-shake text-[0.8125rem] leading-[1.1875rem] text-danger">{t('Add at least {n} students to this group.', { n: MIN })}</p>}
              </div>
            </section>
          ))}
        </div>
      </div>
    </Screen>
  )
}

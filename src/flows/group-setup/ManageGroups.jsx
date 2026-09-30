import { useMemo, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { BottomActions, Modal, PrimaryButton, Screen, Sheet, cx } from '../../components/ui.jsx'
import { useAppStore } from '../../store/AppStore.jsx'
import { useT } from '../../i18n/index.js'
import searchIcon from '../../assets/group-setup/search.svg'
import checkedIcon from '../../assets/group-setup/checkbox-checked.svg'
import verifiedIcon from '../../assets/group-setup/verified-badge.svg'
import deleteIcon from '../../assets/group-setup/delete.svg'
import { MAX_GROUP, MIN_GROUP, initials } from './data.js'
import { rosterFor } from '../group-live/lib.js'
import { Chip, ConfirmDialog, GPHeader, SectionLabel, StepButton, groupLabel, useClassInfo } from './parts.jsx'
import { useGroupSetup } from './store.js'

const nextGroupName = (groups) => {
  const used = new Set(groups.map((g) => g.name))
  let n = 1
  while (used.has(`Group ${n}`)) n++
  return `Group ${n}`
}

/**
 * Group creation tool: Create tab (Screen02/03/05, Group 5, empty 263:22953) and
 * View tab (All groups created 263:21618, View Groups 263:21984, empty 263:21945),
 * with the created modal (263:22992 / 263:23018), delete confirm (263:22049) and leave confirm (278:27953).
 */
export default function ManageGroups() {
  const navigate = useNavigate()
  const { showToast } = useAppStore()
  const t = useT()
  const gl = (name) => groupLabel(t, name)
  const nStudents = (n) => (n === 1 ? t('1 student') : t('{n} students', { n }))
  const { classId, cls } = useClassInfo()
  const [setup, update] = useGroupSetup(classId)
  const [params, setParams] = useSearchParams()
  const tab = params.get('tab') === 'view' ? 'view' : 'create'
  const setTab = (next) => setParams(next === 'view' ? { tab: 'view' } : {}, { replace: true })
  const bodyRef = useRef(null)

  const students = useMemo(() => rosterFor(classId, cls.students), [classId, cls.students])
  const byId = useMemo(() => Object.fromEntries(students.map((s) => [s.id, s])), [students])
  const groups = setup.groups
  const assigned = useMemo(() => new Set(groups.flatMap((g) => g.studentIds)), [groups])
  const unassigned = students.filter((s) => !assigned.has(s.id))
  const remaining = unassigned.length

  const [size, setSize] = useState(setup.groupSize || 5)
  // Kit T05-08: when fewer than the minimum would be left after this group, it takes everyone left
  const lastGroup = remaining - size < MIN_GROUP
  const target = lastGroup ? remaining : size
  const [selected, setSelected] = useState([])
  const [query, setQuery] = useState('')
  const [customName, setCustomName] = useState('')
  const groupName = customName.trim() || nextGroupName(groups)
  const [renameOpen, setRenameOpen] = useState(false)
  const [draftName, setDraftName] = useState('')
  const [shake, setShake] = useState(0)
  const [creating, setCreating] = useState(false)
  const [created, setCreated] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [leaveOpen, setLeaveOpen] = useState(false)
  const [finalising, setFinalising] = useState(false)

  const filtered = unassigned.filter((s) => s.name.toLowerCase().includes(query.trim().toLowerCase()))

  const toggle = (id) => {
    if (selected.includes(id)) return setSelected((s) => s.filter((x) => x !== id))
    if (selected.length >= target) {
      setShake((n) => n + 1)
      showToast(t('{name} already has {n} students', { name: gl(groupName), n: target }), 'error')
      return
    }
    setSelected((s) => [...s, id])
  }

  const changeSize = (delta) => {
    const next = Math.max(MIN_GROUP, Math.min(MAX_GROUP, size + delta))
    setSize(next)
    setSelected((s) => s.slice(0, remaining - next < MIN_GROUP ? remaining : next))
  }

  const createGroup = () => {
    setCreating(true)
    setTimeout(() => {
      const group = { id: `g${Date.now()}`, name: groupName, studentIds: selected }
      update((prev) => ({ ...prev, groups: [...prev.groups, group] }))
      setCreating(false)
      setCreated({ ...group, left: remaining - selected.length })
      setSelected([])
      setQuery('')
      setCustomName('')
    }, 600)
  }

  const closeCreated = () => {
    const allDone = created?.left === 0
    setCreated(null)
    if (allDone) setTab('view')
    bodyRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const confirmDelete = () => {
    const g = deleteTarget
    update((prev) => ({ ...prev, groups: prev.groups.filter((x) => x.id !== g.id) }))
    setDeleteTarget(null)
    showToast(g.studentIds.length === 1
      ? t('{name} deleted · 1 student unassigned', { name: gl(g.name) })
      : t('{name} deleted · {n} students unassigned', { name: gl(g.name), n: g.studentIds.length }))
  }

  const onBack = () => (groups.length ? setLeaveOpen(true) : navigate(`/group-project/${classId}/groups`))

  const leave = () => {
    update({ groups: [] })
    setLeaveOpen(false)
    navigate(`/group-project/${classId}/groups`)
  }

  const finalise = () => {
    setFinalising(true)
    setTimeout(() => navigate(`/group-project/${classId}/live`), 600)
  }

  /* ------------------------------------------------------------ footers */
  let footer = null
  if (tab === 'create' && remaining > 0) {
    footer = (
      <BottomActions className="bg-surface !pt-3">
        <div className="flex flex-col gap-2">
          <PrimaryButton
            className="min-h-[54px] font-bold"
            disabled={selected.length !== target || target === 0}
            loading={creating}
            onClick={createGroup}
          >
            {t('Create {name}', { name: gl(groupName) })}
          </PrimaryButton>
          <button
            disabled={groups.length === 0}
            onClick={() => setTab('view')}
            className={cx(
              'tap flex min-h-12 w-full items-center justify-center rounded-full px-6 text-[0.9375rem] font-bold leading-[1.375rem] transition-colors',
              groups.length === 0
                ? 'text-[#b1b1b1] active:scale-100'
                : 'border border-line bg-white text-ink-2 hover:bg-[#faf8f6]',
            )}
          >
            {t('Review Groups')}
          </button>
        </div>
      </BottomActions>
    )
  } else if (tab === 'view' && groups.length > 0) {
    const done = remaining === 0
    footer = (
      <BottomActions className="bg-surface !pt-0">
        <p className="animate-fade-in px-4 pb-5 pt-4 text-center text-[0.9375rem] font-medium leading-[1.375rem] text-ink-2">
          {done
            ? groups.length === 1 ? t('All Students assigned into 1 group') : t('All Students assigned into {n} groups', { n: groups.length })
            : remaining === 1 ? t('1 Student unassigned into groups') : t('{n} Students unassigned into groups', { n: remaining })}
        </p>
        {done ? (
          <PrimaryButton className="font-bold" loading={finalising} onClick={finalise}>
            {t('Finalise groups')}
          </PrimaryButton>
        ) : (
          <PrimaryButton className="font-bold" onClick={() => setTab('create')}>
            {t('Back to Create Groups')}
          </PrimaryButton>
        )}
      </BottomActions>
    )
  }

  return (
    <Screen
      bg="plain"
      statusBar="light"
      bodyRef={bodyRef}
      header={
        <>
          <GPHeader step="2 / 3" onBack={onBack} />
          <div className="shrink-0 bg-surface p-3">
            <div role="tablist" aria-label={t('Groups')} className="relative flex gap-1 rounded-full bg-[#ece1d9] p-1">
              <span
                className={cx(
                  'absolute bottom-1 left-1 top-1 w-[calc(50%-6px)] rounded-full bg-white shadow-[0_1px_1px_rgba(0,0,0,0.05)] transition-transform duration-300 ease-[cubic-bezier(.2,.8,.2,1)]',
                  tab === 'view' && 'translate-x-[calc(100%+4px)]',
                )}
              />
              {[['create', 'Create Groups'], ['view', 'View Groups']].map(([id, label]) => (
                <button
                  key={id}
                  role="tab"
                  aria-selected={tab === id}
                  onClick={() => setTab(id)}
                  className={cx(
                    'tap relative z-10 min-h-11 flex-1 rounded-full px-3.5 py-2 text-center text-[0.8125rem] font-medium leading-4 transition-colors duration-200',
                    tab === id ? 'text-black' : 'text-ink-muted hover:text-ink-2',
                  )}
                >
                  {t(label)}
                </button>
              ))}
            </div>
          </div>
        </>
      }
      footer={footer}
    >
      {tab === 'create' ? (
        remaining === 0 ? (
          <div key="ready" className="stagger flex min-h-full flex-col items-center justify-center gap-6 px-4 pb-16 text-center">
            <p className="text-[0.875rem] leading-5 text-ink-2">
              {t('Groups are ready.')}
              <br />
              {t('Every student has been assigned to a group.')}
            </p>
            <PrimaryButton className="!w-auto px-10 font-bold" onClick={() => setTab('view')}>{t('View Groups')}</PrimaryButton>
          </div>
        ) : (
          <div key="create" className="animate-fade-in pb-4">
            <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
              <button
                onClick={() => { setDraftName(gl(groupName)); setRenameOpen(true) }}
                className="tap group flex min-h-11 min-w-[min(10rem,100%)] flex-1 items-center gap-1.5 rounded-md text-left"
                aria-label={`${t('Create {name}', { name: gl(groupName) })} · ${t('Rename group')}`}
              >
                <span className="min-w-0 break-words text-[1.125rem] font-semibold leading-6 text-ink">{t('Create {name}', { name: gl(groupName) })}</span>
                <span aria-hidden className="text-[0.875rem] text-ink-muted transition-colors group-hover:text-brand-700">✎</span>
              </button>
              <div className="flex shrink-0 items-center gap-4 rounded-3xl bg-white px-3 py-2">
                <StepButton small label={t('Fewer students in this group')} disabled={size <= MIN_GROUP} onClick={() => changeSize(-1)}>−</StepButton>
                <span key={target} aria-live="polite" className="min-w-6 animate-check-pop text-center text-[1.25rem] font-semibold leading-6 text-ink">{target}</span>
                <StepButton small label={t('More students in this group')} disabled={size >= MAX_GROUP || lastGroup} onClick={() => changeSize(1)}>+</StepButton>
              </div>
            </div>

            <div className="flex flex-col gap-2 px-4">
              <div key={shake} className={cx('rounded-[10px] border border-line bg-white p-4', shake > 0 && 'animate-shake')}>
                <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
                  <SectionLabel>{target === 1 ? t('Select 1 student') : t('Select {n} students', { n: target })}</SectionLabel>
                  <p aria-live="polite" className="text-[0.8125rem] leading-[1.1875rem] text-ink-muted">{t('{done} / {total} selected', { done: selected.length, total: target })}</p>
                </div>
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[#f1efec]">
                  <div
                    className={cx('h-full rounded-full transition-[width,background-color] duration-300 ease-out', selected.length === target ? 'bg-brand' : 'bg-brand-700')}
                    style={{ width: `${target ? (selected.length / target) * 100 : 0}%` }}
                  />
                </div>
                {lastGroup && remaining > 0 && (
                  <p className="animate-fade-in pt-3 text-[0.75rem] leading-4 text-ink-2">
                    {t('Last group — the remaining {n} students all go in this group.', { n: remaining })}
                  </p>
                )}
              </div>

              <label className="flex min-h-12 items-center gap-2.5 rounded-full border border-[#e5e6e1] bg-white px-4 py-1 transition-colors focus-within:border-brand">
                <span className="grid size-[18px] shrink-0 place-items-center">
                  <img alt="" width="14" height="14" src={searchIcon} />
                </span>
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={t('Search Students by Name')}
                  aria-label={t('Search Students by Name')}
                  type="search"
                  className="min-h-10 min-w-0 flex-1 bg-transparent text-[0.875rem] font-semibold leading-5 text-ink outline-none placeholder:text-[#6d726b]"
                />
                {query && (
                  <button onClick={() => setQuery('')} className="tap -mr-3 grid size-11 shrink-0 place-items-center rounded-full text-[0.8125rem] font-medium text-ink-muted hover:bg-black/5" aria-label={t('Clear search')}><span aria-hidden>✕</span></button>
                )}
              </label>

              <div className="overflow-hidden rounded-[10px] border border-line bg-white">
                {filtered.length === 0 ? (
                  <p className="px-4 py-10 text-center text-[0.8125rem] leading-[1.1875rem] text-ink-muted">{t('No students match “{query}”.', { query })}</p>
                ) : (
                  <div className="stagger">
                    {filtered.map((s, i) => {
                      const on = selected.includes(s.id)
                      return (
                        <button
                          key={s.id}
                          aria-pressed={on}
                          onClick={() => toggle(s.id)}
                          className={cx(
                            'tap-soft flex w-full items-center gap-3.5 px-4 py-3.5 text-left transition-colors duration-200',
                            i > 0 && 'border-t border-line',
                            on ? 'bg-[#fffaf5]' : 'bg-white hover:bg-[#faf8f6]',
                          )}
                        >
                          <span
                            aria-hidden
                            className={cx(
                              'grid size-11 shrink-0 place-items-center rounded-full border text-[0.9375rem] font-bold leading-[1.375rem] text-ink-2 transition-colors duration-200',
                              on ? 'border-brand bg-transparent' : 'border-transparent bg-[#f1efec]',
                            )}
                          >
                            {initials(s.name)}
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block break-words text-[1rem] font-bold leading-6 text-ink">{s.name}</span>
                            <span className="block pt-0.5 text-[0.8125rem] leading-[1.1875rem] text-ink-muted">{t('Student Id {id}', { id: s.studentId })}</span>
                          </span>
                          {on ? (
                            <img alt="" width="24" height="24" src={checkedIcon} className="shrink-0 animate-check-pop" />
                          ) : (
                            <span className="size-6 shrink-0 rounded border-2 border-[#e5e7eb]" />
                          )}
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        )
      ) : groups.length === 0 ? (
        <div key="empty" className="stagger flex min-h-full flex-col items-center justify-center gap-6 px-4 pb-16 text-center">
          <p className="text-[0.875rem] leading-[1.1875rem] text-ink-2">
            {t('No groups currently created, Click on the create group button and select the students for your first group.')}
          </p>
          <PrimaryButton className="!w-auto px-10 font-bold" onClick={() => setTab('create')}>{t('Create Groups')}</PrimaryButton>
        </div>
      ) : (
        <div key="view" className="stagger flex flex-col gap-3 p-4">
          {groups.map((g, i) => (
            <div key={g.id} className="flex flex-col gap-3 rounded-[10px] border border-line bg-white px-4 py-3">
              <div className="flex flex-wrap items-center gap-3">
                <span aria-hidden className="rounded-lg bg-brand-50 px-2.5 py-1 text-[0.75rem] font-bold leading-4 tracking-[0.96px] text-brand-700">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="min-w-[min(8rem,100%)] flex-1">
                  <h2 className="break-words text-[0.9375rem] font-bold leading-[1.375rem] text-ink">{gl(g.name)}</h2>
                  <p className="pt-0.5 text-[0.8125rem] leading-[1.1875rem] text-ink-muted">{nStudents(g.studentIds.length)}</p>
                </div>
                <button
                  onClick={() => setDeleteTarget(g)}
                  aria-label={`${t('Delete')} · ${gl(g.name)}`}
                  className="tap flex min-h-11 items-center gap-1.5 rounded-full bg-[#fff3f3] px-3.5 text-[0.875rem] font-medium leading-[1.1875rem] text-[#b54a45] transition-colors hover:bg-[#ffe4e4]"
                >
                  <img alt="" width="16" height="16" src={deleteIcon} />
                  {t('Delete')}
                </button>
              </div>
              <div className="flex flex-wrap gap-2 pt-2.5">
                {g.studentIds.map((id) => <Chip key={id}>{byId[id]?.name ?? id}</Chip>)}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Group created (263:22992 / 263:23018) */}
      <Modal open={!!created} onClose={closeCreated} className="rounded-[10px] shadow-[0_10px_15px_rgba(0,0,0,0.1),0_4px_6px_rgba(0,0,0,0.1)]">
        {created && (
          <div className="flex flex-col items-center gap-4 p-6">
            <div className="flex flex-col items-center gap-1">
              <div className="animate-pop-in rounded-[47.5px] bg-[#eaf6ec] p-6">
                <img alt="" width="50" height="50" src={verifiedIcon} />
              </div>
              <div className="stagger flex flex-col items-center gap-1 text-center">
                <h2 className="text-[1.375rem] font-semibold leading-7 text-ink">{t('{name} created', { name: gl(created.name) })}</h2>
                <p className="text-[0.8125rem] leading-[1.1875rem] text-ink-muted">{nStudents(created.studentIds.length)}</p>
                <div className="flex flex-wrap justify-center gap-2 pt-3">
                  {created.studentIds.map((id) => <Chip key={id}>{byId[id]?.name}</Chip>)}
                </div>
              </div>
            </div>
            <button
              onClick={closeCreated}
              className="tap flex min-h-11 w-full items-center justify-center rounded-full bg-brand px-3 text-[0.875rem] font-semibold leading-5 text-white transition-colors hover:bg-brand-hover"
            >
              {created.left === 0 ? t('View All Groups') : t('Create another Group')}
            </button>
          </div>
        )}
      </Modal>

      <ConfirmDialog
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        title={t('Do you want to delete {name}?', { name: gl(deleteTarget?.name ?? '') })}
        body={t('Upon deletion, all students of this group will be unassigned and will have to be added to a new group')}
        primary={t('Yes')}
        secondary={t('Cancel')}
        onPrimary={confirmDelete}
        onSecondary={() => setDeleteTarget(null)}
      />

      <ConfirmDialog
        open={leaveOpen}
        onClose={() => setLeaveOpen(false)}
        title={t('Do you want to leave Group Creation?')}
        body={t('If you leave now then all changes will be lost.')}
        primary={t('Cancel')}
        secondary={t('Yes')}
        onPrimary={() => setLeaveOpen(false)}
        onSecondary={leave}
      />

      <Sheet open={renameOpen} onClose={() => setRenameOpen(false)}>
        <form
          className="flex flex-col gap-4 px-4 pb-6 pt-3"
          onSubmit={(e) => {
            e.preventDefault()
            let name = draftName.trim()
            // Unchanged translated default ("समूह 3") → keep the default name
            if (name === gl(nextGroupName(groups))) name = ''
            if (name && groups.some((g) => [g.name, gl(g.name)].some((x) => x.toLowerCase() === name.toLowerCase()))) {
              showToast(t('A group with this name already exists'), 'error')
              return
            }
            setCustomName(name)
            setRenameOpen(false)
          }}
        >
          <label htmlFor="gp-group-name" className="text-[1.125rem] font-semibold leading-6 text-ink">{t('Name this group')}</label>
          <input
            id="gp-group-name"
            autoFocus
            maxLength={24}
            value={draftName}
            onChange={(e) => setDraftName(e.target.value)}
            placeholder={gl(nextGroupName(groups))}
            className="h-12 rounded-lg border border-line bg-white px-4 text-[1rem] font-medium text-ink outline-none transition-colors focus:border-brand"
          />
          <PrimaryButton type="submit" className="font-bold">{t('Save name')}</PrimaryButton>
        </form>
      </Sheet>
    </Screen>
  )
}

import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { Screen, BottomActions, PrimaryButton, cx } from '../../components/ui.jsx'
import { useAppStore } from '../../store/AppStore.jsx'
import { useT } from '../../i18n/index.js'
import { emit } from '../../hpc/store.js'
import { LeaveSheet, LockNotice, EventNotice, Icons } from '../../hpc/components.jsx'
import { useActivity, learnerIds, nameOf, initialsOf, autoPair, pairsToGroups, groupsToPairs, sameTopic, isOpen } from './store.js'
import { useClassInfo, PbiAppBar, Pill, useOnlineGuard } from './parts.jsx'

/** S3 pairing: peers review each other's revised drafts, preferably on different topics. Odd count → one trio. */
export function PbiPairs() {
  const navigate = useNavigate()
  const t = useT()
  const { showToast } = useAppStore()
  const guard = useOnlineGuard()
  const { classId, classSubtitle } = useClassInfo()
  const a = useActivity(classId)
  const [groups, setGroups] = useState(() => (a ? pairsToGroups(a.pairs) : []))
  const [sel, setSel] = useState(null) // { g, i }
  const [loading, setLoading] = useState(false)
  const [leave, setLeave] = useState(false)
  const [tried, setTried] = useState(false)
  if (!a) return <Navigate to={`/pbi/${classId}/progress`} replace />

  const ids = learnerIds(a)
  const locked = ids.some((id) => a.learners[id]?.peerGiven?.savedAt)
  const dirty = JSON.stringify(groupsToPairs(groups)) !== JSON.stringify(a.pairs ?? {})
  const clashes = groups.filter((g) => sameTopic(a, g)).length

  const tap = (g, i) => {
    if (locked) return
    if (!sel) { setSel({ g, i }); return }
    if (sel.g === g && sel.i === i) { setSel(null); return }
    const next = groups.map((x) => [...x])
    const tmp = next[sel.g][sel.i]
    next[sel.g][sel.i] = next[g][i]
    next[g][i] = tmp
    setGroups(next)
    setSel(null)
  }
  const save = () => {
    if (!groups.length) { setTried(true); return }
    if (!guard()) return
    setLoading(true)
    setTimeout(() => {
      emit(a.id, 'C.S3.paired', (x) => { x.pairs = groupsToPairs(groups) }, { target: 'class' })
      showToast(t('Peer pairs saved'))
      navigate(-1)
    }, 600)
  }

  return (
    <Screen
      bg="plain"
      statusBar="light"
      header={<PbiAppBar title={t('Peer pairs · Stage 3')} subtitle={classSubtitle} onBack={() => (dirty && !locked ? setLeave(true) : navigate(-1))} />}
      footer={!locked && (
        <BottomActions className="border-t border-line bg-surface">
          <PrimaryButton loading={loading} disabled={!dirty && groups.length > 0} onClick={save}>{groups.length && !dirty ? t('Pairs saved') : t('Save pairs')}</PrimaryButton>
        </BottomActions>
      )}
    >
      <div className="flex flex-col gap-3 p-4">
        <p className="text-[0.875rem] leading-5 text-ink-2">{t('Each learner reviews one classmate’s revised draft. Pair learners with different topics where you can. With an odd number, one group is a trio.')}</p>
        {!isOpen(a, 'S3') && <EventNotice tone="info" title={t('Stage 3 is not open yet')}>{t('Learners will see their partner when you open Stage 3.')}</EventNotice>}
        {locked && <LockNotice>{t('Peer reviews have started, so pairs are locked.')}</LockNotice>}
        {!locked && (
          <button type="button" onClick={() => { setGroups(autoPair(a, ids)); setSel(null) }} className="tap flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-brand-700 bg-brand-50 text-[0.9375rem] font-semibold text-brand-700 hover:bg-[#ffe8d4]">
            <Icons.sync width="18" height="18" /> {t('Auto-pair (different topics)')}
          </button>
        )}
        {groups.length === 0 ? (
          <div className={cx('rounded-[18px] border border-dashed bg-white px-4 py-8 text-center', tried ? 'animate-shake border-danger' : 'border-line')}>
            <Icons.people className="mx-auto text-ink-muted" />
            <p className="pt-2 text-[0.9375rem] font-semibold text-ink">{t('No pairs yet')}</p>
            <p className="pt-1 text-[0.8125rem] text-ink-muted">{t('Tap Auto-pair to start, then swap anyone you like.')}</p>
          </div>
        ) : (
          <>
            <div className="flex flex-wrap items-center gap-2">
              <Pill tone="muted">{t('{n} groups · {m} learners', { n: groups.length, m: ids.length })}</Pill>
              {clashes > 0 ? <Pill tone="danger">{t('{n} with the same topic', { n: clashes })}</Pill> : <Pill tone="done">{t('All pairs have different topics')}</Pill>}
            </div>
            {!locked && <p className="text-[0.8125rem] text-ink-muted">{sel ? t('Now tap another learner to swap with {name}.', { name: nameOf(groups[sel.g][sel.i]) }) : t('Tap two learners to swap them.')}</p>}
            <div className="stagger flex flex-col gap-2">
              {groups.map((g, gi) => (
                <div key={gi} className={cx('rounded-[18px] border bg-white p-3', sameTopic(a, g) ? 'border-danger' : 'border-line')}>
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-2">
                    <p className="text-[0.75rem] font-bold uppercase tracking-[0.96px] text-brand-600">{g.length === 3 ? t('Trio {n}', { n: gi + 1 }) : t('Pair {n}', { n: gi + 1 })}</p>
                    {sameTopic(a, g) && <Pill tone="danger">{t('Same topic')}</Pill>}
                  </div>
                  <div className="flex flex-col gap-1.5">
                    {g.map((id, i) => {
                      const on = sel && sel.g === gi && sel.i === i
                      return (
                        <button key={id} type="button" disabled={locked} aria-pressed={!!on} onClick={() => tap(gi, i)}
                          className={cx('flex min-h-12 flex-wrap items-center gap-x-3 gap-y-1 rounded-xl border px-3 py-1.5 text-left transition-colors', on ? 'border-brand bg-brand-50' : 'border-transparent bg-surface', !locked && 'tap-soft hover:border-line')}>
                          <span className="grid size-8 shrink-0 place-items-center rounded-full bg-white text-[0.75rem] font-semibold text-brand-700">{initialsOf(id)}</span>
                          <span className="min-w-[min(10rem,100%)] flex-1">
                            <span className="block break-words text-[0.875rem] font-semibold text-ink">{nameOf(id)}</span>
                            <span className="block break-words text-[0.75rem] text-ink-muted">{a.learners[id]?.topic ? t(a.learners[id].topic) : t('Topic not chosen yet')}</span>
                          </span>
                          <span className="shrink-0 text-[0.75rem] text-ink-muted">{t('reviews {name}', { name: nameOf(groupsToPairs([g])[id]).split(' ')[0] })}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      <LeaveSheet open={leave} title={t('Leave without saving pairs?')} body={t('The pairs you made will be lost.')} onStay={() => setLeave(false)} onLeave={() => navigate(-1)} />
    </Screen>
  )
}

import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Screen, cx } from '../../components/ui.jsx'
import { useAppStore } from '../../store/AppStore.jsx'
import { useT } from '../../i18n/index.js'
import { Header, SegmentedTabs, classLabel } from './parts.jsx'
import { getStudents, RESPONDED_COUNT } from './data.js'
import { useClassroom, markNudged } from './store.js'

function StudentRow({ s, children }) {
  const t = useT()
  return (
    <div className="flex flex-wrap items-center gap-3 rounded-[10px] border border-line bg-white p-3.5">
      <div className="flex min-w-[min(12rem,100%)] flex-1 flex-wrap items-start gap-3">
        <span aria-hidden="true" className="shrink-0 rounded-full bg-brand-50 p-2.5 text-[0.75rem] font-bold leading-4 tracking-[0.96px] text-brand-700">{s.initials}</span>
        <div className="min-w-[min(9rem,100%)] flex-1">
          <p className="break-words text-[0.9375rem] font-bold leading-[1.375rem] text-ink">{s.name}</p>
          <p className="break-words pt-0.5 text-[0.8125rem] leading-[1.1875rem] text-ink-muted">{t('Student ID {id}', { id: s.studentId })}</p>
        </div>
      </div>
      {children}
    </div>
  )
}

const pill = 'tap flex min-h-11 min-w-[min(5.75rem,100%)] shrink-0 items-center justify-center rounded-full px-3.5 text-[0.875rem] font-medium leading-[1.1875rem] transition-colors duration-200'

/** Figma 346:4716 / 346:8013 (Completed) and 346:4820 (Pending) — responses & nudges. */
export default function Responses() {
  const navigate = useNavigate()
  const t = useT()
  const { showToast } = useAppStore()
  const { classId, cls, store } = useClassroom()
  const [tab, setTab] = useState('completed')
  const students = useMemo(() => getStudents(classId, cls.students ?? 40), [classId, cls.students])
  const completed = students.slice(0, RESPONDED_COUNT)
  const pending = students.slice(RESPONDED_COUNT)
  const evaluations = store.evaluations[classId] || {}
  const nudged = store.nudged[classId] || {}

  const nudge = (s) => { markNudged(classId, s.id); showToast(t('Reminder sent to {name}', { name: s.name })) }
  const nudgeAll = () => {
    pending.forEach((s) => markNudged(classId, s.id))
    showToast(t(pending.length === 1 ? 'Reminder sent to {n} student' : 'Reminder sent to {n} students', { n: pending.length }))
  }
  const allNudged = pending.every((s) => nudged[s.id])

  return (
    <Screen statusBar="light" bg="plain" header={<Header title={t('Classroom Interaction')} subtitle={classLabel(cls, t)} step="1 / 2" />}>
      <div className="flex flex-col gap-4 p-4">
        <div key={tab} className="animate-fade-in">
          <h1 className="text-[1.5rem] font-semibold leading-[1.875rem] text-ink">
            {tab === 'completed'
              ? t(completed.length === 1 ? '{n} student has responded' : '{n} students have responded', { n: completed.length })
              : t(pending.length === 1 ? "{n} student hasn't finished" : "{n} students haven't finished", { n: pending.length })}
          </h1>
          <p className="pt-1 text-[0.8125rem] leading-[1.1875rem] text-ink-muted">
            {tab === 'completed' ? t('View responses submitted by the learners') : t('A reminder goes straight to the learner — nothing is marked or scored.')}
          </p>
        </div>
        <SegmentedTabs tabs={[{ id: 'completed', label: t('Completed') }, { id: 'pending', label: t('Pending') }]} value={tab} onChange={setTab} />

        {tab === 'completed' ? (
          <div key="c" className="stagger flex flex-col gap-3 pt-3">
            {completed.map((s) => {
              const done = !!evaluations[s.id]
              return (
                <StudentRow key={s.id} s={s}>
                  <button
                    disabled={done}
                    onClick={() => navigate(`/classroom/${classId}/evaluate/${s.id}`)}
                    className={cx(pill, done ? 'bg-[#f1efec] text-ink-muted active:scale-100' : 'bg-[#e2ffcf] text-[#1b6b34] hover:bg-[#d2f7ba]')}
                  >
                    {done ? t('Evaluated') : t('Evaluate')}
                  </button>
                </StudentRow>
              )
            })}
          </div>
        ) : (
          <div key="p" className="flex flex-col gap-3 pt-3">
            <button
              disabled={allNudged}
              onClick={nudgeAll}
              className="tap min-h-11 self-end rounded-full bg-brand-50 px-4 py-2 text-[0.8125rem] font-bold leading-[1.1875rem] text-brand-700 hover:bg-[#ffe8d4] disabled:opacity-50"
            >
              {allNudged ? t('Everyone nudged') : t('Nudge all')}
            </button>
            <div className="stagger flex flex-col gap-3">
              {pending.map((s) => {
                const done = !!nudged[s.id]
                return (
                  <StudentRow key={s.id} s={s}>
                    <button
                      disabled={done}
                      onClick={() => nudge(s)}
                      className={cx(pill, done ? 'bg-[#f1efec] text-ink-muted active:scale-100' : 'bg-[#ffd9b6] text-brand-700 hover:bg-[#ffcc9c]')}
                    >
                      <span key={String(done)} className="animate-fade-in">{done ? t('Nudged') : t('Nudge')}</span>
                    </button>
                  </StudentRow>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </Screen>
  )
}

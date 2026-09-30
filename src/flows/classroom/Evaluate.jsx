import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Screen, cx } from '../../components/ui.jsx'
import { useT } from '../../i18n/index.js'
import { EvalFooter, LeaveSheet, TickList } from '../../hpc/components.jsx'
import { Header, SectionLabel } from './parts.jsx'
import { RUBRIC, getStudents } from './data.js'
import { useClassroom, draftFor } from './store.js'

export function StudentCard({ student }) {
  const t = useT()
  return (
    <div className="p-3">
      <div className="rounded-[10px] border border-line bg-white p-4">
        <SectionLabel>{t('Student Details')}</SectionLabel>
        <p className="pt-2 text-[0.9375rem] font-bold leading-[1.375rem] text-ink">{student?.name}</p>
        <p className="pt-0.5 text-[0.8125rem] leading-[1.1875rem] text-ink-muted">{t('Student ID {id}', { id: student?.studentId })}</p>
      </div>
    </div>
  )
}

export function useStudent() {
  const { id } = useParams()
  const { classId, cls } = useClassroom()
  const students = useMemo(() => getStudents(classId, cls.students ?? 40), [classId, cls.students])
  return { classId, id, student: students.find((s) => s.id === id) || students[0] }
}

/** Figma 346:6854 / 346:6945 / 346:7042 / 346:7133 — rubric statements, one criterion per page. */
export default function Evaluate() {
  const navigate = useNavigate()
  const t = useT()
  const { classId, id, student } = useStudent()
  const draft = draftFor(classId, id)
  const [q, setQ] = useState(0)
  const [dir, setDir] = useState(1)
  const [ticks, setTicks] = useState(draft.ticks)
  const crit = RUBRIC[q]
  const picked = ticks[crit.id] || []
  const canNext = picked.length > 0
  const [leaving, setLeaving] = useState(false)
  const started = Object.values(ticks).some((v) => v?.length)
  const back = () => (started ? setLeaving(true) : navigate(-1))

  const setPicked = (next) => {
    const all = { ...ticks, [crit.id]: next }
    setTicks(all)
    draft.ticks = all
  }
  const go = (d) => {
    if (d > 0 && q === RUBRIC.length - 1) { navigate(`/classroom/${classId}/feedback/${id}`); return }
    setDir(d)
    setQ((x) => x + d)
  }

  return (
    <Screen statusBar="light"
      bg="plain"
      header={
        <>
          <Header heading title={t('Student Evaluation')} onBack={back} />
          <div className="shrink-0 bg-white px-4 py-3 shadow-[0_1px_1px_rgba(0,0,0,0.05)]">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <p className="shrink-0 text-[0.875rem] font-medium leading-5 text-ink-muted">{t('Question {n} of {total}', { n: q + 1, total: RUBRIC.length })}</p>
              <div aria-hidden="true" className="h-2 min-w-[min(6rem,100%)] flex-1 overflow-hidden rounded-full bg-[#ffd5b0]">
                <div className="h-full rounded-full bg-brand-bright transition-[width] duration-300 ease-out" style={{ width: `${((q + 1) / RUBRIC.length) * 100}%` }} />
              </div>
            </div>
          </div>
        </>
      }
      footer={
        <div className="border-t border-line bg-white">
          {/* Kit T09-06 / T10-10: white "Previous" pill + orange-outline "Next" pill */}
          <EvalFooter
            onPrev={() => go(-1)}
            prevDisabled={q === 0}
            onNext={() => go(1)}
            nextDisabled={!canNext}
            nextLabel={q === RUBRIC.length - 1 ? t('Continue') : t('Next')}
          />
          <LeaveSheet
            open={leaving}
            title={t('Leave this evaluation?')}
            body={t('Your ticks for {name} will be lost.', { name: student?.name ?? '' })}
            onStay={() => setLeaving(false)}
            onLeave={() => { Object.keys(ticks).forEach((k) => delete draft.ticks[k]); setLeaving(false); navigate(-1) }}
          />
        </div>
      }
    >
      <StudentCard student={student} />
      <div key={q} className={cx('p-4', dir > 0 ? 'animate-slide-in-right' : 'animate-slide-in-left')}>
        {/* Kit tick cards with a live "n of N ticked" count */}
        <TickList
          ability={crit.id}
          statements={crit.statements}
          value={picked}
          onChange={setPicked}
          prompt={t('Tick every statement that is true of this student’s work for {criterion}.', { criterion: t(crit.label) })}
        />
      </div>
    </Screen>
  )
}

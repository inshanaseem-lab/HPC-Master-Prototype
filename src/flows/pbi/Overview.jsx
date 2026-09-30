import { useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { Screen, BottomActions, PrimaryButton, cx } from '../../components/ui.jsx'
import { useAppStore } from '../../store/AppStore.jsx'
import { useT } from '../../i18n/index.js'
import { ABILITIES, LEVELS, PBI, OPEN_QUESTIONS, bandFor } from '../../hpc/config.js'
import { emit, learner, TEACHER } from '../../hpc/store.js'
import { AssessorTable, LevelBadge, OpenQuestion, LockNotice, EventNotice, LeaveSheet, ProvenanceChip, Icons } from '../../hpc/components.jsx'
import { useActivity, nameOf, scoresFor, stageStatus, reviewerOf } from './store.js'
import { useClassInfo, useShortDate, PbiAppBar, SectionLabel, Card, Field, useOnlineGuard } from './parts.jsx'

/** Overview (handbook Pages 9–10) for one learner: three assessors side by side, teacher picks the final level. */
export function PbiOverview() {
  const navigate = useNavigate()
  const t = useT()
  const short = useShortDate()
  const { showToast } = useAppStore()
  const guard = useOnlineGuard()
  const { studentId } = useParams()
  const { classId } = useClassInfo()
  const a = useActivity(classId)
  const saved = a?.learners[studentId]?.overview
  const [final, setFinal] = useState(() => saved?.final ?? {})
  const [comments, setComments] = useState(() => a?.learners[studentId]?.post?.teacherComments ?? '')
  const [tried, setTried] = useState(false)
  const [loading, setLoading] = useState(false)
  const [leave, setLeave] = useState(false)
  if (!a || !a.learners[studentId]) return <Navigate to={`/pbi/${classId}/progress?stage=overview`} replace />

  const l = a.learners[studentId]
  const locked = !!saved?.savedAt
  const ready = stageStatus(a, studentId, 'overview').submitted
  const { scores, max } = scoresFor(a, studentId)
  const reviewer = reviewerOf(a, studentId)
  const missing = ABILITIES.filter((ab) => !final[ab.id])
  const dirty = !locked && (Object.keys(final).length > 0 || comments.trim())

  const save = () => {
    if (missing.length || !comments.trim()) { setTried(true); return }
    if (!guard()) return
    setLoading(true)
    setTimeout(() => {
      emit(a.id, 'C.overview_saved', (x) => {
        const xl = x.learners[studentId]
        xl.overview = { final, savedAt: new Date().toISOString() }
        xl.post = { ...(xl.post ?? {}), teacherComments: comments.trim() }
      }, { by: TEACHER, target: studentId })
      showToast(t('Final levels saved for {name}', { name: nameOf(studentId) }))
      navigate(`/pbi/${classId}/progress?stage=overview`, { replace: true })
    }, 600)
  }

  return (
    <Screen
      bg="plain"
      statusBar="light"
      header={<PbiAppBar title={t('Overview · {name}', { name: nameOf(studentId) })} subtitle={t('Student ID {id}', { id: learner(studentId)?.studentId })} onBack={() => (dirty ? setLeave(true) : navigate(-1))} />}
      footer={!locked && ready && (
        <BottomActions className="border-t border-line bg-surface">
          <PrimaryButton loading={loading} onClick={save}>{t('Save final levels')}</PrimaryButton>
        </BottomActions>
      )}
    >
      <div className="stagger flex flex-col gap-4 p-4 pb-8">
        {locked && <LockNotice>{t('Final levels saved on {date}. They can’t be edited.', { date: short(saved.savedAt) })}</LockNotice>}
        {!ready && <EventNotice tone="info" title={t('Not ready for the Overview')}>{t('Assess {name}’s Stage 3 revised draft first.', { name: nameOf(studentId) })}</EventNotice>}

        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <SectionLabel className="flex-1">{t('Scores by assessor')}</SectionLabel>
            <OpenQuestion code="OQ-SEC-3" text={OPEN_QUESTIONS['OQ-SEC-3']} />
            <OpenQuestion code="OQ-SEC-11" text={OPEN_QUESTIONS['OQ-SEC-11']} />
          </div>
          <AssessorTable instrument="C" scores={scores} max={max} />
          <p className="text-[0.75rem] leading-[1.125rem] text-ink-muted">
            {t('Teacher = Stage 1 + 2 + 3 ticks. Learner = Stage 1 + 2 reflection ticks. Peer = Stage 3 ticks from {name}.', { name: reviewer ? nameOf(reviewer) : t('the paired reviewer') })}
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <SectionLabel className="flex-1">{t('Final level · you decide')}</SectionLabel>
            <OpenQuestion code="OQ-FINAL" text={OPEN_QUESTIONS['OQ-FINAL']} />
          </div>
          {ABILITIES.map((ab) => {
            const Icon = Icons[ab.icon]
            const bad = tried && !final[ab.id]
            return (
              <Card key={ab.id} className={cx('flex flex-col gap-3', bad && 'animate-shake border-danger')}>
                <p className="flex items-center gap-1.5 text-[0.75rem] font-bold uppercase tracking-[0.96px] text-brand-600"><Icon width="16" height="16" /> {t(ab.label)}</p>
                <div className="flex flex-col gap-1.5">
                  {[['teacher', 'Teacher'], ['learner', 'Learner'], ['peer', 'Peer']].map(([k, label]) => {
                    const sc = scores[k][ab.id]
                    return (
                      <div key={k} className="flex flex-wrap items-center justify-between gap-2">
                        <ProvenanceChip kind={k === 'learner' ? 'student' : k}>{t(label)}</ProvenanceChip>
                        {sc == null ? <span className="text-[0.8125rem] text-ink-muted">{t('Not given')}</span> : (
                          <span className="flex flex-wrap items-center gap-2 text-[0.8125rem] text-ink-2">{sc} / {max[k][ab.id]} <LevelBadge level={bandFor('C', k, sc).id} /></span>
                        )}
                      </div>
                    )
                  })}
                </div>
                <div role="radiogroup" aria-label={t('Final level for {ability}', { ability: t(ab.label) })} className="grid grid-cols-3 gap-2 pt-1">
                  {LEVELS.map((lv) => {
                    const on = final[ab.id] === lv.id
                    return (
                      <button key={lv.id} type="button" role="radio" aria-checked={on} disabled={locked || !ready}
                        onClick={() => setFinal({ ...final, [ab.id]: lv.id })}
                        className={cx('tap min-h-12 min-w-0 break-words rounded-full border px-2 py-1.5 text-[0.8125rem] font-semibold leading-[1.125rem] transition-colors', on ? 'border-brand bg-brand text-white' : 'border-line bg-white text-ink-2 hover:bg-cream', (locked || !ready) && !on && 'opacity-60')}>
                        {t(lv.label)}
                      </button>
                    )
                  })}
                </div>
                {bad && <p className="text-[0.75rem] text-danger">{t('Pick a final level.')}</p>}
              </Card>
            )
          })}
        </div>

        <Card className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center justify-between gap-2"><SectionLabel>{t('Post-inquiry reflection')}</SectionLabel><ProvenanceChip kind="student" /></div>
          {l.post?.savedAt ? PBI.postReflection.map((q) => (
            <div key={q}>
              <p className="text-[0.8125rem] font-semibold text-ink-muted">{t(q)}</p>
              <p className="pt-0.5 text-[0.9375rem] leading-[1.375rem] text-ink">{l.post.answers?.[q] ? t(l.post.answers[q]) : '—'}</p>
            </div>
          )) : <p className="text-[0.875rem] text-ink-muted">{t('The learner hasn’t submitted the post-inquiry reflection yet.')}</p>}
        </Card>

        <Card className="flex flex-col gap-2">
          <div className="flex flex-wrap items-center justify-between gap-2"><SectionLabel>{t('Final comments')}</SectionLabel><ProvenanceChip kind="teacher" /></div>
          <Field value={comments} onChange={setComments} readOnly={locked || !ready} max={600} rows={4} placeholder={t('e.g. Riya asked sharp questions and listened well to her partner’s review.')} invalid={tried && !comments.trim()} error={t('Add your final comments.')} />
        </Card>
      </div>
      <LeaveSheet open={leave} title={t('Leave the Overview?')} body={t('The levels and comments you entered will be lost.')} onStay={() => setLeave(false)} onLeave={() => navigate(-1)} />
    </Screen>
  )
}

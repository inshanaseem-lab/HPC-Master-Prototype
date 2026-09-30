import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { BottomActions, PrimaryButton, Screen } from '../../components/ui.jsx'
import { useAppStore } from '../../store/AppStore.jsx'
import { useT } from '../../i18n/index.js'
import { GROUP_PROJECT } from '../../hpc/config.js'
import { LeaveSheet, LockNotice, ProvenanceChip } from '../../hpc/components.jsx'
import { emit, groupOf, nameOf, postSubmitted, saveWithGuard, useDraft } from './lib.js'
import { AppBar, Card, Field, NoActivityRedirect, SectionLabel, groupLabel, useBPage } from './parts.jsx'

/**
 * Post-project (Page 8): the learner's reflection (read-only, incl. "feedback for the teacher")
 * and the teacher's final comments. Teacher comments are saved on learners[id].post.teacherComments
 * (+ teacherCommentedAt) with event 'B.post.teacher_commented'.
 */
export default function PostProject() {
  const { classId, learnerId, a, base } = useBPage()
  const navigate = useNavigate()
  const t = useT()
  const { showToast } = useAppStore()
  const [text, setText, clearDraft, dirty] = useDraft(`${a?.id}:post:${learnerId}`, '')
  const [error, setError] = useState(0)
  const [loading, setLoading] = useState(false)
  const [leave, setLeave] = useState(false)

  if (!a) return <NoActivityRedirect classId={classId} />
  const l = a.learners?.[learnerId]
  const group = groupOf(a, learnerId)
  if (!l || !group) return <Navigate to={base} replace />
  const name = nameOf(a, learnerId)
  const post = l.post ?? {}
  const submitted = postSubmitted(post)
  const saved = !!post.teacherCommentedAt
  const back = () => navigate(`${base}/overview/${learnerId}`)
  const prompts = GROUP_PROJECT.postReflection
  const teacherPrompt = prompts[prompts.length - 1]

  const save = () => {
    if (!text.trim()) { setError((n) => n + 1); return }
    saveWithGuard({
      setLoading, showToast, t,
      run: () => {
        emit(a.id, 'B.post.teacher_commented', (x) => {
          x.learners[learnerId].post = { ...(x.learners[learnerId].post ?? {}), teacherComments: text.trim(), teacherCommentedAt: new Date().toISOString() }
        }, { target: learnerId })
        clearDraft()
        showToast(t('Final comments saved for {name}', { name }))
      },
    })
  }

  return (
    <Screen
      bg="plain"
      header={<AppBar title={t('Post-project · {name}', { name })} subtitle={groupLabel(t, group.name)} onBack={() => (!saved && dirty && text ? setLeave(true) : back())} />}
      footer={!saved && <BottomActions><PrimaryButton className="font-semibold" loading={loading} onClick={save}>{t('Save final comments')}</PrimaryButton></BottomActions>}
    >
      <div className="stagger flex flex-col gap-4 p-4 pb-8">
        <Card>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <SectionLabel>{t('Learner’s post-project reflection')}</SectionLabel>
            <ProvenanceChip kind="student" />
          </div>
          {!submitted ? (
            <p className="pt-2 text-[0.875rem] leading-5 text-ink-muted">{t('{name} has not submitted the post-project reflection yet. You can still write your final comments.', { name })}</p>
          ) : (
            <div className="flex flex-col gap-3 pt-3">
              {prompts.filter((p) => p !== teacherPrompt).map((p) => (
                <div key={p}>
                  <p className="text-[0.8125rem] font-semibold leading-[1.1875rem] text-ink">{t(p)}</p>
                  <p className="whitespace-pre-wrap pt-0.5 text-[0.875rem] leading-5 text-ink-2">{post.answers?.[p] || '—'}</p>
                </div>
              ))}
            </div>
          )}
        </Card>

        {submitted && (
          <Card className="border-[#c9d8f2] bg-[#f5f8fe]">
            <SectionLabel className="!text-[#2f4fb3]">{t('Feedback for the teacher')}</SectionLabel>
            <p className="pt-1 text-[0.8125rem] font-semibold leading-[1.1875rem] text-ink">{t(teacherPrompt)}</p>
            <p className="whitespace-pre-wrap pt-0.5 text-[0.875rem] leading-5 text-ink-2">{post.answers?.[teacherPrompt] || '—'}</p>
          </Card>
        )}

        <Card className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center justify-between gap-2"><SectionLabel>{t('Your final comments')}</SectionLabel><ProvenanceChip kind="teacher" /></div>
          {saved && <LockNotice>{t('Final comments saved. They can’t be edited.')}</LockNotice>}
          <Field id="final" key={`f${error}`} label={t('Final comments for {name}', { name })} hint={t('Shown on the learner’s HPC for this project.')} rows={5}
            value={saved ? post.teacherComments : text} onChange={setText} readOnly={saved}
            placeholder={t('e.g. You grew as a planner and a team member. Keep asking questions like you did in Stage 1.')}
            error={error && !text.trim() ? t('Write your final comments before saving.') : null} />
        </Card>
      </div>
      <LeaveSheet open={leave} title={t('Leave without saving?')} body={t('Your comments will be lost.')} onStay={() => setLeave(false)} onLeave={() => { clearDraft(); setLeave(false); back() }} />
    </Screen>
  )
}

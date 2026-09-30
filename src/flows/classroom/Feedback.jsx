import { useId, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Screen, PrimaryButton, BottomActions, cx } from '../../components/ui.jsx'
import { useT } from '../../i18n/index.js'
import { Header } from './parts.jsx'
import { useStudent } from './Evaluate.jsx'
import { draftFor, saveEvaluation, drafts } from './store.js'

const field =
  'w-full resize-none rounded-lg border bg-white px-3 py-3 text-[1rem] leading-6 text-ink outline-none transition-colors duration-200 placeholder:text-[#a7a4ac] focus:border-brand focus:ring-2 focus:ring-brand/15'

/** Figma 346:6803 — written feedback + optional pedagogical intervention, then save. */
export default function Feedback() {
  const navigate = useNavigate()
  const t = useT()
  const { classId, id } = useStudent()
  const draft = draftFor(classId, id)
  const [feedback, setFeedback] = useState(draft.feedback)
  const [intervention, setIntervention] = useState(draft.intervention)
  const [error, setError] = useState(false)
  const [shake, setShake] = useState(0)
  const [saving, setSaving] = useState(false)
  const fid = useId()

  const save = () => {
    if (!feedback.trim()) { setError(true); setShake((n) => n + 1); return }
    setSaving(true)
    setTimeout(() => {
      saveEvaluation(classId, id, { ticks: draft.ticks, feedback: feedback.trim(), intervention: intervention.trim(), at: Date.now() })
      delete drafts[`${classId}/${id}`]
      navigate(`/classroom/${classId}/evaluated/${id}`, { replace: true })
    }, 600)
  }

  return (
    <Screen statusBar="light" bg="plain" header={<Header heading title={t('Student Evaluation')} />}
      footer={
        <BottomActions className="border-t border-line bg-white">
          <PrimaryButton className="font-bold" disabled={!feedback.trim()} loading={saving} onClick={save}>{t('Save evaluation')}</PrimaryButton>
        </BottomActions>
      }
    >
      <div className="stagger flex flex-col gap-4 p-4">
        <div className="flex flex-col gap-3">
          <div>
            <label htmlFor={`${fid}-fb`} className="block text-[1.125rem] font-semibold leading-6 text-ink">{t('Feedback for the student')}</label>
            <p id={`${fid}-fb-hint`} className="pt-1 text-[0.8125rem] leading-[1.1875rem] text-ink-muted">{t('They will see this once it is released.')}</p>
          </div>
          <textarea
            key={shake}
            id={`${fid}-fb`}
            aria-describedby={`${fid}-fb-hint${error ? ` ${fid}-fb-err` : ''}`}
            aria-invalid={error || undefined}
            aria-required="true"
            rows={3}
            value={feedback}
            onChange={(e) => { setFeedback(e.target.value); draft.feedback = e.target.value; if (e.target.value.trim()) setError(false) }}
            onBlur={() => { if (!feedback.trim()) { setError(true); setShake((n) => n + 1) } }}
            placeholder={t('e.g. Good, clear plan and you have chosen a real problem.')}
            className={cx(field, error ? 'animate-shake border-danger' : 'border-line')}
          />
          {error && <p id={`${fid}-fb-err`} role="alert" className="-mt-1 animate-fade-in text-[0.8125rem] leading-[1.1875rem] text-danger">{t('Write a short note for the student before saving.')}</p>}
        </div>

        <div className="flex flex-col gap-3">
          <div>
            <label htmlFor={`${fid}-pi`} className="block text-[1.125rem] font-semibold leading-6 text-ink">{t('Pedagogical intervention')}</label>
            <p id={`${fid}-pi-hint`} className="pt-1 text-[0.8125rem] leading-[1.1875rem] text-ink-muted">{t('Optional. For your record and the HPC — not shown to students.')}</p>
          </div>
          <textarea
            id={`${fid}-pi`}
            aria-describedby={`${fid}-pi-hint`}
            rows={2}
            value={intervention}
            onChange={(e) => { setIntervention(e.target.value); draft.intervention = e.target.value }}
            placeholder={t('e.g. will sit with this group to model note-taking')}
            className={cx(field, 'border-line')}
          />
        </div>

        <div className="rounded-lg border border-dashed border-[#a34d00] bg-[#fff2e6] px-3.5 py-3 text-[0.8125rem] leading-[1.1875rem] text-brand-700">
          {t('Once saved, an evaluation cannot be edited.')}
        </div>
      </div>
    </Screen>
  )
}

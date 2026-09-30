import { useEffect, useRef, useState } from 'react'
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom'
import { OutlineButton, PrimaryButton, Screen, Sheet, cx } from '../../components/ui.jsx'
import { useDate, useT } from '../../i18n/index.js'
import { useAppStore } from '../../store/AppStore.jsx'
import { useStudentState, updateActivity } from '../../student/store.js'
import { MAX_BYTES, MAX_FILES, PBI_REFLECTION, formatSize, isSupported, nowLabel, todayLabel } from './data.js'
import HandbookRow from '../../student/HandbookRow.jsx'
import Missed from './Missed.jsx'
import {
  ActionSheet, ActivityHead, Alert, AppBar, Badge, CameraIcon, CheckIcon, DeadlineCard, FileIcon, Footer, InfoCard,
  LinkIcon, OptionCard, PrevNext, ProgressBar, SectionLabel, SmallButton, StepRow, SuccessBody, TextLink, TrashIcon,
  UploadIcon, shouldFailOnce, useGoBack,
} from './parts.jsx'

/* Object URLs created in this browser session (older saved ones are dead after a reload). */
const liveUrls = new Set()
let uid = 0
const REFLECTION_MIN = 4
const isValidLink = (s) => /^(https?:\/\/)?[\w-]+(\.[\w-]+)+(\/\S*)?$/i.test(s.trim())

function usePbi() {
  const { id } = useParams()
  const { activities } = useStudentState()
  return { id, a: activities.find((x) => x.id === id) }
}

function subtitleOf(a, t) {
  if (a.individual) return t('Individual · Teacher: {name}', { name: a.teacher })
  return a.teacher ? t('Teacher: {name}', { name: a.teacher }) : null
}

function useOpenFile() {
  const t = useT()
  const { showToast } = useAppStore()
  return (f) => {
    if (f.url && liveUrls.has(f.url)) window.open(f.url, '_blank', 'noopener')
    else showToast(t('Preview isn’t available in this demo'))
  }
}

function Thumb({ file, error }) {
  const [broken, setBroken] = useState(false)
  if (file.type?.startsWith('image/') && file.url && liveUrls.has(file.url) && !broken) {
    return <img src={file.url} alt="" onError={() => setBroken(true)} className="size-10 shrink-0 rounded-lg object-cover ring-1 ring-line" />
  }
  return (
    <span className={cx('grid size-10 shrink-0 place-items-center rounded-lg', error ? 'bg-white/70 text-[#b54a45]' : 'bg-brand-50 text-[#ff7900]')}>
      <FileIcon />
    </span>
  )
}

/* =============================================== /s/pbi/:id by state */

export function PbiActivity() {
  const { id, a } = usePbi()
  if (!a || a.section !== 'C') return <Navigate to="/s/home" replace />
  if (a.state === 'missed') return <Missed activity={a} />
  if (a.state === 'done') return <Navigate to={`/s/completed/${id}`} replace />
  if (a.state === 'submitted') return <PbiComingBack a={a} />
  return <PbiLive a={a} />
}

function PbiShell({ a, children, footer }) {
  const t = useT()
  return (
    <Screen bg="plain" statusBar="light" header={<AppBar title={t('Problem Based Enquiry')} />} footer={footer}>
      <div className="stagger flex flex-col gap-5 px-4 pb-8 pt-4">
        <ActivityHead letter="C" title={t(a.title)} subtitle={subtitleOf(a, t)} />
        <DeadlineCard deadline={a.deadline} />
        {children}
      </div>
    </Screen>
  )
}

/* ------------------------------------------------------ 6.1 Live · steps */

function PbiLive({ a }) {
  const t = useT()
  const navigate = useNavigate()
  const { search } = useLocation()
  const draft = a.state === 'draft'
  const nFiles = (a.files ?? []).length
  const add = () => navigate(`/s/pbi/${a.id}/add${search}`)

  return (
    <PbiShell a={a}>
      <div className="flex flex-col gap-2">
        <SectionLabel>{t('Your steps')}</SectionLabel>
        <StepRow
          n={1}
          status="current"
          title={t('Submission')}
          desc={
            draft
              ? nFiles === 1 ? t('Draft saved · 1 file') : t('Draft saved · {n} files', { n: nFiles })
              : t('Add work → check → submit')
          }
          action={<SmallButton onClick={add}>{draft ? t('Continue') : t('Submit')}</SmallButton>}
        />
        <StepRow n={2} status="locked" title={t('Self-reflection')} desc={t('Opens after you submit')} action={<Badge>{t('Locked')}</Badge>} />
      </div>
      <InfoCard label={t('Why this matters')}>
        {t(a.why ?? 'Solving a real problem on your own helps you research, think creatively and explain your ideas clearly.')}
      </InfoCard>
      <InfoCard label={t('Before you start')}>
        {t('The problem and steps are in the student handbook. This is your own work. Once you submit, you can’t edit it.')}
      </InfoCard>
      {a.handbook !== false && <HandbookRow />}
    </PbiShell>
  )
}

/* ---------------------------------------------------- 6.5 Coming back later */

function PbiComingBack({ a }) {
  const t = useT()
  const d = useDate()
  const navigate = useNavigate()
  const openFile = useOpenFile()
  const [view, setView] = useState(false)
  const files = a.files ?? []
  const at = d(a.submittedAt ?? a.submittedOn ?? '')
  const summary = files.length === 1 ? t('1 file · {at}', { at }) : t('{n} files · {at}', { n: files.length, at })

  return (
    <PbiShell a={a}>
      <div className="flex flex-col gap-2.5 rounded-2xl border border-[#e5e6e1] bg-white p-4">
        <p className="text-[0.75rem] font-bold uppercase leading-4 tracking-[0.96px] text-ink-muted">{t('Submission')}</p>
        <p className="text-[0.9375rem] font-semibold leading-[1.375rem] text-ink">{t('Submitted by you')}</p>
        <p className="text-[0.8125rem] leading-[1.1875rem] text-ink-muted">{files.length ? summary : at}</p>
        {files.map((f) => (
          <div key={f.id} className="flex flex-wrap items-center gap-2.5 rounded-[10px] border border-line px-3 py-2.5">
            <span className="shrink-0 text-[#ff7900]"><FileIcon /></span>
            <span className="min-w-[min(8rem,100%)] flex-1 break-words text-[0.8125rem] font-medium leading-[1.1875rem] text-ink">{f.name}</span>
            <TextLink onClick={() => openFile(f)}>{t('View')}</TextLink>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-2">
        <SectionLabel>{t('Your steps')}</SectionLabel>
        <StepRow
          n={1}
          status="done"
          title={t('Submission')}
          desc={t('Submitted {at}', { at })}
          action={<TextLink onClick={() => setView(true)}>{t('View')}</TextLink>}
        />
        <StepRow
          n={2}
          status="current"
          title={t('Self-reflection')}
          desc={t('{n} questions · about {m} min', { n: PBI_REFLECTION.length, m: REFLECTION_MIN })}
          action={<SmallButton onClick={() => navigate(`/s/pbi/${a.id}/reflect`)}>{t('Start')}</SmallButton>}
        />
      </div>

      <Sheet open={view} onClose={() => setView(false)}>
        <div className="flex flex-col gap-4 px-4 pb-6 pt-5">
          <p className="text-[1.125rem] font-semibold leading-6 text-ink">{t('Your submission')}</p>
          <SubmissionSummary a={a} />
          <OutlineButton onClick={() => setView(false)} className="text-[0.9375rem]">{t('Close')}</OutlineButton>
        </div>
      </Sheet>
    </PbiShell>
  )
}

function SubmissionSummary({ a }) {
  const t = useT()
  const files = a.files ?? []
  const rows = [
    files.length > 0 && { label: t('Files'), value: files.map((f) => f.name).join(', ') },
    a.link && { label: t('Link'), value: a.link },
    a.description && { label: t('Description'), value: a.description },
  ].filter(Boolean)
  return (
    <div className="flex flex-col rounded-2xl border border-[#e5e6e1] bg-white">
      {rows.map((r, i) => (
        <div key={r.label} className={cx('flex flex-col gap-1 px-4 py-3.5', i < rows.length - 1 && 'border-b border-[#f1efec]')}>
          <span className="text-[0.8125rem] leading-[1.1875rem] text-ink-muted">{r.label}</span>
          <span className="break-words text-[0.9375rem] font-semibold leading-[1.375rem] text-ink">{r.value}</span>
        </div>
      ))}
    </div>
  )
}

/* ------------------------------------------------ 6.2 Add work (+ 11.1) */

export function PbiAdd() {
  const t = useT()
  const navigate = useNavigate()
  const goBack = useGoBack()
  const { search } = useLocation()
  const { showToast } = useAppStore()
  const { id, a } = usePbi()

  const [files, setFiles] = useState(() => (a?.files ?? []).map((f) => ({ ...f, progress: 100, error: null })))
  const [link, setLink] = useState(a?.link ?? '')
  const [description, setDescription] = useState(a?.description ?? '')
  const [tried, setTried] = useState(false)
  const [shake, setShake] = useState(0)
  const deviceRef = useRef(null)
  const cameraRef = useRef(null)

  const uploading = files.some((f) => !f.error && f.progress < 100)
  useEffect(() => {
    if (!uploading) return
    const timer = setInterval(() => {
      setFiles((fs) =>
        fs.map((f) => {
          if (f.error || f.progress >= 100) return f
          const p = Math.min(100, f.progress + 8 + Math.random() * 14)
          if (f.willFail && p >= 55) return { ...f, progress: 55, error: 'upload', willFail: false }
          return { ...f, progress: p }
        }),
      )
    }, 110)
    return () => clearInterval(timer)
  }, [uploading])

  if (!a || a.section !== 'C') return <Navigate to="/s/home" replace />
  if (!['live', 'draft'].includes(a.state)) return <Navigate to={`/s/pbi/${id}`} replace />

  const onFiles = (e) => {
    const list = Array.from(e.target.files || [])
    e.target.value = ''
    if (!list.length) return
    const room = MAX_FILES - files.length
    if (list.length > room) showToast(t('You can add up to {n} files', { n: MAX_FILES }), 'error')
    const added = list.slice(0, Math.max(0, room)).map((f) => {
      const url = URL.createObjectURL(f)
      liveUrls.add(url)
      const base = { id: `f${Date.now()}-${++uid}`, name: f.name, size: f.size, type: f.type || '', url, progress: 0, error: null }
      if (!isSupported(f)) return { ...base, progress: 100, error: 'format' }
      if (f.size > MAX_BYTES) return { ...base, progress: 100, error: 'size' }
      const willFail = /fail/i.test(f.name) || shouldFailOnce(search, 'upload', `upload:${id}`)
      return { ...base, willFail }
    })
    setFiles((fs) => [...fs, ...added])
  }
  const remove = (fid) => setFiles((fs) => fs.filter((f) => f.id !== fid))
  const retry = (fid) => setFiles((fs) => fs.map((f) => (f.id === fid ? { ...f, error: null, progress: 0, willFail: false } : f)))

  const bad = files.filter((f) => f.error)
  const good = files.filter((f) => !f.error && f.progress >= 100)
  const linkError = link.trim() !== '' && !isValidLink(link)
  const needWork = good.length === 0 && !(link.trim() && !linkError)
  const descError = description.trim() === ''
  const valid = !uploading && bad.length === 0 && !needWork && !linkError && !descError

  const clean = () => good.map(({ id: fid, name, size, type, url }) => ({ id: fid, name, size, type, url }))
  const fields = () => ({ files: clean(), link: linkError ? '' : link.trim(), description: description.trim() })

  const next = () => {
    setTried(true)
    if (!valid) { setShake((s) => s + 1); return }
    updateActivity(id, fields())
    navigate(`/s/pbi/${id}/confirm${search}`)
  }
  const saveDraft = () => {
    updateActivity(id, { state: 'draft', ...fields() })
    showToast(t('Draft saved'))
    goBack(`/s/pbi/${id}`)
  }

  const errorText = (f) =>
    f.error === 'size' ? t('{size} · Too large. Max 10 MB.', { size: formatSize(f.size) })
      : f.error === 'format' ? t('Format not supported')
        : t('Upload failed. Check your internet.')

  return (
    <Screen
      bg="plain"
      statusBar="light"
      header={<AppBar title={t('Submit Your Work')} right={t('{n} of {total}', { n: 1, total: 2 })} onBack={() => goBack(`/s/pbi/${id}`)} />}
      footer={
        <Footer>
          <>
            <PrimaryButton onClick={next}>{t('Continue')}</PrimaryButton>
            <OutlineButton onClick={saveDraft} disabled={uploading} className={cx('text-[0.9375rem]', uploading && 'pointer-events-none opacity-50')}>
              {t('Save Draft')}
            </OutlineButton>
          </>
        </Footer>
      }
    >
      <input ref={deviceRef} type="file" multiple accept="image/*,application/pdf,video/*,.doc,.docx,.ppt,.pptx" className="hidden" onChange={onFiles} />
      <input ref={cameraRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={onFiles} />

      <div className="flex flex-col gap-5 px-4 pb-8 pt-4">
        <div className="animate-fade-up">
          <h1 className="text-[1.5rem] font-semibold leading-[1.875rem] text-ink">{t('Add your work')}</h1>
          <p className="py-1 text-[0.8125rem] leading-[1.1875rem] text-ink-muted">{t('Photos, PDF, DOC or PPT. Up to 5 files, 10 MB each.')}</p>
        </div>

        {files.length < MAX_FILES && (
          <div
            key={`drop-${tried && needWork ? shake : 0}`}
            className={cx(
              'flex flex-col items-center gap-2 rounded-2xl border border-dashed px-4 py-5 text-center transition-colors',
              tried && needWork ? 'animate-shake border-[#e3a8a5] bg-[#fbedec]' : 'border-[#cdcac5] bg-[#f1efec]',
            )}
          >
            <button
              type="button"
              onClick={() => deviceRef.current?.click()}
              className="tap flex flex-col items-center gap-2 rounded-xl px-6 py-1"
            >
              <span className="grid size-11 place-items-center rounded-xl bg-white text-[#ff7900] shadow-[inset_0_0_0_1px_#e4e1dd]">
                <UploadIcon size={22} />
              </span>
              <span className="text-[0.875rem] font-semibold leading-5 text-ink">{t('Tap to upload')}</span>
            </button>
            <button
              type="button"
              onClick={() => cameraRef.current?.click()}
              className="tap flex min-h-11 items-center gap-1.5 rounded-full px-3 py-1 text-[0.75rem] leading-[1.125rem] text-ink-muted hover:bg-black/5 hover:text-ink"
            >
              <CameraIcon size={14} />
              {t('or take a photo')}
            </button>
          </div>
        )}

        {files.length > 0 && (
          <div className="stagger flex flex-col gap-2">
            {files.map((f) => (
              <div
                key={f.id}
                className={cx(
                  'flex flex-wrap items-center gap-3 rounded-[10px] border px-3.5 py-3 transition-colors',
                  f.error ? 'border-[#e3a8a5] bg-[#fbedec]' : 'border-line bg-white',
                )}
              >
                <Thumb file={f} error={f.error} />
                <span className="flex min-w-[min(8rem,100%)] flex-1 flex-col">
                  <span className="break-words text-[0.875rem] font-semibold leading-5 text-ink">{f.name}</span>
                  {f.error ? (
                    <span className="text-[0.75rem] leading-[1.125rem] text-[#b54a45]">{errorText(f)}</span>
                  ) : f.progress < 100 ? (
                    <span className="flex items-center gap-2 pt-1">
                      <span className="h-1 flex-1 overflow-hidden rounded-full bg-[#ece9e5]">
                        <span className="block h-full rounded-full bg-brand transition-[width] duration-100" style={{ width: `${f.progress}%` }} />
                      </span>
                      <span className="text-[0.75rem] leading-4 text-ink-muted">{Math.round(f.progress)}%</span>
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-[0.75rem] leading-[1.125rem] text-ink-muted">
                      {formatSize(f.size)}
                      <span className="animate-check-pop text-[#1b6b34]"><CheckIcon size={12} /></span>
                    </span>
                  )}
                </span>
                {f.error === 'upload' && <TextLink onClick={() => retry(f.id)}>{t('Retry')}</TextLink>}
                <button
                  type="button"
                  aria-label={t('Remove {name}', { name: f.name })}
                  onClick={() => remove(f.id)}
                  className="tap -my-1 grid size-11 shrink-0 place-items-center rounded-lg text-ink-muted hover:bg-black/5 hover:text-[#b54a45]"
                >
                  <TrashIcon size={18} />
                </button>
              </div>
            ))}
          </div>
        )}

        {bad.length > 0 && (
          <Alert key={`bad-${shake}`} className={cx('animate-fade-up', shake > 0 && 'animate-shake')}>
            {bad.length === 1
              ? t('1 file couldn’t be added. Remove it or try again to continue.')
              : t('{n} files couldn’t be added. Remove them to continue.', { n: bad.length })}
          </Alert>
        )}
        {tried && needWork && bad.length === 0 && (
          <p className="-mt-3 text-[0.75rem] leading-4 text-[#b54a45]">{t('Add at least one file or a link.')}</p>
        )}

        <label className="flex flex-col gap-1.5">
          <span className="text-[0.8125rem] font-medium leading-[1.1875rem] text-ink">{t('Link (optional)')}</span>
          <span className="relative">
            <span className="pointer-events-none absolute left-[15px] top-1/2 -translate-y-1/2 text-ink-muted"><LinkIcon size={18} /></span>
            <input
              type="url"
              inputMode="url"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder={t('Paste a video or document link')}
              className={cx(
                'min-h-[50px] w-full rounded-lg border bg-white pl-11 pr-[15px] text-[0.875rem] leading-5 text-ink outline-none transition-colors placeholder:text-[#a7a4ac] focus:border-brand',
                linkError && tried ? 'border-[#b54a45]' : 'border-line',
              )}
            />
          </span>
          {linkError && tried && <span className="text-[0.75rem] leading-4 text-[#b54a45]">{t('Enter a valid link')}</span>}
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-[0.8125rem] font-medium leading-[1.1875rem] text-ink">{t('Describe your solution')}</span>
          <textarea
            key={`desc-${tried && descError ? shake : 0}`}
            value={description}
            onChange={(e) => setDescription(e.target.value.slice(0, 500))}
            placeholder={t('What is the problem, and how does your idea solve it?')}
            rows={3}
            className={cx(
              'min-h-[80px] w-full resize-none rounded-lg border bg-white px-[15px] py-3.5 text-[0.875rem] leading-5 text-ink outline-none transition-colors placeholder:text-[#a7a4ac] focus:border-brand',
              tried && descError ? 'animate-shake border-[#b54a45]' : 'border-line',
            )}
          />
          {tried && descError && <span className="text-[0.75rem] leading-4 text-[#b54a45]">{t('Write a short description of your solution.')}</span>}
        </label>
      </div>
    </Screen>
  )
}

/* ---------------------------------------------- 6.3 Confirm (+ 11.2) */

export function PbiConfirm() {
  const t = useT()
  const navigate = useNavigate()
  const { search } = useLocation()
  const { id, a } = usePbi()
  const [agree, setAgree] = useState(false)
  const [loading, setLoading] = useState(false)
  const [failed, setFailed] = useState(false)

  if (!a || a.section !== 'C') return <Navigate to="/s/home" replace />
  if (!['live', 'draft'].includes(a.state)) return <Navigate to={`/s/pbi/${id}`} replace />
  if (!(a.files?.length || a.link) || !a.description) return <Navigate to={`/s/pbi/${id}/add${search}`} replace />

  const submit = () => {
    setFailed(false)
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      if ((typeof navigator !== 'undefined' && navigator.onLine === false) || shouldFailOnce(search, 'submit', `pbi:${id}`)) {
        setFailed(true)
        return
      }
      updateActivity(id, { state: 'submitted', submittedOn: todayLabel(), submittedAt: nowLabel() })
      navigate(`/s/pbi/${id}/submitted`, { replace: true })
    }, 650)
  }

  return (
    <Screen
      bg="plain"
      statusBar="light"
      header={<AppBar title={t('Submit Your Work')} right={t('{n} of {total}', { n: 2, total: 2 })} />}
      footer={
        <Footer>
          <PrimaryButton onClick={submit} disabled={!agree} loading={loading}>{t('Confirm and Submit')}</PrimaryButton>
        </Footer>
      }
    >
      <div className="stagger flex flex-col gap-5 px-4 pb-8 pt-4">
        <div>
          <h1 className="text-[1.5rem] font-semibold leading-[1.875rem] text-ink">{t('Check before submitting')}</h1>
          <p className="py-1 text-[0.8125rem] leading-[1.1875rem] text-ink-muted">{t('You can’t edit your work after you submit.')}</p>
        </div>
        <SubmissionSummary a={a} />
        <button
          type="button"
          role="checkbox"
          aria-checked={agree}
          onClick={() => setAgree((v) => !v)}
          className="tap-soft flex min-h-11 items-center gap-2.5 self-start rounded-lg py-1.5 pr-2 text-left"
        >
          <span
            className={cx(
              'grid size-5 shrink-0 place-items-center rounded border transition-colors',
              agree ? 'border-brand bg-brand text-white' : 'border-[#cdcac5] bg-white',
            )}
          >
            {agree && <span className="animate-check-pop"><CheckIcon size={12} /></span>}
          </span>
          <span className="text-[0.8125rem] leading-[1.1875rem] text-ink">{t('I confirm this is my own work.')}</span>
        </button>
      </div>

      <ActionSheet
        open={failed}
        onClose={() => setFailed(false)}
        icon
        title={t('Couldn’t submit')}
        body={t('Check your internet connection and try again. Your work is still here.')}
        primary={t('Try Again')}
        onPrimary={submit}
        secondary={t('Cancel')}
        onSecondary={() => setFailed(false)}
      />
    </Screen>
  )
}

/* ------------------------------------------------ 6.4 Submission done */

export function PbiSubmitted() {
  const t = useT()
  const d = useDate()
  const navigate = useNavigate()
  const { id, a } = usePbi()
  if (!a) return <Navigate to="/s/home" replace />
  return (
    <Screen
      bg="plain"
      statusBar="light"
      footer={
        <Footer>
          <>
            <PrimaryButton onClick={() => navigate(`/s/pbi/${id}/reflect`, { replace: true })}>{t('Continue')}</PrimaryButton>
            <OutlineButton onClick={() => navigate('/s/home', { replace: true })} className="text-[0.9375rem]">{t('I Will Do This Later')}</OutlineButton>
          </>
        </Footer>
      }
    >
      <SuccessBody
        title={t('Work submitted')}
        body={t('{teacher} will evaluate your work. You can do your self-reflection now or later, before {date}.', { teacher: a.teacher, date: d(a.due) })}
      >
        <div className="mt-2 flex w-full animate-fade-up flex-col gap-1 rounded-[18px] border border-brand-600 bg-[#fffaf5] p-4 text-left">
          <SectionLabel>{t('Next step')}</SectionLabel>
          <span className="text-[0.9375rem] font-semibold leading-[1.375rem] text-ink">{t('Self-reflection')}</span>
          <span className="text-[0.8125rem] leading-[1.1875rem] text-ink-muted">
            {t('{n} questions · about {m} min', { n: PBI_REFLECTION.length, m: REFLECTION_MIN })}
          </span>
        </div>
      </SuccessBody>
    </Screen>
  )
}

/* ------------------------------------------- 6.6 Self-reflection (+ 4.3, 11.2) */

export function PbiReflect() {
  const t = useT()
  const navigate = useNavigate()
  const goBack = useGoBack()
  const { search } = useLocation()
  const { id, a } = usePbi()
  const [initialState] = useState(a?.state)
  const [idx, setIdx] = useState(0)
  const [dir, setDir] = useState('right')
  const [answers, setAnswers] = useState([])
  const [sheet, setSheet] = useState(null) // 'exit' | 'failed'
  const [loading, setLoading] = useState(false)

  if (!a || a.section !== 'C') return <Navigate to="/s/home" replace />
  if (initialState === 'done') return <Navigate to={`/s/completed/${id}`} replace />
  if (initialState !== 'submitted') return <Navigate to={`/s/pbi/${id}`} replace />

  const total = PBI_REFLECTION.length
  const q = PBI_REFLECTION[idx]
  const last = idx === total - 1
  const chosen = answers[idx]

  const submit = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      if ((typeof navigator !== 'undefined' && navigator.onLine === false) || shouldFailOnce(search, 'submit', `pbi-reflect:${id}`)) {
        setSheet('failed')
        return
      }
      updateActivity(id, {
        state: 'done',
        reflectedOn: todayLabel(),
        reflection: PBI_REFLECTION.map((qq, i) => ({ q: qq.q, a: answers[i] })),
      })
      navigate(`/s/pbi/${id}/done`, { replace: true })
    }, 650)
  }
  const go = (to) => { setDir(to > idx ? 'right' : 'left'); setIdx(to) }
  const next = () => (last ? submit() : go(idx + 1))

  return (
    <Screen
      bg="plain"
      statusBar="light"
      header={
        <>
          <AppBar close title={t('Self-Reflection')} right={t('Question {n} of {total}', { n: idx + 1, total })} onBack={() => setSheet('exit')} />
          <ProgressBar value={(idx + 1) / total} />
        </>
      }
      footer={
        <PrevNext
          onPrev={() => go(idx - 1)}
          prevDisabled={idx === 0}
          onNext={next}
          nextDisabled={!chosen}
          nextLabel={last ? t('Submit') : t('Next')}
          loading={loading}
        />
      }
    >
      <div key={idx} className={cx('flex flex-col gap-5 px-4 pb-8 pt-4', dir === 'right' ? 'animate-slide-in-right' : 'animate-slide-in-left')}>
        <h1 className="text-[1.5rem] font-semibold leading-[1.875rem] text-ink">{t(q.q)}</h1>
        <div role="radiogroup" aria-label={t(q.q)} className="stagger flex flex-col gap-3">
          {q.options.map((o) => (
            <OptionCard
              key={o.title}
              title={t(o.title)}
              desc={t(o.desc)}
              selected={chosen === o.title}
              onClick={() => setAnswers((as) => { const n = [...as]; n[idx] = o.title; return n })}
            />
          ))}
        </div>
      </div>

      <ActionSheet
        open={sheet === 'exit'}
        onClose={() => setSheet(null)}
        title={t('Leave this self-reflection?')}
        body={t('Your answers won’t be saved. You’ll need to start the self-reflection again from the first question.')}
        primary={t('Keep Going')}
        onPrimary={() => setSheet(null)}
        secondary={t('Leave Anyway')}
        onSecondary={() => { setSheet(null); goBack(`/s/pbi/${id}`) }}
      />
      <ActionSheet
        open={sheet === 'failed'}
        onClose={() => setSheet(null)}
        icon
        title={t('Couldn’t submit')}
        body={t('Check your internet connection and try again. Your answers are still here.')}
        primary={t('Try Again')}
        onPrimary={() => { setSheet(null); submit() }}
        secondary={t('Cancel')}
        onSecondary={() => setSheet(null)}
      />
    </Screen>
  )
}

/* ---------------------------------------------------------- 6.7 All done */

export function PbiDone() {
  const t = useT()
  const navigate = useNavigate()
  const { id, a } = usePbi()
  if (!a) return <Navigate to="/s/home" replace />
  return (
    <Screen
      bg="plain"
      statusBar="light"
      footer={
        <Footer>
          <PrimaryButton onClick={() => navigate(`/s/completed/${id}`, { replace: true })}>{t('View My Responses')}</PrimaryButton>
          <OutlineButton onClick={() => navigate('/s/activities?tab=completed', { replace: true })} className="text-[0.9375rem]">
            {t('Back to My Activities')}
          </OutlineButton>
        </Footer>
      }
    >
      <SuccessBody
        title={t('All steps done')}
        body={t('Your work and self-reflection are submitted. {title} moves to Completed.', { title: t(a.title) })}
      />
    </Screen>
  )
}

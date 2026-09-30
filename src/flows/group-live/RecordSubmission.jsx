import { useEffect, useRef, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { Screen, cx } from '../../components/ui.jsx'
import { useAppStore } from '../../store/AppStore.jsx'
import { useT } from '../../i18n/index.js'
import { EvalFooter, LeaveSheet } from '../../hpc/components.jsx'
import xRed from '../../assets/group-live/x-red.svg'
import { emit, saveWithGuard, stageOpen } from './lib.js'
import { AppBar, FileThumb, GroupCard, NoActivityRedirect, Radio, StateScreen, StepProgress, groupLabel, useBPage } from './parts.jsx'

let uid = 0
export const isValidLink = (v) => /^(https?:\/\/)?[\w-]+(\.[\w-]+)+(\/\S*)?$/i.test(v.trim())

/**
 * Record a group's Stage 2 draft or Stage 3 final output (kit T10-03 … T10-07), with the
 * leave warning (T10-06). Saves emit 'B.S2.recorded' / 'B.S3.recorded' (target groupId).
 */
export default function RecordSubmission() {
  const { classId, groupId, stage: stageParam, a, base } = useBPage()
  const stage = stageParam?.toUpperCase()
  const navigate = useNavigate()
  const t = useT()
  const { showToast } = useAppStore()
  const group = a?.groups?.[groupId]

  const [step, setStep] = useState(0)
  const [dir, setDir] = useState('right')
  const [method, setMethod] = useState(null) // 'physical' | 'digital'
  const [files, setFiles] = useState([])
  const [link, setLink] = useState('')
  const [linkTouched, setLinkTouched] = useState(false)
  const [shake, setShake] = useState(0)
  const [loading, setLoading] = useState(false)
  const [leave, setLeave] = useState(false)
  const cameraRef = useRef(null)
  const deviceRef = useRef(null)
  const lastSource = useRef('device')

  const uploading = files.some((f) => f.progress < 100)
  useEffect(() => {
    if (!uploading) return
    const timer = setInterval(() => {
      setFiles((fs) => fs.map((f) => (f.progress < 100 ? { ...f, progress: Math.min(100, f.progress + 6 + Math.random() * 12) } : f)))
    }, 90)
    return () => clearInterval(timer)
  }, [uploading])

  if (!a) return <NoActivityRedirect classId={classId} />
  if (!group || !['S2', 'S3'].includes(stage)) return <Navigate to={base} replace />
  const field = stage === 'S2' ? 'draft' : 'final'
  const what = t(stage === 'S2' ? 'Stage 2 draft' : 'Stage 3 final output')
  if (group[field]?.recordedAt && !loading) return <Navigate to={`${base}/${stageParam}/group/${groupId}`} replace />
  if (!stageOpen(a, stage)) {
    return <StateScreen title={t('Record {what}', { what })} heading={t('{stage} is not open yet', { stage: t(stage === 'S2' ? 'Stage 2' : 'Stage 3') })} body={t('Open it from the progress screen first. Students are notified when you do.')} action={t('Back to progress')} onAction={() => navigate(base)} />
  }

  const pick = (source) => { lastSource.current = source; (source === 'camera' ? cameraRef : deviceRef).current?.click() }
  const onFiles = (e, source) => {
    const list = Array.from(e.target.files || [])
    e.target.value = ''
    if (!list.length) return
    setFiles((fs) => [...fs, ...list.map((f) => ({ id: ++uid, name: f.name, type: f.type || 'application/octet-stream', url: URL.createObjectURL(f), progress: 0, source }))])
  }
  const remove = (id) => setFiles((fs) => fs.filter((x) => x.id !== id))

  const uploadsDone = files.length > 0 && !uploading
  const linkOk = isValidLink(link)
  const linkError = method === 'digital' && linkTouched && link.trim() !== '' && !linkOk
  const step2Valid = method === 'physical' ? uploadsDone : (uploadsDone || linkOk) && !uploading && !linkError
  const pct = step === 0 ? (method ? 50 : 25) : step2Valid ? 100 : 75
  const dirty = method || files.length || link

  const go = (s) => { setDir(s > step ? 'right' : 'left'); setStep(s) }
  const back = () => (dirty ? setLeave(true) : navigate(-1))

  const save = () => {
    if (!step2Valid) { setShake((n) => n + 1); if (method === 'digital') setLinkTouched(true); return }
    saveWithGuard({
      setLoading, showToast, t,
      run: () => {
        emit(a.id, `B.${stage}.recorded`, (x) => {
          x.groups[groupId][field] = {
            kind: method,
            files: files.map(({ id, name, type, url }) => ({ id, name, type, url })),
            link: method === 'digital' && linkOk ? link.trim() : '',
            note: '',
            recordedAt: new Date().toISOString(),
          }
        }, { target: groupId })
        showToast(t('{name} · {what} recorded', { name: groupLabel(t, group.name), what }))
        navigate(`${base}/${stageParam}/group/${groupId}`, { replace: true })
      },
    })
  }

  const selectedSource = files.length ? files[files.length - 1].source : null

  return (
    <Screen
      bg="plain"
      header={
        <>
          <AppBar title={t('Record {what}', { what })} subtitle={groupLabel(t, group.name)} onBack={back} />
          <StepProgress label={t('Question {n} of {total}', { n: step + 1, total: 2 })} pct={pct} />
        </>
      }
      footer={
        <EvalFooter
          prevDisabled={step === 0}
          onPrev={() => go(0)}
          nextDisabled={step === 0 ? !method : false}
          onNext={step === 0 ? () => go(1) : save}
          nextLabel={step === 0 ? t('Next') : t('Save')}
          loading={loading}
        />
      }
    >
      <input ref={cameraRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={(e) => onFiles(e, 'camera')} />
      <input ref={deviceRef} type="file" accept="image/*,application/pdf,video/*" multiple className="hidden" onChange={(e) => onFiles(e, 'device')} />

      <div key={step} className={cx('flex flex-col gap-4 p-4', dir === 'right' ? 'animate-slide-in-right' : 'animate-slide-in-left')}>
        <GroupCard a={a} group={group} />

        {step === 0 && (
          <div className="flex flex-col gap-3 rounded-2xl border border-line bg-white p-4">
            <div>
              <p className="text-[1rem] font-bold leading-6 text-ink">{t(stage === 'S2' ? 'How was the draft shared?' : 'How was the final output submitted?')}</p>
              <p className="pt-1 text-[0.8125rem] leading-[1.1875rem] text-ink-muted">
                {t(stage === 'S2' ? 'A first draft, sketch or prototype of the planned output.' : 'The finished output the group planned in Stage 1.')}
              </p>
            </div>
            <div role="radiogroup" aria-label={t(stage === 'S2' ? 'How was the draft shared?' : 'How was the final output submitted?')} className="stagger flex flex-col gap-3">
              <OptionCard checked={method === 'physical'} onClick={() => setMethod('physical')} title={t('Physical submission')} desc={t('Model, chart, notebook or other offline work brought to class')} />
              <OptionCard checked={method === 'digital'} onClick={() => setMethod('digital')} title={t('Digital submission')} desc={t('Photo, video or PDF of the work, or a link to it')} />
            </div>
          </div>
        )}

        {step === 1 && method === 'physical' && (
          <>
            <div key={shake} className={cx('flex flex-col gap-3 rounded-2xl border border-line bg-white p-4', shake && 'animate-shake')}>
              <div>
                <p className="text-[1rem] font-bold leading-6 text-ink">{t('Add reference photo')}</p>
                <p className="pt-1 text-[0.8125rem] leading-[1.1875rem] text-ink-muted">{t('A photo of the physical work for your own records')}</p>
              </div>
              <OptionCard checked={selectedSource === 'camera'} onClick={() => pick('camera')} title={t('Take Photo')} chips={files.filter((f) => f.source === 'camera')} onRemove={remove} />
              <OptionCard checked={selectedSource === 'device'} onClick={() => pick('device')} title={t('Choose from device')} desc={t('Photo, video or PDF of the work')} chips={files.filter((f) => f.source === 'device')} onRemove={remove} />
              {shake > 0 && !uploadsDone && <p role="alert" className="text-[0.75rem] leading-4 text-danger">{t('Add at least one photo to record this.')}</p>}
            </div>
            {files.length > 0 && <AddedFiles files={files} onRemove={remove} onAdd={() => pick(lastSource.current)} />}
          </>
        )}

        {step === 1 && method === 'digital' && (
          <>
            <div className="flex flex-col gap-3 rounded-2xl border border-line bg-white p-4">
              <div>
                <p className="text-[1rem] font-bold leading-6 text-ink">{t('Add reference link')}</p>
                <p className="pt-1 text-[0.8125rem] leading-[1.1875rem] text-ink-muted">{t('Paste a link to the photo, video or PDF of the work')}</p>
              </div>
              <div key={shake} className={cx(shake && !step2Valid ? 'animate-shake' : '')}>
                <input type="url" inputMode="url" aria-label={t('Add reference link')} value={link} onChange={(e) => setLink(e.target.value)} onBlur={() => setLinkTouched(true)} placeholder={t('Paste Link of the Project')} aria-invalid={linkError}
                  className={cx('w-full rounded-xl border bg-white p-3 text-[1rem] leading-6 text-ink outline-none transition-colors placeholder:text-[#8a8790] focus:border-brand', linkError ? 'border-danger' : 'border-line')} />
                {linkError && <p role="alert" className="animate-fade-in pt-1.5 text-[0.75rem] leading-4 text-danger">{t('Enter a valid link, e.g. drive.google.com/…')}</p>}
                {shake > 0 && !linkError && !step2Valid && <p role="alert" className="pt-1.5 text-[0.75rem] leading-4 text-danger">{t('Add a link or upload a file to record this.')}</p>}
              </div>
            </div>
            <div className="flex flex-col gap-3 rounded-2xl border border-line bg-white p-4">
              <div>
                <p className="text-[1rem] font-bold leading-6 text-ink">{t('Or upload a file')}</p>
                <p className="pt-1 text-[0.8125rem] leading-[1.1875rem] text-ink-muted">{t('Choose a photo or PDF from your phone')}</p>
              </div>
              {files.length === 0 ? (
                <button onClick={() => pick('device')} className="tap-soft grid min-h-32 w-full place-items-center rounded-[10px] p-4 border border-line bg-[#f1efec] hover:border-brand/50">
                  <span className="text-[0.75rem] font-bold leading-4 tracking-[0.96px] text-ink-muted">{t('Upload File')}</span>
                </button>
              ) : (
                <AddedFiles files={files} onRemove={remove} onAdd={() => pick('device')} bare />
              )}
            </div>
          </>
        )}
      </div>

      <LeaveSheet open={leave} title={t('Leave this submission?')} body={t('What you added for this group will not be recorded.')} onStay={() => setLeave(false)} onLeave={() => { setLeave(false); navigate(-1) }} />
    </Screen>
  )
}

function OptionCard({ checked, onClick, title, desc, chips, onRemove }) {
  const t = useT()
  return (
    <div role="radio" aria-checked={checked} tabIndex={0} onClick={onClick} onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onClick()}
      className={cx('tap-soft flex cursor-pointer gap-3 rounded-xl border bg-white p-4 text-left transition-colors duration-200 hover:bg-cream', checked ? 'border-brand-600' : 'border-line')}>
      <div className="pt-0.5"><Radio checked={checked} /></div>
      <div className="min-w-0 flex-1">
        <p className="text-[1rem] font-bold leading-6 text-ink">{title}</p>
        {desc && <p className="pt-0.5 text-[0.8125rem] leading-[1.1875rem] text-ink-muted">{desc}</p>}
        {chips?.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {chips.map((f) => (
              <span key={f.id} className="flex max-w-full animate-pop-in items-center gap-2 rounded-full bg-[#f1efec] py-1.5 pl-3 pr-2">
                <span className="min-w-0 break-all text-[0.8125rem] leading-[1.1875rem] text-ink-2">{f.type.startsWith('image/') ? t('Image') : f.name}</span>
                <button aria-label={t('Remove {name}', { name: f.name })} onClick={(e) => { e.stopPropagation(); onRemove(f.id) }} className="tap -my-2.5 -mr-1 grid size-11 shrink-0 place-items-center rounded-full hover:bg-black/5">
                  <img alt="" width="16" height="16" src={xRed} />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function AddedFiles({ files, onRemove, onAdd, bare }) {
  const t = useT()
  const allImages = files.every((f) => f.type.startsWith('image/'))
  return (
    <div className="flex animate-fade-up flex-col gap-3">
      {!bare && <p className="text-[1rem] font-bold leading-6 text-ink">{allImages ? (files.length > 1 ? t('Images Added') : t('Image Added')) : t('Files Added')}</p>}
      <div className={cx('grid gap-3', files.length > 1 ? 'grid-cols-2' : 'grid-cols-1')}>
        {files.map((f) => <FileThumb key={f.id} file={f} onRemove={() => onRemove(f.id)} />)}
      </div>
      <button onClick={onAdd} className="tap min-h-11 self-start rounded-full py-2 bg-brand-50 px-3.5 text-[0.875rem] font-medium leading-[1.1875rem] text-brand-700 hover:bg-[#ffe3c8]">{t('Upload new')}</button>
    </div>
  )
}

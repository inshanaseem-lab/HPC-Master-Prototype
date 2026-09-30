import { useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Screen, cx } from '../../components/ui.jsx'
import { useAppStore } from '../../store/AppStore.jsx'
import { HpcNav } from './parts.jsx'
import { STUDENTS } from './data.js'
import searchIcon from '../../assets/students/search.svg'
import avatar from '../../assets/students/avatar.png'
import caretRight from '../../assets/students/caret-right.svg'
import alertCircle from '../../assets/students/alert-circle.svg'
import { useT } from '../../i18n/index.js'

const norm = (s) => s.toLowerCase().replace(/[\s-]+/g, '')

/** Figma 263:17852 (empty) · 263:17915 (list) · 263:17987 (pressed row) · 263:17880 (no results) */
export default function StudentSearch() {
  const navigate = useNavigate()
  const { classes } = useAppStore()
  const t = useT()
  const [query, setQuery] = useState('')
  const [picked, setPicked] = useState(null)
  const inputRef = useRef(null)

  // Only students from the teacher's classes (all mock students if none are set up yet)
  const pool = useMemo(() => {
    const ids = new Set(classes.map((c) => c.id))
    return ids.size ? STUDENTS.filter((s) => ids.has(s.classId)) : STUDENTS
  }, [classes])

  const q = norm(query)
  const results = useMemo(() => {
    if (!q) return []
    return pool.filter(
      (s) =>
        norm(s.name).includes(q) ||
        s.id.includes(q) ||
        s.roll === q ||
        norm(s.classId) === q ||
        norm(`${s.grade}${s.section}`).startsWith(q),
    )
  }, [pool, q])

  const open = (s) => {
    setPicked(s.id)
    setTimeout(() => navigate(`/students/${s.id}`), 180)
  }

  return (
    <Screen bg="plain" header={<HpcNav />}>
      <div className="flex flex-col gap-5 px-4 pb-24 pt-4">
        <label
          className={cx(
            'flex items-center gap-2.5 rounded-full border bg-white px-4 py-3.5 transition-colors duration-200',
            'border-[#e5e6e1] focus-within:border-brand focus-within:shadow-[0_0_0_3px_rgba(255,121,0,0.12)]',
          )}
        >
          <span className="grid size-[18px] shrink-0 place-items-center">
            <img alt="" width="14.0004" height="14.0004" src={searchIcon} />
          </span>
          <input
            ref={inputRef}
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label={t('Search Students by Name or ID')}
            placeholder={t('Search Students by Name or ID')}
            className="min-w-0 flex-1 bg-transparent text-[0.875rem] font-semibold leading-5 text-[#030303] outline-none placeholder:text-[#6d726b]"
          />
          {query && (
            <button
              aria-label={t('Clear search')}
              onClick={() => { setQuery(''); inputRef.current?.focus() }}
              className="tap -my-3 -mr-3 grid size-11 shrink-0 place-items-center rounded-full text-[1rem] leading-none text-[#6d726b] hover:bg-black/5 animate-fade-in"
            >
              ×
            </button>
          )}
        </label>

        {q && results.length > 0 && (
          <div key={q} className="stagger flex flex-col gap-5">
            {results.map((s) => (
              <button
                key={s.id}
                onClick={() => open(s)}
                className={cx(
                  'tap-soft flex w-full flex-wrap items-center gap-[11px] rounded-[20px] border bg-white p-[13px] text-left',
                  'shadow-[0px_1px_1.5px_rgba(0,0,0,0.1),0px_1px_1px_rgba(0,0,0,0.06)] hover:border-brand',
                  picked === s.id ? 'border-brand' : 'border-[#e2e8f0]',
                )}
              >
                <img alt="" width="40" height="40" src={avatar} className="size-10 shrink-0 rounded-full" />
                <div className="min-w-[8rem] flex-1 text-[#334155]">
                  <p className="break-words text-[1.125rem] font-semibold leading-6">{s.name}</p>
                  <p className="text-[0.8125rem] leading-5">
                    {t('Class')} : <span className="font-bold">{s.grade} - {s.section}</span>
                  </p>
                  <p className="text-[0.8125rem] leading-5">
                    {t('Student ID')} : <span className="font-bold">{s.id}</span>
                  </p>
                </div>
                <img alt="" width="21.6" height="21.6" src={caretRight} className="shrink-0" />
              </button>
            ))}
          </div>
        )}

        {q && results.length === 0 && (
          <div key="empty" className="stagger flex flex-col items-center gap-3 p-4 text-center">
            <div className="grid size-10 place-items-center rounded-[20px] bg-[#fce8e6] animate-pop-in">
              <img alt="" width="20" height="20" src={alertCircle} />
            </div>
            <p className="text-[1rem] font-semibold leading-5 text-[#b54a45]">{t('Oh no!')}</p>
            <p className="max-w-[17.25rem] text-[0.875rem] font-semibold leading-5 text-[#6d726b]">
              {t('We couldn’t find this student in your selected classes')}
            </p>
          </div>
        )}
      </div>
    </Screen>
  )
}

import { useMemo, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { CoverTrails, Screen, Sheet, Spinner, cx } from '../../components/ui.jsx'
import { useAppStore } from '../../store/AppStore.jsx'
import { Badge, Card, Chevron, Collapse, CountUp, Dot, HpcNav, SectionTitle, TargetIcon } from './parts.jsx'
import { ASSESSMENTS, GOAL_SURVEY_ROWS, GOAL_SURVEY_SUBJECTS, HEALTH_SURVEY, buildReport, getStudent } from './data.js'
import trendUp from '../../assets/students/trend-up.svg'
import trendDown from '../../assets/students/trend-down.svg'
import attendanceCalendar from '../../assets/students/attendance-calendar.png'
import barChart from '../../assets/students/bar-chart.svg'
import medicalBag from '../../assets/students/medical-bag.png'
import healthIcons from '../../assets/students/health-icons.png'
import bmiIcon from '../../assets/students/bmi.png'
import bloodGroupIcon from '../../assets/students/blood-group.png'
import contractIcon from '../../assets/students/contract.png'
import hourglass1 from '../../assets/students/hourglass-1.png'
import hourglass2 from '../../assets/students/hourglass-2.png'
import calendar3d from '../../assets/students/calendar-3d.png'
import bookIcon from '../../assets/students/book.png'
import skillsIcon from '../../assets/students/skills-for-life.png'
import { useT } from '../../i18n/index.js'

/**
 * Figma 263:18059 (full HPC report) + 263:18316 (Survey Insights cards, expanded state)
 *
 * Reused by the student app ("View My HPC", /s/hpc):
 *   <StudentReport studentId="12334" title={t('View My HPC')} readOnly />
 * Props (all optional):
 *   studentId — whose report to show; falls back to the :studentId route param
 *   title     — app bar title (already translated); defaults to t('View Student’s HPC')
 *   readOnly  — hides teacher-only actions (the "Student Profile" button); everything else stays
 */
export default function StudentReport({ studentId: studentIdProp, title, readOnly = false } = {}) {
  const params = useParams()
  const studentId = studentIdProp ?? params.studentId
  const t = useT()
  const student = getStudent(studentId)
  const report = useMemo(() => (student ? buildReport(student) : null), [student])
  const navigate = useNavigate()
  const { showToast } = useAppStore()
  const [open, setOpen] = useState({
    attendance: true, fa: true, sa: true, health: true, plan: true, time: true, after: true, skills: true,
    surveyHealth: false, surveyGoal: false,
  })
  const toggle = (k) => setOpen((o) => ({ ...o, [k]: !o[k] }))
  const [assessment, setAssessment] = useState('FA3')
  const [pickerOpen, setPickerOpen] = useState(false)
  const [downloading, setDownloading] = useState(false)

  if (!student) {
    if (!readOnly) return <Navigate to="/students" replace />
    return (
      <Screen bg="pattern" header={<HpcNav title={title} />}>
        <p className="p-8 text-center text-[0.875rem] font-medium text-ink-muted">{t('Report not available')}</p>
      </Screen>
    )
  }
  const subjects = report.subjectsFor(assessment)

  const download = () => {
    setDownloading(true)
    setTimeout(() => {
      setDownloading(false)
      showToast(t('{name}’s report downloaded', { name: student.name }))
    }, 900)
  }

  return (
    <Screen bg="pattern" header={<HpcNav title={title} />}>
      {/* Orange profile header — same cover as the teacher profile (#FF7900 + paper-plane art) */}
      <div className="relative min-h-[200px] overflow-hidden bg-brand pb-[19px] pt-8">
        <CoverTrails />
        <div className="relative flex flex-col items-center gap-2">
          <div aria-hidden className="grid size-[74px] place-items-center rounded-full bg-[#f5f5f5] animate-pop-in">
            <span className="text-[1.4167rem] font-medium leading-[2.125rem] text-[#334155]">{student.initials}</span>
          </div>
          <div className="stagger flex max-w-full flex-col items-center gap-1 px-4 text-center text-white">
            <h2 className="break-words text-[1.375rem] font-bold leading-10">{student.name}</h2>
            <div className="flex flex-wrap items-center justify-center gap-x-1.5 text-[0.8125rem] leading-5">
              <span>{t('Class {grade} {section}', { grade: student.grade, section: student.section })}</span>
              <span aria-hidden className="size-[5px] rounded-full bg-white" />
              <span>{student.id}</span>
            </div>
          </div>
          {!readOnly && (
          <button
            onClick={() => navigate(`/students/${student.id}/details`)}
            className="tap relative flex min-h-11 items-center overflow-hidden rounded-full border-2 border-brand-600 px-3 py-1 text-[0.75rem] font-medium leading-5 text-[#334155] shadow-[inset_-2px_-2px_2px_0px_rgba(15,23,42,0.14),inset_2px_2px_2px_1px_rgba(255,255,255,0.9)] transition-colors hover:brightness-105"
            style={{ backgroundImage: 'linear-gradient(90deg, rgba(255,121,0,0.41), rgba(255,121,0,0.41)), linear-gradient(90deg, #fff, #fff)' }}
          >
            {t('Student Profile')}
          </button>
          )}
        </div>
      </div>

      <div className="stagger flex flex-col gap-6 px-4 pb-6 pt-4">
        {/* Attendance */}
        <section className="flex flex-col gap-4">
          <SectionTitle badge={t('Good')}>{t('Attendance Overview')}</SectionTitle>
          <Card className="px-4 py-3">
            <button onClick={() => toggle('attendance')} aria-expanded={open.attendance} className="tap-soft flex min-h-11 w-full items-center gap-1 text-left">
              <div className="relative h-12 w-[52px] shrink-0 overflow-hidden">
                <img alt="" src={attendanceCalendar} className="absolute left-[-21.15%] top-[-9.92%] h-[119.85%] w-[142.31%] max-w-none" />
              </div>
              <div className="flex min-w-0 flex-1 flex-col gap-2">
                <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                  <span className="flex items-center gap-1">
                    <span className="text-[1.125rem] font-semibold leading-6 text-[#1b6b34]"><CountUp value={report.attendance.pct} suffix="%" /></span>
                    <img alt="" width="24" height="24" src={trendUp} />
                  </span>
                  <span aria-hidden="true" className="h-6 w-px bg-[#cbd5e1]" />
                  <span className="min-w-0 break-words text-[1.125rem] font-semibold leading-6 text-slate-900">{t('{present}/{total} Days', { present: report.attendance.present, total: report.attendance.total })}</span>
                </div>
                <p className="text-[0.8125rem] leading-5 text-slate-500">{t('Updated on {date}', { date: '01/01/25' })}</p>
              </div>
              <Chevron open={open.attendance} />
            </button>
            <Collapse open={open.attendance}>
              <div className="flex flex-col gap-2 pt-2">
                {report.attendance.months.map((m) => (
                  <div key={m.month} className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1 border-b-[0.6px] border-[rgba(226,232,240,0.5)] py-2 pl-6 pr-4">
                    <div className="flex items-center gap-1">
                      <span className="min-w-[5.3rem] break-words text-[1rem] font-medium leading-5 text-slate-900">{t(m.month)}</span>
                      <span className="h-4 w-px bg-[#cbd5e1]" />
                      <span className={cx('text-[1.125rem] font-semibold leading-6', m.pct >= 75 ? 'text-[#1b6b34]' : 'text-[#b54a45]')}>{m.pct}%</span>
                    </div>
                    <Badge tone="muted">{t('{present}/{total} days', { present: m.present, total: m.total })}</Badge>
                  </div>
                ))}
              </div>
            </Collapse>
          </Card>
        </section>

        <Divider />

        {/* Academic summary */}
        <section className="flex flex-col gap-4">
          <SectionTitle badge={t('Excellent')}>{t('Academic Summary')}</SectionTitle>
          <Card className="flex flex-col gap-4 border-[0.4px] p-4 shadow-[0px_1px_1.5px_rgba(0,0,0,0.1),0px_1px_1px_rgba(0,0,0,0.06)]">
            <div className="grid grid-cols-[repeat(auto-fill,minmax(5.5rem,1fr))] gap-3">
              <Tile className="bg-[#e0f2fe]" value={<CountUp value={report.summary.overall} suffix="%" />} label={t('Overall Performance')} />
              <Tile className="bg-[#ede9fe]" value={report.summary.grade} label={t('Overall Grade')} />
              <Tile className="bg-[#fce7f3]" value={`${report.summary.passing}/${report.summary.subjects}`} label={t('Subjects > 40%')} />
            </div>
            <div className="h-px bg-[#e2e8f0]" />
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap items-center justify-between gap-x-2">
                <p className="text-[1rem] font-bold leading-6 text-[#1a1c1e]">{t('Subject Performance')}</p>
                <button onClick={() => setPickerOpen(true)} aria-haspopup="dialog" className="tap -mr-1 flex min-h-11 items-center rounded px-1 hover:brightness-95">
                  <Badge>{t('Current : {assessment}', { assessment })} ▾</Badge>
                </button>
              </div>
              <div key={assessment} className="stagger grid grid-cols-2">
                {subjects.map((s, i) => (
                  <div
                    key={s.name}
                    className={cx(
                      'py-2',
                      i % 2 === 0 ? 'pr-2' : 'border-l border-[#e2e8f0] pl-3',
                      i >= 2 && 'border-t border-t-[#e2e8f0] pt-4',
                      Math.floor(i / 2) < Math.floor((subjects.length - 1) / 2) && 'pb-4',
                    )}
                  >
                    <SubjectCell s={s} t={t} />
                  </div>
                ))}
              </div>
            </div>
          </Card>
          {report.charts.map((c) => (
            <ChartAccordion key={c.key} chart={c} t={t} open={open[c.key]} onToggle={() => toggle(c.key)} />
          ))}
        </section>

        <Divider />

        {/* Health */}
        <section className="flex flex-col gap-4">
          <SectionTitle small badge={t('Excellent')}>{t('Health & Well-being')}</SectionTitle>
          <Card className="px-4 py-3">
            <button onClick={() => toggle('health')} aria-expanded={open.health} className="tap-soft flex min-h-11 w-full items-center gap-1 text-left">
              <img alt="" width="48" height="48" src={medicalBag} className="size-12 shrink-0 object-cover" />
              <div className="flex min-w-0 flex-1 flex-col gap-2">
                <p className="text-[1rem] font-bold leading-6 text-slate-900">{t('View health details')}</p>
                <p className="text-[0.8125rem] leading-5 text-slate-500">{t('Updated on {date}', { date: '01/01/25' })}</p>
              </div>
              <Chevron open={open.health} />
            </button>
            <Collapse open={open.health}>
              <div className="mt-2 overflow-hidden border-t border-[#e2e8f0] pt-1">
                {/* Every cell draws a left rule; the grid is shifted 1px so first-column rules are clipped, whatever the column count */}
                <div className="-ml-px grid grid-cols-[repeat(auto-fill,minmax(6rem,1fr))]">
                  <HealthCell label={t('Height')} unit="cm" icon={{ src: healthIcons, box: 'w-[30px] h-[38.226px]', img: 'h-[195.78%] w-[374.19%] left-[-20.16%] top-[-44.3%]' }} />
                  <HealthCell label={t('Weight')} unit="kg" icon={{ src: healthIcons, box: 'w-[33px] h-[38px]', img: 'h-[196.94%] w-[340.18%] left-[-118.24%] top-[-44.57%]' }} />
                  <HealthCell label={t('Hb Level')} unit="g/dL" icon={{ src: healthIcons, box: 'w-[30px] h-[38.226px]', img: 'h-[195.78%] w-[374.19%] left-[-254.63%] top-[-44.3%]' }} />
                  <HealthCell label={t('BMI')} icon={{ src: bmiIcon, box: 'w-[30px] h-[33px]', img: 'h-[203.46%] w-[220.51%] left-[-60.25%] top-[-51.73%]' }} />
                  <HealthCell label={t('Blood Group')} icon={{ src: bloodGroupIcon, box: 'w-[37px] h-[43px]', img: 'h-[195.78%] w-[374.19%] left-[-254.63%] top-[-44.3%]' }} />
                </div>
              </div>
            </Collapse>
          </Card>
        </section>

        <Divider />

        {/* Self evaluation */}
        <section className="flex flex-col gap-4">
          <SectionTitle small badge={t('Good')}>{t('Self Evaluation Goal Setting')}</SectionTitle>
          <Card className="flex flex-col gap-4 p-4">
            <div className="flex items-start gap-3">
              <TargetIcon />
              <p className="flex-1 text-[1rem] font-medium leading-5 text-slate-900">{t('I aim to score 80% marks in {subject} subject this year', { subject: t(report.goal.subject) })}</p>
            </div>
            <div className="flex flex-wrap items-center gap-x-2">
              <span className="text-[0.8125rem] leading-5 text-slate-500">{t('Updated on {date}', { date: '01/01/25' })}</span>
              <Dot />
              <span className={cx('text-[0.875rem] font-semibold leading-5', report.goal.status === 'On Track' ? 'text-[#009951]' : 'text-brand-600')}>
                {t(report.goal.status)}
              </span>
            </div>
          </Card>
          <ComingSoon
            open={open.plan}
            onToggle={() => toggle('plan')}
            title={t('The Plan:')}
            icon={<div className="relative size-6 shrink-0 overflow-hidden"><img alt="" src={contractIcon} className="absolute left-[-10%] top-[-9.89%] size-[120%] max-w-none" /></div>}
            hourglass={hourglass2}
          />
        </section>

        <Divider />

        {/* Survey insights (263:18316) */}
        <section className="flex flex-col gap-3">
          <SectionTitle small>{t('Survey Insights')}</SectionTitle>
          <SurveyCard
            emoji="🩺"
            title={t('Health & Wellbeing')}
            open={open.surveyHealth}
            onToggle={() => toggle('surveyHealth')}
          >
            <SurveyRows rows={HEALTH_SURVEY} />
          </SurveyCard>
          <SurveyCard
            emoji="🎯"
            title={t('Goal Setting - Academic')}
            open={open.surveyGoal}
            onToggle={() => toggle('surveyGoal')}
          >
            <div className="flex flex-col gap-4">
              {GOAL_SURVEY_SUBJECTS.map((sub) => (
                <div key={sub} className="flex flex-col gap-4 border-t border-[#e2e8f0] pt-4">
                  <span className="self-start rounded-md bg-[#eff6ff] px-2.5 py-1 text-[0.75rem] font-bold uppercase tracking-[1px] text-[#334155]">{t(sub)}</span>
                  <SurveyRows rows={GOAL_SURVEY_ROWS} />
                </div>
              ))}
              <p className="border-t border-[#e2e8f0] pt-4 text-[0.75rem] italic leading-[1.4] text-slate-500">
                {t('*Students could select up to 2 subjects (English, Maths, Science, Hindi).')}
              </p>
            </div>
          </SurveyCard>
        </section>

        <Divider />

        <ComingSoon
          open={open.time}
          onToggle={() => toggle('time')}
          title={t('Time Management')}
          large
          icon={<div className="relative h-[45px] w-12 shrink-0 overflow-hidden"><img alt="" src={calendar3d} className="absolute left-0 top-0 h-[107.32%] w-full max-w-none" /></div>}
          hourglass={hourglass1}
        />
        <Divider />
        <ComingSoon
          open={open.after}
          onToggle={() => toggle('after')}
          title={t('Plans after School')}
          icon={<img alt="" src={bookIcon} className="h-[39px] w-12 shrink-0 object-contain" />}
          hourglass={hourglass2}
        />
        <Divider />
        <ComingSoon
          open={open.skills}
          onToggle={() => toggle('skills')}
          title={t('Skills for Life')}
          icon={<div className="relative size-12 shrink-0 overflow-hidden"><img alt="" src={skillsIcon} className="absolute left-[-4.5%] top-[-4.5%] size-[109%] max-w-none" /></div>}
          hourglass={hourglass2}
        />

        <button
          onClick={download}
          disabled={downloading}
          className="tap flex min-h-11 w-full items-center justify-center gap-2 rounded border border-[#93c5fd] bg-[#eff6ff] px-3 text-[0.875rem] font-medium leading-5 text-[#2563eb] transition-colors hover:bg-[#dbeafe]"
        >
          {downloading ? <Spinner className="border-[#2563eb]/30 border-t-[#2563eb]" /> : t('Download Student Report')}
        </button>
      </div>

      <Sheet open={pickerOpen} onClose={() => setPickerOpen(false)}>
        <div className="px-4 pb-8 pt-3">
          <p className="mb-3 text-[1rem] font-semibold text-ink">{t('Select assessment')}</p>
          <div className="stagger flex flex-col gap-2">
            {ASSESSMENTS.map((a) => (
              <button
                key={a}
                onClick={() => { setAssessment(a); setPickerOpen(false) }}
                className={cx(
                  'tap-soft flex min-h-11 items-center justify-between rounded-xl border px-4 py-3 text-left text-[0.875rem] font-medium transition-colors',
                  a === assessment ? 'border-brand bg-brand-50 text-brand-700' : 'border-line bg-white text-ink hover:bg-surface',
                )}
              >
                {a}
                {a === assessment && <span className="animate-check-pop text-brand-700">✓</span>}
              </button>
            ))}
          </div>
        </div>
      </Sheet>
    </Screen>
  )
}

const Divider = () => <div className="h-px bg-[#e2e8f0]" />

function Tile({ className, value, label }) {
  return (
    <div className={cx('flex min-w-0 flex-col gap-1 rounded-[20px] border border-[#e2e8f0] p-3 text-center [overflow-wrap:anywhere]', className)}>
      <p className="text-[1.125rem] font-semibold leading-6 text-slate-900">{value}</p>
      <p className="text-[0.8125rem] leading-5 text-[#334155]">{label}</p>
    </div>
  )
}

function SubjectCell({ s, t }) {
  const up = s.trend === 'up' && s.pct >= 40
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-1">
        <div className="flex min-w-0 flex-wrap items-center gap-x-1.5">
          <span className="min-w-0 break-words text-[0.875rem] font-semibold leading-6 text-slate-900">{t(s.name)}</span>
          <span className="h-6 w-px shrink-0 bg-[#cbd5e1]" />
          <span className={cx('text-[1.125rem] font-bold leading-7', s.pct >= 40 ? 'text-[#1b6b34]' : 'text-[#b54a45]')}>{s.pct}%</span>
        </div>
        <img alt="" width="24" height="24" src={up ? trendUp : trendDown} className="shrink-0" />
      </div>
      <div className="flex flex-wrap items-center gap-x-[7px] gap-y-0.5 text-[0.75rem] font-light leading-4 text-[#404040]">
        <span>{t('Grade')} : <span className="font-medium">{s.grade}</span></span>
        <span aria-hidden="true" className="size-[3px] rounded-full bg-[#404040]" />
        <span>{t('Score')} : {s.score}/40</span>
      </div>
    </div>
  )
}

function ChartAccordion({ chart, t, open, onToggle }) {
  const lastIdx = chart.values.reduce((a, v, i) => (v != null ? i : a), 0)
  const [sel, setSel] = useState(lastIdx)
  const value = chart.values[sel]
  const trendIsUp = sel === 0 || value >= chart.values[sel - 1]
  // y axis: 20..100 mapped to 168px (5 gridlines, 42px apart, top gridline 10px down)
  const h = (v) => Math.max(8, 2.1 * v - 42)
  return (
    <Card className="px-4 py-3">
      <button onClick={onToggle} aria-expanded={open} className="tap-soft flex min-h-11 w-full items-center gap-2 text-left">
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <div className="flex items-center gap-2.5">
            <img alt="" width="20" height="20" src={barChart} />
            <p className="text-[1rem] font-bold leading-6 text-slate-900">{t(chart.title)}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[1.125rem] font-bold leading-7 text-[#1b6b34]">{value}%</span>
            <img alt="" width="24" height="24" src={trendIsUp ? trendUp : trendDown} />
          </div>
          <div className="flex flex-wrap items-center gap-x-2">
            <span className="text-[0.875rem] leading-5 text-[#444]">{t('Overall')}</span>
            <Dot />
            <span className="text-[0.8125rem] leading-5 text-slate-500">{t('Updated on {date}', { date: '01/01/25' })}</span>
          </div>
        </div>
        <Chevron open={open} />
      </button>
      <Collapse open={open}>
        <div className="pt-2">
          <div className="relative flex h-[180px]">
            <div aria-hidden="true" className="flex w-7 shrink-0 flex-col justify-between text-right text-[0.75rem] font-light leading-3 text-[rgba(28,28,28,0.64)]">
              {[100, 80, 60, 40, 20].map((t) => <span key={t}>{t}</span>)}
            </div>
            <div className="relative ml-1 flex-1">
              {[10, 52, 94, 136, 178].map((y) => (
                <div key={y} className="absolute inset-x-0 h-px bg-[rgba(28,28,28,0.1)]" style={{ top: y - 1 }} />
              ))}
              <div className="absolute inset-x-0 top-0 grid h-[178px] grid-cols-4">
                {chart.values.map((v, i) => (
                  <div key={i} className="relative flex items-end justify-center">
                    {v != null && (
                      <button
                        aria-label={`${chart.labels[i]} ${v}%`}
                        onClick={() => setSel(i)}
                        className="group relative flex h-full w-11 items-end justify-center"
                      >
                        <span
                          className={cx(
                            'block w-4 origin-bottom animate-grow-y rounded-t-2xl transition-colors duration-200',
                            i === sel ? 'bg-[#2563eb]' : 'bg-[rgba(28,28,28,0.4)] opacity-30 group-hover:opacity-50',
                          )}
                          style={{ height: h(v), animationDelay: `${i * 80}ms` }}
                        />
                        {i === sel && (
                          <span
                            key={sel}
                            className="absolute left-1/2 grid min-h-[30px] min-w-12 animate-pop-in px-1 place-items-center rounded-t-[15px] rounded-br-[15px] bg-[#2563eb] text-[0.875rem] font-semibold leading-5 text-white"
                            style={{ bottom: h(v) }}
                          >
                            {v}%
                          </span>
                        )}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="ml-8 grid grid-cols-4 pt-0.5 text-center text-[0.75rem] font-light leading-4 text-[rgba(28,28,28,0.64)]">
            {chart.labels.map((l) => <span key={l}>{l}</span>)}
          </div>
        </div>
      </Collapse>
    </Card>
  )
}

function HealthCell({ label, unit, icon }) {
  return (
    <div className="relative flex min-h-[82px] min-w-0 flex-col gap-1 border-l border-[#e2e8f0] p-3">
      <p className="break-words text-[0.875rem] font-semibold leading-5 text-[#2563eb]">{label}</p>
      {/* Icon sits in the flow beside the value so a wrapped label can never run under it */}
      <div className="flex items-end justify-between gap-1">
        <div className="flex items-end gap-0.5 pb-1 leading-5">
          <span className="text-[1rem] font-medium text-[#334155]">-</span>
          {unit && <span className="text-[0.8125rem] text-slate-500">{unit}</span>}
        </div>
        <div className={cx('relative shrink-0 overflow-hidden', icon.box)}>
          <img alt="" src={icon.src} className={cx('absolute max-w-none', icon.img)} />
        </div>
      </div>
    </div>
  )
}

function ComingSoon({ title, icon, hourglass, open, onToggle, large }) {
  const t = useT()
  return (
    <Card className="flex flex-col p-4">
      <button onClick={onToggle} aria-expanded={open} className="tap-soft flex min-h-11 w-full flex-wrap items-center gap-1.5 text-left">
        {icon}
        <p className={cx('min-w-[6rem] flex-1 break-words font-bold', large ? 'text-[1.125rem] leading-7 text-[#334155]' : 'text-[1rem] leading-6 text-slate-900')}>
          {title}
        </p>
        <Badge tone="grey">{t('Coming Soon')}</Badge>
        <Chevron open={open} />
      </button>
      <Collapse open={open}>
        <div className="mt-4 flex flex-col items-center gap-4 border-t border-[#e2e8f0] pt-4">
          <div className="relative h-20 w-[66px] overflow-hidden">
            <img alt="" src={hourglass} className="absolute left-[-23.91%] top-[-10.71%] h-[121.43%] w-[147.83%] max-w-none" />
          </div>
          <p className="text-center text-[0.8125rem] leading-5 text-slate-900">{t('This section will be active soon!')}</p>
        </div>
      </Collapse>
    </Card>
  )
}

function SurveyCard({ emoji, title, open, onToggle, children }) {
  const t = useT()
  return (
    <Card className="flex flex-col p-4 shadow-[0px_1px_1.5px_rgba(0,0,0,0.1),0px_1px_1px_rgba(0,0,0,0.06)]">
      <button onClick={onToggle} aria-expanded={open} className="tap-soft flex min-h-11 w-full items-center gap-3 text-left">
        <span className="grid size-10 shrink-0 place-items-center rounded-[20px] bg-[#eff6ff] text-[1.25rem]">{emoji}</span>
        <span className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="text-[1rem] font-bold text-slate-900">{title}</span>
          <span className="text-[0.75rem] text-slate-500">{t('Updated on {date}', { date: '13/05/26' })}</span>
        </span>
        <Chevron open={open} />
      </button>
      <Collapse open={open}>
        <div className="pt-4">{children}</div>
      </Collapse>
    </Card>
  )
}

function SurveyRows({ rows }) {
  const t = useT()
  return (
    <div className="flex flex-col">
      {rows.map((r, i) => (
        <div key={r.title} className={cx('flex items-center gap-3 py-3', i > 0 && 'border-t border-[#e2e8f0]')}>
          <span className="grid size-12 shrink-0 place-items-center text-[1.5rem]">{r.emoji}</span>
          <span className="flex min-w-0 flex-1 flex-col gap-1">
            <span className="text-[0.875rem] font-semibold text-slate-900">{t(r.title)}</span>
            <span className="text-[0.75rem] text-slate-500">{t(r.body)}</span>
          </span>
        </div>
      ))}
    </div>
  )
}

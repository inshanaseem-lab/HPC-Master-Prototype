import { Navigate, useParams } from 'react-router-dom'
import { Screen, cx } from '../../components/ui.jsx'
import { HpcNav } from './parts.jsx'
import { getStudent } from './data.js'
import detailsPattern from '../../assets/students/details-pattern.svg'
import userIcon from '../../assets/students/user-01.svg'
import bankIcon from '../../assets/students/bank.svg'
import usersIcon from '../../assets/students/users-01.svg'
import { useT } from '../../i18n/index.js'

/** Figma 263:18212 — student personal / school / family details */
export default function StudentDetails() {
  const { studentId } = useParams()
  const t = useT()
  const s = getStudent(studentId)
  if (!s) return <Navigate to="/students" replace />

  return (
    <Screen bg="pattern" header={<HpcNav />}>
      <div className="relative overflow-hidden bg-[#ff9230] pb-2.5 pt-8">
        <div className="pointer-events-none absolute left-[7.5px] top-[-374.5px] grid size-[685px] place-items-center">
          <img alt="" width="391.636" height="577.373" src={detailsPattern} className="block max-w-none -rotate-45" />
        </div>
        <div className="relative flex flex-col items-center gap-2">
          <div className="grid size-[74px] place-items-center rounded-full bg-[#f5f5f5] animate-pop-in">
            <span className="text-[1.4167rem] font-medium leading-[2.125rem] text-[#334155]">{s.initials}</span>
          </div>
          <div className="flex max-w-full flex-col items-center gap-1 px-4 text-center">
            <h2 className="break-words text-[1.375rem] font-bold leading-10 text-black">{s.name}</h2>
            {/* text-ink (7.3:1) not white (2.2:1) on this #ff9230 header — WCAG AA fix */}
            <div className="flex flex-wrap items-center justify-center gap-x-1.5 text-[0.8125rem] leading-5 text-ink">
              <span>{t('Class {grade} {section}', { grade: s.grade, section: s.section })}</span>
              <span aria-hidden="true" className="size-[5px] rounded-full bg-ink" />
              <span>{s.id}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="stagger flex flex-col gap-6 px-[19px] pb-10 pt-[27px]">
        <Section icon={userIcon} title={t('Personal Details')}>
          <Pair a={[t('Gender'), t(s.gender)]} b={[t('Date of Birth & Age'), t('{dob} | {age} years', { dob: s.dob, age: s.age })]} />
          <Pair a={[t('Nationality'), t(s.nationality)]} b={[t('Category'), t(s.category)]} />
          <Pair a={[t('Phone No.'), s.phone]} b={[t('Blood Group'), s.bloodGroup]} />
          <Pair a={[t('Pen'), s.pen]} b={[t('APAAR ID'), s.apaar]} />
        </Section>
        <Rule />
        <Section icon={bankIcon} title={t('School Information')}>
          <Field label={t('UDISE Code')} value={s.school.udise} />
          <Field label={t('School Name')} value={s.school.name} />
          <Pair tall a={[t('Village/Town'), s.school.village]} b={[t('Block'), s.school.block]} />
          <Pair tall a={[t('District'), s.school.district]} b={[t('State'), s.school.state]} />
          <Field label={t('Pincode')} value={s.school.pincode} />
        </Section>
        <Rule />
        <Section icon={usersIcon} title={t('Family Details')}>
          <div className="flex flex-col gap-2">
            <Field label={t('Mother’s Name')} value={s.family.mother.name} />
            <Pair tall a={[t('Education'), t(s.family.mother.education)]} b={[t('Occupation'), t(s.family.mother.occupation)]} />
          </div>
          <Rule thin />
          <div className="flex flex-col gap-2">
            <Field label={t('Father’s Name')} value={s.family.father.name} />
            <Pair tall a={[t('Education'), t(s.family.father.education)]} b={[t('Occupation'), t(s.family.father.occupation)]} />
          </div>
          <Rule thin />
          <Field label={t('Sibling’s Name')} value={s.family.sibling.name} />
          <Field label={t('Age')} value={s.family.sibling.age} />
        </Section>
      </div>
    </Screen>
  )
}

function Section({ icon, title, children }) {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <img alt="" width="24" height="24" src={icon} />
        <h3 className="text-[1.125rem] font-bold leading-7 text-[#1a1c1e]">{title}</h3>
      </div>
      <div className="flex flex-col gap-4">{children}</div>
    </section>
  )
}

function Field({ label, value }) {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-[3px]">
      <p className="text-[1rem] font-medium leading-5 text-slate-500">{label}</p>
      <p className="text-[1.125rem] font-semibold leading-6 text-[#334155] [overflow-wrap:anywhere]">{value}</p>
    </div>
  )
}

function Pair({ a, b, tall }) {
  return (
    // Separator stretches with the taller field (wrapped labels / large text) instead of a fixed height
    <div className="flex items-stretch gap-6">
      <Field label={a[0]} value={a[1]} />
      <span aria-hidden="true" className={cx('w-px shrink-0 self-stretch bg-[#e2e8f0]', tall && 'min-h-[58px]')} />
      <Field label={b[0]} value={b[1]} />
    </div>
  )
}

const Rule = ({ thin }) => <div className={thin ? 'h-px bg-[#e2e8f0]/70' : 'h-px bg-[#e2e8f0]'} />

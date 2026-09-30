import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { BottomActions, PrimaryButton, Screen } from '../../components/ui.jsx'
import { useT, useDate } from '../../i18n/index.js'
import { GROUPS } from '../../student/data.js'
import { useStudentState } from '../../student/store.js'
import { daysLeft, isDone, pathFor } from './lib.js'
import { Avatar, Card, Overline, SectionBadge, StudentAppBar, Tag } from './parts.jsx'

/** 1.4 My Group — opened from a My Groups card; shows only the student's own group. */
export default function GroupScreen() {
  const t = useT()
  const d = useDate()
  const navigate = useNavigate()
  const { groupId } = useParams()
  const { activities } = useStudentState()
  const group = GROUPS[groupId]
  if (!group) return <Navigate to="/s/home" replace />
  const activity =
    activities.find((a) => a.groupId === groupId && !isDone(a)) ??
    activities.find((a) => a.id === group.activityId) ??
    activities.find((a) => a.groupId === groupId)

  const deadline = activity?.deadline ?? activity?.due
  const left = daysLeft(activity?.due)
  const tag = left == null ? null
    : left < 0 ? <Tag tone="error">{t('Closed')}</Tag>
    : left === 0 ? <Tag tone="warning">{t('Due today')}</Tag>
    : <Tag tone="warning">{left === 1 ? t('1 day left') : t('{n} days left', { n: left })}</Tag>

  return (
    <Screen bg="plain" statusBar="light" header={<StudentAppBar title={t('My Group')} />}
      footer={activity && (
        <BottomActions>
          <PrimaryButton onClick={() => navigate(pathFor(activity))}>{t('Go to Activity')}</PrimaryButton>
        </BottomActions>
      )}>
      <div className="flex flex-col gap-5 px-4 pb-8 pt-4">
        <div className="flex animate-fade-up flex-col items-start gap-2">
          {activity && <SectionBadge section={activity.section} />}
          <div>
            <h2 className="text-[1.5rem] font-semibold leading-[1.875rem] text-ink">{t(group.name)}</h2>
            <p className="py-1 text-[0.8125rem] leading-[1.1875rem] text-ink-muted">
              {activity
                ? t('{title} · {n} members', { title: t(activity.title), n: group.members.length })
                : t('{n} members', { n: group.members.length })}
            </p>
          </div>
        </div>

        {deadline && (
          <div className="flex flex-wrap items-center gap-3 rounded-[10px] border border-[#ffa554] bg-[#fffaf5] px-3.5 py-3">
            <div className="flex min-w-[9rem] flex-1 flex-col gap-0.5">
              <Overline>{activity.section === 'D' ? t('Activity in class') : t('Deadline')}</Overline>
              <span className="text-[0.9375rem] font-semibold leading-[1.375rem] text-ink">
                {d(activity.section === 'D' && activity.classDate ? activity.classDate : deadline)}
              </span>
            </div>
            {tag}
          </div>
        )}

        <Card>
          <div className="px-4 pt-3.5"><Overline>{t('Members')}</Overline></div>
          <div className="stagger">
            {group.members.map((m, i) => (
              <div key={m.id} className={`flex items-center gap-3 px-4 py-3.5 ${i < group.members.length - 1 ? 'border-b border-[#f1efec]' : ''}`}>
                <Avatar name={m.name} />
                <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                  <span className="break-words text-[0.875rem] font-semibold leading-5 text-ink">{m.you ? t('{name} (You)', { name: m.name }) : m.name}</span>
                  <span className="text-[0.8125rem] leading-[1.1875rem] text-ink-muted">{t('Student ID {id}', { id: m.idMasked })}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="px-4 py-3.5">
          <p className="text-[0.8125rem] leading-[1.1875rem] text-ink-muted">{t('Teacher')}</p>
          <p className="text-[0.9375rem] font-semibold leading-[1.375rem] text-ink">{activity?.teacher ?? group.teacher}</p>
        </Card>
      </div>
    </Screen>
  )
}

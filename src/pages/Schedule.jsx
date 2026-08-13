import { useMemo, useState } from 'react'
import { EmptyState } from '../components/common/EmptyState'
import { ScheduleCard } from '../components/schedule/ScheduleCard'
import { ScheduleForm } from '../components/schedule/ScheduleForm'
import { getLocalDateInputValue, formatDateLabel } from '../utils/dateUtils'

export function Schedule({ sessions, onCreate, onUpdate, onDelete }) {
  const [formOpen, setFormOpen] = useState(false)
  const [editingSession, setEditingSession] = useState(null)

  const sortedSessions = useMemo(() => [...sessions].sort((a, b) => `${a.date}${a.startTime}`.localeCompare(`${b.date}${b.startTime}`)), [sessions])
  const today = getLocalDateInputValue()
  const todayCount = sessions.filter((session) => session.date === today).length

  const openCreate = () => { setEditingSession(null); setFormOpen(true) }
  const openEdit = (session) => { setEditingSession(session); setFormOpen(true) }
  const closeForm = () => { setEditingSession(null); setFormOpen(false) }
  const saveSession = (session) => {
    if (editingSession) onUpdate(session)
    else onCreate(session)
    closeForm()
  }

  return (
    <div className="schedule-page">
      <div className="page-intro"><div><p className="card-kicker">YOUR PLAN</p><h2>Study schedule</h2><p className="page-description">Give your study time a place on the calendar.</p></div><button className="primary-button" type="button" onClick={openCreate}><span aria-hidden="true">＋</span> Add session</button></div>
      <div className="schedule-summary"><span><strong>{todayCount}</strong> {todayCount === 1 ? 'session' : 'sessions'} today</span><span>{sessions.length} total planned</span></div>
      {formOpen ? <section className="panel task-form-panel"><ScheduleForm session={editingSession} sessions={sessions} onSave={saveSession} onCancel={closeForm} /></section> : null}
      <section className="panel schedule-list-panel"><div className="panel-heading"><div><p className="card-kicker">UPCOMING SESSIONS</p><h2>{sessions.length ? 'Your study plan' : 'No sessions yet'}</h2></div><span className="week-badge">{sessions.length ? formatDateLabel(sortedSessions[0].date) : 'Start planning'}</span></div>{sessions.length ? <div className="schedule-list">{sortedSessions.map((session) => <ScheduleCard key={session.id} session={session} onEdit={openEdit} onDelete={onDelete} />)}</div> : <EmptyState title="Make time for what matters" description="Schedule your first focused study session." actionLabel="Add a session" onAction={openCreate} />}</section>
    </div>
  )
}

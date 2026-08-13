import { useMemo, useState } from 'react'
import { EmptyState } from '../components/common/EmptyState'
import { ScheduleCard } from '../components/schedule/ScheduleCard'
import { ScheduleForm } from '../components/schedule/ScheduleForm'
import { getLocalDateInputValue, formatDateLabel } from '../utils/dateUtils'
import { downloadCalendar } from '../services/calendarService'

export function Schedule({ sessions, onCreate, onUpdate, onDelete }) {
  const [formOpen, setFormOpen] = useState(false)
  const [editingSession, setEditingSession] = useState(null)
  const [view, setView] = useState('all')
  const [query, setQuery] = useState('')

  const sortedSessions = useMemo(() => [...sessions].sort((a, b) => `${a.date}${a.startTime}`.localeCompare(`${b.date}${b.startTime}`)), [sessions])
  const today = getLocalDateInputValue()
  const todayCount = sessions.filter((session) => session.date === today).length
  const visibleSessions = sortedSessions.filter((session) => {
    if (view === 'today' && session.date !== today) return false
    const normalizedQuery = query.trim().toLowerCase()
    return !normalizedQuery || [session.title, session.subject, session.notes].some((value) => String(value ?? '').toLowerCase().includes(normalizedQuery))
  })

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
      <div className="page-actions"><button className="secondary-button" type="button" onClick={() => downloadCalendar(sessions)} disabled={!sessions.length}>Export calendar</button></div>
      {formOpen ? <section className="panel task-form-panel"><ScheduleForm session={editingSession} sessions={sessions} onSave={saveSession} onCancel={closeForm} /></section> : null}
      <section className="panel schedule-list-panel"><div className="panel-heading"><div><p className="card-kicker">UPCOMING SESSIONS</p><h2>{sessions.length ? 'Your study plan' : 'No sessions yet'}</h2></div><span className="week-badge">{sessions.length ? formatDateLabel(sortedSessions[0].date) : 'Start planning'}</span></div><div className="schedule-tabs" role="tablist" aria-label="Schedule view"><button className={view === 'all' ? 'filter-tab active' : 'filter-tab'} type="button" role="tab" aria-selected={view === 'all'} onClick={() => setView('all')}>All sessions</button><button className={view === 'today' ? 'filter-tab active' : 'filter-tab'} type="button" role="tab" aria-selected={view === 'today'} onClick={() => setView('today')}>Today ({todayCount})</button></div><label className="task-search schedule-search">Search sessions<input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by title, subject, or notes" /></label>{visibleSessions.length ? <div className="schedule-list">{visibleSessions.map((session) => <ScheduleCard key={session.id} session={session} onEdit={openEdit} onDelete={onDelete} />)}</div> : <EmptyState title={query ? 'No matching sessions' : view === 'today' ? 'No sessions today' : 'Make time for what matters'} description={query ? 'Try a different search or clear the search field.' : view === 'today' ? 'Add a focused session to your schedule for today.' : 'Schedule your first focused study session.'} actionLabel="Add a session" onAction={openCreate} />}</section>
    </div>
  )
}

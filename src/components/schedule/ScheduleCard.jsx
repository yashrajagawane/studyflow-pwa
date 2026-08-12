import { formatDateLabel } from '../../utils/dateUtils'

export function ScheduleCard({ session, onEdit, onDelete }) {
  return (
    <article className="schedule-card">
      <div className="schedule-time"><strong>{session.startTime}</strong><span>{session.endTime}</span></div>
      <div className="schedule-card-content"><div className="task-card-topline"><h3>{session.title}</h3><span className="subject-badge">{session.subject}</span></div><p className="schedule-date">{formatDateLabel(session.date)}</p>{session.notes ? <p className="task-notes">{session.notes}</p> : null}</div>
      <div className="task-actions"><button className="icon-button" type="button" onClick={() => onEdit(session)} aria-label={`Edit ${session.title}`}>✎</button><button className="icon-button danger" type="button" onClick={() => onDelete(session)} aria-label={`Delete ${session.title}`}>⌫</button></div>
    </article>
  )
}

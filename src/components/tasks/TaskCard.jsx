import { formatDateLabel, isPastDate, isToday } from '../../utils/dateUtils'

export function TaskCard({ task, onToggle, onEdit, onDelete }) {
  const overdue = task.status !== 'completed' && isPastDate(task.deadline)
  const dueToday = task.status !== 'completed' && isToday(task.deadline)

  return (
    <article className={`task-card ${task.status === 'completed' ? 'completed' : ''}`}>
      <button className="task-check" type="button" onClick={() => onToggle(task.id)} aria-label={`${task.status === 'completed' ? 'Restore' : 'Complete'} ${task.title}`} aria-pressed={task.status === 'completed'}>
        {task.status === 'completed' ? '✓' : ''}
      </button>
      <div className="task-card-content">
        <div className="task-card-topline">
          <h3>{task.title}</h3>
          <span className={`priority-badge ${task.priority}`}>{task.priority}</span>
        </div>
        <div className="task-meta">
          <span className="subject-badge">{task.subject}</span>
          <span className={overdue ? 'deadline overdue' : dueToday ? 'deadline today' : 'deadline'}>
            {overdue ? 'Overdue · ' : dueToday ? 'Due today · ' : ''}{formatDateLabel(task.deadline)}
          </span>
        </div>
        {task.notes ? <p className="task-notes">{task.notes}</p> : null}
      </div>
      <div className="task-actions">
        <button className="icon-button" type="button" onClick={() => onEdit(task)} aria-label={`Edit ${task.title}`}>✎</button>
        <button className="icon-button danger" type="button" onClick={() => onDelete(task)} aria-label={`Delete ${task.title}`}>⌫</button>
      </div>
    </article>
  )
}

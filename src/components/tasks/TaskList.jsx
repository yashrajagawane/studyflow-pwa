import { EmptyState } from '../common/EmptyState'
import { TaskCard } from './TaskCard'

export function TaskList({ tasks, filter, onToggle, onEdit, onDelete, onAddTask }) {
  if (tasks.length === 0) {
    const title = filter === 'all' ? 'No tasks yet' : 'No matching tasks'
    const description = filter === 'all' ? 'Create your first task and give your study plan a clear next step.' : 'Try another filter or add a task for this view.'
    return <EmptyState title={title} description={description} actionLabel="Add a task" onAction={onAddTask} />
  }

  return (
    <div className="task-list">
      {tasks.map((task) => <TaskCard key={task.id} task={task} onToggle={onToggle} onEdit={onEdit} onDelete={onDelete} />)}
    </div>
  )
}

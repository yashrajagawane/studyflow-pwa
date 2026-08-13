import { useEffect, useMemo, useState } from 'react'
import { taskFilters } from '../data/taskConstants'
import { isFutureDate, isPastDate, isToday } from '../utils/dateUtils'
import { TaskForm } from '../components/tasks/TaskForm'
import { TaskList } from '../components/tasks/TaskList'

function matchesFilter(task, filter) {
  if (filter === 'today') return isToday(task.deadline)
  if (filter === 'upcoming') return task.status !== 'completed' && isFutureDate(task.deadline)
  if (filter === 'completed') return task.status === 'completed'
  if (filter === 'overdue') return task.status !== 'completed' && isPastDate(task.deadline)
  return true
}

export function Tasks({ tasks, onCreate, onUpdate, onToggle, onDelete, initialTask, onInitialTaskHandled }) {
  const [filter, setFilter] = useState('all')
  const [sort, setSort] = useState('deadline')
  const [query, setQuery] = useState('')
  const [editingTask, setEditingTask] = useState(null)
  const [formOpen, setFormOpen] = useState(false)

  useEffect(() => {
    if (!initialTask) return
    setEditingTask(initialTask)
    setFormOpen(true)
    onInitialTaskHandled?.()
  }, [initialTask, onInitialTaskHandled])

  const visibleTasks = useMemo(
    () => tasks.filter((task) => {
      if (!matchesFilter(task, filter)) return false
      const normalizedQuery = query.trim().toLowerCase()
      if (!normalizedQuery) return true
      return [task.title, task.subject, task.notes].some((value) => String(value ?? '').toLowerCase().includes(normalizedQuery))
    }).sort((left, right) => {
      if (sort === 'priority') return ({ high: 0, medium: 1, low: 2 }[left.priority] ?? 3) - ({ high: 0, medium: 1, low: 2 }[right.priority] ?? 3)
      if (sort === 'title') return left.title.localeCompare(right.title)
      if (sort === 'newest') return String(right.createdAt ?? '').localeCompare(String(left.createdAt ?? ''))
      return (left.deadline || '9999-12-31').localeCompare(right.deadline || '9999-12-31')
    }),
    [tasks, filter, query, sort],
  )

  const openCreate = () => {
    setEditingTask(null)
    setFormOpen(true)
  }

  const openEdit = (task) => {
    setEditingTask(task)
    setFormOpen(true)
  }

  const closeForm = () => {
    setEditingTask(null)
    setFormOpen(false)
  }

  const saveTask = (task) => {
    if (editingTask) onUpdate(task)
    else onCreate(task)
    closeForm()
  }

  return (
    <div className="tasks-page">
      <div className="page-intro">
        <div>
          <p className="card-kicker">YOUR WORKSPACE</p>
          <h2>Study tasks</h2>
          <p className="page-description">Turn your study goals into clear, manageable next steps.</p>
        </div>
        <button className="primary-button" type="button" onClick={openCreate}><span aria-hidden="true">＋</span> Add task</button>
      </div>

      {formOpen ? (
        <section className="panel task-form-panel">
          <TaskForm task={editingTask} onSave={saveTask} onCancel={closeForm} />
        </section>
      ) : null}

      <section className="panel task-list-panel">
        <div className="task-list-heading">
          <div>
            <p className="card-kicker">TASK LIBRARY</p>
            <h2>{tasks.length} {tasks.length === 1 ? 'task' : 'tasks'}</h2>
          </div>
          <div className="filter-tabs" role="tablist" aria-label="Filter tasks">
            {taskFilters.map((item) => (
              <button className={filter === item.value ? 'filter-tab active' : 'filter-tab'} type="button" role="tab" aria-selected={filter === item.value} key={item.value} onClick={() => setFilter(item.value)}>
                {item.label}
              </button>
            ))}
          </div>
        </div>
        <label className="task-search">Search tasks<input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by title, subject, or notes" /></label>
        <label className="task-sort">Sort by<select value={sort} onChange={(event) => setSort(event.target.value)}><option value="deadline">Deadline</option><option value="priority">Priority</option><option value="title">Title</option><option value="newest">Newest added</option></select></label>
        <TaskList tasks={visibleTasks} filter={filter} onToggle={onToggle} onEdit={openEdit} onDelete={onDelete} onAddTask={openCreate} />
      </section>
    </div>
  )
}

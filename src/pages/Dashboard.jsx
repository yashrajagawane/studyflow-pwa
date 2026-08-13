import { EmptyState } from '../components/common/EmptyState'
import { StatCard } from '../components/progress/StatCard'
import { WeeklyProgressPreview } from '../components/progress/WeeklyProgressPreview'
import { TaskCard } from '../components/tasks/TaskCard'

const emptyDashboard = {
  todayProgress: 0,
  todayCompleted: 0,
  todayTotal: 0,
  upcomingCount: 0,
  overdueCount: 0,
  weeklyValues: [0, 0, 0, 0, 0, 0, 0],
  todayTasks: [],
  upcomingTasks: [],
  overdueTasks: [],
}

export function Dashboard({ onAddTask, onToggleTask, onEditTask, onDeleteTask, data = emptyDashboard }) {
  const dashboard = { ...emptyDashboard, ...data }
  const hasTasks = dashboard.todayTotal > 0 || dashboard.upcomingCount > 0 || dashboard.overdueCount > 0
  const hasWeeklyActivity = dashboard.weeklyValues.some((value) => value > 0)

  return (
    <div className="dashboard">
      <section className="hero-card">
        <div>
          <p className="card-kicker">TODAY&apos;S FOCUS</p>
          <h2>Make progress, one task at a time.</h2>
          <p className="hero-copy">Plan your study sessions, stay consistent, and make your goals feel achievable.</p>
          <button className="primary-button" type="button" onClick={onAddTask}>
            <span aria-hidden="true">＋</span> Add your first task
          </button>
        </div>
        <div className="hero-orbit" aria-hidden="true">
          <span className="orbit-dot dot-one" />
          <span className="orbit-dot dot-two" />
          <span className="orbit-dot dot-three" />
          <span className="hero-book">▤</span>
        </div>
      </section>

      <section className="stats-grid" aria-label="Study statistics">
        <StatCard label="Today&apos;s progress" value={`${dashboard.todayProgress}%`} detail={hasTasks ? 'Keep going' : 'No tasks yet'} icon="◔" />
        <StatCard label="Tasks completed" value={`${dashboard.todayCompleted} / ${dashboard.todayTotal}`} detail={hasTasks ? 'Completed today' : 'Start with one task'} icon="✓" />
        <StatCard label="Upcoming tasks" value={dashboard.upcomingCount} detail="Future deadlines" icon="◷" />
        <StatCard label="Overdue tasks" value={dashboard.overdueCount} detail={dashboard.overdueCount ? 'Needs attention' : 'You are on track'} icon="!" />
      </section>

      <section className="content-grid">
        <div className="panel tasks-panel">
          <div className="panel-heading">
            <div>
              <p className="card-kicker">YOUR DAY</p>
              <h2>Today&apos;s tasks</h2>
            </div>
            <button className="text-button" type="button" onClick={onAddTask}>View all</button>
          </div>
          {dashboard.todayTasks.length > 0 ? <div className="dashboard-task-list">
            {dashboard.todayTasks.map((task) => <TaskCard key={task.id} task={task} onToggle={onToggleTask} onEdit={onEditTask} onDelete={onDeleteTask} />)}
          </div> : dashboard.overdueTasks.length > 0 || dashboard.upcomingTasks.length > 0 ? <div className="dashboard-task-list">
            <p className="queue-label">{dashboard.overdueTasks.length > 0 ? 'NEEDS ATTENTION' : 'NEXT UP'}</p>
            {(dashboard.overdueTasks.length > 0 ? dashboard.overdueTasks : dashboard.upcomingTasks).map((task) => <TaskCard key={task.id} task={task} onToggle={onToggleTask} onEdit={onEditTask} onDelete={onDeleteTask} />)}
          </div> : <EmptyState title="No tasks for today" description="Your focused study plan will show up here." actionLabel="Create a task" onAction={onAddTask} />}
        </div>

        <div className="panel progress-panel">
          <div className="panel-heading">
            <div>
              <p className="card-kicker">THIS WEEK</p>
              <h2>Weekly progress</h2>
            </div>
            <span className="week-badge">Current week</span>
          </div>
          <WeeklyProgressPreview values={dashboard.weeklyValues} hasActivity={hasWeeklyActivity} />
        </div>
      </section>
    </div>
  )
}

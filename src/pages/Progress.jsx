import { EmptyState } from '../components/common/EmptyState'
import { StatCard } from '../components/progress/StatCard'
import { FocusTimer } from '../components/progress/FocusTimer'
import { getProgressSummary, getStreakSummary, getWeeklySummary } from '../utils/progressUtils'

export function Progress({ tasks, onAddTask }) {
  const today = getProgressSummary(tasks)
  const week = getWeeklySummary(tasks)
  const streak = getStreakSummary(tasks)
  const hasActivity = week.total > 0

  return (
    <div className="progress-page">
      <div className="page-intro">
        <div>
          <p className="card-kicker">YOUR INSIGHTS</p>
          <h2>Progress overview</h2>
          <p className="page-description">See how consistently you are turning study plans into completed work.</p>
        </div>
      </div>

      <section className="stats-grid" aria-label="Progress summary">
        <StatCard label="Today&apos;s progress" value={`${today.todayProgress}%`} detail={`${today.todayCompleted} of ${today.todayTotal} complete`} icon="◔" />
        <StatCard label="This week" value={`${week.percentage}%`} detail={`${week.completed} of ${week.total} complete`} icon="↗" />
        <StatCard label="Upcoming" value={today.upcomingCount} detail="Open deadlines" icon="◷" />
        <StatCard label="Overdue" value={today.overdueCount} detail={today.overdueCount ? 'Needs attention' : 'Nothing overdue'} icon="!" />
        <StatCard label="Study streak" value={`${streak.currentStreak} ${streak.currentStreak === 1 ? 'day' : 'days'}`} detail={streak.activeToday ? 'Completed today' : 'Keep it going'} icon="✦" />
        <StatCard label="Longest streak" value={`${streak.longestStreak} ${streak.longestStreak === 1 ? 'day' : 'days'}`} detail="Best completion run" icon="★" />
      </section>

      <FocusTimer tasks={tasks} />

      <section className="panel weekly-detail-panel">
        <div className="panel-heading">
          <div>
            <p className="card-kicker">MONDAY — SUNDAY</p>
            <h2>Weekly activity</h2>
          </div>
          <span className="week-badge">{week.completed} completed</span>
        </div>

        {hasActivity ? (
          <div className="weekly-detail-list">
            {week.days.map((day) => (
              <div className="weekly-detail-row" key={day.date}>
                <div className="weekly-day-label"><strong>{day.shortLabel}</strong><span>{day.label}</span></div>
                <div className="detail-bar-track"><div className="detail-bar-fill" style={{ width: `${day.percentage}%` }} /></div>
                <div className="weekly-day-count">{day.completed}/{day.total}</div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState title="Your progress starts here" description="Add tasks with deadlines to see daily and weekly activity." actionLabel="Add a task" onAction={onAddTask} />
        )}
      </section>

      <section className="progress-explanation panel">
        <span className="tip-icon" aria-hidden="true">✦</span>
        <div><h3>How progress is calculated</h3><p>Daily and weekly progress uses tasks with deadlines. A task counts as complete only after you mark it finished. Your study streak counts consecutive local calendar days with at least one completed task.</p></div>
      </section>
    </div>
  )
}

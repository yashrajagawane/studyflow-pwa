import { useMemo, useState } from 'react'
import './App.css'
import { AppShell } from './components/layout/AppShell'
import { ComingSoon } from './components/common/ComingSoon'

function App() {
  const [activePage, setActivePage] = useState('Dashboard')

  const today = useMemo(
    () => new Intl.DateTimeFormat('en-IN', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(new Date()),
    [],
  )

  return (
    <AppShell
      activePage={activePage}
      date={today}
      onNavigate={setActivePage}
      onProfileClick={() => setActivePage('Settings')}
    >
      {activePage === 'Dashboard' ? (
        <Dashboard onAddTask={() => setActivePage('Tasks')} />
      ) : (
        <ComingSoon page={activePage} />
      )}
    </AppShell>
  )
}

function Dashboard({ onAddTask }) {
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
        <StatCard label="Today&apos;s progress" value="0%" detail="No tasks yet" icon="◔" />
        <StatCard label="Tasks completed" value="0 / 0" detail="Keep building momentum" icon="✓" />
        <StatCard label="Study streak" value="0 days" detail="Your streak starts here" icon="✦" />
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
          <EmptyState onAddTask={onAddTask} />
        </div>

        <div className="panel progress-panel">
          <div className="panel-heading">
            <div>
              <p className="card-kicker">THIS WEEK</p>
              <h2>Weekly progress</h2>
            </div>
            <span className="week-badge">Week 1</span>
          </div>
          <div className="week-bars" aria-label="Weekly progress is empty until tasks are added">
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => (
              <div className="day-bar" key={`${day}-${index}`}>
                <div className="bar-track"><div className="bar-fill" style={{ height: '0%' }} /></div>
                <span>{day}</span>
              </div>
            ))}
          </div>
          <p className="panel-note">Your weekly activity will appear here once you add tasks.</p>
        </div>
      </section>
    </div>
  )
}

function StatCard({ label, value, detail, icon }) {
  return (
    <article className="stat-card">
      <div className="stat-icon" aria-hidden="true">{icon}</div>
      <p>{label}</p>
      <strong>{value}</strong>
      <span>{detail}</span>
    </article>
  )
}

function EmptyState({ onAddTask }) {
  return (
    <div className="empty-state">
      <div className="empty-icon" aria-hidden="true">✦</div>
      <h3>No tasks for today</h3>
      <p>Your focused study plan will show up here.</p>
      <button className="secondary-button" type="button" onClick={onAddTask}>Create a task <span aria-hidden="true">→</span></button>
    </div>
  )
}

export default App

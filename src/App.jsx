import { useMemo, useState } from 'react'
import './App.css'
import { ComingSoon } from './components/common/ComingSoon'
import { AppShell } from './components/layout/AppShell'
import { Dashboard } from './pages/Dashboard'
import { Tasks } from './pages/Tasks'
import { getLocalDateInputValue } from './utils/dateUtils'

function App() {
  const [activePage, setActivePage] = useState('Dashboard')
  const [tasks, setTasks] = useState([])

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
        <Dashboard data={getDashboardData(tasks)} onAddTask={() => setActivePage('Tasks')} />
      ) : activePage === 'Tasks' ? (
        <Tasks
          tasks={tasks}
          onCreate={(task) => setTasks((current) => [...current, createTask(task)])}
          onUpdate={(task) => setTasks((current) => current.map((item) => item.id === task.id ? task : item))}
          onToggle={(taskId) => setTasks((current) => current.map((task) => task.id === taskId ? toggleTask(task) : task))}
          onDelete={(task) => {
            if (window.confirm(`Delete “${task.title}”?`)) setTasks((current) => current.filter((item) => item.id !== task.id))
          }}
        />
      ) : (
        <ComingSoon page={activePage} />
      )}
    </AppShell>
  )
}

function createTask(task) {
  return {
    ...task,
    id: crypto.randomUUID(),
    status: 'pending',
    createdAt: new Date().toISOString(),
    completedAt: null,
  }
}

function toggleTask(task) {
  const completed = task.status !== 'completed'
  return {
    ...task,
    status: completed ? 'completed' : 'pending',
    completedAt: completed ? new Date().toISOString() : null,
  }
}

function getDashboardData(tasks) {
  const today = getLocalDateInputValue()
  const todayTasks = tasks.filter((task) => task.deadline === today)
  const todayCompleted = todayTasks.filter((task) => task.status === 'completed').length
  const todayProgress = todayTasks.length ? Math.round((todayCompleted / todayTasks.length) * 100) : 0
  const upcomingCount = tasks.filter((task) => task.status !== 'completed' && task.deadline > today).length
  const overdueCount = tasks.filter((task) => task.status !== 'completed' && task.deadline && task.deadline < today).length

  return { todayProgress, todayCompleted, todayTotal: todayTasks.length, upcomingCount, overdueCount }
}

export default App

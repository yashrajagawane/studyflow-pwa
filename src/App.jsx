import { useMemo, useState } from 'react'
import './App.css'
import { ComingSoon } from './components/common/ComingSoon'
import { StorageNotice } from './components/common/StorageNotice'
import { AppShell } from './components/layout/AppShell'
import { useStudyPlanner } from './hooks/useStudyPlanner'
import { Dashboard } from './pages/Dashboard'
import { Tasks } from './pages/Tasks'
import { getLocalDateInputValue } from './utils/dateUtils'

function App() {
  const [activePage, setActivePage] = useState('Dashboard')
  const { tasks, createTask, updateTask, toggleTask, deleteTask, storageError } = useStudyPlanner()

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
      <StorageNotice error={storageError} />
      {activePage === 'Dashboard' ? (
        <Dashboard data={getDashboardData(tasks)} onAddTask={() => setActivePage('Tasks')} />
      ) : activePage === 'Tasks' ? (
        <Tasks tasks={tasks} onCreate={createTask} onUpdate={updateTask} onToggle={toggleTask} onDelete={(task) => {
          if (window.confirm(`Delete “${task.title}”?`)) deleteTask(task.id)
        }} />
      ) : (
        <ComingSoon page={activePage} />
      )}
    </AppShell>
  )
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

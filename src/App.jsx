import { useMemo, useState } from 'react'
import './App.css'
import { ComingSoon } from './components/common/ComingSoon'
import { StorageNotice } from './components/common/StorageNotice'
import { AppShell } from './components/layout/AppShell'
import { useStudyPlanner } from './hooks/useStudyPlanner'
import { Dashboard } from './pages/Dashboard'
import { Tasks } from './pages/Tasks'
import { Progress } from './pages/Progress'
import { getProgressSummary, getWeeklySummary } from './utils/progressUtils'

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
      ) : activePage === 'Progress' ? (
        <Progress tasks={tasks} onAddTask={() => setActivePage('Tasks')} />
      ) : (
        <ComingSoon page={activePage} />
      )}
    </AppShell>
  )
}

function getDashboardData(tasks) {
  const summary = getProgressSummary(tasks)
  const weeklyValues = getWeeklySummary(tasks).days.map((day) => day.percentage)
  return { ...summary, weeklyValues }
}

export default App

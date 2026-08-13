import { useMemo, useState } from 'react'
import './App.css'
import { ComingSoon } from './components/common/ComingSoon'
import { StorageNotice } from './components/common/StorageNotice'
import { AppShell } from './components/layout/AppShell'
import { useStudyPlanner } from './hooks/useStudyPlanner'
import { Dashboard } from './pages/Dashboard'
import { Tasks } from './pages/Tasks'
import { Progress } from './pages/Progress'
import { Schedule } from './pages/Schedule'
import { Settings } from './pages/Settings'
import { getProgressSummary, getWeeklySummary } from './utils/progressUtils'
import { getLocalDateInputValue } from './utils/dateUtils'

function App() {
  const [activePage, setActivePage] = useState('Dashboard')
  const [taskToEdit, setTaskToEdit] = useState(null)
  const { tasks, createTask, updateTask, toggleTask, deleteTask, sessions, createSession, updateSession, deleteSession, clearAllData, importAllData, storageError } = useStudyPlanner()

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
        <Dashboard data={getDashboardData(tasks)} onAddTask={() => setActivePage('Tasks')} onToggleTask={toggleTask} onEditTask={(task) => { setTaskToEdit(task); setActivePage('Tasks') }} onDeleteTask={(task) => {
          if (window.confirm(`Delete “${task.title}”?`)) deleteTask(task.id)
        }} />
      ) : activePage === 'Tasks' ? (
        <Tasks tasks={tasks} initialTask={taskToEdit} onInitialTaskHandled={() => setTaskToEdit(null)} onCreate={createTask} onUpdate={updateTask} onToggle={toggleTask} onDelete={(task) => {
          if (window.confirm(`Delete “${task.title}”?`)) deleteTask(task.id)
        }} />
      ) : activePage === 'Progress' ? (
        <Progress tasks={tasks} onAddTask={() => setActivePage('Tasks')} />
      ) : activePage === 'Schedule' ? (
        <Schedule sessions={sessions} onCreate={createSession} onUpdate={updateSession} onDelete={(session) => {
          if (window.confirm(`Delete “${session.title}”?`)) deleteSession(session.id)
        }} />
      ) : activePage === 'Settings' ? (
        <Settings tasks={tasks} sessions={sessions} taskCount={tasks.length} sessionCount={sessions.length} onClearAll={clearAllData} onImport={importAllData} />
      ) : (
        <ComingSoon page={activePage} />
      )}
    </AppShell>
  )
}

function getDashboardData(tasks) {
  const summary = getProgressSummary(tasks)
  const weeklyValues = getWeeklySummary(tasks).days.map((day) => day.percentage)
  const today = getLocalDateInputValue()
  const overdueTasks = tasks.filter((task) => task.status !== 'completed' && task.deadline && task.deadline < today).sort((left, right) => left.deadline.localeCompare(right.deadline)).slice(0, 3)
  const upcomingTasks = tasks.filter((task) => task.status !== 'completed' && task.deadline > today).sort((left, right) => left.deadline.localeCompare(right.deadline)).slice(0, 3)
  return { ...summary, weeklyValues, todayTasks: tasks.filter((task) => task.deadline === today), overdueTasks, upcomingTasks }
}

export default App

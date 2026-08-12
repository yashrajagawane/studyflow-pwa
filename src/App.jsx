import { useMemo, useState } from 'react'
import './App.css'
import { ComingSoon } from './components/common/ComingSoon'
import { AppShell } from './components/layout/AppShell'
import { Dashboard } from './pages/Dashboard'

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

export default App

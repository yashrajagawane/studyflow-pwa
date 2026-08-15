import { PageHeader } from './PageHeader'
import { Sidebar } from './Sidebar'
import { MobileNavigation } from '../navigation/MobileNavigation'

export function AppShell({ activePage, date, onNavigate, children }) {
  return (
    <div className="app-shell">
      <Sidebar activePage={activePage} onNavigate={onNavigate} />

      <main className="main-content">
        <PageHeader date={date} />
        {children}
      </main>

      <MobileNavigation activePage={activePage} onNavigate={onNavigate} />
    </div>
  )
}

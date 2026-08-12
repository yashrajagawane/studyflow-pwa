import { navigationItems } from '../../data/navigation'
import { NavButton } from '../navigation/NavButton'

export function Sidebar({ activePage, onNavigate }) {
  return (
    <aside className="sidebar" aria-label="Primary navigation">
      <div className="brand">
        <div className="brand-mark" aria-hidden="true">▤</div>
        <div>
          <p className="brand-name">Study Planner</p>
          <p className="brand-caption">Focus. Learn. Grow.</p>
        </div>
      </div>

      <nav className="sidebar-nav">
        <p className="nav-label">Workspace</p>
        {navigationItems.map((item) => (
          <NavButton
            key={item.label}
            item={item}
            active={activePage === item.label}
            onClick={() => onNavigate(item.label)}
          />
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="tip-card">
          <span className="tip-icon" aria-hidden="true">✦</span>
          <div>
            <strong>Small steps matter</strong>
            <p>Start with one focused task today.</p>
          </div>
        </div>
        <p className="version-label">Student Study Planner · MVP</p>
      </div>
    </aside>
  )
}

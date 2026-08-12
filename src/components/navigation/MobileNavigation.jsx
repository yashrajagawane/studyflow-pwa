import { navigationItems } from '../../data/navigation'
import { NavButton } from './NavButton'

export function MobileNavigation({ activePage, onNavigate }) {
  return (
    <nav className="mobile-nav" aria-label="Mobile navigation">
      {navigationItems.slice(0, 4).map((item) => (
        <NavButton
          key={item.label}
          item={item}
          active={activePage === item.label}
          onClick={() => onNavigate(item.label)}
          mobile
        />
      ))}
    </nav>
  )
}

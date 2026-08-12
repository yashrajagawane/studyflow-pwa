export function NavButton({ item, active, onClick, mobile = false }) {
  return (
    <button
      className={`nav-button${active ? ' active' : ''}${mobile ? ' mobile' : ''}`}
      type="button"
      onClick={onClick}
      aria-current={active ? 'page' : undefined}
    >
      <span className="nav-icon" aria-hidden="true">{item.icon}</span>
      <span>{item.label}</span>
    </button>
  )
}

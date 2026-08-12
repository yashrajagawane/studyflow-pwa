export function PageHeader({ date, onProfileClick }) {
  return (
    <header className="topbar">
      <div>
        <p className="eyebrow">{date}</p>
        <h1>Good morning, Yashraj <span aria-hidden="true">👋</span></h1>
      </div>
      <button className="profile-button" type="button" onClick={onProfileClick} aria-label="Open profile">
        Y
      </button>
    </header>
  )
}

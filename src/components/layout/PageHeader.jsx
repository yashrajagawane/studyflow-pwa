export function PageHeader({ date }) {
  return (
    <header className="topbar">
      <div>
        <p className="eyebrow">{date}</p>
        <h1>Good morning, learner <span aria-hidden="true">👋</span></h1>
      </div>
    </header>
  )
}

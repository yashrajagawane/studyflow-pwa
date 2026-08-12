export function StatCard({ label, value, detail, icon }) {
  return (
    <article className="stat-card">
      <div className="stat-icon" aria-hidden="true">{icon}</div>
      <p>{label}</p>
      <strong>{value}</strong>
      <span>{detail}</span>
    </article>
  )
}

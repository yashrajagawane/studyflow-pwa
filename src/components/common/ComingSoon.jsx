export function ComingSoon({ page }) {
  return (
    <section className="coming-soon panel">
      <div className="empty-icon" aria-hidden="true">✦</div>
      <p className="card-kicker">NEXT BUILD PHASE</p>
      <h2>{page} is coming next.</h2>
      <p>This navigation is ready. The {page.toLowerCase()} experience will be added incrementally in the next phase.</p>
    </section>
  )
}

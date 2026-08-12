export function EmptyState({ title, description, actionLabel, onAction }) {
  return (
    <div className="empty-state">
      <div className="empty-icon" aria-hidden="true">✦</div>
      <h3>{title}</h3>
      <p>{description}</p>
      {actionLabel && onAction ? (
        <button className="secondary-button" type="button" onClick={onAction}>
          {actionLabel} <span aria-hidden="true">→</span>
        </button>
      ) : null}
    </div>
  )
}

export function StorageNotice({ error }) {
  if (!error) return null

  const message = error === 'invalid'
    ? 'Some saved planner data could not be read. The app is using a safe empty state.'
    : 'Browser saving is unavailable. Your changes may be lost when this tab closes.'

  return <div className="storage-notice" role="status">{message}</div>
}

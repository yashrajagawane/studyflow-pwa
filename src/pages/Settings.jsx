import { useState } from 'react'
import { ConfirmationModal } from '../components/common/ConfirmationModal'

export function Settings({ taskCount, sessionCount, onClearAll }) {
  const [confirmOpen, setConfirmOpen] = useState(false)

  const clearData = () => {
    onClearAll()
    setConfirmOpen(false)
  }

  return (
    <div className="settings-page">
      <div className="page-intro"><div><p className="card-kicker">PREFERENCES</p><h2>Settings</h2><p className="page-description">Understand and manage how Study Planner works on this device.</p></div></div>

      <section className="settings-grid">
        <article className="panel settings-card"><div className="settings-icon">▤</div><div><p className="card-kicker">ABOUT THE APP</p><h3>Student Study Planner</h3><p>A calm, mobile-first workspace for turning study goals into consistent progress.</p><span className="settings-version">MVP · Version 0.1</span></div></article>
        <article className="panel settings-card"><div className="settings-icon">⌂</div><div><p className="card-kicker">YOUR DATA</p><h3>Stored on this device</h3><p>Your tasks and sessions are saved in this browser using local storage. Nothing is sent to a server in this MVP.</p><span className="settings-version">{taskCount} tasks · {sessionCount} sessions</span></div></article>
      </section>

      <section className="panel danger-zone"><div><p className="card-kicker">DATA MANAGEMENT</p><h2>Clear planner data</h2><p>This removes all tasks and study sessions saved by this app on this device. It cannot be undone.</p></div><button className="danger-button" type="button" onClick={() => setConfirmOpen(true)} disabled={taskCount === 0 && sessionCount === 0}>Clear all data</button></section>

      <section className="panel settings-info"><div className="info-row"><span aria-hidden="true">✓</span><div><h3>Privacy by default</h3><p>The MVP has no login, analytics, backend, or external API. Your planner data stays in your browser.</p></div></div><div className="info-row"><span aria-hidden="true">◷</span><div><h3>PWA ready later</h3><p>Once PWA packaging is added, this same local data model will continue to work from the installed app.</p></div></div></section>

      {confirmOpen ? <ConfirmationModal title="Clear all planner data?" description="All tasks and study sessions saved by Student Study Planner on this device will be permanently removed." confirmLabel="Clear everything" onConfirm={clearData} onCancel={() => setConfirmOpen(false)} /> : null}
    </div>
  )
}

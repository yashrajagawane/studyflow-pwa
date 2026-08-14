import { useRef, useState } from 'react'
import { ConfirmationModal } from '../components/common/ConfirmationModal'
import { downloadBackup, parseBackup } from '../services/backupService'
import { parseSyncPayload } from '../services/syncService'

export function Settings({ tasks, sessions, taskCount, sessionCount, onClearAll, onImport, onMerge, reminders }) {
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [importPending, setImportPending] = useState(null)
  const [backupMessage, setBackupMessage] = useState(null)
  const [importMode, setImportMode] = useState('replace')
  const fileInput = useRef(null)

  const clearData = () => {
    onClearAll()
    setConfirmOpen(false)
  }

  const exportData = () => {
    downloadBackup(tasks, sessions)
    setBackupMessage('Backup downloaded successfully.')
  }

  const importData = async (event) => {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return
    try {
      setImportPending(importMode === 'merge' ? parseSyncPayload(await file.text()) : parseBackup(await file.text()))
    } catch (error) {
      setBackupMessage(error.message || 'Could not restore this backup.')
    }
  }

  return (
    <div className="settings-page">
      <div className="page-intro"><div><p className="card-kicker">PREFERENCES</p><h2>Settings</h2><p className="page-description">Understand and manage how Study Planner works on this device.</p></div></div>

      <section className="settings-grid">
        <article className="panel settings-card"><div className="settings-icon">▤</div><div><p className="card-kicker">ABOUT THE APP</p><h3>Student Study Planner</h3><p>A calm, mobile-first workspace for turning study goals into consistent progress.</p><span className="settings-version">MVP · Version 0.1</span></div></article>
        <article className="panel settings-card"><div className="settings-icon">⌂</div><div><p className="card-kicker">YOUR DATA</p><h3>Stored on this device</h3><p>Your tasks and sessions are saved in this browser using local storage. Nothing is sent to a server in this MVP.</p><span className="settings-version">{taskCount} tasks · {sessionCount} sessions</span></div></article>
      </section>

      <section className="panel danger-zone"><div><p className="card-kicker">DATA MANAGEMENT</p><h2>Clear planner data</h2><p>This removes all tasks and study sessions saved by this app on this device. It cannot be undone.</p></div><button className="danger-button" type="button" onClick={() => setConfirmOpen(true)} disabled={taskCount === 0 && sessionCount === 0}>Clear all data</button></section>

      <section className="panel backup-zone"><div><p className="card-kicker">DATA PORTABILITY</p><h2>Backup your planner</h2><p>Export tasks and sessions to a JSON file, or restore a previous backup on this device. Your data stays local.</p>{backupMessage ? <p className="backup-message" role="status">{backupMessage}</p> : null}</div><div className="backup-actions"><button className="secondary-button" type="button" onClick={exportData} disabled={taskCount === 0 && sessionCount === 0}>Export backup</button><button className="secondary-button" type="button" onClick={() => { setImportMode('merge'); fileInput.current?.click() }}>Merge backup</button><button className="primary-button" type="button" onClick={() => { setImportMode('replace'); fileInput.current?.click() }}>Import backup</button><input ref={fileInput} type="file" accept="application/json,.json" onChange={importData} hidden /></div></section>

      <section className="panel backup-zone"><div><p className="card-kicker">OPTIONAL REMINDERS</p><h2>Browser reminders</h2><p>Get a reminder up to 15 minutes before a scheduled session while this app is open. Permission is optional and stays in this browser.</p><p className="backup-message" role="status">{!reminders.remindersSupported ? 'This browser does not support notifications.' : reminders.remindersPermission === 'denied' ? 'Notifications are blocked. Allow them in your browser settings to enable reminders.' : reminders.remindersEnabled ? 'Reminders are enabled on this device.' : 'Reminders are currently off.'}</p></div><div className="backup-actions"><button className="secondary-button" type="button" onClick={reminders.requestReminders} disabled={!reminders.remindersSupported || reminders.remindersPermission === 'denied'}>{reminders.remindersEnabled ? 'Reminders enabled' : 'Enable reminders'}</button></div></section>

      <section className="panel settings-info"><div className="info-row"><span aria-hidden="true">✓</span><div><h3>Privacy by default</h3><p>The MVP has no login, analytics, backend, or external API. Your planner data stays in your browser.</p></div></div><div className="info-row"><span aria-hidden="true">◷</span><div><h3>PWA ready later</h3><p>Once PWA packaging is added, this same local data model will continue to work from the installed app.</p></div></div></section>

      {confirmOpen ? <ConfirmationModal title="Clear all planner data?" description="All tasks and study sessions saved by Student Study Planner on this device will be permanently removed." confirmLabel="Clear everything" onConfirm={clearData} onCancel={() => setConfirmOpen(false)} /> : null}
      {importPending ? <ConfirmationModal title={importMode === 'merge' ? 'Merge this backup?' : 'Restore this backup?'} description={importMode === 'merge' ? 'Merging keeps both datasets and uses the most recently updated copy when the same record exists.' : 'Restoring will replace the tasks and study sessions currently saved on this device.'} confirmLabel={importMode === 'merge' ? 'Merge backup' : 'Restore backup'} onConfirm={() => { if (importMode === 'merge') { onMerge(importPending); setBackupMessage('Backup merged successfully.') } else { onImport(importPending); setBackupMessage('Backup restored successfully.') } setImportPending(null) }} onCancel={() => setImportPending(null)} /> : null}
    </div>
  )
}

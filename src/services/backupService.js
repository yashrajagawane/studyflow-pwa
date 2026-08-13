import { STORAGE_SCHEMA_VERSION } from './storageService'

export function createBackup(tasks, sessions) {
  return { app: 'student-study-planner', version: STORAGE_SCHEMA_VERSION, exportedAt: new Date().toISOString(), tasks, sessions }
}

export function parseBackup(text) {
  const backup = JSON.parse(text)
  if (!backup || backup.app !== 'student-study-planner' || !Array.isArray(backup.tasks) || !Array.isArray(backup.sessions)) throw new Error('This file is not a valid Study Planner backup.')
  return { tasks: backup.tasks, sessions: backup.sessions }
}

export function downloadBackup(tasks, sessions) {
  const blob = new Blob([JSON.stringify(createBackup(tasks, sessions), null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `study-planner-backup-${new Date().toISOString().slice(0, 10)}.json`
  link.click()
  URL.revokeObjectURL(url)
}

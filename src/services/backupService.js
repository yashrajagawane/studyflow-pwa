import { STORAGE_SCHEMA_VERSION } from './storageService'
import { validateScheduleSession } from '../utils/scheduleValidation'
import { validateTask } from '../utils/validation'

export function createBackup(tasks, sessions) {
  return { app: 'student-study-planner', version: STORAGE_SCHEMA_VERSION, exportedAt: new Date().toISOString(), tasks, sessions }
}

export function parseBackup(text) {
  const backup = JSON.parse(text)
  if (!backup || backup.app !== 'student-study-planner' || !Array.isArray(backup.tasks) || !Array.isArray(backup.sessions)) throw new Error('This file is not a valid Study Planner backup.')
  const invalidTask = backup.tasks.find((task) => !task || typeof task !== 'object' || typeof task.id !== 'string' || Object.keys(validateTask(task)).length > 0)
  const invalidSession = backup.sessions.find((session) => !session || typeof session !== 'object' || typeof session.id !== 'string' || Object.keys(validateScheduleSession(session)).length > 0)
  if (invalidTask || invalidSession) throw new Error('This backup contains invalid task or study-session data.')
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

import { STORAGE_SCHEMA_VERSION } from './storageService'
import { validateScheduleSession } from '../utils/scheduleValidation'
import { validateTask } from '../utils/validation'

function recordTime(record) {
  return Date.parse(record.updatedAt || record.completedAt || record.createdAt || '') || 0
}

function sameRecordContent(left, right) {
  const normalize = (record) => {
    const content = { ...record }
    delete content.updatedAt
    return JSON.stringify(content)
  }
  return normalize(left) === normalize(right)
}

function mergeRecords(localRecords, incomingRecords) {
  const records = new Map(localRecords.map((record) => [record.id, record]))
  incomingRecords.forEach((incoming) => {
    const local = records.get(incoming.id)
    if (!local || recordTime(incoming) >= recordTime(local)) records.set(incoming.id, incoming)
  })
  return [...records.values()]
}

export function createSyncPayload(tasks, sessions, deviceId = 'local-device') {
  return { app: 'student-study-planner', version: STORAGE_SCHEMA_VERSION, deviceId, exportedAt: new Date().toISOString(), tasks, sessions }
}

export function parseSyncPayload(text) {
  const payload = JSON.parse(text)
  if (!payload || payload.app !== 'student-study-planner' || !Array.isArray(payload.tasks) || !Array.isArray(payload.sessions)) throw new Error('This file is not a valid Study Planner sync package.')
  const invalidTask = payload.tasks.find((task) => !task || typeof task !== 'object' || typeof task.id !== 'string' || Object.keys(validateTask(task)).length > 0)
  const invalidSession = payload.sessions.find((session) => !session || typeof session !== 'object' || typeof session.id !== 'string' || Object.keys(validateScheduleSession(session)).length > 0)
  if (invalidTask || invalidSession) throw new Error('This sync package contains invalid task or study-session data.')
  return { tasks: payload.tasks, sessions: payload.sessions, deviceId: payload.deviceId || 'unknown-device' }
}

export function mergeSyncData(localData, incomingData) {
  return { tasks: mergeRecords(localData.tasks, incomingData.tasks), sessions: mergeRecords(localData.sessions, incomingData.sessions) }
}

export function findSyncConflicts(localData, incomingData) {
  const conflicts = []
  for (const [type, localRecords, incomingRecords] of [['task', localData.tasks, incomingData.tasks], ['session', localData.sessions, incomingData.sessions]]) {
    const localById = new Map(localRecords.map((record) => [record.id, record]))
    incomingRecords.forEach((incoming) => {
      const local = localById.get(incoming.id)
      if (!local || sameRecordContent(local, incoming)) return
      conflicts.push({
        id: incoming.id,
        type,
        title: incoming.title || local.title || 'Untitled record',
        winner: recordTime(incoming) >= recordTime(local) ? 'cloud' : 'this device',
      })
    })
  }
  return conflicts
}

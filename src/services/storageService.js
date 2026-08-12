export const STORAGE_KEYS = {
  tasks: 'study-planner-tasks',
  schedule: 'study-planner-schedule',
  settings: 'study-planner-settings',
  schemaVersion: 'study-planner-schema-version',
}

export const STORAGE_SCHEMA_VERSION = '1'

function getStorage() {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return null
    const testKey = '__study_planner_storage_test__'
    window.localStorage.setItem(testKey, 'ok')
    window.localStorage.removeItem(testKey)
    return window.localStorage
  } catch {
    return null
  }
}

export function readStoredValue(key, fallback) {
  const storage = getStorage()
  if (!storage) return { value: fallback, error: 'unavailable' }

  try {
    const raw = storage.getItem(key)
    if (raw === null) return { value: fallback, error: null }
    return { value: JSON.parse(raw), error: null }
  } catch {
    return { value: fallback, error: 'invalid' }
  }
}

export function writeStoredValue(key, value) {
  const storage = getStorage()
  if (!storage) return { success: false, error: 'unavailable' }

  try {
    storage.setItem(key, JSON.stringify(value))
    storage.setItem(STORAGE_KEYS.schemaVersion, STORAGE_SCHEMA_VERSION)
    return { success: true, error: null }
  } catch {
    return { success: false, error: 'write-failed' }
  }
}

export function removeStoredValue(key) {
  const storage = getStorage()
  if (!storage) return { success: false, error: 'unavailable' }

  try {
    storage.removeItem(key)
    return { success: true, error: null }
  } catch {
    return { success: false, error: 'remove-failed' }
  }
}

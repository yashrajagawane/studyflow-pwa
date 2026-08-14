import { useCallback, useEffect } from 'react'
import { useLocalStorage } from './useLocalStorage'

function createId() {
  return typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : `session-${Date.now()}-${Math.random().toString(16).slice(2)}`
}

export function useSchedule() {
  const { value: storedSessions, setValue: setSessions, storageError } = useLocalStorage('study-planner-schedule', [])
  const sessions = Array.isArray(storedSessions) ? storedSessions : []

  useEffect(() => {
    if (!Array.isArray(storedSessions)) setSessions([])
  }, [storedSessions, setSessions])

  const createSession = useCallback((session) => {
    const now = new Date().toISOString()
    setSessions((current) => [...current, { ...session, id: createId(), createdAt: now, updatedAt: now }])
  }, [setSessions])

  const updateSession = useCallback((session) => {
    setSessions((current) => current.map((item) => item.id === session.id ? { ...session, updatedAt: new Date().toISOString() } : item))
  }, [setSessions])

  const deleteSession = useCallback((sessionId) => {
    setSessions((current) => current.filter((session) => session.id !== sessionId))
  }, [setSessions])

  const clearSchedule = useCallback(() => setSessions([]), [setSessions])
  const importSchedule = useCallback((nextSessions) => setSessions(nextSessions), [setSessions])

  return { sessions, createSession, updateSession, deleteSession, clearSchedule, importSchedule, storageError }
}

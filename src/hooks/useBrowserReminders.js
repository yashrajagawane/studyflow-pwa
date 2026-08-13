import { useCallback, useEffect, useState } from 'react'

const remindersKey = 'study-planner-reminders-enabled'

function getReminderId(session) {
  return `study-planner-reminder-${session.id}-${session.date}-${session.startTime}`
}

function checkUpcomingSessions(sessions) {
  if (typeof window === 'undefined' || !('Notification' in window) || Notification.permission !== 'granted') return
  const now = Date.now()
  const horizon = now + 15 * 60 * 1000
  sessions.forEach((session) => {
    const startsAt = new Date(`${session.date}T${session.startTime}`).getTime()
    const reminderId = getReminderId(session)
    if (startsAt < now || startsAt > horizon || localStorage.getItem(reminderId)) return
    new Notification(`Study session soon: ${session.title}`, { body: `${session.startTime} · ${session.subject}`, tag: reminderId })
    localStorage.setItem(reminderId, 'sent')
  })
}

export function useBrowserReminders(sessions) {
  const supported = typeof window !== 'undefined' && 'Notification' in window
  const [permission, setPermission] = useState(supported ? Notification.permission : 'unsupported')
  const [enabled, setEnabled] = useState(() => {
    try { return localStorage.getItem(remindersKey) === 'true' } catch { return false }
  })

  const requestReminders = useCallback(async () => {
    if (!supported) return 'unsupported'
    const nextPermission = permission === 'granted' ? 'granted' : await Notification.requestPermission()
    setPermission(nextPermission)
    const nextEnabled = nextPermission === 'granted'
    setEnabled(nextEnabled)
    localStorage.setItem(remindersKey, String(nextEnabled))
    return nextPermission
  }, [permission, supported])

  useEffect(() => {
    if (!enabled || permission !== 'granted') return undefined
    checkUpcomingSessions(sessions)
    const interval = window.setInterval(() => checkUpcomingSessions(sessions), 60 * 1000)
    return () => window.clearInterval(interval)
  }, [enabled, permission, sessions])

  return { remindersSupported: supported, remindersPermission: permission, remindersEnabled: enabled, requestReminders }
}

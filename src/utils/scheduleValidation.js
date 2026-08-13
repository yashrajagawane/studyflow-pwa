import { subjects } from '../data/taskConstants'
import { isValidDateInput } from './dateUtils'

export function validateScheduleSession(session) {
  const errors = {}
  const title = session.title?.trim() ?? ''

  if (!title) errors.title = 'Add a title for this study session.'
  if (title.length > 120) errors.title = 'Keep the title under 120 characters.'
  if (!subjects.includes(session.subject)) errors.subject = 'Choose a valid subject.'
  if (!isValidDateInput(session.date)) errors.date = 'Choose a valid session date.'
  if (!/^\d{2}:\d{2}$/.test(session.startTime)) errors.startTime = 'Choose a valid start time.'
  if (!/^\d{2}:\d{2}$/.test(session.endTime)) errors.endTime = 'Choose a valid end time.'
  if (session.startTime && session.endTime && session.endTime <= session.startTime) errors.endTime = 'End time must be after start time.'
  if ((session.notes?.length ?? 0) > 500) errors.notes = 'Keep notes under 500 characters.'

  return errors
}

export function findScheduleConflict(session, sessions) {
  return sessions.find((existing) => existing.id !== session.id && existing.date === session.date && session.startTime < existing.endTime && session.endTime > existing.startTime)
}

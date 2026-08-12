import { priorities, subjects } from '../data/taskConstants'
import { isValidDateInput } from './dateUtils'

export function validateTask(task) {
  const errors = {}
  const title = task.title?.trim() ?? ''

  if (!title) errors.title = 'Add a title for this study task.'
  if (title.length > 120) errors.title = 'Keep the title under 120 characters.'
  if (!subjects.includes(task.subject)) errors.subject = 'Choose a valid subject.'
  if (!priorities.includes(task.priority)) errors.priority = 'Choose a valid priority.'
  if (task.deadline && !isValidDateInput(task.deadline)) errors.deadline = 'Enter a valid deadline.'
  if ((task.notes?.length ?? 0) > 500) errors.notes = 'Keep notes under 500 characters.'

  return errors
}

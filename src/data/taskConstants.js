export const subjects = [
  'DSA',
  'DBMS',
  'Operating Systems',
  'Computer Networks',
  'Machine Learning',
  'Web Development',
  'Mathematics',
  'Other',
]

export const priorities = ['low', 'medium', 'high']
export const recurrenceOptions = [
  { value: 'none', label: 'Does not repeat' },
  { value: 'daily', label: 'Repeats daily' },
  { value: 'weekly', label: 'Repeats weekly' },
]

export const taskFilters = [
  { value: 'all', label: 'All tasks' },
  { value: 'today', label: 'Today' },
  { value: 'upcoming', label: 'Upcoming' },
  { value: 'completed', label: 'Completed' },
  { value: 'overdue', label: 'Overdue' },
]

export const emptyTask = {
  title: '',
  subject: 'DSA',
  priority: 'medium',
  deadline: '',
  notes: '',
  recurrence: 'none',
}

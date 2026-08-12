import { getLocalDateInputValue } from '../utils/dateUtils'

export const emptyScheduleSession = {
  title: '',
  subject: 'DSA',
  date: getLocalDateInputValue(),
  startTime: '09:00',
  endTime: '10:00',
  notes: '',
}

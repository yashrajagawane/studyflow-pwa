function escapeIcsValue(value = '') {
  return String(value).replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\r?\n/g, '\\n')
}

function toIcsDateTime(date, time) {
  return `${date.replaceAll('-', '')}T${time.replace(':', '')}00`
}

export function createCalendarFile(sessions) {
  const events = sessions.map((session) => [
    'BEGIN:VEVENT',
    `UID:${escapeIcsValue(session.id)}@student-study-planner`,
    `DTSTART:${toIcsDateTime(session.date, session.startTime)}`,
    `DTEND:${toIcsDateTime(session.date, session.endTime)}`,
    `SUMMARY:${escapeIcsValue(session.title)}`,
    `DESCRIPTION:${escapeIcsValue(session.notes)}`,
    `CATEGORIES:${escapeIcsValue(session.subject)}`,
    'END:VEVENT',
  ].join('\r\n')).join('\r\n')

  return ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Student Study Planner//EN', 'CALSCALE:GREGORIAN', events, 'END:VCALENDAR', ''].join('\r\n')
}

export function downloadCalendar(sessions) {
  const blob = new Blob([createCalendarFile(sessions)], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = 'study-planner-schedule.ics'
  anchor.click()
  URL.revokeObjectURL(url)
}

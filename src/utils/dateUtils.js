export function getLocalDateInputValue(date = new Date()) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function isValidDateInput(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false
  const [year, month, day] = value.split('-').map(Number)
  const date = new Date(year, month - 1, day)
  return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day
}

export function formatDateLabel(value) {
  if (!value) return 'No deadline'
  const [year, month, day] = value.split('-').map(Number)
  return new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(year, month - 1, day))
}

export function isToday(value) {
  return value === getLocalDateInputValue()
}

export function isPastDate(value) {
  return Boolean(value) && value < getLocalDateInputValue()
}

export function isFutureDate(value) {
  return Boolean(value) && value > getLocalDateInputValue()
}

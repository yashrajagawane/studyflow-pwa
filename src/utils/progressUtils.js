import { getLocalDateInputValue } from './dateUtils'

function dateFromInput(value) {
  const [year, month, day] = value.split('-').map(Number)
  return new Date(year, month - 1, day)
}

function toDateInputValue(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function addDays(value, amount) {
  const date = dateFromInput(value)
  date.setDate(date.getDate() + amount)
  return toDateInputValue(date)
}

export function getWeekDates(referenceDate = new Date()) {
  const date = new Date(referenceDate)
  const day = date.getDay()
  const daysSinceMonday = day === 0 ? 6 : day - 1
  date.setHours(0, 0, 0, 0)
  date.setDate(date.getDate() - daysSinceMonday)

  return Array.from({ length: 7 }, (_, index) => {
    const nextDate = new Date(date)
    nextDate.setDate(date.getDate() + index)
    return toDateInputValue(nextDate)
  })
}

function getCompletionPercentage(completed, total) {
  return total === 0 ? 0 : Math.round((completed / total) * 100)
}

export function getProgressSummary(tasks, today = getLocalDateInputValue()) {
  const todayTasks = tasks.filter((task) => task.deadline === today)
  const todayCompleted = todayTasks.filter((task) => task.status === 'completed').length
  const upcomingCount = tasks.filter((task) => task.status !== 'completed' && task.deadline > today).length
  const overdueCount = tasks.filter((task) => task.status !== 'completed' && task.deadline && task.deadline < today).length

  return {
    todayTotal: todayTasks.length,
    todayCompleted,
    todayProgress: getCompletionPercentage(todayCompleted, todayTasks.length),
    upcomingCount,
    overdueCount,
  }
}

export function getWeeklyProgress(tasks, referenceDate = new Date()) {
  return getWeekDates(referenceDate).map((date) => {
    const dayTasks = tasks.filter((task) => task.deadline === date)
    const completed = dayTasks.filter((task) => task.status === 'completed').length
    const dateObject = dateFromInput(date)
    return {
      date,
      label: new Intl.DateTimeFormat('en-IN', { weekday: 'long' }).format(dateObject),
      shortLabel: new Intl.DateTimeFormat('en-IN', { weekday: 'short' }).format(dateObject),
      total: dayTasks.length,
      completed,
      percentage: getCompletionPercentage(completed, dayTasks.length),
    }
  })
}

export function getWeeklySummary(tasks, referenceDate = new Date()) {
  const days = getWeeklyProgress(tasks, referenceDate)
  const total = days.reduce((sum, day) => sum + day.total, 0)
  const completed = days.reduce((sum, day) => sum + day.completed, 0)

  return {
    days,
    total,
    completed,
    percentage: getCompletionPercentage(completed, total),
  }
}

export function getStreakSummary(tasks, today = getLocalDateInputValue()) {
  const completedDates = new Set(tasks
    .filter((task) => task.status === 'completed' && task.completedAt)
    .map((task) => {
      const date = new Date(task.completedAt)
      return Number.isNaN(date.getTime()) ? null : toDateInputValue(date)
    })
    .filter(Boolean))

  let currentStreak = 0
  let cursor = completedDates.has(today) ? today : addDays(today, -1)
  while (completedDates.has(cursor)) {
    currentStreak += 1
    cursor = addDays(cursor, -1)
  }

  const sortedDates = [...completedDates].sort()
  let longestStreak = 0
  let runningStreak = 0
  let previousDate = null
  sortedDates.forEach((date) => {
    runningStreak = previousDate && addDays(previousDate, 1) === date ? runningStreak + 1 : 1
    longestStreak = Math.max(longestStreak, runningStreak)
    previousDate = date
  })

  return { currentStreak, longestStreak, activeToday: completedDates.has(today) }
}

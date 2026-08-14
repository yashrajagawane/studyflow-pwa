import { useCallback, useEffect } from 'react'
import { useLocalStorage } from './useLocalStorage'

function createId() {
  return typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : `task-${Date.now()}-${Math.random().toString(16).slice(2)}`
}

function getNextDeadline(deadline, recurrence) {
  if (!deadline || recurrence === 'none') return ''
  const date = new Date(`${deadline}T12:00:00`)
  date.setDate(date.getDate() + (recurrence === 'weekly' ? 7 : 1))
  return date.toISOString().slice(0, 10)
}

export function useTasks() {
  const { value: storedTasks, setValue: setTasks, storageError } = useLocalStorage('study-planner-tasks', [])
  const tasks = Array.isArray(storedTasks) ? storedTasks : []

  useEffect(() => {
    if (!Array.isArray(storedTasks)) setTasks([])
  }, [storedTasks, setTasks])

  const createTask = useCallback((task) => {
    const now = new Date().toISOString()
    setTasks((current) => [...current, {
      ...task,
      id: createId(),
      status: 'pending',
      createdAt: now,
      updatedAt: now,
      completedAt: null,
    }])
  }, [setTasks])

  const updateTask = useCallback((task) => {
    setTasks((current) => current.map((item) => item.id === task.id ? { ...task, updatedAt: new Date().toISOString() } : item))
  }, [setTasks])

  const toggleTask = useCallback((taskId) => {
    setTasks((current) => current.flatMap((task) => {
      if (task.id !== taskId) return task
      const completed = task.status !== 'completed'
      const now = new Date().toISOString()
      const updated = { ...task, status: completed ? 'completed' : 'pending', completedAt: completed ? now : null, updatedAt: now }
      if (!completed || task.recurrence === 'none' || !task.deadline) return updated
      return [updated, { ...task, id: createId(), deadline: getNextDeadline(task.deadline, task.recurrence), status: 'pending', completedAt: null, createdAt: now, updatedAt: now }]
    }))
  }, [setTasks])

  const deleteTask = useCallback((taskId) => {
    setTasks((current) => current.filter((task) => task.id !== taskId))
  }, [setTasks])

  const clearTasks = useCallback(() => setTasks([]), [setTasks])
  const importTasks = useCallback((nextTasks) => setTasks(nextTasks), [setTasks])

  return { tasks, createTask, updateTask, toggleTask, deleteTask, clearTasks, importTasks, storageError }
}

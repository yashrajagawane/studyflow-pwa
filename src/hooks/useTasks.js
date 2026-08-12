import { useCallback, useEffect } from 'react'
import { useLocalStorage } from './useLocalStorage'

function createId() {
  return typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : `task-${Date.now()}-${Math.random().toString(16).slice(2)}`
}

export function useTasks() {
  const { value: storedTasks, setValue: setTasks, storageError } = useLocalStorage('study-planner-tasks', [])
  const tasks = Array.isArray(storedTasks) ? storedTasks : []

  useEffect(() => {
    if (!Array.isArray(storedTasks)) setTasks([])
  }, [storedTasks, setTasks])

  const createTask = useCallback((task) => {
    setTasks((current) => [...current, {
      ...task,
      id: createId(),
      status: 'pending',
      createdAt: new Date().toISOString(),
      completedAt: null,
    }])
  }, [setTasks])

  const updateTask = useCallback((task) => {
    setTasks((current) => current.map((item) => item.id === task.id ? task : item))
  }, [setTasks])

  const toggleTask = useCallback((taskId) => {
    setTasks((current) => current.map((task) => {
      if (task.id !== taskId) return task
      const completed = task.status !== 'completed'
      return { ...task, status: completed ? 'completed' : 'pending', completedAt: completed ? new Date().toISOString() : null }
    }))
  }, [setTasks])

  const deleteTask = useCallback((taskId) => {
    setTasks((current) => current.filter((task) => task.id !== taskId))
  }, [setTasks])

  return { tasks, createTask, updateTask, toggleTask, deleteTask, storageError }
}

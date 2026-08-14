import { useTasks } from '../hooks/useTasks'
import { useSchedule } from '../hooks/useSchedule'
import { StudyPlannerContext } from './studyPlannerContext'
import { mergeSyncData } from '../services/syncService'

export function StudyPlannerProvider({ children }) {
  const taskState = useTasks()
  const scheduleState = useSchedule()
  const clearAllData = () => {
    taskState.clearTasks()
    scheduleState.clearSchedule()
  }
  const importAllData = (data) => {
    taskState.importTasks(data.tasks)
    scheduleState.importSchedule(data.sessions)
  }
  const mergeAllData = (data) => {
    const merged = mergeSyncData({ tasks: taskState.tasks, sessions: scheduleState.sessions }, data)
    taskState.importTasks(merged.tasks)
    scheduleState.importSchedule(merged.sessions)
  }
  return <StudyPlannerContext.Provider value={{ ...taskState, ...scheduleState, clearAllData, importAllData, mergeAllData, storageError: taskState.storageError || scheduleState.storageError }}>{children}</StudyPlannerContext.Provider>
}

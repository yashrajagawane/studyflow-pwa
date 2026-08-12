import { useTasks } from '../hooks/useTasks'
import { useSchedule } from '../hooks/useSchedule'
import { StudyPlannerContext } from './studyPlannerContext'

export function StudyPlannerProvider({ children }) {
  const taskState = useTasks()
  const scheduleState = useSchedule()
  const clearAllData = () => {
    taskState.clearTasks()
    scheduleState.clearSchedule()
  }
  return <StudyPlannerContext.Provider value={{ ...taskState, ...scheduleState, clearAllData, storageError: taskState.storageError || scheduleState.storageError }}>{children}</StudyPlannerContext.Provider>
}

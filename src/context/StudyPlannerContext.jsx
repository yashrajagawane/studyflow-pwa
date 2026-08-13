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
  const importAllData = (data) => {
    taskState.importTasks(data.tasks)
    scheduleState.importSchedule(data.sessions)
  }
  return <StudyPlannerContext.Provider value={{ ...taskState, ...scheduleState, clearAllData, importAllData, storageError: taskState.storageError || scheduleState.storageError }}>{children}</StudyPlannerContext.Provider>
}

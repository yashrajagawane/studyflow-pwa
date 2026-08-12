import { useTasks } from '../hooks/useTasks'
import { useSchedule } from '../hooks/useSchedule'
import { StudyPlannerContext } from './studyPlannerContext'

export function StudyPlannerProvider({ children }) {
  const taskState = useTasks()
  const scheduleState = useSchedule()
  return <StudyPlannerContext.Provider value={{ ...taskState, ...scheduleState, storageError: taskState.storageError || scheduleState.storageError }}>{children}</StudyPlannerContext.Provider>
}

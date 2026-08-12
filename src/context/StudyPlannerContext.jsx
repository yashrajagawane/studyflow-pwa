import { useTasks } from '../hooks/useTasks'
import { StudyPlannerContext } from './studyPlannerContext'

export function StudyPlannerProvider({ children }) {
  const taskState = useTasks()
  return <StudyPlannerContext.Provider value={taskState}>{children}</StudyPlannerContext.Provider>
}

import { useContext } from 'react'
import { StudyPlannerContext } from '../context/studyPlannerContext'

export function useStudyPlanner() {
  const context = useContext(StudyPlannerContext)
  if (!context) throw new Error('useStudyPlanner must be used inside StudyPlannerProvider')
  return context
}

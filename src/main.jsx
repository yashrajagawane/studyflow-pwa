import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { StudyPlannerProvider } from './context/StudyPlannerContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <StudyPlannerProvider>
      <App />
    </StudyPlannerProvider>
  </StrictMode>,
)

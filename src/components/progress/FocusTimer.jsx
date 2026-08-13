import { useEffect, useState } from 'react'

const FOCUS_SECONDS = 25 * 60

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60).toString().padStart(2, '0')
  const remaining = (seconds % 60).toString().padStart(2, '0')
  return `${minutes}:${remaining}`
}

export function FocusTimer() {
  const [seconds, setSeconds] = useState(FOCUS_SECONDS)
  const [running, setRunning] = useState(false)

  useEffect(() => {
    if (!running || seconds === 0) return undefined
    const timer = window.setInterval(() => setSeconds((current) => Math.max(0, current - 1)), 1000)
    return () => window.clearInterval(timer)
  }, [running, seconds])

  useEffect(() => {
    if (seconds === 0) setRunning(false)
  }, [seconds])

  const reset = () => {
    setRunning(false)
    setSeconds(FOCUS_SECONDS)
  }

  return (
    <section className="panel focus-timer" aria-label="Focus timer">
      <div>
        <p className="card-kicker">FOCUS MODE</p>
        <h2>Study for one focused sprint.</h2>
        <p>Use a 25-minute timer to turn your next task into a manageable session.</p>
      </div>
      <div className="focus-timer-controls">
        <strong className="focus-time" aria-live="polite">{formatTime(seconds)}</strong>
        <div className="focus-buttons">
          <button className="primary-button" type="button" onClick={() => setRunning((current) => !current)}>{running ? 'Pause' : seconds === 0 ? 'Restart' : 'Start focus'}</button>
          <button className="secondary-button" type="button" onClick={reset}>Reset</button>
        </div>
      </div>
    </section>
  )
}

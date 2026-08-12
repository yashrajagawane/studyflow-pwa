const weekDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

export function WeeklyProgressPreview({ values = [], hasActivity = false }) {
  return (
    <>
      <div
        className="week-bars"
        aria-label={hasActivity ? 'Weekly study progress' : 'Weekly progress is empty until tasks are added'}
      >
        {weekDays.map((day, index) => (
          <div className="day-bar" key={`${day}-${index}`}>
            <div className="bar-track">
              <div className="bar-fill" style={{ height: `${values[index] ?? 0}%` }} />
            </div>
            <span>{day}</span>
          </div>
        ))}
      </div>
      <p className="panel-note">
        {hasActivity ? 'Your completion activity for the current week.' : 'Your weekly activity will appear here once you add tasks.'}
      </p>
    </>
  )
}

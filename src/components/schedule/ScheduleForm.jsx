import { useEffect, useState } from 'react'
import { subjects } from '../../data/taskConstants'
import { emptyScheduleSession } from '../../data/scheduleConstants'
import { validateScheduleSession } from '../../utils/scheduleValidation'

export function ScheduleForm({ session, onSave, onCancel }) {
  const [form, setForm] = useState(session ? { ...session } : { ...emptyScheduleSession })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    setForm(session ? { ...session } : { ...emptyScheduleSession })
    setErrors({})
  }, [session])

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: undefined }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const nextErrors = validateScheduleSession(form)
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors)
      return
    }
    onSave({ ...form, title: form.title.trim(), notes: form.notes.trim() })
  }

  return (
    <form className="task-form" onSubmit={handleSubmit} noValidate>
      <div className="form-heading">
        <div><p className="card-kicker">{session ? 'UPDATE SESSION' : 'NEW SESSION'}</p><h2>{session ? 'Edit study session' : 'Schedule a study session'}</h2></div>
        {onCancel ? <button className="icon-button" type="button" onClick={onCancel} aria-label="Close schedule form">×</button> : null}
      </div>

      <div className="form-grid">
        <label className="field field-wide"><span>Session title</span><input autoFocus value={form.title} onChange={(event) => updateField('title', event.target.value)} placeholder="e.g. DBMS revision" maxLength={120} />{errors.title ? <small className="field-error">{errors.title}</small> : null}</label>
        <label className="field"><span>Subject</span><select value={form.subject} onChange={(event) => updateField('subject', event.target.value)}>{subjects.map((subject) => <option key={subject} value={subject}>{subject}</option>)}</select>{errors.subject ? <small className="field-error">{errors.subject}</small> : null}</label>
        <label className="field"><span>Date</span><input type="date" value={form.date} onChange={(event) => updateField('date', event.target.value)} />{errors.date ? <small className="field-error">{errors.date}</small> : null}</label>
        <label className="field"><span>Start time</span><input type="time" value={form.startTime} onChange={(event) => updateField('startTime', event.target.value)} />{errors.startTime ? <small className="field-error">{errors.startTime}</small> : null}</label>
        <label className="field"><span>End time</span><input type="time" value={form.endTime} onChange={(event) => updateField('endTime', event.target.value)} />{errors.endTime ? <small className="field-error">{errors.endTime}</small> : null}</label>
        <label className="field field-wide"><span>Notes <em>Optional</em></span><textarea value={form.notes} onChange={(event) => updateField('notes', event.target.value)} placeholder="What do you want to cover?" rows="3" maxLength={500} />{errors.notes ? <small className="field-error">{errors.notes}</small> : null}</label>
      </div>

      <div className="form-actions">{onCancel ? <button className="secondary-button" type="button" onClick={onCancel}>Cancel</button> : null}<button className="primary-button" type="submit">{session ? 'Save changes' : 'Add session'}</button></div>
    </form>
  )
}

import { useEffect, useState } from 'react'
import { emptyTask, priorities, recurrenceOptions, subjects } from '../../data/taskConstants'
import { validateTask } from '../../utils/validation'

export function TaskForm({ task, onSave, onCancel }) {
  const [form, setForm] = useState(task ? { ...task } : { ...emptyTask })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    setForm(task ? { ...task } : { ...emptyTask })
    setErrors({})
  }, [task])

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: undefined }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const nextErrors = validateTask(form)
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }
    onSave({ ...form, title: form.title.trim(), notes: form.notes.trim() })
  }

  return (
    <form className="task-form" onSubmit={handleSubmit} noValidate>
      <div className="form-heading">
        <div>
          <p className="card-kicker">{task ? 'UPDATE TASK' : 'NEW TASK'}</p>
          <h2>{task ? 'Edit study task' : 'Add a study task'}</h2>
        </div>
        {onCancel ? <button className="icon-button" type="button" onClick={onCancel} aria-label="Close task form">×</button> : null}
      </div>

      <div className="form-grid">
        <label className="field field-wide">
          <span>Task title</span>
          <input autoFocus value={form.title} onChange={(event) => updateField('title', event.target.value)} placeholder="e.g. Practice Binary Trees" maxLength={120} />
          {errors.title ? <small className="field-error">{errors.title}</small> : null}
        </label>

        <label className="field">
          <span>Subject</span>
          <select value={form.subject} onChange={(event) => updateField('subject', event.target.value)}>
            {subjects.map((subject) => <option key={subject} value={subject}>{subject}</option>)}
          </select>
          {errors.subject ? <small className="field-error">{errors.subject}</small> : null}
        </label>

        <label className="field">
          <span>Repeat</span>
          <select value={form.recurrence ?? 'none'} onChange={(event) => updateField('recurrence', event.target.value)}>
            {recurrenceOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
          </select>
          {errors.recurrence ? <small className="field-error">{errors.recurrence}</small> : null}
        </label>

        <label className="field">
          <span>Priority</span>
          <select value={form.priority} onChange={(event) => updateField('priority', event.target.value)}>
            {priorities.map((priority) => <option key={priority} value={priority}>{priority[0].toUpperCase() + priority.slice(1)}</option>)}
          </select>
          {errors.priority ? <small className="field-error">{errors.priority}</small> : null}
        </label>

        <label className="field">
          <span>Deadline <em>Optional</em></span>
          <input type="date" value={form.deadline} onChange={(event) => updateField('deadline', event.target.value)} />
          {errors.deadline ? <small className="field-error">{errors.deadline}</small> : null}
        </label>

        <label className="field field-wide">
          <span>Notes <em>Optional</em></span>
          <textarea value={form.notes} onChange={(event) => updateField('notes', event.target.value)} placeholder="Add a useful study reminder..." rows="3" maxLength={500} />
          {errors.notes ? <small className="field-error">{errors.notes}</small> : null}
        </label>
      </div>

      <div className="form-actions">
        {onCancel ? <button className="secondary-button" type="button" onClick={onCancel}>Cancel</button> : null}
        <button className="primary-button" type="submit">{task ? 'Save changes' : 'Add task'}</button>
      </div>
    </form>
  )
}

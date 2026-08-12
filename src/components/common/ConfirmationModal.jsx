import { useEffect } from 'react'

export function ConfirmationModal({ title, description, confirmLabel = 'Confirm', onConfirm, onCancel }) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onCancel()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onCancel])

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onCancel() }}>
      <section className="confirmation-modal" role="dialog" aria-modal="true" aria-labelledby="confirmation-title">
        <div className="modal-warning" aria-hidden="true">!</div>
        <h2 id="confirmation-title">{title}</h2>
        <p>{description}</p>
        <div className="form-actions"><button className="secondary-button" type="button" onClick={onCancel}>Cancel</button><button className="danger-button" type="button" onClick={onConfirm}>{confirmLabel}</button></div>
      </section>
    </div>
  )
}

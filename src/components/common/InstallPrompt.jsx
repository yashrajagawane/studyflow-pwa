import { useEffect, useState } from 'react'

const DISMISS_KEY = 'studyflow-install-prompt-dismissed'

function isMobileDevice() {
  return window.matchMedia('(max-width: 800px)').matches || /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent)
}

function isInstalled() {
  return window.matchMedia('(display-mode: standalone)').matches || navigator.standalone === true
}

function isAppleMobileDevice() {
  return /iPhone|iPad|iPod/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
}

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [visible, setVisible] = useState(false)
  const [isAppleDevice, setIsAppleDevice] = useState(false)

  useEffect(() => {
    if (!isMobileDevice() || isInstalled() || sessionStorage.getItem(DISMISS_KEY) === 'true') return undefined

    const appleDevice = isAppleMobileDevice()
    setIsAppleDevice(appleDevice)

    const showPrompt = () => setVisible(true)
    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault()
      setDeferredPrompt(event)
      showPrompt()
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    const fallbackTimer = window.setTimeout(showPrompt, 900)

    return () => {
      window.clearTimeout(fallbackTimer)
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    }
  }, [])

  const dismiss = () => {
    sessionStorage.setItem(DISMISS_KEY, 'true')
    setVisible(false)
  }

  const install = async () => {
    if (!deferredPrompt) {
      dismiss()
      return
    }

    await deferredPrompt.prompt()
    await deferredPrompt.userChoice
    setDeferredPrompt(null)
    dismiss()
  }

  if (!visible) return null

  return (
    <div className="install-prompt-backdrop" role="presentation">
      <section className="install-prompt" role="dialog" aria-modal="true" aria-labelledby="install-prompt-title">
        <button className="install-prompt-close" type="button" aria-label="Close install prompt" onClick={dismiss}>×</button>
        <div className="install-prompt-icon" aria-hidden="true">▤</div>
        <p className="card-kicker">STUDY BETTER ON MOBILE</p>
        <h2 id="install-prompt-title">Install Study Planner</h2>
        {isAppleDevice ? (
          <p>Keep your planner one tap away. Tap the Share button in Safari, then choose <strong>Add to Home Screen</strong>.</p>
        ) : deferredPrompt ? (
          <p>Get a faster, distraction-free study planner that works even when you are offline.</p>
        ) : (
          <p>Open your browser menu and choose <strong>Install app</strong> or <strong>Add to Home screen</strong> to keep your planner one tap away.</p>
        )}
        <div className="install-prompt-actions">
          {!isAppleDevice && deferredPrompt && <button className="primary-button" type="button" onClick={install}>Install app</button>}
          <button className="secondary-button" type="button" onClick={dismiss}>{isAppleDevice ? 'Got it' : 'Maybe later'}</button>
        </div>
      </section>
    </div>
  )
}

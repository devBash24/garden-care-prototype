import { useEffect, useMemo, useState } from 'react'

// Minimal type for the non-standard event
type BeforeInstallPromptEvent = Event & {
  readonly platforms: string[]
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>
}

function isStandalone(): boolean {
  // Desktop/Android
  const standaloneMq = window.matchMedia('(display-mode: standalone)').matches
  // iOS Safari
  const iosStandalone = (navigator as any).standalone === true
  return standaloneMq || iosStandalone
}

export default function InstallPWAButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [installed, setInstalled] = useState<boolean>(false)

  useEffect(() => {
    setInstalled(isStandalone())

    const onBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
    }

    const onAppInstalled = () => {
      setInstalled(true)
      setDeferredPrompt(null)
    }

    window.addEventListener('beforeinstallprompt', onBeforeInstallPrompt)
    window.addEventListener('appinstalled', onAppInstalled)

    return () => {
      window.removeEventListener('beforeinstallprompt', onBeforeInstallPrompt)
      window.removeEventListener('appinstalled', onAppInstalled)
    }
  }, [])

  const canInstall = useMemo(() => !!deferredPrompt && !installed, [deferredPrompt, installed])

  const handleInstall = async () => {
    if (!deferredPrompt) return
    await deferredPrompt.prompt()
    try {
      await deferredPrompt.userChoice
    } finally {
      // Either way, the browser may disallow re-prompting; clear our handle
      setDeferredPrompt(null)
    }
  }

  if (!canInstall) return null

  return (
    <button
      onClick={handleInstall}
      style={{
        padding: '0.6rem 1rem',
        borderRadius: 8,
        border: '1px solid #10B981',
        background: '#10B981',
        color: 'white',
        cursor: 'pointer',
        fontWeight: 600,
        marginTop: 12,
      }}
      aria-label="Install app"
    >
      Install App
    </button>
  )
}


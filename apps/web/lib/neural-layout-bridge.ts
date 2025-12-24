export type ProtectionMotionSignal = {
  allowed: boolean
  confidence: number
  intent: 'navigate' | 'hover' | 'preload'
  reason?: string
}

export function emitProtectionMotion(signal: ProtectionMotionSignal) {
  window.dispatchEvent(
    new CustomEvent('neural-protection-motion', {
      detail: signal
    })
  )
}

export type ProtectionLog = {
  path: string
  allowed: boolean
  confidence: number
  reason: string
  timestamp: number
}

export function logProtectionDecision(log: ProtectionLog) {
  navigator.sendBeacon(
    '/api/telemetry/protection',
    JSON.stringify(log)
  )
}

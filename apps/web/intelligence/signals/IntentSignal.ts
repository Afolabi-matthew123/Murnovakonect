import { UISignal } from '../types/SignalTypes';

export function createIntentSignal(intent: string, confidence: number): UISignal {
  return {
    id: 'intent-' + intent,
    type: 'intent',
    confidence,
    urgency: 0.3,
    weight: 1.0,
    allowed: true,
    payload: { intent }
  };
}

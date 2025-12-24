import { UISignal } from '../types/SignalTypes';

export function createUrgencySignal(
  source: string,
  urgency: number
): UISignal {
  return {
    id: 'urgency-' + source,
    type: 'urgency',
    confidence: 1,
    urgency,
    weight: 1.5,
    allowed: true,
    payload: { source }
  };
}

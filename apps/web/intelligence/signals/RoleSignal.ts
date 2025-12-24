import { UISignal } from '../types/SignalTypes';

export function createRoleSignal(
  allowed: boolean,
  role: string
): UISignal {
  return {
    id: 'role-' + role,
    type: 'role',
    confidence: 1,
    urgency: 0,
    weight: 2.0,
    allowed,
    payload: { role }
  };
}

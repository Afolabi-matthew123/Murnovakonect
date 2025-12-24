export type SignalType =
  | 'intent'
  | 'role'
  | 'urgency'
  | 'cognitive'
  | 'tenant';

export interface UISignal {
  id: string;
  type: SignalType;
  confidence: number;
  urgency: number;
  weight: number;
  allowed: boolean;
  payload?: any;
}

export type ZoneUrgency = 'emergency' | 'high' | 'medium' | 'low';

export interface ZoneCompetitionRequest {
  zoneId: string;
  confidence: number;
  urgency: ZoneUrgency;
  timestamp: number;
}

export const MAX_ACTIVE_ZONES = 2;

export const URGENCY_WEIGHT: Record<ZoneUrgency, number> = {
  emergency: 1.0,
  high: 0.8,
  medium: 0.5,
  low: 0.2,
};

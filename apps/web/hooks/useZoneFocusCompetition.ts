import { FOCUS_WEIGHTS } from '@/config/focus-weights';

export interface ZoneSignal {
  zoneId: string;
  confidence: number;
  urgency: number;
}

export function useZoneFocusCompetition() {
  const calculateFocusScore = (signal: ZoneSignal): number => {
    return (
      signal.confidence * FOCUS_WEIGHTS.confidence +
      signal.urgency * FOCUS_WEIGHTS.urgency
    );
  };

  const rankZones = (signals: ZoneSignal[]) => {
    return [...signals]
      .map(signal => ({
        ...signal,
        focusScore: calculateFocusScore(signal),
      }))
      .sort((a, b) => b.focusScore - a.focusScore);
  };

  return {
    calculateFocusScore,
    rankZones,
  };
}

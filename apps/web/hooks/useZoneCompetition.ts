import { useRef, useState } from 'react';
import {
  ZoneCompetitionRequest,
  MAX_ACTIVE_ZONES,
  URGENCY_WEIGHT
} from '@/config/zone-competition';

export function useZoneCompetition() {
  const activeZones = useRef<ZoneCompetitionRequest[]>([]);
  const [blockedZones, setBlockedZones] = useState<string[]>([]);

  function scoreZone(request: ZoneCompetitionRequest) {
    return (
      request.confidence * 0.7 +
      URGENCY_WEIGHT[request.urgency] * 0.3
    );
  }

  function requestFocus(request: ZoneCompetitionRequest): boolean {
    const scored = [...activeZones.current, request]
      .sort((a, b) => scoreZone(b) - scoreZone(a));

    const allowed = scored.slice(0, MAX_ACTIVE_ZONES);
    const blocked = scored.slice(MAX_ACTIVE_ZONES);

    activeZones.current = allowed;
    setBlockedZones(blocked.map(z => z.zoneId));

    return allowed.some(z => z.zoneId === request.zoneId);
  }

  function releaseZone(zoneId: string) {
    activeZones.current = activeZones.current.filter(
      z => z.zoneId !== zoneId
    );
  }

  return {
    requestFocus,
    releaseZone,
    blockedZones,
    activeZones: activeZones.current.map(z => z.zoneId),
  };
}

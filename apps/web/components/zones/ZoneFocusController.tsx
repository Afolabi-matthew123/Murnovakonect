import { useZoneFocusCompetition, ZoneSignal } from '@/hooks/useZoneFocusCompetition';
import { FOCUS_THRESHOLDS } from '@/config/focus-weights';

interface ZoneFocusControllerProps {
  zones: ZoneSignal[];
  onFocusChange: (zoneId: string, level: 'primary' | 'elevated' | 'peripheral' | 'hidden') => void;
}

export function ZoneFocusController({ zones, onFocusChange }: ZoneFocusControllerProps) {
  const { rankZones } = useZoneFocusCompetition();

  const ranked = rankZones(zones);

  ranked.forEach((zone, index) => {
    if (zone.focusScore >= FOCUS_THRESHOLDS.primary) {
      onFocusChange(zone.zoneId, 'primary');
    } else if (zone.focusScore >= FOCUS_THRESHOLDS.elevated) {
      onFocusChange(zone.zoneId, 'elevated');
    } else if (zone.focusScore >= FOCUS_THRESHOLDS.peripheral) {
      onFocusChange(zone.zoneId, 'peripheral');
    } else {
      onFocusChange(zone.zoneId, 'hidden');
    }
  });

  return null;
}

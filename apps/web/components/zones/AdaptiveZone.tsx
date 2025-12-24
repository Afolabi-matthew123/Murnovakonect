import React from 'react';
import { ModuleHost } from './ModuleHost';
import { ZoneAI } from '@/components/intelligence/ZoneAI';

export function AdaptiveZone({ zoneType, userRole }: any) {
  return (
    <div className={quantum-zone zone-}>
      <ZoneAI role={userRole} zone={zoneType} />
      <ModuleHost role={userRole} zone={zoneType} />
    </div>
  );
}

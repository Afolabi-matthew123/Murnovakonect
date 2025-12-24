import { ReactNode } from 'react';
import { useZoneCompetition } from '@/hooks/useZoneCompetition';

interface Props {
  children: ReactNode;
}

export function ZoneCompetitionController({ children }: Props) {
  useZoneCompetition();

  return (
    <div className='zone-competition-controller'>
      {children}
    </div>
  );
}

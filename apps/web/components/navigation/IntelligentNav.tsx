import React from 'react';
import { useNavigationIntelligence } from '@/hooks/useNavigationIntelligence';

export function IntelligentNav({ role }: { role: string }) {
  const { navigation, recordUsage } = useNavigationIntelligence(role);

  return (
    <nav className='intelligent-nav'>
      {navigation.map(item => (
        <button
          key={item.id}
          onClick={() => recordUsage(item.id)}
        >
          {item.label}
        </button>
      ))}
    </nav>
  );
}

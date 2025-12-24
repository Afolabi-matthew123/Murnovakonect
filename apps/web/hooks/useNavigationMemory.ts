import { useRef } from 'react';

export function useNavigationMemory() {
  const usageMap = useRef<Record<string, number>>({});

  const recordUsage = (navId: string) => {
    usageMap.current[navId] = (usageMap.current[navId] || 0) + 1;
  };

  const prioritizeNavigation = (navItems: any[]) => {
    return [...navItems].sort((a, b) => {
      const countA = usageMap.current[a.id] || 0;
      const countB = usageMap.current[b.id] || 0;
      return countB - countA;
    });
  };

  return {
    recordUsage,
    prioritizeNavigation
  };
}

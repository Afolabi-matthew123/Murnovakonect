import { useMemo } from 'react';

export function useOrbitalPhysics(count: number, radius: number) {
  return useMemo(() => {
    return Array.from({ length: count }).map((_, index) => {
      const angle = (360 / count) * index;
      return {
        angle,
        transform: \otate(\deg) translate(\px) rotate(-\deg)\
      };
    });
  }, [count, radius]);
}

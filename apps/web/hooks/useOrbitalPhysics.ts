import { useMemo } from 'react';

interface OrbitalPhysicsConfig {
  baseDistance: number;
  hoverBoost?: number;
}

export function useOrbitalPhysics(
  index: number,
  total: number,
  config: OrbitalPhysicsConfig
) {
  return useMemo(() => {
    const angle = (360 / total) * index;
    const distance = config.baseDistance + (config.hoverBoost ?? 0);

    return {
      transform: \otate(\deg) translate(\px) rotate(-\deg)\,
      angle,
      distance,
    };
  }, [index, total, config.baseDistance, config.hoverBoost]);
}

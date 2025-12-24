import { useMemo } from 'react';

export function useNeuralPathway({ role, history }: any) {
  return useMemo(() => {
    const weights: Record<string, number> = {};

    history.forEach((path: string) => {
      weights[path] = (weights[path] || 0) + 1;
    });

    return Object.entries(weights)
      .sort((a, b) => b[1] - a[1])
      .map(([path]) => path);
  }, [role, history]);
}

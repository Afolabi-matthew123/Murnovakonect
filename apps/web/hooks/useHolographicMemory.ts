import { useRef } from 'react';

export function useHolographicMemory() {
  const memory = useRef(new Map());

  const learn = (context: string, layout: any) => {
    memory.current.set(context, layout);
  };

  const recall = (context: string) => {
    return memory.current.get(context);
  };

  return { learn, recall };
}

import { useState } from 'react';

export function useInteractionPhysics() {
  const [context, setContext] = useState<'idle' | 'focused' | 'overloaded' | 'emergency'>('idle');
  const [familiarity, setFamiliarity] = useState(0.5);

  return {
    context,
    familiarity,
    focus: () => setContext('focused'),
    overload: () => setContext('overloaded'),
    emergency: () => setContext('emergency'),
    learn: () => setFamiliarity((f) => Math.min(1, f + 0.05)),
  };
}

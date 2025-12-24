import { useEffect, useState } from 'react';

export function useLayoutTransmutation() {
  const [context, setContext] = useState('default');
  const [cognitiveState, setCognitiveState] = useState('neutral');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 8 || hour > 20) setContext('low-energy');
    else setContext('active');
  }, []);

  return {
    context,
    cognitiveState,
    triggerFocusMode: () => setCognitiveState('focused'),
    triggerEmergencyMode: () => setCognitiveState('emergency')
  };
}

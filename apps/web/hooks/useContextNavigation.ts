import { useState, useCallback } from 'react';

export function useContextNavigation(defaultContext: string) {
  const [context, setContext] = useState(defaultContext);

  const switchContext = useCallback((nextContext: string) => {
    setContext(nextContext);
  }, []);

  return {
    context,
    switchContext
  };
}

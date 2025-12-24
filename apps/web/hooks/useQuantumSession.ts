import { useState, useCallback } from 'react';

export function useQuantumSession() {
  const [token, setToken] = useState<string | null>(null);

  const startSession = useCallback((newToken: string) => {
    setToken(newToken);
    localStorage.setItem('auth_token', newToken);
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    localStorage.removeItem('auth_token');
  }, []);

  return { token, startSession, logout };
}

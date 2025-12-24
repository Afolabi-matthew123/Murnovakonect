import { useEffect, useState } from 'react';
import {
  loadLayoutSession,
  saveLayoutSession,
  LayoutSessionSnapshot
} from '@/lib/layoutSessionStorage';

export function useSessionLayout(role: string) {
  const [snapshot, setSnapshot] = useState<LayoutSessionSnapshot | null>(null);

  useEffect(() => {
    const restored = loadLayoutSession();
    if (restored && restored.role === role) {
      setSnapshot(restored);
    }
  }, [role]);

  const persistLayout = (next: LayoutSessionSnapshot) => {
    saveLayoutSession(next);
    setSnapshot(next);
  };

  return {
    layoutSnapshot: snapshot,
    persistLayout
  };
}

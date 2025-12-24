import { useEffect, useState } from 'react';

export function useSpatialNavigation(role: string) {
  const [density, setDensity] = useState<'low' | 'medium' | 'high'>('medium');

  useEffect(() => {
    switch (role) {
      case 'super-admin':
        setDensity('high');
        break;
      case 'staff':
        setDensity('medium');
        break;
      case 'parent':
      case 'student':
        setDensity('low');
        break;
      default:
        setDensity('medium');
    }
  }, [role]);

  return { density };
}

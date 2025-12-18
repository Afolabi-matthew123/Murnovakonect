export const layoutRules = {
  'super-admin': {
    orbitalRings: 3,
    panelCount: 4,
    aiPresence: 'active',
    density: 'high',
  },
  'staff': {
    orbitalRings: 2,
    panelCount: 3,
    aiPresence: 'assistive',
    density: 'medium',
  },
  'parent': {
    orbitalRings: 1,
    panelCount: 2,
    aiPresence: 'minimal',
    density: 'low',
  },
  'student': {
    orbitalRings: 1,
    panelCount: 1,
    aiPresence: 'educational',
    density: 'very-low',
  },
} as const;

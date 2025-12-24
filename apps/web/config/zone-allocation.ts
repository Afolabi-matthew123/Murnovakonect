export const ZONE_ALLOCATION = {
  'super-admin': {
    primary: 'strategic-command',
    left: 'global-metrics',
    right: 'system-health',
    top: 'temporal-overview',
    bottom: 'anomalies'
  },
  'school-admin': {
    primary: 'operations',
    left: 'staff',
    right: 'finance',
    top: 'metrics',
    bottom: 'alerts'
  },
  'staff': {
    primary: 'work-canvas',
    left: 'materials',
    right: 'students',
    top: 'schedule',
    bottom: 'updates'
  },
  'parent': {
    primary: 'child-overview',
    left: 'progress',
    right: 'communication',
    top: 'billing',
    bottom: 'events'
  },
  'student': {
    primary: 'learning',
    left: 'courses',
    right: 'achievements',
    top: 'focus',
    bottom: 'help'
  }
};

export const EDGE_PROTOCOLS = {
  LOCALHOST: {
    tenants: ['dev', 'demo'],
    mode: 'MANUAL_OVERRIDE'
  },
  INVALID_SUBDOMAIN: {
    action: 'PROMPT_SCHOOL_SELECTION'
  },
  MULTI_TENANT: {
    resolution: 'MOST_RECENT_ACTIVITY'
  }
};

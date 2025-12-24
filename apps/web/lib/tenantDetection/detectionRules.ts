export const DETECTION_RULES = {
  SUBDOMAIN: {
    confidence: 0.95,
    fallback: ['SESSION', 'GEOSPATIAL'],
    validation: 'DNS_SSL_VERIFICATION'
  },
  SESSION: {
    confidence: 0.9,
    fallback: ['BEHAVIORAL'],
    validation: 'TOKEN_TENANT_HASH'
  },
  GEOSPATIAL: {
    confidence: 0.85,
    fallback: ['TEMPORAL'],
    validation: 'LOCATION_MATCH'
  },
  BEHAVIORAL: {
    confidence: 0.8,
    fallback: ['NEURAL'],
    validation: 'PATTERN_MATCH'
  }
};

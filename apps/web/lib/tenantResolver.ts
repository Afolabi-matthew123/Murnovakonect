export function getTenantFromBrowser(): string {
  if (typeof window === 'undefined') return 'unknown';

  const host = window.location.hostname;

  if (host === 'localhost') return 'development';

  return host.split('.')[0];
}

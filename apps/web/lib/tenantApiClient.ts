import { getTenantFromBrowser } from './tenantResolver';

export async function tenantFetch(
  input: RequestInfo,
  init: RequestInit = {}
) {
  const tenant = getTenantFromBrowser();

  const headers = {
    ...(init.headers || {}),
    'X-Tenant-Slug': tenant,
  };

  return fetch(input, {
    ...init,
    headers,
    credentials: 'include',
  });
}

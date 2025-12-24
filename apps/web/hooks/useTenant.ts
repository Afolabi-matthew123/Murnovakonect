'use client';

import { useEffect, useState } from 'react';

export type TenantContext = {
  slug: string;
  source: 'subdomain' | 'localhost' | 'manual';
};

function extractTenantFromHost(): TenantContext {
  if (typeof window === 'undefined') {
    return { slug: 'unknown', source: 'manual' };
  }

  const host = window.location.hostname;

  // Local development
  if (host === 'localhost' || host.startsWith('127.')) {
    return { slug: 'development', source: 'localhost' };
  }

  const parts = host.split('.');
  const subdomain = parts[0];

  return {
    slug: subdomain,
    source: 'subdomain',
  };
}

export function useTenant() {
  const [tenant, setTenant] = useState<TenantContext | null>(null);

  useEffect(() => {
    const detected = extractTenantFromHost();
    setTenant(detected);
  }, []);

  return {
    tenant,
    tenantSlug: tenant?.slug,
    tenantSource: tenant?.source,
    isReady: Boolean(tenant),
  };
}

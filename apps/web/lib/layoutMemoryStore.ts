export function getTenantLayoutKey(
  tenantSlug: string,
  userId: string
) {
  return \	enant:\:user:\:layout\;
}

export function saveTenantLayout(
  tenantSlug: string,
  userId: string,
  layoutState: unknown
) {
  const key = getTenantLayoutKey(tenantSlug, userId);
  localStorage.setItem(key, JSON.stringify(layoutState));
}

export function loadTenantLayout(
  tenantSlug: string,
  userId: string
) {
  const key = getTenantLayoutKey(tenantSlug, userId);
  const raw = localStorage.getItem(key);
  return raw ? JSON.parse(raw) : null;
}

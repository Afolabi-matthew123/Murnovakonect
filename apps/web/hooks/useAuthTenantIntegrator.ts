export function useAuthTenantIntegrator() {
  async function bindAuthToTenant(session: any, tenant: any) {
    return {
      sessionId: session.id,
      tenantId: tenant.id,
      boundAt: Date.now()
    };
  }

  return { bindAuthToTenant };
}

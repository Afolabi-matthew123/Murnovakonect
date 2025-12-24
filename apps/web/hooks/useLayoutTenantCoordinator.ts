export function useLayoutTenantCoordinator() {
  async function persistLayout(tenant: any, layout: any) {
    localStorage.setItem(
      	enant::layout,
      JSON.stringify(layout)
    );
  }

  async function restoreLayout(tenant: any) {
    const stored = localStorage.getItem(	enant::layout);
    return stored ? JSON.parse(stored) : null;
  }

  return { persistLayout, restoreLayout };
}

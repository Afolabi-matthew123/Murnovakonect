import { loadSchoolBranding } from "@/lib/schoolBranding";

export async function resolveTenantTheme(schoolSlug: string) {
  if (!schoolSlug) {
    throw new Error("Tenant theme resolution failed: schoolSlug missing");
  }

  const branding = await loadSchoolBranding(schoolSlug);

  return {
    mode: "tenant",
    branding,
  };
}

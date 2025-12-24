import { useEffect, useState } from "react";
import { resolveTenantTheme } from "@/lib/tenantThemeResolver";
import { useTenant } from "./useTenant";

export function useTenantTheme() {
  const { schoolSlug } = useTenant();
  const [branding, setBranding] = useState(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    if (!schoolSlug) return;

    resolveTenantTheme(schoolSlug)
      .then((res) => {
        setBranding(res.branding);
        setStatus("ready");
      })
      .catch(() => setStatus("error"));
  }, [schoolSlug]);

  return {
    branding,
    status,
    isTenantMode: true,
  };
}

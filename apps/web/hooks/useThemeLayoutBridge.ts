import { useEffect } from "react";
import { useQuantumTheme } from "@/packages/ui/theme/useQuantumTheme";
import { mapThemeToLayoutSignals } from "@/lib/themeLayoutSignals";

export function useThemeLayoutBridge() {
  const { theme } = useQuantumTheme();

  useEffect(() => {
    if (!theme) return;

    const signals = mapThemeToLayoutSignals(theme);

    window.dispatchEvent(
      new CustomEvent("quantum-layout-theme-update", {
        detail: signals,
      })
    );
  }, [theme]);
}

import { QuantumThemeTokens } from "@/packages/ui/theme/quantum-tokens";

export function mapThemeToLayoutSignals(theme: QuantumThemeTokens) {
  return {
    density:
      theme.meta.intensity === "calm" ? "low" :
      theme.meta.intensity === "energetic" ? "high" :
      "normal",

    motionSpeed:
      theme.meta.emotionalContext === "stressed" ? "slow" :
      theme.meta.emotionalContext === "creative" ? "fast" :
      "normal",

    glowIntensity:
      theme.meta.mode === "platform" ? 0.4 : theme.effects.holographic.intensity,

    maxZones:
      theme.meta.emotionalContext === "stressed" ? 3 : 6,
  };
}

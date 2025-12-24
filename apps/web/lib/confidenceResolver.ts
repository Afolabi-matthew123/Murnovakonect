import{ProtectionThresholds}from'@/config/protection-thresholds';export function resolveConfidence(role:string){return ProtectionThresholds[role as keyof typeof ProtectionThresholds]||0.8}

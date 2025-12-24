import { DETECTION_RULES } from './detectionRules';

export async function detectTenantWithFallback(context: any) {
  for (const source of Object.keys(DETECTION_RULES)) {
    const result = await attemptDetection(source, context);
    if (result?.confidence >= DETECTION_RULES[source].confidence) {
      return result;
    }
  }
  return { tenant: null, confidence: 0 };
}

async function attemptDetection(source: string, context: any) {
  return null; // stub for real detectors
}

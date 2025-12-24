import { visualPredictionEngine } from './visualPredictionEngine';

export function getZoneBias(zoneId: string) {
  const confidence = visualPredictionEngine.getConfidence(zoneId);

  return {
    emphasis: Math.min(confidence * 1.2, 1),
    motionBias: confidence > 0.6 ? 'attract' : 'neutral',
    priority: confidence
  };
}

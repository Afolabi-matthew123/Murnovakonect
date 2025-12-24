export type PredictionTarget = 'navigation' | 'zone' | 'action';

export interface VisualPrediction {
  target: PredictionTarget;
  id: string;
  confidence: number; // 0 → 1
}

export class VisualPredictionEngine {
  private predictions: VisualPrediction[] = [];

  update(predictions: VisualPrediction[]) {
    this.predictions = predictions
      .sort((a, b) => b.confidence - a.confidence)
      .slice(0, 2); // Prevent overload
  }

  getPredictions() {
    return this.predictions;
  }

  getConfidence(id: string): number {
    return this.predictions.find(p => p.id === id)?.confidence ?? 0;
  }

  decay(rate = 0.02) {
    this.predictions = this.predictions
      .map(p => ({ ...p, confidence: Math.max(0, p.confidence - rate) }))
      .filter(p => p.confidence > 0.05);
  }
}

export const visualPredictionEngine = new VisualPredictionEngine();

import { useEffect, useState } from 'react';
import { visualPredictionEngine, VisualPrediction } from '../lib/visualPredictionEngine';

export function useVisualPrediction() {
  const [predictions, setPredictions] = useState<VisualPrediction[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      visualPredictionEngine.decay();
      setPredictions([...visualPredictionEngine.getPredictions()]);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return {
    predictions,
    getConfidence: (id: string) => visualPredictionEngine.getConfidence(id)
  };
}

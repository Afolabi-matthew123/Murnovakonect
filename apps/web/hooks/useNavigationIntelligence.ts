import { useNeuralPathway } from '@/components/navigation/NeuralPathway';
import { resolveNavigationWeight } from '@/lib/navigationWeight';

export function useNavigationIntelligence({ role, history }: any) {
  const predictedPaths = useNeuralPathway({ role, history });

  return {
    nextLikelyPath: predictedPaths[0],
    confidence: resolveNavigationWeight({
      roleWeight: 1,
      userWeight: predictedPaths.length
    })
  };
}

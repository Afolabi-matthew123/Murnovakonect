import { useNavigationPredictor } from '@/hooks/useNavigationPredictor';
import { MOTION_CONFIDENCE_MAP } from '@/config/motion-confidence-map';

export function useNavigationMotionBridge() {
  const { getConfidence } = useNavigationPredictor();

  const getMotionProfileForNavigation = (
    itemId: string,
    role: string,
    context: string
  ) => {
    const confidence = getConfidence(itemId, role, context);
    const motionProfile = MOTION_CONFIDENCE_MAP(confidence);

    return {
      confidence,
      motionProfile
    };
  };

  return { getMotionProfileForNavigation };
}

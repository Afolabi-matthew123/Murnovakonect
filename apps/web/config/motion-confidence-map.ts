export type MotionProfile =
  | 'snap'
  | 'guided'
  | 'fluid'
  | 'ambient';

export const MOTION_CONFIDENCE_MAP = (
  confidence: number
): MotionProfile => {
  if (confidence >= 0.9) return 'snap';
  if (confidence >= 0.6) return 'guided';
  if (confidence >= 0.3) return 'fluid';
  return 'ambient';
};

export type MotionContext =
  | 'idle'
  | 'focused'
  | 'navigating'
  | 'overloaded'
  | 'emergency';

export function computeMotionPhysics({
  role,
  context,
  familiarity,
}: {
  role: string;
  context: MotionContext;
  familiarity: number; // 0 → new, 1 → expert
}) {
  const base = {
    damping: 20,
    stiffness: 200,
    mass: 1,
  };

  if (context === 'focused') {
    base.stiffness += 100;
    base.damping += 10;
  }

  if (context === 'overloaded') {
    base.stiffness -= 50;
    base.mass += 0.5;
  }

  if (context === 'emergency') {
    base.stiffness = 1000;
    base.damping = 100;
    base.mass = 0.1;
  }

  // Familiar users get lighter motion
  base.mass -= familiarity * 0.3;

  return base;
}

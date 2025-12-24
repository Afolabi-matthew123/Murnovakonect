'use client';

import { motion } from 'framer-motion';
import { computeMotionPhysics } from './MotionEngine';

export function ZoneMotion({
  children,
  role,
  context,
  familiarity = 0.5,
}: any) {
  const physics = computeMotionPhysics({
    role,
    context,
    familiarity,
  });

  return (
    <motion.div
      layout
      transition={{
        type: 'spring',
        ...physics,
      }}
      className='zone-motion-wrapper'
    >
      {children}
    </motion.div>
  );
}

'use client';

import { motion } from 'framer-motion';

export function SpatialZoneAnimator({ active }: any) {
  return (
    <motion.div
      layout
      transition={{
        type: 'spring',
        mass: 0.8,
        stiffness: 120,
        damping: 20
      }}
      animate={{
        scale: active ? 1 : 0.94,
        opacity: active ? 1 : 0.7
      }}
    />
  );
}

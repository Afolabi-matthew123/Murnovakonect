'use client';

import { motion } from 'framer-motion';

const MOTION_PRESETS = {
  snap: {
    transition: { type: 'spring', stiffness: 500, damping: 30 }
  },
  guided: {
    transition: { type: 'spring', stiffness: 250, damping: 40 }
  },
  fluid: {
    transition: { type: 'spring', stiffness: 120, damping: 50 }
  },
  ambient: {
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

export function MotionConfidenceAdapter({
  profile,
  children
}: {
  profile: keyof typeof MOTION_PRESETS;
  children: React.ReactNode;
}) {
  return (
    <motion.div {...MOTION_PRESETS[profile]}>
      {children}
    </motion.div>
  );
}

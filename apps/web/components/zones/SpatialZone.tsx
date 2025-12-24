import { motion } from 'framer-motion';

export function SpatialZone({ children, focusLevel }: any) {
  const variants = {
    primary: { scale: 1.05, opacity: 1 },
    elevated: { scale: 1.02, opacity: 0.95 },
    peripheral: { scale: 0.98, opacity: 0.7 },
    hidden: { scale: 0.95, opacity: 0.3 },
  };

  return (
    <motion.div
      animate={focusLevel}
      variants={variants}
      transition={{ type: 'spring', stiffness: 200, damping: 25 }}
      className='spatial-zone'
    >
      {children}
    </motion.div>
  );
}

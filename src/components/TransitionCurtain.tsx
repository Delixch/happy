import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const EASE: [number, number, number, number] = [0.76, 0, 0.24, 1];

interface TransitionCurtainProps {
  /** True while the curtain should cover the screen. */
  active: boolean;
  /** Fired once the curtain fully covers the viewport — swap the route here. */
  onCovered: () => void;
  /** Fade instead of sweeping, for visitors who asked for reduced motion. */
  reduced?: boolean;
}

/**
 * Full-screen panel that sweeps up over the old page, holds while the new route
 * is swapped in behind it, then keeps sweeping up to reveal the new page.
 */
export default function TransitionCurtain({ active, onCovered, reduced = false }: TransitionCurtainProps) {
  const firedRef = useRef(false);

  useEffect(() => {
    if (active) firedRef.current = false;
  }, [active]);

  const handleComplete = () => {
    if (firedRef.current) return;
    firedRef.current = true;
    onCovered();
  };

  const panel = reduced
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.2, ease: 'easeOut' as const },
      }
    : {
        initial: { y: '100%' },
        animate: { y: '0%' },
        exit: { y: '-100%' },
        transition: { duration: 0.32, ease: EASE },
      };

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key="curtain"
          className="fixed inset-0 z-[9998] bg-[#FFFFCC]"
          {...panel}
          onAnimationComplete={handleComplete}
        />
      )}
    </AnimatePresence>
  );
}

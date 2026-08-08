import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const RISE = 32;

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Seconds to wait after the element enters the viewport. */
  delay?: number;
  /** Fraction of the element that must be visible before it plays. */
  amount?: number;
}

/**
 * Fades and lifts a single element into place the first time it scrolls into
 * view. Visitors who asked for reduced motion get the fade without the lift.
 */
export function Reveal({ children, className, delay = 0, amount = 0.2 }: RevealProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduced ? 0 : RISE }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: reduced ? 0.35 : 0.7, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

interface RevealGroupProps {
  children: ReactNode;
  className?: string;
  /** Seconds between each child starting. */
  stagger?: number;
  /** Seconds before the first child starts. */
  delay?: number;
  amount?: number;
}

/**
 * Container that plays its `RevealItem` children one after another. Wraps the
 * grid or list itself, so pass the layout classes straight through.
 */
export function RevealGroup({
  children,
  className,
  stagger = 0.09,
  delay = 0,
  amount = 0.15,
}: RevealGroupProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
    >
      {children}
    </motion.div>
  );
}

/** One staggered child of a `RevealGroup`. Plain elements stay untouched. */
export function RevealItem({ children, className }: { children: ReactNode; className?: string }) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: reduced ? 0 : RISE },
        show: { opacity: 1, y: 0, transition: { duration: reduced ? 0.35 : 0.7, ease: EASE } },
      }}
    >
      {children}
    </motion.div>
  );
}

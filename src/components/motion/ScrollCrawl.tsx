import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

interface ScrollCrawlProps {
  children: ReactNode;
  /** How far back the card tips as it leaves, in degrees. */
  tilt?: number;
  className?: string;
}

/**
 * Tips the element back and fades it as it scrolls out through the top of the
 * viewport, the way film credits recede. Nothing happens while it sits in view
 * or below the fold — the range only covers the exit.
 */
export default function ScrollCrawl({ children, tilt = 38, className = '' }: ScrollCrawlProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  // Starts bending while the card is still in the upper third, so the curve is
  // visible rather than only happening once it has left.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 35%', 'end start'],
  });

  const rotateX = useTransform(scrollYProgress, [0, 1], [0, tilt]);
  const z = useTransform(scrollYProgress, [0, 1], [0, -220]);
  const opacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.1]);

  if (reduced) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <div ref={ref} className={className}>
      {/* No perspective here on purpose — it comes from ScrollCrawlStage, so
          every card shares one vanishing point and the column reads as a
          curved surface instead of a row of identical flat tilts. */}
      <motion.div style={{ rotateX, z, opacity, transformOrigin: 'center bottom' }}>
        {children}
      </motion.div>
    </div>
  );
}

/** Shared vanishing point for a column of ScrollCrawl items. */
export function ScrollCrawlStage({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={className}
      style={{ perspective: 1200, perspectiveOrigin: '50% 0%', transformStyle: 'preserve-3d' }}
    >
      {children}
    </div>
  );
}

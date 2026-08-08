import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

interface ParallaxProps {
  children: ReactNode;
  /**
   * How far the layer drifts across a full pass through the viewport, as a
   * percentage of the container height. Keep it small — 8-15 reads as depth,
   * more reads as a broken sticky header.
   */
  distance?: number;
  /**
   * Layout classes for the clipping box. It must be positioned (`relative` or
   * `absolute …`) because the drifting layer is absolute inside it.
   */
  className?: string;
}

/**
 * Scrolls its children slower than the page so background imagery sits behind
 * the content instead of on it. The layer is oversized by `distance` on both
 * ends so no gap ever shows at the edges.
 */
export default function Parallax({ children, distance = 12, className = '' }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [`-${distance}%`, `${distance}%`]);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        className="absolute inset-x-0"
        style={
          reduced
            ? { top: 0, height: '100%' }
            : { y, top: `-${distance}%`, height: `${100 + distance * 2}%` }
        }
      >
        {children}
      </motion.div>
    </div>
  );
}

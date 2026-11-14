"use client";

import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";

/** Keeps a number inside [min, max) so the row can loop forever. */
const wrap = (min: number, max: number, v: number) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

type Props = {
  children: React.ReactNode;
  /** Percent of the row's width travelled per second. */
  speed?: number;
  reverse?: boolean;
  className?: string;
};

/**
 * A row that slides on its own and reacts to the page scroll: scroll down and
 * it speeds up, scroll up and it runs backwards. The children are rendered
 * twice so the loop has no seam.
 */
export function Marquee({ children, speed = 4, reverse = false, className = "" }: Props) {
  const baseX = useMotionValue(0);
  const direction = useRef(reverse ? -1 : 1);
  const reduce = useReducedMotion();

  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { damping: 50, stiffness: 400 });
  const boost = useTransform(smooth, [-1200, 0, 1200], [-4, 0, 4], { clamp: false });

  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    const extra = boost.get();
    if (extra < -0.05) direction.current = reverse ? 1 : -1;
    else if (extra > 0.05) direction.current = reverse ? -1 : 1;
    const move = direction.current * speed * (delta / 1000) + direction.current * extra * (delta / 1000);
    baseX.set(baseX.get() - move);
  });

  return (
    <div className={`rail ${className}`}>
      <motion.div className="track" style={reduce ? undefined : { x }}>
        {children}
        <span aria-hidden className="contents">
          {children}
        </span>
      </motion.div>
    </div>
  );
}

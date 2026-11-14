"use client";

import { motion, useReducedMotion } from "framer-motion";

const COUNT = 14;

/**
 * A quick ring of sparks thrown outward from the centre.
 * Mount it with a changing `key` to fire it again.
 */
export function Burst({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();
  if (reduce) return null;

  return (
    <span aria-hidden className={`pointer-events-none absolute inset-0 z-[4] grid place-items-center ${className}`}>
      {Array.from({ length: COUNT }, (_, i) => {
        const angle = (i / COUNT) * Math.PI * 2;
        const distance = 70 + (i % 4) * 26;
        return (
          <motion.span
            key={i}
            className="absolute size-1.5 rounded-full bg-maroon"
            initial={{ opacity: 0.9, x: 0, y: 0, scale: 1 }}
            animate={{
              opacity: 0,
              x: Math.cos(angle) * distance,
              y: Math.sin(angle) * distance,
              scale: 0.2,
            }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: (i % 5) * 0.015 }}
          />
        );
      })}
    </span>
  );
}

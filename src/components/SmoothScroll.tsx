"use client";

import { ReactLenis } from "lenis/react";
import { useReducedMotion } from "framer-motion";

/** Smooth, eased page scrolling. Turned off for people who prefer reduced motion. */
export function SmoothScroll() {
  const reduce = useReducedMotion();
  if (reduce) return null;
  return (
    <ReactLenis
      root
      options={{
        duration: 1.15,
        easing: (t: number) => 1 - Math.pow(1 - t, 3),
        anchors: { offset: -76 },
      }}
    />
  );
}

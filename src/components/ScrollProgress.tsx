"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

/** Thin sage-to-maroon bar across the top showing how far down the page you are. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const width = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 });
  const reduce = useReducedMotion();
  if (reduce) return null;
  return <motion.div aria-hidden className="scroll-bar" style={{ scaleX: width }} />;
}

"use client";

import { motion } from "framer-motion";
import { useIntroDone } from "./useIntroDone";

/** Hero pieces wait for the intro to finish, then rise in one after another. */
export function HeroItem({ children, i = 0, className }: { children: React.ReactNode; i?: number; className?: string }) {
  const ready = useIntroDone();
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      transition={{ duration: 0.9, delay: 0.08 * i, ease: [0.22, 0.8, 0.24, 1] }}
    >
      {children}
    </motion.div>
  );
}

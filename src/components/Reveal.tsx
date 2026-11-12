"use client";

import { motion } from "framer-motion";

const EASE = [0.22, 0.8, 0.24, 1] as const;

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** "flip" tips the element up in 3D, used for section headings */
  variant?: "rise" | "flip";
  as?: "div" | "li" | "article";
};

/** Fades and lifts content into place the first time it scrolls into view. */
export function Reveal({ children, className, delay = 0, variant = "rise", as = "div" }: Props) {
  const Tag = motion[as];
  const hidden =
    variant === "flip"
      ? { opacity: 0.15, rotateX: 38, y: 10, transformPerspective: 900 }
      : { opacity: 0, y: 26 };
  return (
    <Tag
      className={className}
      style={variant === "flip" ? { transformOrigin: "50% 100%" } : undefined}
      initial={hidden}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: variant === "flip" ? 1.1 : 0.9, ease: EASE, delay }}
    >
      {children}
    </Tag>
  );
}

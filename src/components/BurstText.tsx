"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

/**
 * Same scatter for the same text on every render, so nothing jumps on hydration.
 * Rounded to three decimals on purpose: the server writes these straight into
 * the style attribute while the browser rounds them to three places, and a
 * longer number makes the two copies differ and React report a mismatch.
 */
function noise(seed: number) {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return Math.round(((x - Math.floor(x)) * 2 - 1) * 1000) / 1000; // -1..1
}
const round3 = (n: number) => Math.round(n * 1000) / 1000;

type Props = {
  children: string;
  className?: string;
  /** Seconds before the burst starts. */
  delay?: number;
  /** How far the letters start from their final spot, in pixels. */
  spread?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
  /**
   * Leave unset to fire when the text scrolls into view.
   * Pass true/false to drive it yourself (the hero waits for the intro).
   */
  active?: boolean;
};

/**
 * Headline whose letters fly in from scattered positions and snap into place.
 * Each word stays on one line, so it still wraps like normal text.
 * Screen readers get the plain string; the letters are hidden from them.
 *
 * The whole heading is what gets watched, not the individual letters: a letter
 * thrown off the left edge would never count as "in view" on its own and would
 * be left behind, invisible.
 */
export function BurstText({ children, className = "", delay = 0, spread = 90, as = "span", active }: Props) {
  const Tag = motion[as];
  const reduce = useReducedMotion();
  const words = children.split(" ");

  if (reduce) {
    return <Tag className={className}>{children}</Tag>;
  }

  const letter: Variants = {
    out: (i: number) => ({
      opacity: 0,
      x: round3(noise(i + 1) * spread),
      y: round3(noise(i + 17) * spread * 0.8),
      rotate: round3(noise(i + 41) * 42),
      scale: 0.5,
    }),
    in: (i: number) => ({
      opacity: 1,
      x: 0,
      y: 0,
      rotate: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 320, damping: 26, mass: 0.7, delay: delay + i * 0.022 },
    }),
  };

  let n = 0;
  return (
    <Tag
      className={className}
      aria-label={children}
      initial="out"
      {...(active === undefined
        ? { whileInView: "in", viewport: { once: true, amount: 0.25 } }
        : { animate: active ? "in" : "out" })}
    >
      {words.map((word, w) => (
        // A motion element, so the variant label keeps travelling down to the letters.
        <motion.span key={`${word}-${w}`} className="inline-block whitespace-nowrap">
          {[...word].map((ch, c) => (
            <motion.span
              key={`${ch}-${c}`}
              aria-hidden
              custom={n++}
              variants={letter}
              className="inline-block will-change-transform"
            >
              {ch}
            </motion.span>
          ))}
          {w < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </motion.span>
      ))}
    </Tag>
  );
}

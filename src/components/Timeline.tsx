"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import type { Role } from "@/data/profile";

/** Experience timeline. The line fills in deep sage as you scroll past each role. */
export function Timeline({ roles }: { roles: Role[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 65%", "end 65%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  return (
    <ol ref={ref} className="relative m-0 list-none pl-8">
      <span aria-hidden className="absolute bottom-1.5 left-1.5 top-1.5 w-[1.5px] bg-[var(--line-2)]" />
      <motion.span
        aria-hidden
        className="absolute bottom-1.5 left-1.5 top-1.5 w-[2px] origin-top bg-sage-deep"
        style={{ scaleY: fill }}
      />
      {roles.map((r, i) => (
        <motion.li
          key={r.title}
          className="relative pb-12 last:pb-0"
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease: [0.22, 0.8, 0.24, 1], delay: i * 0.05 }}
        >
          <motion.span
            aria-hidden
            className="absolute -left-[31px] top-[.45rem] size-3 rounded-full border-2 border-sage-deep bg-sage-deep"
            initial={{ opacity: 0.25 }}
            whileInView={{ opacity: 1 }}
            viewport={{ margin: "0px 0px -35% 0px" }}
          />
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[0.85rem] text-muted">
            {r.when}
            {r.tag && <span className="chip">{r.tag}</span>}
            {r.place}
          </div>
          <h3 className="mb-0.5 mt-2 font-display text-[clamp(1.35rem,2.4vw,1.8rem)] font-bold leading-[1.2]">{r.title}</h3>
          <div className="font-mono text-[0.92rem] text-sage-deep">{r.org}</div>
          <ul className="my-3.5 max-w-[70ch] list-disc pl-[1.1rem] text-muted marker:text-sage-deep">
            {r.points.map((p) => (
              <li key={p} className="pb-1.5">{p}</li>
            ))}
          </ul>
          {r.tech && (
            <div className="flex flex-wrap gap-2">
              {r.tech.map((t) => (
                <span key={t} className="chip">{t}</span>
              ))}
            </div>
          )}
        </motion.li>
      ))}
    </ol>
  );
}

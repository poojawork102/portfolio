"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useLenis } from "lenis/react";
import { ArrowUpRight, Play } from "lucide-react";
import type { Project } from "@/data/projects";
import { GitHubIcon } from "./BrandIcons";
import { Burst } from "./Burst";

/**
 * Projects shown as a stack of folder tabs.
 * The section pins while you scroll and the panels slide sideways, so one
 * vertical scroll walks through every project. Tabs are clickable too.
 * Below 1024px it falls back to the stacked cards in Projects.tsx.
 */
export function ProjectDeck({ projects, previews }: { projects: Project[]; previews: React.ReactNode[] }) {
  const n = projects.length;
  const sectionRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [bursts, setBursts] = useState(0);
  const reduce = useReducedMotion();
  const lenis = useLenis();

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const eased = useSpring(scrollYProgress, { stiffness: 110, damping: 26, mass: 0.5 });
  const x = useTransform(eased, [0, 1], ["0%", `-${(n - 1) * 100}%`]);
  const bar = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const next = Math.min(n - 1, Math.max(0, Math.round(p * (n - 1))));
    setIndex((prev) => {
      if (prev !== next) setBursts((b) => b + 1);
      return next;
    });
  });

  /** Scroll to the slice of the section that shows project i. */
  const goTo = (i: number) => {
    const el = sectionRef.current;
    if (!el) return;
    const top = el.offsetTop + (i / (n - 1)) * (el.offsetHeight - window.innerHeight);
    if (lenis) lenis.scrollTo(top, { duration: 1.1 });
    else window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!sectionRef.current) return;
      const r = sectionRef.current.getBoundingClientRect();
      const pinned = r.top <= 1 && r.bottom >= window.innerHeight;
      if (!pinned) return;
      if (e.key === "ArrowRight" && index < n - 1) { e.preventDefault(); goTo(index + 1); }
      if (e.key === "ArrowLeft" && index > 0) { e.preventDefault(); goTo(index - 1); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  return (
    <div ref={sectionRef} style={{ height: `${n * 90 + 10}vh` }}>
      <div className="sticky top-0 flex h-svh flex-col justify-center overflow-hidden">
        <div className="wrap">
          {/* tabs */}
          <div role="tablist" aria-label="Projects" className="tab-strip">
            {projects.map((p, i) => (
              <button
                key={p.slug}
                role="tab"
                type="button"
                aria-selected={i === index}
                aria-controls={`panel-${p.slug}`}
                onClick={() => goTo(i)}
                className="tab"
              >
                <span className="tab-index">{String(i + 1).padStart(2, "0")}</span>
                {p.name}
              </button>
            ))}
          </div>

          {/* folder */}
          <div className="folder">
            <motion.span aria-hidden className="absolute left-0 top-0 h-[2px] bg-maroon" style={{ width: bar }} />
            <div className="overflow-hidden">
              <motion.div className="flex" style={reduce ? undefined : { x }}>
                {projects.map((p, i) => (
                  <section
                    key={p.slug}
                    id={`panel-${p.slug}`}
                    role="tabpanel"
                    aria-label={p.name}
                    className="grid w-full flex-none grid-cols-1 lg:grid-cols-[1.05fr_1fr]"
                  >
                    <div className="relative aspect-[640/384] overflow-hidden border-b border-[var(--line)] bg-art-bg lg:aspect-auto lg:border-b-0 lg:border-r">
                      {previews[i]}
                    </div>
                    <div className="relative flex flex-col gap-4 p-7 xl:p-9">
                      {i === index && <Burst key={bursts} />}
                      <span className="chip self-start">{p.category}</span>
                      <h3 className="m-0 font-display text-[clamp(1.7rem,2.6vw,2.3rem)] font-bold leading-[1.1]">{p.name}</h3>
                      <p className="m-0 text-muted">{p.summary}</p>
                      <dl className="m-0 grid gap-2.5 border-t border-[var(--line)] pt-4">
                        {p.details.slice(0, 2).map((d) => (
                          <div key={d.label}>
                            <dt className="font-mono text-[0.72rem] text-maroon">{d.label}</dt>
                            <dd className="m-0 mt-0.5 text-[0.95rem]">{d.text}</dd>
                          </div>
                        ))}
                      </dl>
                      <div className="flex flex-wrap gap-2">
                        {p.tech.map((t) => (
                          <span key={t} className="chip">{t}</span>
                        ))}
                      </div>
                      <div className="mt-auto flex flex-wrap gap-2.5 pt-2">
                        {p.demo && (
                          <a className="btn-sm" href={p.demo} target="_blank" rel="noopener noreferrer">
                            <Play size={14} fill="currentColor" aria-hidden /> Demo
                          </a>
                        )}
                        {p.code && (
                          <a className="btn-sm" href={p.code} target="_blank" rel="noopener noreferrer">
                            <GitHubIcon size={15} /> Code
                          </a>
                        )}
                        <Link className="btn-sm" href={`/projects/${p.slug}`}>
                          Case study <ArrowUpRight size={14} aria-hidden />
                        </Link>
                      </div>
                    </div>
                  </section>
                ))}
              </motion.div>
            </div>
          </div>

          <p className="mt-4 text-center font-mono text-[0.78rem] text-muted">
            {index + 1} of {n} &middot; keep scrolling, or pick a tab
          </p>
        </div>
      </div>
    </div>
  );
}

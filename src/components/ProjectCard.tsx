"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Project } from "@/data/projects";
import { GitHubIcon } from "./BrandIcons";
import { Tilt } from "./Tilt";

export function ProjectCard({ project, preview }: { project: Project; preview: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const shown = project.tech.slice(0, 3);
  const extra = project.tech.length - shown.length;
  const featured = !!project.featured;

  return (
    <Tilt max={5} className={`h-full rounded-[18px] ${featured ? "md:col-span-2" : ""}`}>
      <article
        className={`card group flex h-full flex-col overflow-hidden ${featured ? "md:grid md:grid-cols-[1.15fr_1fr]" : ""}`}
        data-cursor
      >
        <div
          className={`relative overflow-hidden border-[var(--line)] bg-[#f3ede1] ${
            featured ? "aspect-[640/384] border-b md:aspect-auto md:min-h-full md:border-b-0 md:border-r" : "aspect-[640/384] border-b"
          }`}
        >
          {preview}
          <span className="chip absolute left-3.5 top-3.5 border-[var(--line-2)] bg-cream/90 text-ink">{project.category}</span>
        </div>
        <div className="flex flex-1 flex-col gap-3.5 px-6 pb-5 pt-6">
          <h3 className={`m-0 font-display font-bold leading-[1.15] ${featured ? "text-[2rem]" : "text-[1.5rem]"}`}>{project.name}</h3>
          <p className="m-0 text-muted">{project.summary}</p>
          <div className="flex flex-wrap gap-2">
            {shown.map((t) => (
              <span key={t} className="chip">{t}</span>
            ))}
            {extra > 0 && <span className="chip bg-transparent">+{extra}</span>}
          </div>

          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                id={`details-${project.slug}`}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 0.8, 0.24, 1] }}
                className="overflow-hidden"
              >
                <dl className="m-0 grid gap-3 border-t border-[var(--line)] pt-4">
                  {project.details.map((d) => (
                    <div key={d.label}>
                      <dt className="font-mono text-xs text-maroon">{d.label}</dt>
                      <dd className="m-0 mt-0.5 text-[0.95rem]">{d.text}</dd>
                    </div>
                  ))}
                </dl>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-1.5">
            <div className="flex flex-wrap gap-2">
              {project.demo && (
                <a className="btn-sm" href={project.demo} target="_blank" rel="noopener noreferrer">
                  <Play size={14} fill="currentColor" aria-hidden /> Demo
                </a>
              )}
              {project.code && (
                <a className="btn-sm" href={project.code} target="_blank" rel="noopener noreferrer">
                  <GitHubIcon size={15} /> Code
                </a>
              )}
              <Link className="btn-sm" href={`/projects/${project.slug}`}>
                Case study
              </Link>
            </div>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls={`details-${project.slug}`}
              className="inline-flex items-center gap-1.5 py-1 font-mono text-[0.85rem] text-muted transition-colors hover:text-maroon"
            >
              Details
              <ArrowRight size={15} aria-hidden className={`transition-transform duration-300 ${open ? "rotate-90" : ""}`} />
            </button>
          </div>
        </div>
      </article>
    </Tilt>
  );
}

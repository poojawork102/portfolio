"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { SITE } from "@/data/profile";
import { ThemeToggle } from "./ThemeToggle";

const LINKS = [
  ["about", "About"],
  ["projects", "Projects"],
  ["experience", "Experience"],
  ["recognition", "Recognition"],
  ["contact", "Contact"],
] as const;

export function Nav() {
  const [solid, setSolid] = useState(false);
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setSolid(window.scrollY > 30);
      let cur = "";
      for (const [id] of LINKS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.4) cur = id;
      }
      setActive(cur);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 border-b transition-[background-color,border-color] duration-[400ms] ${
          solid ? "border-[var(--line)] bg-beige/85 backdrop-blur-md" : "border-transparent"
        }`}
      >
        <div className="wrap flex h-[72px] items-center justify-between">
          <a href="#top" className="font-display text-[1.55rem] font-extrabold tracking-[-0.02em] text-maroon">
            {SITE.shortName}
            <span className="text-ink">.</span>
          </a>
          <nav aria-label="Main" className="flex items-center gap-3 md:gap-7">
            <ul className="hidden items-center gap-7 text-[0.95rem] text-muted md:flex">
              {LINKS.map(([id, label]) => (
                <li key={id}>
                  <a href={`#${id}`} className={`transition-colors hover:text-ink ${active === id ? "text-ink" : ""}`}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href={SITE.resume}
              className="inline-flex items-center gap-1.5 rounded-full border-[1.5px] border-maroon px-5 py-2.5 font-mono text-[0.88rem] font-semibold text-maroon transition-colors hover:bg-maroon hover:text-on-accent"
            >
              Resume <ArrowUpRight size={15} aria-hidden />
            </a>
            <ThemeToggle />
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((o) => !o)}
              className="grid size-11 place-items-center rounded-full border-[1.5px] border-[var(--line-2)] md:hidden"
            >
              {open ? <X size={20} aria-hidden /> : <Menu size={20} aria-hidden />}
            </button>
          </nav>
        </div>
      </header>
      {open && (
        <nav aria-label="Mobile" className="fixed inset-x-0 top-[72px] z-[39] border-b border-[var(--line)] bg-beige/98 px-[clamp(18px,4vw,48px)] pb-6 pt-4 md:hidden">
          {LINKS.map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={() => setOpen(false)}
              className="block border-b border-[var(--line)] py-3 font-display text-[1.4rem]"
            >
              {label}
            </a>
          ))}
        </nav>
      )}
    </>
  );
}

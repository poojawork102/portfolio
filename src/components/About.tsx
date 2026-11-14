import { CircleCheck } from "lucide-react";
import { ABOUT } from "@/data/profile";
import { BurstText } from "./BurstText";
import { Reveal } from "./Reveal";
import { Rich } from "./Rich";

export function About() {
  return (
    <section id="about" className="section">
      <div className="wrap grid items-start gap-[clamp(2rem,5vw,4.5rem)] lg:grid-cols-2">
        <Reveal>
          <p className="label">About</p>
          <BurstText as="h2" className="h2">{ABOUT.heading}</BurstText>
          {ABOUT.paragraphs.map((t) => (
            <p key={t.slice(0, 20)} className="sub">
              <Rich text={t} />
            </p>
          ))}
          <div className="card mt-8 border-[rgba(79,106,76,.25)] bg-sage-light px-6 py-5" style={{ background: "var(--color-sage-light)" }}>
            <p className="label mb-2.5">Right now</p>
            <ul className="grid gap-3">
              {ABOUT.now.map((n) => (
                <li key={n.label} className="grid grid-cols-[6.5rem_1fr] gap-4">
                  <span className="pt-0.5 font-mono text-[0.82rem] text-sage-deep">{n.label}</span>
                  {n.text}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
        <Reveal as="div" delay={0.1}>
          <ul className="grid gap-6">
            {ABOUT.capabilities.map((c) => (
              <li key={c.title} className="grid grid-cols-[28px_1fr] gap-3.5">
                <CircleCheck className="mt-[3px] text-sage-deep" size={24} strokeWidth={1.8} aria-hidden />
                <div>
                  <h3 className="m-0 flex flex-wrap items-center gap-2.5 font-display text-[1.25rem] font-bold">
                    {c.title}
                    {"badge" in c && c.badge && <span className="chip chip-maroon">{c.badge}</span>}
                  </h3>
                  <p className="mt-1 text-muted">{c.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

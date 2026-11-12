import { EDUCATION, EXPERIENCE, LEADERSHIP } from "@/data/profile";
import { Reveal } from "./Reveal";
import { Timeline } from "./Timeline";

export function Experience() {
  return (
    <section id="experience" className="section bg-sage-light">
      <div className="wrap">
        <Reveal>
          <p className="label">Experience</p>
          <Reveal variant="flip">
            <h2 className="h2">Where I&apos;ve worked and studied</h2>
          </Reveal>
        </Reveal>

        <Reveal className="card my-10 grid items-center gap-x-10 gap-y-4 p-6 sm:grid-cols-[auto_1fr] sm:px-8 sm:py-7">
          <div className="font-display text-[clamp(3.4rem,7vw,4.8rem)] font-extrabold leading-[0.9] text-maroon">
            {EDUCATION.cgpa}
            <small className="font-mono text-base font-normal text-muted"> {EDUCATION.scale}</small>
          </div>
          <div className="min-w-0">
            <h3 className="m-0 font-display text-[1.35rem] font-bold [overflow-wrap:anywhere]">{EDUCATION.degree}</h3>
            <p className="mt-1 text-muted">{EDUCATION.school}</p>
            <div className="mt-3 border-t border-[var(--line)] pt-3 font-mono text-[0.85rem] text-muted">{EDUCATION.meta}</div>
          </div>
        </Reveal>

        <Timeline roles={EXPERIENCE} />

        <div className="mt-16">
          <Reveal>
            <h3 className="mb-5 font-display text-[1.5rem] font-bold">Beyond code</h3>
          </Reveal>
          <div className="grid gap-5 lg:grid-cols-3">
            {LEADERSHIP.map((l, i) => (
              <Reveal key={l.title} delay={i * 0.08} className="card px-6 py-5">
                <div className="font-mono text-[0.85rem] text-muted">{l.when}</div>
                <h4 className="mb-0.5 mt-2 font-display text-[1.2rem] font-bold">{l.title}</h4>
                <div className="font-mono text-[0.85rem] text-sage-deep">{l.org}</div>
                <p className="mt-3 text-[0.95rem] text-muted">{l.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

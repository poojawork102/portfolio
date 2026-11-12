import Image from "next/image";
import { Mail, FileText } from "lucide-react";
import { HERO, SITE } from "@/data/profile";
import { HeroItem } from "./HeroItem";
import { Rich } from "./Rich";
import { Tilt } from "./Tilt";
import { GlobeLazy } from "./GlobeLazy";
import { GitHubIcon, LinkedInIcon } from "./BrandIcons";

const iconLink =
  "grid size-[50px] place-items-center rounded-[14px] border border-[rgba(79,106,76,.25)] bg-sage-light transition-[transform,border-color,background-color] duration-300 hover:-translate-y-[3px] hover:border-sage-deep hover:bg-sage";

export function Hero() {
  return (
    <section className="relative grid min-h-svh items-center pb-16 pt-[110px]">
      <div className="wrap grid items-center gap-[clamp(2rem,5vw,4.5rem)] lg:grid-cols-[1.25fr_.85fr]">
        <div>
          <HeroItem i={0} className="flex flex-wrap items-center gap-x-6 gap-y-3 text-[0.95rem] text-muted">
            <span>{SITE.location}</span>
            <span className="status-dot inline-flex items-center gap-2.5 text-ink">{SITE.status}</span>
          </HeroItem>

          <HeroItem i={1} className="my-8 flex flex-wrap gap-x-10 gap-y-5">
            {HERO.proof.map((p) => (
              <div key={p.label} className="border-l-[3px] border-sage-mid pl-4">
                <b className="block font-display text-[1.6rem] leading-[1.1] text-maroon">{p.value}</b>
                <span className="text-[0.85rem] text-muted">{p.label}</span>
              </div>
            ))}
          </HeroItem>

          <HeroItem i={2}>
            <h1 className="m-0 font-display text-[clamp(2.9rem,7vw,5.6rem)] font-extrabold leading-[0.98] tracking-[-0.035em]">
              {SITE.name}
            </h1>
          </HeroItem>
          <HeroItem i={3}>
            <p className="mt-4 font-mono text-[clamp(.95rem,1.4vw,1.1rem)] text-maroon">{SITE.role}</p>
          </HeroItem>
          <HeroItem i={4}>
            <p className="mb-8 mt-5 max-w-[56ch] text-[clamp(1.05rem,1.4vw,1.2rem)] leading-[1.65] text-muted">
              <Rich text={HERO.intro} />
            </p>
          </HeroItem>
          <HeroItem i={5} className="flex flex-wrap gap-3.5">
            <a href="#projects" className="pill pill-solid">View projects</a>
            <a href="#contact" className="pill pill-line">Get in touch</a>
          </HeroItem>
          <HeroItem i={6} className="mt-7 flex gap-3">
            <a href={`mailto:${SITE.email}`} aria-label="Email" className={iconLink}><Mail size={22} strokeWidth={1.7} /></a>
            <a href={SITE.github} aria-label="GitHub" className={iconLink}><GitHubIcon /></a>
            <a href={SITE.linkedin} aria-label="LinkedIn" className={iconLink}><LinkedInIcon /></a>
            <a href={SITE.resume} aria-label="Resume" className={iconLink}><FileText size={22} strokeWidth={1.7} /></a>
          </HeroItem>
        </div>

        <HeroItem i={3} className="relative mx-auto w-full max-w-[340px] lg:mx-0 lg:max-w-none">
          <div className="pointer-events-none absolute left-1/2 top-1/2 size-[135%] -translate-x-1/2 -translate-y-1/2">
            <GlobeLazy />
          </div>
          <Tilt max={9} className="rounded-[28px]">
            <div
              className="group relative aspect-[4/5] overflow-hidden rounded-[28px] border border-[var(--line-2)]"
              style={{ background: "radial-gradient(90% 70% at 50% 15%, #c3d1bc, #a9bcA2 50%, #7e9878 100%)" }}
            >
              <Image
                src="/pooja.webp"
                alt={SITE.name}
                fill
                priority
                sizes="(max-width: 1024px) 340px, 450px"
                className="object-cover object-[50%_20%] transition-transform duration-[1200ms] ease-[cubic-bezier(.22,.8,.24,1)] group-hover:scale-[1.04]"
              />
            </div>
          </Tilt>
        </HeroItem>
      </div>
    </section>
  );
}

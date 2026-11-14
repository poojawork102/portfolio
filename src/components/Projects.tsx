import { PROJECTS } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";
import { ProjectDeck } from "./ProjectDeck";
import { ProjectPreview } from "./ProjectPreview";
import { BurstText } from "./BurstText";
import { Reveal } from "./Reveal";

export function Projects() {
  return (
    <section id="projects" className="section pb-0 lg:pb-0">
      <div className="wrap">
        <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="label">Projects</p>
            <BurstText as="h2" className="h2">
              Things I&apos;ve built
            </BurstText>
          </div>
          <span className="font-mono text-[0.92rem] text-muted">
            {PROJECTS.length} projects
          </span>
        </Reveal>
      </div>

      {/* Wide screens: pinned folder tabs that slide sideways as you scroll. */}
      <div className="hidden lg:block">
        <ProjectDeck
          projects={PROJECTS}
          previews={PROJECTS.map((p, i) => (
            <ProjectPreview key={p.slug} project={p} priority={i === 0} />
          ))}
        />
      </div>

      {/* Phones and tablets: plain stacked cards, which scroll better on touch. */}
      <div className="wrap grid gap-6 pb-[clamp(4.5rem,11vh,7.5rem)] md:grid-cols-2 lg:hidden">
        {PROJECTS.map((p, i) => (
          <Reveal key={p.slug} delay={(i % 2) * 0.09} className={p.featured ? "md:col-span-2" : ""}>
            <ProjectCard project={p} preview={<ProjectPreview project={p} />} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

import { PROJECTS } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";
import { ProjectPreview } from "./ProjectPreview";
import { Reveal } from "./Reveal";

export function Projects() {
  return (
    <section id="projects" className="section">
      <div className="wrap">
        <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="label">Projects</p>
            <Reveal variant="flip">
              <h2 className="h2">Things I&apos;ve built</h2>
            </Reveal>
          </div>
          <span className="font-mono text-[0.92rem] text-muted">
            Showing {PROJECTS.length} of {PROJECTS.length}
          </span>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-2">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 2) * 0.09} className={p.featured ? "md:col-span-2" : ""}>
              <ProjectCard project={p} preview={<ProjectPreview project={p} priority={i === 0} />} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

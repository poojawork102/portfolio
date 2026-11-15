import Image from "next/image";
import type { Project } from "@/data/projects";
import { PROJECT_ART } from "@/data/project-art";

/** Shows the real screenshot if one is set, otherwise the drawn preview. */
export function ProjectPreview({ project, priority }: { project: Project; priority?: boolean }) {
  if (project.image) {
    return (
      <Image
        src={project.image}
        alt={`Screenshot of ${project.name}`}
        fill
        priority={priority}
        sizes="(max-width: 860px) 100vw, 600px"
        className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.035]"
      />
    );
  }
  return (
    <svg
      viewBox="0 0 640 384"
      // fills the frame like the real screenshot does, instead of leaving bars
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={`Preview of ${project.name}`}
      className="absolute inset-0 size-full transition-transform duration-700 group-hover:scale-[1.035]"
      dangerouslySetInnerHTML={{ __html: PROJECT_ART[project.art ?? ""] ?? "" }}
    />
  );
}

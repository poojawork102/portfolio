import type { MetadataRoute } from "next";
import { PROJECTS } from "@/data/projects";
import { SITE } from "@/data/profile";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE.url, changeFrequency: "monthly", priority: 1 },
    ...PROJECTS.map((p) => ({ url: `${SITE.url}/projects/${p.slug}`, changeFrequency: "monthly" as const, priority: 0.7 })),
  ];
}

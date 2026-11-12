import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Play } from "lucide-react";
import { PROJECTS } from "@/data/projects";
import { SITE } from "@/data/profile";
import { ProjectPreview } from "@/components/ProjectPreview";
import { GitHubIcon } from "@/components/BrandIcons";
import { Reveal } from "@/components/Reveal";
import { Footer } from "@/components/Footer";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = PROJECTS.find((x) => x.slug === slug);
  if (!p) return {};
  return { title: p.name, description: p.summary, alternates: { canonical: `/projects/${p.slug}` } };
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const index = PROJECTS.findIndex((x) => x.slug === slug);
  if (index === -1) notFound();
  const p = PROJECTS[index];
  const next = PROJECTS[(index + 1) % PROJECTS.length];

  return (
    <>
      <header className="relative z-[1]">
        <div className="wrap flex h-[72px] items-center justify-between">
          <Link href="/" className="font-display text-[1.55rem] font-extrabold tracking-[-0.02em] text-maroon">
            {SITE.shortName}
            <span className="text-ink">.</span>
          </Link>
          <Link href="/#projects" className="btn-sm">
            <ArrowLeft size={14} aria-hidden /> All projects
          </Link>
        </div>
      </header>
      <main className="relative z-[1] pb-24 pt-10">
        <article className="wrap">
          <Reveal>
            <span className="chip">{p.category}</span>
            <h1 className="mt-5 font-display text-[clamp(2.6rem,6vw,4.6rem)] font-extrabold leading-none tracking-[-0.03em]">{p.name}</h1>
            <p className="sub text-[1.2rem]">{p.summary}</p>
            <div className="mt-6 flex flex-wrap gap-2.5">
              {p.demo && (
                <a className="pill pill-solid" href={p.demo} target="_blank" rel="noopener noreferrer">
                  <Play size={16} fill="currentColor" aria-hidden /> Watch demo
                </a>
              )}
              {p.code && (
                <a className="pill pill-line" href={p.code} target="_blank" rel="noopener noreferrer">
                  <GitHubIcon size={18} /> View code
                </a>
              )}
            </div>
          </Reveal>

          <Reveal className="card relative mt-10 aspect-[640/384] overflow-hidden bg-[#f3ede1]">
            <ProjectPreview project={p} priority />
          </Reveal>

          <div className="mt-12 grid gap-10 lg:grid-cols-[2fr_1fr]">
            <dl className="m-0 grid gap-8">
              {p.details.map((d, i) => (
                <Reveal key={d.label} delay={i * 0.05}>
                  <dt className="label">{d.label}</dt>
                  <dd className="m-0 max-w-[62ch] text-[1.1rem] leading-[1.7]">{d.text}</dd>
                </Reveal>
              ))}
            </dl>
            <Reveal as="div" className="card h-fit p-6">
              <p className="label">Stack</p>
              <div className="flex flex-wrap gap-2">
                {p.tech.map((t) => (
                  <span key={t} className="chip">{t}</span>
                ))}
              </div>
            </Reveal>
          </div>

          <Link href={`/projects/${next.slug}`} className="card group mt-16 flex items-center justify-between gap-4 p-6" data-cursor>
            <div>
              <p className="label mb-1">Next project</p>
              <span className="font-display text-[1.6rem] font-bold group-hover:text-maroon">{next.name}</span>
            </div>
            <span aria-hidden className="text-2xl text-maroon transition-transform group-hover:translate-x-1">&rarr;</span>
          </Link>
        </article>
      </main>
      <Footer />
    </>
  );
}

import { ArrowUpRight } from "lucide-react";
import { RECOGNITION, SITE } from "@/data/profile";
import { CERTS } from "@/data/certs";
import { getContributions, getGitHubStats } from "@/lib/github";
import { ContributionGraph } from "./ContributionGraph";
import { BurstText } from "./BurstText";
import { Reveal } from "./Reveal";

export async function Recognition() {
  const [stats, contributions] = await Promise.all([getGitHubStats(SITE.githubUser), getContributions(SITE.githubUser)]);
  const num = (v: number | undefined) => (v === undefined ? "-" : v);

  return (
    <section id="recognition" className="section">
      <div className="wrap">
        <Reveal>
          <p className="label">Recognition</p>
          <BurstText as="h2" className="h2">Selections and live stats</BurstText>
        </Reveal>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {RECOGNITION.map((r, i) => (
            <Reveal key={r.title} delay={i * 0.08} as="article" className="card p-6">
              <div className="flex items-center justify-between gap-2.5 font-mono text-[0.8rem] text-muted">
                <span className="chip chip-maroon">{r.badge}</span>
                <span>{r.when}</span>
              </div>
              <h3 className="mb-2 mt-4 font-display text-[1.35rem] font-bold leading-[1.2]">{r.title}</h3>
              <p className="m-0 text-[0.95rem] text-muted">{r.text}</p>
              {"funnel" in r && r.funnel && (
                <div className="mt-4 flex flex-wrap items-center gap-1.5 font-mono text-[0.72rem] text-muted">
                  {r.funnel.map((f, k) => (
                    <span
                      key={f}
                      className={`rounded-md border px-2 py-0.5 ${k === r.funnel.length - 1 ? "border-maroon text-maroon" : "border-[var(--line-2)]"}`}
                    >
                      {f}
                    </span>
                  ))}
                </div>
              )}
            </Reveal>
          ))}
        </div>

        <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_2fr]">
          <Reveal as="article" className="card p-6">
            <div className="font-mono text-[0.8rem] tracking-[0.04em] text-sage-deep">Certifications</div>
            <ul className="mt-4">
              {CERTS.map((c) => (
                <li key={c.name} className="flex flex-wrap items-center justify-between gap-3 border-t border-[var(--line)] py-3 text-[0.95rem]">
                  <div>
                    {c.name}
                    <span className="block text-[0.82rem] text-muted">{c.issuer}</span>
                  </div>
                  {c.url ? (
                    <a href={c.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 whitespace-nowrap font-mono text-[0.78rem] text-maroon hover:underline">
                      View certificate <ArrowUpRight size={13} aria-hidden />
                    </a>
                  ) : (
                    <em className="whitespace-nowrap font-mono text-[0.78rem] not-italic text-muted/60">link coming</em>
                  )}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal as="article" delay={0.08} className="card p-6">
            <div className="flex justify-between font-mono text-[0.8rem] tracking-[0.04em] text-sage-deep">
              <span>GitHub</span>
              {stats && <span className="inline-flex items-center gap-1.5 text-muted before:size-[7px] before:rounded-full before:bg-[#4ade80]">live</span>}
            </div>
            <div className="mt-5 grid grid-cols-3 gap-4">
              {[
                [num(stats?.repos), "Public repos"],
                [num(stats?.followers), "Followers"],
                [num(stats?.since), "Member since"],
              ].map(([v, l]) => (
                <div key={l}>
                  <b className="block font-display text-[2rem] leading-none">{v}</b>
                  <span className="font-mono text-xs text-muted">{l}</span>
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-[10px] bg-beige p-3.5">
              <ContributionGraph data={contributions} />
            </div>
            <a className="btn-sm mt-4" href={SITE.github} target="_blank" rel="noopener noreferrer">
              {SITE.githubUser} <ArrowUpRight size={14} aria-hidden />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

import { TOOLS, type Tool } from "@/data/tools";
import { Reveal } from "./Reveal";

function Row({ tools, reverse }: { tools: Tool[]; reverse?: boolean }) {
  const items = [...tools, ...tools];
  return (
    <div className={`rail ${reverse ? "rail-rev" : ""}`}>
      <div className="track">
        {items.map(([name, color, path], i) => (
          <span key={`${name}-${i}`} className="tool" style={{ "--c": color } as React.CSSProperties} aria-hidden={i >= tools.length}>
            <svg viewBox="0 0 24 24" aria-hidden>
              <path d={path} />
            </svg>
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}

export function TechStack() {
  const half = Math.ceil(TOOLS.length / 2);
  return (
    <section aria-labelledby="tech-h" className="py-12 pb-16" style={{ background: "linear-gradient(180deg, transparent, rgba(169,188,162,.25), transparent)" }}>
      <Reveal className="wrap">
        <p className="label">Tech stack</p>
        <Reveal variant="flip">
          <h2 id="tech-h" className="h2 mb-8">Tools I reach for</h2>
        </Reveal>
      </Reveal>
      <Row tools={TOOLS.slice(0, half)} />
      <Row tools={TOOLS.slice(half)} reverse />
    </section>
  );
}

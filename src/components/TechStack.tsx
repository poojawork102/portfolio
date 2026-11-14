import { TOOLS, type Tool } from "@/data/tools";
import { BurstText } from "./BurstText";
import { Marquee } from "./Marquee";
import { Reveal } from "./Reveal";

function Tools({ tools }: { tools: Tool[] }) {
  return (
    <>
      {tools.map(([name, color, path]) => (
        <span key={name} className="tool" style={{ "--c": color } as React.CSSProperties}>
          <svg viewBox="0 0 24 24" aria-hidden>
            <path d={path} />
          </svg>
          {name}
        </span>
      ))}
    </>
  );
}

export function TechStack() {
  const half = Math.ceil(TOOLS.length / 2);
  return (
    <section
      aria-label="Tools I reach for"
      className="py-12 pb-16"
      style={{ background: "linear-gradient(180deg, transparent, var(--chip-bg), transparent)" }}
    >
      <Reveal className="wrap">
        <p className="label">Tech stack</p>
        <BurstText as="h2" className="h2 mb-8">
          Tools I reach for
        </BurstText>
      </Reveal>
      <Marquee speed={4}>
        <Tools tools={TOOLS.slice(0, half)} />
      </Marquee>
      <Marquee speed={3.4} reverse>
        <Tools tools={TOOLS.slice(half)} />
      </Marquee>
    </section>
  );
}

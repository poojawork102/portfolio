import type { Contributions } from "@/lib/github";

const LEVELS = [0, 1, 2, 3, 4].map((n) => `var(--color-lvl-${n})`);

/** GitHub-style activity grid, drawn on the server as SVG. */
export function ContributionGraph({ data }: { data: Contributions }) {
  if (!data) {
    return <p className="m-0 font-mono text-[0.8rem] text-muted">Contribution chart unavailable right now.</p>;
  }
  const start = new Date(data.days[0].date).getDay();
  const cell = 11, gap = 3, step = cell + gap;
  const weeks = Math.ceil((data.days.length + start) / 7);
  return (
    <div className="w-full">
      <svg viewBox={`0 0 ${weeks * step} ${7 * step}`} role="img" aria-label={`${data.total} contributions in the last year`} className="block h-auto w-full">
        {data.days.map((d, i) => {
          const k = i + start;
          return (
            <rect key={d.date} x={Math.floor(k / 7) * step} y={(k % 7) * step} width={cell} height={cell} rx={2.5} fill={LEVELS[d.level] ?? LEVELS[0]}>
              <title>{`${d.count} on ${d.date}`}</title>
            </rect>
          );
        })}
      </svg>
      <div className="mt-3 flex flex-wrap justify-between gap-2.5 font-mono text-xs text-muted">
        <span>{data.total} contributions in the last year</span>
        <span className="inline-flex items-center gap-[3px]">
          Less {LEVELS.map((c) => <i key={c} className="inline-block size-2.5 rounded-[2px]" style={{ background: c }} />)} More
        </span>
      </div>
    </div>
  );
}

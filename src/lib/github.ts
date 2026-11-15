import { cacheLife } from "next/cache";

export type GitHubStats = { repos: number; followers: number; since: number } | null;
export type Contributions = { total: number; days: { date: string; count: number; level: number }[] } | null;

/** Public profile numbers. Cached on the server and refreshed every hour, so visitors never wait on GitHub. */
export async function getGitHubStats(user: string): Promise<GitHubStats> {
  "use cache";
  cacheLife("hours");
  try {
    const res = await fetch(`https://api.github.com/users/${user}`, {
      headers: {
        Accept: "application/vnd.github+json",
        ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
      },
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) return null;
    const u = await res.json();
    return { repos: u.public_repos, followers: u.followers, since: new Date(u.created_at).getFullYear() };
  } catch {
    return null;
  }
}

const LEVEL: Record<string, number> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

/**
 * The calendar straight from GitHub. Needs GITHUB_TOKEN (any scope: the
 * contribution calendar is public, GitHub just will not answer GraphQL
 * anonymously). Returns null when there is no token, so the caller falls back.
 */
async function contributionsFromGitHub(user: string): Promise<Contributions> {
  if (!process.env.GITHUB_TOKEN) return null;
  const query = `query($login:String!){user(login:$login){contributionsCollection{contributionCalendar{totalContributions weeks{contributionDays{date contributionCount contributionLevel}}}}}}`;
  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables: { login: user } }),
    signal: AbortSignal.timeout(6000),
  });
  if (!res.ok) return null;
  const json = await res.json();
  const cal = json?.data?.user?.contributionsCollection?.contributionCalendar;
  if (!cal) return null;
  const days = (cal.weeks ?? []).flatMap((w: { contributionDays: { date: string; contributionCount: number; contributionLevel: string }[] }) =>
    w.contributionDays.map((d) => ({ date: d.date, count: d.contributionCount, level: LEVEL[d.contributionLevel] ?? 0 })),
  );
  if (!days.length) return null;
  return { total: cal.totalContributions as number, days };
}

/**
 * Last year of contributions. GitHub's own API first when a token is set,
 * otherwise a free public mirror of the same calendar — so the chart does not
 * go blank if that mirror has a bad day.
 */
export async function getContributions(user: string): Promise<Contributions> {
  "use cache";
  cacheLife("hours");
  try {
    const mine = await contributionsFromGitHub(user);
    if (mine) return mine;
  } catch {
    // fall through to the public mirror
  }
  try {
    const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${user}?y=last`, {
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) return null;
    const d = await res.json();
    const days = (d.contributions ?? []) as { date: string; count: number; level: number }[];
    if (!days.length) return null;
    const total = d.total ? Object.values(d.total as Record<string, number>).reduce((a, b) => a + b, 0) : days.reduce((a, b) => a + b.count, 0);
    return { total, days };
  } catch {
    return null;
  }
}

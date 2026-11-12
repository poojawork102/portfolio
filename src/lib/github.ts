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

/** Last year of contributions, from a free public API that reads GitHub's contribution calendar. */
export async function getContributions(user: string): Promise<Contributions> {
  "use cache";
  cacheLife("hours");
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

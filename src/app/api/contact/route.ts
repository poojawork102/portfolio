import { createHash } from "node:crypto";
import { Resend } from "resend";
import { contactSchema } from "@/lib/contact";
import { sql } from "@/lib/db";
import { SITE } from "@/data/profile";

const MAX_BODY = 10_000; // bytes
const LIMIT = 3; // messages per visitor per hour
const memoryHits = new Map<string, number[]>(); // fallback rate limit when there's no database

const json = (status: number, body: Record<string, unknown>) => Response.json(body, { status });

function ipHash(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
  return createHash("sha256").update(`${process.env.IP_HASH_SALT ?? "portfolio"}:${ip}`).digest("hex");
}

async function tooManyRequests(hash: string) {
  if (sql) {
    const rows = await sql`select count(*)::int as n from contact_messages where ip_hash = ${hash} and created_at > now() - interval '1 hour'`;
    return (rows[0]?.n ?? 0) >= LIMIT;
  }
  const now = Date.now();
  const recent = (memoryHits.get(hash) ?? []).filter((t) => now - t < 3_600_000);
  memoryHits.set(hash, [...recent, now]);
  return recent.length >= LIMIT;
}

async function verifyTurnstile(token: string | undefined, req: Request) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // not set up yet: skip
  if (!token) return false;
  const body = new URLSearchParams({ secret, response: token });
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  if (ip) body.set("remoteip", ip);
  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method: "POST", body, signal: AbortSignal.timeout(5000) });
  const out = (await res.json()) as { success?: boolean };
  return !!out.success;
}

export async function POST(req: Request) {
  // Same-site requests only.
  const origin = req.headers.get("origin");
  const host = req.headers.get("host");
  if (origin && host && new URL(origin).host !== host) return json(403, { error: "Requests from other sites aren't allowed." });

  const length = Number(req.headers.get("content-length") ?? 0);
  if (length > MAX_BODY) return json(413, { error: "That message is too long." });

  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return json(400, { error: "The form data couldn't be read. Refresh the page and try again." });
  }

  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) return json(400, { error: parsed.error.issues[0]?.message ?? "Check the form and try again." });
  const { name, email, message, website, turnstile } = parsed.data;

  // Bots fill the hidden field. Pretend it worked so they don't retry.
  if (website) return json(200, { ok: true });

  const resendKey = process.env.RESEND_API_KEY;
  if (!sql && !resendKey) {
    return json(503, { error: `The form isn't connected yet. Email me at ${SITE.email} instead.` });
  }

  try {
    if (!(await verifyTurnstile(turnstile, req))) return json(400, { error: "The spam check failed. Refresh the page and try again." });

    const hash = ipHash(req);
    if (await tooManyRequests(hash)) return json(429, { error: "You've sent a few messages already. Try again in an hour." });

    if (sql) {
      await sql`insert into contact_messages (name, email, message, ip_hash) values (${name}, ${email}, ${message}, ${hash})`;
    }

    if (resendKey) {
      const resend = new Resend(resendKey);
      const { error } = await resend.emails.send({
        from: process.env.CONTACT_FROM ?? "Portfolio <onboarding@resend.dev>",
        to: process.env.CONTACT_TO ?? SITE.email,
        replyTo: email,
        subject: `Portfolio message from ${name}`,
        text: `${message}\n\nFrom: ${name} <${email}>`,
      });
      if (error && !sql) throw new Error(error.message);
    }

    return json(200, { ok: true });
  } catch (err) {
    console.error("contact form failed", err instanceof Error ? err.message : err);
    return json(500, { error: `Something went wrong on my side. Email me at ${SITE.email} instead.` });
  }
}

"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { LoaderCircle, Send } from "lucide-react";
import { contactSchema } from "@/lib/contact";

declare global {
  interface Window {
    turnstile?: { reset: (el?: string | HTMLElement) => void };
  }
}

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
const input =
  "w-full rounded-xl border border-[var(--line-2)] bg-beige px-4 py-3.5 font-[inherit] text-ink transition-colors focus:border-maroon focus:outline-none";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [note, setNote] = useState("");
  const [count, setCount] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);
  const turnstileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (status === "sent") formRef.current?.reset();
  }, [status]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      message: String(fd.get("message") ?? ""),
      website: String(fd.get("website") ?? ""),
      turnstile: String(fd.get("cf-turnstile-response") ?? "") || undefined,
    };
    const check = contactSchema.safeParse(data);
    if (!check.success) {
      setStatus("error");
      setNote(check.error.issues[0]?.message ?? "Check the form and try again.");
      return;
    }
    setStatus("sending");
    setNote("");
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const out = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(out.error ?? "Couldn't send. Try again.");
      setStatus("sent");
      setNote("Message sent. I'll reply to your email soon.");
      setCount(0);
    } catch (err) {
      setStatus("error");
      setNote(err instanceof Error ? err.message : "Couldn't send. Try again.");
    } finally {
      if (turnstileRef.current) window.turnstile?.reset(turnstileRef.current);
    }
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="card grid gap-4 p-7">
      <h3 className="mb-1.5 font-display text-[1.4rem] font-bold">Send a message</h3>
      <div>
        <label htmlFor="f-name" className="mb-1.5 block text-[0.88rem] text-muted">Name</label>
        <input id="f-name" name="name" autoComplete="name" required maxLength={100} className={input} />
      </div>
      <div>
        <label htmlFor="f-mail" className="mb-1.5 block text-[0.88rem] text-muted">Email</label>
        <input id="f-mail" name="email" type="email" autoComplete="email" required maxLength={200} className={input} />
      </div>
      <div>
        <label htmlFor="f-msg" className="mb-1.5 block text-[0.88rem] text-muted">Message</label>
        <textarea
          id="f-msg"
          name="message"
          required
          maxLength={2000}
          onChange={(e) => setCount(e.target.value.length)}
          className={`${input} min-h-[140px] resize-y`}
        />
        <div className="mt-1 text-right font-mono text-xs text-muted">{count}/2000</div>
      </div>
      <div aria-hidden className="absolute -left-[9999px]">
        <label htmlFor="f-web">Leave empty</label>
        <input id="f-web" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      {SITE_KEY && (
        <>
          <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="lazyOnload" />
          <div ref={turnstileRef} className="cf-turnstile" data-sitekey={SITE_KEY} data-theme="light" data-appearance="interaction-only" />
        </>
      )}
      <button type="submit" disabled={status === "sending"} className="pill pill-solid justify-self-start disabled:opacity-70">
        {status === "sending" ? <LoaderCircle size={18} className="animate-spin" aria-hidden /> : <Send size={17} aria-hidden />}
        {status === "sending" ? "Sending" : "Send message"}
      </button>
      <p role="status" className={`m-0 min-h-[1.4em] text-[0.9rem] ${status === "error" ? "text-[#b23a48]" : "text-sage-deep"}`}>
        {note}
      </p>
    </form>
  );
}

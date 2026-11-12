"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="flex items-center justify-between gap-2.5 rounded-xl border border-[var(--line-2)] bg-beige px-4 py-3.5 font-mono text-[0.92rem] [overflow-wrap:anywhere]">
      <span>{email}</span>
      <button
        type="button"
        onClick={() =>
          navigator.clipboard?.writeText(email).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 1600);
          })
        }
        className="inline-flex flex-none items-center gap-1.5 rounded-full border border-[var(--line-2)] px-3 py-1.5 text-xs hover:border-maroon hover:text-maroon"
      >
        {copied ? <Check size={13} aria-hidden /> : <Copy size={13} aria-hidden />}
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}

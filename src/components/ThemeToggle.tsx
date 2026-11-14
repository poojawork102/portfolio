"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "light" | "dark";

function subscribe(cb: () => void) {
  window.addEventListener("themechange", cb);
  return () => window.removeEventListener("themechange", cb);
}
const read = (): Theme => (document.documentElement.dataset.theme as Theme) ?? "light";

/**
 * Switches between the beige (light) and near-black (dark) themes.
 * The choice is remembered; with no saved choice the device setting wins.
 * The matching no-flash script lives in app/layout.tsx.
 */
export function ThemeToggle({ className = "" }: { className?: string }) {
  // The server has no theme to report, so the icon only appears after mount.
  const theme = useSyncExternalStore(subscribe, read, () => null);

  const toggle = () => {
    const next: Theme = read() === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", next === "dark" ? "#14100f" : "#efe8da");
    window.dispatchEvent(new Event("themechange"));
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "dark" ? "Switch to the light theme" : "Switch to the dark theme"}
      className={`grid size-11 place-items-center rounded-full border-[1.5px] border-[var(--line-2)] text-ink transition-colors hover:border-maroon hover:text-maroon ${className}`}
    >
      {theme === "dark" ? <Sun size={18} aria-hidden /> : theme === "light" ? <Moon size={18} aria-hidden /> : null}
    </button>
  );
}

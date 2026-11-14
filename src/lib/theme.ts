"use client";

import { useEffect, useState } from "react";

/** Reads a CSS colour variable from :root, e.g. cssVar("--star-a"). */
export function cssVar(name: string, fallback = "#000000") {
  if (typeof window === "undefined") return fallback;
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback;
}

/**
 * Returns the current theme and re-renders when it changes, so canvas and
 * WebGL pieces can repaint themselves in the new colours.
 */
export function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  useEffect(() => {
    const read = () => setTheme((document.documentElement.dataset.theme as "light" | "dark") ?? "light");
    read();
    window.addEventListener("themechange", read);
    return () => window.removeEventListener("themechange", read);
  }, []);
  return theme;
}

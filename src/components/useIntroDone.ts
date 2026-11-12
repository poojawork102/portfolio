"use client";

import { useSyncExternalStore } from "react";

/** "run" while the intro is playing, "done" or "skip" once the page should show. */
export type IntroState = "run" | "done" | "skip";

function subscribe(cb: () => void) {
  window.addEventListener("intro:done", cb);
  return () => window.removeEventListener("intro:done", cb);
}
const read = (): IntroState => (document.documentElement.dataset.intro as IntroState) || "run";

export function useIntroState(): IntroState {
  return useSyncExternalStore(subscribe, read, () => "run");
}

/** True once the intro loader has finished (or was skipped). */
export function useIntroDone() {
  return useIntroState() !== "run";
}

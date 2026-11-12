"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { INTRO_TERMINAL } from "@/data/profile";
import { useIntroState } from "./useIntroDone";

const EASE = [0.76, 0, 0.24, 1] as const;
const TONE: Record<string, string> = {
  name: "mb-1.5 text-[1.15em] font-semibold tracking-[0.06em] text-cream",
  dim: "text-beige/55",
  plain: "text-beige",
  accent: "mt-3 text-rose",
};

/**
 * Terminal-style intro. Plays once per browser session, then the screen lifts away.
 * Skippable with the button, Enter, Esc or Space, and it auto-continues.
 * The inline script in layout <head> hides it instantly for repeat visits and reduced motion.
 */
export function Intro() {
  const introState = useIntroState();
  const [leaving, setLeaving] = useState(false);
  const [typed, setTyped] = useState("");
  const [shown, setShown] = useState(0);
  const [enterOn, setEnterOn] = useState(false);
  const timers = useRef<number[]>([]);
  const finished = useRef(false);

  const finish = () => {
    if (finished.current) return;
    finished.current = true;
    timers.current.forEach(clearTimeout);
    try {
      sessionStorage.setItem("intro", "1");
    } catch {}
    setLeaving(true);
  };

  useEffect(() => {
    const root = document.documentElement;
    if (root.dataset.intro === "skip") return;
    root.style.overflow = "hidden";
    const later = (fn: () => void, ms: number) => timers.current.push(window.setTimeout(fn, ms));
    const q = INTRO_TERMINAL.question;
    let i = 0;
    const type = () => {
      i += 1;
      setTyped(q.slice(0, i));
      if (i < q.length) later(type, 38 + Math.random() * 40);
      else {
        INTRO_TERMINAL.lines.forEach((_, k) => later(() => setShown(k + 1), 450 + k * 260));
        const after = 450 + INTRO_TERMINAL.lines.length * 260;
        later(() => setEnterOn(true), after + 200);
        later(finish, after + 2600);
      }
    };
    later(type, 700);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === "Escape" || e.key === " ") {
        e.preventDefault();
        finish();
      }
    };
    window.addEventListener("keydown", onKey);
    const list = timers.current;
    return () => {
      window.removeEventListener("keydown", onKey);
      list.forEach(clearTimeout);
    };
  }, []);

  const onExitComplete = () => {
    const root = document.documentElement;
    root.style.overflow = "";
    root.dataset.intro = "done";
    window.dispatchEvent(new Event("intro:done"));
  };

  if (introState !== "run") return null;
  const typingDone = typed.length === INTRO_TERMINAL.question.length;

  return (
    <AnimatePresence onExitComplete={onExitComplete}>
      {!leaving && (
        <motion.div
          key="intro"
          role="dialog"
          aria-label="Intro"
          className="intro fixed inset-0 z-[90] grid content-center place-items-center gap-5 p-4"
          style={{ background: "radial-gradient(80% 70% at 50% 40%, #3a1f23, #1c1112 75%)" }}
          exit={{ y: "-100%", transition: { duration: 1, ease: EASE, delay: 0.25 } }}
        >
          <motion.div
            className="w-[min(92vw,640px)] overflow-hidden rounded-xl border border-beige/12 font-mono text-beige shadow-[0_30px_80px_rgba(0,0,0,.45)]"
            style={{ background: "rgba(32,20,21,.92)" }}
            initial={{ opacity: 0, y: 14, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.4 } }}
            transition={{ duration: 0.7, ease: [0.22, 0.8, 0.24, 1], delay: 0.15 }}
          >
            <div className="flex items-center gap-[7px] border-b border-beige/8 bg-beige/5 px-3.5 py-3">
              <i className="block size-[11px] rounded-full bg-[#b23a48]" />
              <i className="block size-[11px] rounded-full bg-[#c9a35a]" />
              <i className="block size-[11px] rounded-full bg-sage-mid" />
              <span className="mr-10 flex-1 text-center text-[0.72rem] text-beige/35">pooja.lingwat — intro</span>
            </div>
            <div className="min-h-[300px] px-[clamp(1.2rem,4vw,2.2rem)] py-[clamp(1.4rem,4vw,2.4rem)] text-[clamp(.78rem,2.2vw,.9rem)] leading-[1.75]">
              <p className="text-rose">
                <span className="text-sage">&rsaquo;</span> {typed}
                {!typingDone && <span className="blink ml-0.5 inline-block h-[1.05em] w-[.55em] bg-rose align-[-.18em]" />}
              </p>
              <div className="mt-6">
                {INTRO_TERMINAL.lines.map((l, k) => (
                  <motion.p
                    key={l.text}
                    className={TONE[l.tone]}
                    initial={{ opacity: 0, y: 6 }}
                    animate={k < shown ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
                    transition={{ duration: 0.45 }}
                  >
                    {l.text}
                  </motion.p>
                ))}
              </div>
              <motion.button
                type="button"
                onClick={finish}
                className="mt-8 text-rose transition-colors hover:text-cream"
                initial={{ opacity: 0 }}
                animate={{ opacity: enterOn ? 1 : 0 }}
              >
                <span className="blink text-beige/40">_</span>{" "}
                <span className="underline decoration-1 underline-offset-[.35em]">{INTRO_TERMINAL.enter}</span> &rarr;
              </motion.button>
            </div>
          </motion.div>
          <p className="m-0 font-mono text-[0.7rem] tracking-[0.12em] text-beige/25">{INTRO_TERMINAL.footer}</p>
          <button
            type="button"
            onClick={finish}
            className="absolute bottom-6 right-[clamp(1rem,3vw,2rem)] font-mono text-xs text-beige/45 hover:text-cream"
          >
            skip intro
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

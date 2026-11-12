"use client";

import { useEffect, useRef } from "react";

/** Small maroon dot that trails the mouse and grows into a ring over links. Desktop only. */
export function Cursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ok = window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!ok) return;
    document.documentElement.classList.add("has-cursor");
    let x = innerWidth / 2, y = innerHeight / 2, cx = x, cy = y, raf = 0, hiding = false;
    const move = (e: PointerEvent) => { x = e.clientX; y = e.clientY; el.dataset.on = hiding ? "" : "1"; };
    const leave = () => { el.dataset.on = ""; };
    const over = (e: PointerEvent) => {
      const t = e.target as HTMLElement;
      el.dataset.link = t.closest("a, button, .tool, [data-cursor]") ? "1" : "";
      hiding = !!t.closest("input, textarea");
      el.dataset.on = hiding ? "" : "1";
    };
    const loop = () => { cx += (x - cx) * 0.2; cy += (y - cy) * 0.2; el.style.transform = `translate3d(${cx}px,${cy}px,0)`; raf = requestAnimationFrame(loop); };
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    document.addEventListener("pointerover", over);
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
      document.removeEventListener("pointerover", over);
      document.documentElement.classList.remove("has-cursor");
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[95] -ml-[5px] -mt-[5px] size-[10px] rounded-full border-[1.5px] border-transparent bg-maroon opacity-0 transition-[width,height,margin,background-color,border-color,opacity] duration-[400ms] ease-[cubic-bezier(.22,.8,.24,1)] data-[on='1']:opacity-100 data-[link='1']:-ml-[21px] data-[link='1']:-mt-[21px] data-[link='1']:size-[42px] data-[link='1']:border-maroon data-[link='1']:bg-maroon/10"
    />
  );
}

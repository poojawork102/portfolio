"use client";

import { useRef } from "react";

/**
 * Tips its child toward the mouse in 3D with a soft shine.
 * Desktop only: on touch screens it does nothing.
 */
export function Tilt({ children, max = 5, className = "" }: { children: React.ReactNode; max?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const glare = useRef<HTMLSpanElement>(null);

  const fine = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el || !fine()) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.transition = "transform .15s ease-out";
    el.style.transform = `perspective(1000px) rotateX(${(0.5 - y) * max}deg) rotateY(${(x - 0.5) * max}deg) translateY(-4px)`;
    if (glare.current) {
      glare.current.style.opacity = "1";
      glare.current.style.background = `radial-gradient(420px circle at ${x * 100}% ${y * 100}%, rgba(122,31,51,.10), transparent 45%)`;
    }
  };
  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transition = "transform .8s cubic-bezier(.22,.8,.24,1)";
    el.style.transform = "";
    if (glare.current) glare.current.style.opacity = "0";
  };

  return (
    <div ref={ref} onPointerMove={onMove} onPointerLeave={onLeave} className={`relative will-change-transform ${className}`}>
      {children}
      <span
        ref={glare}
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[3] rounded-[inherit] opacity-0 transition-opacity duration-300"
      />
    </div>
  );
}

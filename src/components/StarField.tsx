"use client";

import { useEffect, useRef } from "react";

/** Slow drifting dots and the occasional streak behind the whole page. */
export function StarField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    const g = cv?.getContext("2d");
    if (!cv || !g) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    type Star = { x: number; y: number; r: number; a: number; tw: number; sp: number };
    type Streak = { x: number; y: number; life: number; len: number };
    let W = 0, H = 0, stars: Star[] = [], streaks: Streak[] = [], raf = 0, last = performance.now();

    const size = () => {
      W = window.innerWidth; H = window.innerHeight;
      cv.width = W * dpr; cv.height = H * dpr;
      g.setTransform(dpr, 0, 0, dpr, 0, 0);
      stars = Array.from({ length: Math.round((W * H) / 9000) }, () => ({
        x: Math.random() * W, y: Math.random() * H, r: Math.random() * 1.3 + 0.2,
        a: Math.random() * 0.6 + 0.15, tw: Math.random() * 6.28, sp: Math.random() * 0.15 + 0.03,
      }));
    };

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000); last = now;
      g.clearRect(0, 0, W, H);
      for (const s of stars) {
        if (!reduce) { s.y -= s.sp * dt * 12; s.tw += dt * 1.5; if (s.y < -2) { s.y = H + 2; s.x = Math.random() * W; } }
        g.globalAlpha = 0.55 * s.a * (0.65 + 0.35 * Math.sin(s.tw));
        g.fillStyle = s.r > 1.2 ? "#7a1f33" : "#6f8b69";
        g.beginPath(); g.arc(s.x, s.y, s.r, 0, 6.283); g.fill();
      }
      if (!reduce && Math.random() < dt * 0.35 && streaks.length < 2)
        streaks.push({ x: Math.random() * W * 0.8, y: Math.random() * H * 0.5, life: 0, len: 120 + Math.random() * 100 });
      streaks = streaks.filter((s) => (s.life += dt) < 1.6);
      for (const s of streaks) {
        const k = s.life / 1.6, x = s.x + k * 260, y = s.y + k * 160;
        const gr = g.createLinearGradient(x - s.len * 0.85, y - s.len * 0.52, x, y);
        gr.addColorStop(0, "rgba(122,31,51,0)");
        gr.addColorStop(1, `rgba(122,31,51,${(0.55 * Math.sin(Math.PI * k)).toFixed(3)})`);
        g.globalAlpha = 1; g.strokeStyle = gr; g.lineWidth = 1.2;
        g.beginPath(); g.moveTo(x - s.len * 0.85, y - s.len * 0.52); g.lineTo(x, y); g.stroke();
      }
      g.globalAlpha = 1;
      if (!reduce) raf = requestAnimationFrame(tick);
    };

    const onVis = () => { cancelAnimationFrame(raf); if (!document.hidden) { last = performance.now(); raf = requestAnimationFrame(tick); } };
    size();
    raf = requestAnimationFrame(tick);
    window.addEventListener("resize", size);
    document.addEventListener("visibilitychange", onVis);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", size); document.removeEventListener("visibilitychange", onVis); };
  }, []);

  return <canvas ref={ref} aria-hidden className="pointer-events-none fixed inset-0 z-0 size-full" />;
}

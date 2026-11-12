"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const MAROON = "#7a1f33";
const SAGE = "#7e9878";

function dotTexture() {
  const c = document.createElement("canvas");
  c.width = c.height = 64;
  const g = c.getContext("2d")!;
  const grd = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  grd.addColorStop(0, "rgba(255,255,255,1)");
  grd.addColorStop(0.45, "rgba(255,255,255,.9)");
  grd.addColorStop(1, "rgba(255,255,255,0)");
  g.fillStyle = grd;
  g.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(c);
}

function ring(radius: number, tilt: number, color: string, opacity: number) {
  const pts = new THREE.EllipseCurve(0, 0, radius, radius, 0, Math.PI * 2).getPoints(160);
  const line = new THREE.Line(
    new THREE.BufferGeometry().setFromPoints(pts),
    new THREE.LineBasicMaterial({ color, transparent: true, opacity }),
  );
  line.rotation.x = tilt;
  return line;
}

/** Deterministic 0..1 noise so the dot pattern is the same on every render. */
const hash01 = (i: number) => {
  const x = Math.sin(i * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

function build(count: number) {
  {
    const world = new THREE.Group();
    world.rotation.z = 0.35;
    const N = count;
    const R = 2.7;
    const pos = new Float32Array(N * 3);
    const col = new Float32Array(N * 3);
    const sage = new THREE.Color(SAGE), maroon = new THREE.Color(MAROON);
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2, rad = Math.sqrt(1 - y * y), th = i * 2.399963;
      pos.set([Math.cos(th) * rad * R, y * R, Math.sin(th) * rad * R], i * 3);
      const c = hash01(i) < 0.09 ? maroon : sage;
      col.set([c.r, c.g, c.b], i * 3);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(col, 3));
    const tex = dotTexture();
    const mat = new THREE.PointsMaterial({ size: 0.075, map: tex, vertexColors: true, transparent: true, opacity: 0, depthWrite: false });
    const points = new THREE.Points(geo, mat);
    world.add(points);
    const r1 = ring(3.4, 1.2, MAROON, 0.45);
    const r2 = ring(3.8, 1.9, SAGE, 0.5);
    world.add(r1, r2);
    const sat = new THREE.Mesh(new THREE.SphereGeometry(0.08, 16, 16), new THREE.MeshBasicMaterial({ color: MAROON }));
    r1.add(sat);
    const dispose = () => {
      world.traverse((o) => {
        const m = o as THREE.Mesh;
        m.geometry?.dispose();
        const mt = m.material as THREE.Material | undefined;
        mt?.dispose();
      });
      tex.dispose();
    };
    return { world, points, r2, sat, dispose };
  }
}

function Scene({ reduce, count }: { reduce: boolean; count: number }) {
  const mouse = useRef({ x: 0, y: 0, sx: 0, sy: 0 });
  const [scene] = useState(() => build(count));
  const objs = useRef(scene);
  const { dispose } = scene;

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      mouse.current.x = e.clientX / window.innerWidth - 0.5;
      mouse.current.y = e.clientY / window.innerHeight - 0.5;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      dispose();
    };
  }, [dispose]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const m = mouse.current;
    const { points, world, r2, sat } = objs.current;
    m.sx += (m.x - m.sx) * 0.05;
    m.sy += (m.y - m.sy) * 0.05;
    points.rotation.y = reduce ? 0.6 : t * 0.12;
    world.rotation.x = m.sy * 0.5;
    world.rotation.y = m.sx * 0.7;
    r2.rotation.z = reduce ? 0 : -t * 0.08;
    const a = reduce ? 1 : t * 0.6;
    sat.position.set(Math.cos(a) * 3.4, Math.sin(a) * 3.4, 0);
    const k = reduce ? 1 : Math.min(1, t / 1.6);
    const e = 1 - Math.pow(1 - k, 3);
    world.scale.setScalar(0.6 + 0.4 * e);
    (points.material as THREE.PointsMaterial).opacity = 0.9 * e;
  });

  return <primitive object={scene.world} />;
}

/** Rotating globe of dots with two orbit rings, drawn behind the hero photo. */
export default function Globe() {
  // This component only ever runs in the browser (loaded with ssr: false).
  const [reduce] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const [count] = useState(() => (window.innerWidth < 900 ? 700 : 1200));
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 11.5], fov: 35 }}
      gl={{ alpha: true, antialias: true }}
      frameloop={reduce ? "demand" : "always"}
      aria-hidden
    >
      <Scene reduce={reduce} count={count} />
    </Canvas>
  );
}

"use client";

// Backdrop "kontur topografi" — Canvas 2D murni, tanpa dependensi.
// Ambience restrained: garis kontur pudar drift ultra-lambat + 1 marker
// emas. Murah karena: garis di-prerender SEKALI ke offscreen canvas lalu
// di-blit geser (tidak dihitung ulang per frame), DPR clamp 1.5, pause
// saat offscreen/hidden, dan 1 frame statis bila reduced-motion.
// Mount mengikuti pola rAF-upgrade (render pertama = div kosong agar
// HTML server ≡ client, pelajaran insiden hydration v1.0).

import { useEffect, useRef } from "react";

const CONTOUR = "#d8d0be";
const GOLD = "#c9a254";
const LINES = 36;
const DRIFT_PX_PER_S = 1.2; // 12px per 10 detik — nyaris diam
const MARKER_PERIOD_S = 6;

export default function ContourBackdrop({ ready }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!ready) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let w = 0;
    let h = 0;
    let raf = 0;
    let running = true;
    let last = performance.now();

    // --- prerender kontur sekali ke offscreen (lebar 2x periode loop) ---
    const period = 240;
    const off = document.createElement("canvas");
    const seed = (i) => (i * 137.5) % 360; // deterministik, tanpa Math.random
    function prerender() {
      off.width = Math.max(1, Math.round(period * 2 * dpr));
      off.height = Math.max(1, Math.round(h * dpr));
      const c = off.getContext("2d");
      c.scale(dpr, dpr);
      c.strokeStyle = CONTOUR;
      c.lineWidth = 1;
      c.globalAlpha = 0.62;
      for (let i = 0; i < LINES; i++) {
        const y0 = (i / (LINES - 1)) * h;
        const amp = 6 + (i % 5) * 4;
        const ph = (seed(i) * Math.PI) / 180;
        c.beginPath();
        for (let x = 0; x <= period * 2; x += 12) {
          const y =
            y0 +
            Math.sin((x / period) * Math.PI * 2 + ph) * amp +
            Math.sin((x / period) * Math.PI * 4 + ph * 2) * amp * 0.3;
          if (x === 0) c.moveTo(x, y);
          else c.lineTo(x, y);
        }
        c.stroke();
      }
    }

    function resize() {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      prerender();
      draw(performance.now());
    }

    let offset = 0;
    function draw(now) {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      // blit ganda agar loop geser mulus tanpa celah
      ctx.globalAlpha = 1;
      ctx.drawImage(off, -offset, 0, period * 2, h);
      ctx.drawImage(off, -offset + period * 2, 0, period * 2, h);

      // marker emas tunggal (sepertiga kanan, 40% tinggi)
      const mx = w * 0.68;
      const my = h * 0.4;
      const k = ((now / 1000) % MARKER_PERIOD_S) / MARKER_PERIOD_S;
      ctx.strokeStyle = GOLD;
      ctx.globalAlpha = 0.9;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(mx - 11, my);
      ctx.lineTo(mx - 4, my);
      ctx.moveTo(mx + 4, my);
      ctx.lineTo(mx + 11, my);
      ctx.moveTo(mx, my - 11);
      ctx.lineTo(mx, my - 4);
      ctx.moveTo(mx, my + 4);
      ctx.lineTo(mx, my + 11);
      ctx.stroke();
      ctx.globalAlpha = (1 - k) * 0.25;
      ctx.beginPath();
      ctx.arc(mx, my, 6 + k * 22, 0, Math.PI * 2);
      ctx.stroke();
      ctx.globalAlpha = 1;
    }

    function loop(now) {
      if (!running) return;
      raf = requestAnimationFrame(loop);
      const dt = Math.min(0.1, (now - last) / 1000);
      last = now;
      offset = (offset + DRIFT_PX_PER_S * dt) % period;
      draw(now);
    }

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    const io = new IntersectionObserver(
      ([entry]) => {
        running = entry.isIntersecting && !document.hidden && !calm;
        if (running) {
          last = performance.now();
          loop(last);
        }
      },
      { threshold: 0.02 }
    );
    io.observe(canvas);
    const onVis = () => {
      running = !document.hidden && !calm;
      if (running) {
        last = performance.now();
        loop(last);
      }
    };
    document.addEventListener("visibilitychange", onVis);
    if (calm) {
      running = false;
      cancelAnimationFrame(raf);
    } else {
      loop(performance.now());
    }

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [ready]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
}

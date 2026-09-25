"use client";

// Hero asimetris 7:5 — kiri headline + CTA + terminal mengetik,
// kanan kanvas radar. Satu-satunya momen motion terorkestrasi di halaman.

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "framer-motion";
import CTAButton from "@/components/ui/CTAButton";
import Terminal from "@/components/ui/Terminal";
import RadarFallback from "@/components/three/RadarFallback";
import { WhatsAppIcon } from "@/components/ui/icons";
import { hero, site, terminalLines } from "@/lib/content";

const Scene = dynamic(() => import("@/components/three/HeroScene"), {
  ssr: false,
  loading: () => <RadarFallback />,
});

const TYPE_LINES = 3; // jumlah baris yg diketik, sisanya statis
const TYPE_SPEED_MS = 14;

const TYPED_LINES = terminalLines.slice(0, TYPE_LINES);
const TARGET = TYPED_LINES.reduce((n, l) => n + plain(l).length, 0);

function gate3D() {
  if (typeof window === "undefined") return false;
  const fine = window.matchMedia("(pointer: fine)").matches;
  const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  return fine && !calm && webglOK();
}

function webglOK() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

function plain(line) {
  return line.map(([t]) => t).join("");
}

// Render satu baris token dengan budget karakter (efek mengetik berwarna).
function renderLine(line, budget) {
  let rest = budget;
  const out = [];
  line.forEach(([t, c], i) => {
    if (rest <= 0) return;
    const slice = t.slice(0, rest);
    rest -= slice.length;
    out.push(
      <span key={i} className={c}>
        {slice}
      </span>
    );
  });
  return out;
}

export default function Hero() {
  const reduce = useReducedMotion();
  // Gate 3D dihitung sekali saat init (tanpa effect): pointer halus +
  // tanpa reduced-motion + WebGL. Selain itu → fallback statis.
  const [show3D] = useState(gate3D);
  const [typed, setTyped] = useState(0);
  const canvasWrapRef = useRef(null);

  // Efek mengetik 3 baris pertama terminal (sekali, 0.6s setelah mount).
  // Interval memanggil setState dari callback — bukan sinkron di body effect.
  useEffect(() => {
    if (reduce) return;
    let count = 0;
    let id;
    const start = setTimeout(() => {
      id = setInterval(() => {
        count += 2;
        if (count >= TARGET) {
          count = TARGET;
          clearInterval(id);
        }
        setTyped(count);
      }, TYPE_SPEED_MS);
    }, 600);
    return () => {
      clearTimeout(start);
      if (id) clearInterval(id);
    };
  }, [reduce]);

  // Fade kanvas mengikuti scroll (murah: tulis style langsung, tanpa render).
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        if (canvasWrapRef.current) {
          canvasWrapRef.current.style.opacity = String(
            Math.max(0.15, 1 - window.scrollY / 700)
          );
        }
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // reduced-motion → tampil penuh instan; jika tidak, ikuti budget ketikan.
  const shown = reduce ? TARGET : typed;
  const done = shown >= TARGET;
  // Porsi karakter per baris dari budget global — murni derivasi, tanpa mutasi.
  const takes = TYPED_LINES.map((line, i) => {
    const start = TYPED_LINES.slice(0, i).reduce((n, l) => n + plain(l).length, 0);
    return Math.max(0, Math.min(plain(line).length, shown - start));
  });
  const anim = (delay) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.55, delay, ease: "easeOut" },
        };

  return (
    <section className="relative overflow-hidden px-6 pb-20 pt-32 lg:pb-28 lg:pt-40">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-12">
        {/* kiri: copy + CTA + terminal */}
        <div className="lg:col-span-7">
          <motion.p
            {...anim(0.1)}
            className="mb-5 font-mono text-[13px] font-medium text-signal"
          >
            {hero.label}
          </motion.p>
          <motion.h1
            {...anim(0.2)}
            className="max-w-[16ch] text-[clamp(2.5rem,6vw,4.25rem)] font-bold leading-[1.05] tracking-[-0.02em] text-ink"
          >
            {hero.titleA}{" "}
            <span className="text-signal">{hero.titleB}</span>
          </motion.h1>
          <motion.p
            {...anim(0.3)}
            className="mt-6 max-w-[52ch] text-[1.0625rem] leading-relaxed text-muted"
          >
            {hero.sub}
          </motion.p>
          <motion.div {...anim(0.4)} className="mt-8">
            <CTAButton href={site.wa} external>
              <WhatsAppIcon />
              {site.waLabel}
            </CTAButton>
            <p className="mt-3 font-mono text-xs text-faint">{site.waNote}</p>
          </motion.div>

          <motion.div {...anim(0.5)} className="mt-10 max-w-2xl">
            <Terminal>
              <p>
                {TYPED_LINES.map((line, i) => {
                  const take = takes[i];
                  const chars = plain(line).length;
                  return (
                    <span key={i} className="block">
                      {renderLine(line, take)}
                      {!done && take < chars && take > 0 && (
                        <span className="animate-caret text-signal">▍</span>
                      )}
                    </span>
                  );
                })}
              </p>
              {done && (
                <p>
                  {terminalLines.slice(TYPE_LINES).map((line, i) => (
                    <span key={i} className="block">
                      {line.map(([t, c], j) => (
                        <span key={j} className={c}>
                          {t || "\u00A0"}
                        </span>
                      ))}
                    </span>
                  ))}
                </p>
              )}
            </Terminal>
          </motion.div>
        </div>

        {/* kanan: radar 3D / fallback */}
        <motion.div
          {...anim(0)}
          className="relative h-[320px] lg:col-span-5 lg:h-[560px]"
        >
          <div
            ref={canvasWrapRef}
            className="absolute inset-0"
            role="presentation"
          >
            {show3D ? <Scene /> : <RadarFallback />}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

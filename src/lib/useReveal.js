"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

// Reveal GSAP: fade + translateY sekali saat masuk viewport (spec §4).
// Guard reduced-motion via gsap.matchMedia — bila user minta kurangi gerak,
// blok animasi tidak pernah jalan dan elemen tampil normal dari awal
// (tidak pernah disembunyikan lewat CSS/inline style).
export function useReveal({
  y = 24,
  duration = 0.7,
  delay = 0,
  stagger = 0,
  start = "top 85%",
} = {}) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const targets = stagger > 0 ? Array.from(el.children) : [el];
      gsap.from(targets, {
        opacity: 0,
        y,
        duration,
        delay,
        stagger,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start, once: true },
      });
    });

    return () => mm.revert();
  }, [y, duration, delay, stagger, start]);

  return ref;
}

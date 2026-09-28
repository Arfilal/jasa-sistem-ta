"use client";

import { useReveal } from "@/lib/useReveal";

// Reveal restrained (spec §4): fade + geser 24px, sekali masuk viewport.
// stagger > 0 = animasi per-child (untuk grid).
export default function Reveal({ children, delay = 0, stagger = 0, className = "" }) {
  const ref = useReveal({ delay, stagger });
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

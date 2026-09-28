"use client";

// FAQ (spec §6.8): accordion — button + aria-expanded + region, chevron
// kecil rotate saat buka, animasi height via grid-rows 0fr→1fr (CSS saja,
// tanpa framer-motion). Bukan + raksasa center-align.

import { useState } from "react";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import { faqs } from "@/lib/content";

function ChevronIcon({ className = "h-4 w-4" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path d="m4 6 4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Item({ q, a, open, onToggle, index }) {
  const panelId = `faq-panel-${index}`;
  const btnId = `faq-btn-${index}`;
  return (
    <div
      className={`rounded-[14px] border bg-surface transition-colors duration-300 ${
        open ? "border-teal" : "border-line"
      }`}
    >
      <h3>
        <button
          type="button"
          id={btnId}
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={panelId}
          className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
        >
          <span className="text-[17px] font-bold tracking-tight text-ink">
            {q}
          </span>
          <ChevronIcon
            className={`h-4 w-4 shrink-0 text-teal transition-transform duration-300 ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={btnId}
        className={`grid transition-[grid-template-rows] duration-300 ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <p className="border-t border-line px-6 pb-6 pt-4 text-[15px] leading-relaxed text-muted">
            {a}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <Section id="faq" labelledby="faq-h" className="pt-16 lg:pt-20">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <h2
            id="faq-h"
            className="text-[clamp(2rem,4.5vw,2.5rem)] font-bold tracking-[-0.02em] text-ink"
          >
            Pertanyaan yang sering diajukan
          </h2>
        </Reveal>
        <div className="mt-10 space-y-4">
          {faqs.map((f, i) => (
            <Reveal key={f.q} delay={i * 0.06}>
              <Item
                q={f.q}
                a={f.a}
                index={i}
                open={open === i}
                onToggle={() => setOpen(open === i ? -1 : i)}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Section from "@/components/ui/Section";
import SectionLabel from "@/components/ui/SectionLabel";
import Reveal from "@/components/ui/Reveal";
import { faqs } from "@/lib/content";

function Item({ q, a, open, onToggle, index }) {
  const panelId = `faq-panel-${index}`;
  return (
    <div
      className={`overflow-hidden rounded-[14px] border bg-panel transition-colors duration-300 ${
        open ? "border-gold" : "border-line"
      }`}
    >
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={panelId}
          className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
        >
          <span className="text-[17px] font-bold tracking-tight text-ink">{q}</span>
          <span
            className={`shrink-0 text-xl leading-none text-gold-deep transition-transform duration-300 ${
              open ? "rotate-45" : ""
            }`}
            aria-hidden="true"
          >
            +
          </span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <p className="border-t border-line px-6 pb-6 pt-4 text-[15px] leading-relaxed text-muted">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <Section id="faq" labelledby="faq-h">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <SectionLabel>FAQ</SectionLabel>
          <h2
            id="faq-h"
            className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-bold tracking-tight text-ink"
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

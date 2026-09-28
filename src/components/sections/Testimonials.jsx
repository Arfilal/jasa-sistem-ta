import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import { testimonials } from "@/lib/content";

// Rating sebagai teks (konten) — isian teal, kosong netral (spec §6.7).
function Stars({ value }) {
  return (
    <p className="text-sm tracking-[0.2em]" aria-label={`${value} dari 5 bintang`}>
      {Array.from({ length: 5 }, (_, i) => {
        const fill = Math.max(0, Math.min(1, value - i));
        if (fill === 1) return <span key={i} className="text-teal">★</span>;
        if (fill === 0) return <span key={i} className="text-line">★</span>;
        return (
          <span key={i} className="relative inline-block text-line">
            ★
            <span
              className="absolute inset-0 overflow-hidden text-teal"
              style={{ width: `${fill * 100}%` }}
            >
              ★
            </span>
          </span>
        );
      })}
    </p>
  );
}

function Author({ t }) {
  return (
    <figcaption className="flex items-center gap-3">
      <span
        className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-paper font-mono text-sm font-medium text-ink"
        aria-hidden="true"
      >
        {t.initial}
      </span>
      <span>
        <span className="block font-mono text-sm font-medium text-ink">
          {t.name}
        </span>
        <span className="block text-xs text-faint">{t.role}</span>
      </span>
    </figcaption>
  );
}

// Testimoni: 3 kartu testimoni seragam.
export default function Testimonials() {
  return (
    <Section id="testimoni" labelledby="testimoni-h" wide>
      <Reveal>
        <h2
          id="testimoni-h"
          className="max-w-[22ch] text-[clamp(2rem,4.5vw,3.5rem)] font-bold leading-[1.08] tracking-[-0.02em] text-ink"
        >
          Apa kata klien kami?
        </h2>
      </Reveal>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t, i) => (
          <Reveal key={t.name} delay={i * 0.06}>
            <figure className="flex h-full flex-col gap-4 rounded-[14px] border border-line bg-surface p-7">
              <Stars value={t.stars} />
              <blockquote className="flex-1 text-[15px] leading-relaxed text-muted">
                {t.text}
              </blockquote>
              <Author t={t} />
            </figure>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

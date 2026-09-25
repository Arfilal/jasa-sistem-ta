import Section from "@/components/ui/Section";
import SectionLabel from "@/components/ui/SectionLabel";
import Reveal from "@/components/ui/Reveal";
import { testimonials } from "@/lib/content";

// Rating sebagai teks (konten), bukan ikon library.
function Stars({ value }) {
  return (
    <p className="font-mono text-base tracking-[0.2em]" aria-label={`${value} dari 5 bintang`}>
      {Array.from({ length: 5 }, (_, i) => {
        const fill = Math.max(0, Math.min(1, value - i));
        if (fill === 1) return <span key={i} className="text-star">★</span>;
        if (fill === 0) return <span key={i} className="text-faint/40">★</span>;
        return (
          <span key={i} className="relative inline-block text-faint/40">
            ★
            <span
              className="absolute inset-0 overflow-hidden text-star"
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

export default function Testimonials() {
  return (
    <Section id="testimoni" labelledby="testimoni-h">
      <Reveal>
        <SectionLabel>kata-klien</SectionLabel>
        <h2
          id="testimoni-h"
          className="max-w-[22ch] text-[clamp(1.75rem,3.5vw,2.5rem)] font-bold tracking-tight text-ink"
        >
          Apa kata klien kami?
        </h2>
      </Reveal>

      <div className="mt-12 grid items-start gap-6 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <Reveal key={t.name} delay={i * 0.08}>
            <figure className="flex h-full flex-col gap-5 rounded-xl border border-line bg-panel p-7">
              <Stars value={t.stars} />
              <blockquote className="flex-1 text-[15px] leading-relaxed text-muted">
                <span className="mr-1 font-mono text-lg text-signal">“</span>
                {t.text}
              </blockquote>
              <figcaption className="flex items-center gap-3 border-t border-line pt-5">
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-panel-2 font-mono text-sm font-semibold text-ink"
                  aria-hidden="true"
                >
                  {t.initial}
                </span>
                <span>
                  <span className="block text-sm font-bold text-ink">{t.name}</span>
                  <span className="block font-mono text-xs text-faint">{t.role}</span>
                </span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

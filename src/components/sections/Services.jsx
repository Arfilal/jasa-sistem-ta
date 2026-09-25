import Section from "@/components/ui/Section";
import SectionLabel from "@/components/ui/SectionLabel";
import Reveal from "@/components/ui/Reveal";
import { services } from "@/lib/content";

// Penanda struktural: hairline emas — bukan ikon, bukan marker kode.
export default function Services() {
  return (
    <Section id="layanan" labelledby="layanan-h">
      <Reveal>
        <SectionLabel>Layanan</SectionLabel>
        <h2
          id="layanan-h"
          className="max-w-[22ch] text-[clamp(1.75rem,3.5vw,2.5rem)] font-bold tracking-tight text-ink"
        >
          Layanan & keahlian kami
        </h2>
      </Reveal>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {services.map((s, i) => (
          <Reveal key={s.title} delay={i * 0.08}>
            <article
              className={`h-full rounded-[14px] border bg-panel p-7 transition-colors duration-300 ${
                s.highlight
                  ? "border-gold"
                  : "border-line hover:border-gold/60"
              }`}
            >
              <span className="block h-[3px] w-6 bg-gold" aria-hidden="true" />
              <h3 className="mt-4 text-xl font-bold tracking-tight text-ink">
                {s.title}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-muted">{s.desc}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

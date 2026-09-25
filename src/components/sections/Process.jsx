import Section from "@/components/ui/Section";
import SectionLabel from "@/components/ui/SectionLabel";
import Reveal from "@/components/ui/Reveal";
import { process } from "@/lib/content";

// Satu-satunya section bernomor — karena isinya sekuens asli.
// Desktop: timeline horizontal berkonektor; mobile: vertikal.
export default function Process() {
  return (
    <Section id="alur" labelledby="alur-h">
      <Reveal>
        <SectionLabel>alur-pemesanan</SectionLabel>
        <h2
          id="alur-h"
          className="max-w-[22ch] text-[clamp(1.75rem,3.5vw,2.5rem)] font-bold tracking-tight text-ink"
        >
          Dari chat pertama sampai serah terima
        </h2>
      </Reveal>

      <ol className="relative mt-12 grid gap-10 lg:grid-cols-5 lg:gap-6">
        <div
          className="absolute left-0 right-0 top-1 hidden border-t border-dashed border-line lg:block"
          aria-hidden="true"
        />
        {process.map((s, i) => (
          <Reveal key={s.title} delay={i * 0.08}>
            <li className="relative">
              <p className="relative z-10 mb-4 inline-block bg-void pr-4 font-mono text-sm font-semibold text-signal">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="text-lg font-bold tracking-tight text-ink">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{s.desc}</p>
            </li>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}

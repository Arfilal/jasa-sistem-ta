import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import {
  ChartIcon,
  ClockIcon,
  ShieldCheckIcon,
  TrendingUpIcon,
} from "@/components/ui/icons";
import { benefits } from "@/lib/content";

// Ikon per sel (urutan sama dengan array benefits) — presentasi, bukan konten.
const ICONS = [ShieldCheckIcon, ClockIcon, ChartIcon, TrendingUpIcon];

// Manfaat — section terang: headline + papan informasi (2×2, tanpa nomor).
export default function Benefits() {
  return (
    <Section id="manfaat" labelledby="manfaat-h" wide>
      <Reveal>
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-end">
          <h2
            id="manfaat-h"
            className="max-w-[20ch] text-[clamp(2rem,4.5vw,3.5rem)] font-bold leading-[1.08] tracking-[-0.02em] text-ink"
          >
            Lebih dari sekadar tampilan, ini fondasi digital kamu.
          </h2>
          <p className="max-w-[46ch] leading-relaxed text-muted lg:justify-self-end">
            Banyak yang menganggap website hanya pelengkap. Padahal sistem
            digital yang tepat jadi tulang punggung kerja bisnis, instansi,
            maupun proyek akademis kamu.
          </p>
        </div>
      </Reveal>

      <Reveal>
        <div className="mt-12 flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-teal-deep">
            Empat alasan
          </p>
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-faint">
            Untuk bisnis, instansi &amp; proyek akademik
          </p>
        </div>
      </Reveal>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        {benefits.map((b, i) => {
          const Icon = ICONS[i];
          return (
            <Reveal key={b.title} delay={i * 0.06}>
              <article className="group flex h-full flex-col rounded-[14px] border border-line bg-surface p-7 transition duration-200 hover:-translate-y-0.5 hover:border-teal hover:shadow-[0_10px_30px_-18px_rgba(15,23,42,0.45)]">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-[10px] border border-line text-teal-deep transition-colors duration-200 group-hover:border-teal group-hover:bg-teal-deep/5">
                  <Icon className="h-[18px] w-[18px]" />
                </span>
                <h3 className="mt-4 text-base font-bold tracking-tight text-ink">
                  {b.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted">
                  {b.desc}
                </p>
              </article>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}

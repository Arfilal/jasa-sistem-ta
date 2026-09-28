import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import { BrowserIcon, CapIcon, CodeIcon, DatabaseIcon } from "@/components/ui/icons";
import { services, status } from "@/lib/content";

// Ikon per kartu (urutan sama dengan array services) — presentasi, bukan konten.
const ICONS = [DatabaseIcon, BrowserIcon, CodeIcon, CapIcon];

// Layanan — section gelap (ala FORMA WEB "WHAT WE DO"):
// headline, 4 kartu ber-ikon, meta strip mono di bawah.
export default function Services() {
  return (
    <Section id="layanan" labelledby="layanan-h" wide className="bg-ink">
      <Reveal>
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-end">
          <h2
            id="layanan-h"
            className="max-w-[20ch] text-[clamp(2rem,4.5vw,3.5rem)] font-bold leading-[1.08] tracking-[-0.02em] text-white"
          >
            Apa yang Kami Kerjakan
          </h2>
          <p className="max-w-[46ch] leading-relaxed text-white/70 lg:justify-self-end">
            Setiap baris kode ditulis langsung oleh ahlinya tanpa perantara dan
            template jadi, menjadi arsitektur sistem presisi yang dirancang
            khusus untuk UMKM, instansi, hingga kebutuhan akademis.
          </p>
        </div>
      </Reveal>

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((s, i) => {
          const Icon = ICONS[i];
          return (
            <Reveal key={s.title} delay={i * 0.06}>
              <article className="flex h-full flex-col rounded-[14px] border border-white/10 bg-white/[0.04] p-7">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-[12px] border border-white/15 text-teal-soft">
                  <Icon className="h-5 w-5" />
                </span>
                <span
                  className="mt-6 block font-mono text-sm font-medium text-white/40"
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 text-lg font-bold tracking-tight text-white">
                  {s.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/70">
                  {s.desc}
                </p>
              </article>
            </Reveal>
          );
        })}
      </div>

      {/* meta strip ala desain referensi */}
      <Reveal delay={0.1}>
        <div className="mt-14 flex flex-wrap items-center justify-between gap-x-8 gap-y-3 border-t border-white/15 pt-6 font-mono text-[11px] uppercase tracking-[0.16em] text-white/50">
          <span>{status.guarantee}</span>
          <span>Kode rapi, bebas bug</span>
        </div>
      </Reveal>
    </Section>
  );
}

import Section from "@/components/ui/Section";
import SectionLabel from "@/components/ui/SectionLabel";
import Reveal from "@/components/ui/Reveal";
import CTAButton from "@/components/ui/CTAButton";
import { ArrowRightIcon } from "@/components/ui/icons";
import { pricing, site } from "@/lib/content";

// Kolom tak simetris 5:7 — harga adalah data, bukan dekorasi.
// Angka memakai tabular-nums (presisi tanpa font mono).
export default function Pricing() {
  return (
    <Section id="harga" labelledby="harga-h">
      <Reveal>
        <SectionLabel>Estimasi harga</SectionLabel>
        <h2
          id="harga-h"
          className="max-w-[22ch] text-[clamp(1.75rem,3.5vw,2.5rem)] font-bold tracking-tight text-ink"
        >
          Harga terus terang di awal
        </h2>
        <p className="mt-4 max-w-[60ch] leading-relaxed text-muted">
          Angka pasti menyusul setelah konsultasi — tapi patokannya jelas
          sejak halaman ini.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-6 lg:grid-cols-12">
        {pricing.map((p, i) => (
          <Reveal
            key={p.title}
            delay={i * 0.08}
            className={p.featured ? "lg:col-span-7" : "lg:col-span-5"}
          >
            <article
              className={`flex h-full flex-col rounded-[14px] border bg-panel p-8 lg:p-10 ${
                p.featured ? "border-gold" : "border-line"
              }`}
            >
              <p className="flex items-center gap-3 text-[13px] font-semibold text-gold-deep">
                <span className="h-px w-6 bg-gold" aria-hidden="true" />
                {p.label}
              </p>
              <h3 className="mt-3 text-xl font-bold tracking-tight text-ink">
                {p.title}
              </h3>
              <p className="mt-6 text-sm text-muted">{p.prefix}</p>
              <p
                className={`tnum mt-1 text-4xl font-bold tracking-tight ${
                  p.featured ? "text-gold-deep" : "text-ink"
                }`}
              >
                {p.price}
              </p>
              <p className="mt-5 flex-1 leading-relaxed text-muted">{p.desc}</p>
              <div className="mt-8">
                <CTAButton
                  href={site.wa}
                  external
                  variant={p.featured ? "primary" : "ghost"}
                >
                  Tanya paket ini
                  <ArrowRightIcon />
                </CTAButton>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

import Image from "next/image";
import Section from "@/components/ui/Section";
import SectionLabel from "@/components/ui/SectionLabel";
import Reveal from "@/components/ui/Reveal";
import { portfolio } from "@/lib/content";

// Cetak tebal frasa penekanan tanpa mengubah teks (descBold ⊆ desc).
function rich(desc, bolds) {
  const pattern = new RegExp(
    `(${bolds.map((b) => b.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`,
    "g"
  );
  return desc.split(pattern).map((part, i) =>
    bolds.includes(part) ? (
      <strong key={i} className="font-semibold text-ink">
        {part}
      </strong>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

function Tags({ tags }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((t) => (
        <span
          key={t}
          className="rounded-full border border-line bg-paper px-3 py-1 text-[11px] font-medium text-muted"
        >
          {t}
        </span>
      ))}
    </div>
  );
}

export default function Portfolio() {
  const [featured, ...rest] = portfolio;

  return (
    <Section id="karya" labelledby="karya-h" wide>
      <Reveal>
        <SectionLabel>Karya nyata</SectionLabel>
        <h2
          id="karya-h"
          className="max-w-[22ch] text-[clamp(1.75rem,3.5vw,2.5rem)] font-bold tracking-tight text-ink"
        >
          Sistem yang sudah jalan di lapangan
        </h2>
        <p className="mt-4 max-w-[60ch] leading-relaxed text-muted">
          Proyek tugas akhir dan aplikasi nyata yang kami bangun dari nol —
          bukan mockup, bukan template.
        </p>
      </Reveal>

      {/* kartu fitur: proyek utama, horizontal */}
      <Reveal className="mt-12">
        <article className="group grid overflow-hidden rounded-[14px] border border-line bg-panel shadow-[0_24px_60px_-40px_rgba(26,29,33,0.3)] md:grid-cols-2">
          <div className="relative h-60 border-b border-line bg-panel-2 md:h-auto md:min-h-[320px] md:border-b-0 md:border-r">
            <Image
              src={featured.img}
              alt={featured.alt}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain p-6 transition-transform duration-500 group-hover:scale-[1.03]"
            />
          </div>
          <div className="flex flex-col justify-center gap-5 p-8 lg:p-12">
            <h3 className="text-2xl font-bold tracking-tight text-ink">
              {featured.title}
            </h3>
            <p className="text-[15px] leading-relaxed text-muted">
              {rich(featured.desc, featured.descBold)}
            </p>
            <Tags tags={featured.tags} />
          </div>
        </article>
      </Reveal>

      {/* dua kartu offset: ritme tak simetris, hierarki = prioritas */}
      <div className="mt-8 grid gap-8 md:grid-cols-2">
        {rest.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.08} className={i === 1 ? "md:mt-12" : ""}>
            <article className="group flex h-full flex-col overflow-hidden rounded-[14px] border border-line bg-panel">
              <div className="relative h-56 border-b border-line bg-panel-2">
                <Image
                  src={p.img}
                  alt={p.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-contain p-6 transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div className="flex flex-1 flex-col gap-4 p-7">
                <h3 className="text-xl font-bold tracking-tight text-ink">
                  {p.title}
                </h3>
                <p className="flex-1 text-sm leading-relaxed text-muted">
                  {rich(p.desc, p.descBold)}
                </p>
                <Tags tags={p.tags} />
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

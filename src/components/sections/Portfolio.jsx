// Karya / Portfolio — section gelap, 3 phone mockup berdampingan
// (satu-satunya tempat gambar tampil; laptop 3D dihapus, three.js ikut hilang).

import Image from "next/image";
import Section from "@/components/ui/Section";
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
      <strong key={i} className="font-semibold text-white">
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
          className="rounded-full border border-white/20 px-3 py-1.5 font-mono text-[11px] uppercase tracking-wide text-white/50"
        >
          {t}
        </span>
      ))}
    </div>
  );
}

function Phone({ src, alt }) {
  return (
    <div className="relative mx-auto aspect-[1379/2756] w-full max-w-[270px]">
      {/* radius ~164px PNG (sedikit > hole 160px) agar sudut SS terpotong
          di dalam lubang layar — sudut persegi menembus lengkung body. */}
      <div
        className="absolute overflow-hidden"
        style={{ inset: "3.63% 7.25%", borderRadius: "14% / 6.4%" }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 1024px) 70vw, 270px"
          loading="lazy"
          className="object-cover object-top"
        />
      </div>
      <Image
        src="/mockup/iphone-16-teal.png"
        alt=""
        fill
        sizes="270px"
        className="pointer-events-none object-contain"
      />
    </div>
  );
}

export default function Portfolio() {
  return (
    <Section id="karya" labelledby="karya-h" wide className="bg-ink">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2
            id="karya-h"
            className="max-w-[22ch] text-[clamp(2rem,4.5vw,3.5rem)] font-bold leading-[1.08] tracking-[-0.02em] text-white"
          >
            Portofolio
          </h2>
          <p className="max-w-[46ch] leading-relaxed text-white/60">
            Daftar proyek yang telah dikerjakan.
          </p>
        </div>
      </Reveal>

      <div className="mt-12 grid gap-10 lg:grid-cols-3">
        {portfolio.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.07}>
            <article className="flex h-full flex-col">
              <Phone src={p.img} alt={p.alt} />
              <div className="mt-6 flex flex-1 flex-col gap-3">
                <p className="font-mono text-[11px] text-white/40">
                  {`0${i + 1}`}
                </p>
                <h3 className="text-lg font-bold leading-snug tracking-tight text-white">
                  {p.title}
                </h3>
                <p className="flex-1 text-sm leading-relaxed text-white/60">
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

import { tech } from "@/lib/content";

// Strip chip ber-border (tanpa logo brand): logo pihak ketiga = masalah
// trademark + request tambahan + risiko akurasi. Chip teks jujur & ringan.
export default function TechStrip() {
  return (
    <section aria-label="Teknologi yang dikuasai" className="border-y border-line bg-panel px-6 py-10">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center gap-x-4 gap-y-3">
        <p className="mr-2 flex items-center gap-3 text-[13px] font-semibold text-gold-deep">
          <span className="h-px w-6 bg-gold" aria-hidden="true" />
          Stack kami
        </p>
        {tech.map((t) => (
          <span
            key={t}
            className="inline-flex items-center gap-2.5 rounded-[10px] border border-line bg-paper px-4 py-2.5 text-sm font-semibold text-ink transition-colors duration-300 hover:border-gold"
          >
            <span className="h-1.5 w-1.5 bg-gold" aria-hidden="true" />
            {t}
          </span>
        ))}
      </div>
    </section>
  );
}

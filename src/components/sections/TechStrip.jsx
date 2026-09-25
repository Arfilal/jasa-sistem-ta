import { tech } from "@/lib/content";

// Strip tipis tanpa card: murah vertikal, cukup untuk kredibilitas.
export default function TechStrip() {
  return (
    <section aria-label="Teknologi yang dikuasai" className="border-y border-line bg-panel px-6 py-10">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center gap-x-10 gap-y-4">
        <p className="flex items-center gap-3 text-[13px] font-semibold text-gold-deep">
          <span className="h-px w-6 bg-gold" aria-hidden="true" />
          Stack kami
        </p>
        {tech.map((t) => (
          <span key={t} className="inline-flex items-center gap-2.5 text-sm font-medium text-muted">
            <span className="h-1.5 w-1.5 bg-gold" aria-hidden="true" />
            {t}
          </span>
        ))}
      </div>
    </section>
  );
}

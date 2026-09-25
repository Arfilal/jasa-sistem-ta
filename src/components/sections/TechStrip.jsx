import { tech } from "@/lib/content";

// Strip tipis tanpa card: murah vertikal, cukup untuk kredibilitas.
export default function TechStrip() {
  return (
    <section aria-label="Teknologi yang dikuasai" className="border-y border-line px-6 py-10">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center gap-x-10 gap-y-4">
        <p className="font-mono text-[13px] text-faint">{"// stack"}</p>
        {tech.map((t) => (
          <span key={t} className="inline-flex items-center gap-2.5 font-mono text-sm text-muted">
            <span className="h-1.5 w-1.5 bg-signal" aria-hidden="true" />
            {t}
          </span>
        ))}
      </div>
    </section>
  );
}

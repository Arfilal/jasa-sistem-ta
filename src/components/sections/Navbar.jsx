import { site } from "@/lib/content";

const links = [
  ["#karya", "Karya"],
  ["#layanan", "Layanan"],
  ["#harga", "Harga"],
  ["#alur", "Alur"],
  ["#faq", "FAQ"],
];

// Blur di navbar fungsional (keterbacaan saat scroll) — satu-satunya blur yg diizinkan.
export default function Navbar() {
  return (
    <nav
      aria-label="Navigasi utama"
      className="fixed inset-x-0 top-0 z-50 border-b border-line bg-void/80 backdrop-blur-md"
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <a href="#atas" className="text-xl font-bold tracking-tight text-ink">
          Syntax<span className="text-signal">Lab</span>
        </a>

        <div className="hidden items-center gap-7 md:flex">
          {links.map(([href, label]) => (
            <a
              key={href}
              href={href}
              className="text-sm text-muted transition-colors hover:text-ink"
            >
              {label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <p className="hidden items-center gap-2 font-mono text-xs text-muted lg:flex">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ok opacity-60" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-ok" />
            </span>
            Siap menerima proyek
          </p>
          <a
            href={site.wa}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-[10px] bg-signal px-5 py-2.5 text-sm font-semibold text-signal-ink shadow-[0_0_36px_-10px_var(--color-signal)] transition-all duration-300 hover:-translate-y-px hover:shadow-[0_0_48px_-8px_var(--color-signal)] active:translate-y-0 active:scale-[0.98]"
          >
            Hubungi Kami
          </a>
        </div>
      </div>
    </nav>
  );
}

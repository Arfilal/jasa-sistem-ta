import Link from "next/link";
import { site } from "@/lib/content";

// Blur di navbar fungsional (keterbacaan saat scroll) — satu-satunya blur yg diizinkan.
export default function Navbar() {
  return (
    <nav
      aria-label="Navigasi utama"
      className="fixed inset-x-0 top-0 z-50 border-b border-line bg-paper/85 backdrop-blur-md"
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-bold tracking-tight text-ink">
          Syntax<span className="text-gold-deep">Lab</span>
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {[
            ["#karya", "Karya"],
            ["#layanan", "Layanan"],
            ["#harga", "Harga"],
            ["#alur", "Alur"],
            ["#faq", "FAQ"],
          ].map(([href, label]) => (
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
          <a
            href={site.wa}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-[10px] bg-gold px-5 py-2.5 text-sm font-semibold text-ink transition-all duration-300 hover:-translate-y-px active:translate-y-0 active:scale-[0.98]"
          >
            Hubungi Kami
          </a>
        </div>
      </div>
    </nav>
  );
}

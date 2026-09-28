"use client";

import Link from "next/link";
import {
  InstagramIcon,
  TikTokIcon,
  WhatsAppIcon,
} from "@/components/ui/icons";
import { nav, site } from "@/lib/content";
import { onNavClick } from "@/lib/scroll";

// Footer gelap 3 kolom (ala FORMA WEB): brand + tagline / jelajahi / kontak,
// baris bawah: copyright + meta mono.
export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink px-6 py-14">
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p className="font-display text-xl font-extrabold tracking-tight text-white">
              Syntax<span className="text-teal">Lab</span>
            </p>
            <p className="mt-3 max-w-[34ch] text-sm leading-relaxed text-white/70">
              Layanan pengembangan website, sistem informasi, dan aplikasi
              kustom dengan kode terstruktur, dokumentasi lengkap, dan
              pendampingan teknis jarak jauh sampai sistem berjalan.
            </p>
          </div>

          <nav aria-label="Navigasi footer">
            <p className="font-mono text-[11px] font-medium text-white/70">
              Jelajahi
            </p>
            <ul className="mt-4 space-y-2.5">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={(e) => onNavClick(e, item.href)}
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="font-mono text-[11px] font-medium text-white/70">
              Kontak
            </p>
            <a
              href={site.wa}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white"
            >
              <WhatsAppIcon />
              {site.waLabel}
            </a>
            <div className="mt-5 flex items-center gap-6">
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white"
              >
                <InstagramIcon />
                Instagram
              </a>
              <a
                href={site.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white"
              >
                <TikTokIcon />
                TikTok
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
          <p className="text-[13px] text-white/70">{site.copyright}</p>
        </div>
      </div>
    </footer>
  );
}

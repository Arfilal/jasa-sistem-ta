"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { nav, site } from "@/lib/content";
import { onNavClick } from "@/lib/scroll";

// Blur di navbar fungsional (keterbacaan saat scroll) — satu-satunya blur
// yg diizinkan (spec §6.1). Mobile: dropdown panel di bawah navbar.
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navRef = useRef(null);

  // Panel menutup saat klik/tap di luar navbar atau tekan Escape.
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) setOpen(false);
    };
    const onKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <nav
      ref={navRef}
      aria-label="Navigasi utama"
      className="fixed inset-x-0 top-0 z-50 border-b border-line bg-paper/85 backdrop-blur-md"
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          onClick={() => {
            setOpen(false);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="font-display text-xl font-extrabold tracking-tight text-ink"
        >
          Syntax<span className="text-teal-deep">Lab</span>
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => onNavClick(e, item.href)}
              className="text-sm text-muted transition-colors hover:text-ink"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a
            href={site.wa}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-teal-deep px-6 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-ink"
          >
            Hubungi Kami
          </a>

          <button
            type="button"
            className="inline-flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-[10px] border border-line bg-surface md:hidden"
            aria-expanded={open}
            aria-controls="nav-menu"
            aria-label={open ? "Tutup menu" : "Buka menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span
              className={`block h-0.5 w-5 bg-ink transition-transform duration-300 ${
                open ? "translate-y-[3px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-5 bg-ink transition-transform duration-300 ${
                open ? "-translate-y-[3px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Panel menu: selalu di-mount, tinggi lewat grid-rows 0fr→1fr supaya
          buka & tutup beranimasi (grid + overflow-hidden, tanpa JS animasi). */}
      <div
        id="nav-menu"
        inert={!open}
        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none md:hidden ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="border-t border-line bg-paper px-4 pb-5 pt-2 sm:px-6">
            <ul className="flex flex-col">
              {nav.map((item, i) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={(e) => {
                      setOpen(false);
                      onNavClick(e, item.href);
                    }}
                    style={{ transitionDelay: open ? `${i * 45}ms` : "0ms" }}
                    className={`block py-2.5 text-sm text-muted transition-all duration-300 motion-reduce:transition-none hover:text-ink ${
                      open ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0"
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

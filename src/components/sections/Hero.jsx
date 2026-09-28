"use client";

// Hero editorial (ala FORMA WEB): split kiri teks + kanan kartu poster.
// Intro teks via GSAP sekali saat mount; kertas poster ikut arah kursor
// (rotateY/X di-lerp halus). Guard reduced-motion + pointer halus via matchMedia.

import { useEffect, useRef } from "react";
import CTAButton from "@/components/ui/CTAButton";
import { WhatsAppIcon } from "@/components/ui/icons";
import { hero, site, status } from "@/lib/content";
import { gsap } from "@/lib/gsap";

export default function Hero() {
  const rootRef = useRef(null);
  const paperRef = useRef(null);

  // Intro hero: sekali saat mount, fade + y 24 (spec §4 pola 3).
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from(el.querySelectorAll("[data-hero-item]"), {
        opacity: 0,
        y: 24,
        duration: 0.7,
        stagger: 0.09,
        delay: 0.05,
        ease: "power2.out",
      });
    });
    return () => mm.revert();
  }, []);

  // Kertas poster: rotateY ikut arah horizontal kursor (kiri/kanan) + rotateX
  // halus, di-lerp quickTo (bukan snap). Hanya untuk pointer halus tanpa
  // reduced-motion; sisanya statis.
  useEffect(() => {
    const el = rootRef.current;
    const paper = paperRef.current;
    if (!el || !paper) return;
    const mm = gsap.matchMedia();
    mm.add(
      "(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine)",
      () => {
        const rotY = gsap.quickTo(paper, "rotationY", {
          duration: 0.9,
          ease: "power3.out",
        });
        const rotX = gsap.quickTo(paper, "rotationX", {
          duration: 0.9,
          ease: "power3.out",
        });
        const shiftX = gsap.quickTo(paper, "x", {
          duration: 0.9,
          ease: "power3.out",
        });
        const clamp = (n) => Math.max(-1, Math.min(1, n));
        const onMove = (e) => {
          const r = el.getBoundingClientRect();
          const nx = clamp(((e.clientX - r.left) / r.width) * 2 - 1);
          const ny = clamp(((e.clientY - r.top) / r.height) * 2 - 1);
          rotY(nx * 12);
          rotX(ny * -5);
          shiftX(nx * 8);
        };
        window.addEventListener("pointermove", onMove, { passive: true });
        return () => window.removeEventListener("pointermove", onMove);
      }
    );
    return () => mm.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative px-6 pb-20 pt-28 lg:pb-24 lg:pt-36"
    >
      <div className="mx-auto grid w-full max-w-7xl items-stretch gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        {/* kiri: headline + CTA + meta */}
        <div className="flex flex-col justify-center">
          <h1
            data-hero-item
            className="max-w-[17ch] text-[clamp(2.25rem,5vw,4rem)] font-extrabold leading-[1.05] tracking-[-0.03em] text-ink"
          >
            {hero.titleA} <span className="text-teal-deep">{hero.titleAccent}</span>{" "}
            {hero.titleB}
          </h1>

          <p
            data-hero-item
            className="mt-7 max-w-[52ch] text-[1.0625rem] leading-relaxed text-muted"
          >
            {hero.sub}
          </p>

          <div data-hero-item className="mt-8">
            <CTAButton href={site.wa} external>
              <WhatsAppIcon />
              {site.waLabel}
            </CTAButton>
            <p className="mt-3 text-xs text-faint">{site.waNote}</p>
          </div>

          {/* meta row: status proyek (ala meta label di desain referensi) */}
          <div
            data-hero-item
            className="mt-10  pt-5"
          >
            {/* <p className="flex items-center gap-2.5 font-mono text-[12px] font-medium uppercase tracking-[0.14em] text-teal-deep">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-deep" />
              </span>
              {status.badge}
            </p> */}
          </div>
        </div>

        {/* kanan: kartu poster */}
        <div data-hero-item className="relative">
          <div className="relative flex h-full min-h-[380px] flex-col justify-between overflow-hidden rounded-[20px] border border-line bg-surface p-7 [perspective:1000px] lg:min-h-[460px]">
            {/* lingkaran dekoratif ala poster referensi */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full border-[22px] border-teal/15"
            />

            {/* kertas poster — rotasi 3D ikut kursor (lihat useEffect di atas) */}
            <div
              ref={paperRef}
              className="relative z-10 mx-auto my-auto w-full max-w-[340px] rounded-[10px] border border-line bg-white px-7 py-9 text-center will-change-transform"
            >
              <p className="font-mono text-[11px] text-faint">
                SyntaxLab
              </p>
              <p className="mt-5 font-display text-[clamp(1.75rem,3vw,2.5rem)] font-extrabold leading-[1.05] tracking-tight text-ink">
                {hero.poster}
              </p>
              <p className="mt-5 border-t border-line pt-4 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                {hero.posterMeta}
              </p>
            </div>

            {/* footer kartu */}
            <div className="relative z-10 flex items-center justify-between">
              <p className="font-mono text-[11px] text-faint">
                Konsultasi gratis
              </p>
              <p className="font-mono text-[11px] text-faint">
                01 / 01
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

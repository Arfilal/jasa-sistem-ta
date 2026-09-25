"use client";

// Hero terang: backdrop kontur full-bleed + konten kiri (eyebrow, H1
// serif-aksen, CTA, status card). Satu-satunya momen motion terorkestrasi.

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import CTAButton from "@/components/ui/CTAButton";
import StatusCard from "@/components/ui/StatusCard";
import ContourBackdrop from "@/components/background/ContourBackdrop";
import { WhatsAppIcon } from "@/components/ui/icons";
import { hero, site } from "@/lib/content";

export default function Hero() {
  const reduce = useReducedMotion();
  // Render pertama = statis (≡ SSR); canvas naik pasca-hydration via rAF.
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const anim = (delay) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.55, delay, ease: "easeOut" },
        };

  return (
    <section className="relative overflow-hidden px-6 pb-20 pt-32 lg:pb-28 lg:pt-40">
      {/* backdrop: canvas + vignette paper menipis ke tepi */}
      <div className="absolute inset-0" role="presentation">
        <ContourBackdrop ready={mounted} />
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_40%,transparent_40%,var(--color-paper)_100%)]"
          aria-hidden="true"
        />
      </div>

      <div className="relative mx-auto w-full max-w-6xl">
        <div className="max-w-3xl">
          <motion.p
            {...anim(0.1)}
            className="mb-5 flex items-center gap-3 text-[13px] font-semibold text-gold-deep"
          >
            <span className="h-px w-6 bg-gold" aria-hidden="true" />
            {hero.label}
          </motion.p>
          <motion.h1
            {...anim(0.2)}
            className="max-w-[18ch] text-[clamp(2.5rem,6vw,4rem)] font-bold leading-[1.08] tracking-[-0.02em] text-ink"
          >
            {hero.titleA}{" "}
            <em className="font-serif font-normal italic text-gold-deep">
              {hero.titleAccent}
            </em>{" "}
            {hero.titleB}
          </motion.h1>
          <motion.p
            {...anim(0.3)}
            className="mt-6 max-w-[52ch] text-[1.0625rem] leading-relaxed text-muted"
          >
            {hero.sub}
          </motion.p>
          <motion.div {...anim(0.4)} className="mt-8">
            <CTAButton href={site.wa} external>
              <WhatsAppIcon />
              {site.waLabel}
            </CTAButton>
            <p className="mt-3 text-xs text-faint">{site.waNote}</p>
          </motion.div>
          <motion.div {...anim(0.5)} className="mt-10 max-w-2xl">
            <StatusCard />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

import Reveal from "@/components/ui/Reveal";
import CTAButton from "@/components/ui/CTAButton";
import { WhatsAppIcon } from "@/components/ui/icons";
import { site } from "@/lib/content";

// Final CTA: Full-bleed teal, headline besar rata kiri,
// tombol putih (inverse), link WA sekunder. 
export default function FinalCta() {
  return (
    <section aria-labelledby="cta-h" className="bg-teal-deep px-6 py-24 lg:py-32">
      <div className="mx-auto w-full max-w-7xl">
        <Reveal>
          <h2
            id="cta-h"
            className="max-w-[20ch] text-[clamp(2.5rem,7vw,4.5rem)] font-extrabold leading-[1.03] tracking-[-0.03em] text-white"
          >
            Wujudkan Sistem Digital Anda.
          </h2>
          <p className="mt-6 max-w-[52ch] text-[1.0625rem] leading-relaxed text-white/80">
            Konsultasikan kebutuhan sistem Anda secara gratis. Dapatkan estimasi 
            biaya dan waktu pengerjaan yang presisi.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
            <CTAButton href={site.wa} external variant="inverse">
              <WhatsAppIcon />
              {site.waLabel}
            </CTAButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
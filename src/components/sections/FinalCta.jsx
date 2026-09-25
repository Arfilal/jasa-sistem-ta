import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import CTAButton from "@/components/ui/CTAButton";
import { WhatsAppIcon } from "@/components/ui/icons";
import { site } from "@/lib/content";

// Satu-satunya section center-align — penutup yg disengaja setelah semua
// objeksi (harga, alur, testimoni, FAQ) terjawab.
export default function FinalCta() {
  return (
    <Section labelledby="cta-h">
      <Reveal>
        <div className="rounded-2xl border border-line bg-panel px-6 py-16 text-center lg:py-20">
          <p className="flex items-center justify-center gap-3 text-[13px] font-semibold text-gold-deep">
            <span className="h-px w-6 bg-gold" aria-hidden="true" />
            Mulai sekarang
            <span className="h-px w-6 bg-gold" aria-hidden="true" />
          </p>
          <h2
            id="cta-h"
            className="mx-auto mt-4 max-w-[26ch] text-[clamp(1.75rem,4vw,2.75rem)] font-bold leading-tight tracking-tight text-ink"
          >
            Punya ide sistem?{" "}
            <em className="font-serif font-normal italic text-gold-deep">
              Ceritakan,
            </em>{" "}
            kami bantu wujudkan.
          </h2>
          <p className="mx-auto mt-4 max-w-[52ch] leading-relaxed text-muted">
            Konsultasi gratis — kirim kebutuhanmu, terima estimasi harga &
            waktu pengerjaan.
          </p>
          <div className="mt-8">
            <CTAButton href={site.wa} external>
              <WhatsAppIcon />
              {site.waLabel}
            </CTAButton>
            <p className="mt-3 text-xs text-faint">{site.waNote}</p>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

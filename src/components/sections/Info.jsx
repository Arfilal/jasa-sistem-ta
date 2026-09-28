import Image from "next/image";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import CTAButton from "@/components/ui/CTAButton";
import { ArrowRightIcon } from "@/components/ui/icons";
import { info, site } from "@/lib/content";

// Harga — satu kartu full width, ujungnya rata dengan section di atasnya:
// heading + sub, angka besar, catatan kecil + CTA. Tanpa garis pemisah.
// Gambar kuitansi (public/receipt.png) megantung di kanan bawah, menimpa tepi kartu.
export default function Info() {
  return (
    <Section
      id="informasi"
      labelledby="informasi-h"
      wide
      className="scroll-mt-36 pt-10 lg:scroll-mt-40 lg:pt-14"
    >
      <Reveal>
        <div className="relative">
          <div className="rounded-[14px] border border-line bg-[linear-gradient(135deg,var(--color-teal-soft),var(--color-surface)_60%)] px-5 py-6 text-center sm:px-7 sm:py-8 lg:px-10 lg:py-9">
            <h2
              id="informasi-h"
              className="mx-auto max-w-[26ch] text-[1.25rem] font-bold tracking-[-0.02em] text-ink sm:text-[1.5rem] lg:text-[clamp(1.5rem,2.6vw,1.9rem)]"
            >
              {info.title}
            </h2>
            <p className="mx-auto mt-2.5 max-w-[54ch] text-sm leading-relaxed text-muted sm:text-[0.95rem]">
              {info.sub}
            </p>

            <div className="mx-auto mt-5 max-w-lg sm:mt-6">
              <p className="font-display text-[1.5rem] font-extrabold leading-tight tracking-tight text-ink sm:text-[1.875rem] lg:text-[clamp(1.75rem,3.6vw,2.6rem)]">
                {info.price}
              </p>
              <p className="mx-auto mt-2.5 max-w-[46ch] text-[13px] leading-relaxed text-muted sm:mt-3 sm:text-sm">
                {info.priceNote}
              </p>
              <div className="mt-4 flex justify-center sm:mt-5">
                <CTAButton
                  href={site.wa}
                  external
                  variant="primary"
                  className="px-5 py-3 text-sm sm:px-7 sm:py-3.5 sm:text-base"
                >
                  {info.cta}
                  <ArrowRightIcon />
                </CTAButton>
              </div>
            </div>
          </div>

          <Image
            src="/receipt.png"
            alt=""
            width={552}
            height={864}
            loading="lazy"
            className="pointer-events-none absolute -bottom-14 -right-1 h-28 w-auto rotate-[-5deg] opacity-75 sm:-bottom-8 sm:-right-7 sm:h-48 sm:opacity-90 lg:-bottom-12 lg:-right-14 lg:h-72 lg:opacity-100"
          />
        </div>
      </Reveal>
    </Section>
  );
}

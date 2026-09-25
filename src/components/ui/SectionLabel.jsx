// Eyebrow netral-profesional: sentence-case + hairline emas.
// Bukan gaya kode, bukan ALL-CAPS generik.
export default function SectionLabel({ children }) {
  return (
    <p className="mb-4 flex items-center gap-3 text-[13px] font-semibold text-gold-deep">
      <span className="h-px w-6 bg-gold" aria-hidden="true" />
      {children}
    </p>
  );
}

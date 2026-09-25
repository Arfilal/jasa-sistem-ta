// CTA primer (emas, satu-satunya warna tombol) & ghost.
export default function CTAButton({
  href,
  children,
  variant = "primary",
  external = false,
  className = "",
}) {
  const base =
    "inline-flex items-center justify-center gap-2.5 rounded-[10px] px-7 py-3.5 text-base font-semibold transition-all duration-300 hover:-translate-y-px active:translate-y-0 active:scale-[0.98]";
  const styles =
    variant === "primary"
      ? "bg-gold text-ink shadow-[0_12px_32px_-12px_rgba(160,120,40,0.55)] hover:shadow-[0_16px_40px_-12px_rgba(160,120,40,0.7)]"
      : "border border-line bg-panel text-ink hover:border-gold";

  return (
    <a
      href={href}
      className={`${base} ${styles} ${className}`}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}

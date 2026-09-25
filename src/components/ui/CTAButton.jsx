// CTA primer (sinyal oranye + glow) & ghost. Glow HANYA di varian primer.
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
      ? "bg-signal text-signal-ink shadow-[0_0_36px_-10px_var(--color-signal)] hover:shadow-[0_0_48px_-8px_var(--color-signal)]"
      : "border border-line bg-panel text-ink hover:border-signal/60 hover:text-signal";

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

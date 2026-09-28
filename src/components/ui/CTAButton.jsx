// CTA primer (teal — satu-satunya warna tombol utama) & ghost.
export default function CTAButton({
  href,
  children,
  variant = "primary",
  external = false,
  className = "",
}) {
  const base =
    "inline-flex items-center justify-center gap-2.5 rounded-[10px] px-7 py-3.5 text-base font-semibold transition-colors duration-200";
  const styles =
    variant === "primary"
      ? "bg-teal-deep text-white hover:bg-ink"
      : variant === "inverse"
        ? "bg-white text-teal-deep hover:bg-ink hover:text-white"
        : "border border-line bg-surface text-ink hover:border-teal hover:text-teal-deep";

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

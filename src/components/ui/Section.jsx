// Pembungkus section: ritme vertikal + container konsisten (design.md §2.3).
export default function Section({ id, labelledby, wide = false, className = "", children }) {
  return (
    <section
      id={id}
      aria-labelledby={labelledby}
      className={`scroll-mt-24 px-6 py-24 lg:py-32 ${className}`}
    >
      <div className={`mx-auto w-full ${wide ? "max-w-7xl" : "max-w-6xl"}`}>
        {children}
      </div>
    </section>
  );
}

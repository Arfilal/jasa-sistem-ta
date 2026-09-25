// Label section gaya komentar terminal: "// karya-nyata".
// Vernacular subjek (developer brand), bukan eyebrow ALL-CAPS generik.
export default function SectionLabel({ children }) {
  return (
    <p className="mb-4 font-mono text-[13px] font-medium tracking-tight text-signal">
      {"// "}
      {children}
    </p>
  );
}

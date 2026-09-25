// Fallback statis radar: dipakai saat WebGL gagal, pointer kasar (mobile),
// atau prefers-reduced-motion. SVG inline ±2KB, tanpa JS.

// ponytail: duplikasi visual yg disengaja — fallback harus mandiri tanpa three.
export default function RadarFallback() {
  return (
    <svg
      viewBox="0 0 400 400"
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="rf-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ff5c1c" stopOpacity="0.22" />
          <stop offset="60%" stopColor="#ff5c1c" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#ff5c1c" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="rf-sweep" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ff5c1c" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#ff5c1c" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="400" height="400" fill="url(#rf-glow)" />
      {[150, 115, 80, 45].map((r) => (
        <circle
          key={r}
          cx="200"
          cy="200"
          r={r}
          fill="none"
          stroke="#1d2532"
          strokeWidth="1.5"
        />
      ))}
      <path d="M200 200 L330 120 A150 150 0 0 0 200 50 Z" fill="url(#rf-sweep)" />
      <line x1="200" y1="50" x2="200" y2="350" stroke="#1d2532" strokeWidth="1" />
      <line x1="50" y1="200" x2="350" y2="200" stroke="#1d2532" strokeWidth="1" />
      <circle cx="200" cy="200" r="26" fill="none" stroke="#ff5c1c" strokeWidth="1.5" opacity="0.7" />
      <rect
        x="193"
        y="183"
        width="14"
        height="14"
        transform="rotate(45 200 190)"
        fill="#ff5c1c"
      />
      <circle cx="285" cy="150" r="5" fill="#e9eef5" />
      <circle cx="120" cy="250" r="5" fill="#ff5c1c" />
      <circle cx="240" cy="280" r="4" fill="#e9eef5" opacity="0.7" />
    </svg>
  );
}

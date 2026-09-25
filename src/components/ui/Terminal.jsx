// Bingkai jendela terminal. Isi (kode) di-render oleh pemanggil.
export default function Terminal({ title = "status.js", children, className = "" }) {
  return (
    <div
      className={`overflow-hidden rounded-xl border border-line bg-panel text-left shadow-[0_24px_80px_-24px_rgba(0,0,0,0.8)] ${className}`}
    >
      <div className="flex items-center border-b border-line bg-panel-2 px-4 py-3">
        <div className="flex space-x-2" aria-hidden="true">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        </div>
        <span className="ml-4 font-mono text-xs text-muted">{title}</span>
      </div>
      <div className="overflow-x-auto p-6 font-mono text-sm leading-relaxed md:text-[15px]">
        {children}
      </div>
    </div>
  );
}

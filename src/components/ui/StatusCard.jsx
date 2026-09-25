import { CheckIcon } from "@/components/ui/icons";
import { status } from "@/lib/content";

// Pengganti terminal v1.0: info identik (badge + 4 layanan + garansi),
// disajikan sebagai kartu elegan. Bukan blok kode.
export default function StatusCard({ className = "" }) {
  return (
    <div
      className={`rounded-[14px] border border-line bg-panel p-7 shadow-[0_24px_60px_-32px_rgba(26,29,33,0.25)] lg:p-8 ${className}`}
    >
      <p className="inline-flex items-center gap-2.5 rounded-full border border-line bg-panel-2 px-4 py-2 text-sm font-semibold text-ink">
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ok opacity-60" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-ok" />
        </span>
        {status.badge}
      </p>
      <ul className="mt-6 grid gap-x-8 gap-y-3.5 sm:grid-cols-2">
        {status.services.map((s) => (
          <li key={s} className="flex items-start gap-3 text-[15px] text-ink">
            <CheckIcon className="mt-1 h-4 w-4 shrink-0 text-gold-deep" />
            {s}
          </li>
        ))}
      </ul>
      <p className="mt-6 border-t border-line pt-5 text-sm text-muted">
        <span className="font-semibold text-gold-deep">Garansi revisi</span>
        {" · 100% bebas bug"}
      </p>
    </div>
  );
}

import { InstagramIcon, TikTokIcon } from "@/components/ui/icons";
import { site } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-panel px-6 py-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-5 md:flex-row">
        <p className="text-[13px] text-faint">{site.copyright}</p>
        <div className="flex items-center gap-7">
          <a
            href={site.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink"
          >
            <InstagramIcon />
            Instagram
          </a>
          <a
            href={site.tiktok}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink"
          >
            <TikTokIcon />
            TikTok
          </a>
        </div>
      </div>
    </footer>
  );
}

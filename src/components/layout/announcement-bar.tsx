import Link from "next/link";
import { siteConfig } from "@data/site-config";
import { ArrowUpRightIcon } from "@/components/ui/icons";

export function AnnouncementBar() {
  return (
    <div className="bg-lilac">
      <div className="shell flex h-8 items-center justify-center">
        <Link
          href={siteConfig.announcement.href}
          className="group inline-flex items-center gap-1.5 text-[12px] leading-none text-ink/85 transition-colors hover:text-ink"
        >
          <span>{siteConfig.announcement.text}</span>
          <ArrowUpRightIcon
            width={11}
            height={11}
            className="opacity-0 transition-opacity group-hover:opacity-100"
          />
        </Link>
      </div>
    </div>
  );
}

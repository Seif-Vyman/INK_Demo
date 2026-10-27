import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@data/site-config";
import { cn } from "@/lib/utils";

const sizes = {
  sm: "text-[20px]",
  md: "text-[24px] md:text-[28px]",
  header: "text-[29px] md:text-[34px]",
  lg: "text-[48px] md:text-[64px]",
};

export function Logo({
  className,
  size = "header",
  asLink = true,
}: {
  className?: string;
  size?: keyof typeof sizes;
  asLink?: boolean;
}) {
  const content = siteConfig.logo.image ? (
    <Image
      src={siteConfig.logo.image}
      alt={siteConfig.logo.alt}
      width={220}
      height={48}
      className="h-auto w-[140px]"
      priority
    />
  ) : (
    <span className="font-bold leading-none tracking-[-0.02em]">
      {siteConfig.logo.text}
    </span>
  );

  const classes = cn("inline-flex items-baseline", sizes[size], className);

  if (!asLink) return <span className={classes}>{content}</span>;

  return (
    <Link href="/" aria-label={`${siteConfig.name} — home`} className={classes}>
      {content}
    </Link>
  );
}

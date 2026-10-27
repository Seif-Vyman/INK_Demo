import Link from "next/link";
import { ArrowUpRightIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  link,
  className,
  titleClassName,
  align = "end",
  id,
}: {
  eyebrow: string;
  title: React.ReactNode;
  link?: { label: string; href: string };
  className?: string;
  titleClassName?: string;
  align?: "end" | "baseline";
  id?: string;
}) {
  return (
    <div className={cn("relative", className)}>
      <p className="eyebrow text-ink/55">{eyebrow}</p>
      <div
        className={cn(
          "mt-3 md:mt-4",
          link ? "relative" : null,
          link && "md:flex md:justify-between md:gap-6",
          link && align === "end" ? "md:items-end" : "md:items-baseline",
        )}
      >
        <h2
          id={id}
          className={cn(
            "text-[34px] font-semibold leading-[1.05] tracking-[-0.03em] md:text-[3rem] md:leading-[1.06] md:tracking-[-0.02em]",
            link ? "max-w-[260px] md:max-w-none" : null,
            titleClassName,
          )}
        >
          {title}
        </h2>
        {link ? (
          <Link
            href={link.href}
            className="absolute bottom-0 right-0 inline-flex shrink-0 items-center gap-1.5 text-[12px] text-ink/85 transition-colors hover:text-ink md:static md:mb-1 md:text-[13px]"
          >
            {link.label}
            <ArrowUpRightIcon width={12} height={12} />
          </Link>
        ) : null}
      </div>
    </div>
  );
}

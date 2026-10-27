import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@data/site-config";
import { ArrowUpRightIcon } from "@/components/ui/icons";

export function BrandStory() {
  const { brand } = siteConfig.sections;

  return (
    <section
      aria-labelledby="brand-story-heading"
      className="shell grid gap-[34px] py-12 md:pb-20 md:pt-20 lg:grid-cols-[minmax(0,640px)_minmax(0,1fr)] lg:gap-[72px]"
    >
      <div className="relative aspect-[350/370] overflow-hidden rounded-xl bg-line/50 md:aspect-[640/541]">
        <Image
          src={brand.imageMobile}
          alt={brand.imageAlt}
          fill
          sizes="100vw"
          className="object-cover md:hidden"
        />
        <Image
          src={brand.image}
          alt={brand.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, 640px"
          className="hidden object-cover md:block"
        />
      </div>

      <div className="lg:pt-[19px]">
        <p className="eyebrow text-ink/55">{brand.eyebrow}</p>

        <h2
          id="brand-story-heading"
          className="mt-3 text-[36px] font-semibold leading-[1.06] tracking-[-0.035em] md:mt-4 md:text-[48px] md:leading-[53px] md:tracking-[-0.02em]"
        >
          {brand.title.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h2>

        <p className="mt-3 max-w-[600px] text-small leading-[1.65] text-ink/70 md:mt-[10px] md:max-w-[520px] md:text-body md:leading-[26px]">
          {brand.description}
        </p>

        <ol className="mt-8 divide-y divide-ink/15 border-t border-ink/15 md:mt-[39px]">
          {brand.points.map((point, index) => (
            <li
              key={point.title}
              className="grid grid-cols-[34px_1fr] gap-x-2 py-3.5 md:grid-cols-[39px_1fr] md:py-[13px]"
            >
              <span className="text-[12px] text-ink/45">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-[17px] font-medium leading-tight md:text-[20px] md:leading-[1.2]">
                  {point.title}
                </h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-ink/60 md:mt-[10px] md:text-[14px] md:leading-[19px]">
                  {point.description}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <Link
          href={brand.linkHref}
          className="mt-6 inline-flex items-center gap-1.5 text-[13px] text-ink/85 underline underline-offset-4 transition-colors hover:text-ink md:mt-[13px]"
        >
          {brand.linkLabel}
          <ArrowUpRightIcon width={11} height={11} />
        </Link>
      </div>
    </section>
  );
}

import Image from "next/image";
import Link from "next/link";
import type { Product } from "@data/products";
import { siteConfig, type Category } from "@data/site-config";
import { ArrowUpRightIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

const themes = {
  sky: "bg-sky",
  sage: "bg-sage",
} as const;

export function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      href={`/shop/${category.slug}`}
      className={cn(
        "group flex flex-col rounded-2xl p-4 transition-transform duration-300 md:p-6",
        themes[category.theme ?? "sky"],
      )}
    >
      <div className="relative aspect-[318/196] overflow-hidden rounded-lg bg-cream/40 md:aspect-[592/280]">
        <Image
          src={category.image}
          alt={category.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, 592px"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        />
      </div>

      <div className="mt-3 flex items-start justify-between gap-4 md:mt-8">
        <div>
          <h3 className="text-[25px] font-semibold leading-tight tracking-[-0.02em] md:text-[32px]">
            {category.name}
          </h3>
          <p className="mt-1 text-[12px] text-ink/60 md:mt-2 md:text-small">
            {category.description}
          </p>
        </div>
        <span className="mt-1.5 grid size-7 shrink-0 place-items-center md:mt-2.5">
          <ArrowUpRightIcon width={17} height={17} />
        </span>
      </div>
    </Link>
  );
}

export function CategoryCards() {
  return (
    <section aria-labelledby="categories-heading" className="shell pb-[52px] pt-[54px] md:pb-[81px] md:pt-[80px]">
      <p className="eyebrow text-ink/55">
        {siteConfig.sections.categories.eyebrow}
      </p>
      <h2
        id="categories-heading"
        className="mt-3 text-[34px] font-semibold leading-[1.05] tracking-[-0.03em] md:mt-4 md:text-[48px] md:leading-[1.06] md:tracking-[-0.02em]"
      >
        {siteConfig.sections.categories.title}
      </h2>

      <div className="mt-6 grid gap-5 md:mt-[30px] md:grid-cols-2 md:gap-8">
        {siteConfig.categories.map((category) => (
          <CategoryCard key={category.slug} category={category} />
        ))}
      </div>
    </section>
  );
}

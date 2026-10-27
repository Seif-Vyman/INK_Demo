import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@data/site-config";
import { ButtonLink } from "@/components/ui/button";
import { ArrowUpRightIcon } from "@/components/ui/icons";
import { getProduct } from "@/lib/products";
import { formatPrice } from "@/lib/utils";

export function Hero() {
  const { hero } = siteConfig;
  const product = getProduct(hero.productSlug);
  const mainImage = product?.colors[0]?.images[0] ?? hero.image;

  return (
    <section aria-labelledby="hero-heading" className="shell">
      <div className="rounded-2xl bg-lilac px-5 pb-[25px] pt-5 md:px-10 md:pb-8 md:pt-10">
        <div className="grid items-start gap-[28px] lg:grid-cols-[minmax(0,1fr)_minmax(0,656px)] lg:gap-10">
          <div className="flex flex-col md:pt-11">
            <p className="eyebrow text-[9px] text-ink/80 md:text-[10px]">
              {hero.eyebrow}
            </p>

            <h1
              id="hero-heading"
              className="mt-6 text-[52px] font-semibold leading-[47px] md:mt-8 tracking-[-0.045em] md:text-[64px] md:leading-[58px] lg:text-[86px] lg:leading-[78px]"
            >
              {hero.headline.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h1>

            <p className="mt-[21px] max-w-[330px] text-small leading-[23px] text-ink/75 md:mt-8 md:text-body md:leading-[1.65]">
              {hero.description}
            </p>

            <ButtonLink
              href={hero.cta.href}
              size="lg"
              className="mt-[18px] h-[54px] w-full text-[16px] md:mt-[26px] md:w-auto md:self-start md:text-[16px]"
            >
              {hero.cta.label}
              <ArrowUpRightIcon />
            </ButtonLink>
          </div>

          <div>
            <Link
              href={product ? `/product/${product.slug}` : hero.cta.href}
              className="group relative block aspect-[310/252] overflow-hidden rounded-xl bg-tan md:aspect-[656/472]"
            >
              <Image
                src={mainImage}
                alt={hero.imageAlt}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 656px"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.015]"
              />
            </Link>

            <div className="mt-[12px] flex items-center justify-between gap-4 md:mt-4">
              <div>
                <Link
                  href={product ? `/product/${product.slug}` : hero.cta.href}
                  className="text-[15px] font-semibold leading-tight hover:underline md:text-lg"
                >
                  {product?.name ?? "Wave Laptop Sleeve"}
                </Link>
                <p className="mt-1 text-[13px] text-ink/65 md:text-[13px]">
                  {product
                    ? `${product.colors[0].name} · ${formatPrice(product.price)}`
                    : hero.eyebrow}
                </p>
              </div>

              <Link
                href={product ? `/product/${product.slug}` : hero.cta.href}
                aria-label={
                  product ? `View ${product.name}` : `View ${hero.cta.label}`
                }
                className="grid size-9 shrink-0 place-items-center rounded-full border border-ink/40 transition-colors hover:bg-ink hover:text-cream md:size-10"
              >
                <ArrowUpRightIcon width={15} height={15} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

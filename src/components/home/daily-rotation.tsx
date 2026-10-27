import { siteConfig } from "@data/site-config";
import { getFeaturedProducts } from "@/lib/products";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProductCard } from "@/components/product/product-card";

export function DailyRotation() {
  const { bestsellers } = siteConfig.sections;
  const products = getFeaturedProducts(bestsellers.limit);

  return (
    <section aria-labelledby="bestsellers-heading" className="shell pb-10 md:pb-[73px]">
      <SectionHeading
        id="bestsellers-heading"
        eyebrow={bestsellers.eyebrow}
        title={bestsellers.title}
        link={{ label: bestsellers.linkLabel, href: bestsellers.linkHref }}
      />

      <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-[18px] md:mt-9 md:grid-cols-4 md:gap-x-4 md:gap-y-10 lg:gap-x-4">
        {products.map((product, index) => (
          <ProductCard
            key={product.slug}
            product={product}
            priority={index < 2}
          />
        ))}
      </div>
    </section>
  );
}

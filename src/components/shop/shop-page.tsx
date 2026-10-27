"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getAllProducts, getCategory, getCatalogColors, getProductsByCategory } from "@/lib/products";
import { ProductCard } from "@/components/product/product-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
] as const;

type SortValue = (typeof sortOptions)[number]["value"];

function ShopPageInner({ category }: { category?: string }) {
  const searchParams = useSearchParams();
  const cat = category ? getCategory(category) : undefined;
  const baseProducts = category ? getProductsByCategory(category) : getAllProducts();

  const colorFilter = searchParams.get("color");
  const tagFilter = searchParams.get("tag");

  const [sort, setSort] = useState<SortValue>("featured");
  const [activeColor, setActiveColor] = useState<string | null>(colorFilter);
  const [activeTag, setActiveTag] = useState<string | null>(tagFilter);

  const colors = getCatalogColors();
  const tags = Array.from(new Set(baseProducts.flatMap((p) => p.tags))).sort();

  const filtered = useMemo(() => {
    let items = [...baseProducts];
    if (activeColor) {
      items = items.filter((p) => p.colors.some((c) => c.slug === activeColor));
    }
    if (activeTag) {
      items = items.filter((p) => p.tags.includes(activeTag));
    }
    if (sort === "newest") {
      items.sort((a, b) => (b.releasedAt ?? "").localeCompare(a.releasedAt ?? ""));
    } else if (sort === "price-asc") {
      items.sort((a, b) => a.price - b.price);
    } else if (sort === "price-desc") {
      items.sort((a, b) => b.price - a.price);
    } else {
      items.sort((a, b) => (a.sortOrder ?? 99) - (b.sortOrder ?? 99));
    }
    return items;
  }, [baseProducts, activeColor, activeTag, sort]);

  const title = cat ? cat.name : "Shop all";
  const description = cat ? cat.description : "Laptop sleeves and little bags with a lot of personality.";

  return (
    <div className="pb-16 md:pb-24">
      <section className="shell pt-10 md:pt-14">
        <SectionHeading eyebrow={cat ? "Category" : "All products"} title={title} />
        <p className="mt-3 max-w-xl text-small text-muted md:text-body">{description}</p>

        <div className="mt-8 flex flex-col gap-4 md:flex-row md:flex-wrap md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => {
                setActiveColor(null);
                setActiveTag(null);
              }}
              className={cn(
                "rounded-full px-3 py-1.5 text-micro transition-colors",
                !activeColor && !activeTag ? "bg-ink text-cream" : "border border-ink/15 hover:bg-ink/5",
              )}
            >
              All
            </button>
            {colors.map((color) => (
              <button
                key={color.slug}
                onClick={() => setActiveColor((prev) => (prev === color.slug ? null : color.slug))}
                className={cn(
                  "flex items-center gap-2 rounded-full px-3 py-1.5 text-micro transition-colors",
                  activeColor === color.slug ? "bg-ink text-cream" : "border border-ink/15 hover:bg-ink/5",
                )}
              >
                <span className="size-2.5 rounded-full" style={{ backgroundColor: color.hex }} />
                {color.name}
              </button>
            ))}
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag((prev) => (prev === tag ? null : tag))}
                className={cn(
                  "rounded-full px-3 py-1.5 text-micro capitalize transition-colors",
                  activeTag === tag ? "bg-ink text-cream" : "border border-ink/15 hover:bg-ink/5",
                )}
              >
                {tag}
              </button>
            ))}
          </div>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortValue)}
            className="h-9 rounded-full border border-ink/15 px-3 text-micro"
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-[18px] md:mt-10 md:grid-cols-4 md:gap-x-4 md:gap-y-10">
          {filtered.map((product, index) => (
            <ProductCard key={product.slug} product={product} priority={index < 4} />
          ))}
        </div>
        {filtered.length === 0 ? (
          <p className="mt-10 text-center text-small text-muted">No products match these filters.</p>
        ) : null}
      </section>
    </div>
  );
}

export function ShopPage({ category }: { category?: string }) {
  return (
    <Suspense fallback={<div className="shell py-16 text-center text-small text-muted">Loading...</div>}>
      <ShopPageInner category={category} />
    </Suspense>
  );
}

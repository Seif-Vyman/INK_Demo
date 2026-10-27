"use client";

import Image from "next/image";
import { useState } from "react";
import type { Product } from "@data/products";
import { useCartStore } from "@/lib/store/cart";
import { useUiStore } from "@/lib/store/ui";
import { useToastStore } from "@/lib/store/toast";
import { useWishlistStore } from "@/lib/store/wishlist";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProductCard } from "@/components/product/product-card";
import { getRelatedProducts } from "@/lib/products";
import { HeartIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

export function ProductPage({ product }: { product: Product }) {
  const [colorIndex, setColorIndex] = useState(0);
  const [size, setSize] = useState(product.sizes[0]);
  const [qty, setQty] = useState(1);
  const color = product.colors[colorIndex];
  const images = color.images;

  const add = useCartStore((state) => state.add);
  const openCart = useUiStore((state) => state.openCart);
  const pushToast = useToastStore((state) => state.push);
  const toggleWishlist = useWishlistStore((state) => state.toggle);
  const isWishlisted = useWishlistStore((state) => state.slugs.includes(product.slug));

  const related = getRelatedProducts(product, 3);

  const addToBag = () => {
    add({ slug: product.slug, color: color.slug, size, qty });
    pushToast(`${product.name} added to your bag`, "success");
    openCart();
  };

  const toggleWish = () => {
    const added = toggleWishlist(product.slug);
    pushToast(added ? `${product.name} saved to wishlist` : `${product.name} removed from wishlist`, added ? "success" : "default");
  };

  return (
    <div className="pb-16 md:pb-24">
      <section className="shell pt-6 md:pt-10">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="grid gap-3">
            <div className="relative aspect-square overflow-hidden rounded-xl bg-line/50 md:aspect-[4/3] lg:aspect-square">
              <Image
                src={images[0]}
                alt={`${product.name} in ${color.name}`}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>
            {images.length > 1 ? (
              <div className="grid grid-cols-2 gap-3">
                {images.slice(1, 3).map((img) => (
                  <div key={img} className="relative aspect-[4/3] overflow-hidden rounded-xl bg-line/50">
                    <Image src={img} alt="" fill sizes="50vw" className="object-cover" />
                  </div>
                ))}
              </div>
            ) : null}
          </div>

          <div className="lg:pt-4">
            <p className="eyebrow text-muted">{product.category.replace("-", " ")}</p>
            <h1 className="mt-2 text-h2 font-semibold">{product.name}</h1>
            <p className="mt-3 text-lead">{formatPrice(product.price)}</p>
            <p className="mt-4 text-small text-muted">{product.description}</p>

            <div className="mt-8">
              <p className="text-micro uppercase tracking-[0.08em] text-muted">Color</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {product.colors.map((c, idx) => (
                  <button
                    key={c.slug}
                    onClick={() => setColorIndex(idx)}
                    className={cn(
                      "flex items-center gap-2 rounded-full px-3 py-1.5 text-micro",
                      colorIndex === idx ? "bg-ink text-cream" : "border border-ink/15",
                    )}
                  >
                    <span className="size-2.5 rounded-full" style={{ backgroundColor: c.hex }} />
                    {c.name}
                  </button>
                ))}
              </div>
            </div>

            {product.sizes.length > 1 ? (
              <div className="mt-6">
                <p className="text-micro uppercase tracking-[0.08em] text-muted">Size</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSize(s)}
                      className={cn(
                        "rounded-full px-3 py-1.5 text-micro",
                        size === s ? "bg-ink text-cream" : "border border-ink/15",
                      )}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <div className="flex h-12 items-center rounded-full border border-ink/15">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="grid size-12 place-items-center"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="w-8 text-center text-small">{qty}</span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="grid size-12 place-items-center"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
              <Button onClick={addToBag} size="lg" className="flex-1 sm:flex-1">
                Add to bag · {formatPrice(product.price * qty)}
              </Button>
              <button
                onClick={toggleWish}
                aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                className="grid size-12 place-items-center rounded-full border border-ink/15 transition-colors hover:bg-ink/5"
              >
                <HeartIcon filled={isWishlisted} />
              </button>
            </div>

            <div className="mt-10 space-y-6">
              <div>
                <p className="text-small font-medium">Details</p>
                <ul className="mt-2 space-y-1 text-small text-muted">
                  {product.details.map((d) => (
                    <li key={d}>• {d}</li>
                  ))}
                </ul>
              </div>
              {product.specs ? (
                <div>
                  <p className="text-small font-medium">Specs</p>
                  <dl className="mt-2 space-y-1">
                    {product.specs.map((spec) => (
                      <div key={spec.label} className="flex gap-4 text-small">
                        <dt className="w-24 text-muted">{spec.label}</dt>
                        <dd>{spec.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 ? (
        <section className="shell mt-16 md:mt-24">
          <SectionHeading eyebrow="You might also like" title="Related products" />
          <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-[18px] md:mt-9 md:grid-cols-3 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}

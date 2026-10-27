"use client";

import Image from "next/image";
import Link from "next/link";
import { getProduct } from "@/lib/products";
import { useWishlistStore } from "@/lib/store/wishlist";
import { useCartStore } from "@/lib/store/cart";
import { useUiStore } from "@/lib/store/ui";
import { useToastStore } from "@/lib/store/toast";
import { formatPrice } from "@/lib/utils";
import { Button, ButtonLink } from "@/components/ui/button";
import { useHydrated } from "@/lib/use-hydrated";

export function WishlistPageClient() {
  const hydrated = useHydrated();
  const slugs = useWishlistStore((state) => state.slugs);
  const toggle = useWishlistStore((state) => state.toggle);
  const add = useCartStore((state) => state.add);
  const openCart = useUiStore((state) => state.openCart);
  const pushToast = useToastStore((state) => state.push);

  if (!hydrated) {
    return <div className="shell py-16 text-center text-small text-muted">Loading wishlist...</div>;
  }

  const products = slugs.map((s) => getProduct(s)).filter(Boolean) as NonNullable<ReturnType<typeof getProduct>>[];

  if (products.length === 0) {
    return (
      <div className="shell flex min-h-[60vh] flex-col items-center justify-center text-center">
        <h1 className="text-h2 font-semibold">Your wishlist is empty</h1>
        <p className="mt-2 text-small text-muted">Save items you love to find them later.</p>
        <ButtonLink href="/shop" className="mt-6">
          Shop all
        </ButtonLink>
      </div>
    );
  }

  return (
    <div className="pb-16 md:pb-24">
      <section className="shell pt-10 md:pt-14">
        <h1 className="text-h2 font-semibold">Wishlist</h1>
        <p className="mt-2 text-small text-muted">{products.length} saved</p>

        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-[18px] md:grid-cols-4 md:gap-y-10">
          {products.map((product) => {
            const color = product.colors[0];
            const image = color.images[0];
            const moveToBag = () => {
              add({ slug: product.slug, color: color.slug, size: product.sizes[0] });
              toggle(product.slug);
              pushToast(`${product.name} moved to your bag`, "success");
              openCart();
            };
            return (
              <article key={product.slug} className="group flex flex-col">
                <Link href={`/product/${product.slug}`} className="relative block aspect-[316/288] overflow-hidden rounded-xl bg-line/50">
                  <Image src={image} alt={product.name} fill sizes="(max-width: 768px) 50vw, 316px" className="object-cover" />
                </Link>
                <h3 className="mt-3 text-[14px] font-medium md:mt-4 md:text-lg">
                  <Link href={`/product/${product.slug}`} className="hover:underline">
                    {product.name}
                  </Link>
                </h3>
                <p className="mt-1.5 text-[11px] text-muted md:text-[13px]">{product.shortDescription}</p>
                <p className="mt-2 text-[13px] md:text-small">{formatPrice(product.price)}</p>
                <div className="mt-3 flex gap-2">
                  <Button onClick={moveToBag} size="sm" className="flex-1">
                    Move to bag
                  </Button>
                  <Button onClick={() => toggle(product.slug)} variant="outline" size="sm">
                    Remove
                  </Button>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}

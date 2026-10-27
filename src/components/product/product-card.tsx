"use client";

import Image from "next/image";
import Link from "next/link";
import type { Product } from "@data/products";
import { useCartStore } from "@/lib/store/cart";
import { useUiStore } from "@/lib/store/ui";
import { useToastStore } from "@/lib/store/toast";
import { formatPrice } from "@/lib/utils";
import { PlusIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

export function ProductCard({
  product,
  priority = false,
  className,
}: {
  product: Product;
  priority?: boolean;
  className?: string;
}) {
  const add = useCartStore((state) => state.add);
  const openCart = useUiStore((state) => state.openCart);
  const pushToast = useToastStore((state) => state.push);
  const color = product.colors[0];
  const image = color.images[0];

  const quickAdd = () => {
    add({
      slug: product.slug,
      color: color.slug,
      size: product.sizes[0],
    });
    pushToast(`${product.name} added to your bag`, "success");
    openCart();
  };

  return (
    <article className={cn("group flex flex-col", className)}>
      <Link
        href={`/product/${product.slug}`}
        className="relative block aspect-[316/288] overflow-hidden rounded-xl bg-line/50"
      >
        <Image
          src={image}
          alt={`${product.name} in ${color.name}`}
          fill
          priority={priority}
          sizes="(max-width: 768px) 50vw, 316px"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        />
        {product.compareAtPrice ? (
          <span className="absolute left-3 top-3 rounded-full bg-cream px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.08em]">
            Sale
          </span>
        ) : null}
      </Link>

      <h3 className="mt-3 text-[14px] font-medium leading-tight tracking-[-0.01em] md:mt-4 md:text-lg">
        <Link href={`/product/${product.slug}`} className="hover:underline">
          {product.name}
        </Link>
      </h3>
      <p className="mt-1.5 text-[11px] leading-[1.4] text-muted md:text-[13px]">
        {product.shortDescription}
      </p>

      <div className="mt-3 flex items-center justify-between gap-3">
        <p className="text-[13px] md:text-small">
          {product.compareAtPrice ? (
            <>
              <span className="text-muted line-through">
                {formatPrice(product.compareAtPrice)}
              </span>{" "}
              {formatPrice(product.price)}
            </>
          ) : (
            formatPrice(product.price)
          )}
        </p>
        <button
          type="button"
          onClick={quickAdd}
          aria-label={`Add ${product.name} to bag`}
          className="grid size-8 shrink-0 place-items-center rounded-full border border-ink/25 transition-colors hover:border-ink hover:bg-ink hover:text-cream"
        >
          <PlusIcon width={13} height={13} />
        </button>
      </div>
    </article>
  );
}

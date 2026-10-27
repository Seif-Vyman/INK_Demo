"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { siteConfig } from "@data/site-config";
import { buildCartItems, cartSubtotal } from "@/lib/cart";
import { useCartStore } from "@/lib/store/cart";
import { formatPrice } from "@/lib/utils";
import { Button, ButtonLink } from "@/components/ui/button";
import { useHydrated } from "@/lib/use-hydrated";

export function CartPageClient() {
  const hydrated = useHydrated();
  const lines = useCartStore((state) => state.lines);
  const setQty = useCartStore((state) => state.setQty);
  const remove = useCartStore((state) => state.remove);

  const items = useMemo(() => buildCartItems(lines), [lines]);
  const subtotal = cartSubtotal(items);
  const remaining = Math.max(0, siteConfig.checkout.freeShippingThreshold - subtotal);

  if (!hydrated) {
    return (
      <div className="shell py-16 text-center text-small text-muted">Loading bag...</div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="shell flex min-h-[60vh] flex-col items-center justify-center text-center">
        <h1 className="text-h2 font-semibold">Your bag is empty</h1>
        <p className="mt-2 text-small text-muted">Start with something you&apos;ll actually use.</p>
        <ButtonLink href="/shop" className="mt-6">
          Shop all
        </ButtonLink>
      </div>
    );
  }

  return (
    <div className="pb-16 md:pb-24">
      <section className="shell pt-10 md:pt-14">
        <div className="flex items-end justify-between">
          <h1 className="text-h2 font-semibold">Your bag</h1>
          <p className="text-small text-muted">
            {items.reduce((t, i) => t + i.line.qty, 0)} items
          </p>
        </div>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_380px]">
          <ul className="divide-y divide-line">
            {items.map((item) => (
              <li key={item.line.key} className="flex gap-4 py-6">
                <Link href={`/product/${item.product.slug}`} className="relative size-24 overflow-hidden rounded-media bg-tan md:size-32">
                  <Image src={item.image} alt={item.product.name} fill sizes="128px" className="object-cover" />
                </Link>
                <div className="flex flex-1 flex-col">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <Link href={`/product/${item.product.slug}`} className="text-small font-medium hover:underline">
                        {item.product.name}
                      </Link>
                      <p className="mt-1 text-micro text-muted">
                        {item.color.name} · {item.line.size}
                      </p>
                    </div>
                    <p className="text-small">{formatPrice(item.lineTotal)}</p>
                  </div>
                  <div className="mt-auto flex items-center justify-between pt-4">
                    <div className="flex h-9 items-center rounded-full border border-ink/15">
                      <button onClick={() => setQty(item.line.key, item.line.qty - 1)} className="grid size-9 place-items-center" aria-label="Decrease">-</button>
                      <span className="w-6 text-center text-micro">{item.line.qty}</span>
                      <button onClick={() => setQty(item.line.key, item.line.qty + 1)} className="grid size-9 place-items-center" aria-label="Increase">+</button>
                    </div>
                    <button onClick={() => remove(item.line.key)} className="text-micro text-muted hover:text-ink">
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="h-fit rounded-xl border border-line p-6">
            <p className="text-small font-medium">Order summary</p>
            <div className="mt-4 space-y-2 text-small">
              <div className="flex justify-between">
                <span className="text-muted">Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Shipping</span>
                <span>{remaining === 0 ? "Free" : formatPrice(siteConfig.checkout.shippingFlatRate)}</span>
              </div>
              <div className="flex justify-between border-t border-line pt-3 font-medium">
                <span>Estimated total</span>
                <span>{formatPrice(subtotal + (remaining === 0 ? 0 : siteConfig.checkout.shippingFlatRate))}</span>
              </div>
            </div>
            {remaining > 0 ? (
              <p className="mt-3 text-micro text-muted">Add {formatPrice(remaining)} for free shipping.</p>
            ) : (
              <p className="mt-3 text-micro text-muted">Free shipping unlocked.</p>
            )}
            <ButtonLink href="/checkout" className="mt-6 w-full">
              Proceed to checkout
            </ButtonLink>
            <ButtonLink href="/shop" variant="outline" className="mt-2 w-full">
              Continue shopping
            </ButtonLink>
          </div>
        </div>
      </section>
    </div>
  );
}

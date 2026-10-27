"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo } from "react";
import { siteConfig } from "@data/site-config";
import { buildCartItems, cartSubtotal } from "@/lib/cart";
import { useCartStore } from "@/lib/store/cart";
import { useUiStore } from "@/lib/store/ui";
import { formatPrice } from "@/lib/utils";
import { Button, ButtonLink } from "@/components/ui/button";
import { CloseIcon, MinusIcon, PlusIcon, TrashIcon } from "@/components/ui/icons";
import { useHydrated } from "@/lib/use-hydrated";

export function CartDrawer() {
  const hydrated = useHydrated();
  const isOpen = useUiStore((state) => state.cartOpen);
  const closeCart = useUiStore((state) => state.closeCart);
  const lines = useCartStore((state) => state.lines);
  const setQty = useCartStore((state) => state.setQty);
  const remove = useCartStore((state) => state.remove);

  const items = useMemo(() => buildCartItems(lines), [lines]);
  const subtotal = cartSubtotal(items);
  const itemCount = items.reduce((total, item) => total + item.line.qty, 0);
  const remaining = Math.max(
    0,
    siteConfig.checkout.freeShippingThreshold - subtotal,
  );
  const progress = Math.min(
    100,
    (subtotal / siteConfig.checkout.freeShippingThreshold) * 100,
  );

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeCart();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, closeCart]);

  return (
    <div
      aria-hidden={!isOpen}
      className={
        isOpen
          ? "fixed inset-0 z-[70]"
          : "pointer-events-none fixed inset-0 z-[70]"
      }
    >
      <button
        type="button"
        aria-label="Close bag"
        onClick={closeCart}
        className={`absolute inset-0 bg-ink/25 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        tabIndex={isOpen ? 0 : -1}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Shopping bag"
        className={`absolute right-0 top-0 flex h-full w-full max-w-[440px] flex-col bg-cream shadow-[-24px_0_60px_rgba(32,40,35,0.12)] transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <header className="flex items-center justify-between border-b border-line px-6 py-5">
          <div>
            <p className="eyebrow text-muted">Your bag</p>
            <p className="mt-1 text-h3 font-semibold">
              {hydrated ? `${itemCount} item${itemCount === 1 ? "" : "s"}` : "—"}
            </p>
          </div>
          <button
            type="button"
            onClick={closeCart}
            className="grid size-10 place-items-center rounded-full border border-ink/15 transition-colors hover:bg-ink/5"
            aria-label="Close bag"
          >
            <CloseIcon />
          </button>
        </header>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-5 px-8 text-center">
            <span className="grid size-16 place-items-center rounded-full bg-sky text-ink">
              <svg
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                aria-hidden
              >
                <path d="M4.5 7.5h15l-1 12.5h-13z" />
                <path d="M8.5 7.5V6a3.5 3.5 0 0 1 7 0v1.5" />
              </svg>
            </span>
            <div>
              <p className="text-h3 font-semibold">Your bag is empty</p>
              <p className="mt-2 text-small text-muted">
                A little color for the things you carry — start with a
                bestseller.
              </p>
            </div>
            <ButtonLink href="/shop" onClick={closeCart} size="md">
              Shop all
            </ButtonLink>
          </div>
        ) : (
          <>
            <div className="border-b border-line px-6 py-4">
              <p className="text-micro text-muted">
                {remaining > 0 ? (
                  <>
                    You&apos;re {formatPrice(remaining)} away from free shipping
                  </>
                ) : (
                  <>Free shipping unlocked. Nice one.</>
                )}
              </p>
              <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-ink/10">
                <div
                  className="h-full rounded-full bg-lime transition-[width] duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <ul className="flex-1 divide-y divide-line overflow-y-auto px-6">
              {items.map((item) => (
                <li key={item.line.key} className="flex gap-4 py-5">
                  <Link
                    href={`/product/${item.product.slug}`}
                    onClick={closeCart}
                    className="relative size-[88px] shrink-0 overflow-hidden rounded-media bg-tan"
                  >
                    <Image
                      src={item.image}
                      alt={item.product.name}
                      fill
                      sizes="88px"
                      className="object-cover"
                    />
                  </Link>
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <Link
                          href={`/product/${item.product.slug}`}
                          onClick={closeCart}
                          className="text-small font-medium hover:underline"
                        >
                          {item.product.name}
                        </Link>
                        <p className="mt-1 text-micro text-muted">
                          {item.color.name} · {item.line.size}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => remove(item.line.key)}
                        className="mt-0.5 text-muted transition-colors hover:text-ink"
                        aria-label={`Remove ${item.product.name}`}
                      >
                        <TrashIcon />
                      </button>
                    </div>
                    <div className="mt-auto flex items-end justify-between pt-3">
                      <div className="flex h-8 items-center rounded-full border border-ink/15">
                        <button
                          type="button"
                          onClick={() =>
                            setQty(item.line.key, item.line.qty - 1)
                          }
                          className="grid size-8 place-items-center text-muted hover:text-ink"
                          aria-label="Decrease quantity"
                        >
                          <MinusIcon width={12} height={12} />
                        </button>
                        <span className="w-6 text-center text-micro">
                          {item.line.qty}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            setQty(item.line.key, item.line.qty + 1)
                          }
                          className="grid size-8 place-items-center text-muted hover:text-ink"
                          aria-label="Increase quantity"
                        >
                          <PlusIcon width={12} height={12} />
                        </button>
                      </div>
                      <p className="text-small font-medium">
                        {formatPrice(item.lineTotal)}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <footer className="border-t border-line px-6 py-5">
              <div className="flex items-center justify-between text-small">
                <span className="text-muted">Subtotal</span>
                <span className="font-medium">{formatPrice(subtotal)}</span>
              </div>
              <p className="mt-1 text-micro text-muted">
                Taxes and shipping calculated at checkout.
              </p>
              <ButtonLink
                href="/checkout"
                onClick={closeCart}
                className="mt-4 w-full"
                variant="dark"
                size="lg"
              >
                Checkout
              </ButtonLink>
              <div className="mt-2 flex items-center justify-between">
                <Link
                  href="/cart"
                  onClick={closeCart}
                  className="text-micro text-muted underline-offset-4 hover:underline"
                >
                  View bag
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={closeCart}
                  className="text-micro text-muted"
                >
                  Continue shopping
                </Button>
              </div>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}

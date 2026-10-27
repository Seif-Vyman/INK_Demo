"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { products } from "@data/products";
import { siteConfig } from "@data/site-config";
import { formatPrice } from "@/lib/utils";
import { useUiStore } from "@/lib/store/ui";
import { CloseIcon, SearchIcon } from "@/components/ui/icons";
import { useHydrated } from "@/lib/use-hydrated";

export function SearchOverlay() {
  const hydrated = useHydrated();
  const open = useUiStore((state) => state.searchOpen);
  const closeSearch = useUiStore((state) => state.closeSearch);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const results = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return [];
    return products
      .filter((product) =>
        [product.name, product.shortDescription, product.category, ...product.tags]
          .join(" ")
          .toLowerCase()
          .includes(term),
      )
      .slice(0, 5);
  }, [query]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeSearch();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    window.setTimeout(() => inputRef.current?.focus(), 50);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, closeSearch]);

  if (!hydrated || !open) return null;

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const term = query.trim();
    closeSearch();
    router.push(term ? `/shop?q=${encodeURIComponent(term)}` : "/shop");
  };

  return (
    <div className="fixed inset-0 z-[75]">
      <button
        type="button"
        aria-label="Close search"
        onClick={closeSearch}
        className="absolute inset-0 bg-ink/25"
      />
      <div className="absolute inset-x-0 top-0 bg-cream px-gutter py-5 shadow-[0_20px_40px_rgba(32,40,35,0.08)] md:py-7">
        <div className="mx-auto w-full max-w-[1312px]">
          <div className="flex items-center justify-between">
            <p className="eyebrow text-muted">Search {siteConfig.name}</p>
            <button
              type="button"
              onClick={closeSearch}
              aria-label="Close search"
              className="grid size-9 place-items-center rounded-full border border-ink/15 hover:bg-ink/5"
            >
              <CloseIcon />
            </button>
          </div>
          <form onSubmit={submit} className="mt-4 flex items-center gap-3 border-b border-ink/25 pb-3">
            <SearchIcon className="shrink-0 text-muted" />
            <input
              ref={inputRef}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Try “laptop sleeve” or “lilac”"
              className="w-full bg-transparent text-h2 font-medium tracking-[-0.02em] outline-none placeholder:text-ink/30"
              aria-label="Search products"
            />
            <button
              type="submit"
              className="hidden h-10 shrink-0 items-center rounded-lg bg-ink px-5 text-micro font-medium text-cream md:inline-flex"
            >
              Search
            </button>
          </form>

          {query.trim() ? (
            results.length > 0 ? (
              <ul className="mt-4 divide-y divide-line">
                {results.map((product) => (
                  <li key={product.slug}>
                    <Link
                      href={`/product/${product.slug}`}
                      onClick={closeSearch}
                      className="flex items-center gap-4 py-3"
                    >
                      <span className="relative size-14 overflow-hidden rounded-media bg-tan">
                        <Image
                          src={product.colors[0].images[0]}
                          alt={product.name}
                          fill
                          sizes="56px"
                          className="object-cover"
                        />
                      </span>
                      <span className="flex-1">
                        <span className="block text-small font-medium">
                          {product.name}
                        </span>
                        <span className="block text-micro text-muted">
                          {product.shortDescription}
                        </span>
                      </span>
                      <span className="text-small">{formatPrice(product.price)}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-6 text-small text-muted">
                No matches for “{query}”.{" "}
                <Link
                  href="/shop"
                  onClick={closeSearch}
                  className="link-underline text-ink"
                >
                  Browse the full shop
                </Link>
                .
              </p>
            )
          ) : (
            <div className="mt-5 flex flex-wrap items-center gap-2">
              <span className="text-micro text-muted">Popular:</span>
              {["Laptop sleeves", "Small bags", "Lilac", "Under $20"].map(
                (item) => (
                  <Link
                    key={item}
                    href={`/shop?q=${encodeURIComponent(item)}`}
                    onClick={closeSearch}
                    className="rounded-full border border-ink/15 px-3 py-1.5 text-micro transition-colors hover:border-ink/50"
                  >
                    {item}
                  </Link>
                ),
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

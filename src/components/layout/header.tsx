"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@data/site-config";
import { Logo } from "@/components/ui/logo";
import { BagIcon, HeartIcon, MenuIcon, SearchIcon } from "@/components/ui/icons";
import { useCartCount, useWishlistCount } from "@/lib/use-hydrated";
import { useUiStore } from "@/lib/store/ui";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const cartCount = useCartCount();
  const wishlistCount = useWishlistCount();
  const openCart = useUiStore((state) => state.openCart);
  const openMenu = useUiStore((state) => state.openMenu);
  const openSearch = useUiStore((state) => state.openSearch);

  return (
    <header className="sticky top-0 z-50 bg-cream/95 backdrop-blur-[2px]">
      <div className="shell relative flex h-20 items-center justify-between md:h-[104px]">
        {/* Mobile: menu */}
        <div className="flex items-center md:hidden">
          <button
            type="button"
            onClick={openMenu}
            aria-label="Open menu"
            className="-ml-1.5 grid size-9 place-items-center"
          >
            <MenuIcon />
          </button>
        </div>

        {/* Logo */}
        <div className="md:flex md:items-center">
          <Logo size="header" />
        </div>

        {/* Desktop nav */}
        <nav
          aria-label="Main"
          className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 md:flex"
        >
          {siteConfig.nav.map((link) => {
            const active =
              link.href === "/shop"
                ? pathname === "/shop"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-small transition-colors hover:text-ink",
                  active ? "text-ink" : "text-ink/75",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-1 md:gap-4">
          <button
            type="button"
            onClick={openSearch}
            aria-label="Search"
            className="hidden size-9 place-items-center rounded-full transition-colors hover:bg-ink/5 md:grid"
          >
            <SearchIcon />
          </button>

          <Link
            href="/wishlist"
            aria-label={`Saved items (${wishlistCount})`}
            className="relative hidden size-9 place-items-center rounded-full transition-colors hover:bg-ink/5 md:grid"
          >
            <HeartIcon filled={wishlistCount > 0} />
            {wishlistCount > 0 ? (
              <span className="absolute -right-0.5 -top-0.5 grid min-w-4 place-items-center rounded-full bg-ink px-1 text-[9px] text-cream">
                {wishlistCount}
              </span>
            ) : null}
          </Link>

          <button
            type="button"
            onClick={openCart}
            aria-label={`Open bag (${cartCount} items)`}
            className="flex h-9 items-center gap-1.5 rounded-full px-1 transition-colors hover:bg-ink/5 md:px-2"
          >
            <BagIcon />
            <span
              aria-hidden
              className="min-w-3 text-left text-micro leading-none tabular-nums"
            >
              {cartCount > 0 ? cartCount : ""}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}

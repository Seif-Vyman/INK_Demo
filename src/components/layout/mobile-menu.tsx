"use client";

import Link from "next/link";
import { useEffect } from "react";
import { siteConfig } from "@data/site-config";
import { useUiStore } from "@/lib/store/ui";
import { useWishlistCount } from "@/lib/use-hydrated";
import { CloseIcon, HeartIcon, InstagramIcon, SearchIcon, TikTokIcon } from "@/components/ui/icons";

export function MobileMenu() {
  const open = useUiStore((state) => state.menuOpen);
  const closeMenu = useUiStore((state) => state.closeMenu);
  const wishlistCount = useWishlistCount();

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, closeMenu]);

  return (
    <div
      aria-hidden={!open}
      className={
        open
          ? "fixed inset-0 z-[65] bg-cream"
          : "pointer-events-none fixed inset-0 z-[65] bg-cream opacity-0"
      }
    >
      <div className="flex h-20 items-center justify-between px-gutter">
        <span className="eyebrow text-muted">Menu</span>
        <button
          type="button"
          onClick={closeMenu}
          aria-label="Close menu"
          className="-mr-1 grid size-9 place-items-center"
          tabIndex={open ? 0 : -1}
        >
          <CloseIcon />
        </button>
      </div>

      <nav aria-label="Mobile" className="px-gutter pt-6">
        <ul className="space-y-5">
          {siteConfig.nav.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={closeMenu}
                className="text-h2 font-semibold tracking-[-0.02em]"
                tabIndex={open ? 0 : -1}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <button
              type="button"
              onClick={() => {
                closeMenu();
                useUiStore.getState().openSearch();
              }}
              className="flex items-center gap-2 text-h2 font-semibold tracking-[-0.02em]"
              tabIndex={open ? 0 : -1}
            >
              Search
              <SearchIcon className="text-muted" />
            </button>
          </li>
          <li>
            <Link
              href="/wishlist"
              onClick={closeMenu}
              className="flex items-center gap-2 text-h2 font-semibold tracking-[-0.02em]"
              tabIndex={open ? 0 : -1}
            >
              Saved
              <span className="text-small font-normal text-muted">
                {wishlistCount > 0 ? `(${wishlistCount})` : ""}
              </span>
              <HeartIcon className="text-muted" />
            </Link>
          </li>
        </ul>
      </nav>

      <div className="mt-10 border-t border-line px-gutter pt-6">
        <p className="eyebrow text-muted">Say hello</p>
        <a
          href={`mailto:${siteConfig.contact.email}`}
          className="mt-2 block text-small link-underline"
          tabIndex={open ? 0 : -1}
        >
          {siteConfig.contact.email}
        </a>
        <p className="mt-1 text-micro text-muted">{siteConfig.contact.hours}</p>
        <div className="mt-5 flex items-center gap-4">
          {siteConfig.footer.socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-micro link-underline"
              tabIndex={open ? 0 : -1}
            >
              {social.icon === "instagram" ? <InstagramIcon /> : <TikTokIcon />}
              {social.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

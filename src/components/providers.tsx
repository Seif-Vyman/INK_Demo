"use client";

import { useEffect } from "react";
import { useCartStore } from "@/lib/store/cart";
import { useWishlistStore } from "@/lib/store/wishlist";
import { CartDrawer } from "@/components/layout/cart-drawer";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { SearchOverlay } from "@/components/layout/search-overlay";
import { Toaster } from "@/components/ui/toaster";

export function Providers({ children }: { children: React.ReactNode }) {
  // Cart and wishlist are persisted in localStorage. Rehydrating after mount
  // keeps the server-rendered markup identical to the first client render.
  useEffect(() => {
    void useCartStore.persist.rehydrate();
    void useWishlistStore.persist.rehydrate();
  }, []);

  return (
    <>
      {children}
      <CartDrawer />
      <SearchOverlay />
      <MobileMenu />
      <Toaster />
    </>
  );
}

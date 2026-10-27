"use client";

import { useEffect, useState } from "react";
import { useCartStore } from "@/lib/store/cart";
import { useWishlistStore } from "@/lib/store/wishlist";

/** True after the client has mounted — use to avoid SSR/localStorage mismatches. */
export function useHydrated() {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  return hydrated;
}

/** Cart quantity that is safe to render on the server (0 until hydrated). */
export function useCartCount() {
  const hydrated = useHydrated();
  const count = useCartStore((state) =>
    state.lines.reduce((total, line) => total + line.qty, 0),
  );
  return hydrated ? count : 0;
}

export function useWishlistCount() {
  const hydrated = useHydrated();
  const count = useWishlistStore((state) => state.slugs.length);
  return hydrated ? count : 0;
}

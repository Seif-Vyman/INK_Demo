"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type WishlistState = {
  slugs: string[];
  toggle: (slug: string) => boolean;
  remove: (slug: string) => void;
  has: (slug: string) => boolean;
  clear: () => void;
};

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      slugs: [],
      toggle: (slug) => {
        const exists = get().slugs.includes(slug);
        set((state) => ({
          slugs: exists
            ? state.slugs.filter((item) => item !== slug)
            : [...state.slugs, slug],
        }));
        return !exists;
      },
      remove: (slug) =>
        set((state) => ({ slugs: state.slugs.filter((item) => item !== slug) })),
      has: (slug) => get().slugs.includes(slug),
      clear: () => set({ slugs: [] }),
    }),
    {
      name: "inkora-wishlist",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ slugs: state.slugs }),
      skipHydration: true,
      version: 1,
    },
  ),
);

"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type CartLine = {
  /** `${slug}-${color}-${size}` */
  key: string;
  slug: string;
  color: string;
  size: string;
  qty: number;
};

type CartState = {
  lines: CartLine[];
  isOpen: boolean;
  open: () => void;
  close: () => void;
  add: (input: {
    slug: string;
    color: string;
    size: string;
    qty?: number;
  }) => void;
  remove: (key: string) => void;
  setQty: (key: string, qty: number) => void;
  clear: () => void;
};

export function cartLineKey(slug: string, color: string, size: string) {
  return `${slug}__${color}__${size}`;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      lines: [],
      isOpen: false,
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      add: ({ slug, color, size, qty = 1 }) =>
        set((state) => {
          const key = cartLineKey(slug, color, size);
          const existing = state.lines.find((line) => line.key === key);
          if (existing) {
            return {
              lines: state.lines.map((line) =>
                line.key === key ? { ...line, qty: line.qty + qty } : line,
              ),
            };
          }
          return {
            lines: [...state.lines, { key, slug, color, size, qty }],
          };
        }),
      remove: (key) =>
        set((state) => ({
          lines: state.lines.filter((line) => line.key !== key),
        })),
      setQty: (key, qty) =>
        set((state) => ({
          lines:
            qty <= 0
              ? state.lines.filter((line) => line.key !== key)
              : state.lines.map((line) =>
                  line.key === key ? { ...line, qty } : line,
                ),
        })),
      clear: () => set({ lines: [] }),
    }),
    {
      name: "inkora-cart",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ lines: state.lines }),
      skipHydration: true,
      version: 1,
    },
  ),
);

export const selectCartCount = (state: CartState) =>
  state.lines.reduce((total, line) => total + line.qty, 0);

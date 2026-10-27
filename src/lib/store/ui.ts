"use client";

import { create } from "zustand";

type UiState = {
  cartOpen: boolean;
  menuOpen: boolean;
  searchOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  openMenu: () => void;
  closeMenu: () => void;
  openSearch: () => void;
  closeSearch: () => void;
};

export const useUiStore = create<UiState>((set) => ({
  cartOpen: false,
  menuOpen: false,
  searchOpen: false,
  openCart: () => set({ cartOpen: true, menuOpen: false }),
  closeCart: () => set({ cartOpen: false }),
  openMenu: () => set({ menuOpen: true, cartOpen: false }),
  closeMenu: () => set({ menuOpen: false }),
  openSearch: () => set({ searchOpen: true }),
  closeSearch: () => set({ searchOpen: false }),
}));

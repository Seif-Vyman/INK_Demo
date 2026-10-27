"use client";

import { create } from "zustand";

export type Toast = {
  id: number;
  message: string;
  tone?: "default" | "success";
};

type ToastState = {
  toasts: Toast[];
  push: (message: string, tone?: Toast["tone"]) => void;
  dismiss: (id: number) => void;
};

let nextId = 1;

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  push: (message, tone = "default") => {
    const id = nextId++;
    set((state) => ({ toasts: [...state.toasts, { id, message, tone }] }));
    if (typeof window !== "undefined") {
      window.setTimeout(() => {
        set((state) => ({
          toasts: state.toasts.filter((toast) => toast.id !== id),
        }));
      }, 3200);
    }
  },
  dismiss: (id) =>
    set((state) => ({ toasts: state.toasts.filter((toast) => toast.id !== id) })),
}));

"use client";

import { useToastStore } from "@/lib/store/toast";
import { CheckIcon, CloseIcon } from "@/components/ui/icons";

export function Toaster() {
  const toasts = useToastStore((state) => state.toasts);
  const dismiss = useToastStore((state) => state.dismiss);

  if (toasts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="pointer-events-none fixed inset-x-0 bottom-6 z-[90] flex flex-col items-center gap-2 px-4"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex w-full max-w-sm items-center gap-3 rounded-full bg-ink px-5 py-3 text-cream shadow-[0_16px_40px_rgba(32,40,35,0.25)]"
        >
          <span className="grid size-5 shrink-0 place-items-center rounded-full bg-lime text-ink">
            <CheckIcon width={12} height={12} />
          </span>
          <p className="flex-1 text-micro leading-snug">{toast.message}</p>
          <button
            type="button"
            onClick={() => dismiss(toast.id)}
            aria-label="Dismiss notification"
            className="text-cream/60 transition-colors hover:text-cream"
          >
            <CloseIcon width={14} height={14} />
          </button>
        </div>
      ))}
    </div>
  );
}

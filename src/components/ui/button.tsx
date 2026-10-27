import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "dark" | "ghost";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary:
    "bg-lime text-ink hover:brightness-95 active:brightness-90 border border-transparent",
  outline:
    "bg-transparent text-ink border border-ink/25 hover:border-ink/60 hover:bg-ink/[0.03]",
  dark: "bg-ink text-cream border border-transparent hover:bg-ink-soft",
  ghost: "bg-transparent text-ink border border-transparent hover:bg-ink/[0.05]",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-micro rounded-lg",
  md: "h-12 px-6 text-small rounded-lg",
  lg: "h-[52px] px-6 text-small rounded-lg",
};

export function buttonStyles({
  variant = "primary",
  size = "md",
  className,
}: {
  variant?: Variant;
  size?: Size;
  className?: string;
} = {}) {
  return cn(
    "inline-flex items-center justify-center gap-2 font-medium transition-colors duration-200 disabled:pointer-events-none disabled:opacity-50",
    variants[variant],
    sizes[size],
    className,
  );
}

type ButtonProps = ComponentProps<"button"> & {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
};

export function Button({
  variant,
  size,
  className,
  children,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonStyles({ variant, size, className })}
      {...props}
    >
      {children}
    </button>
  );
}

type ButtonLinkProps = ComponentProps<typeof Link> & {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
};

export function ButtonLink({
  variant,
  size,
  className,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <Link className={buttonStyles({ variant, size, className })} {...props}>
      {children}
    </Link>
  );
}

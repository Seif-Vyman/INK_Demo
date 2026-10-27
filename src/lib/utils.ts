import { siteConfig } from "@data/site-config";

export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

const priceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
});

export function formatPrice(value: number): string {
  return priceFormatter.format(value);
}

export function formatPriceParts(value: number): { whole: string; cents: string } {
  const [whole, cents] = priceFormatter.format(value).split(".");
  return { whole, cents: cents ?? "00" };
}

export function freeShippingRemaining(subtotal: number): number {
  return Math.max(0, siteConfig.checkout.freeShippingThreshold - subtotal);
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function titleCase(value: string): string {
  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

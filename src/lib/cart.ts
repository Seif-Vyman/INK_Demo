import { products, type Product, type ProductColor } from "@data/products";
import type { CartLine } from "@/lib/store/cart";
import { siteConfig } from "@data/site-config";

export type CartItemView = {
  line: CartLine;
  product: Product;
  color: ProductColor;
  image: string;
  unitPrice: number;
  lineTotal: number;
};

export function buildCartItems(lines: CartLine[]): CartItemView[] {
  return lines.flatMap((line) => {
    const product = products.find((item) => item.slug === line.slug);
    if (!product) return [];
    const color =
      product.colors.find((item) => item.slug === line.color) ?? product.colors[0];
    return [
      {
        line,
        product,
        color,
        image: color.images[0] ?? product.colors[0].images[0],
        unitPrice: product.price,
        lineTotal: product.price * line.qty,
      },
    ];
  });
}

export function cartSubtotal(items: CartItemView[]): number {
  return items.reduce((total, item) => total + item.lineTotal, 0);
}

export function cartShipping(subtotal: number, method: "standard" | "express") {
  if (method === "express") return 14;
  if (subtotal >= siteConfig.checkout.freeShippingThreshold) return 0;
  return siteConfig.checkout.shippingFlatRate;
}

export function cartTax(subtotal: number): number {
  return Math.round(subtotal * siteConfig.checkout.taxRate * 100) / 100;
}

import { products, type Product } from "@data/products";
import { siteConfig, type Category } from "@data/site-config";

/** All products, in the order they appear in data/products.ts */
export function getAllProducts(): Product[] {
  return products;
}

export function getProduct(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getFeaturedProducts(limit = 4): Product[] {
  const featured = products.filter((product) => product.featured);
  const pool = featured.length >= limit ? featured : products;
  return [...pool]
    .sort((a, b) => (a.sortOrder ?? 99) - (b.sortOrder ?? 99))
    .slice(0, limit);
}

export function getRelatedProducts(product: Product, limit = 3): Product[] {
  const sameCategory = products.filter(
    (item) => item.slug !== product.slug && item.category === product.category,
  );
  const rest = products.filter(
    (item) => item.slug !== product.slug && item.category !== product.category,
  );
  return [...sameCategory, ...rest].slice(0, limit);
}

export function getCategory(slug: string): Category | undefined {
  return siteConfig.categories.find((category) => category.slug === slug);
}

export function getProductsByCategory(slug: string): Product[] {
  return products.filter((product) => product.category === slug);
}

export function getCategoryCount(slug: string): number {
  return getProductsByCategory(slug).length;
}

/** Colour options across the whole catalogue (for shop filters) */
export function getCatalogColors() {
  const map = new Map<string, { slug: string; name: string; hex: string }>();
  for (const product of products) {
    for (const color of product.colors) {
      if (!map.has(color.slug)) {
        map.set(color.slug, {
          slug: color.slug,
          name: color.name.split(" / ")[0],
          hex: color.hex,
        });
      }
    }
  }
  return Array.from(map.values());
}

export function getColorHex(slug: string): string | undefined {
  for (const product of products) {
    const color = product.colors.find((item) => item.slug === slug);
    if (color) return color.hex;
  }
  return undefined;
}

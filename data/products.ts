/**
 * ─────────────────────────────────────────────────────────────
 *  PRODUCTS — the only file you need to edit to add products.
 *
 *  Add an object to `products` and everything else updates
 *  automatically: the /shop grid, filters, search, the product
 *  page at /product/[slug], related products, the cart and the
 *  checkout.
 *
 *  1. Drop your images into /public/products/
 *  2. Copy one of the entries below
 *  3. Give it a unique `slug` (that becomes the URL)
 * ─────────────────────────────────────────────────────────────
 */

export type ProductColor = {
  /** Shown on the product page and in the cart, e.g. "Forest / Cream" */
  name: string;
  /** Short, unique within the product — used for cart keys and ?color= filters */
  slug: string;
  /** Swatch colour */
  hex: string;
  /** First image is the main one */
  images: string[];
};

export type Product = {
  /** URL: /product/<slug> — must be unique */
  slug: string;
  name: string;
  /** Must match a category slug from data/site-config.ts */
  category: string;
  /** Price in USD, e.g. 38 or 38.5 */
  price: number;
  /** Optional original price, shown struck through */
  compareAtPrice?: number;
  /** One-line summary used on cards and in search results */
  shortDescription: string;
  /** Long copy for the product page */
  description: string;
  /** Bullet points under "Details" */
  details: string[];
  /** At least one. The first colour is preselected. */
  colors: ProductColor[];
  /** Size options, e.g. ['13"', '14"', '16"'] or ['One size'] */
  sizes: string[];
  /**
   * Free-form labels used for filtering and badges.
   * Built-in filters understand: bestseller, new, limited, gift
   */
  tags: string[];
  /** Show on the home page "daily rotation" row */
  featured?: boolean;
  /** Show in the first rows of the shop grid */
  sortOrder?: number;
  /** ISO date — used by the "Newest" sort */
  releasedAt?: string;
  /** Optional extra spec rows on the product page */
  specs?: { label: string; value: string }[];
};

export const products: Product[] = [
  {
    slug: "wave-laptop-sleeve",
    name: "Wave Laptop Sleeve",
    category: "laptop-sleeves",
    price: 38,
    shortDescription: "Forest / Cream · 2 sizes",
    description:
      "A padded sleeve with a topographic print that looks like it was drawn just for you. Soft on the inside, structured on the outside, and roomy enough for a charger and a notebook.",
    details: [
      "Recycled 600D outer with a water-resistant finish",
      "8 mm foam padding and a soft brushed lining",
      "Hidden zip pocket for cables and cards",
      "Fits 13\", 14\" and 16\" laptops",
    ],
    colors: [
      {
        name: "Forest / Cream",
        slug: "forest",
        hex: "#2F4A36",
        images: [
          "/products/wave-laptop-sleeve.jpg",
          "/products/color-study-forest.jpg",
        ],
      },
    ],
    sizes: ["13\"", "14\"", "16\""],
    tags: ["bestseller", "signature"],
    featured: true,
    sortOrder: 1,
    releasedAt: "2026-02-14",
    specs: [
      { label: "Material", value: "Recycled 600D polyester" },
      { label: "Padding", value: "8 mm closed-cell foam" },
      { label: "Care", value: "Spot clean, air dry" },
    ],
  },
  {
    slug: "daydream-laptop-sleeve",
    name: "Daydream Laptop Sleeve",
    category: "laptop-sleeves",
    price: 42,
    shortDescription: "Cobalt · Special edition",
    description:
      "Cobalt blue, a quiet moon and a cast of characters. Our special-edition sleeve is printed in small runs, so no two feel quite the same.",
    details: [
      "Limited seasonal print, printed in small batches",
      "Recycled 600D outer with a water-resistant finish",
      "Padded laptop compartment with a soft lining",
      "Fits 13\", 14\" and 16\" laptops",
    ],
    colors: [
      {
        name: "Cobalt",
        slug: "cobalt",
        hex: "#2A3CC9",
        images: [
          "/products/daydream-laptop-sleeve.jpg",
          "/products/color-study-forest.jpg",
        ],
      },
    ],
    sizes: ["13\"", "14\"", "16\""],
    tags: ["bestseller", "limited"],
    featured: true,
    sortOrder: 2,
    releasedAt: "2026-03-02",
    specs: [
      { label: "Material", value: "Recycled 600D polyester" },
      { label: "Print", value: "Water-based inks" },
      { label: "Care", value: "Spot clean, air dry" },
    ],
  },
  {
    slug: "little-things-pouch",
    name: "Little Things Pouch",
    category: "small-bags",
    price: 18,
    shortDescription: "Lilac · One size",
    description:
      "The pouch that ends the bottom-of-the-bag search. Chunky zip, soft structure, and just enough room for the little things you actually use.",
    details: [
      "Structured recycled outer with a soft-touch finish",
      "Chunky metal zip with a woven pull",
      "Fits a phone, keys, cards and a lip balm",
      "Wipe clean inside and out",
    ],
    colors: [
      {
        name: "Lilac",
        slug: "lilac",
        hex: "#B9A9D8",
        images: [
          "/products/little-things-pouch.jpg",
          "/editorial/social-3.jpg",
        ],
      },
    ],
    sizes: ["One size"],
    tags: ["bestseller", "gift"],
    featured: true,
    sortOrder: 3,
    releasedAt: "2025-11-20",
  },
  {
    slug: "go-everywhere-crossbody",
    name: "Go Everywhere Crossbody",
    category: "small-bags",
    price: 48,
    shortDescription: "Sage · Adjustable strap",
    description:
      "Hands free, head clear. A lightweight crossbody with an adjustable webbing strap that sits right whether you wear it high or low.",
    details: [
      "Adjustable webbing strap with a metal slider",
      "Zip top with a soft inner lining",
      "Fits a phone, keys, wallet and a small notebook",
      "Available in Sage, Forest and Lilac",
    ],
    colors: [
      {
        name: "Sage",
        slug: "sage",
        hex: "#A9BFA9",
        images: [
          "/products/go-everywhere-crossbody.jpg",
          "/categories/small-bags.jpg",
        ],
      },
    ],
    sizes: ["One size"],
    tags: ["bestseller", "signature"],
    featured: true,
    sortOrder: 4,
    releasedAt: "2026-01-08",
  },
  {
    slug: "cloud-nine-laptop-sleeve",
    name: "Cloud Nine Laptop Sleeve",
    category: "laptop-sleeves",
    price: 44,
    shortDescription: "Ice · One size",
    description:
      "Cool, pale and quietly practical. Cloud Nine is the sleeve for long desk days and longer commutes, with a soft lining that treats your laptop like it matters.",
    details: [
      "Pale ice blue with a tonal topographic print",
      "Recycled 600D outer with a water-resistant finish",
      "Padded compartment and a soft brushed lining",
      "Fits 13\", 14\" and 16\" laptops",
    ],
    colors: [
      {
        name: "Ice",
        slug: "ice",
        hex: "#C7DDE6",
        images: [
          "/products/color-study-forest.jpg",
          "/products/wave-laptop-sleeve.jpg",
        ],
      },
    ],
    sizes: ["13\"", "14\"", "16\""],
    tags: ["new"],
    sortOrder: 5,
    releasedAt: "2026-04-11",
  },
  {
    slug: "loop-keyring",
    name: "Loop Keyring",
    category: "small-bags",
    price: 12,
    shortDescription: "Forest · One size",
    description:
      "A little loop of colour for your keys, your zip or your bag. Small enough to disappear, bright enough to find at the bottom of anything.",
    details: [
      "Recycled webbing loop with a solid metal ring",
      "Clips onto bags, keys and camera straps",
      "Available in Forest, Cobalt and Lilac",
    ],
    colors: [
      {
        name: "Forest",
        slug: "forest",
        hex: "#2F4A36",
        images: ["/editorial/social-3.jpg", "/products/little-things-pouch.jpg"],
      },
    ],
    sizes: ["One size"],
    tags: ["new", "gift"],
    sortOrder: 6,
    releasedAt: "2026-04-02",
  },
  {
    slug: "everyday-market-tote",
    name: "Everyday Market Tote",
    category: "small-bags",
    price: 56,
    shortDescription: "Cream / Sage · One size",
    description:
      "A soft, roomy tote for market mornings and after-work plans. Wide straps, a flat base and an inside pocket so things stay where you put them.",
    details: [
      "Heavyweight recycled canvas with a soft handle",
      "Flat base so the bag stands up on its own",
      "Inside zip pocket for the small stuff",
      "Fits a 14\" laptop, a water bottle and a jumper",
    ],
    colors: [
      {
        name: "Cream / Sage",
        slug: "cream-sage",
        hex: "#C9D5C6",
        images: ["/categories/small-bags.jpg", "/editorial/social-1.jpg"],
      },
    ],
    sizes: ["One size"],
    tags: ["new"],
    sortOrder: 7,
    releasedAt: "2026-05-06",
  },
  {
    slug: "rascal-print-sleeve",
    name: "Rascal Print Sleeve",
    category: "laptop-sleeves",
    price: 46,
    shortDescription: "Monochrome · Limited run",
    description:
      "Our loudest print, in black and white. A limited run of the Rascal sleeve for people who like their everyday with a little attitude.",
    details: [
      "Limited screen-printed run of 200",
      "Recycled 600D outer with a water-resistant finish",
      "Padded compartment with a printed inner lining",
      "Fits 13\", 14\" and 16\" laptops",
    ],
    colors: [
      {
        name: "Monochrome",
        slug: "monochrome",
        hex: "#2B2B2B",
        images: [
          "/categories/laptop-sleeves.jpg",
          "/products/color-study-forest.jpg",
        ],
      },
    ],
    sizes: ["13\"", "14\"", "16\""],
    tags: ["limited"],
    sortOrder: 8,
    releasedAt: "2026-05-21",
  },
];

/** Handy derived lists — no need to edit these */
export const productTags = Array.from(
  new Set(products.flatMap((product) => product.tags)),
).sort();

export const productSizes = Array.from(
  new Set(products.flatMap((product) => product.sizes)),
);

export const productColorOptions = Array.from(
  products
    .flatMap((product) => product.colors)
    .reduce((map, color) => {
      if (!map.has(color.slug)) {
        map.set(color.slug, { slug: color.slug, name: color.name, hex: color.hex });
      }
      return map;
    }, new Map<string, { slug: string; name: string; hex: string }>())
    .values(),
);

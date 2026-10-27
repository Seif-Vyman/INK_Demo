/**
 * Store-wide content and settings.
 *
 * Everything a non-developer is likely to change day-to-day lives here:
 * brand name, logo, navigation, announcement bar, hero copy, section copy,
 * footer links, contact details and social links.
 *
 * Colours, fonts and spacing are NOT here — they are design tokens in
 * `src/app/globals.css`.
 */

export type NavLink = {
  label: string;
  href: string;
};

export type Category = {
  /** Used by products (`product.category`) and for the /shop/[category] route */
  slug: string;
  /** Full name, e.g. "Laptop Sleeves" */
  name: string;
  /** Short label used in nav and chips, e.g. "Laptop sleeves" */
  shortName: string;
  description: string;
  image: string;
  imageAlt: string;
  /** Background token used on the home page category card */
  theme?: "sky" | "sage";
};

export type SocialLink = {
  label: string;
  href: string;
  icon?: "instagram" | "tiktok" | "pinterest" | "mail";
};

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "INKORA",
  legalName: "INKORA",
  /** Public URL used for Open Graph tags. Update after deploying to Vercel. */
  url: "https://inkora-demo.vercel.app",
  description:
    "Laptop sleeves and little bags with a lot of personality. For wherever today takes you.",
  keywords: [
    "laptop sleeve",
    "crossbody bag",
    "printed accessories",
    "INKORA",
  ],

  /** Swap `text` for an image path to use a logo file, e.g. "/logo.svg" */
  logo: {
    text: "INKORA",
    image: null as string | null,
    alt: "INKORA",
  },

  announcement: {
    text: "Good things, on the go. Free US shipping on $75+",
    href: "/shop",
  },

  nav: [
    { label: "Shop all", href: "/shop" },
    { label: "Laptop sleeves", href: "/shop/laptop-sleeves" },
    { label: "Small bags", href: "/shop/small-bags" },
    { label: "Our story", href: "/about" },
  ] satisfies NavLink[],

  categories: [
    {
      slug: "laptop-sleeves",
      name: "Laptop Sleeves",
      shortName: "Laptop sleeves",
      description: "Big personality. A little extra padding.",
      image: "/categories/laptop-sleeves.jpg",
      imageAlt: "Illustrated laptop sleeve with a rabbit print",
      theme: "sky",
    },
    {
      slug: "small-bags",
      name: "Small Bags",
      shortName: "Small bags",
      description: "For the can't-leave-without-it things.",
      image: "/categories/small-bags.jpg",
      imageAlt: "Sage green crossbody bag with strap",
      theme: "sage",
    },
  ] satisfies Category[],

  hero: {
    eyebrow: "Everyday things. Not-so-everyday energy.",
    /** Each string renders on its own line on desktop */
    headline: ["Your day.", "Your things.", "Your color."],
    description:
      "Laptop sleeves and little bags with a lot of personality. For wherever today takes you.",
    cta: { label: "Find your everyday", href: "/shop" },
    /** Slug of the product shown in the hero */
    productSlug: "wave-laptop-sleeve",
    image: "/products/wave-laptop-sleeve.jpg",
    imageAlt: "Forest green wave-print laptop sleeve",
  },

  usps: [
    { icon: "laptop", label: "A softer landing for your laptop" },
    { icon: "palette", label: "Prints with a point of view" },
    { icon: "box", label: "Free US shipping on $75+" },
  ] as const,

  sections: {
    categories: {
      eyebrow: "A place for your everyday",
      title: "Two ways to carry you.",
    },
    bestsellers: {
      eyebrow: "Best sellers",
      title: "The daily rotation.",
      linkLabel: "Shop all",
      linkHref: "/shop",
      limit: 4,
    },
    colorStory: {
      eyebrow: "Pick a mood. Make it yours.",
      title: "Find your color.",
      description:
        "Forest-day calm or a little cobalt daydream? Start with the shade that feels like you.",
      ctaLabel: "Meet {color} / Cream",
      ctaHref: "/shop?color={slug}",
      image: "/products/color-study-forest.jpg",
      colors: [
        {
          name: "Forest",
          slug: "forest",
          hex: "#2F4A36",
          caption: "01 / FOREST — a fresh perspective on the everyday.",
          /** Optional CSS filter so one artwork can stand in for each colourway */
          filter: "none",
        },
        {
          name: "Cobalt",
          slug: "cobalt",
          hex: "#2A3CC9",
          caption: "02 / COBALT — a little daydream, carried daily.",
          filter: "hue-rotate(175deg) saturate(1.5) brightness(0.95)",
        },
        {
          name: "Lilac",
          slug: "lilac",
          hex: "#B9A9D8",
          caption: "03 / LILAC — soft focus, sharp intent.",
          filter: "hue-rotate(265deg) saturate(0.75) brightness(1.15)",
        },
        {
          name: "Ice",
          slug: "ice",
          hex: "#C7DDE6",
          caption: "04 / ICE — cool tones for warm days.",
          filter: "hue-rotate(160deg) saturate(0.35) brightness(1.35)",
        },
      ],
    },
    brand: {
      eyebrow: "From first class to last coffee",
      title: ["Less ordinary.", "More everyday."],
      description:
        "Your laptop, your keys, your whole little world. We make the things that carry them feel as personal as what's inside.",
      image: "/editorial/brand-story.jpg",
      /** Portrait crop used below the md breakpoint (art-directed) */
      imageMobile: "/editorial/brand-story-mobile.jpg",
      imageAlt: "Two friends walking with INKORA bags",
      points: [
        {
          title: "Room for real life",
          description: "Thoughtful shapes for the essentials you actually use.",
        },
        {
          title: "Soft on the inside",
          description:
            "Padded sleeves and easy zip access for everyday journeys.",
        },
        {
          title: "A print that feels like you",
          description:
            "Unexpected artwork. A fresh take on your daily uniform.",
        },
      ],
      linkLabel: "A little more about INKORA",
      linkHref: "/about",
    },
    social: {
      eyebrow: "Out in the world",
      title: "Carry it your way.",
      handle: "@inkora.studio",
      handleHref: "https://instagram.com",
      caption:
        "Desk days, detours, coffee runs. Tag @inkora.studio to share your everyday.",
      images: [
        { src: "/editorial/social-1.jpg", alt: "Coffee stop with a lilac bag" },
        { src: "/editorial/social-2.jpg", alt: "Walking through the city with a crossbody bag" },
        { src: "/editorial/social-3.jpg", alt: "Pouch, camera and headphones on a cafe table" },
      ],
    },
    newsletter: {
      heading: "Good things in your inbox.",
      description:
        "New prints, little updates, and a fresh dose of color. No noise.",
      placeholder: "Your email address",
      buttonLabel: "Count me in",
      disclaimer:
        "By signing up, you agree to our Privacy Policy. Unsubscribe anytime.",
      successMessage: "You're in. Watch your inbox for good things.",
    },
  },

  footer: {
    tagline:
      "A little color for the things you carry. Made for your everyday, and whatever comes after.",
    columns: [
      {
        title: "Explore",
        links: [
          { label: "Shop all", href: "/shop" },
          { label: "Laptop sleeves", href: "/shop/laptop-sleeves" },
          { label: "Small bags", href: "/shop/small-bags" },
          { label: "Our story", href: "/about" },
        ],
      },
      {
        title: "Here to help",
        links: [
          { label: "Fit guide", href: "/fit-guide" },
          { label: "Shipping & returns", href: "/shipping-returns" },
          { label: "FAQs", href: "/faq" },
          { label: "Contact us", href: "/contact" },
        ],
      },
    ] satisfies { title: string; links: NavLink[] }[],
    hello: {
      title: "Say hello",
      email: "hello@inkora.studio",
      hours: "Mon–Fri, 9–5 ET",
      region: "USD $ · United States",
    },
    socials: [
      { label: "Instagram", href: "https://instagram.com", icon: "instagram" },
      { label: "TikTok", href: "https://tiktok.com", icon: "tiktok" },
    ] satisfies SocialLink[],
    copyright: "© 2026 INKORA. Carry your own kind of color.",
    legal: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
      { label: "Accessibility", href: "/accessibility" },
    ] satisfies NavLink[],
  },

  contact: {
    email: "hello@inkora.studio",
    hours: "Mon–Fri, 9–5 ET",
    responseTime: "We reply within one business day.",
  },

  /** Shown on the simulated checkout success screen */
  checkout: {
    freeShippingThreshold: 75,
    shippingFlatRate: 6,
    taxRate: 0.08,
    demoNotice:
      "This is a prototype store. No payment was taken and no data was sent anywhere.",
  },
} as const;

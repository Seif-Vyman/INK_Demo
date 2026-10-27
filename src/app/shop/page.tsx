import type { Metadata } from "next";
import { siteConfig } from "@data/site-config";
import { ShopPage } from "@/components/shop/shop-page";

export const metadata: Metadata = {
  title: "Shop all",
  description: "Laptop sleeves and little bags with a lot of personality.",
  alternates: { canonical: "/shop" },
  openGraph: {
    title: `Shop all · ${siteConfig.name}`,
    description: "Laptop sleeves and little bags with a lot of personality.",
    url: "/shop",
  },
};

export default function Page() {
  return <ShopPage />;
}

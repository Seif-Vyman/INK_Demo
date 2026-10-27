import type { Metadata } from "next";
import { siteConfig } from "@data/site-config";
import { Hero } from "@/components/home/hero";
import { UspStrip } from "@/components/home/usp-strip";
import { CategoryCards } from "@/components/home/category-cards";
import { DailyRotation } from "@/components/home/daily-rotation";
import { ColorStory } from "@/components/home/color-story";
import { BrandStory } from "@/components/home/brand-story";
import { SocialGallery } from "@/components/home/social-gallery";
import { Newsletter } from "@/components/home/newsletter";

export const metadata: Metadata = {
  title: `${siteConfig.name} — Laptop sleeves & little bags`,
  description: siteConfig.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: `${siteConfig.name} — Everyday things. Not-so-everyday energy.`,
    description: siteConfig.description,
    url: "/",
    images: [{ url: siteConfig.hero.image, width: 656, height: 472 }],
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <UspStrip />
      <CategoryCards />
      <DailyRotation />
      <ColorStory />
      <BrandStory />
      <SocialGallery />
      <Newsletter />
    </>
  );
}

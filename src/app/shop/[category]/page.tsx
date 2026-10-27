import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteConfig } from "@data/site-config";
import { getCategory } from "@/lib/products";
import { ShopPage } from "@/components/shop/shop-page";

type Props = {
  params: Promise<{ category: string }>;
};

export function generateStaticParams() {
  return siteConfig.categories.map((category) => ({ category: category.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) return {};
  return {
    title: cat.name,
    description: cat.description,
    alternates: { canonical: `/shop/${cat.slug}` },
    openGraph: {
      title: `${cat.name} · ${siteConfig.name}`,
      description: cat.description,
      url: `/shop/${cat.slug}`,
      images: [{ url: cat.image }],
    },
  };
}

export default async function Page({ params }: Props) {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) notFound();
  return <ShopPage category={category} />;
}

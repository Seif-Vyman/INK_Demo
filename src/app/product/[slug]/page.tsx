import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteConfig } from "@data/site-config";
import { getAllProducts, getProduct } from "@/lib/products";
import { ProductPage } from "@/components/product/product-page";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllProducts().map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  const image = product.colors[0]?.images[0];
  return {
    title: product.name,
    description: product.shortDescription,
    alternates: { canonical: `/product/${product.slug}` },
    openGraph: {
      title: `${product.name} · ${siteConfig.name}`,
      description: product.description,
      url: `/product/${product.slug}`,
      images: image ? [{ url: image, width: 800, height: 600 }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: product.shortDescription,
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  return <ProductPage product={product} />;
}

import type { Metadata } from "next";
import { siteConfig } from "@data/site-config";
import Image from "next/image";
import { SectionHeading } from "@/components/ui/section-heading";

export const metadata: Metadata = {
  title: "Our story",
  description: "A little more about INKORA.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: `Our story · ${siteConfig.name}`,
    description: "A little more about INKORA.",
    url: "/about",
  },
};

export default function Page() {
  const brand = siteConfig.sections.brand;
  return (
    <div className="pb-16 md:pb-24">
      <section className="shell pt-10 md:pt-14">
        <SectionHeading eyebrow="Our story" title={["Less ordinary.", "More everyday."]} />
        <div className="mt-8 grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
            <Image
              src={brand.image}
              alt={brand.imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="max-w-xl">
            <p className="text-lead text-ink/85">{brand.description}</p>
            <div className="mt-8 grid gap-6 md:grid-cols-3 lg:grid-cols-1">
              {brand.points.map((point) => (
                <div key={point.title}>
                  <p className="text-small font-medium">{point.title}</p>
                  <p className="mt-1 text-small text-muted">{point.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

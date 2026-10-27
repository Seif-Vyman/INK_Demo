import Image from "next/image";
import { siteConfig } from "@data/site-config";
import { SectionHeading } from "@/components/ui/section-heading";

export function SocialGallery() {
  const { social } = siteConfig.sections;

  return (
    <section aria-labelledby="social-heading" className="shell pb-[44px] md:pb-[79px]">
      <SectionHeading
        id="social-heading"
        eyebrow={social.eyebrow}
        title={social.title}
        link={{ label: social.handle, href: social.handleHref }}
      />

      <div className="mt-6 grid grid-cols-2 gap-4 md:mt-[26px] md:grid-cols-3 md:gap-5">
        {social.images.map((image, index) => (
          <div
            key={image.src}
            className={
              index === 0
                ? "relative col-span-2 aspect-[350/260] overflow-hidden rounded-xl bg-line/50 md:col-span-1 md:aspect-[424/391]"
                : "relative aspect-[167/210] overflow-hidden rounded-xl bg-line/50 md:aspect-[424/391]"
            }
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 768px) 50vw, 424px"
              className="object-cover transition-transform duration-500 hover:scale-[1.02]"
            />
          </div>
        ))}
      </div>

      <p className="mt-8 text-[13px] leading-[1.55] text-ink/60">{social.caption}</p>
    </section>
  );
}

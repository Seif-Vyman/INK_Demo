"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { siteConfig } from "@data/site-config";
import { cn } from "@/lib/utils";

export function ColorStory() {
  const { colorStory } = siteConfig.sections;
  const [activeIndex, setActiveIndex] = useState(0);
  const active = colorStory.colors[activeIndex];

  return (
    <section aria-labelledby="color-story-heading" className="bg-sky">
      <div className="shell grid gap-9 py-10 md:py-[60px] lg:grid-cols-[minmax(0,1fr)_minmax(0,680px)] lg:gap-8">
        <div className="flex flex-col lg:pt-[54px]">
          <p className="eyebrow text-ink/55">{colorStory.eyebrow}</p>

          <h2
            id="color-story-heading"
            className="mt-5 text-[34px] font-semibold leading-[1.05] tracking-[-0.03em] md:mt-4 md:text-[48px] md:leading-[1.06] md:tracking-[-0.02em]"
          >
            {colorStory.title}
          </h2>

          <p className="mt-3 max-w-[480px] text-small leading-[1.6] text-ink/70 md:mt-[9px] md:max-w-[520px] md:text-body md:leading-[26px]">
            {colorStory.description}
          </p>

          <div
            role="radiogroup"
            aria-label="Choose a colour"
            className="mt-8 flex items-start gap-5 md:mt-[24px]"
          >
            {colorStory.colors.map((color, index) => {
              const selected = index === activeIndex;
              return (
                <button
                  key={color.slug}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  onClick={() => setActiveIndex(index)}
                  className="group flex w-11 flex-col items-center gap-[9px]"
                >
                  <span
                    className={cn(
                      "grid size-10 place-items-center rounded-full border-2 transition-colors md:size-[52px]",
                      selected
                        ? "border-ink"
                        : "border-transparent group-hover:border-ink/25",
                    )}
                  >
                    <span
                      className="size-8 rounded-full md:size-11"
                      style={{ backgroundColor: color.hex }}
                    />
                  </span>
                  <span
                    className={cn(
                      "text-[12px] leading-none",
                      selected ? "text-ink" : "text-ink/60",
                    )}
                  >
                    {color.name}
                  </span>
                </button>
              );
            })}
          </div>

          <Link
            href={colorStory.ctaHref.replace("{slug}", active.slug)}
            className="mt-7 inline-flex h-[54px] w-fit items-center justify-center whitespace-nowrap rounded-xl border border-ink bg-cream px-6 text-[15px] font-semibold transition-colors hover:bg-ink hover:text-cream md:mt-[27px] md:px-8 md:text-[16px]"
          >
            {colorStory.ctaLabel.replace("{color}", active.name)}
          </Link>
        </div>

        <div>
          <div className="relative aspect-[350/250] overflow-hidden rounded-xl bg-tan md:aspect-[680/391]">
            <Image
              src={colorStory.image}
              alt={`Laptop sleeve in ${active.name}`}
              fill
              sizes="(max-width: 768px) 100vw, 680px"
              className="object-cover transition-[filter] duration-500"
              style={{ filter: active.filter }}
            />
          </div>
          <p className="mt-6 text-[12px] text-ink/60 md:mt-3 md:text-[13px]">
            {active.caption}
          </p>
        </div>
      </div>
    </section>
  );
}

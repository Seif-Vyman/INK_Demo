import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/section-heading";

export const metadata: Metadata = {
  title: "Accessibility",
  description: "INKORA Accessibility Statement.",
  alternates: { canonical: "/accessibility" },
};

export default function Page() {
  return (
    <div className="pb-16 md:pb-24">
      <section className="shell pt-10 md:pt-14">
        <SectionHeading eyebrow="Legal" title="Accessibility" />
        <div className="mt-8 max-w-3xl space-y-4 text-small text-muted">
          <p>We strive to make our site accessible. This demo is built with semantic HTML and keyboard-friendly interactions.</p>
        </div>
      </section>
    </div>
  );
}

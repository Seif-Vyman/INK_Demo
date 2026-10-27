import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/section-heading";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "INKORA Privacy Policy.",
  alternates: { canonical: "/privacy" },
};

export default function Page() {
  return (
    <div className="pb-16 md:pb-24">
      <section className="shell pt-10 md:pt-14">
        <SectionHeading eyebrow="Legal" title="Privacy Policy" />
        <div className="mt-8 max-w-3xl space-y-4 text-small text-muted">
          <p>This is a demo store. We do not collect or store personal data. All data (cart/wishlist) is stored locally in your browser.</p>
        </div>
      </section>
    </div>
  );
}

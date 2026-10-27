import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/section-heading";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "INKORA Terms of Service.",
  alternates: { canonical: "/terms" },
};

export default function Page() {
  return (
    <div className="pb-16 md:pb-24">
      <section className="shell pt-10 md:pt-14">
        <SectionHeading eyebrow="Legal" title="Terms of Service" />
        <div className="mt-8 max-w-3xl space-y-4 text-small text-muted">
          <p>This is a front-end demo for evaluation purposes only. No orders are fulfilled, no payments are processed.</p>
        </div>
      </section>
    </div>
  );
}

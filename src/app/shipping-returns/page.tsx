import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/section-heading";

export const metadata: Metadata = {
  title: "Shipping & returns",
  description: "Shipping and returns information.",
  alternates: { canonical: "/shipping-returns" },
};

export default function Page() {
  return (
    <div className="pb-16 md:pb-24">
      <section className="shell pt-10 md:pt-14">
        <SectionHeading eyebrow="Support" title="Shipping & returns" />
        <div className="mt-8 max-w-2xl space-y-6 text-small text-muted">
          <div>
            <p className="font-medium text-ink">Shipping</p>
            <p className="mt-2">Free US shipping on orders $75+. Standard shipping is a flat rate otherwise. This is a demo store, so orders are not fulfilled.</p>
          </div>
          <div>
            <p className="font-medium text-ink">Returns</p>
            <p className="mt-2">We accept returns on unused items within 30 days of delivery. Reach out to hello@inkora.studio to start a return. Demo orders cannot be returned.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

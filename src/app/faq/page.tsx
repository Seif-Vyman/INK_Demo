import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/section-heading";

export const metadata: Metadata = {
  title: "FAQs",
  description: "Frequently asked questions about INKORA.",
  alternates: { canonical: "/faq" },
};

const faqs = [
  {
    q: "Do you ship internationally?",
    a: "Currently we only ship within the United States. Free US shipping on orders $75+.",
  },
  {
    q: "What sizes do the laptop sleeves fit?",
    a: "Most of our laptop sleeves fit 13\", 14\", and 16\" laptops. Check each product page for exact fit details.",
  },
  {
    q: "Can I change or cancel my order?",
    a: "Since this is a demo store, orders are not processed for fulfillment, but in a real store changes would need to be made quickly after placing an order.",
  },
  {
    q: "How do I track my order?",
    a: "Tracking information would be emailed once your order ships in a real store.",
  },
];

export default function Page() {
  return (
    <div className="pb-16 md:pb-24">
      <section className="shell pt-10 md:pt-14">
        <SectionHeading eyebrow="Support" title="FAQs" />
        <div className="mt-8 max-w-3xl divide-y divide-line border-y border-line">
          {faqs.map((faq) => (
            <details key={faq.q} className="group py-5" open={false}>
              <summary className="flex cursor-pointer items-center justify-between gap-4 text-small font-medium">
                {faq.q}
                <span className="text-muted transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-small text-muted">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}

import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/section-heading";

export const metadata: Metadata = {
  title: "Fit guide",
  description: "Find the right sleeve size for your laptop.",
  alternates: { canonical: "/fit-guide" },
};

export default function Page() {
  return (
    <div className="pb-16 md:pb-24">
      <section className="shell pt-10 md:pt-14">
        <SectionHeading eyebrow="Support" title="Fit guide" />
        <div className="mt-8 max-w-2xl space-y-6">
          <div>
            <p className="text-small font-medium">Laptop Sleeves</p>
            <p className="mt-2 text-small text-muted">
              Our sleeves are designed to fit most 13&quot;, 14&quot;, and 16&quot; laptops. If you&apos;re between sizes or have a thick case, we recommend sizing up.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-small">
              <thead>
                <tr className="border-b border-line">
                  <th className="py-3 pr-4 font-medium">Size</th>
                  <th className="py-3 font-medium">Fits</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-line">
                  <td className="py-3 pr-4">13&quot;</td>
                  <td className="py-3 text-muted">13&quot; laptops</td>
                </tr>
                <tr className="border-b border-line">
                  <td className="py-3 pr-4">14&quot;</td>
                  <td className="py-3 text-muted">14&quot; laptops</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4">16&quot;</td>
                  <td className="py-3 text-muted">16&quot; laptops</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}

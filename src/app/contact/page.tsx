import type { Metadata } from "next";
import { siteConfig } from "@data/site-config";
import { SectionHeading } from "@/components/ui/section-heading";

export const metadata: Metadata = {
  title: "Contact us",
  description: "Get in touch with INKORA.",
  alternates: { canonical: "/contact" },
};

export default function Page() {
  return (
    <div className="pb-16 md:pb-24">
      <section className="shell pt-10 md:pt-14">
        <SectionHeading eyebrow="Support" title="Contact us" />
        <div className="mt-8 max-w-2xl space-y-4 text-small">
          <div>
            <p className="font-medium">Email</p>
            <p className="mt-1 text-muted">{siteConfig.contact.email}</p>
          </div>
          <div>
            <p className="font-medium">Hours</p>
            <p className="mt-1 text-muted">{siteConfig.contact.hours}</p>
          </div>
          <div>
            <p className="font-medium">Response time</p>
            <p className="mt-1 text-muted">{siteConfig.contact.responseTime}</p>
          </div>
        </div>
      </section>
    </div>
  );
}

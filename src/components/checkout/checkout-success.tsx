import { ButtonLink } from "@/components/ui/button";
import { siteConfig } from "@data/site-config";

export function CheckoutSuccess() {
  return (
    <div className="shell flex min-h-[60vh] flex-col items-center justify-center text-center">
      <p className="eyebrow text-muted">Order confirmed</p>
      <h1 className="mt-3 text-h2 font-semibold">Thanks for your order</h1>
      <p className="mt-2 max-w-md text-small text-muted">
        We&apos;ve received your order. {siteConfig.checkout.demoNotice}
      </p>
      <div className="mt-6 flex gap-3">
        <ButtonLink href="/shop">Continue shopping</ButtonLink>
        <ButtonLink href="/" variant="outline">Back to home</ButtonLink>
      </div>
    </div>
  );
}

import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="shell flex min-h-[60vh] flex-col items-center justify-center text-center">
      <p className="eyebrow text-muted">404</p>
      <h1 className="mt-3 text-h2 font-semibold">Page not found</h1>
      <p className="mt-2 max-w-md text-small text-muted">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <div className="mt-6 flex gap-3">
        <ButtonLink href="/" variant="primary">
          Back to home
        </ButtonLink>
        <ButtonLink href="/shop" variant="outline">
          Shop all
        </ButtonLink>
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import { CheckoutClient } from "@/components/checkout/checkout-client";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Complete your order.",
  alternates: { canonical: "/checkout" },
};

export default function Page() {
  return <CheckoutClient />;
}

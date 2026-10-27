import type { Metadata } from "next";
import { CheckoutSuccess } from "@/components/checkout/checkout-success";

export const metadata: Metadata = {
  title: "Order confirmed",
  description: "Your INKORA order has been received.",
  alternates: { canonical: "/checkout/success" },
};

export default function Page() {
  return <CheckoutSuccess />;
}

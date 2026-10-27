import type { Metadata } from "next";
import { CartPageClient } from "@/components/cart/cart-page-client";

export const metadata: Metadata = {
  title: "Your bag",
  description: "Review your INKORA bag and proceed to checkout.",
  alternates: { canonical: "/cart" },
};

export default function Page() {
  return <CartPageClient />;
}

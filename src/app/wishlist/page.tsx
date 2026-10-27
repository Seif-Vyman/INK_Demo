import type { Metadata } from "next";
import { WishlistPageClient } from "@/components/wishlist/wishlist-page-client";

export const metadata: Metadata = {
  title: "Wishlist",
  description: "Saved items from INKORA.",
  alternates: { canonical: "/wishlist" },
};

export default function Page() {
  return <WishlistPageClient />;
}

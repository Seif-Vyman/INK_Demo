"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { siteConfig } from "@data/site-config";
import { buildCartItems, cartSubtotal } from "@/lib/cart";
import { useCartStore } from "@/lib/store/cart";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useHydrated } from "@/lib/use-hydrated";

type Form = {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zip: string;
};

export function CheckoutClient() {
  const router = useRouter();
  const hydrated = useHydrated();
  const lines = useCartStore((state) => state.lines);
  const clear = useCartStore((state) => state.clear);
  const items = useMemo(() => buildCartItems(lines), [lines]);
  const subtotal = cartSubtotal(items);

  const [form, setForm] = useState<Form>({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });
  const [errors, setErrors] = useState<Partial<Form>>({});
  const [submitting, setSubmitting] = useState(false);

  if (!hydrated) return null;
  if (items.length === 0) {
    router.replace("/cart");
    return null;
  }

  const shipping = subtotal >= siteConfig.checkout.freeShippingThreshold ? 0 : siteConfig.checkout.shippingFlatRate;
  const total = subtotal + shipping;

  const validate = () => {
    const e: Partial<Form> = {};
    if (!form.email.includes("@")) e.email = "Enter a valid email";
    if (!form.firstName) e.firstName = "Required";
    if (!form.lastName) e.lastName = "Required";
    if (!form.address) e.address = "Required";
    if (!form.city) e.city = "Required";
    if (!form.state) e.state = "Required";
    if (!/^\d{5}(-\d{4})?$/.test(form.zip)) e.zip = "Enter a valid ZIP";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setTimeout(() => {
      clear();
      router.push("/checkout/success");
    }, 600);
  };

  return (
    <div className="pb-16 md:pb-24">
      <section className="shell pt-10 md:pt-14">
        <h1 className="text-h2 font-semibold">Checkout</h1>
        <p className="mt-2 text-small text-muted">{siteConfig.checkout.demoNotice}</p>

        <form onSubmit={submit} className="mt-8 grid gap-10 lg:grid-cols-[1fr_380px]">
          <div className="space-y-8">
            <div className="rounded-xl border border-line p-6">
              <p className="text-small font-medium">Contact</p>
              <div className="mt-4 grid gap-3">
                <label className="grid gap-1 text-micro">
                  Email
                  <input
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    className="h-11 rounded-lg border border-ink/15 px-3 text-small"
                  />
                  {errors.email ? <span className="text-red-700">{errors.email}</span> : null}
                </label>
              </div>
            </div>

            <div className="rounded-xl border border-line p-6">
              <p className="text-small font-medium">Shipping address</p>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                <label className="grid gap-1 text-micro md:col-span-1">
                  First name
                  <input
                    value={form.firstName}
                    onChange={(e) => setForm((f) => ({ ...f, firstName: e.target.value }))}
                    className="h-11 rounded-lg border border-ink/15 px-3 text-small"
                  />
                  {errors.firstName ? <span className="text-red-700">{errors.firstName}</span> : null}
                </label>
                <label className="grid gap-1 text-micro md:col-span-1">
                  Last name
                  <input
                    value={form.lastName}
                    onChange={(e) => setForm((f) => ({ ...f, lastName: e.target.value }))}
                    className="h-11 rounded-lg border border-ink/15 px-3 text-small"
                  />
                  {errors.lastName ? <span className="text-red-700">{errors.lastName}</span> : null}
                </label>
                <label className="grid gap-1 text-micro md:col-span-2">
                  Address
                  <input
                    value={form.address}
                    onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
                    className="h-11 rounded-lg border border-ink/15 px-3 text-small"
                  />
                  {errors.address ? <span className="text-red-700">{errors.address}</span> : null}
                </label>
                <label className="grid gap-1 text-micro">
                  City
                  <input
                    value={form.city}
                    onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
                    className="h-11 rounded-lg border border-ink/15 px-3 text-small"
                  />
                  {errors.city ? <span className="text-red-700">{errors.city}</span> : null}
                </label>
                <label className="grid gap-1 text-micro">
                  State
                  <input
                    value={form.state}
                    onChange={(e) => setForm((f) => ({ ...f, state: e.target.value }))}
                    className="h-11 rounded-lg border border-ink/15 px-3 text-small"
                  />
                  {errors.state ? <span className="text-red-700">{errors.state}</span> : null}
                </label>
                <label className="grid gap-1 text-micro md:col-span-2">
                  ZIP code
                  <input
                    value={form.zip}
                    onChange={(e) => setForm((f) => ({ ...f, zip: e.target.value }))}
                    className="h-11 rounded-lg border border-ink/15 px-3 text-small"
                  />
                  {errors.zip ? <span className="text-red-700">{errors.zip}</span> : null}
                </label>
              </div>
            </div>
          </div>

          <div className="h-fit rounded-xl border border-line p-6">
            <p className="text-small font-medium">Order summary</p>
            <div className="mt-4 space-y-2 text-small">
              <div className="flex justify-between">
                <span className="text-muted">Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Shipping</span>
                <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
              </div>
              <div className="flex justify-between border-t border-line pt-3 font-medium">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>
            <Button type="submit" disabled={submitting} className="mt-6 w-full">
              {submitting ? "Placing order..." : "Place order"}
            </Button>
          </div>
        </form>
      </section>
    </div>
  );
}

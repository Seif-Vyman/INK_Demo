"use client";

import { useState } from "react";
import { siteConfig } from "@data/site-config";
import { ArrowUpRightIcon, CheckIcon } from "@/components/ui/icons";
import { useToastStore } from "@/lib/store/toast";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function Newsletter() {
  const { newsletter } = siteConfig.sections;
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [subscribed, setSubscribed] = useState(false);
  const pushToast = useToastStore((state) => state.push);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!emailPattern.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }
    setError(null);
    setSubscribed(true);
    pushToast(newsletter.successMessage, "success");
  };

  return (
    <section aria-labelledby="newsletter-heading" className="bg-lilac-soft">
      <div className="shell">
      <div className="grid gap-8 pb-[44px] pt-12 md:grid-cols-2 md:items-center md:gap-10 md:px-8 md:pb-[60px] md:pt-16">
        <div>
          <h2
            id="newsletter-heading"
            className="text-[36px] font-semibold leading-[1.05] tracking-[-0.04em] md:text-[48px] md:leading-[51px] md:tracking-[-0.02em]"
          >
            {newsletter.heading}
          </h2>
          <p className="mt-4 text-small leading-relaxed text-ink/65 md:mt-3 md:text-[16px] md:leading-[22px]">
            {newsletter.description}
          </p>
        </div>

        <div>
          {subscribed ? (
            <div className="flex items-center gap-3 rounded-xl bg-cream px-5 py-4">
              <span className="grid size-6 shrink-0 place-items-center rounded-full bg-lime">
                <CheckIcon width={13} height={13} />
              </span>
              <p className="text-small">{newsletter.successMessage}</p>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate>
              <div className="flex items-center rounded-xl bg-white p-2">
                <label htmlFor="newsletter-email" className="sr-only">
                  {newsletter.placeholder}
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    if (error) setError(null);
                  }}
                  placeholder={newsletter.placeholder}
                  aria-invalid={error ? true : undefined}
                  aria-describedby={error ? "newsletter-error" : undefined}
                  className="h-10 w-full min-w-0 bg-transparent px-4 text-small outline-none placeholder:text-ink/55"
                />
                <button
                  type="submit"
                  className="inline-flex h-10 shrink-0 items-center gap-2 rounded-lg bg-lime px-4 text-[13px] font-medium transition-[filter] hover:brightness-95 md:px-5"
                >
                  {newsletter.buttonLabel}
                  <ArrowUpRightIcon width={12} height={12} />
                </button>
              </div>
              {error ? (
                <p
                  id="newsletter-error"
                  role="alert"
                  className="mt-2 text-[12px] text-[#9a3412]"
                >
                  {error}
                </p>
              ) : null}
              <p className="mt-3 text-[11px] text-ink/55 md:mt-[14px]">
                {newsletter.disclaimer}
              </p>
            </form>
          )}
        </div>
      </div>
      </div>
    </section>
  );
}

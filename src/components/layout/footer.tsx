import Link from "next/link";
import { siteConfig } from "@data/site-config";
import { Logo } from "@/components/ui/logo";
import {
  ArrowUpRightIcon,
} from "@/components/ui/icons";

export function Footer() {
  const { footer } = siteConfig;

  return (
    <footer className="bg-sage">
      <div className="shell pb-5 pt-[48px] md:pb-5 md:pt-[81px]">
        <div className="grid gap-y-6 md:grid-cols-[1.75fr_1fr_1fr_0.85fr] md:gap-8">
          <div>
            <Logo size="lg" />
            <p className="mt-6 max-w-[320px] text-small leading-relaxed text-ink/75 md:mt-4 md:max-w-[352px]">
              {footer.tagline}
            </p>
            <div className="mt-4 flex items-center gap-5 md:mt-6">
              {footer.socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-micro text-ink/80 transition-colors hover:text-ink md:text-[13px]"
                >
                  {social.label}
                  <ArrowUpRightIcon width={10} height={10} />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 md:contents">
            {footer.columns.map((column) => (
              <nav key={column.title} aria-label={column.title}>
                <h2 className="text-micro font-semibold text-ink">
                  {column.title}
                </h2>
                <ul className="mt-1.5 space-y-1.5 md:mt-4 md:space-y-3">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-micro text-ink/70 transition-colors hover:text-ink"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>

          <div>
            <h2 className="text-micro font-semibold text-ink">
              {footer.hello.title}
            </h2>
            <ul className="mt-3 space-y-3 text-micro text-ink/70 md:mt-4">
              <li>
                <a
                  href={`mailto:${footer.hello.email}`}
                  className="transition-colors hover:text-ink"
                >
                  {footer.hello.email}
                </a>
              </li>
              <li>{footer.hello.hours}</li>
              <li>{footer.hello.region}</li>
            </ul>
          </div>
        </div>

        <div className="mt-[54px] border-t border-ink/15 pt-2.5 md:mt-16 md:pt-[28px]">
          <div className="flex flex-col gap-0 text-[11px] leading-tight text-ink/60 md:flex-row md:items-center md:justify-between md:gap-2">
            <p>{footer.copyright}</p>
            <ul className="flex items-center gap-3">
              {footer.legal.map((link, index) => (
                <li key={link.href} className="flex items-center gap-3">
                  <Link
                    href={link.href}
                    className="transition-colors hover:text-ink"
                  >
                    {link.label}
                  </Link>
                  {index < footer.legal.length - 1 ? (
                    <span aria-hidden className="text-ink/30">
                      ·
                    </span>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

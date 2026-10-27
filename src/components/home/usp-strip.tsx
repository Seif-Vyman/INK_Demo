import { siteConfig } from "@data/site-config";
import { BoxIcon, LaptopIcon, PaletteIcon } from "@/components/ui/icons";

const icons = {
  laptop: LaptopIcon,
  palette: PaletteIcon,
  box: BoxIcon,
};

export function UspStrip() {
  return (
    <div className="border-b border-line">
      <div className="shell">
        <ul className="flex flex-col gap-[18px] pb-[22px] pt-[40px] md:h-[120px] md:flex-row md:items-center md:justify-between md:gap-8 md:px-10 md:py-0">
          {siteConfig.usps.map((usp) => {
            const Icon = icons[usp.icon];
            return (
              <li key={usp.label} className="flex items-center gap-4">
                <Icon className="shrink-0 text-ink/80" />
                <span className="text-[13px] text-ink/80">{usp.label}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

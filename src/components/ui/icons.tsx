import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
  "aria-hidden": true,
};

export function SearchIcon(props: IconProps) {
  return (
    <svg {...base} width={20} height={20} {...props}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4.5 4.5" />
    </svg>
  );
}

export function BagIcon(props: IconProps) {
  return (
    <svg {...base} width={20} height={20} {...props}>
      <path d="M4.5 7.5h15l-1 12.5h-13z" />
      <path d="M8.5 7.5V6a3.5 3.5 0 0 1 7 0v1.5" />
    </svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <svg {...base} width={22} height={22} {...props}>
      <path d="M3 7h18M3 12h18M3 17h18" />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg {...base} width={20} height={20} {...props}>
      <path d="M5 5l14 14M19 5 5 19" />
    </svg>
  );
}

export function ArrowUpRightIcon(props: IconProps) {
  return (
    <svg {...base} width={16} height={16} {...props}>
      <path d="M6 18 18 6M8 6h10v10" />
    </svg>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <svg {...base} width={16} height={16} {...props}>
      <path d="M4 12h16M14 6l6 6-6 6" />
    </svg>
  );
}

export function PlusIcon(props: IconProps) {
  return (
    <svg {...base} width={16} height={16} {...props}>
      <path d="M12 4v16M4 12h16" />
    </svg>
  );
}

export function MinusIcon(props: IconProps) {
  return (
    <svg {...base} width={16} height={16} {...props}>
      <path d="M4 12h16" />
    </svg>
  );
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <svg {...base} width={16} height={16} {...props}>
      <path d="m5 9 7 7 7-7" />
    </svg>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <svg {...base} width={16} height={16} {...props}>
      <path d="m4 12.5 5 5L20 6" />
    </svg>
  );
}

export function HeartIcon({
  filled = false,
  ...props
}: IconProps & { filled?: boolean }) {
  return (
    <svg {...base} width={18} height={18} fill={filled ? "currentColor" : "none"} {...props}>
      <path d="M12 20s-7.5-4.4-7.5-9.4A4.1 4.1 0 0 1 12 7.6a4.1 4.1 0 0 1 7.5 3c0 5-7.5 9.4-7.5 9.4Z" />
    </svg>
  );
}

export function TrashIcon(props: IconProps) {
  return (
    <svg {...base} width={16} height={16} {...props}>
      <path d="M4 7h16M9 7V5h6v2M6 7l1 13h10l1-13" />
    </svg>
  );
}

export function LaptopIcon(props: IconProps) {
  return (
    <svg {...base} width={20} height={20} {...props}>
      <rect x="3" y="5" width="18" height="11" rx="1.5" />
      <path d="M2 19h20" />
    </svg>
  );
}

export function PaletteIcon(props: IconProps) {
  return (
    <svg {...base} width={20} height={20} {...props}>
      <path d="M12 3a9 9 0 1 0 0 18c1.4 0 2-1 2-2s-.8-1.6-.8-2.4c0-1 .8-1.6 1.8-1.6H18a3 3 0 0 0 3-3c0-4.5-4-9-9-9Z" />
      <circle cx="7.5" cy="11" r="1" fill="currentColor" stroke="none" />
      <circle cx="10" cy="7.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="14.5" cy="7.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function BoxIcon(props: IconProps) {
  return (
    <svg {...base} width={20} height={20} {...props}>
      <path d="M12 3 21 8v8l-9 5-9-5V8z" />
      <path d="M3 8l9 5 9-5M12 13v8" />
    </svg>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <svg {...base} width={16} height={16} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17" cy="7" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function TikTokIcon(props: IconProps) {
  return (
    <svg {...base} width={16} height={16} {...props}>
      <path d="M14 4v9.5a4 4 0 1 1-3.5-4" />
      <path d="M14 6.5A5 5 0 0 0 19 9" />
    </svg>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <svg {...base} width={18} height={18} {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3.5 7 8.5 6 8.5-6" />
    </svg>
  );
}

export function StarIcon(props: IconProps) {
  return (
    <svg {...base} width={14} height={14} fill="currentColor" stroke="none" {...props}>
      <path d="m12 3.5 2.6 5.4 5.9.8-4.3 4.1 1 5.9-5.2-2.8-5.2 2.8 1-5.9L3.5 9.7l5.9-.8z" />
    </svg>
  );
}

export function SpinnerIcon(props: IconProps) {
  return (
    <svg {...base} width={16} height={16} {...props}>
      <path d="M12 3a9 9 0 1 0 9 9" />
    </svg>
  );
}

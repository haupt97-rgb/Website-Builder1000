import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";

type Variant = "primary" | "secondary" | "ghost" | "light" | "outline-light";
type Size = "md" | "lg";

const base =
  "group inline-flex items-center justify-center gap-2.5 rounded-[10px] font-semibold tracking-[-0.005em] whitespace-nowrap transition-[background-color,color,border-color,box-shadow,transform] duration-200 ease-out active:translate-y-px disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    "bg-petrol-800 text-white shadow-[0_1px_0_rgb(255_255_255/0.08)_inset,0_6px_16px_-8px_rgb(18_56_61/0.6)] hover:bg-petrol-900",
  secondary:
    "border border-line-strong bg-white text-petrol-900 hover:border-petrol-700 hover:bg-sage-50",
  ghost: "text-petrol-800 hover:bg-sage-100",
  light: "bg-white text-petrol-900 hover:bg-sage-100",
  "outline-light": "border border-white/30 text-white hover:border-white/70 hover:bg-white/5",
};

const sizes: Record<Size, string> = {
  md: "min-h-11 px-4.5 text-[0.9375rem]",
  lg: "min-h-13 px-6 text-base",
};

export function buttonClasses(variant: Variant = "primary", size: Size = "md", extra = "") {
  return `${base} ${variants[variant]} ${sizes[size]} ${extra}`.trim();
}

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  /** Externer Link: öffnet in neuem Tab und kennzeichnet dies für Screenreader */
  external?: boolean;
  icon?: ReactNode;
} & Omit<ComponentPropsWithoutRef<"a">, "href" | "children">;

export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  className = "",
  external,
  icon,
  ...rest
}: ButtonLinkProps) {
  const cls = buttonClasses(variant, size, className);
  const isSpecial = href.startsWith("tel:") || href.startsWith("mailto:");

  if (external) {
    return (
      <a href={href} className={cls} target="_blank" rel="noopener" {...rest}>
        {icon}
        <span>{children}</span>
        <ArrowUpRight aria-hidden className="size-4 opacity-70 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        <span className="sr-only"> (öffnet in neuem Fenster)</span>
      </a>
    );
  }
  if (isSpecial) {
    return (
      <a href={href} className={cls} {...rest}>
        {icon}
        <span>{children}</span>
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      {icon}
      <span>{children}</span>
    </Link>
  );
}

import { site } from "@/config/site";
import { ArrowRight, ExternalIcon } from "./Icons";

type Props = {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "light";
  className?: string;
  icon?: "arrow" | "external";
  /** Für Analyse/Debug: wo der CTA sitzt */
  placement: string;
};

/** Einheitlicher Kauf-CTA. Ziel-URL kommt ausschließlich aus src/config/site.ts */
export function EtsyLink({ children, variant = "primary", className, icon = "external", placement }: Props) {
  const cls = variant === "primary" ? "btn" : variant === "secondary" ? "btn btn-secondary" : "btn btn-light";
  return (
    <a
      href={site.etsyUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`${cls} ${className ?? ""}`}
      data-cta={placement}
    >
      {children}
      {icon === "arrow" ? <ArrowRight /> : <ExternalIcon />}
      <span className="visually-hidden"> (öffnet Etsy in einem neuen Tab)</span>
    </a>
  );
}

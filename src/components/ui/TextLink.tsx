import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";

/** Sekundärer Textlink mit Pfeil, z. B. „Mehr erfahren“. */
export function ArrowLink({
  href,
  children,
  className = "",
  tone = "dark",
}: {
  href: string;
  children: ReactNode;
  className?: string;
  tone?: "dark" | "light";
}) {
  const color = tone === "light" ? "text-white" : "text-petrol-800";
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-2 font-semibold ${color} ${className}`}
    >
      <span className="link-underline">{children}</span>
      <ArrowRight
        aria-hidden
        className="size-4 transition-transform duration-200 ease-out group-hover:translate-x-1"
      />
    </Link>
  );
}

import type { ReactNode } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

type Crumb = { href: string; label: string };

/** Einheitlicher Kopfbereich für Unterseiten mit Breadcrumb. */
export function PageHero({
  eyebrow,
  title,
  intro,
  crumbs = [],
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  crumbs?: Crumb[];
  children?: ReactNode;
}) {
  return (
    <section className="border-b border-line bg-paper">
      <div className="container-page pt-8 pb-14 lg:pt-10 lg:pb-20">
        <nav aria-label="Brotkrümelnavigation">
          <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted">
            <li>
              <Link href="/" className="hover:text-petrol-800 hover:underline">Startseite</Link>
            </li>
            {crumbs.map((c) => (
              <li key={c.href} className="flex items-center gap-1.5">
                <ChevronRight aria-hidden className="size-3.5" />
                <Link href={c.href} className="hover:text-petrol-800 hover:underline">{c.label}</Link>
              </li>
            ))}
          </ol>
        </nav>
        <div className="mt-10 grid gap-8 lg:mt-14 lg:grid-cols-12">
          <div className="lg:col-span-8">
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
            <h1 className="mt-4 text-h1">{title}</h1>
            {intro && <div className="mt-6 max-w-2xl text-lead text-ink-soft">{intro}</div>}
          </div>
          {children && <div className="lg:col-span-4 lg:self-end">{children}</div>}
        </div>
      </div>
    </section>
  );
}

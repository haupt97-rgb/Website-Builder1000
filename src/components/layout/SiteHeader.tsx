"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { CalendarDays, Menu, Phone, X } from "lucide-react";
import { mainNav, serviceNav } from "@/content/navigation";
import { practice } from "@/content/practice";
import { ButtonLink } from "@/components/ui/Button";
import { Logo } from "./Logo";

function isActive(pathname: string, href: string) {
  const clean = href.split("#")[0];
  if (clean === "/") return pathname === "/";
  return pathname.startsWith(clean.replace(/\/$/, ""));
}

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  // Das Menü gilt nur für die Seite, auf der es geöffnet wurde – ein Seitenwechsel schließt es.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const setOpen = (value: boolean | ((prev: boolean) => boolean)) =>
    setOpenOn((prev) => {
      const next = typeof value === "function" ? value(prev === pathname) : value;
      return next ? pathname : null;
    });
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll sperren, Escape schließt, Fokus im Menü halten
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const panel = panelRef.current;
    panel?.querySelector<HTMLElement>("a, button")?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenOn(null);
        toggleRef.current?.focus();
      }
      if (e.key === "Tab" && panel) {
        const focusables = Array.from(panel.querySelectorAll<HTMLElement>("a, button"));
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-40 transition-[background-color,box-shadow,border-color] duration-300 ${
        // Kein backdrop-filter bei offenem Menü: er würde das fixierte Menü-Panel im Header einschließen.
        open
          ? "border-b border-line bg-paper"
          : scrolled
            ? "border-b border-line bg-paper/92 backdrop-blur-md supports-[backdrop-filter]:bg-paper/80"
            : "border-b border-transparent bg-paper"
      }`}
    >
      <div className="container-page flex h-[4.5rem] items-center justify-between gap-6 lg:h-20">
        <Logo />

        <nav aria-label="Hauptnavigation" className="hidden xl:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`relative rounded-md px-3 py-2 text-[0.9375rem] font-medium whitespace-nowrap transition-colors duration-200 ${
                      active ? "text-petrol-900" : "text-ink-soft hover:text-petrol-900"
                    }`}
                  >
                    {item.label}
                    <span
                      aria-hidden
                      className={`absolute inset-x-3 -bottom-0.5 h-px origin-left bg-petrol-800 transition-transform duration-300 ease-out ${
                        active ? "scale-x-100" : "scale-x-0"
                      }`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="hidden items-center gap-5 xl:flex">
          <a
            href={practice.phone.href}
            className="hidden items-center gap-2 text-[0.9375rem] font-semibold whitespace-nowrap text-petrol-900 hover:text-petrol-700 min-[1400px]:flex"
          >
            <Phone aria-hidden className="size-4 text-petrol-700" />
            <span className="sr-only">Telefon: </span>
            {practice.phone.display}
          </a>
          <ButtonLink href="/termin/" icon={<CalendarDays aria-hidden className="size-4" />}>
            Termin vereinbaren
          </ButtonLink>
        </div>

        <button
          ref={toggleRef}
          type="button"
          className="-mr-2 inline-flex size-12 items-center justify-center rounded-lg text-petrol-900 hover:bg-sage-100 xl:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X aria-hidden className="size-6" /> : <Menu aria-hidden className="size-6" />}
          <span className="sr-only">{open ? "Menü schließen" : "Menü öffnen"}</span>
        </button>
      </div>

      {/* Mobiles Menü */}
      <div
        id="mobile-menu"
        ref={panelRef}
        hidden={!open}
        className="fixed inset-x-0 top-[4.5rem] bottom-0 overflow-y-auto border-t border-line bg-paper lg:top-20 xl:hidden"
      >
        <nav aria-label="Mobile Navigation" className="container-page flex min-h-full flex-col pt-4 pb-10">
          <ul className="divide-y divide-line">
            <li>
              <Link href="/" className="flex min-h-14 items-center text-xl font-semibold text-petrol-900" aria-current={pathname === "/" ? "page" : undefined}>
                Startseite
              </Link>
            </li>
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(pathname, item.href) ? "page" : undefined}
                  className="flex min-h-14 items-center text-xl font-semibold text-petrol-900 aria-[current=page]:text-petrol-700"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <p className="mt-8 text-sm font-semibold tracking-[0.1em] text-muted uppercase">Service</p>
          <ul className="mt-2 grid grid-cols-1 gap-x-6 sm:grid-cols-2">
            {serviceNav.slice(1).map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="flex min-h-12 items-center text-base font-medium text-ink">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-auto grid gap-3 pt-10 sm:grid-cols-2">
            <ButtonLink href="/termin/" size="lg" icon={<CalendarDays aria-hidden className="size-5" />}>
              Termin vereinbaren
            </ButtonLink>
            <ButtonLink href={practice.phone.href} size="lg" variant="secondary" icon={<Phone aria-hidden className="size-5" />}>
              {practice.phone.display}
            </ButtonLink>
          </div>
        </nav>
      </div>
    </header>
  );
}

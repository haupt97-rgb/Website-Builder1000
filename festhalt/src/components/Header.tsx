"use client";

import { useEffect, useState } from "react";
import { site } from "@/config/site";
import { Logo } from "./Logo";
import { CloseIcon, ExternalIcon, MenuIcon } from "./Icons";
import s from "./Header.module.css";

const nav = [
  { href: "#einblick", label: "Einblick" },
  { href: "#kapitel", label: "Kapitel" },
  { href: "#vorteile", label: "Vorteile" },
  { href: "#produkt", label: "Produkt" },
  { href: "#faq", label: "FAQ" },
];

export function Header({ home = true }: { home?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const prefix = home ? "" : "/";

  return (
    <header className={`${s.header} ${scrolled || open ? s.scrolled : ""}`}>
      <div className={`container ${s.inner}`}>
        <a href={home ? "#top" : "/"} className={s.brand} aria-label={`${site.brand} – ${site.subtitle}, zur Startseite`}>
          <Logo />
        </a>

        <nav aria-label="Hauptnavigation" className={s.nav}>
          <ul>
            {nav.map((n) => (
              <li key={n.href}>
                <a href={prefix + n.href}>{n.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={s.actions}>
          <a href={site.etsyUrl} target="_blank" rel="noopener noreferrer" className={`btn ${s.cta}`} data-cta="header">
            Auf Etsy ansehen
            <ExternalIcon />
            <span className="visually-hidden"> (öffnet Etsy in einem neuen Tab)</span>
          </a>
          <button
            type="button"
            className={s.menuBtn}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
            <span className="visually-hidden">{open ? "Menü schließen" : "Menü öffnen"}</span>
          </button>
        </div>
      </div>

      <div id="mobile-nav" className={`${s.mobile} ${open ? s.mobileOpen : ""}`} hidden={!open}>
        <nav aria-label="Mobile Navigation" className="container">
          <ul>
            {nav.map((n, i) => (
              <li key={n.href} style={{ "--i": i } as React.CSSProperties}>
                <a href={prefix + n.href} onClick={() => setOpen(false)}>
                  <span className={s.tabNo}>{String(i + 1).padStart(2, "0")}</span>
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

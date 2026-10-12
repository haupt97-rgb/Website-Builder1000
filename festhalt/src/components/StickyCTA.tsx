"use client";

import { useEffect, useState } from "react";
import { site } from "@/config/site";
import { ExternalIcon } from "./Icons";
import s from "./StickyCTA.module.css";

/**
 * Dezenter Kauf-Hinweis nur auf kleinen Bildschirmen.
 * Erscheint nach dem Hero und verschwindet, sobald der Abschluss-CTA oder der Footer sichtbar ist.
 */
export function StickyCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("top");
    const final = document.getElementById("start");
    const viewer = document.getElementById("einblick");
    const footer = document.querySelector("footer");
    if (!hero) return;
    const state = { pastHero: false, nearEnd: false, inViewer: false };
    // Im Produktviewer gibt es eigene Bedienelemente und einen eigenen CTA – dort nichts überdecken
    const update = () => setVisible(state.pastHero && !state.nearEnd && !state.inViewer);

    const heroObs = new IntersectionObserver(([e]) => {
      state.pastHero = !e.isIntersecting;
      update();
    });
    heroObs.observe(hero);
    const endObs = new IntersectionObserver((entries) => {
      state.nearEnd = entries.some((e) => e.isIntersecting) || [final, footer].some((el) => el && el.getBoundingClientRect().top < window.innerHeight);
      update();
    });
    const viewerObs = new IntersectionObserver(([e]) => {
      state.inViewer = e.isIntersecting;
      update();
    }, { rootMargin: "-30% 0px -30% 0px" });
    if (viewer) viewerObs.observe(viewer);
    if (final) endObs.observe(final);
    if (footer) endObs.observe(footer);
    return () => {
      heroObs.disconnect();
      endObs.disconnect();
      viewerObs.disconnect();
    };
  }, []);

  return (
    <div className={`${s.bar} ${visible ? s.visible : ""}`} aria-hidden={!visible} inert={!visible}>
      <div className={s.text}>
        <strong>festhalt</strong>
        <span>
          {site.product.pages} Seiten · digital
        </span>
      </div>
      <a href={site.etsyUrl} target="_blank" rel="noopener noreferrer" className={`btn ${s.btn}`} data-cta="sticky">
        Auf Etsy ansehen
        <ExternalIcon />
        <span className="visually-hidden"> (öffnet Etsy in einem neuen Tab)</span>
      </a>
    </div>
  );
}

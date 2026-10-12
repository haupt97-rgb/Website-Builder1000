"use client";

import { site } from "@/config/site";
import { EtsyLink } from "./EtsyLink";
import { FolderMockup } from "./FolderMockup";
import { ClockIcon, EyeIcon, PagesIcon, PrinterIcon, DownloadIcon } from "./Icons";
import { useViewer } from "./ViewerContext";
import s from "./HeroSection.module.css";

export function HeroSection() {
  const { openAt } = useViewer();

  return (
    <section className={s.hero} aria-labelledby="hero-title" id="top">
      <div className={`container ${s.grid}`}>
        <div className={s.copy}>
          <p className="eyebrow">
            <span className="reg">01</span> Der digitale Familienordner
          </p>
          <h1 id="hero-title" className={`display ${s.title}`}>
            Gut vorbereitet.
            <br />
            <span className={s.accent}>Wenn es darauf ankommt.</span>
          </h1>
          <p className={`lead ${s.lead}`}>
            Notfallkontakte, wichtige Unterlagen und persönliche Vorsorge – übersichtlich an einem Ort. Zu Hause
            ausdrucken und in deinem eigenen Tempo ausfüllen.
          </p>

          <div className={`btn-row ${s.ctas}`}>
            <EtsyLink placement="hero" icon="arrow">
              Familienordner entdecken
            </EtsyLink>
            <a
              href="#einblick"
              className="btn btn-secondary"
              onClick={(e) => {
                e.preventDefault();
                openAt();
              }}
            >
              <EyeIcon />
              Einblick in die {site.product.pages} Seiten
            </a>
          </div>
          <p className="cta-note">Digitales Produkt · erhältlich über Etsy · kein Versand eines physischen Ordners</p>
        </div>

        <div className={s.visual}>
          <FolderMockup />
          <p className={`hand ${s.handNote}`} aria-hidden>
            {site.product.chapters} Kapitel.
            <br />
            {site.product.checklists} Checklisten.
          </p>
        </div>
      </div>

      <div className="container">
        <ul className={s.trust} aria-label="Produkteigenschaften">
          <li>
            <PagesIcon />
            <span>
              <strong>{site.product.pages} Seiten</strong> in {site.product.chapters} Kapiteln
            </span>
          </li>
          <li>
            <DownloadIcon />
            <span>
              <strong>Digitales Produkt</strong> zum Herunterladen
            </span>
          </li>
          <li>
            <PrinterIcon />
            <span>
              <strong>Zu Hause</strong> ausdruckbar
            </span>
          </li>
          <li>
            <ClockIcon />
            <span>
              <strong>Im eigenen Tempo</strong> ausfüllbar
            </span>
          </li>
        </ul>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { site } from "@/config/site";
import { EtsyLink } from "./EtsyLink";
import { CheckIcon, InfoIcon, ListCheckIcon, PagesIcon, PrinterIcon, DownloadIcon, FolderIcon } from "./Icons";
import { Reveal } from "./Reveal";
import s from "./ProductDetails.module.css";

const gallery = [
  { name: "seiten-einblick", alt: "Aufgeschlagener Familienordner mit den Seiten „Notfallkontakte“ und „Vorsorgevollmacht“, davor weitere Seiten zu Finanzen, Zugangsdaten, Familie und digitalem Nachlass", label: "Seitenansichten" },
  { name: "kapitel-uebersicht", alt: "Geöffneter Ordner mit Kapiteltrenner „Kapitel 1 – Einstieg & Überblick“ und Übersicht aller acht Kapitel", label: "Kapitel" },
  { name: "inhaltsverzeichnis", alt: "Inhaltsverzeichnis des Familienordners mit acht farbigen Kapiteln, Checklisten und wichtigen Hinweisen", label: "Inhalt" },
  { name: "checklisten", alt: "Vierzehn Checklisten-Seiten nebeneinander, unter anderem Notfallkontakte, Vorsorgevollmacht, Patientenverfügung, Pflegefall und Digitaler Nachlass", label: "Checklisten", wide: true },
  { name: "ordner-cover", alt: "Weißer Ringordner mit türkisgrünem Deckblatt „Festhalt – Der Familienordner. Alles festgehalten. Für alle Fälle.“", label: "Deckblatt" },
];

const srcSet = (name: string, wide?: boolean) =>
  wide
    ? `/images/${name}-640.webp 640w, /images/${name}-1024.webp 1024w, /images/${name}-1536.webp 1536w`
    : `/images/${name}-640.webp 640w, /images/${name}-1024.webp 1024w`;

export function ProductDetails() {
  const [active, setActive] = useState(0);
  const img = gallery[active];

  return (
    <section id="produkt" className={s.section} aria-labelledby="produkt-title">
      <div className="container">
        <Reveal className="section-head">
          <p className="eyebrow">
            <span className="reg">07</span> Das Produkt
          </p>
          <h2 id="produkt-title" className="h2">
            Festhalt – Der Familienordner
          </h2>
          <p className="lead">
            Eine digitale Vorlage mit {site.product.pages} Seiten, die du auf Etsy erwirbst, herunterlädst und zu Hause
            ausdruckst. Für einen Ordner, der genau zu deinem Leben passt.
          </p>
        </Reveal>

        <div className={s.grid}>
          <Reveal className={s.gallery}>
            <div className={`${s.mainImg} ${img.wide ? s.wide : ""}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                key={img.name}
                src={`/images/${img.name}-1024.webp`}
                srcSet={srcSet(img.name, img.wide)}
                sizes="(max-width: 960px) 100vw, 640px"
                alt={img.alt}
                width={img.wide ? 1536 : 1254}
                height={img.wide ? 1024 : 1254}
                loading="lazy"
                decoding="async"
                className={s.fadeIn}
              />
            </div>
            <div className={s.thumbs} role="group" aria-label="Produktbilder auswählen">
              {gallery.map((g, i) => (
                <button
                  key={g.name}
                  type="button"
                  className={`${s.thumb} ${i === active ? s.thumbActive : ""}`}
                  onClick={() => setActive(i)}
                  aria-pressed={i === active}
                  aria-label={`Bild ${i + 1}: ${g.label}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`/images/${g.name}-640.webp`} alt="" width={120} height={120} loading="lazy" decoding="async" />
                  <span>{g.label}</span>
                </button>
              ))}
            </div>
          </Reveal>

          <Reveal className={`paper grain ${s.info}`} delay={120}>
            <p className={s.infoKicker}>Produktinformationen</p>
            <dl className={s.facts}>
              <div>
                <dt>
                  <PagesIcon /> Umfang
                </dt>
                <dd>{site.product.pages} Seiten</dd>
              </div>
              <div>
                <dt>
                  <FolderIcon /> Aufbau
                </dt>
                <dd>
                  {site.product.chapters} Kapitel · {site.product.checklists} Checklisten
                </dd>
              </div>
              <div>
                <dt>
                  <DownloadIcon /> Lieferform
                </dt>
                <dd>Digitaler Download über Etsy</dd>
              </div>
              <div>
                <dt>
                  <ListCheckIcon /> Dateiformat
                </dt>
                <dd>{site.fileFormat ?? <span className="placeholder">Dateiformat ergänzen (z. B. PDF)</span>}</dd>
              </div>
              <div>
                <dt>
                  <PrinterIcon /> Nutzung
                </dt>
                <dd>Zu Hause ausdrucken &amp; von Hand ausfüllen</dd>
              </div>
              <div>
                <dt>
                  <InfoIcon /> Preis
                </dt>
                <dd>{site.price ?? "Aktueller Preis im Etsy-Angebot"}</dd>
              </div>
            </dl>

            <div className={s.digitalNote}>
              <InfoIcon />
              <p>
                <strong>Digitales Produkt:</strong> Es wird kein physischer Ordner verschickt. Ringordner, Papier und
                Drucker sind nicht enthalten.
              </p>
            </div>

            <ul className={s.incl}>
              <li>
                <CheckIcon /> Vorlagen zu {site.product.chapters} Lebensbereichen
              </li>
              <li>
                <CheckIcon /> Checklisten für typische Situationen
              </li>
              <li>
                <CheckIcon /> Einzelne Seiten jederzeit erneut druckbar
              </li>
            </ul>

            <EtsyLink placement="product" className={s.cta}>
              Zum Etsy-Angebot
            </EtsyLink>
            <p className="cta-note">Kauf, Zahlung und Download erfolgen über Etsy.</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

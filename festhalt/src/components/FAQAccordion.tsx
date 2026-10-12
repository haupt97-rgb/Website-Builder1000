"use client";

import { useId, useState } from "react";
import { site } from "@/config/site";
import { chapters } from "@/content/chapters";
import { PlusIcon } from "./Icons";
import { Reveal } from "./Reveal";
import s from "./FAQAccordion.module.css";

type QA = { q: string; a: React.ReactNode };

const faqs: QA[] = [
  {
    q: "Was ist Festhalt – Der Familienordner?",
    a: (
      <p>
        Festhalt ist eine digitale Vorlage mit {site.product.pages} Seiten, mit der du wichtige Informationen, Unterlagen
        und persönliche Vorsorge an einem Ort festhältst. Der Ordner ist in {site.product.chapters} Kapitel gegliedert und
        enthält {site.product.checklists} Checklisten.
      </p>
    ),
  },
  {
    q: "Handelt es sich um ein digitales oder ein physisches Produkt?",
    a: (
      <p>
        Um ein <strong>digitales Produkt</strong>. Es wird kein Ordner per Post verschickt. Du druckst die Seiten selbst
        aus; Ringordner und Papier sind nicht enthalten.
      </p>
    ),
  },
  {
    q: "Wie funktioniert der Kauf über Etsy?",
    a: (
      <p>
        Über die Buttons auf dieser Website gelangst du zum Angebot im Etsy-Shop. Dort erfolgen Bestellung, Zahlung und
        Bereitstellung der Dateien – es gelten die Bedingungen von Etsy und des Shops.
      </p>
    ),
  },
  {
    q: "Wie erhalte ich die Dateien?",
    a: (
      <>
        <p>
          Nach dem Kauf stellt Etsy dir die Dateien zum Download bereit, in der Regel in deinem Etsy-Konto unter deinen
          Käufen. Die genauen Details findest du im Etsy-Angebot.
        </p>
        {!site.fileFormat && (
          <p className="placeholder placeholder-block">
            Vor Veröffentlichung ergänzen: Dateiformat, Anzahl der Dateien und Papierformat.
          </p>
        )}
        {site.fileFormat && <p>Dateiformat: {site.fileFormat}.</p>}
      </>
    ),
  },
  {
    q: "Kann ich die Unterlagen zu Hause ausdrucken?",
    a: (
      <p>
        Ja. Der Familienordner ist zum Ausdrucken gedacht. Du kannst alle Seiten drucken oder nur die, die du gerade
        brauchst{site.paperSize ? ` – ausgelegt für ${site.paperSize}` : ""}.
      </p>
    ),
  },
  {
    q: "Kann ich den Ordner individuell ausfüllen?",
    a: (
      <>
        <p>
          Ja. Du füllst nur die Seiten aus, die für dich relevant sind, und ergänzt eigene Notizen. Nicht passende Seiten
          lässt du einfach weg.
        </p>
        {site.digitallyFillable === null && (
          <p className="placeholder placeholder-block">
            Vor Veröffentlichung ergänzen: Ist die Datei auch am Bildschirm ausfüllbar?
          </p>
        )}
        {site.digitallyFillable === true && <p>Die Datei lässt sich zusätzlich am Bildschirm ausfüllen.</p>}
      </>
    ),
  },
  {
    q: "Was ist im Produkt enthalten?",
    a: (
      <>
        <p>
          {site.product.pages} Seiten in {site.product.chapters} Kapiteln mit {site.product.checklists} Checklisten:
        </p>
        <ul className={s.chapterList}>
          {chapters.map((c) => (
            <li key={c.no}>
              <span style={{ background: c.color }}>{c.no}</span>
              {c.title}
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    q: "Ist das Produkt eine Rechtsberatung?",
    a: (
      <p>
        Nein. Festhalt ist eine organisatorische Hilfe und ersetzt keine Rechts-, Steuer- oder medizinische Beratung.
        Rechtsverbindliche Dokumente wie Vorsorgevollmacht, Patientenverfügung oder Testament sollten mit fachkundiger
        Unterstützung erstellt werden. Im Ordner kannst du festhalten, ob es sie gibt und wo sie liegen.
      </p>
    ),
  },
  {
    q: "Wie kann ich den Ordner später aktualisieren?",
    a: (
      <p>
        Weil du die Seiten selbst druckst, kannst du einzelne Blätter jederzeit neu ausdrucken und austauschen. Auf dem
        Deckblatt ist Platz für das Datum der letzten Prüfung – eine gute Erinnerung, den Ordner zum Beispiel einmal im
        Jahr durchzusehen.
      </p>
    ),
  },
];

export function FAQAccordion() {
  return (
    <section id="faq" className={s.section} aria-labelledby="faq-title">
      <div className={`container ${s.grid}`}>
        <Reveal className={s.head}>
          <p className="eyebrow">
            <span className="reg">10</span> Fragen &amp; Antworten
          </p>
          <h2 id="faq-title" className="h2">
            Gut zu wissen.
          </h2>
          <p className="lead">Die häufigsten Fragen zum Familienordner – kurz und klar beantwortet.</p>
        </Reveal>
        <div className={s.list}>
          {faqs.map((f, i) => (
            <FaqItem key={f.q} {...f} n={i + 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqItem({ q, a, n }: QA & { n: number }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <div className={`${s.item} ${open ? s.open : ""}`}>
      <h3 className={s.q}>
        <button type="button" aria-expanded={open} aria-controls={`${id}-a`} id={`${id}-q`} onClick={() => setOpen((v) => !v)}>
          <span className={s.no} aria-hidden>
            {String(n).padStart(2, "0")}
          </span>
          <span className={s.qText}>{q}</span>
          <span className={s.plus} aria-hidden>
            <PlusIcon />
          </span>
        </button>
      </h3>
      <div id={`${id}-a`} role="region" aria-labelledby={`${id}-q`} className={s.aWrap} inert={!open}>
        <div className={s.aInner}>
          <div className={s.a}>{a}</div>
        </div>
      </div>
    </div>
  );
}

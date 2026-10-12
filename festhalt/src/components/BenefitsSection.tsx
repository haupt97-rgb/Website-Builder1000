"use client";

import { useId, useState } from "react";
import { site } from "@/config/site";
import { ClockIcon, FolderIcon, PlusIcon, PrinterIcon, SearchIcon, SheetIcon, SproutIcon } from "./Icons";
import { Reveal } from "./Reveal";
import s from "./BenefitsSection.module.css";

const benefits = [
  {
    icon: <FolderIcon />,
    title: "Alles übersichtlich an einem Ort",
    short: "Wichtige Informationen und persönliche Vorsorge geordnet festhalten.",
    detail: `${site.product.chapters} Kapitel mit festen Registern geben jeder Information ihren Platz – von Notfallkontakten über Verträge bis zu persönlichen Wünschen.`,
  },
  {
    icon: <PrinterIcon />,
    title: "Selbst ausdrucken und ausfüllen",
    short: "Zu Hause drucken und handschriftlich ergänzen.",
    detail:
      "Du druckst die Seiten aus, die du brauchst, und füllst sie in Ruhe aus. Ob alle Seiten auf einmal oder nach und nach – du entscheidest.",
  },
  {
    icon: <ClockIcon />,
    title: "Im eigenen Tempo vorbereiten",
    short: "Schritt für Schritt statt alles auf einmal.",
    detail:
      "Ein Kapitel pro Wochenende oder einzelne Seiten zwischendurch: Der Ordner wächst mit dir und lässt sich bei Bedarf aktualisieren.",
  },
  {
    icon: <SearchIcon />,
    title: "Schneller wiederfinden",
    short: "Eine klare Struktur kann langes Suchen ersparen.",
    detail:
      "Farbige Register, wiederkehrende Seitenaufbauten und Checklisten helfen, die richtige Information zügig aufzuschlagen – auch für andere.",
  },
  {
    icon: <SproutIcon />,
    title: "Vorsorge aktiv angehen",
    short: "Wichtige organisatorische Fragen bewusst durchgehen.",
    detail: `${site.product.checklists} Checklisten führen durch Themen, die man gern aufschiebt – sachlich, ruhig und ohne Fachchinesisch. Der Ordner ersetzt keine Rechtsberatung.`,
  },
  {
    icon: <SheetIcon name="family" />,
    title: "Eine Hilfe für die Familie",
    short: "Informationen für Angehörige nachvollziehbar zusammenstellen.",
    detail:
      "Wenn deine Familie weiß, wo der Ordner steht, finden Angehörige wichtige Angaben, ohne Schubladen durchsuchen zu müssen.",
  },
];

export function BenefitsSection() {
  return (
    <section id="vorteile" className={s.section} aria-labelledby="vorteile-title">
      <div className="container">
        <Reveal className="section-head">
          <p className="eyebrow">
            <span className="reg">06</span> Deine Vorteile
          </p>
          <h2 id="vorteile-title" className="h2">
            Mehr als {site.product.pages} Seiten Papier.
          </h2>
          <p className="lead">Ein System, das dir hilft, den Überblick zu behalten – und anderen, ihn zu finden.</p>
        </Reveal>

        <ul className={s.grid}>
          {benefits.map((b, i) => (
            <Reveal as="li" key={b.title} delay={i * 70}>
              <BenefitCard {...b} n={i + 1} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

function BenefitCard({ icon, title, short, detail, n }: (typeof benefits)[number] & { n: number }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <article className={`${s.card} ${open ? s.open : ""}`}>
      <span className={s.clip} aria-hidden />
      <div className={s.top}>
        <span className={s.icon}>{icon}</span>
        <span className={s.no} aria-hidden>
          {String(n).padStart(2, "0")}
        </span>
      </div>
      <h3 className={s.title}>{title}</h3>
      <p className={s.short}>{short}</p>
      <div id={id} className={s.detailWrap} inert={!open}>
        <div className={s.detailInner}>
          <p className={s.detail}>{detail}</p>
        </div>
      </div>
      <button type="button" className={s.toggle} aria-expanded={open} aria-controls={id} onClick={() => setOpen((v) => !v)}>
        <span>{open ? "Weniger anzeigen" : "Mehr erfahren"}</span>
        <PlusIcon />
        <span className="visually-hidden">: {title}</span>
      </button>
    </article>
  );
}

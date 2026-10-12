import { site } from "@/config/site";
import { DownloadIcon, PrinterIcon, ExternalIcon } from "./Icons";
import { Reveal } from "./Reveal";
import s from "./HowItWorks.module.css";

const steps = [
  {
    icon: <ExternalIcon />,
    title: "Auf Etsy erwerben",
    text: "Du kaufst den Familienordner als digitales Produkt im Etsy-Shop. Zahlung und Abwicklung laufen über Etsy.",
  },
  {
    icon: <DownloadIcon />,
    title: "Dateien herunterladen",
    text: `Nach dem Kauf stellt Etsy dir die Dateien${site.fileFormat ? ` (${site.fileFormat})` : ""} gemäß den Bedingungen des Angebots zum Download bereit.`,
  },
  {
    icon: <PrinterIcon />,
    title: "Ausdrucken & ausfüllen",
    text: "Drucke die Seiten zu Hause aus, hefte sie in einen Ordner und fülle sie in deinem eigenen Tempo aus.",
  },
];

export function HowItWorks() {
  return (
    <section id="ablauf" className={s.section} aria-labelledby="ablauf-title">
      <div className="container">
        <Reveal className="section-head center">
          <p className="eyebrow">
            <span className="reg">08</span> So funktioniert es
          </p>
          <h2 id="ablauf-title" className="h2">
            In drei Schritten zum eigenen Ordner.
          </h2>
        </Reveal>
        <ol className={s.steps}>
          {steps.map((st, i) => (
            <Reveal as="li" key={st.title} delay={i * 120} className={s.step}>
              <span className={s.tab} aria-hidden>
                Schritt {i + 1}
              </span>
              <span className={s.icon}>{st.icon}</span>
              <h3 className={s.title}>
                <span className="visually-hidden">Schritt {i + 1}: </span>
                {st.title}
              </h3>
              <p className={s.text}>{st.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

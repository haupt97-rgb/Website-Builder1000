import { site } from "@/config/site";
import { CheckIcon, CloseIcon } from "./Icons";
import { Reveal } from "./Reveal";
import s from "./TrustSection.module.css";

const is = [
  "Eine organisatorische Vorsorgehilfe zum Ausdrucken und Ausfüllen",
  `Ein strukturierter Aufbau mit ${site.product.chapters} Kapiteln und ${site.product.checklists} Checklisten`,
  "Ein Ort, an dem du festhältst, wo Dokumente liegen und wen man anrufen kann",
  "Individuell nutzbar – du füllst nur aus, was für dich relevant ist",
];
const isNot = [
  "Keine Rechts-, Steuer- oder medizinische Beratung",
  "Kein Ersatz für notariell oder rechtlich wirksame Dokumente",
  "Kein physischer Ordner – es wird nichts per Post verschickt",
  "Keine Garantie, dass jede denkbare Situation abgedeckt ist",
];

export function TrustSection() {
  return (
    <section className={s.section} aria-labelledby="trust-title">
      <div className="container">
        <div className={s.grid}>
          <Reveal className={s.intro}>
            <p className="eyebrow">
              <span className="reg">09</span> Ehrlich gesagt
            </p>
            <h2 id="trust-title" className="h2">
              Was Festhalt ist – und was nicht.
            </h2>
            <p className="lead">
              Vorsorge ist ein persönliches Thema. Deshalb sagen wir klar, wofür der Familienordner gedacht ist und wo
              seine Grenzen liegen.
            </p>
          </Reveal>

          <Reveal className={`paper punched grain ${s.sheet}`} delay={120}>
            <div className={s.cols}>
              <div>
                <p className={s.colHead}>Festhalt ist …</p>
                <ul className={s.list}>
                  {is.map((t) => (
                    <li key={t}>
                      <span className={`${s.mark} ${s.yes}`} aria-hidden>
                        <CheckIcon />
                      </span>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className={s.colHead}>Festhalt ist nicht …</p>
                <ul className={s.list}>
                  {isNot.map((t) => (
                    <li key={t}>
                      <span className={`${s.mark} ${s.no}`} aria-hidden>
                        <CloseIcon />
                      </span>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <p className={s.foot}>
              Für rechtsverbindliche Vorsorge-Dokumente wie Vorsorgevollmacht, Patientenverfügung oder Testament wende dich
              bitte an eine Rechtsanwältin, einen Rechtsanwalt oder ein Notariat.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

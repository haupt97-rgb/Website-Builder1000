import { EtsyLink } from "./EtsyLink";
import { Reveal } from "./Reveal";
import s from "./FinalCTA.module.css";

export function FinalCTA() {
  return (
    <section id="start" className={s.section} aria-labelledby="final-title">
      <div className={`container ${s.grid}`}>
        <Reveal className={s.copy}>
          <p className={s.kicker}>Dein nächster Schritt</p>
          <h2 id="final-title" className={`h2 ${s.title}`}>
            Ein guter Überblick beginnt mit dem ersten Schritt.
          </h2>
          <p className={s.text}>
            Vorsorge macht nicht alles vorhersehbar. Aber sie kann helfen, Wichtiges geordnet bereitzuhalten – für dich und
            für die Menschen, die dir nahestehen. Fang mit einer Seite an.
          </p>
          <div className="btn-row">
            <EtsyLink placement="final" variant="light" icon="arrow">
              Festhalt auf Etsy entdecken
            </EtsyLink>
          </div>
          <p className={s.note}>Digitales Produkt zum Selbstausdrucken · Kauf über Etsy</p>
        </Reveal>
        <Reveal className={s.visual} delay={120}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/ordner-cover-1024.webp"
            srcSet="/images/ordner-cover-640.webp 640w, /images/ordner-cover-1024.webp 1024w"
            sizes="(max-width: 900px) 90vw, 520px"
            alt="Weißer Ringordner mit türkisgrünem Deckblatt „Festhalt – Der Familienordner“ auf einem Schreibtisch"
            width={1254}
            height={1254}
            loading="lazy"
            decoding="async"
          />
        </Reveal>
      </div>
    </section>
  );
}

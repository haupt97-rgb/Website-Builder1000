import { site } from "@/config/site";
import { Logo } from "./Logo";
import s from "./Footer.module.css";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className={s.footer}>
      <div className={`container ${s.grid}`}>
        <div className={s.brand}>
          <Logo inverted />
          <p className={s.desc}>
            Der digitale Familienordner zum Ausdrucken: {site.product.pages} Seiten, {site.product.chapters} Kapitel und{" "}
            {site.product.checklists} Checklisten, um Wichtiges geordnet festzuhalten. Keine Rechtsberatung.
          </p>
        </div>

        <nav aria-label="Produkt" className={s.col}>
          <p className={s.head}>Familienordner</p>
          <ul>
            <li>
              <a href="/#einblick">Einblick</a>
            </li>
            <li>
              <a href="/#kapitel">Kapitel</a>
            </li>
            <li>
              <a href="/#produkt">Produktdetails</a>
            </li>
            <li>
              <a href="/#faq">FAQ</a>
            </li>
            <li>
              <a href={site.etsyUrl} target="_blank" rel="noopener noreferrer">
                Etsy-Angebot<span className="visually-hidden"> (öffnet in neuem Tab)</span>
              </a>
            </li>
          </ul>
        </nav>

        <nav aria-label="Rechtliches" className={s.col}>
          <p className={s.head}>Rechtliches</p>
          <ul>
            <li>
              <a href="/impressum/">Impressum</a>
            </li>
            <li>
              <a href="/datenschutz/">Datenschutz</a>
            </li>
            <li>
              <a href="/datenschutz/#cookies">Cookies</a>
            </li>
            <li>
              <a href="/agb-widerruf/">AGB &amp; Widerruf</a>
            </li>
          </ul>
        </nav>

        <div className={s.col}>
          <p className={s.head}>Kontakt</p>
          {site.contactEmail ? (
            <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>
          ) : (
            <p>
              <span className="placeholder">Kontakt-E-Mail ergänzen</span>
            </p>
          )}
          <p className={s.small}>Fragen zu Bestellungen beantworten wir auch über das Nachrichtensystem von Etsy.</p>
        </div>
      </div>
      <div className={`container ${s.bottom}`}>
        <p>
          © {year} {site.brandDisplay} – {site.subtitle}
        </p>
        <p>Diese Website verwendet keine Tracking- oder Marketing-Cookies.</p>
      </div>
    </footer>
  );
}

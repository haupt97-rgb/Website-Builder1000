import { Footer } from "./Footer";
import { Header } from "./Header";
import s from "./LegalPage.module.css";

export function LegalPage({ title, children, draft = true }: { title: string; children: React.ReactNode; draft?: boolean }) {
  return (
    <>
      <Header home={false} />
      <main id="main" className={s.main}>
        <div className="container">
          <article className={`paper punched grain ${s.sheet}`}>
            <a href="/" className={s.back}>
              ← Zurück zur Startseite
            </a>
            <h1 className={`h2 ${s.title}`}>{title}</h1>
            {draft && (
            <p className={`placeholder placeholder-block ${s.warn}`}>
              <strong>Entwurf:</strong> Diese Seite enthält Platzhalter. Vor der Veröffentlichung mit den echten
              Betreiberangaben ergänzen und rechtlich prüfen lassen.
            </p>
            )}
            <div className={s.body}>{children}</div>
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}

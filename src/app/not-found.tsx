import { ButtonLink } from "@/components/ui/Button";
import { ArrowLink } from "@/components/ui/TextLink";

export default function NotFound() {
  return (
    <section className="py-24 lg:py-32">
      <div className="container-page max-w-3xl">
        <p className="eyebrow">Seite nicht gefunden</p>
        <h1 className="mt-4 text-h1">Diese Seite gibt es leider nicht.</h1>
        <p className="mt-6 text-lead text-ink-soft">
          Möglicherweise wurde die Seite verschoben – zum Beispiel im Zuge unseres Website-Relaunchs. Diese Seiten helfen
          Ihnen weiter:
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="/">Zur Startseite</ButtonLink>
          <ButtonLink href="/termin/" variant="secondary">Termin vereinbaren</ButtonLink>
        </div>
        <ul className="mt-10 space-y-3">
          <li><ArrowLink href="/leistungen/">Leistungen</ArrowLink></li>
          <li><ArrowLink href="/aerzteteam/">Ärzteteam</ArrowLink></li>
          <li><ArrowLink href="/kontakt/">Kontakt und Anfahrt</ArrowLink></li>
        </ul>
      </div>
    </section>
  );
}

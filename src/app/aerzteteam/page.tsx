import type { Metadata } from "next";
import { teamApproach } from "@/content/team";
import { PageHero } from "@/components/sections/PageHero";
import { TeamGrid } from "@/components/sections/TeamGrid";
import { CtaBand } from "@/components/sections/CtaBand";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Ärzteteam",
  description:
    "Dr. med. Felix Haupt, Helmut Golke und Dr. med. Sandra Sackmann – Fachärzte für Innere Medizin mit Schwerpunkt Pneumologie in Bremen.",
  path: "/aerzteteam/",
});

export default function TeamPage() {
  return (
    <>
      <PageHero
        eyebrow="Ärzteteam"
        title="Drei Fachärzte, ein gemeinsamer Anspruch"
        crumbs={[{ href: "/aerzteteam/", label: "Ärzteteam" }]}
        intro={
          <p>
            In unserer Gemeinschaftspraxis arbeiten drei Fachärzte für Innere Medizin mit Schwerpunkt Pneumologie. Sie
            bringen langjährige Erfahrung aus spezialisierten Lungenkliniken mit.
          </p>
        }
      />
      <section aria-label="Unsere Ärztinnen und Ärzte" className="py-16 lg:py-24">
        <div className="container-page">
          <TeamGrid headingLevel="h2" />
        </div>
      </section>
      <section aria-labelledby="fortbildung-heading" className="border-t border-line bg-white py-16 lg:py-24">
        <div className="container-page grid gap-8 lg:grid-cols-12">
          <h2 id="fortbildung-heading" className="text-h2 lg:col-span-5">Auf dem aktuellen Stand der Medizin</h2>
          <div className="space-y-5 text-lead text-ink-soft lg:col-span-6 lg:col-start-7">
            <p>{teamApproach}</p>
            <p>
              Unterstützt werden unsere Ärzte von unserem Praxisteam, das unter anderem die
              Lungenfunktionsmessungen durchführt und Ihre Termine koordiniert.
            </p>
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}

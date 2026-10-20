import type { Metadata } from "next";
import { practice, supervisory } from "@/content/practice";
import { doctors } from "@/content/team";
import { PageHero } from "@/components/sections/PageHero";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Impressum",
    description: "Impressum der Gemeinschaftspraxis für Lungenheilkunde Dr. Felix Haupt, Helmut Golke, Dr. Sandra Sackmann in Bremen.",
    path: "/impressum/",
  }),
  robots: { index: true, follow: true },
};

export default function ImpressumPage() {
  return (
    <>
      <PageHero title="Impressum" crumbs={[{ href: "/impressum/", label: "Impressum" }]} />
      <section className="py-14 lg:py-20">
        <div className="container-page">
          <div className="prose-page">
            <h2 className="!mt-0">Angaben gemäß § 5 DDG</h2>
            <p>
              {practice.legalName}
              <br />
              {practice.address.street}
              <br />
              {practice.address.postalCode} {practice.address.city}
            </p>
            <p>Rechtsform: Partnerschaft</p>

            <h2>Kontakt</h2>
            <p>
              Telefon: <a href={practice.phone.href}>{practice.phone.display}</a>
              <br />
              Telefax: {practice.fax.display}
              <br />
              E-Mail: <a href={`mailto:${practice.email}`}>{practice.email}</a>
            </p>

            <h2>Vertretungsberechtigte Partner</h2>
            <ul>
              {doctors.map((d) => (
                <li key={d.slug}>{d.name}</li>
              ))}
            </ul>

            <h2>Berufsbezeichnung und berufsrechtliche Regelungen</h2>
            <ul>
              {doctors.map((d) => (
                <li key={d.slug}>
                  {d.name}: {d.title.startsWith("Fachärztin") ? "Ärztin" : "Arzt"} – {d.title}
                </li>
              ))}
            </ul>
            <p>Die Berufsbezeichnungen wurden in der Bundesrepublik Deutschland verliehen.</p>
            <p>
              Zuständige Kammer: {supervisory.chamber.name}, {supervisory.chamber.address}
              <br />
              Es gelten die Heilberufsgesetze und die Berufsordnung der {supervisory.chamber.name}, einsehbar unter{" "}
              <a href={supervisory.chamber.url} target="_blank" rel="noopener">
                www.aekhb.de
              </a>
              .
            </p>
            <p>
              Zuständige Aufsichtsbehörde: {supervisory.kv.name}, {supervisory.kv.address}
            </p>

            <h2>Verantwortlich für den Inhalt</h2>
            <p>
              {doctors.map((d) => d.name).join(", ")}, Anschrift wie oben.
            </p>

          </div>
        </div>
      </section>
    </>
  );
}

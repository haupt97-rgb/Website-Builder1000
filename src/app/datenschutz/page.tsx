import type { Metadata } from "next";
import { onlineBooking, practice } from "@/content/practice";
import { doctors } from "@/content/team";
import { PageHero } from "@/components/sections/PageHero";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Datenschutz",
  description: "Datenschutzhinweise der Gemeinschaftspraxis für Lungenheilkunde in Bremen für diese Website.",
  path: "/datenschutz/",
});

export default function DatenschutzPage() {
  return (
    <>
      <PageHero title="Datenschutzhinweise" crumbs={[{ href: "/datenschutz/", label: "Datenschutz" }]}
        intro={<p>Informationen zur Verarbeitung personenbezogener Daten beim Besuch dieser Website.</p>}
      />
      <section className="py-14 lg:py-20">
        <div className="container-page">
          <div className="prose-page">
            <h2 className="!mt-0">1. Verantwortliche Stelle</h2>
            <p>
              {practice.legalName}
              <br />
              {practice.address.street}, {practice.address.postalCode} {practice.address.city}
              <br />
              Telefon: {practice.phone.display} · E-Mail: <a href={`mailto:${practice.email}`}>{practice.email}</a>
            </p>
            <p>Vertreten durch: {doctors.map((d) => d.name).join(", ")}.</p>

            <h2>2. Grundsätze dieser Website</h2>
            <p>
              Diese Website ist bewusst datensparsam gestaltet. Sie verwendet keine Cookies, keine Analyse- oder
              Tracking-Dienste, keine Werbe-Netzwerke und keine eingebetteten Inhalte von Drittanbietern wie Karten, Videos
              oder Social-Media-Plugins. Schriftarten werden von unserem eigenen Server geladen; beim Seitenaufruf werden
              keine Daten an Schriftarten-Anbieter übertragen.
            </p>

            <h2>3. Bereitstellung der Website (Server-Logfiles)</h2>
            <p>
              Beim Aufruf der Website verarbeitet der Webserver technisch notwendige Daten, etwa IP-Adresse, Datum und
              Uhrzeit des Abrufs, aufgerufene Seite, übertragene Datenmenge sowie Browser- und Betriebssysteminformationen.
              Die Verarbeitung erfolgt zur sicheren und stabilen Bereitstellung der Website auf Grundlage von Art. 6 Abs. 1
              lit. f DSGVO.
            </p>

            <h2>4. Kontaktaufnahme</h2>
            <p>
              Wenn Sie uns per Telefon oder E-Mail kontaktieren, verarbeiten wir Ihre Angaben zur Bearbeitung Ihres
              Anliegens (Art. 6 Abs. 1 lit. b DSGVO bzw. bei Gesundheitsdaten Art. 9 Abs. 2 lit. h DSGVO). Bitte beachten
              Sie, dass E-Mails in der Regel unverschlüsselt übertragen werden. Senden Sie uns daher keine Befunde oder
              anderen sensiblen Gesundheitsdaten per E-Mail.
            </p>

            <h2>5. Externe Links und Online-Terminbuchung</h2>
            <p>
              Die {onlineBooking.label} sowie die Links zur Routenplanung (Google Maps, OpenStreetMap) und zur Deutschen
              Atemwegsliga führen zu Angeboten anderer Anbieter. Daten werden an diese Anbieter erst übertragen, wenn Sie
              den jeweiligen Link aktiv anklicken. Für die Verarbeitung auf diesen Seiten gelten die Datenschutzhinweise der
              jeweiligen Anbieter.
            </p>

            <h2>6. Ihre Rechte</h2>
            <p>
              Sie haben das Recht auf Auskunft, Berichtigung, Löschung und Einschränkung der Verarbeitung Ihrer Daten, auf
              Datenübertragbarkeit sowie auf Widerspruch gegen die Verarbeitung (Art. 15–21 DSGVO). Außerdem können Sie sich
              bei einer Datenschutz-Aufsichtsbehörde beschweren, in Bremen bei der Landesbeauftragten für Datenschutz und
              Informationsfreiheit.
            </p>

            <h2>7. Datenschutz in der Praxis</h2>
            <p>
              Informationen zur Verarbeitung Ihrer Daten im Rahmen der Behandlung erhalten Sie in unserer Praxis. Sprechen
              Sie uns gern an.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

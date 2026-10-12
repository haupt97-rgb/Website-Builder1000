import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = { title: "Datenschutzerklärung", robots: { index: false }, alternates: { canonical: "/datenschutz/" } };

const P = ({ children }: { children: React.ReactNode }) => <span className="placeholder">{children}</span>;

export default function Datenschutz() {
  return (
    <LegalPage title="Datenschutzerklärung">
      <p>
        Die folgenden Abschnitte beschreiben den technischen Stand dieser Website. Sie ersetzen keine rechtlich geprüfte
        Datenschutzerklärung.
      </p>
      <h2>1. Verantwortliche Stelle</h2>
      <p>
        <P>Name, Anschrift und E-Mail-Adresse des Verantwortlichen (wie im Impressum)</P>
      </p>
      <h2>2. Hosting und Server-Logfiles</h2>
      <p>
        Beim Aufruf der Website verarbeitet der Hosting-Anbieter technisch notwendige Daten (z. B. IP-Adresse, Zeitpunkt,
        aufgerufene Seite, Browsertyp), um die Website auszuliefern und abzusichern.
      </p>
      <p>
        <P>Hosting-Anbieter, Speicherdauer der Logfiles, Rechtsgrundlage (z. B. Art. 6 Abs. 1 lit. f DSGVO) und ggf. Auftragsverarbeitungsvertrag ergänzen</P>
      </p>
      <h2 id="cookies">3. Cookies, Tracking und Analyse</h2>
      <p>
        Diese Website setzt in ihrer aktuellen Fassung <strong>keine Cookies</strong> und bindet{" "}
        <strong>keine Analyse- oder Marketingdienste</strong> ein. Ein Cookie-Banner ist daher derzeit nicht erforderlich.
        Werden später solche Dienste ergänzt, dürfen sie erst nach einer Einwilligung geladen werden; diese Erklärung ist
        dann anzupassen.
      </p>
      <h2>4. Schriftarten</h2>
      <p>
        Die verwendeten Schriftarten werden lokal von dieser Website ausgeliefert. Beim Seitenaufruf findet keine
        Verbindung zu Servern von Google oder anderen Schriftanbietern statt.
      </p>
      <h2>5. Links zu Etsy</h2>
      <p>
        Die Kauf-Buttons verlinken auf Etsy. Erst wenn du einen solchen Link anklickst, wird Etsy aufgerufen; ab dann gilt
        die Datenschutzerklärung von Etsy. Kauf, Zahlung und Bereitstellung der Dateien erfolgen ausschließlich über Etsy.
      </p>
      <h2>6. Kontakt per E-Mail</h2>
      <p>
        Wenn du uns per E-Mail kontaktierst, verarbeiten wir deine Angaben, um deine Anfrage zu beantworten.{" "}
        <P>Rechtsgrundlage und Speicherdauer ergänzen</P>
      </p>
      <h2>7. Deine Rechte</h2>
      <p>
        Du hast das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und
        Widerspruch sowie das Recht auf Beschwerde bei einer Datenschutz-Aufsichtsbehörde.{" "}
        <P>Zuständige Aufsichtsbehörde ergänzen</P>
      </p>
      <p>
        Stand: <P>Datum</P>
      </p>
    </LegalPage>
  );
}

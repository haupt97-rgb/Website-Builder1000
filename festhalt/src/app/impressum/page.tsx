import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = { title: "Impressum", robots: { index: false }, alternates: { canonical: "/impressum/" } };

const P = ({ children }: { children: React.ReactNode }) => <span className="placeholder">{children}</span>;

export default function Impressum() {
  return (
    <LegalPage title="Impressum">
      <h2>Angaben gemäß § 5 DDG</h2>
      <p>
        <P>Vor- und Nachname bzw. Firmenname</P>
        <br />
        <P>Straße und Hausnummer</P>
        <br />
        <P>PLZ und Ort</P>
      </p>
      <h2>Kontakt</h2>
      <p>
        E-Mail: <P>E-Mail-Adresse</P>
        <br />
        Telefon (optional): <P>Telefonnummer</P>
      </p>
      <h2>Umsatzsteuer</h2>
      <p>
        Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG: <P>USt-IdNr. oder Hinweis auf Kleinunternehmerregelung</P>
      </p>
      <h2>Verantwortlich für den Inhalt</h2>
      <p>
        <P>Name und Anschrift (sofern erforderlich, z. B. nach § 18 Abs. 2 MStV)</P>
      </p>
      <h2>Verbraucherstreitbeilegung</h2>
      <p>
        <P>Hinweis zur Teilnahme bzw. Nichtteilnahme an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle</P>
      </p>
    </LegalPage>
  );
}

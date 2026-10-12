import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { site } from "@/config/site";

export const metadata: Metadata = { title: "AGB & Widerruf", robots: { index: false }, alternates: { canonical: "/agb-widerruf/" } };

const P = ({ children }: { children: React.ReactNode }) => <span className="placeholder">{children}</span>;

export default function AgbWiderruf() {
  return (
    <LegalPage title="AGB & Widerrufsinformationen">
      <p>
        Über diese Website selbst wird nichts verkauft. Der Kauf von „festhalt – Der Familienordner“ erfolgt ausschließlich
        über{" "}
        <a href={site.etsyUrl} target="_blank" rel="noopener noreferrer">
          Etsy
        </a>
        . Dort gelten die Nutzungsbedingungen von Etsy sowie die Richtlinien und rechtlichen Angaben des Shops.
      </p>
      <h2>Widerrufsrecht bei digitalen Inhalten</h2>
      <p>
        <P>Widerrufsbelehrung für digitale Inhalte bzw. Hinweis, wo sie im Etsy-Shop zu finden ist, ergänzen und rechtlich prüfen lassen</P>
      </p>
      <h2>Allgemeine Geschäftsbedingungen</h2>
      <p>
        <P>Eigene AGB nur ergänzen, falls erforderlich – ansonsten auf die Shop-Richtlinien bei Etsy verweisen</P>
      </p>
      <h2>Nutzungsrechte</h2>
      <p>
        <P>Bestätigte Lizenz- bzw. Nutzungsbedingungen der Vorlage (z. B. nur private Nutzung) ergänzen</P>
      </p>
    </LegalPage>
  );
}

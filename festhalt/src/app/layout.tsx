import type { Metadata, Viewport } from "next";
import { Fraunces, Figtree } from "next/font/google";
import { site } from "@/config/site";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  axes: ["opsz", "SOFT"],
  display: "swap",
});
const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
  display: "swap",
});

const title = "festhalt – Der Familienordner | Digitaler Vorsorge- & Notfallordner zum Ausdrucken";
const description = `Der digitale Familienordner mit ${site.product.pages} Seiten, ${site.product.chapters} Kapiteln und ${site.product.checklists} Checklisten: Notfallkontakte, wichtige Unterlagen und persönliche Vorsorge an einem Ort. Zu Hause ausdrucken und ausfüllen.`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: title, template: "%s | festhalt – Der Familienordner" },
  description,
  applicationName: "festhalt",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: "festhalt – Der Familienordner",
    title,
    description,
    url: "/",
    images: [{ url: "/images/og-image.jpg", width: 1200, height: 630, alt: "Aufgeschlagener festhalt-Familienordner mit Notfallkontakten und Vorsorgevollmacht" }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/images/og-image.jpg"] },
  icons: { icon: "/favicon.svg" },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#0F766E",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${fraunces.variable} ${figtree.variable}`}>
      <body>
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <a href="#main" className="skip-link">
          Zum Inhalt springen
        </a>
        {children}
      </body>
    </html>
  );
}

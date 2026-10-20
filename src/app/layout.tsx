import type { Metadata, Viewport } from "next";
import "@fontsource-variable/manrope/wght.css";
import "./globals.css";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { RevealObserver } from "@/components/ui/Reveal";
import { practice } from "@/content/practice";
import { clinicJsonLd, siteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Lungenärzte Bremen – Gemeinschaftspraxis für Lungenheilkunde",
    template: `%s | ${practice.name}`,
  },
  description:
    "Fachärztliche Pneumologie in Bremen: Lungenfunktion, Asthma und Allergologie, COPD, Schlafapnoe-Diagnostik und Gutachten. Dr. Felix Haupt, Helmut Golke, Dr. Sandra Sackmann.",
  applicationName: practice.name,
  formatDetection: { telephone: false },
  openGraph: {
    siteName: practice.name,
    locale: "de_DE",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#f8f8f5",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de" suppressHydrationWarning>
      <head>
        {/* Aktiviert Einblend-Animationen nur, wenn JavaScript verfügbar ist */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(clinicJsonLd()) }}
        />
      </head>
      <body className="flex min-h-dvh flex-col pb-[calc(4.5rem+env(safe-area-inset-bottom))] xl:pb-0">
        <a
          href="#inhalt"
          className="sr-only z-50 rounded-md bg-petrol-800 px-4 py-3 font-semibold text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Zum Inhalt springen
        </a>
        <SiteHeader />
        <main id="inhalt" className="flex-1" tabIndex={-1}>
          {children}
        </main>
        <SiteFooter />
        <MobileActionBar />
        <RevealObserver />
      </body>
    </html>
  );
}

# Übergabe: festhalt – Der Familienordner (Website)

## Anleitung für Claude (bitte zuerst lesen)

Dieses Dokument enthält den **kompletten Quellcode** einer fertigen, getesteten Website. Sie wurde in einer Claude-Code-Session gebaut.
Ziel der Website: Die Produktseite für „festhalt – Der Familienordner“, einen digitalen Vorsorge- und Notfallordner mit 78 Seiten, 8 Kapiteln und 28 Checklisten. Das Produkt wird über **Etsy** verkauft, und die Website soll Besucher zum Etsy-Kauf führen.

**Stack:** Next.js 16 (App Router, statischer Export nach `out/`), React 19, TypeScript, CSS Modules, Framer Motion 14, Schriften Fraunces und Figtree über `next/font`.
**Leitidee:** Die Website fühlt sich an wie ein Ringordner, den man öffnet und durchblättert. Dazu gehören Register, Lochungen, Papierblätter und Umblätter-Animationen.
**Markenfarbe:** #0F766E. Die Website duzt die Besucher, die Produktseiten selbst siezen.

### Wichtige Regeln, die beim Weiterarbeiten gelten sollen
- **Nichts erfinden:** keinen Preis, keine Bewertungen, keine Verkaufszahlen, keine Rabatte und keine Rechtsversprechen.
- Unbestätigte Angaben stehen in `src/config/site.ts` als `null`. Die Website zeigt dafür neutrale Texte oder gelb gestreifte Platzhalter (CSS-Klasse `.placeholder`).
- **Bestätigt** sind: 78 Seiten, 8 Kapitel, 28 Checklisten, digitales Produkt zum Herunterladen und Ausdrucken, Verkauf über Etsy.
- **Offen** sind: der direkte Etsy-Link, Dateiformat, Papierformat, ob die Datei am Bildschirm ausfüllbar ist, Preis, Kontakt, Domain sowie Impressum und Datenschutz.
- Die Vorschauseiten im Viewer (`src/content/sheets.ts`) sind nachgebaut und als „Vorschau“ gekennzeichnet. Sobald echte Seitenbilder vorliegen, wird pro Blatt `image` gesetzt.
- Das Produkt ist **keine Rechtsberatung**. Die Texte sind sachlich und empathisch gehalten, ohne Angstwerbung.
- Barrierefreiheit (WCAG 2.2 AA) und `prefers-reduced-motion` müssen erhalten bleiben. Das sichert der Hook `src/lib/useReducedMotionSafe.ts`.

### Stand der Prüfung
- 23 automatisierte Playwright-Interaktionstests bestanden, mit und ohne reduzierte Bewegung.
- axe-core findet 0 Verstöße.
- Kein horizontales Scrollen bei 390 px und 1440 px.

### Projekt lokal einrichten
1. Alle Dateien unten mit genau den angegebenen Pfaden anlegen. Das Projekt liegt im Ordner `festhalt/`.
2. Bilder ergänzen (siehe Liste am Ende). Die Originale gehören nach `assets/source/`, danach `npm run images` ausführen.
3. Dann diese Befehle ausführen:
```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # statischer Export nach out/
```
`package-lock.json` ist wegen der Größe nicht enthalten. `npm install` erzeugt ihn neu. Bewährte Versionen: next 16.4.0, react und react-dom 19.2.0, framer-motion 14.1.0, typescript 5.9.3, sharp 0.35.5.

## Dateiübersicht

- `.gitignore`
- `README.md`
- `next.config.mjs`
- `package.json`
- `public/favicon.svg`
- `scripts/optimize-images.mjs`
- `src/app/agb-widerruf/page.tsx`
- `src/app/datenschutz/page.tsx`
- `src/app/globals.css`
- `src/app/impressum/page.tsx`
- `src/app/layout.tsx`
- `src/app/not-found.tsx`
- `src/app/page.tsx`
- `src/app/robots.ts`
- `src/app/sitemap.ts`
- `src/components/BenefitsSection.module.css`
- `src/components/BenefitsSection.tsx`
- `src/components/ChapterTabs.module.css`
- `src/components/ChapterTabs.tsx`
- `src/components/EtsyLink.tsx`
- `src/components/FAQAccordion.module.css`
- `src/components/FAQAccordion.tsx`
- `src/components/FinalCTA.module.css`
- `src/components/FinalCTA.tsx`
- `src/components/FolderMockup.module.css`
- `src/components/FolderMockup.tsx`
- `src/components/Footer.module.css`
- `src/components/Footer.tsx`
- `src/components/Header.module.css`
- `src/components/Header.tsx`
- `src/components/HeroSection.module.css`
- `src/components/HeroSection.tsx`
- `src/components/HowItWorks.module.css`
- `src/components/HowItWorks.tsx`
- `src/components/Icons.tsx`
- `src/components/InteractiveDocumentViewer.module.css`
- `src/components/InteractiveDocumentViewer.tsx`
- `src/components/LegalPage.module.css`
- `src/components/LegalPage.tsx`
- `src/components/Logo.module.css`
- `src/components/Logo.tsx`
- `src/components/PaperSheet.module.css`
- `src/components/PaperSheet.tsx`
- `src/components/ProblemSolution.module.css`
- `src/components/ProblemSolution.tsx`
- `src/components/ProductDetails.module.css`
- `src/components/ProductDetails.tsx`
- `src/components/Reveal.tsx`
- `src/components/StickyCTA.module.css`
- `src/components/StickyCTA.tsx`
- `src/components/TrustSection.module.css`
- `src/components/TrustSection.tsx`
- `src/components/ViewerContext.tsx`
- `src/config/site.ts`
- `src/content/chapters.ts`
- `src/content/sheets.ts`
- `src/lib/useReducedMotionSafe.ts`
- `tsconfig.json`

## Quellcode

### `.gitignore`

```
node_modules/
.next/
out/
next-env.d.ts
*.tsbuildinfo
```

### `README.md`

````markdown
# festhalt – Der Familienordner · Website

Interaktive Produktwebsite für den digitalen Vorsorge- und Notfallordner **festhalt** (78 Seiten, Verkauf über Etsy).
Leitidee: Die Website fühlt sich an wie ein Ringordner, den man öffnet, durchblättert und entdeckt.

## Technik

- **Next.js 16** (App Router, statischer Export → `out/`), **React 19**, **TypeScript**
- **CSS Modules** + globales Designsystem (`src/app/globals.css`), keine UI-Bibliothek
- **Framer Motion** für Seitenumblättern, Scroll-Story und Parallax
- Schriften **Fraunces** (Überschriften) und **Figtree** (Text), über `next/font` lokal ausgeliefert, also ohne Verbindung zu Google
- Keine Cookies, kein Tracking, keine externen Skripte

```bash
npm install
npm run dev        # Entwicklung: http://localhost:3000
npm run build      # statischer Export nach ./out
npm run images     # Produktbilder aus assets/source → public/images (WebP, mehrere Breiten)
npm run lint       # TypeScript-Prüfung
```

Der Ordner `out/` lässt sich auf jedem Static-Hosting veröffentlichen, z. B. Netlify, Vercel, GitHub Pages oder einem klassischen Webspace.

## Aufbau

| Bereich | Komponente |
| --- | --- |
| Header, mobiles Menü | `Header.tsx` |
| Hero mit animiertem 3D-Ordner | `HeroSection.tsx`, `FolderMockup.tsx` |
| Problem → Lösung (Scroll-Story) | `ProblemSolution.tsx` |
| Produktviewer (Blättern, Register, Zoom, Vollbild, Tastatur, Swipe) | `InteractiveDocumentViewer.tsx`, `ViewerContext.tsx` |
| Registersystem / Kapitel | `ChapterTabs.tsx` |
| Vorteile (aufklappbare Dokumentkarten) | `BenefitsSection.tsx` |
| Produktdetails + Galerie | `ProductDetails.tsx` |
| So funktioniert es | `HowItWorks.tsx` |
| Transparenz („Was Festhalt ist – und was nicht“) | `TrustSection.tsx` |
| FAQ | `FAQAccordion.tsx` |
| Abschluss-CTA, Footer, mobiler Sticky-CTA | `FinalCTA.tsx`, `Footer.tsx`, `StickyCTA.tsx` |
| Rechtliche Seiten (Entwürfe) | `src/app/impressum`, `datenschutz`, `agb-widerruf` |

**Inhalte und Konfiguration** liegen an drei Stellen:

- `src/config/site.ts`: **Etsy-URL**, Preis, Dateiformat, Kontakt und weitere Produktangaben. Alle Kauf-Buttons lesen den Link von hier.
- `src/content/chapters.ts`: die 8 Kapitel mit Themen und Registerfarben, übernommen aus dem Produktmaterial
- `src/content/sheets.ts`: die Vorschaublätter im Viewer

## Checkliste vor dem Go-live

Werte, die nicht bestätigt waren, wurden **nicht erfunden**. Sie erscheinen auf der Website als gelb gestreifte Platzhalter oder werden neutral formuliert.

- [ ] **Etsy-Link**: In `src/config/site.ts` → `etsyUrl` den direkten Link zum Angebot eintragen (`…/listing/…`). Bis dahin führt der Link zur Etsy-Suche nach „festhalt familienordner“.
- [ ] **Dateiformat / Papierformat / am Bildschirm ausfüllbar?**: `fileFormat`, `paperSize` und `digitallyFillable` setzen. Dadurch verschwinden die Platzhalter im Produktbereich und in den FAQ.
- [ ] **Preis** (optional): `price` nur eintragen, wenn er dauerhaft mit Etsy übereinstimmt. Sonst bleibt der Hinweis „Aktueller Preis im Etsy-Angebot“.
- [ ] **Kontakt-E-Mail**: `contactEmail`
- [ ] **Domain**: `url` (für Canonical, Open Graph und Sitemap)
- [ ] **Impressum, Datenschutz, AGB & Widerruf**: Platzhalter durch echte Angaben ersetzen und rechtlich prüfen lassen. Die Datenschutzseite beschreibt den technischen Ist-Stand: keine Cookies und kein Tracking.
- [ ] **Logo**: Die Wortmarke mit Ordnersymbol ist nach dem Produktmaterial nachgebaut (`Logo.tsx`, `public/favicon.svg`). Liegt eine Original-Logodatei vor, bitte dort einsetzen.
- [ ] **Echte Seitenbilder für den Viewer**: Die 16 Vorschaublätter sind auf Basis der Checklisten-Übersicht nachgestaltet und auf der Website als „Vorschau“ gekennzeichnet. Das Blatt „Haustier-Notfall“ ist frei gestaltet, weil es dazu keine Vorlage gab. Mit echten Seitenexporten (PNG/WebP) einfach `image: "/images/seiten/…"` beim jeweiligen Blatt in `sheets.ts` setzen. Der Viewer zeigt dann das Original.
- [ ] **Kapitelinhalte prüfen**: Stimmen Themen und Beschreibungen in `chapters.ts` mit der finalen Produktdatei überein?
- [ ] **Produktbilder**: Die 5 Mock-ups liegen in `assets/source/`. Neue Bilder dort ablegen und `npm run images` ausführen.
- [ ] Werden später Analyse- oder Marketing-Tools ergänzt, dürfen sie **erst nach Einwilligung** geladen werden. Dann braucht es einen Consent-Banner und eine angepasste Datenschutzerklärung.

## Qualitätssicherung (Stand der Umsetzung)

- Automatisierte Interaktionstests (Playwright) mit und ohne `prefers-reduced-motion`: Viewer (Pfeiltasten, Home/End, Buttons, Register, Leiste, Zoom, Vollbild mit Esc und Fokus-Rückgabe), Kapitel-Tabs (Klick und Pfeiltasten), Vorteile, FAQ, alle Etsy-CTAs, interne Anker, Rechtsseiten: alle bestanden, keine Konsolenfehler
- axe-core (WCAG 2.2 AA + Best Practices) auf Desktop, Mobil und Unterseiten: 0 Verstöße
- Kein horizontales Scrollen bei 390 px und 1440 px
- Bei reduzierter Bewegung: Der Ordner ist sofort geöffnet, die Seiten wechseln ohne Umblättern, und statt der Scroll-Story erscheint eine statische Vorher/Nachher-Ansicht.
````

### `next.config.mjs`

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Statischer Export: die Website läuft ohne Server auf jedem Hosting (Netlify, Vercel, GitHub Pages, Webspace …)
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
  poweredByHeader: false,
};
export default nextConfig;
```

### `package.json`

```json
{
  "name": "festhalt-website",
  "version": "1.0.0",
  "private": true,
  "description": "festhalt – Der Familienordner. Interaktive Produktwebsite.",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "npx serve out",
    "lint": "tsc --noEmit",
    "images": "node scripts/optimize-images.mjs"
  },
  "dependencies": {
    "framer-motion": "^14.1.0",
    "next": "^16.4.0",
    "react": "^19.2.0",
    "react-dom": "^19.2.0"
  },
  "devDependencies": {
    "@types/node": "^22.20.5",
    "@types/react": "^19.3.0",
    "@types/react-dom": "^19.3.0",
    "sharp": "^0.35.5",
    "typescript": "^5.9.3"
  }
}
```

### `public/favicon.svg`

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="8" fill="#0F766E"/><g fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M7 12v-1.6A1.6 1.6 0 0 1 8.6 8.8h4.4l1.9 2.1h8.6A1.6 1.6 0 0 1 25 12.5v.7"/><path d="M6.6 14.8a1.2 1.2 0 0 1 1.2-1.4h16.6a1.2 1.2 0 0 1 1.2 1.5l-1.6 7.2a1.6 1.6 0 0 1-1.6 1.2H9.3a1.6 1.6 0 0 1-1.6-1.3z"/></g></svg>
```

### `scripts/optimize-images.mjs`

```js
// Erzeugt optimierte WebP-Varianten aus assets/source/*.jpg
// Ausgabe: public/images/<name>-<breite>.webp (+ og-image.jpg)
import sharp from "sharp";
import { readdir, mkdir } from "node:fs/promises";
import path from "node:path";

const SRC = path.resolve("assets/source");
const OUT = path.resolve("public/images");
const WIDTHS = [640, 1024, 1536];

await mkdir(OUT, { recursive: true });
for (const file of await readdir(SRC)) {
  if (!/\.(jpe?g|png)$/i.test(file)) continue;
  const name = file.replace(/\.[^.]+$/, "");
  const img = sharp(path.join(SRC, file));
  const { width } = await img.metadata();
  for (const w of WIDTHS) {
    if (w > width && w !== WIDTHS[0]) continue;
    const target = Math.min(w, width);
    await img.clone().resize({ width: target }).webp({ quality: 78 }).toFile(path.join(OUT, `${name}-${w}.webp`));
  }
  // Social-Preview
  if (name === "seiten-einblick") {
    await img.clone().resize({ width: 1200, height: 630, fit: "cover", position: "top" }).jpeg({ quality: 82, mozjpeg: true }).toFile(path.join(OUT, "og-image.jpg"));
  }
  console.log("✓", name, width);
}
```

### `src/app/agb-widerruf/page.tsx`

```tsx
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
```

### `src/app/datenschutz/page.tsx`

```tsx
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
```

### `src/app/globals.css`

```css
/* ==========================================================================
   festhalt – Designsystem
   ========================================================================== */

:root {
  /* Marke */
  --brand: #0f766e;
  --brand-600: #0d6961;
  --brand-700: #0b5a53;
  --brand-800: #094842;
  --brand-50: #eaf4f2;
  --brand-100: #d3e9e5;

  /* Papier & Raum */
  --paper: #fffdf8;
  --cream: #faf6ee;
  --sand: #f1e9db;
  --sand-200: #e7dcc8;
  --sand-300: #d9cab0;
  --sage: #dfe8e1;
  --mint: #e6f2ee;

  /* Text */
  --ink: #23292b;
  --ink-soft: #4a5457;
  --ink-mute: #677174;
  --line: #e4ddd0;
  --line-strong: #cfc6b6;

  /* Effekte */
  --shadow-sm: 0 1px 2px rgba(35, 41, 43, 0.06), 0 2px 6px rgba(35, 41, 43, 0.05);
  --shadow-md: 0 2px 4px rgba(35, 41, 43, 0.05), 0 10px 24px -6px rgba(35, 41, 43, 0.14);
  --shadow-lg: 0 4px 8px rgba(35, 41, 43, 0.05), 0 24px 48px -12px rgba(35, 41, 43, 0.22);
  --shadow-paper: 0 1px 0 rgba(255, 255, 255, 0.8) inset, 0 1px 2px rgba(35, 41, 43, 0.08), 0 12px 28px -10px rgba(35, 41, 43, 0.18);

  --radius-sm: 6px;
  --radius: 12px;
  --radius-lg: 20px;

  --ease-out: cubic-bezier(0.22, 0.61, 0.36, 1);
  --ease-paper: cubic-bezier(0.3, 0.7, 0.2, 1);
  --dur-fast: 180ms;
  --dur: 280ms;
  --dur-slow: 450ms;

  --container: 1200px;
  --gutter: clamp(16px, 4vw, 40px);

  --font-serif: var(--font-fraunces), "Iowan Old Style", Georgia, serif;
  --font-sans: var(--font-figtree), system-ui, -apple-system, "Segoe UI", sans-serif;

  --header-h: 68px;
}

/* ---------- Reset & Basis ---------- */
*,
*::before,
*::after {
  box-sizing: border-box;
}
html {
  -webkit-text-size-adjust: 100%;
  scroll-behavior: smooth;
  scroll-padding-top: calc(var(--header-h) + 16px);
}
@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
body {
  margin: 0;
  background: var(--cream);
  color: var(--ink);
  font-family: var(--font-sans);
  font-size: 1.0625rem;
  line-height: 1.65;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  overflow-x: clip;
}
img,
svg {
  display: block;
  max-width: 100%;
}
img {
  height: auto;
}
button {
  font: inherit;
  color: inherit;
}
a {
  color: var(--brand-700);
  text-underline-offset: 3px;
}
h1,
h2,
h3,
h4 {
  margin: 0;
  color: var(--ink);
  line-height: 1.15;
  font-weight: 600;
  text-wrap: balance;
}
p {
  margin: 0;
  text-wrap: pretty;
}
ul {
  margin: 0;
  padding: 0;
}

:focus-visible {
  outline: 3px solid var(--brand);
  outline-offset: 3px;
  border-radius: 4px;
}

.visually-hidden {
  position: absolute !important;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.skip-link {
  position: absolute;
  left: 16px;
  top: -100px;
  z-index: 200;
  padding: 10px 16px;
  background: var(--brand);
  color: #fff;
  border-radius: var(--radius-sm);
  font-weight: 600;
  text-decoration: none;
}
.skip-link:focus {
  top: 12px;
}

/* Papierkorn: sehr dezente Textur ohne Bilddatei */
.grain {
  position: relative;
}
.grain::after {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.35;
  mix-blend-mode: multiply;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.45  0 0 0 0 0.4  0 0 0 0 0.3  0 0 0 0.05 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
  border-radius: inherit;
}

/* ---------- Layout ---------- */
.container {
  width: 100%;
  max-width: calc(var(--container) + 2 * var(--gutter));
  margin-inline: auto;
  padding-inline: var(--gutter);
}
.section {
  padding-block: clamp(72px, 10vw, 128px);
}
.section-head {
  max-width: 720px;
  margin-bottom: clamp(36px, 5vw, 56px);
}
.section-head.center {
  margin-inline: auto;
  text-align: center;
}

/* ---------- Typografie ---------- */
.eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 0.8125rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--brand-700);
  margin-bottom: 16px;
}
.eyebrow .reg {
  display: inline-grid;
  place-items: center;
  min-width: 30px;
  height: 22px;
  padding: 0 6px;
  border-radius: 4px 4px 4px 4px;
  background: var(--brand);
  color: #fff;
  font-size: 0.75rem;
  letter-spacing: 0.04em;
}
.display {
  font-family: var(--font-serif);
  font-weight: 560;
  font-variation-settings: "opsz" 120, "SOFT" 50;
  letter-spacing: -0.02em;
  font-size: clamp(2.4rem, 5vw, 4.1rem);
  line-height: 1.04;
}
.h2 {
  font-family: var(--font-serif);
  font-weight: 560;
  font-variation-settings: "opsz" 96, "SOFT" 50;
  letter-spacing: -0.015em;
  font-size: clamp(2rem, 3.8vw, 3.1rem);
  line-height: 1.1;
}
.h3 {
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.3;
}
.lead {
  font-size: clamp(1.075rem, 1.4vw, 1.25rem);
  color: var(--ink-soft);
  line-height: 1.6;
  margin-top: 20px;
}
.underline-stroke {
  display: block;
  width: 120px;
  height: 10px;
  margin-top: 18px;
  color: var(--brand);
}
.center .underline-stroke {
  margin-inline: auto;
}
.hand {
  font-family: var(--font-serif);
  font-style: italic;
  color: var(--brand-700);
}

/* ---------- Buttons ---------- */
.btn {
  --btn-bg: var(--brand);
  --btn-fg: #fff;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  min-height: 52px;
  padding: 0 26px;
  border-radius: 999px;
  border: 1.5px solid transparent;
  background: var(--btn-bg);
  color: var(--btn-fg);
  font-weight: 700;
  font-size: 1rem;
  letter-spacing: 0.005em;
  text-decoration: none;
  cursor: pointer;
  transition:
    background-color var(--dur) var(--ease-out),
    color var(--dur) var(--ease-out),
    border-color var(--dur) var(--ease-out),
    transform var(--dur-fast) var(--ease-out),
    box-shadow var(--dur) var(--ease-out);
  box-shadow: 0 1px 0 rgba(255, 255, 255, 0.2) inset, 0 6px 16px -6px rgba(15, 118, 110, 0.55);
  -webkit-tap-highlight-color: transparent;
}
.btn svg {
  width: 18px;
  height: 18px;
  transition: transform var(--dur) var(--ease-out);
}
.btn:hover {
  --btn-bg: var(--brand-700);
  transform: translateY(-1px);
  box-shadow: 0 1px 0 rgba(255, 255, 255, 0.2) inset, 0 10px 22px -8px rgba(15, 118, 110, 0.6);
}
.btn:hover svg.arrow {
  transform: translateX(3px);
}
.btn:active {
  transform: translateY(0) scale(0.985);
}
.btn-secondary {
  --btn-bg: transparent;
  --btn-fg: var(--brand-800);
  border-color: var(--brand-100);
  background: rgba(255, 253, 248, 0.7);
  box-shadow: none;
}
.btn-secondary:hover {
  --btn-bg: var(--brand-50);
  background: var(--brand-50);
  border-color: var(--brand);
  box-shadow: none;
}
.btn-light {
  --btn-bg: #fff;
  --btn-fg: var(--brand-800);
  box-shadow: 0 8px 22px -10px rgba(0, 0, 0, 0.45);
}
.btn-light:hover {
  --btn-bg: var(--cream);
}
.btn-ghost {
  --btn-bg: transparent;
  --btn-fg: var(--ink);
  box-shadow: none;
  min-height: 44px;
  padding: 0 14px;
}
.btn-ghost:hover {
  --btn-bg: var(--sand);
  box-shadow: none;
}
.btn-row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px 14px;
  align-items: center;
}
.cta-note {
  font-size: 0.875rem;
  color: var(--ink-mute);
  margin-top: 14px;
}

/* ---------- Papier-Blatt (wiederverwendbar) ---------- */
.paper {
  position: relative;
  background: var(--paper);
  border-radius: 4px 10px 10px 4px;
  box-shadow: var(--shadow-paper);
}
/* Ringordner-Lochung */
.punched {
  --hole-x: 22px;
  padding-left: calc(var(--hole-x) + 34px) !important;
}
.punched::before {
  content: "";
  position: absolute;
  left: var(--hole-x);
  top: 0;
  bottom: 0;
  width: 14px;
  transform: translateX(-50%);
  background:
    radial-gradient(circle at 50% 50%, var(--hole-bg, var(--sand-200)) 0 5.5px, rgba(0, 0, 0, 0.12) 6px, transparent 7px) 50% 22% / 14px 14px no-repeat,
    radial-gradient(circle at 50% 50%, var(--hole-bg, var(--sand-200)) 0 5.5px, rgba(0, 0, 0, 0.12) 6px, transparent 7px) 50% 50% / 14px 14px no-repeat,
    radial-gradient(circle at 50% 50%, var(--hole-bg, var(--sand-200)) 0 5.5px, rgba(0, 0, 0, 0.12) 6px, transparent 7px) 50% 78% / 14px 14px no-repeat;
  pointer-events: none;
}
@media (max-width: 560px) {
  .punched {
    padding-left: 22px !important;
  }
  .punched::before {
    display: none;
  }
}

/* ---------- Reveal ---------- */
.reveal {
  opacity: 0;
  transform: translateY(18px);
  transition:
    opacity 600ms var(--ease-out),
    transform 600ms var(--ease-out);
  transition-delay: var(--delay, 0ms);
}
.reveal.is-visible {
  opacity: 1;
  transform: none;
}
.no-js .reveal {
  opacity: 1;
  transform: none;
}
@media (prefers-reduced-motion: reduce) {
  .reveal {
    opacity: 1;
    transform: none;
  }
}

/* ---------- Platzhalter-Hinweis (vor Go-live ersetzen) ---------- */
.placeholder {
  display: inline;
  background: repeating-linear-gradient(-45deg, #fff4d6 0 8px, #fdecc0 8px 16px);
  border: 1px dashed #c79a2a;
  color: #6b4d00;
  border-radius: 4px;
  padding: 1px 6px;
  font-size: 0.92em;
}
.placeholder-block {
  display: block;
  padding: 14px 16px;
  margin: 12px 0;
}

/* Tags */
.chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: 999px;
  background: var(--brand-50);
  color: var(--brand-800);
  font-size: 0.8125rem;
  font-weight: 600;
}
.chip-preview {
  background: #fff;
  border: 1px solid var(--line-strong);
  color: var(--ink-soft);
}

/* Platz für den mobilen Sticky-CTA, damit er keine Inhalte verdeckt */
@media (max-width: 760px) {
  body {
    --sticky-space: 76px;
  }
}
```

### `src/app/impressum/page.tsx`

```tsx
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
```

### `src/app/layout.tsx`

```tsx
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
```

### `src/app/not-found.tsx`

```tsx
import { LegalPage } from "@/components/LegalPage";

export default function NotFound() {
  return (
    <LegalPage title="Seite nicht gefunden" draft={false}>
      <p>Diese Seite gibt es leider nicht (mehr). Über den Link oben kommst du zurück zur Startseite.</p>
    </LegalPage>
  );
}
```

### `src/app/page.tsx`

```tsx
import { BenefitsSection } from "@/components/BenefitsSection";
import { ChapterTabs } from "@/components/ChapterTabs";
import { FAQAccordion } from "@/components/FAQAccordion";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { HowItWorks } from "@/components/HowItWorks";
import { InteractiveDocumentViewer } from "@/components/InteractiveDocumentViewer";
import { ProblemSolution } from "@/components/ProblemSolution";
import { ProductDetails } from "@/components/ProductDetails";
import { StickyCTA } from "@/components/StickyCTA";
import { TrustSection } from "@/components/TrustSection";
import { ViewerProvider } from "@/components/ViewerContext";

export default function Home() {
  return (
    <ViewerProvider>
      <Header />
      <main id="main">
        {/* 1. Produkt verstehen */}
        <HeroSection />
        <ProblemSolution />
        {/* 2. Produkt erleben */}
        <InteractiveDocumentViewer />
        <ChapterTabs />
        {/* 3. Vorteile erkennen */}
        <BenefitsSection />
        <ProductDetails />
        <HowItWorks />
        {/* 4. Vertrauen aufbauen */}
        <TrustSection />
        <FAQAccordion />
        {/* 5. Etsy-Angebot öffnen */}
        <FinalCTA />
      </main>
      <Footer />
      <StickyCTA />
    </ViewerProvider>
  );
}
```

### `src/app/robots.ts`

```ts
import type { MetadataRoute } from "next";
import { site } from "@/config/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return { rules: [{ userAgent: "*", allow: "/" }], sitemap: `${site.url}/sitemap.xml` };
}
```

### `src/app/sitemap.ts`

```ts
import type { MetadataRoute } from "next";
import { site } from "@/config/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: `${site.url}/`, changeFrequency: "monthly", priority: 1 }];
}
```

### `src/components/BenefitsSection.module.css`

```css
.section {
  padding-block: clamp(72px, 10vw, 128px);
  background:
    radial-gradient(ellipse 50% 40% at 90% 10%, rgba(223, 232, 225, 0.8), transparent 70%),
    var(--sand);
}
.grid {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: clamp(16px, 2vw, 26px);
  align-items: start;
}
.card {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 30px 28px 18px;
  border-radius: 4px 12px 12px 4px;
  background: var(--paper);
  box-shadow: var(--shadow-paper);
  transition:
    transform var(--dur) var(--ease-out),
    box-shadow var(--dur) var(--ease-out);
}
/* feine Linierung wie ein Formularblatt */
.card::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: linear-gradient(90deg, transparent 0 18px, rgba(15, 118, 110, 0.12) 18px 19px, transparent 19px);
  pointer-events: none;
}
.card:hover {
  transform: translateY(-5px) rotate(-0.25deg);
  box-shadow: var(--shadow-lg);
}
.open {
  box-shadow: var(--shadow-lg);
}
.clip {
  position: absolute;
  top: -10px;
  right: 28px;
  width: 16px;
  height: 34px;
  border-radius: 8px;
  border: 2.5px solid #a9aaa5;
  border-bottom-color: transparent;
  opacity: 0;
  transform: translateY(6px);
  transition:
    opacity var(--dur) var(--ease-out),
    transform var(--dur) var(--ease-out);
}
.card:hover .clip,
.open .clip {
  opacity: 1;
  transform: none;
}
.top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 18px;
}
.icon {
  display: grid;
  place-items: center;
  width: 52px;
  height: 52px;
  border-radius: 14px;
  background: var(--brand-50);
  color: var(--brand);
}
.icon svg {
  width: 28px;
  height: 28px;
}
.no {
  font-family: var(--font-serif);
  font-size: 1.6rem;
  color: var(--sand-300);
  line-height: 1;
}
.title {
  font-size: 1.2rem;
  font-weight: 700;
  line-height: 1.3;
}
.short {
  margin-top: 8px;
  color: var(--ink-soft);
}

/* Entfalten – animiert über grid-template-rows */
.detailWrap {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows var(--dur-slow) var(--ease-paper);
}
.open .detailWrap {
  grid-template-rows: 1fr;
}
.detailInner {
  overflow: hidden;
}
.detail {
  margin-top: 14px;
  padding: 14px 16px;
  border-radius: 8px;
  background: var(--cream);
  border: 1px dashed var(--line-strong);
  color: var(--ink);
  font-size: 0.97rem;
  transform-origin: top;
  transform: perspective(600px) rotateX(-12deg);
  opacity: 0;
  transition:
    transform var(--dur-slow) var(--ease-paper),
    opacity var(--dur) var(--ease-out);
}
.open .detail {
  transform: none;
  opacity: 1;
}

.toggle {
  align-self: flex-start;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 44px;
  margin-top: 10px;
  padding: 0 4px;
  border: 0;
  background: none;
  color: var(--brand-700);
  font-weight: 700;
  font-size: 0.92rem;
  cursor: pointer;
}
.toggle svg {
  width: 18px;
  height: 18px;
  transition: transform var(--dur) var(--ease-out);
}
.open .toggle svg {
  transform: rotate(45deg);
}

@media (max-width: 960px) {
  .grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
@media (max-width: 620px) {
  .grid {
    grid-template-columns: 1fr;
  }
  .card:hover {
    transform: none;
  }
}
```

### `src/components/BenefitsSection.tsx`

```tsx
"use client";

import { useId, useState } from "react";
import { site } from "@/config/site";
import { ClockIcon, FolderIcon, PlusIcon, PrinterIcon, SearchIcon, SheetIcon, SproutIcon } from "./Icons";
import { Reveal } from "./Reveal";
import s from "./BenefitsSection.module.css";

const benefits = [
  {
    icon: <FolderIcon />,
    title: "Alles übersichtlich an einem Ort",
    short: "Wichtige Informationen und persönliche Vorsorge geordnet festhalten.",
    detail: `${site.product.chapters} Kapitel mit festen Registern geben jeder Information ihren Platz – von Notfallkontakten über Verträge bis zu persönlichen Wünschen.`,
  },
  {
    icon: <PrinterIcon />,
    title: "Selbst ausdrucken und ausfüllen",
    short: "Zu Hause drucken und handschriftlich ergänzen.",
    detail:
      "Du druckst die Seiten aus, die du brauchst, und füllst sie in Ruhe aus. Ob alle Seiten auf einmal oder nach und nach – du entscheidest.",
  },
  {
    icon: <ClockIcon />,
    title: "Im eigenen Tempo vorbereiten",
    short: "Schritt für Schritt statt alles auf einmal.",
    detail:
      "Ein Kapitel pro Wochenende oder einzelne Seiten zwischendurch: Der Ordner wächst mit dir und lässt sich bei Bedarf aktualisieren.",
  },
  {
    icon: <SearchIcon />,
    title: "Schneller wiederfinden",
    short: "Eine klare Struktur kann langes Suchen ersparen.",
    detail:
      "Farbige Register, wiederkehrende Seitenaufbauten und Checklisten helfen, die richtige Information zügig aufzuschlagen – auch für andere.",
  },
  {
    icon: <SproutIcon />,
    title: "Vorsorge aktiv angehen",
    short: "Wichtige organisatorische Fragen bewusst durchgehen.",
    detail: `${site.product.checklists} Checklisten führen durch Themen, die man gern aufschiebt – sachlich, ruhig und ohne Fachchinesisch. Der Ordner ersetzt keine Rechtsberatung.`,
  },
  {
    icon: <SheetIcon name="family" />,
    title: "Eine Hilfe für die Familie",
    short: "Informationen für Angehörige nachvollziehbar zusammenstellen.",
    detail:
      "Wenn deine Familie weiß, wo der Ordner steht, finden Angehörige wichtige Angaben, ohne Schubladen durchsuchen zu müssen.",
  },
];

export function BenefitsSection() {
  return (
    <section id="vorteile" className={s.section} aria-labelledby="vorteile-title">
      <div className="container">
        <Reveal className="section-head">
          <p className="eyebrow">
            <span className="reg">06</span> Deine Vorteile
          </p>
          <h2 id="vorteile-title" className="h2">
            Mehr als {site.product.pages} Seiten Papier.
          </h2>
          <p className="lead">Ein System, das dir hilft, den Überblick zu behalten – und anderen, ihn zu finden.</p>
        </Reveal>

        <ul className={s.grid}>
          {benefits.map((b, i) => (
            <Reveal as="li" key={b.title} delay={i * 70}>
              <BenefitCard {...b} n={i + 1} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

function BenefitCard({ icon, title, short, detail, n }: (typeof benefits)[number] & { n: number }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <article className={`${s.card} ${open ? s.open : ""}`}>
      <span className={s.clip} aria-hidden />
      <div className={s.top}>
        <span className={s.icon}>{icon}</span>
        <span className={s.no} aria-hidden>
          {String(n).padStart(2, "0")}
        </span>
      </div>
      <h3 className={s.title}>{title}</h3>
      <p className={s.short}>{short}</p>
      <div id={id} className={s.detailWrap} inert={!open}>
        <div className={s.detailInner}>
          <p className={s.detail}>{detail}</p>
        </div>
      </div>
      <button type="button" className={s.toggle} aria-expanded={open} aria-controls={id} onClick={() => setOpen((v) => !v)}>
        <span>{open ? "Weniger anzeigen" : "Mehr erfahren"}</span>
        <PlusIcon />
        <span className="visually-hidden">: {title}</span>
      </button>
    </article>
  );
}
```

### `src/components/ChapterTabs.module.css`

```css
.section {
  padding-block: clamp(72px, 10vw, 128px);
  background: var(--cream);
}

.binder {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 150px;
  max-width: 1120px;
  margin-inline: auto;
  padding: 22px 0 22px 22px;
  border-radius: 22px;
  background: linear-gradient(180deg, #f4f1ea, #e8e2d4);
  border: 1px solid #ddd5c6;
  box-shadow:
    inset 0 1px 0 #fff,
    var(--shadow-lg);
}

/* Register rechts */
.tabs {
  order: 2;
  display: grid;
  grid-template-rows: repeat(8, 1fr);
  gap: 6px;
  padding-block: 10px;
  margin-left: -4px;
  z-index: 2;
}
.tab {
  --c: var(--brand);
  display: flex;
  align-items: center;
  gap: 10px;
  min-height: 48px;
  padding: 0 12px 0 16px;
  border: 0;
  border-radius: 0 12px 12px 0;
  background: linear-gradient(90deg, color-mix(in srgb, var(--c) 75%, black), var(--c) 30%);
  color: #fff;
  text-align: left;
  cursor: pointer;
  transform: translateX(-18px);
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.14);
  filter: saturate(0.8) brightness(0.98);
  transition:
    transform var(--dur) var(--ease-out),
    filter var(--dur) var(--ease-out),
    box-shadow var(--dur) var(--ease-out);
}
.tab:hover {
  transform: translateX(-10px);
  filter: saturate(1);
}
.tabActive,
.tabActive:hover {
  transform: translateX(0);
  filter: saturate(1.05);
  box-shadow: 5px 4px 12px rgba(0, 0, 0, 0.22);
}
.tabNo {
  font-weight: 800;
  font-size: 0.95rem;
}
.tabLabel {
  font-size: 0.82rem;
  font-weight: 600;
  opacity: 0.95;
}

/* Doppelseite */
.spread {
  order: 1;
  display: grid;
  grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr);
  gap: 0;
  min-height: 620px;
}
.leftPage {
  position: relative;
  display: grid;
  border-radius: 6px 0 0 6px;
  background: var(--paper);
  box-shadow: inset -14px 0 18px -14px rgba(0, 0, 0, 0.2);
  padding: 28px 40px 28px 28px;
  overflow: hidden;
}
.divider {
  --c: var(--brand);
  grid-area: 1 / 1;
  align-self: start;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-height: 62%;
  padding: 40px 24px;
  border-radius: 4px;
  background:
    radial-gradient(circle at 25% 15%, rgba(255, 255, 255, 0.1), transparent 55%),
    var(--c);
  color: #fff;
}
.dividerIcon {
  width: 64px;
  height: 64px;
  stroke-width: 1.2;
  margin-bottom: 16px;
}
.dividerKicker {
  font-weight: 700;
  font-size: 1.9rem;
  line-height: 1.1;
}
.dividerTitle {
  margin-top: 6px;
  font-size: 1.25rem;
}
.dividerLine {
  display: block;
  width: 56px;
  height: 1px;
  margin-top: 18px;
  background: rgba(255, 255, 255, 0.6);
}
.ringsCol {
  position: absolute;
  right: -2px;
  top: 0;
  bottom: 0;
  width: 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-end;
  padding-block: 18%;
  pointer-events: none;
  z-index: 3;
}
.ringsCol span {
  width: 54px;
  height: 20px;
  margin-right: -28px;
  border-radius: 50%;
  border: 4px solid #b5b5b0;
  border-left-color: #dededa;
  border-bottom-color: #8e8e8a;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.18);
}

.rightWrap {
  position: relative;
  display: grid;
  perspective: 2400px;
}
.rightPage {
  grid-area: 1 / 1;
  position: relative;
  padding: 32px 36px 36px;
  border-radius: 0 6px 6px 0;
  background: var(--paper);
  transform-origin: 0% 50%;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  box-shadow: inset 14px 0 18px -14px rgba(0, 0, 0, 0.16);
  --hole-x: 22px;
  --hole-bg: #ebe4d6;
}
.rightPage:focus-visible {
  outline-offset: -4px;
}
.panelKicker {
  font-weight: 800;
  font-size: 0.8rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  filter: brightness(0.82);
}
.panelTitle {
  font-family: var(--font-serif);
  font-weight: 560;
  font-size: clamp(1.7rem, 2.6vw, 2.3rem);
  margin-top: 6px;
}
.panelText {
  margin-top: 12px;
  color: var(--ink-soft);
  max-width: 46ch;
}
.contentsHead {
  margin-top: 26px;
  margin-bottom: 10px;
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--brand-700);
}
.contents {
  list-style: none;
  padding-left: 16px;
  border-left: 1px solid var(--line-strong);
  display: grid;
  gap: 8px;
}
.contents li {
  display: flex;
  gap: 18px;
}
.contents li span {
  color: var(--ink-mute);
  font-variant-numeric: tabular-nums;
  min-width: 2.2em;
}

.previews {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
}
.preview {
  display: grid;
  gap: 8px;
  width: 100%;
  padding: 0;
  border: 0;
  background: none;
  cursor: pointer;
  text-align: left;
  border-radius: 6px;
}
.preview > div {
  transition:
    transform var(--dur) var(--ease-out),
    box-shadow var(--dur) var(--ease-out);
}
.preview:hover > div {
  transform: translateY(-4px) rotate(-0.6deg);
  box-shadow: var(--shadow-md);
}
.previewLabel {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--brand-800);
}
.previewLabel svg {
  width: 16px;
  height: 16px;
  flex: none;
}
.pageNo {
  position: absolute;
  right: 22px;
  bottom: 14px;
  font-size: 0.75rem;
  color: var(--ink-mute);
}
.note {
  max-width: 1120px;
  margin: 16px auto 0;
  font-size: 0.85rem;
  color: var(--ink-mute);
  text-align: center;
}

@media (max-width: 960px) {
  .binder {
    grid-template-columns: 1fr;
    padding: 16px;
  }
  .tabs {
    order: 0;
    grid-template-rows: none;
    grid-auto-flow: column;
    grid-auto-columns: minmax(84px, 1fr);
    overflow-x: auto;
    padding: 0 0 4px;
    margin: 0 0 -2px;
    scrollbar-width: none;
  }
  .tabs::-webkit-scrollbar {
    display: none;
  }
  .tab {
    flex-direction: column;
    justify-content: center;
    gap: 0;
    min-height: 56px;
    padding: 6px 8px;
    border-radius: 12px 12px 0 0;
    transform: translateY(10px);
    background: linear-gradient(0deg, color-mix(in srgb, var(--c) 75%, black), var(--c) 30%);
    text-align: center;
  }
  .tab:hover {
    transform: translateY(5px);
  }
  .tabActive,
  .tabActive:hover {
    transform: translateY(0);
  }
  .spread {
    grid-template-columns: 1fr;
    min-height: 0;
  }
  .leftPage {
    display: none;
  }
  .rightPage {
    border-radius: 0 0 8px 8px;
    padding: 26px 24px 30px;
  }
}
@media (max-width: 560px) {
  .previews {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .rightPage {
    padding: 22px 18px 28px;
  }
}
```

### `src/components/ChapterTabs.tsx`

```tsx
"use client";

import { AnimatePresence, motion, type Variants } from "framer-motion";
import { useRef, useState } from "react";
import { site } from "@/config/site";
import { chapters } from "@/content/chapters";
import { sheets } from "@/content/sheets";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import { EyeIcon, FolderIcon, Stroke } from "./Icons";
import { PaperSheet } from "./PaperSheet";
import { Reveal } from "./Reveal";
import { useViewer } from "./ViewerContext";
import s from "./ChapterTabs.module.css";

const turn: Variants = {
  enter: (dir: number) => (dir > 0 ? { rotateY: 0, zIndex: 1 } : { rotateY: -105, zIndex: 3 }),
  center: { rotateY: 0, zIndex: 2, transition: { duration: 0.5, ease: [0.3, 0.7, 0.2, 1] } },
  exit: (dir: number) =>
    dir > 0
      ? { rotateY: -105, zIndex: 3, transition: { duration: 0.5, ease: [0.45, 0.05, 0.4, 1] } }
      : { rotateY: 0, zIndex: 1, transition: { duration: 0.5 } },
};
const none: Variants = { enter: { opacity: 0 }, center: { opacity: 1, transition: { duration: 0 } }, exit: { opacity: 0, transition: { duration: 0 } } };

export function ChapterTabs() {
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(1);
  const reduce = useReducedMotionSafe();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const { openAt } = useViewer();

  const select = (i: number, focus = false) => {
    if (i === active) return;
    setDir(i > active ? 1 : -1);
    setActive(i);
    if (focus) tabRefs.current[i]?.focus();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const n = chapters.length;
    let i: number | null = null;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") i = (active + 1) % n;
    if (e.key === "ArrowUp" || e.key === "ArrowLeft") i = (active - 1 + n) % n;
    if (e.key === "Home") i = 0;
    if (e.key === "End") i = n - 1;
    if (i !== null) {
      e.preventDefault();
      select(i, true);
    }
  };

  const c = chapters[active];
  const chapterSheets = c.sheetIds.map((id) => sheets.find((sh) => sh.id === id)!).filter(Boolean);

  return (
    <section id="kapitel" className={s.section} aria-labelledby="kapitel-title">
      <div className="container">
        <Reveal className="section-head center">
          <p className="eyebrow">
            <span className="reg">05</span> Das Registersystem
          </p>
          <h2 id="kapitel-title" className="h2">
            {site.product.chapters} Kapitel. Ein System.
          </h2>
          <Stroke />
          <p className="lead">
            Jedes Register steht für einen Lebensbereich. Wähle ein Kapitel, um zu sehen, welche Themen dich darin
            erwarten.
          </p>
        </Reveal>

        <Reveal className={s.binder} delay={100}>
          {/* Register */}
          <div className={s.tabs} role="tablist" aria-label="Kapitel des Familienordners" aria-orientation="vertical" onKeyDown={onKeyDown}>
            {chapters.map((ch, i) => (
              <button
                key={ch.no}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                id={`tab-${ch.no}`}
                type="button"
                role="tab"
                aria-selected={i === active}
                aria-controls={`panel-${ch.no}`}
                tabIndex={i === active ? 0 : -1}
                className={`${s.tab} ${i === active ? s.tabActive : ""}`}
                style={{ "--c": ch.color } as React.CSSProperties}
                onClick={() => select(i)}
              >
                <span className={s.tabNo}>{ch.no}</span>
                <span className={s.tabLabel}>{ch.short}</span>
              </button>
            ))}
          </div>

          <div className={s.spread}>
            {/* Linke Seite: Kapiteltrenner */}
            <div className={s.leftPage} aria-hidden>
              <AnimatePresence initial={false} mode="popLayout">
                <motion.div
                  key={c.no}
                  className={s.divider}
                  style={{ "--c": c.color } as React.CSSProperties}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { duration: reduce ? 0 : 0.35, delay: reduce ? 0 : 0.15 } }}
                  exit={{ opacity: 0, transition: { duration: reduce ? 0 : 0.25 } }}
                >
                  <FolderIcon className={s.dividerIcon} />
                  <p className={s.dividerKicker}>Kapitel {Number(c.no)}</p>
                  <p className={s.dividerTitle}>{c.title}</p>
                  <span className={s.dividerLine} />
                </motion.div>
              </AnimatePresence>
              <div className={s.ringsCol}>
                <span />
                <span />
                <span />
              </div>
            </div>

            {/* Rechte Seite: Inhalt */}
            <div className={s.rightWrap}>
              <AnimatePresence initial={false} custom={dir}>
                <motion.div
                  key={c.no}
                  id={`panel-${c.no}`}
                  role="tabpanel"
                  aria-labelledby={`tab-${c.no}`}
                  tabIndex={0}
                  className={`${s.rightPage} punched`}
                  custom={dir}
                  variants={reduce ? none : turn}
                  initial="enter"
                  animate="center"
                  exit="exit"
                >
                  <p className={s.panelKicker} style={{ color: c.color }}>
                    Register {c.no}
                  </p>
                  <h3 className={s.panelTitle}>{c.title}</h3>
                  <p className={s.panelText}>{c.description}</p>

                  <p className={s.contentsHead}>Inhalt dieses Kapitels</p>
                  <ol className={s.contents}>
                    {c.topics.map((t, i) => (
                      <li key={t}>
                        <span>
                          {Number(c.no)}.{i + 1}
                        </span>
                        {t}
                      </li>
                    ))}
                  </ol>

                  {chapterSheets.length > 0 && (
                    <>
                      <p className={s.contentsHead}>Vorschau ansehen</p>
                      <ul className={s.previews}>
                        {chapterSheets.map((sh) => (
                          <li key={sh.id}>
                            <button type="button" className={s.preview} onClick={() => openAt(sh.id)}>
                              <PaperSheet sheet={sh} compact punched={false} />
                              <span className={s.previewLabel}>
                                <EyeIcon /> {sh.title}
                              </span>
                            </button>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                  <span className={s.pageNo} aria-hidden>
                    {c.no}
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </Reveal>
        <p className={s.note}>
          Kapitelstruktur laut Produktdatei. Die Vorschaubilder sind nachgestaltete Beispiele und zeigen nicht jede Seite.
        </p>
      </div>
    </section>
  );
}
```

### `src/components/EtsyLink.tsx`

```tsx
import { site } from "@/config/site";
import { ArrowRight, ExternalIcon } from "./Icons";

type Props = {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "light";
  className?: string;
  icon?: "arrow" | "external";
  /** Für Analyse/Debug: wo der CTA sitzt */
  placement: string;
};

/** Einheitlicher Kauf-CTA. Ziel-URL kommt ausschließlich aus src/config/site.ts */
export function EtsyLink({ children, variant = "primary", className, icon = "external", placement }: Props) {
  const cls = variant === "primary" ? "btn" : variant === "secondary" ? "btn btn-secondary" : "btn btn-light";
  return (
    <a
      href={site.etsyUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`${cls} ${className ?? ""}`}
      data-cta={placement}
    >
      {children}
      {icon === "arrow" ? <ArrowRight /> : <ExternalIcon />}
      <span className="visually-hidden"> (öffnet Etsy in einem neuen Tab)</span>
    </a>
  );
}
```

### `src/components/FAQAccordion.module.css`

```css
.section {
  padding-block: clamp(72px, 10vw, 128px);
  background: var(--cream);
}
.grid {
  display: grid;
  grid-template-columns: minmax(0, 0.7fr) minmax(0, 1.3fr);
  gap: clamp(28px, 5vw, 72px);
  align-items: start;
}
.head {
  position: sticky;
  top: calc(var(--header-h) + 24px);
}
.list {
  display: grid;
  gap: 10px;
}
.item {
  border-radius: 4px 12px 12px 4px;
  background: var(--paper);
  box-shadow: var(--shadow-sm);
  border-left: 4px solid transparent;
  transition:
    box-shadow var(--dur) var(--ease-out),
    border-color var(--dur) var(--ease-out);
}
.item:hover {
  box-shadow: var(--shadow-md);
}
.open {
  border-left-color: var(--brand);
  box-shadow: var(--shadow-md);
}
.q {
  font-size: 1.05rem;
}
.q button {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 16px;
  align-items: center;
  width: 100%;
  min-height: 64px;
  padding: 16px 20px;
  border: 0;
  background: none;
  text-align: left;
  font-weight: 700;
  line-height: 1.35;
  cursor: pointer;
  border-radius: inherit;
}
.no {
  display: inline-grid;
  place-items: center;
  width: 34px;
  height: 24px;
  border-radius: 4px;
  background: var(--brand-50);
  color: var(--brand-800);
  font-size: 0.75rem;
  font-weight: 800;
  transition:
    background-color var(--dur) var(--ease-out),
    color var(--dur) var(--ease-out);
}
.open .no {
  background: var(--brand);
  color: #fff;
}
.plus {
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid var(--line-strong);
  color: var(--brand-700);
  transition:
    transform var(--dur) var(--ease-out),
    background-color var(--dur) var(--ease-out);
}
.plus svg {
  width: 18px;
  height: 18px;
}
.open .plus {
  transform: rotate(45deg);
  background: var(--brand-50);
}
.aWrap {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows var(--dur-slow) var(--ease-paper);
}
.open .aWrap {
  grid-template-rows: 1fr;
}
.aInner {
  overflow: hidden;
}
.a {
  padding: 0 24px 22px 70px;
  color: var(--ink-soft);
  display: grid;
  gap: 10px;
  opacity: 0;
  transform: translateY(-6px);
  transition:
    opacity var(--dur) var(--ease-out),
    transform var(--dur) var(--ease-out);
}
.open .a {
  opacity: 1;
  transform: none;
}
.chapterList {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px 16px;
}
.chapterList li {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.95rem;
  color: var(--ink);
}
.chapterList span {
  display: inline-grid;
  place-items: center;
  width: 30px;
  height: 22px;
  border-radius: 4px;
  color: #fff;
  font-size: 0.72rem;
  font-weight: 700;
  flex: none;
}

@media (max-width: 900px) {
  .grid {
    grid-template-columns: 1fr;
  }
  .head {
    position: static;
  }
}
@media (max-width: 560px) {
  .q button {
    gap: 12px;
    padding: 14px 14px;
  }
  .a {
    padding: 0 16px 18px 16px;
  }
  .chapterList {
    grid-template-columns: 1fr;
  }
}
```

### `src/components/FAQAccordion.tsx`

```tsx
"use client";

import { useId, useState } from "react";
import { site } from "@/config/site";
import { chapters } from "@/content/chapters";
import { PlusIcon } from "./Icons";
import { Reveal } from "./Reveal";
import s from "./FAQAccordion.module.css";

type QA = { q: string; a: React.ReactNode };

const faqs: QA[] = [
  {
    q: "Was ist Festhalt – Der Familienordner?",
    a: (
      <p>
        Festhalt ist eine digitale Vorlage mit {site.product.pages} Seiten, mit der du wichtige Informationen, Unterlagen
        und persönliche Vorsorge an einem Ort festhältst. Der Ordner ist in {site.product.chapters} Kapitel gegliedert und
        enthält {site.product.checklists} Checklisten.
      </p>
    ),
  },
  {
    q: "Handelt es sich um ein digitales oder ein physisches Produkt?",
    a: (
      <p>
        Um ein <strong>digitales Produkt</strong>. Es wird kein Ordner per Post verschickt. Du druckst die Seiten selbst
        aus; Ringordner und Papier sind nicht enthalten.
      </p>
    ),
  },
  {
    q: "Wie funktioniert der Kauf über Etsy?",
    a: (
      <p>
        Über die Buttons auf dieser Website gelangst du zum Angebot im Etsy-Shop. Dort erfolgen Bestellung, Zahlung und
        Bereitstellung der Dateien – es gelten die Bedingungen von Etsy und des Shops.
      </p>
    ),
  },
  {
    q: "Wie erhalte ich die Dateien?",
    a: (
      <>
        <p>
          Nach dem Kauf stellt Etsy dir die Dateien zum Download bereit, in der Regel in deinem Etsy-Konto unter deinen
          Käufen. Die genauen Details findest du im Etsy-Angebot.
        </p>
        {!site.fileFormat && (
          <p className="placeholder placeholder-block">
            Vor Veröffentlichung ergänzen: Dateiformat, Anzahl der Dateien und Papierformat.
          </p>
        )}
        {site.fileFormat && <p>Dateiformat: {site.fileFormat}.</p>}
      </>
    ),
  },
  {
    q: "Kann ich die Unterlagen zu Hause ausdrucken?",
    a: (
      <p>
        Ja. Der Familienordner ist zum Ausdrucken gedacht. Du kannst alle Seiten drucken oder nur die, die du gerade
        brauchst{site.paperSize ? ` – ausgelegt für ${site.paperSize}` : ""}.
      </p>
    ),
  },
  {
    q: "Kann ich den Ordner individuell ausfüllen?",
    a: (
      <>
        <p>
          Ja. Du füllst nur die Seiten aus, die für dich relevant sind, und ergänzt eigene Notizen. Nicht passende Seiten
          lässt du einfach weg.
        </p>
        {site.digitallyFillable === null && (
          <p className="placeholder placeholder-block">
            Vor Veröffentlichung ergänzen: Ist die Datei auch am Bildschirm ausfüllbar?
          </p>
        )}
        {site.digitallyFillable === true && <p>Die Datei lässt sich zusätzlich am Bildschirm ausfüllen.</p>}
      </>
    ),
  },
  {
    q: "Was ist im Produkt enthalten?",
    a: (
      <>
        <p>
          {site.product.pages} Seiten in {site.product.chapters} Kapiteln mit {site.product.checklists} Checklisten:
        </p>
        <ul className={s.chapterList}>
          {chapters.map((c) => (
            <li key={c.no}>
              <span style={{ background: c.color }}>{c.no}</span>
              {c.title}
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    q: "Ist das Produkt eine Rechtsberatung?",
    a: (
      <p>
        Nein. Festhalt ist eine organisatorische Hilfe und ersetzt keine Rechts-, Steuer- oder medizinische Beratung.
        Rechtsverbindliche Dokumente wie Vorsorgevollmacht, Patientenverfügung oder Testament sollten mit fachkundiger
        Unterstützung erstellt werden. Im Ordner kannst du festhalten, ob es sie gibt und wo sie liegen.
      </p>
    ),
  },
  {
    q: "Wie kann ich den Ordner später aktualisieren?",
    a: (
      <p>
        Weil du die Seiten selbst druckst, kannst du einzelne Blätter jederzeit neu ausdrucken und austauschen. Auf dem
        Deckblatt ist Platz für das Datum der letzten Prüfung – eine gute Erinnerung, den Ordner zum Beispiel einmal im
        Jahr durchzusehen.
      </p>
    ),
  },
];

export function FAQAccordion() {
  return (
    <section id="faq" className={s.section} aria-labelledby="faq-title">
      <div className={`container ${s.grid}`}>
        <Reveal className={s.head}>
          <p className="eyebrow">
            <span className="reg">10</span> Fragen &amp; Antworten
          </p>
          <h2 id="faq-title" className="h2">
            Gut zu wissen.
          </h2>
          <p className="lead">Die häufigsten Fragen zum Familienordner – kurz und klar beantwortet.</p>
        </Reveal>
        <div className={s.list}>
          {faqs.map((f, i) => (
            <FaqItem key={f.q} {...f} n={i + 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqItem({ q, a, n }: QA & { n: number }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <div className={`${s.item} ${open ? s.open : ""}`}>
      <h3 className={s.q}>
        <button type="button" aria-expanded={open} aria-controls={`${id}-a`} id={`${id}-q`} onClick={() => setOpen((v) => !v)}>
          <span className={s.no} aria-hidden>
            {String(n).padStart(2, "0")}
          </span>
          <span className={s.qText}>{q}</span>
          <span className={s.plus} aria-hidden>
            <PlusIcon />
          </span>
        </button>
      </h3>
      <div id={`${id}-a`} role="region" aria-labelledby={`${id}-q`} className={s.aWrap} inert={!open}>
        <div className={s.aInner}>
          <div className={s.a}>{a}</div>
        </div>
      </div>
    </div>
  );
}
```

### `src/components/FinalCTA.module.css`

```css
.section {
  position: relative;
  padding-block: clamp(72px, 10vw, 128px);
  background:
    radial-gradient(ellipse 60% 70% at 85% 30%, rgba(255, 255, 255, 0.1), transparent 70%),
    radial-gradient(ellipse 50% 60% at 0% 100%, rgba(0, 0, 0, 0.18), transparent 70%),
    var(--brand);
  color: #fff;
  overflow: hidden;
}
.grid {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
  gap: clamp(28px, 5vw, 72px);
  align-items: center;
}
.kicker {
  font-weight: 700;
  font-size: 0.82rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.85);
  margin-bottom: 14px;
}
.title {
  color: #fff;
}
.text {
  margin: 20px 0 32px;
  font-size: 1.15rem;
  max-width: 34rem;
  color: rgba(255, 255, 255, 0.92);
}
.note {
  margin-top: 14px;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.85);
}
.visual img {
  width: 100%;
  border-radius: var(--radius-lg);
  box-shadow: 0 30px 60px -20px rgba(0, 0, 0, 0.45);
  transform: rotate(1.5deg);
}
@media (max-width: 900px) {
  .grid {
    grid-template-columns: 1fr;
  }
  .visual {
    max-width: 480px;
  }
}
```

### `src/components/FinalCTA.tsx`

```tsx
import { EtsyLink } from "./EtsyLink";
import { Reveal } from "./Reveal";
import s from "./FinalCTA.module.css";

export function FinalCTA() {
  return (
    <section id="start" className={s.section} aria-labelledby="final-title">
      <div className={`container ${s.grid}`}>
        <Reveal className={s.copy}>
          <p className={s.kicker}>Dein nächster Schritt</p>
          <h2 id="final-title" className={`h2 ${s.title}`}>
            Ein guter Überblick beginnt mit dem ersten Schritt.
          </h2>
          <p className={s.text}>
            Vorsorge macht nicht alles vorhersehbar. Aber sie kann helfen, Wichtiges geordnet bereitzuhalten – für dich und
            für die Menschen, die dir nahestehen. Fang mit einer Seite an.
          </p>
          <div className="btn-row">
            <EtsyLink placement="final" variant="light" icon="arrow">
              Festhalt auf Etsy entdecken
            </EtsyLink>
          </div>
          <p className={s.note}>Digitales Produkt zum Selbstausdrucken · Kauf über Etsy</p>
        </Reveal>
        <Reveal className={s.visual} delay={120}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/ordner-cover-1024.webp"
            srcSet="/images/ordner-cover-640.webp 640w, /images/ordner-cover-1024.webp 1024w"
            sizes="(max-width: 900px) 90vw, 520px"
            alt="Weißer Ringordner mit türkisgrünem Deckblatt „Festhalt – Der Familienordner“ auf einem Schreibtisch"
            width={1254}
            height={1254}
            loading="lazy"
            decoding="async"
          />
        </Reveal>
      </div>
    </section>
  );
}
```

### `src/components/FolderMockup.module.css`

```css
.wrap {
  position: relative;
  width: 100%;
  container-type: inline-size;
  perspective: 2400px;
}
.desk {
  position: relative;
  padding: 4% 2% 6%;
}
.shadow {
  position: absolute;
  left: 6%;
  right: 4%;
  bottom: 3%;
  height: 16%;
  background: radial-gradient(ellipse at center, rgba(70, 50, 20, 0.28), transparent 70%);
  filter: blur(14px);
}

/* ----- Ordner ----- */
.binder {
  --board: #f4f1ea;
  --board-edge: #e1dacd;
  position: relative;
  display: grid;
  grid-template-columns: 1fr 6% 1fr;
  aspect-ratio: 1.52 / 1;
  transform-style: preserve-3d;
  transform: rotateX(16deg) rotateZ(-1.2deg);
  font-size: 1.6cqi;
}

.leftBoard,
.rightBoard {
  position: relative;
  background: linear-gradient(180deg, var(--board), #ece7dc);
  border: 1px solid var(--board-edge);
  box-shadow:
    0 1px 0 #fff inset,
    0 14px 30px -14px rgba(60, 45, 20, 0.35);
}
.leftBoard {
  border-radius: 1.6em 0.3em 0.3em 1.6em;
}
.rightBoard {
  border-radius: 0.3em 1.6em 1.6em 0.3em;
}
.pocket {
  position: absolute;
  inset: 8% 8% 8% 10%;
  border-radius: 0.6em;
  background: linear-gradient(160deg, rgba(255, 255, 255, 0.9), rgba(240, 235, 225, 0.6));
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.04);
}

.spine {
  position: relative;
  background: linear-gradient(90deg, #e2dccf, #f6f3ec 45%, #ddd5c6);
  border-block: 1px solid var(--board-edge);
}
.bar {
  position: absolute;
  left: 18%;
  right: 18%;
  top: 14%;
  bottom: 14%;
  border-radius: 0.5em;
  background: linear-gradient(90deg, #9a9a96, #e9e9e6 40%, #b8b8b3 60%, #8c8c88);
  box-shadow: 0 0.2em 0.5em rgba(0, 0, 0, 0.25);
}
.ring {
  position: absolute;
  z-index: 2;
  left: -60%;
  width: 220%;
  height: 4.4%;
  top: calc(19% + var(--i) * 19.5%);
  border: 0.42em solid #b9b9b4;
  border-left-color: #d9d9d5;
  border-bottom-color: #8d8d89;
  border-radius: 50%;
  background: transparent;
  box-shadow: 0 0.25em 0.4em rgba(0, 0, 0, 0.2);
}

/* ----- Papierstapel ----- */
.stack {
  position: absolute;
  inset: 5% 9% 5% 2%;
}
.stackEdge {
  position: absolute;
  inset: 0;
  background: #fbf9f4;
  border-radius: 0.15em 0.6em 0.6em 0.15em;
  transform: translate(calc(var(--n) * 0.18em), calc(var(--n) * 0.22em));
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.04);
}

.tabs {
  position: absolute;
  top: 2%;
  bottom: 2%;
  right: -9.5%;
  width: 10%;
  display: grid;
  grid-template-rows: repeat(8, 1fr);
  gap: 1.2%;
}
.tab {
  display: grid;
  place-items: center;
  border-radius: 0 0.6em 0.6em 0;
  background: linear-gradient(90deg, color-mix(in srgb, var(--c) 82%, black), var(--c) 40%);
  color: #fff;
  font-weight: 700;
  font-size: 1.05em;
  letter-spacing: 0.02em;
  box-shadow: 0.1em 0.15em 0.3em rgba(0, 0, 0, 0.18);
  animation: tabIn 600ms var(--ease-out) both;
  animation-delay: calc(1500ms + var(--i) * 60ms);
}

.topPage {
  position: absolute;
  inset: 0;
  z-index: 1;
  display: flex;
  flex-direction: column;
  background: var(--paper);
  border-radius: 0.15em 0.6em 0.6em 0.15em;
  box-shadow:
    0 0 0 1px rgba(0, 0, 0, 0.05),
    0.2em 0.3em 0.8em rgba(0, 0, 0, 0.08);
  transform-origin: 0% 50%;
  animation: pageLift 1100ms var(--ease-paper) 1600ms both;
  overflow: hidden;
}
.holes {
  position: absolute;
  left: 2.2%;
  top: 0;
  bottom: 0;
  width: 2.4%;
  background:
    radial-gradient(circle, #e9e3d6 0 45%, rgba(0, 0, 0, 0.14) 52%, transparent 60%) 50% 21% / 100% 3.6% no-repeat,
    radial-gradient(circle, #e9e3d6 0 45%, rgba(0, 0, 0, 0.14) 52%, transparent 60%) 50% 40.5% / 100% 3.6% no-repeat,
    radial-gradient(circle, #e9e3d6 0 45%, rgba(0, 0, 0, 0.14) 52%, transparent 60%) 50% 60% / 100% 3.6% no-repeat,
    radial-gradient(circle, #e9e3d6 0 45%, rgba(0, 0, 0, 0.14) 52%, transparent 60%) 50% 79.5% / 100% 3.6% no-repeat;
}
.divider {
  margin: 6% 6% 0 9%;
  padding: 9% 6% 8%;
  border-radius: 0.3em;
  background:
    radial-gradient(circle at 30% 20%, rgba(255, 255, 255, 0.08), transparent 60%),
    var(--brand);
  color: #fff;
  text-align: center;
}
.dividerIcon {
  width: 3.8em;
  height: 3.8em;
  margin: 0 auto 0.8em;
  stroke-width: 1.2;
}
.dividerKicker {
  font-weight: 700;
  font-size: 1.7em;
  line-height: 1.1;
}
.dividerTitle {
  font-size: 1.35em;
  margin-top: 0.2em;
  opacity: 0.95;
}
.dividerLine {
  display: block;
  width: 18%;
  height: 1px;
  margin: 0.9em auto 0;
  background: rgba(255, 255, 255, 0.6);
}
.toc {
  margin: 7% 8% 0 12%;
  color: var(--ink-soft);
}
.tocHead {
  font-size: 1.05em;
  color: var(--brand-700);
  margin-bottom: 0.7em;
}
.toc ol {
  list-style: none;
  padding: 0 0 0 1em;
  margin: 0;
  border-left: 1px solid var(--line-strong);
  display: grid;
  gap: 0.75em;
}
.toc li {
  display: flex;
  gap: 1.4em;
  font-size: 0.95em;
  color: var(--ink);
}
.toc li span {
  color: var(--ink-mute);
}
.pageFoot {
  margin: auto 8% 5% 12%;
  padding-top: 0.6em;
  border-top: 1px solid var(--line);
  font-size: 0.72em;
  color: var(--brand-700);
  letter-spacing: 0.04em;
}

/* ----- Deckel ----- */
.cover {
  position: absolute;
  z-index: 5;
  top: -0.6%;
  bottom: -0.6%;
  left: 50%;
  width: 50.6%;
  transform-origin: 0% 50%;
  transform-style: preserve-3d;
  animation: coverOpen 1500ms var(--ease-paper) 250ms both;
}
.coverFront,
.coverBack {
  position: absolute;
  inset: 0;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  border-radius: 0.4em 1.6em 1.6em 0.4em;
}
.coverFront {
  display: flex;
  flex-direction: column;
  padding: 7% 7% 6% 9%;
  background: linear-gradient(180deg, #fbfaf7, #f1eee7);
  box-shadow:
    inset 0.5em 0 0.8em -0.4em rgba(0, 0, 0, 0.15),
    0 1em 2em -0.8em rgba(0, 0, 0, 0.35);
}
.coverPanel {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 0.2em;
  background: var(--brand);
  color: #fff;
  text-align: center;
}
.coverIcon {
  width: 4.2em;
  height: 4.2em;
  stroke-width: 1.2;
}
.coverBrand {
  margin-top: 0.4em;
  font-weight: 800;
  font-size: 3.4em;
  letter-spacing: -0.03em;
  line-height: 1;
}
.coverSub {
  font-size: 1.3em;
  margin-top: 0.2em;
}
.coverLine {
  width: 22%;
  height: 1px;
  background: rgba(255, 255, 255, 0.6);
  margin: 1em 0;
}
.coverClaim {
  font-size: 1.05em;
}
.label {
  margin-top: 5%;
  padding: 4% 5%;
  border: 1px solid var(--brand-100);
  display: grid;
  gap: 0.9em;
  font-size: 0.85em;
  color: var(--brand-700);
  font-weight: 600;
}
.label i {
  display: block;
  height: 1px;
  background: var(--line-strong);
}
.coverBack {
  transform: rotateY(180deg);
  background: linear-gradient(180deg, #f2efe8, #e9e4d9);
  border-radius: 1.6em 0.4em 0.4em 1.6em;
  box-shadow: inset -0.5em 0 0.8em -0.4em rgba(0, 0, 0, 0.12);
}

.caption {
  margin-top: 0.4rem;
  text-align: center;
  font-size: 0.8rem;
  color: var(--ink-mute);
}

/* Bewegung reduziert: Endzustand sofort */
.static .cover,
.static .topPage,
.static .tab {
  animation: none;
}
.static .cover {
  transform: rotateY(-178deg);
}

@keyframes coverOpen {
  0% {
    transform: rotateY(0deg);
  }
  15% {
    transform: rotateY(-8deg);
  }
  100% {
    transform: rotateY(-178deg);
  }
}
@keyframes pageLift {
  0% {
    transform: rotateY(0);
  }
  40% {
    transform: rotateY(-14deg);
    box-shadow:
      0 0 0 1px rgba(0, 0, 0, 0.05),
      1.4em 0.6em 1.6em rgba(0, 0, 0, 0.14);
  }
  100% {
    transform: rotateY(0);
  }
}
@keyframes tabIn {
  from {
    transform: translateX(-35%);
  }
}

@media (prefers-reduced-motion: reduce) {
  .cover {
    animation: none;
    transform: rotateY(-178deg);
  }
  .topPage,
  .tab {
    animation: none;
  }
}
```

### `src/components/FolderMockup.tsx`

```tsx
"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import { useRef } from "react";
import { chapters } from "@/content/chapters";
import { FolderIcon } from "./Icons";
import s from "./FolderMockup.module.css";

/**
 * Hochwertiges, in CSS gebautes Ordner-Mock-up.
 * Beim Laden öffnet sich der Deckel, die oberste Seite hebt sich kurz an und legt sich wieder ab.
 * Alles in %/cqi aufgebaut → skaliert verlustfrei auf jede Breite.
 */
export function FolderMockup() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 60]);
  const shadowOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.6]);

  return (
    <div ref={ref} className={s.wrap} role="img" aria-label="Geöffneter festhalt-Familienordner mit acht farbigen Registern und der Kapitelseite „Einstieg & Überblick“">
      <motion.div className={s.desk} style={{ y }}>
        <motion.div className={s.shadow} style={{ opacity: shadowOpacity }} aria-hidden />
        <div className={`${s.binder} ${reduce ? s.static : ""}`} aria-hidden>
          {/* Innenseite links (Deckel-Innenseite) */}
          <div className={s.leftBoard}>
            <div className={s.pocket} />
          </div>

          {/* Ringmechanik */}
          <div className={s.spine}>
            {[0, 1, 2, 3].map((i) => (
              <span key={i} className={s.ring} style={{ "--i": i } as React.CSSProperties} />
            ))}
            <span className={s.bar} />
          </div>

          {/* Papierstapel rechts */}
          <div className={s.rightBoard}>
            <div className={s.stack}>
              <span className={s.stackEdge} style={{ "--n": 3 } as React.CSSProperties} />
              <span className={s.stackEdge} style={{ "--n": 2 } as React.CSSProperties} />
              <span className={s.stackEdge} style={{ "--n": 1 } as React.CSSProperties} />

              {/* Register */}
              <div className={s.tabs}>
                {chapters.map((c, i) => (
                  <span key={c.no} className={s.tab} style={{ "--c": c.color, "--i": i } as React.CSSProperties}>
                    {c.no}
                  </span>
                ))}
              </div>

              {/* Oberste Seite – Kapiteltrenner */}
              <div className={s.topPage}>
                <div className={s.holes} />
                <div className={s.divider}>
                  <FolderIcon className={s.dividerIcon} />
                  <p className={s.dividerKicker}>Kapitel 1</p>
                  <p className={s.dividerTitle}>Einstieg &amp; Überblick</p>
                  <span className={s.dividerLine} />
                </div>
                <div className={s.toc}>
                  <p className={s.tocHead}>Inhalt dieses Kapitels:</p>
                  <ol>
                    {chapters[0].topics.map((t, i) => (
                      <li key={t}>
                        <span>1.{i + 1}</span>
                        {t}
                      </li>
                    ))}
                  </ol>
                </div>
                <p className={s.pageFoot}>festhalt · Der Familienordner</p>
              </div>
            </div>
          </div>

          {/* Vorderdeckel – öffnet sich beim Laden */}
          <div className={s.cover}>
            <div className={s.coverFront}>
              <div className={s.coverPanel}>
                <FolderIcon className={s.coverIcon} />
                <p className={s.coverBrand}>festhalt</p>
                <p className={s.coverSub}>Der Familienordner</p>
                <span className={s.coverLine} />
                <p className={s.coverClaim}>Alles festgehalten. Für alle Fälle.</p>
              </div>
              <div className={s.label}>
                <span>Dieser Ordner gehört</span>
                <i />
                <i />
              </div>
            </div>
            <div className={s.coverBack} />
          </div>
        </div>
      </motion.div>
      <p className={s.caption} aria-hidden>
        Darstellung des ausgedruckten Ordners · Ordner &amp; Register nicht im Lieferumfang
      </p>
    </div>
  );
}
```

### `src/components/Footer.module.css`

```css
.footer {
  background: #1f2a2a;
  color: rgba(255, 255, 255, 0.82);
  padding: 64px 0 calc(28px + var(--sticky-space, 0px));
  font-size: 0.95rem;
}
.grid {
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1.2fr;
  gap: 40px;
}
.desc {
  margin-top: 18px;
  max-width: 34ch;
  color: rgba(255, 255, 255, 0.72);
}
.head {
  font-weight: 700;
  color: #fff;
  margin-bottom: 12px;
}
.col ul {
  list-style: none;
  display: grid;
  gap: 4px;
}
.col a {
  display: inline-flex;
  align-items: center;
  min-height: 36px;
  color: rgba(255, 255, 255, 0.86);
  text-decoration: none;
}
.col a:hover {
  color: #fff;
  text-decoration: underline;
}
.small {
  margin-top: 10px;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.62);
}
.bottom {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 8px 24px;
  margin-top: 48px;
  padding-top: 22px;
  border-top: 1px solid rgba(255, 255, 255, 0.12);
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.6);
}
.footer :global(.placeholder) {
  color: #6b4d00;
}
.footer :focus-visible {
  outline-color: #7fd6cc;
}
@media (max-width: 900px) {
  .grid {
    grid-template-columns: 1fr 1fr;
  }
  .brand {
    grid-column: 1 / -1;
  }
}
@media (max-width: 520px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
```

### `src/components/Footer.tsx`

```tsx
import { site } from "@/config/site";
import { Logo } from "./Logo";
import s from "./Footer.module.css";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className={s.footer}>
      <div className={`container ${s.grid}`}>
        <div className={s.brand}>
          <Logo inverted />
          <p className={s.desc}>
            Der digitale Familienordner zum Ausdrucken: {site.product.pages} Seiten, {site.product.chapters} Kapitel und{" "}
            {site.product.checklists} Checklisten, um Wichtiges geordnet festzuhalten. Keine Rechtsberatung.
          </p>
        </div>

        <nav aria-label="Produkt" className={s.col}>
          <p className={s.head}>Familienordner</p>
          <ul>
            <li>
              <a href="/#einblick">Einblick</a>
            </li>
            <li>
              <a href="/#kapitel">Kapitel</a>
            </li>
            <li>
              <a href="/#produkt">Produktdetails</a>
            </li>
            <li>
              <a href="/#faq">FAQ</a>
            </li>
            <li>
              <a href={site.etsyUrl} target="_blank" rel="noopener noreferrer">
                Etsy-Angebot<span className="visually-hidden"> (öffnet in neuem Tab)</span>
              </a>
            </li>
          </ul>
        </nav>

        <nav aria-label="Rechtliches" className={s.col}>
          <p className={s.head}>Rechtliches</p>
          <ul>
            <li>
              <a href="/impressum/">Impressum</a>
            </li>
            <li>
              <a href="/datenschutz/">Datenschutz</a>
            </li>
            <li>
              <a href="/datenschutz/#cookies">Cookies</a>
            </li>
            <li>
              <a href="/agb-widerruf/">AGB &amp; Widerruf</a>
            </li>
          </ul>
        </nav>

        <div className={s.col}>
          <p className={s.head}>Kontakt</p>
          {site.contactEmail ? (
            <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>
          ) : (
            <p>
              <span className="placeholder">Kontakt-E-Mail ergänzen</span>
            </p>
          )}
          <p className={s.small}>Fragen zu Bestellungen beantworten wir auch über das Nachrichtensystem von Etsy.</p>
        </div>
      </div>
      <div className={`container ${s.bottom}`}>
        <p>
          © {year} {site.brandDisplay} – {site.subtitle}
        </p>
        <p>Diese Website verwendet keine Tracking- oder Marketing-Cookies.</p>
      </div>
    </footer>
  );
}
```

### `src/components/Header.module.css`

```css
.header {
  position: sticky;
  top: 0;
  z-index: 50;
  height: var(--header-h);
  transition:
    background-color var(--dur) var(--ease-out),
    box-shadow var(--dur) var(--ease-out),
    backdrop-filter var(--dur) var(--ease-out);
}
.scrolled {
  background: rgba(250, 246, 238, 0.95);
  backdrop-filter: saturate(1.4) blur(12px);
  -webkit-backdrop-filter: saturate(1.4) blur(12px);
  box-shadow: 0 1px 0 var(--line);
}
.inner {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}
.brand {
  text-decoration: none;
  border-radius: 10px;
}

.nav ul {
  display: flex;
  gap: 4px;
  list-style: none;
}
.nav a {
  position: relative;
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  padding: 0 14px;
  border-radius: 999px;
  color: var(--ink-soft);
  font-weight: 600;
  font-size: 0.95rem;
  text-decoration: none;
  transition:
    color var(--dur-fast) var(--ease-out),
    background-color var(--dur-fast) var(--ease-out);
}
.nav a:hover {
  color: var(--brand-800);
  background: var(--brand-50);
}

.actions {
  display: flex;
  align-items: center;
  gap: 8px;
}
.cta {
  min-height: 44px;
  padding: 0 18px;
  font-size: 0.92rem;
}
.cta svg {
  width: 16px;
  height: 16px;
}
.menuBtn {
  display: none;
  place-items: center;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  border: 1px solid var(--line-strong);
  background: var(--paper);
  cursor: pointer;
}
.menuBtn svg {
  width: 22px;
  height: 22px;
}

.mobile {
  display: none;
}

@media (max-width: 920px) {
  .nav {
    display: none;
  }
  .menuBtn {
    display: grid;
  }
  .mobile {
    display: block;
    position: absolute;
    left: 0;
    right: 0;
    top: var(--header-h);
    background: var(--cream);
    border-bottom: 1px solid var(--line);
    box-shadow: var(--shadow-md);
    padding: 8px 0 20px;
  }
  .mobile[hidden] {
    display: none;
  }
  .mobile ul {
    list-style: none;
    display: grid;
    gap: 6px;
  }
  .mobile a {
    display: flex;
    align-items: center;
    gap: 14px;
    min-height: 52px;
    padding: 0 14px;
    border-radius: 10px;
    background: var(--paper);
    border: 1px solid var(--line);
    color: var(--ink);
    font-weight: 600;
    text-decoration: none;
  }
  .mobileOpen li {
    animation: slideIn 320ms var(--ease-out) both;
    animation-delay: calc(var(--i) * 40ms);
  }
  .tabNo {
    display: inline-grid;
    place-items: center;
    width: 32px;
    height: 24px;
    border-radius: 4px;
    background: var(--brand);
    color: #fff;
    font-size: 0.75rem;
    font-weight: 700;
  }
}
@media (max-width: 520px) {
  .cta {
    display: none;
  }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(16px);
  }
}
```

### `src/components/Header.tsx`

```tsx
"use client";

import { useEffect, useState } from "react";
import { site } from "@/config/site";
import { Logo } from "./Logo";
import { CloseIcon, ExternalIcon, MenuIcon } from "./Icons";
import s from "./Header.module.css";

const nav = [
  { href: "#einblick", label: "Einblick" },
  { href: "#kapitel", label: "Kapitel" },
  { href: "#vorteile", label: "Vorteile" },
  { href: "#produkt", label: "Produkt" },
  { href: "#faq", label: "FAQ" },
];

export function Header({ home = true }: { home?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const prefix = home ? "" : "/";

  return (
    <header className={`${s.header} ${scrolled || open ? s.scrolled : ""}`}>
      <div className={`container ${s.inner}`}>
        <a href={home ? "#top" : "/"} className={s.brand} aria-label={`${site.brand} – ${site.subtitle}, zur Startseite`}>
          <Logo />
        </a>

        <nav aria-label="Hauptnavigation" className={s.nav}>
          <ul>
            {nav.map((n) => (
              <li key={n.href}>
                <a href={prefix + n.href}>{n.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={s.actions}>
          <a href={site.etsyUrl} target="_blank" rel="noopener noreferrer" className={`btn ${s.cta}`} data-cta="header">
            Auf Etsy ansehen
            <ExternalIcon />
            <span className="visually-hidden"> (öffnet Etsy in einem neuen Tab)</span>
          </a>
          <button
            type="button"
            className={s.menuBtn}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
            <span className="visually-hidden">{open ? "Menü schließen" : "Menü öffnen"}</span>
          </button>
        </div>
      </div>

      <div id="mobile-nav" className={`${s.mobile} ${open ? s.mobileOpen : ""}`} hidden={!open}>
        <nav aria-label="Mobile Navigation" className="container">
          <ul>
            {nav.map((n, i) => (
              <li key={n.href} style={{ "--i": i } as React.CSSProperties}>
                <a href={prefix + n.href} onClick={() => setOpen(false)}>
                  <span className={s.tabNo}>{String(i + 1).padStart(2, "0")}</span>
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
```

### `src/components/HeroSection.module.css`

```css
.hero {
  position: relative;
  padding-top: clamp(28px, 5vw, 64px);
  padding-bottom: clamp(40px, 6vw, 72px);
  margin-top: calc(var(--header-h) * -1);
  padding-top: calc(var(--header-h) + clamp(28px, 5vw, 64px));
  background:
    radial-gradient(ellipse 70% 60% at 78% 45%, rgba(255, 250, 238, 0.95), transparent 70%),
    radial-gradient(ellipse 60% 50% at 10% 0%, rgba(223, 232, 225, 0.7), transparent 70%),
    linear-gradient(180deg, var(--cream) 0%, var(--sand) 100%);
  overflow: hidden;
}
.grid {
  display: grid;
  grid-template-columns: minmax(0, 0.95fr) minmax(0, 1.15fr);
  gap: clamp(24px, 4vw, 56px);
  align-items: center;
}
.copy {
  animation: copyIn 700ms var(--ease-out) both;
}
.title {
  color: var(--ink);
}
.accent {
  color: var(--brand);
}
.lead {
  max-width: 34rem;
}
.ctas {
  margin-top: 32px;
}
.visual {
  position: relative;
}
.handNote {
  position: absolute;
  right: 2%;
  top: -2%;
  font-size: clamp(1rem, 1.6vw, 1.3rem);
  line-height: 1.3;
  transform: rotate(-6deg);
  text-align: right;
  animation: fadeIn 600ms var(--ease-out) 2200ms both;
}

.trust {
  list-style: none;
  margin-top: clamp(32px, 5vw, 56px);
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  border-radius: var(--radius);
  background: rgba(255, 253, 248, 0.75);
  border: 1px solid var(--line);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
}
.trust li {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 18px 20px;
  font-size: 0.95rem;
  color: var(--ink-soft);
  line-height: 1.35;
}
.trust li + li {
  border-left: 1px solid var(--line);
}
.trust svg {
  flex: none;
  width: 26px;
  height: 26px;
  color: var(--brand);
}
.trust strong {
  display: block;
  color: var(--ink);
}

@media (max-width: 960px) {
  .grid {
    grid-template-columns: 1fr;
  }
  .visual {
    max-width: 680px;
    margin-inline: auto;
    width: 100%;
  }
  .handNote {
    display: none;
  }
  .trust {
    grid-template-columns: repeat(2, 1fr);
  }
  .trust li:nth-child(3) {
    border-left: 0;
  }
  .trust li:nth-child(n + 3) {
    border-top: 1px solid var(--line);
  }
}
@media (max-width: 420px) {
  .trust li {
    padding: 14px 12px;
    gap: 8px;
    font-size: 0.875rem;
  }
  .trust svg {
    width: 22px;
    height: 22px;
  }
}

@keyframes copyIn {
  from {
    opacity: 0;
    transform: translateY(14px);
  }
}
@keyframes fadeIn {
  from {
    opacity: 0;
  }
}
```

### `src/components/HeroSection.tsx`

```tsx
"use client";

import { site } from "@/config/site";
import { EtsyLink } from "./EtsyLink";
import { FolderMockup } from "./FolderMockup";
import { ClockIcon, EyeIcon, PagesIcon, PrinterIcon, DownloadIcon } from "./Icons";
import { useViewer } from "./ViewerContext";
import s from "./HeroSection.module.css";

export function HeroSection() {
  const { openAt } = useViewer();

  return (
    <section className={s.hero} aria-labelledby="hero-title" id="top">
      <div className={`container ${s.grid}`}>
        <div className={s.copy}>
          <p className="eyebrow">
            <span className="reg">01</span> Der digitale Familienordner
          </p>
          <h1 id="hero-title" className={`display ${s.title}`}>
            Gut vorbereitet.
            <br />
            <span className={s.accent}>Wenn es darauf ankommt.</span>
          </h1>
          <p className={`lead ${s.lead}`}>
            Notfallkontakte, wichtige Unterlagen und persönliche Vorsorge – übersichtlich an einem Ort. Zu Hause
            ausdrucken und in deinem eigenen Tempo ausfüllen.
          </p>

          <div className={`btn-row ${s.ctas}`}>
            <EtsyLink placement="hero" icon="arrow">
              Familienordner entdecken
            </EtsyLink>
            <a
              href="#einblick"
              className="btn btn-secondary"
              onClick={(e) => {
                e.preventDefault();
                openAt();
              }}
            >
              <EyeIcon />
              Einblick in die {site.product.pages} Seiten
            </a>
          </div>
          <p className="cta-note">Digitales Produkt · erhältlich über Etsy · kein Versand eines physischen Ordners</p>
        </div>

        <div className={s.visual}>
          <FolderMockup />
          <p className={`hand ${s.handNote}`} aria-hidden>
            {site.product.chapters} Kapitel.
            <br />
            {site.product.checklists} Checklisten.
          </p>
        </div>
      </div>

      <div className="container">
        <ul className={s.trust} aria-label="Produkteigenschaften">
          <li>
            <PagesIcon />
            <span>
              <strong>{site.product.pages} Seiten</strong> in {site.product.chapters} Kapiteln
            </span>
          </li>
          <li>
            <DownloadIcon />
            <span>
              <strong>Digitales Produkt</strong> zum Herunterladen
            </span>
          </li>
          <li>
            <PrinterIcon />
            <span>
              <strong>Zu Hause</strong> ausdruckbar
            </span>
          </li>
          <li>
            <ClockIcon />
            <span>
              <strong>Im eigenen Tempo</strong> ausfüllbar
            </span>
          </li>
        </ul>
      </div>
    </section>
  );
}
```

### `src/components/HowItWorks.module.css`

```css
.section {
  padding-block: clamp(72px, 10vw, 120px);
  background: linear-gradient(180deg, var(--cream), var(--sage));
}
.steps {
  list-style: none;
  position: relative;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: clamp(18px, 3vw, 36px);
  counter-reset: step;
}
.steps::before {
  content: "";
  position: absolute;
  left: 12%;
  right: 12%;
  top: 74px;
  border-top: 2px dashed var(--brand-100);
}
.step {
  position: relative;
  padding: 44px 28px 30px;
  border-radius: 4px 12px 12px 12px;
  background: var(--paper);
  box-shadow: var(--shadow-paper);
  text-align: center;
}
.tab {
  position: absolute;
  top: -16px;
  left: 0;
  padding: 6px 16px 8px;
  border-radius: 10px 10px 0 0;
  background: var(--brand);
  color: #fff;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.04em;
}
.icon {
  position: relative;
  display: grid;
  place-items: center;
  width: 64px;
  height: 64px;
  margin: 0 auto 18px;
  border-radius: 50%;
  background: var(--brand-50);
  color: var(--brand);
  box-shadow: 0 0 0 8px var(--paper);
}
.icon svg {
  width: 30px;
  height: 30px;
}
.title {
  font-size: 1.25rem;
  font-weight: 700;
}
.text {
  margin-top: 10px;
  color: var(--ink-soft);
}

@media (max-width: 860px) {
  .steps {
    grid-template-columns: 1fr;
    gap: 34px;
  }
  .steps::before {
    display: none;
  }
}
```

### `src/components/HowItWorks.tsx`

```tsx
import { site } from "@/config/site";
import { DownloadIcon, PrinterIcon, ExternalIcon } from "./Icons";
import { Reveal } from "./Reveal";
import s from "./HowItWorks.module.css";

const steps = [
  {
    icon: <ExternalIcon />,
    title: "Auf Etsy erwerben",
    text: "Du kaufst den Familienordner als digitales Produkt im Etsy-Shop. Zahlung und Abwicklung laufen über Etsy.",
  },
  {
    icon: <DownloadIcon />,
    title: "Dateien herunterladen",
    text: `Nach dem Kauf stellt Etsy dir die Dateien${site.fileFormat ? ` (${site.fileFormat})` : ""} gemäß den Bedingungen des Angebots zum Download bereit.`,
  },
  {
    icon: <PrinterIcon />,
    title: "Ausdrucken & ausfüllen",
    text: "Drucke die Seiten zu Hause aus, hefte sie in einen Ordner und fülle sie in deinem eigenen Tempo aus.",
  },
];

export function HowItWorks() {
  return (
    <section id="ablauf" className={s.section} aria-labelledby="ablauf-title">
      <div className="container">
        <Reveal className="section-head center">
          <p className="eyebrow">
            <span className="reg">08</span> So funktioniert es
          </p>
          <h2 id="ablauf-title" className="h2">
            In drei Schritten zum eigenen Ordner.
          </h2>
        </Reveal>
        <ol className={s.steps}>
          {steps.map((st, i) => (
            <Reveal as="li" key={st.title} delay={i * 120} className={s.step}>
              <span className={s.tab} aria-hidden>
                Schritt {i + 1}
              </span>
              <span className={s.icon}>{st.icon}</span>
              <h3 className={s.title}>
                <span className="visually-hidden">Schritt {i + 1}: </span>
                {st.title}
              </h3>
              <p className={s.text}>{st.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
```

### `src/components/Icons.tsx`

```tsx
import type { SVGProps } from "react";
import type { IconName } from "@/content/sheets";

type P = SVGProps<SVGSVGElement>;
const base = (p: P): P => ({
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
  focusable: false,
  ...p,
});

/** Ordner-Symbol im Stil der Festhalt-Bildmarke (bis eine Original-Logodatei vorliegt). */
export const FolderIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M3 7.5V6a1.5 1.5 0 0 1 1.5-1.5h4.2l1.8 2h8.5A1.5 1.5 0 0 1 20.5 8v1" />
    <path d="M2.6 10.2A1.2 1.2 0 0 1 3.8 9h16.6a1.2 1.2 0 0 1 1.17 1.46l-1.7 7.6A1.5 1.5 0 0 1 18.4 19.2H5.4a1.5 1.5 0 0 1-1.47-1.2L2.6 10.2Z" />
  </svg>
);
export const ArrowRight = (p: P) => (
  <svg {...base({ className: "arrow", ...p })}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);
export const ArrowLeft = (p: P) => (
  <svg {...base(p)}>
    <path d="M19 12H5M11 6l-6 6 6 6" />
  </svg>
);
export const ExternalIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M14 4h6v6M20 4l-9 9M18 14v4.5A1.5 1.5 0 0 1 16.5 20h-11A1.5 1.5 0 0 1 4 18.5v-11A1.5 1.5 0 0 1 5.5 6H10" />
  </svg>
);
export const EyeIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);
export const PlusIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);
export const MinusIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M5 12h14" />
  </svg>
);
export const ExpandIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />
  </svg>
);
export const CloseIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);
export const CheckIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="m5 12.5 4.2 4L19 7" />
  </svg>
);
export const MenuIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);
export const PrinterIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M7 9V3.5h10V9M7 17H4.5A1.5 1.5 0 0 1 3 15.5v-5A1.5 1.5 0 0 1 4.5 9h15a1.5 1.5 0 0 1 1.5 1.5v5a1.5 1.5 0 0 1-1.5 1.5H17" />
    <path d="M7 14h10v6.5H7z" />
  </svg>
);
export const DownloadIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 4v11M7 10l5 5 5-5M4 19.5h16" />
  </svg>
);
export const ClockIcon = (p: P) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </svg>
);
export const PagesIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M8 3.5h8.5L20 7v11.5a1.5 1.5 0 0 1-1.5 1.5H8A1.5 1.5 0 0 1 6.5 18.5V5A1.5 1.5 0 0 1 8 3.5Z" />
    <path d="M16 3.5V7h4M3.5 7v12A2 2 0 0 0 5.5 21H15" />
  </svg>
);
export const ListCheckIcon = (p: P) => (
  <svg {...base(p)}>
    <rect x="4.5" y="3.5" width="15" height="17" rx="1.5" />
    <path d="m8 9 1.5 1.5L12 8M8 14.5l1.5 1.5 2.5-2.5M14.5 9.5H16M14.5 15H16" />
  </svg>
);
export const SearchIcon = (p: P) => (
  <svg {...base(p)}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="m20 20-4.2-4.2" />
  </svg>
);
export const SproutIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 20v-8M12 12c0-4 3-6.5 7-6.5 0 4-3 6.5-7 6.5ZM12 14c0-3-2.4-5-5.5-5 0 3 2.4 5 5.5 5Z" />
  </svg>
);
export const InfoIcon = (p: P) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 11v5M12 8h.01" />
  </svg>
);
export const LightbulbIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.6 10.8c.6.5 1.1 1.3 1.1 2.2h5c0-.9.5-1.7 1.1-2.2A6 6 0 0 0 12 3Z" />
  </svg>
);

const sheetIcons: Record<IconName, (p: P) => React.ReactElement> = {
  contacts: (p) => (
    <svg {...base(p)}>
      <path d="M4 10.5 12 4l8 6.5V19a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-8.5Z" />
      <path d="M10 20v-5h4v5" />
    </svg>
  ),
  document: (p) => <PagesIcon {...p} />,
  heart: (p) => (
    <svg {...base(p)}>
      <path d="M12 20s-7.5-4.6-7.5-10A4.3 4.3 0 0 1 12 7.4 4.3 4.3 0 0 1 19.5 10c0 5.4-7.5 10-7.5 10Z" />
      <path d="M8 12h2.2l1.2-2 1.6 4 1.2-2H16" />
    </svg>
  ),
  pen: (p) => (
    <svg {...base(p)}>
      <path d="m15 5 4 4L9 19H5v-4L15 5Z" />
      <path d="M13 7l4 4" />
    </svg>
  ),
  cross: (p) => (
    <svg {...base(p)}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M10 7.5h4v2.5h2.5v4H14v2.5h-4V14H7.5v-4H10z" />
    </svg>
  ),
  person: (p) => (
    <svg {...base(p)}>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20c.8-3.6 3.6-5.5 7-5.5s6.2 1.9 7 5.5" />
    </svg>
  ),
  plane: (p) => (
    <svg {...base(p)}>
      <path d="m3.5 13 4.5 1 3-3-6-4 2-1.5 8 2.5 3.2-3.2a1.8 1.8 0 0 1 2.5 2.5L17.5 10.5l2.5 8-1.5 2-4-6-3 3 1 4.5-1.5 1.5-2.2-4.3L4.5 17 3.5 13Z" />
    </svg>
  ),
  coins: (p) => (
    <svg {...base(p)}>
      <ellipse cx="9" cy="7" rx="5" ry="2.2" />
      <path d="M4 7v4c0 1.2 2.2 2.2 5 2.2M4 11v4c0 1.2 2.2 2.2 5 2.2" />
      <ellipse cx="15" cy="13" rx="5" ry="2.2" />
      <path d="M10 13v4c0 1.2 2.2 2.2 5 2.2s5-1 5-2.2v-4" />
    </svg>
  ),
  shield: (p) => (
    <svg {...base(p)}>
      <path d="M12 3.5 19 6v5.5c0 4.4-3 7.6-7 9-4-1.4-7-4.6-7-9V6l7-2.5Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  ),
  lock: (p) => (
    <svg {...base(p)}>
      <rect x="5" y="10.5" width="14" height="10" rx="1.5" />
      <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5M12 14.5v2.5" />
    </svg>
  ),
  laptop: (p) => (
    <svg {...base(p)}>
      <rect x="4.5" y="5" width="15" height="10" rx="1.2" />
      <path d="M2.5 18.5h19" />
    </svg>
  ),
  family: (p) => (
    <svg {...base(p)}>
      <circle cx="8" cy="7" r="2.6" />
      <circle cx="16" cy="7" r="2.6" />
      <path d="M3.5 19v-3.2A3.3 3.3 0 0 1 6.8 12.5h2.4a3.3 3.3 0 0 1 3.3 3.3V19M11.5 19v-3.2a3.3 3.3 0 0 1 3.3-3.3h2.4a3.3 3.3 0 0 1 3.3 3.3V19" />
    </svg>
  ),
  rings: (p) => (
    <svg {...base(p)}>
      <circle cx="9" cy="14" r="5" />
      <circle cx="15" cy="12" r="5" />
      <path d="m13.5 4 1.5 2 1.5-2" />
    </svg>
  ),
  paw: (p) => (
    <svg {...base(p)}>
      <ellipse cx="12" cy="16" rx="4" ry="3.4" />
      <circle cx="6.5" cy="11" r="1.7" />
      <circle cx="9.5" cy="6.8" r="1.7" />
      <circle cx="14.5" cy="6.8" r="1.7" />
      <circle cx="17.5" cy="11" r="1.7" />
    </svg>
  ),
  candle: (p) => (
    <svg {...base(p)}>
      <path d="M12 3v18M7.5 8h9" />
      <circle cx="12" cy="12" r="9" />
    </svg>
  ),
  home: (p) => (
    <svg {...base(p)}>
      <path d="M4 10.5 12 4l8 6.5V20H4v-9.5Z" />
      <path d="M9.5 20v-4.5h5V20" />
    </svg>
  ),
};

export function SheetIcon({ name, ...p }: { name: IconName } & P) {
  const C = sheetIcons[name];
  return <C {...p} />;
}

export function Stroke(p: P) {
  return (
    <svg viewBox="0 0 120 10" fill="none" aria-hidden focusable={false} className="underline-stroke" {...p}>
      <path d="M2 7c22-4 52-5.5 116-3" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" />
    </svg>
  );
}
```

### `src/components/InteractiveDocumentViewer.module.css`

```css
.section {
  padding-block: clamp(72px, 10vw, 128px);
  background:
    radial-gradient(ellipse 60% 50% at 30% 30%, rgba(255, 252, 245, 0.9), transparent 70%),
    linear-gradient(180deg, var(--sand) 0%, #eee3cf 100%);
}
.head {
  max-width: 760px;
}

.viewer {
  position: relative;
  border-radius: var(--radius-lg);
  background: rgba(255, 253, 248, 0.6);
  border: 1px solid rgba(207, 198, 182, 0.6);
  box-shadow: var(--shadow-lg);
  padding: clamp(14px, 2vw, 24px);
  outline: none;
}
.viewer:focus-visible {
  outline: 3px solid var(--brand);
  outline-offset: 4px;
}

/* ----- Vollbild ----- */
.backdrop {
  position: fixed;
  inset: 0;
  z-index: 90;
  background: rgba(30, 36, 37, 0.55);
  backdrop-filter: blur(4px);
  animation: fade 250ms var(--ease-out) both;
}
.expanded {
  position: fixed;
  z-index: 100;
  inset: 12px;
  overflow: auto;
  overscroll-behavior: contain;
  background: var(--cream);
  animation: pop 320ms var(--ease-out) both;
}
.expanded .body {
  grid-template-columns: minmax(0, 1fr) 320px;
}
.expanded .binder {
  max-width: min(900px, calc((100svh - 260px) / 1.414 + 140px));
  margin-inline: auto;
}

/* ----- Toolbar ----- */
.toolbarTop {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 18px;
}
.progressWrap {
  flex: 1;
  max-width: 420px;
  display: grid;
  gap: 8px;
}
.counter {
  font-size: 0.92rem;
  color: var(--ink-soft);
}
.counter strong {
  color: var(--ink);
}
.progress {
  height: 4px;
  border-radius: 999px;
  background: var(--sand-200);
  overflow: hidden;
}
.progress span {
  display: block;
  height: 100%;
  background: var(--brand);
  border-radius: inherit;
  transition: width var(--dur-slow) var(--ease-out);
}
.tools {
  display: flex;
  align-items: center;
  gap: 6px;
}
.iconBtn {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  border: 1px solid var(--line-strong);
  background: var(--paper);
  color: var(--ink);
  cursor: pointer;
  transition:
    background-color var(--dur-fast) var(--ease-out),
    border-color var(--dur-fast) var(--ease-out),
    transform var(--dur-fast) var(--ease-out);
}
.iconBtn svg {
  width: 20px;
  height: 20px;
}
.iconBtn:hover:not(:disabled) {
  background: var(--brand-50);
  border-color: var(--brand);
}
.iconBtn:active:not(:disabled) {
  transform: scale(0.95);
}
.iconBtn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
.closeBtn {
  background: var(--brand);
  color: #fff;
  border-color: var(--brand);
}
.closeBtn:hover:not(:disabled) {
  background: var(--brand-700);
}
.zoomLabel {
  min-width: 52px;
  text-align: center;
  font-variant-numeric: tabular-nums;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--ink-soft);
}

/* ----- Layout ----- */
.body {
  display: grid;
  grid-template-columns: minmax(0, 580px) minmax(0, 1fr);
  gap: clamp(20px, 4vw, 64px);
  align-items: start;
}

/* ----- Ordner-Bühne ----- */
.binder {
  position: relative;
  width: 100%;
  max-width: max(320px, calc((100svh - 250px) / 1.414 + 100px));
  display: grid;
  grid-template-columns: 40px minmax(0, 1fr) 58px;
  padding: 22px 0 22px 0;
  border-radius: 14px 22px 22px 14px;
  background: linear-gradient(180deg, #f4f1ea, #e9e3d6);
  box-shadow:
    inset 0 1px 0 #fff,
    0 18px 36px -18px rgba(60, 45, 20, 0.4);
  border: 1px solid #ddd5c6;
}
.rings {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding-block: 12%;
  z-index: 4;
}
.rings span {
  width: 46px;
  height: 18px;
  margin-right: -26px;
  border-radius: 50%;
  border: 4px solid #b5b5b0;
  border-left-color: #dededa;
  border-bottom-color: #8e8e8a;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.18);
}

.scrollArea {
  position: relative;
  overflow: hidden;
  touch-action: pan-y;
  border-radius: 4px;
}
.zoomed {
  overflow: auto;
  max-height: min(78vh, 980px);
  touch-action: auto;
  cursor: grab;
}
.stage {
  position: relative;
  aspect-ratio: 1 / 1.414;
  perspective: 2200px;
  transition: width var(--dur) var(--ease-out);
  margin-right: 6px;
  margin-bottom: 6px;
}
.page {
  position: absolute;
  inset: 0;
  transform-origin: 0% 50%;
  transform-style: preserve-3d;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  will-change: transform;
}
.pageShade {
  position: absolute;
  inset: 0;
  pointer-events: none;
  border-radius: 3px 8px 8px 3px;
  background: linear-gradient(90deg, rgba(0, 0, 0, 0.07), transparent 9%);
}
.under {
  position: absolute;
  inset: 0;
  z-index: 0;
  transform: translate(3px, 3px);
  background: #f7f3eb;
  border-radius: 3px 8px 8px 3px;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.04);
}
.under2 {
  transform: translate(6px, 6px);
  background: #f1ece2;
}

/* Register */
.tabs {
  display: grid;
  grid-template-rows: repeat(8, 1fr);
  gap: 6px;
  padding-block: 2px;
  margin-left: -2px;
  z-index: 5;
}
.tab {
  --c: var(--brand);
  position: relative;
  display: grid;
  place-items: center start;
  padding-left: 14px;
  min-height: 44px;
  border: 0;
  border-radius: 0 10px 10px 0;
  background: linear-gradient(90deg, color-mix(in srgb, var(--c) 78%, black), var(--c) 35%);
  color: #fff;
  font-weight: 700;
  font-size: 0.95rem;
  cursor: pointer;
  transform: translateX(-12px);
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.15);
  transition:
    transform var(--dur) var(--ease-out),
    filter var(--dur) var(--ease-out),
    box-shadow var(--dur) var(--ease-out);
  filter: saturate(0.85);
}
.tab:hover {
  transform: translateX(-6px);
  filter: saturate(1);
}
.tabActive {
  transform: translateX(0);
  filter: saturate(1.05);
  box-shadow: 4px 3px 10px rgba(0, 0, 0, 0.22);
}
.tabActive:hover {
  transform: translateX(0);
}
.tab:focus-visible {
  outline-offset: 1px;
}

/* ----- Panel ----- */
.panel {
  padding: 4px 4px 0;
}
.panelKicker {
  font-weight: 700;
  font-size: 0.85rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  filter: brightness(0.8);
}
.panelTitle {
  font-family: var(--font-serif);
  font-weight: 560;
  font-size: clamp(1.6rem, 2.4vw, 2.1rem);
  margin-top: 6px;
}
.panelText {
  margin-top: 12px;
  color: var(--ink-soft);
}
.topics {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 18px;
}
.topics li {
  padding: 6px 12px;
  border-radius: 999px;
  background: var(--paper);
  border: 1px solid var(--line);
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--ink-soft);
}
.nav {
  display: flex;
  gap: 10px;
  margin-top: 26px;
}
.nav :global(.btn) {
  flex: 1;
}
.nav :global(.btn:disabled) {
  opacity: 0.45;
  cursor: not-allowed;
  transform: none;
}
.panelCta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px 18px;
  margin-top: 22px;
  padding-top: 22px;
  border-top: 1px solid var(--line);
}
.textLink {
  font-weight: 600;
  min-height: 44px;
  display: inline-flex;
  align-items: center;
}
.disclaimer {
  display: flex;
  gap: 10px;
  margin-top: 20px;
  font-size: 0.85rem;
  color: var(--ink-mute);
  line-height: 1.5;
}
.disclaimer svg {
  flex: none;
  width: 18px;
  height: 18px;
  margin-top: 2px;
}

/* ----- Leiste ----- */
.strip {
  display: flex;
  gap: 10px;
  margin-top: 22px;
  padding: 6px 2px 10px;
  overflow-x: auto;
  scrollbar-width: thin;
}
.thumb {
  --c: var(--brand);
  flex: none;
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 92px;
  height: 120px;
  padding: 10px 9px;
  border-radius: 3px 6px 6px 3px;
  border: 1px solid var(--line);
  background: var(--paper);
  text-align: left;
  cursor: pointer;
  box-shadow: var(--shadow-sm);
  transition:
    transform var(--dur) var(--ease-out),
    box-shadow var(--dur) var(--ease-out),
    border-color var(--dur) var(--ease-out);
}
.thumb:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-md);
}
.thumbActive {
  border-color: var(--c);
  box-shadow: 0 0 0 2px var(--c), var(--shadow-md);
  transform: translateY(-3px);
}
.thumbBar {
  height: 3px;
  border-radius: 2px;
  background: var(--c);
}
.thumbTitle {
  font-size: 0.68rem;
  font-weight: 700;
  line-height: 1.2;
  color: var(--ink);
}
.thumbLines {
  flex: 1;
  background: repeating-linear-gradient(180deg, transparent 0 7px, #ebe5d9 7px 8px);
}
.hint {
  margin-top: 6px;
  font-size: 0.8rem;
  color: var(--ink-mute);
  text-align: center;
}

@media (max-width: 960px) {
  .body,
  .expanded .body {
    grid-template-columns: 1fr;
  }
  .binder {
    max-width: 620px;
    width: 100%;
    margin-inline: auto;
  }
}
@media (max-width: 560px) {
  .viewer {
    padding: 12px;
    border-radius: var(--radius);
  }
  .expanded {
    inset: 0;
    border-radius: 0;
  }
  .binder {
    grid-template-columns: 14px minmax(0, 1fr) 40px;
    padding: 12px 0;
  }
  .rings span {
    width: 26px;
    height: 12px;
    border-width: 3px;
    margin-right: -14px;
  }
  .tab {
    padding-left: 8px;
    font-size: 0.78rem;
    min-height: 40px;
    transform: translateX(-8px);
  }
  .tab:hover {
    transform: translateX(-4px);
  }
  .tabs {
    gap: 4px;
  }
  .toolbarTop {
    flex-wrap: wrap;
  }
  .progressWrap {
    max-width: none;
    min-width: 100%;
    order: 2;
  }
  .tools {
    margin-left: auto;
  }
  .navLabel {
    display: inline;
  }
}

@keyframes fade {
  from {
    opacity: 0;
  }
}
@keyframes pop {
  from {
    opacity: 0;
    transform: scale(0.98);
  }
}
```

### `src/components/InteractiveDocumentViewer.tsx`

```tsx
"use client";

import { AnimatePresence, motion, type Variants } from "framer-motion";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { site } from "@/config/site";
import { chapters } from "@/content/chapters";
import { sheets } from "@/content/sheets";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import { EtsyLink } from "./EtsyLink";
import { ArrowLeft, ArrowRight, CloseIcon, ExpandIcon, InfoIcon, MinusIcon, PlusIcon } from "./Icons";
import { PaperSheet } from "./PaperSheet";
import { Reveal } from "./Reveal";
import { useViewer } from "./ViewerContext";
import s from "./InteractiveDocumentViewer.module.css";

const ZOOMS = [1, 1.25, 1.5, 1.75, 2];
const FLIP_MS = 560;

const flip: Variants = {
  enter: (dir: number) =>
    dir > 0
      ? { rotateY: 0, zIndex: 1, opacity: 1, boxShadow: "0 0 0 rgba(0,0,0,0)" }
      : { rotateY: -100, zIndex: 3, opacity: 1 },
  center: { rotateY: 0, zIndex: 2, opacity: 1, transition: { duration: FLIP_MS / 1000, ease: [0.3, 0.7, 0.2, 1] } },
  exit: (dir: number) =>
    dir > 0
      ? { rotateY: -100, zIndex: 3, opacity: 1, transition: { duration: FLIP_MS / 1000, ease: [0.45, 0.05, 0.4, 1] } }
      : { rotateY: 0, zIndex: 1, opacity: 1, transition: { duration: FLIP_MS / 1000 } },
};
const fade: Variants = {
  enter: { opacity: 0 },
  center: { opacity: 1, transition: { duration: 0 } },
  exit: { opacity: 0, transition: { duration: 0 } },
};

export function InteractiveDocumentViewer() {
  const { index, setIndex, expanded, setExpanded, viewerRef } = useViewer();
  const reduce = useReducedMotionSafe();
  const [dir, setDir] = useState(1);
  const [zoomIdx, setZoomIdx] = useState(0);
  const expandBtnRef = useRef<HTMLButtonElement>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const titleId = useId();

  const total = sheets.length;
  const sheet = sheets[index];
  const chapter = chapters.find((c) => c.no === sheet.chapter)!;
  const zoom = ZOOMS[zoomIdx];

  const go = useCallback(
    (to: number) => {
      const next = Math.max(0, Math.min(total - 1, to));
      if (next === index) return;
      setDir(next > index ? 1 : -1);
      setIndex(next);
    },
    [index, setIndex, total],
  );
  const prev = () => go(index - 1);
  const next = () => go(index + 1);

  const goChapter = (no: string) => {
    const i = sheets.findIndex((sh) => sh.chapter === no);
    if (i >= 0) go(i);
  };

  // Tastatur
  const onKeyDown = (e: React.KeyboardEvent) => {
    if ((e.target as HTMLElement).closest("input, textarea")) return;
    switch (e.key) {
      case "ArrowRight":
      case "PageDown":
        e.preventDefault();
        next();
        break;
      case "ArrowLeft":
      case "PageUp":
        e.preventDefault();
        prev();
        break;
      case "Home":
        e.preventDefault();
        go(0);
        break;
      case "End":
        e.preventDefault();
        go(total - 1);
        break;
      case "+":
      case "=":
        setZoomIdx((z) => Math.min(ZOOMS.length - 1, z + 1));
        break;
      case "-":
        setZoomIdx((z) => Math.max(0, z - 1));
        break;
      case "Escape":
        if (expanded) {
          e.preventDefault();
          closeExpanded();
        }
        break;
      case "Tab":
        if (expanded) trapFocus(e);
        break;
    }
  };

  const trapFocus = (e: React.KeyboardEvent) => {
    const root = viewerRef.current;
    if (!root) return;
    const f = Array.from(
      root.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'),
    ).filter((el) => el.offsetParent !== null);
    if (!f.length) return;
    const first = f[0];
    const last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  const closeExpanded = useCallback(() => {
    setExpanded(false);
    window.setTimeout(() => expandBtnRef.current?.focus(), 0);
  }, [setExpanded]);

  // Vollbild: Scroll sperren & Fokus setzen
  useEffect(() => {
    if (!expanded) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    viewerRef.current?.focus({ preventScroll: true });
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [expanded, viewerRef]);

  // Swipe (nur ohne Zoom)
  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touch.current = { x: t.clientX, y: t.clientY };
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const start = touch.current;
    touch.current = null;
    if (!start || zoom > 1) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - start.x;
    const dy = t.clientY - start.y;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.4) {
      if (dx < 0) next();
      else prev();
    }
  };

  const progress = ((index + 1) / total) * 100;

  return (
    <section id="einblick" className={s.section} aria-labelledby="viewer-title">
      <div className="container">
        <Reveal className={`section-head ${s.head}`}>
          <p className="eyebrow">
            <span className="reg">04</span> Blick hinein
          </p>
          <h2 id="viewer-title" className="h2">
            Blättere durch den Familienordner.
          </h2>
          <p className="lead">
            Wähle ein Register oder blättere Seite für Seite. So bekommst du ein Gefühl dafür, wie die{" "}
            {site.product.pages} Seiten aufgebaut sind.
          </p>
        </Reveal>
      </div>

      <div className={expanded ? s.backdrop : undefined} onClick={expanded ? closeExpanded : undefined} aria-hidden />

      <div className={`container ${s.outer}`}>
        <div
          ref={viewerRef}
          className={`${s.viewer} ${expanded ? s.expanded : ""}`}
          tabIndex={-1}
          onKeyDown={onKeyDown}
          role={expanded ? "dialog" : "region"}
          aria-modal={expanded || undefined}
          aria-labelledby={titleId}
          aria-roledescription="Dokument-Vorschau"
        >
          <p id={titleId} className="visually-hidden">
            Vorschau des Familienordners. Mit den Pfeiltasten blättern, mit Plus und Minus zoomen.
          </p>

          {/* Kopfzeile */}
          <div className={s.toolbarTop}>
            <div className={s.progressWrap}>
              <span className={s.counter}>
                Vorschaublatt <strong>{index + 1}</strong> von {total}
              </span>
              <div
                className={s.progress}
                role="progressbar"
                aria-label="Fortschritt in der Vorschau"
                aria-valuemin={1}
                aria-valuemax={total}
                aria-valuenow={index + 1}
              >
                <span style={{ width: `${progress}%` }} />
              </div>
            </div>
            <div className={s.tools}>
              <button
                type="button"
                className={s.iconBtn}
                onClick={() => setZoomIdx((z) => Math.max(0, z - 1))}
                disabled={zoomIdx === 0}
                aria-label="Verkleinern"
              >
                <MinusIcon />
              </button>
              <span className={s.zoomLabel} aria-live="polite">
                {Math.round(zoom * 100)} %
              </span>
              <button
                type="button"
                className={s.iconBtn}
                onClick={() => setZoomIdx((z) => Math.min(ZOOMS.length - 1, z + 1))}
                disabled={zoomIdx === ZOOMS.length - 1}
                aria-label="Vergrößern"
              >
                <PlusIcon />
              </button>
              {expanded ? (
                <button type="button" className={`${s.iconBtn} ${s.closeBtn}`} onClick={closeExpanded} aria-label="Vollbild schließen">
                  <CloseIcon />
                </button>
              ) : (
                <button
                  ref={expandBtnRef}
                  type="button"
                  className={s.iconBtn}
                  onClick={() => setExpanded(true)}
                  aria-label="Vollbildansicht öffnen"
                >
                  <ExpandIcon />
                </button>
              )}
            </div>
          </div>

          <div className={s.body}>
            {/* Ordner-Bühne */}
            <div className={s.binder}>
              <div className={s.rings} aria-hidden>
                <span />
                <span />
                <span />
              </div>

              <div
                className={`${s.scrollArea} ${zoom > 1 ? s.zoomed : ""}`}
                onTouchStart={onTouchStart}
                onTouchEnd={onTouchEnd}
              >
                <div className={s.stage} style={{ width: `${zoom * 100}%` }}>
                  <AnimatePresence initial={false} custom={dir}>
                    <motion.div
                      key={sheet.id}
                      className={s.page}
                      custom={dir}
                      variants={reduce ? fade : flip}
                      initial="enter"
                      animate="center"
                      exit="exit"
                    >
                      <PaperSheet sheet={sheet} />
                      <span className={s.pageShade} aria-hidden />
                    </motion.div>
                  </AnimatePresence>
                  {/* Papierstapel darunter */}
                  <span className={s.under} aria-hidden />
                  <span className={`${s.under} ${s.under2}`} aria-hidden />
                </div>
              </div>

              {/* Register */}
              <div className={s.tabs} role="group" aria-label="Kapitelregister">
                {chapters.map((c) => {
                  const active = c.no === chapter.no;
                  return (
                    <button
                      key={c.no}
                      type="button"
                      className={`${s.tab} ${active ? s.tabActive : ""}`}
                      style={{ "--c": c.color } as React.CSSProperties}
                      onClick={() => goChapter(c.no)}
                      aria-current={active ? "true" : undefined}
                      aria-label={`Kapitel ${c.no}: ${c.title}`}
                      title={c.title}
                    >
                      <span>{c.no}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Info-Panel */}
            <aside className={s.panel} aria-label="Informationen zum aktuellen Kapitel">
              <p className={s.panelKicker} style={{ color: chapter.color }}>
                Kapitel {chapter.no}
              </p>
              <h3 className={s.panelTitle}>{chapter.title}</h3>
              <p className={s.panelText}>{chapter.description}</p>
              <ul className={s.topics}>
                {chapter.topics.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>

              <div className={s.nav}>
                <button type="button" className="btn btn-secondary" onClick={prev} disabled={index === 0} aria-label="Vorheriges Blatt">
                  <ArrowLeft />
                  <span className={s.navLabel}>Zurück</span>
                </button>
                <button type="button" className="btn btn-secondary" onClick={next} disabled={index === total - 1} aria-label="Nächstes Blatt">
                  <span className={s.navLabel}>Weiter</span>
                  <ArrowRight />
                </button>
              </div>

              <div className={s.panelCta}>
                <EtsyLink placement="viewer">Auf Etsy ansehen</EtsyLink>
                <a href="#produkt" className={s.textLink} onClick={() => expanded && setExpanded(false)}>
                  Zur Produktbeschreibung
                </a>
              </div>

              <p className={s.disclaimer}>
                <InfoIcon />
                <span>
                  Vorschau: nachgestaltete Beispielseiten im Stil des Ordners – eine Auswahl, nicht alle{" "}
                  {site.product.pages} Seiten. Details der Originaldatei können abweichen.
                </span>
              </p>
            </aside>
          </div>

          {/* Seitenleiste mit allen Vorschaublättern */}
          <div className={s.strip} role="group" aria-label="Alle Vorschaublätter">
            {sheets.map((sh, i) => {
              const c = chapters.find((ch) => ch.no === sh.chapter)!;
              return (
                <button
                  key={sh.id}
                  type="button"
                  className={`${s.thumb} ${i === index ? s.thumbActive : ""}`}
                  style={{ "--c": c.color } as React.CSSProperties}
                  onClick={() => go(i)}
                  aria-current={i === index ? "true" : undefined}
                  aria-label={`Blatt ${i + 1}: ${sh.title}`}
                >
                  <span className={s.thumbBar} />
                  <span className={s.thumbTitle}>{sh.title}</span>
                  <span className={s.thumbLines} />
                </button>
              );
            })}
          </div>

          <p className="visually-hidden" aria-live="polite" aria-atomic="true">
            Blatt {index + 1} von {total}: {sheet.title}, Kapitel {chapter.no} {chapter.title}
          </p>
          <p className={s.hint} aria-hidden>
            Tipp: Mit ← → blättern · auf dem Smartphone wischen
          </p>
        </div>
      </div>
    </section>
  );
}
```

### `src/components/LegalPage.module.css`

```css
.main {
  padding-block: 48px 96px;
  background: var(--sand);
  min-height: 70vh;
}
.sheet {
  max-width: 860px;
  margin-inline: auto;
  padding: clamp(28px, 5vw, 56px);
}
.back {
  display: inline-flex;
  min-height: 44px;
  align-items: center;
  font-weight: 600;
}
.title {
  margin: 8px 0 18px;
}
.warn {
  margin-bottom: 28px;
}
.body {
  display: grid;
  gap: 14px;
  color: var(--ink-soft);
}
.body h2 {
  margin-top: 22px;
  font-size: 1.25rem;
  font-weight: 700;
}
.body ul {
  padding-left: 1.2em;
  display: grid;
  gap: 6px;
}
```

### `src/components/LegalPage.tsx`

```tsx
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
```

### `src/components/Logo.module.css`

```css
.logo {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: var(--brand);
}
.mark {
  display: grid;
  place-items: center;
  width: 38px;
  height: 38px;
  border-radius: 10px;
  background: var(--brand);
  color: #fff;
}
.mark svg {
  width: 22px;
  height: 22px;
}
.text {
  display: flex;
  flex-direction: column;
  line-height: 1;
}
.name {
  font-family: var(--font-sans);
  font-weight: 800;
  font-size: 1.32rem;
  letter-spacing: -0.02em;
  color: var(--brand-700);
}
.sub {
  margin-top: 4px;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--ink-soft);
}
.inverted .mark {
  background: #fff;
  color: var(--brand);
}
.inverted .name {
  color: #fff;
}
.inverted .sub {
  color: rgba(255, 255, 255, 0.78);
}
```

### `src/components/Logo.tsx`

```tsx
import { FolderIcon } from "./Icons";
import s from "./Logo.module.css";

/**
 * Wortmarke „festhalt“ mit Ordner-Bildmarke (nachgebaut nach dem Produktmaterial).
 * TODO: Sobald eine Original-Logodatei vorliegt, hier als SVG einsetzen.
 */
export function Logo({ inverted = false }: { inverted?: boolean }) {
  return (
    <span className={`${s.logo} ${inverted ? s.inverted : ""}`}>
      <span className={s.mark}>
        <FolderIcon />
      </span>
      <span className={s.text}>
        <span className={s.name}>festhalt</span>
        <span className={s.sub}>Der Familienordner</span>
      </span>
    </span>
  );
}
```

### `src/components/PaperSheet.module.css`

```css
.sheet {
  --accent: var(--brand);
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  aspect-ratio: 1 / 1.414; /* DIN-Proportion */
  padding: 7% 7% 5% 8%;
  background: var(--paper);
  border-radius: 3px 8px 8px 3px;
  box-shadow: var(--shadow-paper);
  container-type: inline-size;
  overflow: hidden;
  color: var(--ink);
  font-size: clamp(9px, 3.2cqi, 15px);
  line-height: 1.35;
}
.sheet::after {
  /* feine Papierkante */
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  box-shadow: inset 0 0 0 1px rgba(35, 41, 43, 0.05);
  pointer-events: none;
}

.punched {
  padding-left: 13%;
}
.punched::before {
  content: "";
  position: absolute;
  left: 4.6%;
  top: 0;
  bottom: 0;
  width: 3.2cqi;
  background:
    radial-gradient(circle, var(--hole, #e9dfcd) 0 45%, rgba(0, 0, 0, 0.16) 52%, transparent 60%) 50% 18% / 3.2cqi 3.2cqi no-repeat,
    radial-gradient(circle, var(--hole, #e9dfcd) 0 45%, rgba(0, 0, 0, 0.16) 52%, transparent 60%) 50% 50% / 3.2cqi 3.2cqi no-repeat,
    radial-gradient(circle, var(--hole, #e9dfcd) 0 45%, rgba(0, 0, 0, 0.16) 52%, transparent 60%) 50% 82% / 3.2cqi 3.2cqi no-repeat;
}

.head {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 0.9em;
  align-items: start;
  padding-bottom: 0.9em;
  border-bottom: 0.18em solid var(--accent);
  margin-bottom: 1.1em;
}
.icon {
  width: 2.4em;
  height: 2.4em;
  color: var(--accent);
}
.icon svg {
  width: 100%;
  height: 100%;
}
.title {
  font-family: var(--font-sans);
  font-weight: 700;
  font-size: 1.45em;
  line-height: 1.15;
  color: var(--accent);
  filter: saturate(0.9) brightness(0.85);
}
.subtitle {
  margin-top: 0.25em;
  font-size: 0.86em;
  color: var(--ink-soft);
}
.no {
  font-size: 0.75em;
  font-weight: 700;
  color: var(--ink-mute);
}

.body {
  display: flex;
  flex-direction: column;
  gap: 1.2em;
  flex: 1;
  min-height: 0;
}
.blockHead {
  font-weight: 700;
  font-size: 0.86em;
  margin-bottom: 0.5em;
  color: var(--ink);
}
.checklist {
  list-style: none;
  display: grid;
  gap: 0;
}
.checklist li {
  display: flex;
  align-items: center;
  gap: 0.7em;
  padding: 0.45em 0;
  border-bottom: 1px solid #ece6da;
  font-size: 0.86em;
}
.box {
  flex: none;
  width: 0.95em;
  height: 0.95em;
  border: 1.5px solid color-mix(in srgb, var(--accent) 70%, #555);
  border-radius: 2px;
}

.table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.78em;
  table-layout: fixed;
}
.table th {
  text-align: left;
  font-weight: 700;
  padding: 0.55em 0.5em;
  background: color-mix(in srgb, var(--accent) 16%, white);
  color: color-mix(in srgb, var(--accent) 60%, #1e2324);
}
.table td {
  padding: 0.55em 0.5em;
  border-bottom: 1px solid #ece6da;
  border-right: 1px solid #f1ece2;
  height: 2.2em;
}
.table td:last-child {
  border-right: 0;
}

.fields {
  display: grid;
  gap: 0.7em;
}
.field {
  min-height: 2.1em;
  border-bottom: 1px solid #d9d1c2;
  display: flex;
  align-items: flex-end;
  padding-bottom: 0.25em;
  font-size: 0.8em;
  color: var(--ink-soft);
}

.note {
  display: flex;
  gap: 0.6em;
  align-items: flex-start;
  margin-top: auto;
  padding: 0.8em 0.9em;
  border-radius: 0.5em;
  background: #fbf2d9;
  border: 1px solid #f0dfae;
  font-size: 0.78em;
}
.note svg {
  flex: none;
  width: 1.6em;
  height: 1.6em;
  color: #b07d12;
}

.foot {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1em;
  padding-top: 0.7em;
  border-top: 1px solid #ece6da;
  font-size: 0.7em;
  color: var(--ink-mute);
}
.previewTag {
  padding: 0.2em 0.7em;
  border: 1px solid var(--line-strong);
  border-radius: 999px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-weight: 700;
}

.compact .body {
  gap: 0.8em;
}

.imageSheet {
  padding: 0;
}
.imageSheet img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
```

### `src/components/PaperSheet.tsx`

```tsx
import type { Sheet } from "@/content/sheets";
import { chapters } from "@/content/chapters";
import { SheetIcon, LightbulbIcon } from "./Icons";
import s from "./PaperSheet.module.css";

type Props = {
  sheet: Sheet;
  /** Kompakt: für Miniaturen (weniger Zeilen, keine Fußzeile) */
  compact?: boolean;
  /** Ringlochung anzeigen */
  punched?: boolean;
  className?: string;
};

/**
 * Nachgebautes Vorschau-Blatt im Stil der Produktseiten.
 * Immer als „Vorschau“ gekennzeichnet – es handelt sich nicht um eine Originalseite.
 */
export function PaperSheet({ sheet, compact, punched = true, className }: Props) {
  const chapter = chapters.find((c) => c.no === sheet.chapter);
  const color = chapter?.color ?? "var(--brand)";

  if (sheet.image) {
    return (
      <div className={`${s.sheet} ${s.imageSheet} ${className ?? ""}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={sheet.image} alt={`Originalseite: ${sheet.title}`} loading="lazy" decoding="async" />
      </div>
    );
  }

  const blocks = compact ? sheet.blocks.slice(0, 1) : sheet.blocks;

  return (
    <div
      className={`${s.sheet} ${punched ? s.punched : ""} ${compact ? s.compact : ""} ${className ?? ""}`}
      style={{ "--accent": color } as React.CSSProperties}
    >
      <header className={s.head}>
        <span className={s.icon}>
          <SheetIcon name={sheet.icon} />
        </span>
        <div>
          <p className={s.title}>{sheet.title}</p>
          <p className={s.subtitle}>{sheet.subtitle}</p>
        </div>
        <span className={s.no} aria-hidden>
          {sheet.chapter}
        </span>
      </header>

      <div className={s.body}>
        {blocks.map((b, i) => {
          if (b.kind === "checklist") {
            const items = compact ? b.items.slice(0, 5) : b.items;
            return (
              <div key={i} className={s.block}>
                {b.heading && <p className={s.blockHead}>{b.heading}</p>}
                <ul className={s.checklist}>
                  {items.map((it) => (
                    <li key={it}>
                      <span className={s.box} aria-hidden />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            );
          }
          if (b.kind === "table") {
            const rows = compact ? b.rows.slice(0, 5) : b.rows;
            return (
              <div key={i} className={s.block}>
                <table className={s.table}>
                  <thead>
                    <tr>
                      {b.columns.map((c) => (
                        <th key={c} scope="col">
                          {c}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((r) => (
                      <tr key={r}>
                        <td>{r}</td>
                        {b.columns.slice(1).map((c) => (
                          <td key={c} aria-label={`${c}: leer`} />
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          }
          if (b.kind === "fields") {
            return (
              <div key={i} className={s.block}>
                {b.heading && <p className={s.blockHead}>{b.heading}</p>}
                <div className={s.fields}>
                  {b.fields.map((f, j) => (
                    <div key={j} className={s.field}>
                      {f && <span>{f}</span>}
                    </div>
                  ))}
                </div>
              </div>
            );
          }
          return (
            <div key={i} className={s.note}>
              <LightbulbIcon />
              <p>
                <strong>{b.label}:</strong> {b.text}
              </p>
            </div>
          );
        })}
      </div>

      {!compact && (
        <footer className={s.foot}>
          <span>
            Kapitel {sheet.chapter} · {chapter?.title}
          </span>
          <span className={s.previewTag}>Vorschau</span>
        </footer>
      )}
    </div>
  );
}
```

### `src/components/ProblemSolution.module.css`

```css
.section {
  padding-top: clamp(72px, 10vw, 128px);
  padding-bottom: clamp(72px, 10vw, 128px);
  background: var(--cream);
}

/* ----- Scroll-Story ----- */
.scroller {
  position: relative;
  height: 260vh;
}
.sticky {
  position: sticky;
  top: var(--header-h);
  height: calc(100vh - var(--header-h));
  height: calc(100svh - var(--header-h));
  display: flex;
  align-items: center;
  overflow: hidden;
}
.stageWrap {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 40px;
  align-items: center;
}
.stage {
  position: relative;
  width: 100%;
  max-width: 820px;
  aspect-ratio: 16 / 10;
  max-height: calc(100svh - var(--header-h) - 60px);
  margin-inline: auto;
  border-radius: var(--radius-lg);
  background:
    radial-gradient(ellipse at 50% 40%, #f6efe1, transparent 70%),
    linear-gradient(160deg, #efe5d3, #e6d9c2);
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.04), var(--shadow-sm);
  container-type: inline-size;
  overflow: hidden;
}

.steps {
  list-style: none;
  display: grid;
  gap: 18px;
}
.steps li {
  display: flex;
  align-items: center;
  gap: 14px;
  font-family: var(--font-serif);
  font-size: 1.7rem;
  font-weight: 560;
  color: var(--ink);
}
.stepNo {
  display: inline-grid;
  place-items: center;
  width: 38px;
  height: 28px;
  border-radius: 4px;
  background: var(--brand);
  color: #fff;
  font-family: var(--font-sans);
  font-size: 0.8rem;
  font-weight: 700;
}

/* Zettel */
.scrap {
  position: absolute;
  width: 26cqi;
  min-height: 15cqi;
  padding: 2.2cqi 2.4cqi;
  font-size: max(11px, 2.3cqi);
  line-height: 1.3;
  font-weight: 600;
  color: var(--ink);
  box-shadow: 0 0.6cqi 1.6cqi rgba(60, 45, 20, 0.18);
  will-change: transform, left, top;
  hyphens: manual;
}
.note {
  background: #fbf3c8;
  font-family: var(--font-serif);
  font-style: italic;
  font-weight: 500;
}
.paper {
  background: #fff;
  border-top: 0.6cqi solid #cfe3de;
}
.card {
  background: #e8f1ee;
  border-radius: 1cqi;
}
.receipt {
  background: #fff;
  background-image: repeating-linear-gradient(180deg, transparent 0 2.4cqi, #eee 2.4cqi 2.5cqi);
  mask: radial-gradient(circle at 50% 100%, transparent 0.5cqi, #000 0.6cqi) 0 0 / 2cqi 100%;
}

.folderBack {
  position: absolute;
  left: 22%;
  right: 22%;
  top: 22%;
  bottom: 6%;
  border-radius: 1.4cqi;
  background: linear-gradient(180deg, #0b5a53, #0d6961);
  z-index: 1;
}
.folderFront {
  position: absolute;
  left: 20%;
  right: 20%;
  top: 46%;
  bottom: 4%;
  z-index: 20;
  border-radius: 1.4cqi;
  background:
    radial-gradient(circle at 20% 10%, rgba(255, 255, 255, 0.12), transparent 50%),
    var(--brand);
  box-shadow: 0 -0.4cqi 2cqi rgba(0, 0, 0, 0.18);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
  gap: 0.8cqi;
}
.tabs {
  position: absolute;
  top: -4.2cqi;
  left: 5%;
  right: 5%;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 0.8cqi;
}
.tabs span {
  display: grid;
  place-items: center;
  height: 4.4cqi;
  border-radius: 0.8cqi 0.8cqi 0 0;
  color: #fff;
  font-weight: 700;
  font-size: max(10px, 1.7cqi);
}
.frontIcon {
  width: 7cqi;
  height: 7cqi;
  stroke-width: 1.3;
}
.frontBrand {
  font-weight: 800;
  font-size: 4.2cqi;
  letter-spacing: -0.02em;
  line-height: 1;
}
.frontDone {
  display: inline-flex;
  align-items: center;
  gap: 0.8cqi;
  margin-top: 0.6cqi;
  padding: 0.6cqi 1.6cqi;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.16);
  font-size: max(11px, 1.9cqi);
  font-weight: 600;
}
.frontDone svg {
  width: 2.2cqi;
  height: 2.2cqi;
}

/* ----- Statische Variante ----- */
.staticGrid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}
.staticCard {
  margin: 0;
}
.staticCard figcaption {
  margin-top: 10px;
  text-align: center;
  font-weight: 600;
  color: var(--ink-soft);
}
.staticStage {
  composes: stage;
}

/* ----- Lösung ----- */
.solution {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(32px, 5vw, 72px);
  align-items: center;
  margin-top: clamp(64px, 8vw, 112px);
}
.checkSheet {
  padding: 32px 32px 32px 64px;
}
.checkHead {
  font-weight: 700;
  font-size: 1.1rem;
  color: var(--brand-800);
  padding-bottom: 12px;
  margin-bottom: 6px;
  border-bottom: 2px solid var(--brand);
}
.checkSheet ul {
  list-style: none;
}
.checkSheet li {
  display: flex;
  gap: 14px;
  align-items: flex-start;
  padding: 12px 0;
  border-bottom: 1px solid var(--line);
  color: var(--ink);
}
.tick {
  flex: none;
  display: grid;
  place-items: center;
  width: 22px;
  height: 22px;
  margin-top: 2px;
  border-radius: 4px;
  border: 1.5px solid var(--brand);
  color: #fff;
  background: var(--brand);
}
.tick svg {
  width: 16px;
  height: 16px;
  stroke-width: 2.4;
  stroke-dasharray: 24;
  stroke-dashoffset: 24;
}
:global(.is-visible) .tick svg {
  transition: stroke-dashoffset 380ms var(--ease-out);
  transition-delay: calc(400ms + var(--i) * 120ms);
  stroke-dashoffset: 0;
}
@media (prefers-reduced-motion: reduce) {
  .tick svg {
    stroke-dashoffset: 0;
  }
}

@media (max-width: 860px) {
  .scroller {
    height: 220vh;
  }
  .stageWrap {
    grid-template-columns: minmax(0, 1fr);
    gap: 16px;
  }
  .steps {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 6px 14px;
  }
  .steps li {
    font-size: 1rem;
    gap: 6px;
  }
  .stepNo {
    width: 30px;
    height: 22px;
    font-size: 0.7rem;
  }
  .stage {
    aspect-ratio: auto;
    height: min(125vw, calc(100svh - var(--header-h) - 120px));
  }
  .scrap {
    width: 38cqi;
    font-size: max(12px, 3.4cqi);
  }
  .folderBack {
    left: 10%;
    right: 10%;
  }
  .folderFront {
    left: 8%;
    right: 8%;
    top: 52%;
  }
  .tabs {
    top: -5.6cqi;
  }
  .tabs span {
    height: 5.8cqi;
    font-size: 2.6cqi;
  }
  .frontIcon {
    width: 10cqi;
    height: 10cqi;
  }
  .frontBrand {
    font-size: 7cqi;
  }
  .frontDone {
    font-size: 3.4cqi;
  }
  .solution {
    grid-template-columns: 1fr;
  }
  .staticGrid {
    grid-template-columns: 1fr;
  }
}
@media (max-width: 560px) {
  .checkSheet {
    padding: 24px 20px;
  }
}
```

### `src/components/ProblemSolution.tsx`

```tsx
"use client";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import { useRef } from "react";
import { chapters } from "@/content/chapters";
import { CheckIcon, FolderIcon, Stroke } from "./Icons";
import { Reveal } from "./Reveal";
import s from "./ProblemSolution.module.css";

type Scrap = {
  text: string;
  kind: "note" | "paper" | "card" | "receipt";
  from: [number, number, number]; // left %, top %, rotation
  to: [number, number]; // Endposition (left %, top %) im Ordner
};

const scraps: Scrap[] = [
  { text: "Tel. Hausarzt?", kind: "note", from: [4, 8, -9], to: [30, 40] },
  { text: "Versicherungs­nummer …", kind: "paper", from: [62, 4, 7], to: [33, 37] },
  { text: "Wo liegt die Vollmacht?", kind: "note", from: [74, 46, 11], to: [36, 34] },
  { text: "Kontoübersicht", kind: "paper", from: [10, 56, 6], to: [39, 31] },
  { text: "Zugang E-Mail", kind: "card", from: [40, 64, -5], to: [42, 28] },
  { text: "Kündigungsfrist Abo", kind: "receipt", from: [34, 16, -3], to: [45, 25] },
];

const labels = ["Verstreut", "Gesammelt", "Geordnet"];

export function ProblemSolution() {
  const reduce = useReducedMotionSafe();
  return (
    <section className={s.section} aria-labelledby="problem-title">
      <div className="container">
        <Reveal className="section-head center">
          <p className="eyebrow">
            <span className="reg">02</span> Das Problem
          </p>
          <h2 id="problem-title" className="h2">
            Wichtige Informationen gehören an einen Ort.
          </h2>
          <Stroke />
          <p className="lead">
            Telefonnummern, Vertragsdaten, Zugangsdaten und persönliche Wünsche liegen oft verteilt – in Schubladen, auf
            Zetteln, im Kopf. Passiert etwas Unvorhergesehenes, fehlt genau dann der Überblick.
          </p>
        </Reveal>
      </div>

      {reduce ? <StaticStory /> : <ScrollStory />}

      <div className="container">
        <SolutionList />
      </div>
    </section>
  );
}

function ScrollStory() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const folderOpacity = useTransform(scrollYProgress, [0.15, 0.4], [0, 1]);
  const folderY = useTransform(scrollYProgress, [0.15, 0.4], [40, 0]);
  const tabsOpacity = useTransform(scrollYProgress, [0.72, 0.88], [0, 1]);
  const doneOpacity = useTransform(scrollYProgress, [0.82, 0.95], [0, 1]);

  return (
    <div ref={ref} className={s.scroller}>
      <div className={s.sticky}>
        <div className={`container ${s.stageWrap}`}>
          <Steps progress={scrollYProgress} />
          <div className={s.stage} aria-hidden>
            {/* Ordner (Rückwand) */}
            <motion.div className={s.folderBack} style={{ opacity: folderOpacity, y: folderY }} />
            {scraps.map((sc, i) => (
              <ScrapItem key={sc.text} scrap={sc} i={i} progress={scrollYProgress} />
            ))}
            {/* Ordner (Vorderseite mit Registern) */}
            <motion.div className={s.folderFront} style={{ opacity: folderOpacity, y: folderY }}>
              <motion.div className={s.tabs} style={{ opacity: tabsOpacity }}>
                {chapters.map((c) => (
                  <span key={c.no} style={{ background: c.color }}>
                    {c.no}
                  </span>
                ))}
              </motion.div>
              <FolderIcon className={s.frontIcon} />
              <span className={s.frontBrand}>festhalt</span>
              <motion.span className={s.frontDone} style={{ opacity: doneOpacity }}>
                <CheckIcon /> Alles an einem Ort
              </motion.span>
            </motion.div>
          </div>
        </div>
      </div>
      <p className="visually-hidden">
        Illustration: Verstreute Notizzettel und Unterlagen werden Schritt für Schritt gesammelt und in einem Ordner mit
        acht Registern geordnet.
      </p>
    </div>
  );
}

function ScrapItem({ scrap, i, progress }: { scrap: Scrap; i: number; progress: MotionValue<number> }) {
  const start = 0.32 + i * 0.05;
  const end = start + 0.28;
  const left = useTransform(progress, [start, end], [`${scrap.from[0]}%`, `${scrap.to[0]}%`]);
  const top = useTransform(progress, [start, end], [`${scrap.from[1]}%`, `${scrap.to[1]}%`]);
  const rotate = useTransform(progress, [0, start, end], [scrap.from[2] * 1.4, scrap.from[2], 0]);
  const scale = useTransform(progress, [start, end], [1, 0.88]);
  const float = useTransform(progress, [0, 0.3], [0, -10 - i * 3]);

  return (
    <motion.div className={`${s.scrap} ${s[scrap.kind]}`} style={{ left, top, rotate, scale, y: float, zIndex: 2 + i }}>
      {scrap.text}
    </motion.div>
  );
}

function Steps({ progress }: { progress: MotionValue<number> }) {
  const ranges: [number, number, number, number][] = [
    [0, 0.02, 0.28, 0.36],
    [0.3, 0.38, 0.62, 0.7],
    [0.66, 0.74, 0.99, 1],
  ];
  return (
    <ol className={s.steps} aria-hidden>
      {labels.map((l, i) => (
        <Step key={l} label={l} n={i + 1} progress={progress} range={ranges[i]} />
      ))}
    </ol>
  );
}

function Step({ label, n, progress, range }: { label: string; n: number; progress: MotionValue<number>; range: [number, number, number, number] }) {
  const opacity = useTransform(progress, range, n === 1 ? [1, 1, 1, 0.35] : [0.35, 1, 1, 0.35]);
  const x = useTransform(progress, range, n === 1 ? [6, 6, 6, 0] : [0, 6, 6, 0]);
  return (
    <motion.li style={{ opacity, x }}>
      <span className={s.stepNo}>{String(n).padStart(2, "0")}</span>
      {label}
    </motion.li>
  );
}

/** Reduzierte Bewegung: Vorher/Nachher als statische Gegenüberstellung */
function StaticStory() {
  return (
    <div className="container">
      <div className={s.staticGrid}>
        <figure className={s.staticCard}>
          <div className={s.staticStage} aria-hidden>
            {scraps.map((sc, i) => (
              <div
                key={sc.text}
                className={`${s.scrap} ${s[sc.kind]}`}
                style={{ left: `${sc.from[0]}%`, top: `${sc.from[1]}%`, transform: `rotate(${sc.from[2]}deg)`, zIndex: i }}
              >
                {sc.text}
              </div>
            ))}
          </div>
          <figcaption>Vorher: Informationen verstreut</figcaption>
        </figure>
        <figure className={s.staticCard}>
          <div className={s.staticStage} aria-hidden>
            <div className={s.folderFront} style={{ position: "absolute" }}>
              <div className={s.tabs}>
                {chapters.map((c) => (
                  <span key={c.no} style={{ background: c.color }}>
                    {c.no}
                  </span>
                ))}
              </div>
              <FolderIcon className={s.frontIcon} />
              <span className={s.frontBrand}>festhalt</span>
            </div>
          </div>
          <figcaption>Nachher: geordnet in acht Kapiteln</figcaption>
        </figure>
      </div>
    </div>
  );
}

const solutions = [
  "Wichtige Informationen strukturiert festhalten",
  "Relevante Unterlagen und Kontakte übersichtlich sammeln",
  "Persönliche Angaben in Ruhe ergänzen",
  "Bei Bedarf einzelne Seiten ausdrucken",
  "Die eigene Vorsorge bewusster organisieren",
  "Angehörigen das Auffinden wichtiger Informationen erleichtern",
];

function SolutionList() {
  return (
    <div className={s.solution}>
      <Reveal className={s.solutionText}>
        <p className="eyebrow">
          <span className="reg">03</span> Die Lösung
        </p>
        <h3 className="h2">Ein Ordner, der Ordnung schafft.</h3>
        <p className="lead">
          Festhalt – Der Familienordner gibt deinen Informationen eine feste Struktur: {chapters.length} Kapitel, klare
          Checklisten und Seiten zum Ausfüllen. Kein Ersatz für Beratung, aber eine praktische Grundlage, um Wichtiges
          geordnet bereitzuhalten.
        </p>
      </Reveal>
      <Reveal className={`paper punched grain ${s.checkSheet}`} delay={120}>
        <p className={s.checkHead}>Was der Ordner dir erleichtert</p>
        <ul>
          {solutions.map((t, i) => (
            <li key={t} style={{ "--i": i } as React.CSSProperties}>
              <span className={s.tick} aria-hidden>
                <CheckIcon />
              </span>
              {t}
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
  );
}
```

### `src/components/ProductDetails.module.css`

```css
.section {
  padding-block: clamp(72px, 10vw, 128px);
  background: var(--cream);
}
.grid {
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr);
  gap: clamp(24px, 4vw, 56px);
  align-items: start;
}
.gallery {
  position: sticky;
  top: calc(var(--header-h) + 20px);
}
.mainImg {
  position: relative;
  aspect-ratio: 1 / 1;
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: var(--sand);
  box-shadow: var(--shadow-lg);
}
.mainImg img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.wide img {
  object-fit: contain;
  background: #f3efe8;
}
.fadeIn {
  animation: fadeIn 380ms var(--ease-out) both;
}
.thumbs {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 10px;
  margin-top: 14px;
}
.thumb {
  display: grid;
  gap: 6px;
  padding: 0;
  border: 0;
  background: none;
  cursor: pointer;
  text-align: center;
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--ink-soft);
}
.thumb img {
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: 10px;
  border: 2px solid transparent;
  opacity: 0.8;
  transition:
    opacity var(--dur) var(--ease-out),
    border-color var(--dur) var(--ease-out),
    transform var(--dur) var(--ease-out);
}
.thumb:hover img {
  opacity: 1;
  transform: translateY(-2px);
}
.thumbActive {
  color: var(--brand-800);
}
.thumbActive img {
  opacity: 1;
  border-color: var(--brand);
}

.info {
  padding: 34px 34px 30px;
}
.infoKicker {
  font-weight: 700;
  font-size: 0.85rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--brand-700);
  padding-bottom: 12px;
  border-bottom: 2px solid var(--brand);
}
.facts {
  margin: 0;
}
.facts > div {
  display: grid;
  grid-template-columns: 150px 1fr;
  gap: 12px;
  padding: 14px 0;
  border-bottom: 1px solid var(--line);
}
.facts dt {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 600;
  color: var(--ink-soft);
  font-size: 0.95rem;
}
.facts dt svg {
  width: 20px;
  height: 20px;
  color: var(--brand);
  flex: none;
}
.facts dd {
  margin: 0;
  font-weight: 600;
  color: var(--ink);
}
.digitalNote {
  display: flex;
  gap: 12px;
  margin-top: 22px;
  padding: 14px 16px;
  border-radius: 10px;
  background: var(--mint);
  border: 1px solid var(--brand-100);
  font-size: 0.95rem;
}
.digitalNote svg {
  flex: none;
  width: 22px;
  height: 22px;
  color: var(--brand);
  margin-top: 1px;
}
.incl {
  list-style: none;
  display: grid;
  gap: 8px;
  margin: 20px 0 24px;
}
.incl li {
  display: flex;
  gap: 10px;
  align-items: center;
}
.incl svg {
  width: 20px;
  height: 20px;
  color: var(--brand);
  stroke-width: 2.2;
  flex: none;
}
.cta {
  width: 100%;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(1.01);
  }
}

@media (max-width: 960px) {
  .grid {
    grid-template-columns: 1fr;
  }
  .gallery {
    position: static;
  }
}
@media (max-width: 560px) {
  .info {
    padding: 24px 20px;
  }
  .facts > div {
    grid-template-columns: 1fr;
    gap: 4px;
  }
  .thumbs {
    gap: 6px;
  }
  .thumb span {
    display: none;
  }
}
```

### `src/components/ProductDetails.tsx`

```tsx
"use client";

import { useState } from "react";
import { site } from "@/config/site";
import { EtsyLink } from "./EtsyLink";
import { CheckIcon, InfoIcon, ListCheckIcon, PagesIcon, PrinterIcon, DownloadIcon, FolderIcon } from "./Icons";
import { Reveal } from "./Reveal";
import s from "./ProductDetails.module.css";

const gallery = [
  { name: "seiten-einblick", alt: "Aufgeschlagener Familienordner mit den Seiten „Notfallkontakte“ und „Vorsorgevollmacht“, davor weitere Seiten zu Finanzen, Zugangsdaten, Familie und digitalem Nachlass", label: "Seitenansichten" },
  { name: "kapitel-uebersicht", alt: "Geöffneter Ordner mit Kapiteltrenner „Kapitel 1 – Einstieg & Überblick“ und Übersicht aller acht Kapitel", label: "Kapitel" },
  { name: "inhaltsverzeichnis", alt: "Inhaltsverzeichnis des Familienordners mit acht farbigen Kapiteln, Checklisten und wichtigen Hinweisen", label: "Inhalt" },
  { name: "checklisten", alt: "Vierzehn Checklisten-Seiten nebeneinander, unter anderem Notfallkontakte, Vorsorgevollmacht, Patientenverfügung, Pflegefall und Digitaler Nachlass", label: "Checklisten", wide: true },
  { name: "ordner-cover", alt: "Weißer Ringordner mit türkisgrünem Deckblatt „Festhalt – Der Familienordner. Alles festgehalten. Für alle Fälle.“", label: "Deckblatt" },
];

const srcSet = (name: string, wide?: boolean) =>
  wide
    ? `/images/${name}-640.webp 640w, /images/${name}-1024.webp 1024w, /images/${name}-1536.webp 1536w`
    : `/images/${name}-640.webp 640w, /images/${name}-1024.webp 1024w`;

export function ProductDetails() {
  const [active, setActive] = useState(0);
  const img = gallery[active];

  return (
    <section id="produkt" className={s.section} aria-labelledby="produkt-title">
      <div className="container">
        <Reveal className="section-head">
          <p className="eyebrow">
            <span className="reg">07</span> Das Produkt
          </p>
          <h2 id="produkt-title" className="h2">
            Festhalt – Der Familienordner
          </h2>
          <p className="lead">
            Eine digitale Vorlage mit {site.product.pages} Seiten, die du auf Etsy erwirbst, herunterlädst und zu Hause
            ausdruckst. Für einen Ordner, der genau zu deinem Leben passt.
          </p>
        </Reveal>

        <div className={s.grid}>
          <Reveal className={s.gallery}>
            <div className={`${s.mainImg} ${img.wide ? s.wide : ""}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                key={img.name}
                src={`/images/${img.name}-1024.webp`}
                srcSet={srcSet(img.name, img.wide)}
                sizes="(max-width: 960px) 100vw, 640px"
                alt={img.alt}
                width={img.wide ? 1536 : 1254}
                height={img.wide ? 1024 : 1254}
                loading="lazy"
                decoding="async"
                className={s.fadeIn}
              />
            </div>
            <div className={s.thumbs} role="group" aria-label="Produktbilder auswählen">
              {gallery.map((g, i) => (
                <button
                  key={g.name}
                  type="button"
                  className={`${s.thumb} ${i === active ? s.thumbActive : ""}`}
                  onClick={() => setActive(i)}
                  aria-pressed={i === active}
                  aria-label={`Bild ${i + 1}: ${g.label}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`/images/${g.name}-640.webp`} alt="" width={120} height={120} loading="lazy" decoding="async" />
                  <span>{g.label}</span>
                </button>
              ))}
            </div>
          </Reveal>

          <Reveal className={`paper grain ${s.info}`} delay={120}>
            <p className={s.infoKicker}>Produktinformationen</p>
            <dl className={s.facts}>
              <div>
                <dt>
                  <PagesIcon /> Umfang
                </dt>
                <dd>{site.product.pages} Seiten</dd>
              </div>
              <div>
                <dt>
                  <FolderIcon /> Aufbau
                </dt>
                <dd>
                  {site.product.chapters} Kapitel · {site.product.checklists} Checklisten
                </dd>
              </div>
              <div>
                <dt>
                  <DownloadIcon /> Lieferform
                </dt>
                <dd>Digitaler Download über Etsy</dd>
              </div>
              <div>
                <dt>
                  <ListCheckIcon /> Dateiformat
                </dt>
                <dd>{site.fileFormat ?? <span className="placeholder">Dateiformat ergänzen (z. B. PDF)</span>}</dd>
              </div>
              <div>
                <dt>
                  <PrinterIcon /> Nutzung
                </dt>
                <dd>Zu Hause ausdrucken &amp; von Hand ausfüllen</dd>
              </div>
              <div>
                <dt>
                  <InfoIcon /> Preis
                </dt>
                <dd>{site.price ?? "Aktueller Preis im Etsy-Angebot"}</dd>
              </div>
            </dl>

            <div className={s.digitalNote}>
              <InfoIcon />
              <p>
                <strong>Digitales Produkt:</strong> Es wird kein physischer Ordner verschickt. Ringordner, Papier und
                Drucker sind nicht enthalten.
              </p>
            </div>

            <ul className={s.incl}>
              <li>
                <CheckIcon /> Vorlagen zu {site.product.chapters} Lebensbereichen
              </li>
              <li>
                <CheckIcon /> Checklisten für typische Situationen
              </li>
              <li>
                <CheckIcon /> Einzelne Seiten jederzeit erneut druckbar
              </li>
            </ul>

            <EtsyLink placement="product" className={s.cta}>
              Zum Etsy-Angebot
            </EtsyLink>
            <p className="cta-note">Kauf, Zahlung und Download erfolgen über Etsy.</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
```

### `src/components/Reveal.tsx`

```tsx
"use client";

import { useEffect, useRef } from "react";

type Props = {
  as?: "div" | "section" | "li" | "header" | "article";
  delay?: number;
  className?: string;
  children: React.ReactNode;
} & Omit<React.HTMLAttributes<HTMLElement>, "className" | "children">;

/** Sanftes Einblenden beim Scrollen. Ohne JS / bei reduzierter Bewegung sofort sichtbar. */
export function Reveal({ as = "div", delay = 0, className, children, style, ...rest }: Props) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      el.classList.add("is-visible");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const Tag = as as React.ElementType;
  return (
    <Tag
      ref={ref}
      className={`reveal ${className ?? ""}`}
      style={{ ...style, "--delay": `${delay}ms` } as React.CSSProperties}
      {...rest}
    >
      {children}
    </Tag>
  );
}
```

### `src/components/StickyCTA.module.css`

```css
.bar {
  display: none;
}
@media (max-width: 760px) {
  .bar {
    position: fixed;
    z-index: 60;
    left: 10px;
    right: 10px;
    bottom: max(10px, env(safe-area-inset-bottom));
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 8px 8px 8px 16px;
    border-radius: 16px;
    background: rgba(255, 253, 248, 0.94);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid var(--line);
    box-shadow: 0 12px 30px -10px rgba(35, 41, 43, 0.35);
    transform: translateY(140%);
    opacity: 0;
    transition:
      transform var(--dur-slow) var(--ease-out),
      opacity var(--dur) var(--ease-out);
  }
  .visible {
    transform: none;
    opacity: 1;
  }
}
.text {
  display: flex;
  flex-direction: column;
  line-height: 1.2;
  font-size: 0.8rem;
  color: var(--ink-mute);
}
.text strong {
  color: var(--brand-700);
  font-size: 1rem;
}
.btn {
  min-height: 46px;
  padding: 0 18px;
  font-size: 0.92rem;
}
.btn svg {
  width: 16px;
  height: 16px;
}
```

### `src/components/StickyCTA.tsx`

```tsx
"use client";

import { useEffect, useState } from "react";
import { site } from "@/config/site";
import { ExternalIcon } from "./Icons";
import s from "./StickyCTA.module.css";

/**
 * Dezenter Kauf-Hinweis nur auf kleinen Bildschirmen.
 * Erscheint nach dem Hero und verschwindet, sobald der Abschluss-CTA oder der Footer sichtbar ist.
 */
export function StickyCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("top");
    const final = document.getElementById("start");
    const viewer = document.getElementById("einblick");
    const footer = document.querySelector("footer");
    if (!hero) return;
    const state = { pastHero: false, nearEnd: false, inViewer: false };
    // Im Produktviewer gibt es eigene Bedienelemente und einen eigenen CTA – dort nichts überdecken
    const update = () => setVisible(state.pastHero && !state.nearEnd && !state.inViewer);

    const heroObs = new IntersectionObserver(([e]) => {
      state.pastHero = !e.isIntersecting;
      update();
    });
    heroObs.observe(hero);
    const endObs = new IntersectionObserver((entries) => {
      state.nearEnd = entries.some((e) => e.isIntersecting) || [final, footer].some((el) => el && el.getBoundingClientRect().top < window.innerHeight);
      update();
    });
    const viewerObs = new IntersectionObserver(([e]) => {
      state.inViewer = e.isIntersecting;
      update();
    }, { rootMargin: "-30% 0px -30% 0px" });
    if (viewer) viewerObs.observe(viewer);
    if (final) endObs.observe(final);
    if (footer) endObs.observe(footer);
    return () => {
      heroObs.disconnect();
      endObs.disconnect();
      viewerObs.disconnect();
    };
  }, []);

  return (
    <div className={`${s.bar} ${visible ? s.visible : ""}`} aria-hidden={!visible} inert={!visible}>
      <div className={s.text}>
        <strong>festhalt</strong>
        <span>
          {site.product.pages} Seiten · digital
        </span>
      </div>
      <a href={site.etsyUrl} target="_blank" rel="noopener noreferrer" className={`btn ${s.btn}`} data-cta="sticky">
        Auf Etsy ansehen
        <ExternalIcon />
        <span className="visually-hidden"> (öffnet Etsy in einem neuen Tab)</span>
      </a>
    </div>
  );
}
```

### `src/components/TrustSection.module.css`

```css
.section {
  padding-block: clamp(72px, 10vw, 120px);
  background: var(--sage);
}
.grid {
  display: grid;
  grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr);
  gap: clamp(28px, 5vw, 64px);
  align-items: center;
}
.sheet {
  padding: 34px 34px 28px;
  --hole-bg: #d2ddd5;
}
.cols {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 28px;
}
.colHead {
  font-weight: 700;
  font-size: 1.05rem;
  padding-bottom: 10px;
  border-bottom: 2px solid var(--brand);
  margin-bottom: 4px;
}
.cols > div + div .colHead {
  border-bottom-color: var(--ink-mute);
}
.list {
  list-style: none;
}
.list li {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  padding: 11px 0;
  border-bottom: 1px solid var(--line);
  font-size: 0.97rem;
}
.mark {
  flex: none;
  display: grid;
  place-items: center;
  width: 22px;
  height: 22px;
  margin-top: 2px;
  border-radius: 4px;
}
.mark svg {
  width: 15px;
  height: 15px;
  stroke-width: 2.4;
}
.yes {
  background: var(--brand);
  color: #fff;
}
.no {
  border: 1.5px solid var(--ink-mute);
  color: var(--ink-soft);
}
.foot {
  margin-top: 22px;
  font-size: 0.9rem;
  color: var(--ink-soft);
}

@media (max-width: 960px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
@media (max-width: 640px) {
  .cols {
    grid-template-columns: 1fr;
  }
  .sheet {
    padding: 24px 20px;
  }
}
```

### `src/components/TrustSection.tsx`

```tsx
import { site } from "@/config/site";
import { CheckIcon, CloseIcon } from "./Icons";
import { Reveal } from "./Reveal";
import s from "./TrustSection.module.css";

const is = [
  "Eine organisatorische Vorsorgehilfe zum Ausdrucken und Ausfüllen",
  `Ein strukturierter Aufbau mit ${site.product.chapters} Kapiteln und ${site.product.checklists} Checklisten`,
  "Ein Ort, an dem du festhältst, wo Dokumente liegen und wen man anrufen kann",
  "Individuell nutzbar – du füllst nur aus, was für dich relevant ist",
];
const isNot = [
  "Keine Rechts-, Steuer- oder medizinische Beratung",
  "Kein Ersatz für notariell oder rechtlich wirksame Dokumente",
  "Kein physischer Ordner – es wird nichts per Post verschickt",
  "Keine Garantie, dass jede denkbare Situation abgedeckt ist",
];

export function TrustSection() {
  return (
    <section className={s.section} aria-labelledby="trust-title">
      <div className="container">
        <div className={s.grid}>
          <Reveal className={s.intro}>
            <p className="eyebrow">
              <span className="reg">09</span> Ehrlich gesagt
            </p>
            <h2 id="trust-title" className="h2">
              Was Festhalt ist – und was nicht.
            </h2>
            <p className="lead">
              Vorsorge ist ein persönliches Thema. Deshalb sagen wir klar, wofür der Familienordner gedacht ist und wo
              seine Grenzen liegen.
            </p>
          </Reveal>

          <Reveal className={`paper punched grain ${s.sheet}`} delay={120}>
            <div className={s.cols}>
              <div>
                <p className={s.colHead}>Festhalt ist …</p>
                <ul className={s.list}>
                  {is.map((t) => (
                    <li key={t}>
                      <span className={`${s.mark} ${s.yes}`} aria-hidden>
                        <CheckIcon />
                      </span>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className={s.colHead}>Festhalt ist nicht …</p>
                <ul className={s.list}>
                  {isNot.map((t) => (
                    <li key={t}>
                      <span className={`${s.mark} ${s.no}`} aria-hidden>
                        <CloseIcon />
                      </span>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <p className={s.foot}>
              Für rechtsverbindliche Vorsorge-Dokumente wie Vorsorgevollmacht, Patientenverfügung oder Testament wende dich
              bitte an eine Rechtsanwältin, einen Rechtsanwalt oder ein Notariat.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
```

### `src/components/ViewerContext.tsx`

```tsx
"use client";

import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";
import { sheetIndexById } from "@/content/sheets";

type ViewerCtx = {
  index: number;
  setIndex: (i: number | ((prev: number) => number)) => void;
  /** Springt zum Viewer (optional auf ein bestimmtes Blatt) und fokussiert ihn. */
  openAt: (sheetId?: string, opts?: { expand?: boolean }) => void;
  expanded: boolean;
  setExpanded: (v: boolean) => void;
  viewerRef: React.RefObject<HTMLDivElement | null>;
};

const Ctx = createContext<ViewerCtx | null>(null);

export function ViewerProvider({ children }: { children: React.ReactNode }) {
  const [index, setIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const viewerRef = useRef<HTMLDivElement | null>(null);

  const openAt = useCallback((sheetId?: string, opts?: { expand?: boolean }) => {
    if (sheetId) {
      const i = sheetIndexById(sheetId);
      if (i >= 0) setIndex(i);
    }
    if (opts?.expand) {
      setExpanded(true);
      return;
    }
    const section = document.getElementById("einblick");
    if (section) {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      section.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
      history.replaceState(null, "", "#einblick");
    }
    // Fokus nach dem Scrollen setzen, damit Tastaturnutzer direkt blättern können
    window.setTimeout(() => viewerRef.current?.focus({ preventScroll: true }), 450);
  }, []);

  const value = useMemo(
    () => ({ index, setIndex, openAt, expanded, setExpanded, viewerRef }),
    [index, openAt, expanded],
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useViewer() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useViewer must be used inside <ViewerProvider>");
  return v;
}
```

### `src/config/site.ts`

```ts
/**
 * ZENTRALE KONFIGURATION
 * ----------------------------------------------------------------------------
 * Alle betreiberabhängigen Angaben stehen hier an einer Stelle.
 * Werte mit `null` sind noch NICHT bestätigt – die Website zeigt dafür
 * neutrale Formulierungen bzw. sichtbare Platzhalter an und erfindet nichts.
 *
 * Vor Veröffentlichung prüfen: siehe README.md → „Checkliste vor dem Go-live“.
 */

export const site = {
  brand: "festhalt",
  brandDisplay: "Festhalt",
  subtitle: "Der Familienordner",
  claim: "Alles festgehalten. Für alle Fälle.",

  /** Öffentliche Basis-URL (für Open Graph / Canonical). */
  url: "https://www.festhalt.de", // TODO: echte Domain eintragen

  /**
   * Etsy-Produktseite. Alle Kauf-CTAs verlinken hierhin.
   * TODO: Direkten Link zum Etsy-Angebot eintragen, z. B.
   * "https://www.etsy.com/de/listing/1234567890/festhalt-der-familienordner"
   */
  etsyUrl: "https://www.etsy.com/de/search?q=festhalt%20familienordner",
  /** Wird automatisch true, sobald oben ein direkter Listing-Link steht. */
  get etsyUrlIsPlaceholder() {
    return !/etsy\.com\/(?:[a-z]{2}\/)?listing\//.test(this.etsyUrl);
  },

  /** Bestätigte Produktangaben (aus dem Produktmaterial des Betreibers). */
  product: {
    pages: 78,
    chapters: 8,
    checklists: 28,
    digital: true,
    printable: true,
  },

  /**
   * NOCH NICHT BESTÄTIGT – bitte ergänzen.
   * Solange `null`, nennt die Website weder Preis noch Dateiformat.
   */
  price: null as string | null, // z. B. "14,90 €" – nur eintragen, wenn identisch mit Etsy
  fileFormat: null as string | null, // z. B. "PDF (DIN A4)"
  paperSize: null as string | null, // z. B. "DIN A4"
  digitallyFillable: null as boolean | null, // true, wenn die Datei am Bildschirm ausfüllbar ist

  /** Kontakt – NOCH NICHT BESTÄTIGT. */
  contactEmail: null as string | null, // z. B. "hallo@festhalt.de"
} as const;

export type Site = typeof site;
```

### `src/content/chapters.ts`

```ts
/**
 * Kapitelstruktur laut Produktmaterial des Betreibers
 * (Kapitelübersicht „8 Kapitel. Ein System.“ / Inhaltsverzeichnis).
 * Wenn sich die Produktdatei ändert, hier anpassen.
 */
export type Chapter = {
  no: string;
  title: string;
  short: string;
  topics: string[];
  description: string;
  color: string; // Registerfarbe (gedämpft, wie im Produkt)
  sheetIds: string[]; // zugehörige Vorschau-Blätter im Viewer
};

export const chapters: Chapter[] = [
  {
    no: "01",
    title: "Einstieg & Überblick",
    short: "Einstieg",
    topics: ["Notfallkontakte auf einen Blick", "Wichtige Unterlagen & Kontakte", "Dokumente ordnen"],
    description:
      "Der Startpunkt des Ordners: die wichtigsten Ansprechpartner auf einer Seite und ein erster Überblick, wo welche Unterlagen liegen.",
    color: "#0F766E",
    sheetIds: ["notfallkontakte"],
  },
  {
    no: "02",
    title: "Vorsorge-Dokumente",
    short: "Vorsorge",
    topics: ["Vorsorgevollmacht", "Patientenverfügung", "Kontovollmacht", "Testament"],
    description:
      "Hier hältst du fest, welche Vorsorge-Dokumente es gibt, wo sie aufbewahrt werden und wer Bescheid weiß. Die Seiten ersetzen die Dokumente selbst nicht.",
    color: "#2F6FA3",
    sheetIds: ["vorsorgevollmacht", "patientenverfuegung", "testament"],
  },
  {
    no: "03",
    title: "Gesundheit & Pflege",
    short: "Gesundheit",
    topics: ["Krankenhausaufenthalt", "Reise", "Pflegefall", "Umzug ins Pflegeheim"],
    description:
      "Checklisten für Situationen, in denen schnell viel zu organisieren ist – vom Krankenhausaufenthalt bis zum Umzug ins Pflegeheim.",
    color: "#2B7F86",
    sheetIds: ["krankheitsausfall", "pflegefall", "reisen"],
  },
  {
    no: "04",
    title: "Finanzen & Verträge",
    short: "Finanzen",
    topics: ["Finanzen & Steuern", "Versicherungen", "Abos & Verträge"],
    description:
      "Konten, Versicherungen, Verträge und laufende Abos übersichtlich gesammelt – damit nichts in Vergessenheit gerät.",
    color: "#9A6A1C",
    sheetIds: ["finanzen", "versicherungscheck"],
  },
  {
    no: "05",
    title: "Digitales & Zugänge",
    short: "Digitales",
    topics: ["Zugangsdaten & Passwörter", "Digitaler Nachlass"],
    description:
      "Welche Konten, Dienste und Geräte gibt es? Und wer soll im Ernstfall Zugriff erhalten? Ein geordneter Blick auf das digitale Leben.",
    color: "#6E5A8A",
    sheetIds: ["zugangsdaten", "digitaler-nachlass"],
  },
  {
    no: "06",
    title: "Familie & Lebensübergänge",
    short: "Familie",
    topics: ["Hochzeit", "Werdende Eltern", "Kinder-Notfallmappe", "Trennung & Scheidung", "Ruhestand"],
    description:
      "Große Lebensereignisse bringen viele Formalitäten mit sich. Diese Seiten helfen, Dokumente und Termine im Blick zu behalten.",
    color: "#B4534B",
    sheetIds: ["familie", "hochzeit"],
  },
  {
    no: "07",
    title: "Haustiere",
    short: "Haustiere",
    topics: ["Haustier-Notfall", "Haustier-Vorsorge"],
    description:
      "Wer kümmert sich, wenn du plötzlich ausfällst? Tierarzt, Futter, Gewohnheiten und Betreuungspersonen an einem Ort.",
    color: "#A9573A",
    sheetIds: ["haustier"],
  },
  {
    no: "08",
    title: "Ernstfall & Abschied",
    short: "Ernstfall",
    topics: ["Organisation", "Letzte Wünsche", "Behördengänge"],
    description:
      "Ein ruhiger, respektvoller Teil für Angehörige: was zu organisieren ist, welche Wünsche bestehen und welche Wege anstehen.",
    color: "#4B5557",
    sheetIds: ["todesfall", "haushaltsaufloesung"],
  },
];
```

### `src/content/sheets.ts`

```ts
/**
 * Vorschau-Blätter für den Produktviewer.
 *
 * WICHTIG: Dies sind nachgebaute, beispielhafte Darstellungen auf Basis des
 * Produktmaterials (Checklisten-Übersicht und Seitenansichten). Sie sind auf der
 * Website ausdrücklich als „Vorschau“ gekennzeichnet und keine Originalseiten.
 *
 * Sobald echte Seitenbilder vorliegen: `image` setzen (Pfad unter /public),
 * dann zeigt der Viewer das Originalbild statt des nachgebauten Blatts.
 */
export type SheetBlock =
  | { kind: "checklist"; heading?: string; items: string[] }
  | { kind: "table"; columns: string[]; rows: string[] }
  | { kind: "fields"; heading?: string; fields: string[] }
  | { kind: "note"; label: string; text: string };

export type Sheet = {
  id: string;
  chapter: string; // Kapitelnummer "01" … "08"
  title: string;
  subtitle: string;
  icon: IconName;
  blocks: SheetBlock[];
  image?: string;
};

export type IconName =
  | "contacts"
  | "document"
  | "heart"
  | "pen"
  | "cross"
  | "person"
  | "plane"
  | "coins"
  | "shield"
  | "lock"
  | "laptop"
  | "family"
  | "rings"
  | "paw"
  | "candle"
  | "home";

export const sheets: Sheet[] = [
  {
    id: "notfallkontakte",
    chapter: "01",
    title: "Notfallkontakte",
    subtitle: "Wichtige Personen und Institutionen im Überblick",
    icon: "contacts",
    blocks: [
      {
        kind: "table",
        columns: ["Name / Institution", "Telefon", "Besondere Hinweise"],
        rows: ["Familie", "Hausarzt", "Facharzt", "Krankenhaus", "Nachbar", "Versicherung", "Bank", "Schule / Kita"],
      },
      { kind: "note", label: "Tipp", text: "Tragen Sie auch Personen ein, die im Ernstfall für Kind oder Haustier zuständig sind." },
    ],
  },
  {
    id: "vorsorgevollmacht",
    chapter: "02",
    title: "Vorsorgevollmacht",
    subtitle: "Wer darf mich im Ernstfall vertreten?",
    icon: "shield",
    blocks: [
      { kind: "fields", fields: ["Name der bevollmächtigten Person", "Telefon", "Aufbewahrungsort des Dokuments"] },
      {
        kind: "checklist",
        heading: "Welche Bereiche umfasst die Vollmacht?",
        items: ["Gesundheit / medizinische Entscheidungen", "Finanzen / Bankgeschäfte", "Behörden / Versicherungen", "Wohnungsangelegenheiten", "Sonstiges"],
      },
      { kind: "note", label: "Hinweis", text: "Diese Seite ersetzt keine rechtliche Beratung und keine Vorsorgevollmacht selbst." },
    ],
  },
  {
    id: "patientenverfuegung",
    chapter: "02",
    title: "Patientenverfügung",
    subtitle: "Meine Wünsche für die medizinische Behandlung",
    icon: "heart",
    blocks: [
      {
        kind: "checklist",
        items: ["Reanimation", "Künstliche Beatmung", "Ernährung (z. B. Magensonde)", "Schmerzbehandlung", "Lebenserhaltende Maßnahmen", "Palliativmedizin", "Organspende", "Sonstige Wünsche"],
      },
      { kind: "fields", heading: "Weitere Hinweise", fields: ["", ""] },
    ],
  },
  {
    id: "testament",
    chapter: "02",
    title: "Testament",
    subtitle: "Meine letzten Wünsche",
    icon: "pen",
    blocks: [
      { kind: "checklist", items: ["Erbfolge", "Testamentsvollstrecker", "Vermächtnisse", "Nachlassregelung", "Sonstige Regelungen"] },
      { kind: "fields", heading: "Aufbewahrungsort", fields: ["", ""] },
    ],
  },
  {
    id: "krankheitsausfall",
    chapter: "03",
    title: "Krankheitsausfall",
    subtitle: "Was ist im Krankheitsfall zu tun?",
    icon: "cross",
    blocks: [
      {
        kind: "checklist",
        items: ["Arbeitsunfähigkeit melden", "Krankschreibung organisieren", "Ansprechpartner Arbeitgeber", "Finanzielle Absicherung", "Versicherungen informieren", "Haushalt / Alltag organisieren", "Sonstige Aufgaben"],
      },
      { kind: "fields", heading: "Weitere Hinweise", fields: ["", ""] },
    ],
  },
  {
    id: "pflegefall",
    chapter: "03",
    title: "Pflegefall",
    subtitle: "Unterstützung und Organisation",
    icon: "person",
    blocks: [
      {
        kind: "checklist",
        items: ["Pflegedienst beauftragen", "Pflegegrad beantragen", "Hilfsmittel organisieren", "Wohnraumanpassung", "Finanzierung / Pflegeversicherung", "Ansprechpartner", "Sonstige Hinweise"],
      },
      { kind: "fields", heading: "Weitere Hinweise", fields: ["", ""] },
    ],
  },
  {
    id: "reisen",
    chapter: "03",
    title: "Reisen",
    subtitle: "Für den Fall von Vorerkrankungen",
    icon: "plane",
    blocks: [
      { kind: "checklist", items: ["Medikamente", "Ärztliche Bescheinigung", "Reiseapotheke", "Krankenversicherung", "Notfallkontakte vor Ort", "Sonstige Hinweise"] },
      { kind: "fields", heading: "Weitere Hinweise", fields: ["", ""] },
    ],
  },
  {
    id: "finanzen",
    chapter: "04",
    title: "Finanzen & Steuern",
    subtitle: "Den Überblick über Ihre Finanzen behalten",
    icon: "coins",
    blocks: [
      {
        kind: "table",
        columns: ["Art", "Anbieter / Bank", "Vertragsnummer"],
        rows: ["Girokonto", "Tagesgeld", "Depot", "Versicherung", "Rentenversicherung", "Immobilien", "Weitere"],
      },
      { kind: "fields", heading: "Wichtige Steuerinformationen", fields: ["Steuer-ID", "Finanzamt", "Steuerklasse"] },
    ],
  },
  {
    id: "versicherungscheck",
    chapter: "04",
    title: "Versicherungscheck",
    subtitle: "Meine wichtigsten Versicherungen",
    icon: "shield",
    blocks: [
      {
        kind: "checklist",
        items: ["Haftpflichtversicherung", "Hausratversicherung", "Kfz-Versicherung", "Berufsunfähigkeitsversicherung", "Lebensversicherung", "Reiseversicherung", "Sonstige Versicherungen"],
      },
      { kind: "fields", heading: "Weitere Hinweise", fields: ["", ""] },
    ],
  },
  {
    id: "zugangsdaten",
    chapter: "05",
    title: "Zugangsdaten & Passwörter",
    subtitle: "Wichtige Zugänge sicher festhalten",
    icon: "lock",
    blocks: [
      {
        kind: "table",
        columns: ["Dienst / Anbieter", "Benutzername", "Passwort / Hinweis"],
        rows: ["E-Mail", "Online-Banking", "PayPal", "Social Media", "Cloud-Speicher", "Streaming", "Weitere"],
      },
      { kind: "note", label: "Tipp", text: "Nutzen Sie einen Passwort-Manager oder bewahren Sie diese Seite an einem sicheren Ort auf." },
    ],
  },
  {
    id: "digitaler-nachlass",
    chapter: "05",
    title: "Digitaler Nachlass",
    subtitle: "Zugänge und wichtige Daten",
    icon: "laptop",
    blocks: [
      { kind: "checklist", items: ["E-Mail-Konten", "Social Media", "Online-Banking", "Cloud-Speicher", "Abonnements", "Sonstige Zugänge / Daten"] },
      { kind: "note", label: "Tipp", text: "Informieren Sie eine Vertrauensperson darüber, wo Ihre Daten gespeichert sind." },
    ],
  },
  {
    id: "familie",
    chapter: "06",
    title: "Familie & Lebensübergänge",
    subtitle: "Heute schon an morgen denken",
    icon: "family",
    blocks: [
      { kind: "checklist", heading: "Wichtige Dokumente", items: ["Heiratsurkunde", "Geburtsurkunden", "Stammbuch", "Scheidungsurteil", "Sonstige"] },
      { kind: "checklist", heading: "Weitere Themen", items: ["Werdende Eltern", "Kinder-Notfallmappe", "Trennung & Scheidung", "Ruhestand"] },
    ],
  },
  {
    id: "hochzeit",
    chapter: "06",
    title: "Hochzeit / Dokumente",
    subtitle: "Wichtige Dokumente und Termine",
    icon: "rings",
    blocks: [
      { kind: "checklist", items: ["Personalausweis / Reisepass", "Heiratsurkunde", "Stammbuch", "Gemeinsame Konten", "Versicherungen", "Sonstige Hinweise"] },
      { kind: "fields", heading: "Weitere Hinweise", fields: ["", ""] },
    ],
  },
  {
    id: "haustier",
    chapter: "07",
    title: "Haustier-Notfall",
    subtitle: "Wer kümmert sich um mein Tier?",
    icon: "paw",
    blocks: [
      { kind: "fields", fields: ["Name des Tieres", "Tierarztpraxis & Telefon", "Betreuungsperson im Notfall"] },
      { kind: "fields", heading: "Weitere Hinweise", fields: ["", ""] },
    ],
  },
  {
    id: "todesfall",
    chapter: "08",
    title: "Todesfall",
    subtitle: "Was ist zu tun?",
    icon: "candle",
    blocks: [
      { kind: "checklist", items: ["Arzt verständigen", "Sterbeurkunde beantragen", "Bestattung organisieren", "Trauerfeier", "Benachrichtigungen", "Nachlass regeln", "Sonstige Hinweise"] },
      { kind: "fields", heading: "Weitere Hinweise", fields: ["", ""] },
    ],
  },
  {
    id: "haushaltsaufloesung",
    chapter: "08",
    title: "Haushaltsauflösung",
    subtitle: "Was muss erledigt werden?",
    icon: "home",
    blocks: [
      { kind: "checklist", items: ["Wohnung / Haus räumen", "Wertgegenstände sichern", "Verträge kündigen", "Versicherungen prüfen", "Müllentsorgung", "Sonstige Hinweise"] },
      { kind: "fields", heading: "Weitere Hinweise", fields: ["", ""] },
    ],
  },
];

export const sheetIndexById = (id: string) => sheets.findIndex((s) => s.id === id);
```

### `src/lib/useReducedMotionSafe.ts`

```ts
"use client";

import { useEffect, useState } from "react";

/**
 * Wie `prefers-reduced-motion`, aber hydration-sicher:
 * Beim ersten Render (Server + Client) immer `false`, danach der echte Wert.
 * Reine CSS-Animationen werden zusätzlich per Media Query abgeschaltet.
 */
export function useReducedMotionSafe() {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduce(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return reduce;
}
```

### `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": [
      "dom",
      "dom.iterable",
      "esnext"
    ],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": [
        "./src/*"
      ]
    }
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts",
    ".next/dev/types/**/*.ts"
  ],
  "exclude": [
    "node_modules"
  ]
}
```

## Binärdateien (nicht im Text enthalten – separat beilegen)

- `assets/source/checklisten.jpg`
- `assets/source/inhaltsverzeichnis.jpg`
- `assets/source/kapitel-uebersicht.jpg`
- `assets/source/ordner-cover.jpg`
- `assets/source/seiten-einblick.jpg`
- `public/images/checklisten-1024.webp`
- `public/images/checklisten-1536.webp`
- `public/images/checklisten-640.webp`
- `public/images/inhaltsverzeichnis-1024.webp`
- `public/images/inhaltsverzeichnis-640.webp`
- `public/images/kapitel-uebersicht-1024.webp`
- `public/images/kapitel-uebersicht-640.webp`
- `public/images/og-image.jpg`
- `public/images/ordner-cover-1024.webp`
- `public/images/ordner-cover-640.webp`
- `public/images/seiten-einblick-1024.webp`
- `public/images/seiten-einblick-640.webp`

Die Bilder unter `public/images/` erzeugt `npm run images` aus `assets/source/`. Die fünf Originale sind die Produkt-Mock-ups:
- `checklisten.jpg`: 14 Checklisten-Seiten nebeneinander
- `inhaltsverzeichnis.jpg`: Ordner mit Inhaltsverzeichnis
- `kapitel-uebersicht.jpg`: Ordner mit dem Kapiteltrenner „Kapitel 1“ und der Kapitelliste
- `ordner-cover.jpg`: geschlossener Ordner mit Deckblatt
- `seiten-einblick.jpg`: aufgeschlagene Seiten zu Notfallkontakten und Vorsorgevollmacht

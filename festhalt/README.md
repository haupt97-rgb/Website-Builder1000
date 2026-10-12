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

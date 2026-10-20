# Lungenärzte Bremen – Website

Relaunch der Website der Gemeinschaftspraxis für Lungenheilkunde Dr. Felix Haupt, Helmut Golke,
Dr. Sandra Sackmann (Mary-Astell-Straße 2, 28359 Bremen).

> **Vor dem Go-live:** [`VERIFY.md`](./VERIFY.md) abarbeiten (Buchungs-URL, Rezeptbestellung, Rechtstexte)
> und Fotos laut [`ASSET_CHECKLIST.md`](./ASSET_CHECKLIST.md) einsetzen.

## Seiten

| Pfad | Inhalt |
|---|---|
| `/` | Hero, Fakten, Schwerpunkte, Ärzteteam, Terminvereinbarung, Diagnostik, Praxisräume, erster Besuch, FAQ, Kontakt |
| `/praxis/` | Praxisprofil, Räume, Erreichbarkeit, Erkrankungen |
| `/aerzteteam/` + 3 Profile | Werdegang und Qualifikationen je Arzt |
| `/leistungen/` + 7 Detailseiten | Lungenfunktion, Asthma/Allergologie, COPD, Schlafapnoe, Blutgas, Röntgen, Gutachten |
| `/termin/` | 3-Schritte-Ablauf, Online/Telefon, Checkliste, 116 117 |
| `/patienteninformationen/` | Service-Links, erster Besuch, alle FAQ |
| `/rezeptbestellung/`, `/richtig-inhalieren/` | Serviceseiten |
| `/kontakt/` | Kontakt, Telefonzeiten, Anfahrt, Routenlinks |
| `/impressum/`, `/datenschutz/` | Rechtliches |
| `sitemap.xml`, `robots.txt`, 404 | SEO-Grundlagen |

## Technik

- **Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4**
- **Statischer Export** (`output: "export"`): `npm run build` erzeugt reines HTML/CSS/JS in `out/` –
  kein Server, keine Cookies, auf jedem Webspace lauffähig.
- Schrift **Manrope** selbst gehostet über `@fontsource-variable/manrope` (keine Verbindung zu Google Fonts).
- Icons: `lucide-react` (eine konsistente Bibliothek). Keine Animationsbibliothek: dezentes Einblenden per
  IntersectionObserver + CSS, FAQ als natives `<details>`; `prefers-reduced-motion` wird respektiert,
  ohne JavaScript ist alles sichtbar.
- Keine eingebettete Karte, keine Tracker, keine externen Widgets.

### Struktur

```
src/content/      Inhalte & Praxisdaten (einzige Stelle für Telefon, Zeiten, Team, Leistungen, FAQ)
src/components/   ui/ (Buttons, Bildflächen, Zeiten), layout/ (Header, Footer, Aktionsleiste), sections/
src/app/          Seiten, Metadaten, sitemap.ts, robots.ts
src/lib/seo.ts    Seitentitel, Canonical, Open Graph, strukturierte Daten (MedicalClinic)
```

Inhalte ändern = Dateien in `src/content/` bearbeiten. Design-Tokens (Farben, Typo-Skala, Radien) stehen
in `src/app/globals.css` unter `@theme`.

### Designsystem (Kurzfassung)

| Token | Wert | Verwendung |
|---|---|---|
| petrol-800 | `#174B50` | Markenfarbe, Buttons |
| petrol-900 | `#12383D` | Überschriften, dunkle Flächen |
| sage-100 | `#E6EFEB` | Akzentflächen |
| paper | `#F8F8F5` | Seitenhintergrund |
| ink | `#293536` | Fließtext |
| muted | `#5B6867` | Zusatzinfos (5,5 : 1 auf paper) |

## Befehle

```bash
npm install
npm run dev        # Entwicklung auf http://localhost:3000
npm run build      # statischer Export nach out/
npm run lint
npm run typecheck
```

## Deployment

1. `onlineBooking.url` in `src/content/practice.ts` auf die direkte Portal-URL setzen.
2. `npm run build` und den Inhalt von `out/` auf den Webspace laden (oder Vercel/Netlify/Cloudflare Pages
   mit Build-Befehl `npm run build`, Ausgabeordner `out`).
3. 301-Weiterleitungen der alten URLs einrichten – siehe [`docs/REDIRECTS.md`](./docs/REDIRECTS.md).
4. HTTPS erzwingen; optional Sicherheits-Header (CSP, HSTS) beim Hoster setzen.
5. Sitemap in der Google Search Console einreichen.

## Qualitätssicherung (durchgeführt)

Siehe Abschnitt „Tests“ in der Übergabe bzw. Commit-Historie: Build, ESLint, `tsc`, Screenshot-Prüfung
aller Seiten bei 1440 px und 390 px (kein horizontaler Überlauf, keine Konsolenfehler), Tastaturtest
(Skip-Link, Mobilmenü mit Escape/Fokusfalle, FAQ per Enter), Prüfung aller internen Links und Anker.

# Prüfliste: Praxisangaben, Datenschutz und Recht

Die alte Website (www.lungenaerzte-bremen.de) war aus der Entwicklungsumgebung **nicht direkt abrufbar**
(Netzwerkrichtlinie bzw. DNS-Fehler). Die Inhalte wurden über indexierte Auszüge der Originalseiten
in Suchmaschinen erfasst (Stand: Oktober 2026). Alles unten muss die Praxis **vor dem Go-live** bestätigen.

Legende: 🔴 blockiert den Go-live · 🟡 bitte bestätigen · ⚪ Entscheidung der Praxis

## 1. Bestandsaufnahme: alte Inhalte → neue Seiten

| Alte Seite | Inhalt | Neue Seite | Status |
|---|---|---|---|
| `/` | Praxisname, Telefonzeiten, Kurzbeschreibung | `/` | übernommen |
| `/blank-c1pcl` (Über uns) | Praxisprofil, Erkrankungen, Fortbildung | `/praxis/`, `/aerzteteam/` | übernommen |
| `/dr-felix-haupt`, `/blank-v0h0k` | Lebenslauf Dr. Haupt | `/aerzteteam/dr-felix-haupt/` | übernommen |
| `/helmut-golke`, `/blank-pxllg` | Lebenslauf H. Golke | `/aerzteteam/helmut-golke/` | übernommen |
| `/dr-sandra-sackmann` | Lebenslauf Dr. Sackmann | `/aerzteteam/dr-sandra-sackmann/` | übernommen |
| `/blank-p0udb` | Dr. Wolfgang Ritter (ehem. Partner, Nachfolge durch Dr. Sackmann) | – | nicht übernommen ⚪ |
| `/unsere-leistungen` | Leistungsspektrum | `/leistungen/` + 7 Detailseiten | übernommen, neu gegliedert |
| `/ihr-termin`, `/termine` | Terminarten, Buchungsportal, 116 117 | `/termin/` | übernommen |
| `/rezeptbestellung`, `/kontakt` (Formular) | Regeln Folgerezept, Kontaktformular | `/rezeptbestellung/`, `/kontakt/` | Regeln übernommen, **Formular bewusst nicht** |
| `/richtig-inhalieren` | Hinweis + Videos Atemwegsliga | `/richtig-inhalieren/` | übernommen |
| `/anfahrt` | ÖPNV, Parken, Barrierefreiheit | `/kontakt/#anfahrt` | übernommen |
| `/aktuelles/about-1` | Umzug zum 1.12.2025 | `/praxis/`, Startseite | übernommen |
| `/impressum`, `/datenschutz` | Pflichtangaben | `/impressum/`, `/datenschutz/` | neu aufgebaut, s. u. |
| `/coronaviruspandemie` | Corona-Hinweise | – | nicht übernommen (veraltet) ⚪ |
| `/protest` | Stellungnahme zur Gesundheitspolitik | – | nicht übernommen ⚪ |

## 2. Go-live-Blocker 🔴

- 🔴 **Ziel der Online-Terminbuchung.** `src/content/practice.ts → onlineBooking.url` zeigt derzeit auf die
  Seite `/termine` der *alten* Website, die das Buchungsportal einbindet. Die direkte Portal-URL ließ sich nicht
  verifizieren (ein samedi-Eintrag der Praxis existiert, ist aber veraltet und nennt noch die Berliner Freiheit).
  **Vor dem Go-live die direkte Portal-URL eintragen**, sonst führt der Link nach dem Relaunch ins Leere.
- 🔴 **Rezeptbestellung.** Die alte Website nutzte ein Kontaktformular. Formulare mit Gesundheitsdaten wurden
  bewusst nicht übernommen. Die neue Seite verweist auf das Telefon. Bitte bestätigen, dass Folgerezepte
  telefonisch bestellt werden können – oder einen datenschutzkonformen Online-Weg des Praxisdienstleisters
  benennen (`prescriptionOrder.onlineUrl` in `practice.ts`, die Seite zeigt dann automatisch einen Button).
- 🔴 **Rechtstexte juristisch prüfen** (Impressum und Datenschutz, s. Abschnitt 5).

## 3. Praxisangaben bestätigen 🟡

- Telefonische Erreichbarkeit: Mo, Di, Do 9–12 und 14–17 Uhr · Mi 9–12 Uhr · Fr 9–13 Uhr.
  **Sprechzeiten** wurden nicht gefunden; die Website sagt „Untersuchungen und Sprechstunden nach
  Terminvereinbarung“. Falls es feste Sprechzeiten gibt, in `practice.ts` ergänzen.
- Fax 0421 / 98 98 85 55. (Gelbe Seiten nennt zusätzlich 0421 46 21 31 – vermutlich veraltet.)
- Stadtteilangabe „Horn-Lehe“ (alte Website: „Horn“, Gelbe Seiten: „Lehe“).
- Anfahrt: Linie 6, Busse 21, 23, 31, Haltestelle „Berufsbildungswerk“, ca. 4 Min. Fußweg; 90 Min. kostenlos
  parken mit Parkscheibe; Navi „Kremser Str. 4b“. Die ältere Umzugsmeldung nannte abweichend Busse 21, 22, 630,
  670 und 2 Min. Fußweg – die aktuellere Anfahrtsseite wurde übernommen.
- Berufsbezeichnungen: Impressum nennt „Facharzt/Fachärztin für Innere Medizin, Schwerpunkt Pneumologie“,
  Arztverzeichnisse teils „Innere Medizin und Pneumologie“. Bitte exakte Bezeichnung laut Urkunde bestätigen.
- Titel „Dr. med.“ bei Dr. Haupt und Dr. Sackmann.
- Dr. Haupt: „Vorsitzender der Lungenfachärzte Bremen/Bremerhaven“ – noch aktuell?
- Dr. Sackmann: Ort der Weiterbildung (nicht angegeben, daher allgemein formuliert).
- Leistungen nicht gefunden und daher **nicht** aufgeführt: Impfungen, Ergospirometrie, Bronchoskopie,
  Sauerstoff-Langzeittherapie-Verordnung. Falls angeboten, in `src/content/services.ts` ergänzen.
- „Labor/Blutentnahme“ erschien nur als Fragment – nicht aufgeführt.
- Arbeitsmedizinische Grundsätze „G 1.1 / G 1.2“ (heute DGUV-Empfehlungen) – Bezeichnung aktuell?
- Checkliste „Bitte mitbringen“: Gesundheitskarte ist belegt; Medikamentenübersicht, Inhalatoren und
  Vorbefunde sind als „sofern vorhanden / hilfreich“ formuliert. Überweisungspflicht ungeklärt
  (FAQ verweist auf Telefon).
- Allgemeine Ablaufbeschreibungen der Untersuchungen (Leistungsdetailseiten) fachlich gegenlesen.
- FAQ „akuter Infekt“ und „Termin absagen“: verweisen auf Telefon – ggf. praxisspezifische Regel ergänzen.
- Partnerschaftsregister: laut North Data Amtsgericht Bremen PR 260 – nach Bestätigung ins Impressum aufnehmen.

## 4. Datenschutz 🟡

- Die Website setzt **keine Cookies**, lädt **keine** Tracker, Karten, Videos oder Fonts von Drittanbietern
  (Manrope ist selbst gehostet). Ein Cookie-Banner ist daher nicht erforderlich – bei späteren Erweiterungen neu prüfen.
- Externe Ziele werden nur per Klick aufgerufen: Buchungsportal, Google Maps, OpenStreetMap, Atemwegsliga, Ärztekammer.
- Server-Logfiles: Abschnitt 3 der Datenschutzhinweise an den tatsächlichen Hoster anpassen
  (Auftragsverarbeitungsvertrag, Speicherdauer).
- Buchungsportal: Datenschutzhinweise des Anbieters und AV-Vertrag prüfen; Nennung des Anbieters in der
  Datenschutzerklärung ergänzen.
- E-Mail-Kontakt: Hinweis „keine Gesundheitsdaten per unverschlüsselter E-Mail“ ist auf Kontakt- und Rezeptseite platziert.

## 5. Recht 🔴

- Impressum wurde aus den belegten Angaben neu aufgebaut (§ 5 DDG). Prüfen: Partnerschaftsregister,
  ggf. USt-IdNr., Angaben zur Berufshaftpflichtversicherung, Hinweis zur Verbraucherstreitbeilegung.
- Datenschutzhinweise sind ein **sachlicher Entwurf** für diese statische Website, keine geprüfte Rechtsberatung.
- Heilmittelwerberecht/Berufsordnung: Die Texte enthalten keine Heilversprechen, Bewertungen oder Superlative.
  Die Kennzahl „16 Jahre klinische Leitungserfahrung“ (Dr. Sackmann, 2004–2020) bitte freigeben.
- Patientenbewertungen: Es wurden **keine** Bewertungen verwendet (nicht verifizierbar).

# Bildmaterial – benötigte Assets

Es lagen **keine freigegebenen Originalfotos** vor (die alte Website war nicht abrufbar). Die Website zeigt
deshalb ruhige, abstrakte Platzhalterflächen mit der Kennzeichnung „Foto folgt“. Es wurden bewusst
**keine Stockfotos und keine KI-generierten Personen** verwendet.

Fotos bitte nur mit geklärten Nutzungsrechten und Einwilligung der abgebildeten Personen einsetzen.

| Priorität | Motiv | Verwendet auf | Format / Mindestgröße | Einbau |
|---|---|---|---|---|
| 1 | Teamfoto der drei Ärzte in der Praxis (natürlich, nicht gestellt) | Startseite Hero | Querformat 16:11 oder 4:3, ≥ 2400 px breit | `src/app/page.tsx`, `ImageSlot src=…` |
| 2 | Porträt Dr. Felix Haupt | Team, Profil | Hochformat 4:5, ≥ 1200 × 1500 px | `team.ts → portrait` |
| 2 | Porträt Helmut Golke | Team, Profil | 4:5, ≥ 1200 × 1500 px | `team.ts → portrait` |
| 2 | Porträt Dr. Sandra Sackmann | Team, Profil | 4:5, ≥ 1200 × 1500 px | `team.ts → portrait` |
| 3 | Lungenfunktionslabor / Bodyplethysmograph | Startseite Diagnostik | 4:5 | `src/app/page.tsx` |
| 3 | Empfang und Anmeldung | Startseite, Praxis | 16:10 / 7:5 | `page.tsx`, `praxis/page.tsx` |
| 3 | Wartebereich | Startseite, Praxis | 1:1 / 16:9 | wie oben |
| 3 | Untersuchungs- bzw. Sprechzimmer | Startseite, Praxis | 1:1 / 7:5 | wie oben |
| 4 | Außenansicht Gebäude Ecke Kremser Str. / Mary-Astell-Str. (Orientierung) | Kontakt | 21:8 | `kontakt/page.tsx` |
| 4 | Open-Graph-Bild (z. B. Teamfoto mit Logo) | Social-Media-Vorschau | 1200 × 630 px | `src/app/opengraph-image.jpg` |
| – | Logo der Praxis (falls vorhanden) | Header, Footer, Favicon | SVG | `components/layout/Logo.tsx`, `app/icon.svg` |

**Hinweise zur Bildsprache:** Tageslicht, ruhige Farben, echte Situationen. Keine Röntgen-/Organbilder,
keine dramatischen Motive, keine verschränkten Arme vor weißem Hintergrund.

**Technik:** Bilder als JPG/WebP in `public/images/` ablegen (sprechende Dateinamen, z. B.
`aerzteteam-lungenaerzte-bremen.jpg`). Die Komponenten reservieren Seitenverhältnisse bereits, sodass
beim Austausch keine Layoutverschiebungen entstehen. Alternativtexte sind bereits hinterlegt.

# Weiterleitungen alter URLs (301)

Der statische Export kann keine Weiterleitungen selbst ausführen – sie werden beim Hoster eingerichtet.

> **Achtung:** `/termine` erst weiterleiten, wenn `onlineBooking.url` auf die direkte Portal-URL zeigt.
> Solange der Buchungslink noch auf `/termine` verweist, würde eine Weiterleitung eine Schleife erzeugen.

| Alt | Neu |
|---|---|
| `/unsere-leistungen` | `/leistungen/` |
| `/ihr-termin` | `/termin/` |
| `/termine` | `/termin/` (siehe Hinweis) |
| `/blank-c1pcl` | `/praxis/` |
| `/aktuelles/about-1` | `/praxis/` |
| `/dr-felix-haupt`, `/blank-v0h0k` | `/aerzteteam/dr-felix-haupt/` |
| `/helmut-golke`, `/blank-pxllg` | `/aerzteteam/helmut-golke/` |
| `/dr-sandra-sackmann` | `/aerzteteam/dr-sandra-sackmann/` |
| `/blank-p0udb` | `/aerzteteam/` |
| `/anfahrt` | `/kontakt/#anfahrt` |
| `/coronaviruspandemie` | `/patienteninformationen/` |
| `/protest` | `/` |

Gleich bleibende Pfade (`/kontakt`, `/praxis`, `/rezeptbestellung`, `/richtig-inhalieren`, `/impressum`,
`/datenschutz`) erhalten durch `trailingSlash: true` automatisch die Variante mit Schrägstrich.

## Beispiel Apache (`.htaccess`)

```apache
RewriteEngine On
Redirect 301 /unsere-leistungen /leistungen/
Redirect 301 /ihr-termin /termin/
Redirect 301 /blank-c1pcl /praxis/
Redirect 301 /aktuelles/about-1 /praxis/
Redirect 301 /blank-v0h0k /aerzteteam/dr-felix-haupt/
Redirect 301 /dr-felix-haupt /aerzteteam/dr-felix-haupt/
Redirect 301 /blank-pxllg /aerzteteam/helmut-golke/
Redirect 301 /helmut-golke /aerzteteam/helmut-golke/
Redirect 301 /dr-sandra-sackmann /aerzteteam/dr-sandra-sackmann/
Redirect 301 /blank-p0udb /aerzteteam/
Redirect 301 /anfahrt /kontakt/#anfahrt
Redirect 301 /coronaviruspandemie /patienteninformationen/
Redirect 301 /protest /
# erst nach Umstellung der Buchungs-URL:
# Redirect 301 /termine /termin/
```

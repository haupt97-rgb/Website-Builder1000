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

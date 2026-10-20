/**
 * Zentrale Praxisdaten.
 *
 * Alle Angaben stammen von der bisherigen Website www.lungenaerzte-bremen.de
 * (Stand der Recherche: Oktober 2026). Punkte, die vor der Veröffentlichung
 * durch die Praxis bestätigt werden müssen, sind in VERIFY.md aufgeführt.
 */

export const practice = {
  name: "Lungenärzte Bremen",
  legalName: "Gemeinschaftspraxis für Lungenheilkunde Dr. Felix Haupt, Helmut Golke, Dr. Sandra Sackmann",
  shortLegalName: "Gemeinschaftspraxis für Lungenheilkunde",
  description:
    "Internistisch-pneumologische Gemeinschaftspraxis in Bremen für Erkrankungen der Lunge und der Atemwege.",
  url: "https://www.lungenaerzte-bremen.de",
  address: {
    street: "Mary-Astell-Straße 2",
    postalCode: "28359",
    city: "Bremen",
    district: "Horn-Lehe",
    floor: "1. Etage",
  },
  phone: { display: "0421 / 98 98 85 0", href: "tel:+494219898850" },
  fax: { display: "0421 / 98 98 85 55" },
  email: "kontakt@lungenaerzte-bremen.de",
  /** Seit dem 1. Dezember 2025 am neuen Standort (Umzug von der Berliner Freiheit). */
  openedAtCurrentLocation: "1. Dezember 2025",
} as const;

export const fullAddress = `${practice.address.street}, ${practice.address.postalCode} ${practice.address.city}`;

export const routeLinks = {
  google: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    `${practice.address.street}, ${practice.address.postalCode} ${practice.address.city}`,
  )}`,
  osm: `https://www.openstreetmap.org/search?query=${encodeURIComponent(
    `${practice.address.street}, ${practice.address.postalCode} ${practice.address.city}`,
  )}`,
} as const;

/**
 * Online-Terminbuchung.
 *
 * Die bisherige Website bindet das Buchungsportal auf der Seite /termine ein.
 * Die direkte Portal-Adresse ließ sich bei der Recherche nicht verifizieren.
 * VOR DEM GO-LIVE durch die direkte URL des Buchungsportals ersetzen
 * (siehe VERIFY.md) – sonst verweist der Link nach dem Relaunch ins Leere.
 */
export const onlineBooking = {
  url: "https://www.lungenaerzte-bremen.de/termine",
  label: "Online-Terminbuchung",
  categories: [
    {
      title: "Sprechstunde",
      text: "für Patientinnen und Patienten, die bereits bei uns in Behandlung sind",
    },
    {
      title: "DMP Asthma und COPD",
      text: "für Teilnehmende an den strukturierten Behandlungsprogrammen",
    },
    {
      title: "Neue Patientinnen und Patienten",
      text: "auch für Ihren ersten Besuch bieten wir Termine an",
    },
    {
      title: "Privatversicherte und Selbstzahler",
      text: "Zusatztermine außerhalb der gesetzlichen Sprechstunden – bitte „Selbstzahler“ wählen",
    },
  ],
} as const;

export type Weekday = "Montag" | "Dienstag" | "Mittwoch" | "Donnerstag" | "Freitag";

export type DayHours = {
  day: Weekday;
  short: string;
  /** ISO-Wochentag (1 = Montag) */
  iso: number;
  slots: { from: string; to: string }[];
};

/** Telefonische Erreichbarkeit laut bisheriger Website. */
export const phoneHours: DayHours[] = [
  { day: "Montag", short: "Mo", iso: 1, slots: [{ from: "09:00", to: "12:00" }, { from: "14:00", to: "17:00" }] },
  { day: "Dienstag", short: "Di", iso: 2, slots: [{ from: "09:00", to: "12:00" }, { from: "14:00", to: "17:00" }] },
  { day: "Mittwoch", short: "Mi", iso: 3, slots: [{ from: "09:00", to: "12:00" }] },
  { day: "Donnerstag", short: "Do", iso: 4, slots: [{ from: "09:00", to: "12:00" }, { from: "14:00", to: "17:00" }] },
  { day: "Freitag", short: "Fr", iso: 5, slots: [{ from: "09:00", to: "13:00" }] },
];

export const directions = {
  publicTransport: {
    stop: "Berufsbildungswerk",
    lines: "Straßenbahnlinie 6 sowie Buslinien 21, 23 und 31",
    walk: "Von der Haltestelle sind es ca. 4 Minuten zu Fuß entlang der Kremser Straße bis zur Ecke Kremser Straße / Mary-Astell-Straße.",
  },
  car: {
    parking:
      "Parkplätze befinden sich auf dem Hof an der Südseite des Gebäudes. Mit eingestellter Parkscheibe können Sie dort 90 Minuten kostenlos parken.",
    navigation: "Kremser Straße 4b",
  },
  accessibility:
    "Die Praxis liegt in der 1. Etage und ist mit einem Aufzug erreichbar. Der Eingang ist barrierefrei.",
} as const;

export const emergency = {
  serviceNumber: { display: "116 117", href: "tel:116117" },
  emergencyNumber: { display: "112", href: "tel:112" },
} as const;

export const insurance = [
  "Gesetzlich Versicherte",
  "Privat Versicherte",
  "Selbstzahler",
] as const;

export const supervisory = {
  kv: {
    name: "Kassenärztliche Vereinigung Bremen",
    address: "Schwachhauser Heerstraße 26/28, 28209 Bremen",
  },
  chamber: {
    name: "Ärztekammer Bremen",
    address: "Schwachhauser Heerstraße 30, 28209 Bremen",
    url: "https://www.aekhb.de",
  },
} as const;

/**
 * Rezeptbestellung.
 *
 * Die bisherige Website nutzte dafür ein Kontaktformular. Formulare mit
 * Gesundheitsdaten werden bewusst nicht ungeprüft übernommen (siehe VERIFY.md).
 * Sobald die Praxis einen datenschutzkonformen Online-Bestellweg (z. B. über ihren
 * Praxisdienstleister) freigibt, hier dessen URL eintragen – die Seite
 * /rezeptbestellung zeigt dann automatisch einen entsprechenden Button.
 */
export const prescriptionOrder: { onlineUrl: string | null } = {
  onlineUrl: null,
};

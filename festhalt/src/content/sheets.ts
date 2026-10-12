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

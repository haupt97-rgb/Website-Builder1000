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

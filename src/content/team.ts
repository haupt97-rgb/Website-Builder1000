/**
 * Ärzteteam – ausschließlich Angaben aus den Lebensläufen und dem Impressum
 * der bisherigen Website. Keine ergänzten Schwerpunkte, Zitate oder Interessen.
 */

export type CareerStep = { period?: string; text: string };

export type Doctor = {
  slug: string;
  name: string;
  /** Anrede-Form für Fließtext, z. B. „Dr. Haupt“ */
  shortName: string;
  title: string;
  initials: string;
  /** Pfad zu einem freigegebenen Porträtfoto in /public – null, solange keines vorliegt */
  portrait: string | null;
  summary: string;
  career: CareerStep[];
  roles?: string[];
};

export const doctors: Doctor[] = [
  {
    slug: "dr-felix-haupt",
    name: "Dr. med. Felix Haupt",
    shortName: "Dr. Haupt",
    title: "Facharzt für Innere Medizin, Schwerpunkt Pneumologie",
    initials: "FH",
    portrait: null,
    summary:
      "Dr. Felix Haupt hat seine Weiterbildung in Innerer Medizin, Anästhesie und Pneumologie in Hamburg und an der LungenClinic Großhansdorf absolviert. Seit 2014 ist er in der Gemeinschaftspraxis niedergelassen.",
    career: [
      { period: "2006", text: "Studium der Medizin, ärztliche Prüfung und Approbation an der Universität Rostock" },
      {
        text: "Weiterbildung in Innerer Medizin, Anästhesie und Pneumologie im Ev. Amalie-Sieveking-Krankenhaus Hamburg, im Klinikum Eilbek und in der LungenClinic Großhansdorf",
      },
      { period: "seit 2014", text: "Niedergelassen in der Gemeinschaftspraxis für Lungenheilkunde, heute mit Helmut Golke und Dr. Sandra Sackmann" },
    ],
    roles: [
      "Weiterbildungsbefugnis für das Fachgebiet Pneumologie",
      "Vorsitzender der Lungenfachärzte Bremen/Bremerhaven",
    ],
  },
  {
    slug: "helmut-golke",
    name: "Helmut Golke",
    shortName: "Herr Golke",
    title: "Facharzt für Innere Medizin, Schwerpunkt Pneumologie",
    initials: "HG",
    portrait: null,
    summary:
      "Helmut Golke hat seine Weiterbildung in Innerer Medizin und Pneumologie im Marien-Hospital Witten und am Klinikum Bremen-Ost absolviert. Seit 2018 ist er in der Gemeinschaftspraxis niedergelassen.",
    career: [
      { period: "2008", text: "Studium der Medizin, ärztliche Prüfung und Approbation am Universitätsklinikum Hamburg-Eppendorf" },
      { text: "Weiterbildung in Innerer Medizin und Pneumologie im Marien-Hospital Witten und am Klinikum Bremen-Ost" },
      { period: "seit 2018", text: "Niedergelassen in der Gemeinschaftspraxis für Lungenheilkunde mit Dr. Sandra Sackmann und Dr. Felix Haupt" },
    ],
  },
  {
    slug: "dr-sandra-sackmann",
    name: "Dr. med. Sandra Sackmann",
    shortName: "Dr. Sackmann",
    title: "Fachärztin für Innere Medizin, Schwerpunkt Pneumologie",
    initials: "SS",
    portrait: null,
    summary:
      "Dr. Sandra Sackmann war von 2004 bis 2020 Leitende Oberärztin der Klinik für Pneumologie und Beatmungsmedizin am Klinikum Bremen-Ost. Seit Januar 2021 ist sie in der Gemeinschaftspraxis niedergelassen.",
    career: [
      { period: "1997", text: "Studium der Medizin, ärztliche Prüfung und Approbation an der Medizinischen Hochschule Hannover" },
      { text: "Weiterbildung in Innerer Medizin und Pneumologie" },
      { period: "2004 – 2020", text: "Leitende Oberärztin der Klinik für Pneumologie und Beatmungsmedizin am Klinikum Bremen-Ost" },
      { period: "seit 01/2021", text: "Niedergelassen in der Gemeinschaftspraxis für Lungenheilkunde mit Dr. Felix Haupt und Helmut Golke" },
    ],
  },
];

export function getDoctor(slug: string) {
  return doctors.find((d) => d.slug === slug);
}

/** Aussage der Praxis zur fachlichen Arbeitsweise (bisherige Website, „Über uns“). */
export const teamApproach =
  "Durch kontinuierliche Fortbildung und den Besuch wissenschaftlicher Kongresse stellen wir sicher, dass unsere Diagnostik und Behandlung den aktuellen Empfehlungen und Standards entsprechen.";

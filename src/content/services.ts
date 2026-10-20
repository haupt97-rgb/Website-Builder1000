/**
 * Leistungsspektrum.
 *
 * Grundlage sind die Seiten „Unsere Leistungen“ und „Über uns“ der bisherigen
 * Website. Ablaufbeschreibungen erklären die Untersuchungen allgemein und
 * enthalten bewusst keine praxisspezifischen Vorbereitungsregeln, solange diese
 * nicht von der Praxis bestätigt sind (siehe VERIFY.md).
 */

import type { LucideIcon } from "lucide-react";
import { Activity, FileText, Gauge, Moon, ScanLine, Sprout, Wind } from "lucide-react";

export type Examination = {
  name: string;
  /** Kurze Erklärung in Alltagssprache */
  text: string;
  /** Allgemeiner Ablauf – optional */
  procedure?: string;
};

export type Service = {
  slug: string;
  title: string;
  /** Ein Satz für Übersichten */
  teaser: string;
  icon: LucideIcon;
  intro: string;
  purpose: string;
  examinations: Examination[];
  /** Allgemeiner Hinweis zur Vorbereitung */
  preparation?: string;
  related?: string[];
  metaDescription: string;
};

const medicationNote =
  "Ob Sie Ihre Medikamente – insbesondere Sprays zur Inhalation – vor der Untersuchung wie gewohnt anwenden sollen, besprechen Sie bitte vorab mit unserem Praxisteam. Setzen Sie Medikamente nicht eigenmächtig ab.";

export const services: Service[] = [
  {
    slug: "lungenfunktion",
    title: "Lungenfunktion und Atemwegsdiagnostik",
    teaser: "Präzise Messung von Lungenvolumen, Atemwiderstand und Gasaustausch.",
    icon: Wind,
    intro:
      "Die Lungenfunktionsprüfung ist die Grundlage fast jeder pneumologischen Untersuchung. Sie zeigt, wie viel Luft Ihre Lunge aufnehmen kann, wie frei die Atemwege sind und wie gut Sauerstoff ins Blut übergeht.",
    purpose:
      "Die Messwerte helfen, Erkrankungen wie Asthma oder COPD zu erkennen, voneinander abzugrenzen und den Verlauf einer Behandlung objektiv zu beurteilen.",
    examinations: [
      {
        name: "Bodyplethysmographie",
        text: "Misst Lungenvolumen und Atemwegswiderstand – auch die Luftmenge, die nach dem Ausatmen in der Lunge verbleibt.",
        procedure:
          "Sie sitzen in einer durchsichtigen Kabine, die sich jederzeit öffnen lässt, und atmen mit Nasenklemme über ein Mundstück – zunächst ruhig, dann nach Anleitung kräftig ein und aus. Die Messung dauert in der Regel nur wenige Minuten.",
      },
      {
        name: "Messung der Diffusionskapazität",
        text: "Zeigt, wie gut Sauerstoff aus der Atemluft über die Lungenbläschen ins Blut übertritt.",
        procedure:
          "Sie atmen ein Testgasgemisch ein, halten kurz die Luft an und atmen wieder aus. Aus der Zusammensetzung der ausgeatmeten Luft wird der Gasaustausch berechnet.",
      },
      {
        name: "Reversibilitätstest",
        text: "Prüft, ob sich verengte Atemwege durch ein bronchienerweiterndes Medikament öffnen lassen.",
        procedure:
          "Nach einer ersten Messung inhalieren Sie ein atemwegserweiterndes Spray. Nach einer kurzen Wartezeit wird die Lungenfunktion erneut gemessen und verglichen.",
      },
      {
        name: "Unspezifische bronchiale Provokation",
        text: "Untersucht, ob Ihre Atemwege überempfindlich reagieren – ein wichtiger Baustein in der Asthma-Diagnostik.",
        procedure:
          "Unter ärztlicher Aufsicht inhalieren Sie eine Testsubstanz in ansteigender Dosierung. Zwischen den Schritten wird die Lungenfunktion gemessen; der Test wird beendet, sobald eine messbare Reaktion auftritt.",
      },
    ],
    preparation: medicationNote,
    related: ["asthma-allergologie", "copd", "blutgas-sauerstoff"],
    metaDescription:
      "Lungenfunktionsprüfung in Bremen: Bodyplethysmographie, Diffusionsmessung, Reversibilitätstest und bronchiale Provokation in der Gemeinschaftspraxis für Lungenheilkunde.",
  },
  {
    slug: "asthma-allergologie",
    title: "Asthma und Allergologie",
    teaser: "Diagnostik und Behandlung allergischer Atemwegserkrankungen wie Asthma und Heuschnupfen.",
    icon: Sprout,
    intro:
      "Asthma bronchiale und Heuschnupfen gehören zu den häufigsten Atemwegserkrankungen. Wir klären, ob Allergien eine Rolle spielen, und begleiten Sie langfristig in der Behandlung.",
    purpose:
      "Ziel ist eine gesicherte Diagnose und eine Therapie, die Beschwerden lindert und Ihnen einen möglichst unbeschwerten Alltag ermöglicht.",
    examinations: [
      {
        name: "Haut-Pricktest",
        text: "Zeigt, ob Ihr Immunsystem auf bestimmte Allergene – etwa Pollen, Hausstaubmilben oder Tierhaare – sensibilisiert ist.",
        procedure:
          "Kleine Tropfen mit Allergenlösungen werden auf die Innenseite des Unterarms aufgetragen und die Haut wird oberflächlich angeritzt. Nach etwa 15 bis 20 Minuten wird die Hautreaktion abgelesen.",
      },
      {
        name: "Hyposensibilisierung",
        text: "Eine spezifische Immuntherapie, die die Überempfindlichkeit gegenüber Allergenen verringern kann – auch bei allergischem Asthma.",
        procedure:
          "Das Allergen wird über einen längeren Zeitraum regelmäßig in ansteigender bzw. gleichbleibender Dosis verabreicht. Ob die Behandlung für Sie infrage kommt, besprechen wir individuell.",
      },
      {
        name: "DMP Asthma",
        text: "Das strukturierte Behandlungsprogramm der gesetzlichen Krankenkassen mit regelmäßigen Kontrollterminen.",
        procedure:
          "Für Teilnehmende am Programm gibt es eigene Termine in unserer Online-Terminbuchung.",
      },
    ],
    preparation:
      "Einige Medikamente, zum Beispiel Antihistaminika, können das Ergebnis eines Allergietests beeinflussen. Bitte klären Sie vor dem Termin mit unserem Praxisteam, ob und wie lange Sie solche Medikamente pausieren sollen.",
    related: ["lungenfunktion", "copd"],
    metaDescription:
      "Asthma und Allergologie in Bremen: Pricktest, Hyposensibilisierung und DMP Asthma bei Ihren Lungenfachärzten in der Mary-Astell-Straße.",
  },
  {
    slug: "copd",
    title: "COPD und chronische Atemwegserkrankungen",
    teaser: "Langfristige Begleitung bei COPD, Lungenemphysem und weiteren chronischen Lungenerkrankungen.",
    icon: Activity,
    intro:
      "Bei chronischen Erkrankungen der Lunge kommt es auf eine kontinuierliche, gut abgestimmte Betreuung an. Wir betreuen Patientinnen und Patienten mit COPD ebenso wie mit selteneren Lungenerkrankungen.",
    purpose:
      "Regelmäßige Kontrollen machen Veränderungen frühzeitig sichtbar und helfen, die Behandlung an Ihren aktuellen Zustand anzupassen.",
    examinations: [
      {
        name: "DMP COPD",
        text: "Strukturiertes Behandlungsprogramm mit regelmäßigen Verlaufskontrollen und Schulung zur Therapie.",
        procedure: "Für Teilnehmende gibt es eigene Termine in unserer Online-Terminbuchung.",
      },
      {
        name: "Verlaufskontrolle der Lungenfunktion",
        text: "Wiederholte Messungen zeigen, wie sich Ihre Lungenfunktion entwickelt und wie die Therapie wirkt.",
      },
      {
        name: "Inhalationstherapie",
        text: "Die richtige Anwendung Ihres Inhalators ist entscheidend für die Wirkung. Bringen Sie Ihr Gerät gern zum Termin mit.",
      },
    ],
    preparation: medicationNote,
    related: ["lungenfunktion", "blutgas-sauerstoff"],
    metaDescription:
      "COPD-Behandlung in Bremen: Diagnostik, DMP COPD und langfristige Betreuung chronischer Lungenerkrankungen in der pneumologischen Gemeinschaftspraxis.",
  },
  {
    slug: "schlafmedizin",
    title: "Schlafbezogene Atmungsstörungen",
    teaser: "Polygraphie zu Hause bei Verdacht auf Schlafapnoe sowie Kontrollen der CPAP-Therapie.",
    icon: Moon,
    intro:
      "Lautes Schnarchen, Atemaussetzer im Schlaf und ausgeprägte Tagesmüdigkeit können Hinweise auf eine Schlafapnoe sein. Die Untersuchung findet in Ihrer gewohnten Umgebung statt – bei Ihnen zu Hause.",
    purpose:
      "Die Messung zeigt, ob und wie häufig es nachts zu Atempausen und Sauerstoffabfällen kommt, und bildet die Grundlage für das weitere Vorgehen.",
    examinations: [
      {
        name: "Kardiorespiratorische Polygraphie",
        text: "Ein kleines, tragbares Messgerät zeichnet über Nacht Atmung, Atempausen, Sauerstoffsättigung, Puls und Schnarchgeräusche auf.",
        procedure:
          "Sie erhalten das Gerät in der Praxis und werden in die Anwendung eingewiesen. Sie legen es abends zu Hause selbst an und bringen es am nächsten Tag zur Auswertung zurück.",
      },
      {
        name: "Kontrolle der CPAP-Therapie",
        text: "Wenn Sie bereits mit einem CPAP-Gerät behandelt werden, führen wir die Verlaufskontrollen bei uns durch.",
      },
    ],
    related: ["blutgas-sauerstoff"],
    metaDescription:
      "Schlafapnoe-Diagnostik in Bremen: ambulante Polygraphie zu Hause und Kontrollen der CPAP-Therapie bei Ihren Lungenfachärzten.",
  },
  {
    slug: "blutgas-sauerstoff",
    title: "Blutgasanalyse und Sauerstoffmessung",
    teaser: "Bestimmung von Sauerstoff- und Kohlendioxidwerten im Blut.",
    icon: Gauge,
    intro:
      "Wie gut versorgt Ihre Lunge den Körper mit Sauerstoff? Die Blutgasanalyse und die Pulsoxymetrie geben darauf eine direkte Antwort.",
    purpose:
      "Die Werte helfen, die Schwere einer Lungenerkrankung einzuschätzen, und sind wichtig bei der Frage, ob eine Sauerstofftherapie sinnvoll ist.",
    examinations: [
      {
        name: "Blutgasanalyse",
        text: "Misst Sauerstoff, Kohlendioxid und den Säure-Basen-Haushalt im Blut.",
        procedure:
          "Dafür genügen wenige Tropfen Blut, die in der Regel aus dem Ohrläppchen entnommen werden. Das Ergebnis liegt nach kurzer Zeit vor.",
      },
      {
        name: "Pulsoxymetrie",
        text: "Ein Clip am Finger misst schmerzfrei die Sauerstoffsättigung des Blutes und den Puls.",
      },
    ],
    related: ["lungenfunktion", "copd"],
    metaDescription:
      "Blutgasanalyse und Pulsoxymetrie in Bremen: Messung der Sauerstoffversorgung in der Gemeinschaftspraxis für Lungenheilkunde.",
  },
  {
    slug: "roentgen",
    title: "Röntgen der Lunge",
    teaser: "Röntgenaufnahmen des Brustkorbs direkt in der Praxis.",
    icon: ScanLine,
    intro:
      "Eine Röntgenaufnahme des Brustkorbs (Röntgen-Thorax) ergänzt die Funktionsdiagnostik um ein Bild von Lunge, Herz und Brustraum.",
    purpose:
      "Das Röntgenbild kann Hinweise auf Entzündungen, Veränderungen des Lungengewebes oder Flüssigkeitsansammlungen geben und wird gemeinsam mit den übrigen Befunden beurteilt.",
    examinations: [
      {
        name: "Röntgen-Thorax",
        text: "Aufnahmen des Brustkorbs, in der Regel von vorn und von der Seite.",
        procedure:
          "Sie machen den Oberkörper frei, stehen dicht vor dem Aufnahmegerät und halten auf Anweisung kurz die Luft an. Die Aufnahme selbst dauert nur Sekunden.",
      },
    ],
    preparation:
      "Bitte teilen Sie uns vor der Aufnahme mit, wenn eine Schwangerschaft besteht oder möglich ist. Bringen Sie vorhandene Röntgen- oder CT-Bilder gern mit – ein Vergleich mit früheren Aufnahmen ist oft hilfreich.",
    related: ["lungenfunktion"],
    metaDescription:
      "Röntgen der Lunge (Röntgen-Thorax) in Bremen – ergänzende Bildgebung in der pneumologischen Gemeinschaftspraxis.",
  },
  {
    slug: "gutachten",
    title: "Gutachten und arbeitsmedizinische Untersuchungen",
    teaser: "Pneumologische Fachgutachten für Berufsgenossenschaften und Vorsorgeuntersuchungen.",
    icon: FileText,
    intro:
      "Wir erstellen pneumologische Fachgutachten für Berufsgenossenschaften – etwa bei Fragen zu berufsbedingten Lungenerkrankungen wie der Asbestose.",
    purpose:
      "Gutachten und Vorsorgeuntersuchungen schaffen eine fachlich fundierte Grundlage für Entscheidungen von Berufsgenossenschaften und Arbeitgebern.",
    examinations: [
      {
        name: "Gutachterliche Untersuchungen",
        text: "Untersuchungen für Berufsgenossenschaften mit pneumologischer Fragestellung.",
      },
      {
        name: "Arbeitsmedizinische Untersuchungen",
        text: "Untersuchungen nach den arbeitsmedizinischen Grundsätzen G 1.1 und G 1.2.",
      },
    ],
    preparation:
      "Fragen zum Ablauf einer Begutachtung und zu den benötigten Unterlagen beantwortet Ihnen unser Praxisteam gern telefonisch.",
    metaDescription:
      "Pneumologische Gutachten für Berufsgenossenschaften und arbeitsmedizinische Untersuchungen nach G 1.1 und G 1.2 in Bremen.",
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}

/** Erkrankungen, die laut bisheriger Website in der Praxis behandelt werden. */
export const conditions = [
  "Asthma bronchiale",
  "Allergische Atemwegserkrankungen",
  "COPD",
  "Lungenkrebs",
  "Asbestose",
  "Lungenentzündung",
  "Schlafbezogene Atmungsstörungen",
  "Seltene Lungenerkrankungen",
] as const;

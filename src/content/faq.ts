/**
 * Häufige Fragen. Antworten nur auf Basis verifizierter Praxisangaben;
 * wo keine gesicherte Information vorliegt, verweisen wir auf das Telefon.
 */

import { directions, practice } from "./practice";

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
  link?: { href: string; label: string };
};

export const faq: FaqItem[] = [
  {
    id: "termin",
    question: "Wie kann ich einen Termin vereinbaren?",
    answer: `Am einfachsten über unsere Online-Terminbuchung – rund um die Uhr. Alternativ erreichen Sie uns telefonisch unter ${practice.phone.display} zu unseren Telefonzeiten.`,
    link: { href: "/termin/", label: "Zur Terminvereinbarung" },
  },
  {
    id: "online",
    question: "Für wen gibt es Online-Termine?",
    answer:
      "Online buchbar sind Termine für Patientinnen und Patienten, die bereits bei uns in Behandlung sind (Rubrik „Sprechstunde“), für Teilnehmende an den DMP-Programmen Asthma und COPD, für neue Patientinnen und Patienten sowie Zusatztermine für Privatversicherte und Selbstzahler.",
  },
  {
    id: "versicherung",
    question: "Behandeln Sie gesetzlich und privat Versicherte?",
    answer:
      "Ja. Wir behandeln gesetzlich und privat Versicherte sowie Selbstzahler. Privatversicherte und Selbstzahler können zusätzlich Termine außerhalb der gesetzlichen Sprechstunden online buchen.",
  },
  {
    id: "mitbringen",
    question: "Was sollte ich zum ersten Termin mitbringen?",
    answer:
      "Bitte bringen Sie Ihre Gesundheitskarte mit. Hilfreich sind außerdem – sofern vorhanden – eine aktuelle Übersicht Ihrer Medikamente, Ihre Inhalatoren sowie Vorbefunde und Bilder früherer Untersuchungen. Ob Sie eine Überweisung benötigen, klären wir gern telefonisch.",
    link: { href: "/patienteninformationen/#erster-besuch", label: "Informationen zum ersten Besuch" },
  },
  {
    id: "lage",
    question: "Wo befindet sich die Praxis?",
    answer: `Seit dem ${practice.openedAtCurrentLocation} finden Sie uns in der ${practice.address.street}, ${practice.address.postalCode} ${practice.address.city} – an der Ecke Kremser Straße. ${directions.accessibility}`,
    link: { href: "/kontakt/#anfahrt", label: "Anfahrt ansehen" },
  },
  {
    id: "oepnv",
    question: "Wie erreiche ich die Praxis mit Bus und Straßenbahn?",
    answer: `Die ${directions.publicTransport.lines} halten an der Haltestelle „${directions.publicTransport.stop}“. ${directions.publicTransport.walk}`,
  },
  {
    id: "parken",
    question: "Wo kann ich parken?",
    answer: `${directions.car.parking} Für das Navigationsgerät geben Sie bitte „${directions.car.navigation}“ ein.`,
  },
  {
    id: "rezept",
    question: "Wie bestelle ich ein Folgerezept?",
    answer:
      "Folgerezepte für Ihre Dauermedikation können Sie bei uns bestellen, wenn im laufenden Quartal Ihre Gesundheitskarte in der Praxis eingelesen wurde. Das E-Rezept lösen Sie anschließend mit Ihrer Gesundheitskarte in der Apotheke ein.",
    link: { href: "/rezeptbestellung/", label: "Alles zur Rezeptbestellung" },
  },
  {
    id: "vorbereitung",
    question: "Muss ich mich auf eine Untersuchung vorbereiten?",
    answer:
      "Für manche Untersuchungen kann es sinnvoll sein, bestimmte Medikamente vorher zu pausieren. Bitte sprechen Sie uns dazu vor Ihrem Termin an und setzen Sie Medikamente nicht eigenmächtig ab.",
    link: { href: "/leistungen/", label: "Unsere Leistungen" },
  },
  {
    id: "absage",
    question: "Wie kann ich einen Termin absagen oder verschieben?",
    answer: `Bitte geben Sie uns so früh wie möglich telefonisch unter ${practice.phone.display} Bescheid. So können wir den Termin an andere Patientinnen und Patienten weitergeben.`,
  },
  {
    id: "infekt",
    question: "Ich habe einen akuten Infekt – was ist zu beachten?",
    answer:
      "Bitte rufen Sie uns vor Ihrem Besuch an. Wir besprechen dann mit Ihnen, wie wir weiter vorgehen.",
  },
  {
    id: "dringend",
    question: "Was tue ich, wenn ich dringend einen Termin brauche?",
    answer:
      "Wenn wir Ihnen kurzfristig keinen passenden Termin anbieten können, hilft die Terminservicestelle der Kassenärztlichen Vereinigung unter 116 117. Bei lebensbedrohlichen Notfällen wählen Sie bitte sofort den Notruf 112.",
  },
];

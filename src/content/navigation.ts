export type NavItem = { href: string; label: string };

export const mainNav: NavItem[] = [
  { href: "/praxis/", label: "Unsere Praxis" },
  { href: "/aerzteteam/", label: "Ärzteteam" },
  { href: "/leistungen/", label: "Leistungen" },
  { href: "/patienteninformationen/", label: "Patienteninformationen" },
  { href: "/kontakt/", label: "Kontakt" },
];

export const serviceNav: NavItem[] = [
  { href: "/termin/", label: "Termin vereinbaren" },
  { href: "/rezeptbestellung/", label: "Rezeptbestellung" },
  { href: "/richtig-inhalieren/", label: "Richtig inhalieren" },
  { href: "/patienteninformationen/#faq", label: "Häufige Fragen" },
];

export const legalNav: NavItem[] = [
  { href: "/impressum/", label: "Impressum" },
  { href: "/datenschutz/", label: "Datenschutz" },
];

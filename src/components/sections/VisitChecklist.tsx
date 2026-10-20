import { Check } from "lucide-react";

export const visitChecklist = [
  { title: "Gesundheitskarte", text: "bzw. Ihren Versicherungsnachweis" },
  { title: "Aktuelle Medikamentenübersicht", text: "inklusive Sprays und Inhalatoren" },
  { title: "Ihre Inhalatoren", text: "damit wir die Anwendung gemeinsam prüfen können" },
  { title: "Vorbefunde und Bilder", text: "z. B. Arztbriefe, Röntgen- oder CT-Aufnahmen – sofern vorhanden" },
];

export function VisitChecklist({ tone = "light" }: { tone?: "light" | "sage" }) {
  return (
    <ul className={`divide-y divide-line rounded-[16px] border border-line ${tone === "sage" ? "bg-sage-50" : "bg-white"}`}>
      {visitChecklist.map((item) => (
        <li key={item.title} className="flex gap-4 px-5 py-4 sm:px-6">
          <span aria-hidden className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-petrol-800 text-white">
            <Check className="size-3.5" strokeWidth={3} />
          </span>
          <span>
            <span className="font-semibold text-petrol-900">{item.title}</span>
            <span className="block text-[0.9375rem] text-ink-soft">{item.text}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}

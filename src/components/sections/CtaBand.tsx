import { CalendarDays, Phone } from "lucide-react";
import { practice } from "@/content/practice";
import { ButtonLink } from "@/components/ui/Button";

/** Ruhiger Abschluss für Unterseiten – nicht nach jedem Abschnitt, sondern einmal am Seitenende. */
export function CtaBand({ title = "Sie möchten einen Termin vereinbaren?", text = "Buchen Sie online oder rufen Sie uns zu unseren Telefonzeiten an." }: { title?: string; text?: string }) {
  return (
    <section className="py-16 lg:py-20">
      <div className="container-page">
        <div className="on-dark flex flex-col gap-8 rounded-[22px] bg-petrol-800 px-7 py-10 text-white sm:px-10 lg:flex-row lg:items-center lg:justify-between lg:px-14 lg:py-12">
          <div className="max-w-xl">
            <h2 className="text-h3 text-white sm:text-[1.75rem]">{title}</h2>
            <p className="mt-3 text-sage-100">{text}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/termin/" variant="light" size="lg" icon={<CalendarDays aria-hidden className="size-4" />}>
              Termin vereinbaren
            </ButtonLink>
            <ButtonLink href={practice.phone.href} variant="outline-light" size="lg" icon={<Phone aria-hidden className="size-4" />}>
              {practice.phone.display}
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}

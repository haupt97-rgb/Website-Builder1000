import { CalendarDays, Phone } from "lucide-react";
import { emergency, onlineBooking, practice } from "@/content/practice";
import { ButtonLink } from "@/components/ui/Button";
import { PhoneHours } from "@/components/ui/PhoneHours";

/** Die zwei Wege zum Termin – online oder telefonisch. Dunkle Variante für die Startseite. */
export function BookingOptions({ headingLevel = "h3" }: { headingLevel?: "h2" | "h3" }) {
  const H = headingLevel;
  return (
    <div className="grid gap-4 lg:grid-cols-2 lg:gap-5">
      <div className="flex flex-col rounded-[22px] bg-white p-7 text-ink shadow-soft sm:p-9">
        <div className="flex items-center gap-3">
          <span className="flex size-11 items-center justify-center rounded-[10px] bg-sage-100 text-petrol-800">
            <CalendarDays aria-hidden className="size-5" />
          </span>
          <H className="text-h3">Online buchen</H>
        </div>
        <p className="mt-5 text-ink-soft">
          Wählen Sie in unserem Buchungsportal die passende Terminart und einen freien Termin – unabhängig von unseren
          Telefonzeiten.
        </p>
        <ul className="mt-6 space-y-3 border-t border-line pt-6">
          {onlineBooking.categories.map((c) => (
            <li key={c.title} className="flex gap-3 text-[0.9375rem]">
              <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-sage-500" />
              <span>
                <strong className="font-semibold text-petrol-900">{c.title}</strong>
                <span className="text-ink-soft"> – {c.text}</span>
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-auto pt-8">
          <ButtonLink href={onlineBooking.url} external size="lg" className="w-full sm:w-auto">
            Zur Online-Terminbuchung
          </ButtonLink>
        </div>
      </div>

      <div className="flex flex-col rounded-[22px] bg-white p-7 text-ink shadow-soft sm:p-9">
        <div className="flex items-center gap-3">
          <span className="flex size-11 items-center justify-center rounded-[10px] bg-sage-100 text-petrol-800">
            <Phone aria-hidden className="size-5" />
          </span>
          <H className="text-h3">Telefonisch</H>
        </div>
        <p className="mt-5 text-ink-soft">
          Unser Praxisteam hilft Ihnen gern persönlich weiter – zum Beispiel, wenn Sie unsicher sind, welche Terminart
          die richtige ist.
        </p>
        <div className="mt-6 border-t border-line pt-4">
          <PhoneHours />
        </div>
        <div className="mt-auto pt-8">
          <ButtonLink href={practice.phone.href} variant="secondary" size="lg" className="w-full sm:w-auto" icon={<Phone aria-hidden className="size-4" />}>
            {practice.phone.display}
          </ButtonLink>
        </div>
      </div>

      <p className="text-[0.9375rem] lg:col-span-2">
        <span className="font-semibold">Kein passender Termin oder ein dringendes Anliegen?</span>{" "}
        Die Terminservicestelle der Kassenärztlichen Vereinigung erreichen Sie unter{" "}
        <a href={emergency.serviceNumber.href} className="link-underline font-semibold">{emergency.serviceNumber.display}</a>.
        Bei lebensbedrohlichen Notfällen wählen Sie bitte den Notruf{" "}
        <a href={emergency.emergencyNumber.href} className="link-underline font-semibold">{emergency.emergencyNumber.display}</a>.
      </p>
    </div>
  );
}

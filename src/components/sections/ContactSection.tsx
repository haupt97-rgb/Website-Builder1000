import { Accessibility, Bus, Car, Mail, MapPin, Phone, Printer } from "lucide-react";
import { directions, practice, routeLinks } from "@/content/practice";
import { ButtonLink } from "@/components/ui/Button";
import { PhoneHours } from "@/components/ui/PhoneHours";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** Kontakt, telefonische Erreichbarkeit und Anfahrt – ohne eingebettete Karte (kein Drittanbieter-Tracking). */
export function ContactSection({ asPage = false }: { asPage?: boolean }) {
  return (
    <section aria-labelledby="kontakt-heading" className={asPage ? "py-16 lg:py-24" : "bg-white py-20 lg:py-28"}>
      <div className="container-page">
        {!asPage && (
          <SectionHeading
            id="kontakt-heading"
            eyebrow="Kontakt & Anfahrt"
            title="So finden Sie zu uns"
            intro={<p>Unsere Praxis liegt in Bremen Horn-Lehe, an der Ecke Kremser Straße / Mary-Astell-Straße.</p>}
          />
        )}
        {asPage && <h2 id="kontakt-heading" className="sr-only">Kontaktdaten und Anfahrt</h2>}

        <div className={`grid gap-10 lg:grid-cols-12 lg:gap-8 ${asPage ? "" : "mt-14"}`}>
          {/* Kontaktwege */}
          <div className="lg:col-span-4">
            <h3 className="text-sm font-semibold tracking-[0.12em] text-muted uppercase">Kontakt</h3>
            <address className="mt-5 space-y-5 not-italic">
              <div className="flex gap-4">
                <MapPin aria-hidden className="mt-1 size-5 shrink-0 text-petrol-700" />
                <div>
                  <p className="font-semibold text-petrol-900">{practice.shortLegalName}</p>
                  <p>
                    {practice.address.street}, {practice.address.floor}
                    <br />
                    {practice.address.postalCode} {practice.address.city}
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <Phone aria-hidden className="mt-1 size-5 shrink-0 text-petrol-700" />
                <p>
                  <span className="sr-only">Telefon: </span>
                  <a href={practice.phone.href} className="link-underline text-lg font-semibold text-petrol-900">
                    {practice.phone.display}
                  </a>
                </p>
              </div>
              <div className="flex gap-4">
                <Printer aria-hidden className="mt-1 size-5 shrink-0 text-petrol-700" />
                <p>Fax {practice.fax.display}</p>
              </div>
              <div className="flex gap-4">
                <Mail aria-hidden className="mt-1 size-5 shrink-0 text-petrol-700" />
                <div>
                  <a href={`mailto:${practice.email}`} className="link-underline font-semibold text-petrol-900">
                    {practice.email}
                  </a>
                  <p className="mt-1 text-sm text-muted">
                    Bitte senden Sie keine Befunde oder andere Gesundheitsdaten per unverschlüsselter E-Mail.
                  </p>
                </div>
              </div>
            </address>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href={routeLinks.google} external variant="primary">
                Route planen
              </ButtonLink>
              <ButtonLink href={routeLinks.osm} external variant="secondary">
                OpenStreetMap
              </ButtonLink>
            </div>
          </div>

          {/* Telefonzeiten */}
          <div className="rounded-[22px] bg-sage-100 p-7 sm:p-8 lg:col-span-4">
            <h3 className="text-h3">Telefonische Erreichbarkeit</h3>
            <div className="mt-5">
              <PhoneHours />
            </div>
            <p className="mt-5 text-sm text-ink-soft">
              Untersuchungen und Sprechstunden finden nach Terminvereinbarung statt. Abweichende Zeiten – etwa an Feiertagen
              oder während des Praxisurlaubs – geben wir rechtzeitig bekannt.
            </p>
          </div>

          {/* Anfahrt */}
          <div id="anfahrt" className="scroll-mt-28 lg:col-span-4">
            <h3 className="text-sm font-semibold tracking-[0.12em] text-muted uppercase">Anfahrt</h3>
            <dl className="mt-5 space-y-6">
              <div className="flex gap-4">
                <Bus aria-hidden className="mt-1 size-5 shrink-0 text-petrol-700" />
                <div>
                  <dt className="font-semibold text-petrol-900">Bus und Straßenbahn</dt>
                  <dd className="mt-1 text-ink-soft">
                    {directions.publicTransport.lines}, Haltestelle „{directions.publicTransport.stop}“.{" "}
                    {directions.publicTransport.walk}
                  </dd>
                </div>
              </div>
              <div className="flex gap-4">
                <Car aria-hidden className="mt-1 size-5 shrink-0 text-petrol-700" />
                <div>
                  <dt className="font-semibold text-petrol-900">Mit dem Auto</dt>
                  <dd className="mt-1 text-ink-soft">
                    {directions.car.parking} Navigationsadresse für den Parkplatz: {directions.car.navigation}.
                  </dd>
                </div>
              </div>
              <div className="flex gap-4">
                <Accessibility aria-hidden className="mt-1 size-5 shrink-0 text-petrol-700" />
                <div>
                  <dt className="font-semibold text-petrol-900">Barrierefreiheit</dt>
                  <dd className="mt-1 text-ink-soft">{directions.accessibility}</dd>
                </div>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}

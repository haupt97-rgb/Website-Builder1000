import type { Metadata } from "next";
import { Accessibility, Bus, Car, ShieldCheck } from "lucide-react";
import { directions, insurance, practice } from "@/content/practice";
import { conditions } from "@/content/services";
import { teamApproach } from "@/content/team";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArrowLink } from "@/components/ui/TextLink";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Unsere Praxis",
  description:
    "Die Gemeinschaftspraxis für Lungenheilkunde in Bremen Horn-Lehe: internistisch-pneumologische Versorgung, neue barrierefreie Praxisräume in der Mary-Astell-Straße 2.",
  path: "/praxis/",
});

const rooms = [
  { label: "Empfang und Anmeldung", alt: "Empfang und Anmeldung der Praxis", cls: "lg:col-span-7 aspect-[4/3] lg:aspect-[7/5]" },
  { label: "Wartebereich", alt: "Wartebereich der Praxis", cls: "lg:col-span-5 aspect-[4/3] lg:aspect-[5/5]" },
  { label: "Lungenfunktionslabor", alt: "Raum für die Lungenfunktionsmessung", cls: "lg:col-span-5 aspect-[4/3] lg:aspect-[5/5]" },
  { label: "Sprechzimmer", alt: "Sprechzimmer der Praxis", cls: "lg:col-span-7 aspect-[4/3] lg:aspect-[7/5]" },
];

export default function PraxisPage() {
  return (
    <>
      <PageHero
        eyebrow="Unsere Praxis"
        title="Eine Praxis für Ihre Lunge und Atemwege"
        crumbs={[{ href: "/praxis/", label: "Unsere Praxis" }]}
        intro={
          <p>
            Wir sind eine internistische Gemeinschaftspraxis mit dem Schwerpunkt der Behandlung von Lungen- und
            Bronchialerkrankungen. Drei Fachärzte betreuen Sie gemeinsam mit unserem Praxisteam.
          </p>
        }
      />

      <section className="py-20 lg:py-28" aria-labelledby="ansatz-heading">
        <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <SectionHeading id="ansatz-heading" eyebrow="Unser Anspruch" title="Sorgfältige Diagnostik, verständliche Erklärungen" />
          </div>
          <div className="space-y-6 text-lead text-ink-soft lg:col-span-6 lg:col-start-7">
            <p>
              Wir betreuen Patientinnen und Patienten mit allergischen Atemwegserkrankungen wie Asthma bronchiale oder
              Heuschnupfen, mit COPD, Lungenkrebs, Asbestose, Lungenentzündungen, schlafbezogenen Atmungsstörungen und
              seltenen Lungenerkrankungen.
            </p>
            <p>{teamApproach}</p>
            <p>
              Darüber hinaus erstellen wir pneumologische Fachgutachten für Berufsgenossenschaften.
            </p>
            <ArrowLink href="/leistungen/" className="text-base">Zu unseren Leistungen</ArrowLink>
          </div>
        </div>
      </section>

      <section aria-labelledby="raeume-heading" className="bg-white py-20 lg:py-28">
        <div className="container-page">
          <SectionHeading
            id="raeume-heading"
            eyebrow="Praxisräume"
            title="Neue Räume seit Dezember 2025"
            intro={
              <p>
                Seit dem {practice.openedAtCurrentLocation} finden Sie uns in der {practice.address.street} in Bremen
                Horn-Lehe. Die bisherigen Praxisräume in der Berliner Freiheit sind geschlossen; unsere Telefonnummer ist
                gleich geblieben.
              </p>
            }
          />
          <div className="mt-14 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-12" data-reveal>
            {rooms.map((r) => (
              <ImageSlot key={r.label} placeholderLabel={r.label} alt={r.alt} tone="paper" className={`rounded-[16px] ${r.cls}`} sizes="(min-width: 1024px) 50vw, 100vw" />
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="zugang-heading" className="py-20 lg:py-28">
        <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <SectionHeading id="zugang-heading" eyebrow="Gut erreichbar" title="Ankommen ohne Umwege" />
          </div>
          <ul className="divide-y divide-line border-y border-line lg:col-span-7">
            {[
              { icon: Accessibility, title: "Barrierefreier Zugang", text: directions.accessibility },
              { icon: Bus, title: "Bus und Straßenbahn", text: `${directions.publicTransport.lines}, Haltestelle „${directions.publicTransport.stop}“. ${directions.publicTransport.walk}` },
              { icon: Car, title: "Parken", text: `${directions.car.parking} Navigationsadresse: ${directions.car.navigation}.` },
              { icon: ShieldCheck, title: "Versicherung", text: `Wir behandeln ${insurance.join(", ").replace(/, ([^,]*)$/, " und $1")}.` },
            ].map(({ icon: Icon, title, text }) => (
              <li key={title} className="grid gap-3 py-6 sm:grid-cols-[14rem_1fr] sm:gap-8">
                <h3 className="flex items-center gap-3 text-base font-semibold">
                  <Icon aria-hidden className="size-5 text-petrol-700" />
                  {title}
                </h3>
                <p className="text-ink-soft">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="spektrum-heading" className="border-t border-line py-16 lg:py-20">
        <div className="container-page">
          <h2 id="spektrum-heading" className="text-h3">Erkrankungen, die wir behandeln</h2>
          <ul className="mt-6 flex flex-wrap gap-2">
            {conditions.map((c) => (
              <li key={c} className="rounded-full border border-line-strong bg-white px-4 py-1.5 text-[0.9375rem] text-ink">
                {c}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

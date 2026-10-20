import type { Metadata } from "next";
import { practice } from "@/content/practice";
import { PageHero } from "@/components/sections/PageHero";
import { BookingOptions } from "@/components/sections/BookingOptions";
import { VisitChecklist } from "@/components/sections/VisitChecklist";
import { ArrowLink } from "@/components/ui/TextLink";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Termin vereinbaren",
  description:
    "Termin bei den Lungenärzten Bremen vereinbaren: online über das Buchungsportal oder telefonisch unter 0421 / 98 98 85 0. Termine für neue Patienten, DMP und Privatversicherte.",
  path: "/termin/",
});

const steps = [
  {
    title: "Kontaktweg wählen",
    text: "Buchen Sie online – jederzeit und ohne Wartezeit am Telefon – oder rufen Sie uns zu unseren Telefonzeiten an.",
  },
  {
    title: "Termin festlegen",
    text: `Wählen Sie im Buchungsportal die passende Terminart, z. B. „Sprechstunde“, DMP oder Termine für neue Patientinnen und Patienten. Telefonisch erreichen Sie uns unter ${practice.phone.display}.`,
  },
  {
    title: "Vorbereitet kommen",
    text: "Bringen Sie Ihre Gesundheitskarte und – sofern vorhanden – Medikamentenübersicht und Vorbefunde mit. Planen Sie etwas Zeit für die Lungenfunktionsmessung ein.",
  },
];

export default function TerminPage() {
  return (
    <>
      <PageHero
        eyebrow="Terminvereinbarung"
        title="Termin vereinbaren"
        crumbs={[{ href: "/termin/", label: "Termin vereinbaren" }]}
        intro={
          <p>
            Sie können Ihren Termin online buchen oder uns anrufen. Auch für neue Patientinnen und Patienten bieten wir
            Termine an.
          </p>
        }
      />

      <section aria-labelledby="ablauf-heading" className="py-16 lg:py-24">
        <div className="container-page">
          <h2 id="ablauf-heading" className="text-h2">So vereinbaren Sie einen Termin</h2>
          <ol className="mt-10 grid gap-8 lg:mt-12 lg:grid-cols-3 lg:gap-0">
            {steps.map((s, i) => (
              <li key={s.title} className="relative flex gap-5 lg:flex-col lg:gap-0 lg:pr-10" data-reveal style={{ ["--reveal-delay" as string]: `${i * 100}ms` }}>
                <div className="flex flex-col items-center lg:flex-row">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-petrol-800 text-lg font-semibold text-white">
                    {i + 1}
                  </span>
                  {i < steps.length - 1 && <span aria-hidden className="mt-2 w-px flex-1 bg-line-strong lg:mt-0 lg:ml-4 lg:h-px lg:w-auto" />}
                </div>
                <div className="pb-2 lg:mt-6">
                  <h3 className="text-h3">{s.title}</h3>
                  <p className="mt-2 text-ink-soft">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="wege-heading" className="on-dark bg-petrol-900 py-16 text-white lg:py-24">
        <div className="container-page">
          <h2 id="wege-heading" className="text-h2 text-white">Online oder telefonisch</h2>
          <p className="mt-4 max-w-2xl text-sage-100">
            Die Online-Terminbuchung öffnet unser externes Buchungsportal in einem neuen Fenster. Bitte geben Sie dort nur
            die Angaben ein, die für die Terminvergabe erforderlich sind.
          </p>
          <div className="mt-10">
            <BookingOptions />
          </div>
        </div>
      </section>

      <section aria-labelledby="mitbringen-heading" className="py-16 lg:py-24">
        <div className="container-page grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <h2 id="mitbringen-heading" className="text-h2">Checkliste für Ihren Besuch</h2>
            <p className="mt-4 text-ink-soft">
              Privatversicherte und Selbstzahler wählen für Zusatztermine in der Online-Buchung bitte „Selbstzahler“.
              Wenn Sie einen Termin nicht wahrnehmen können, sagen Sie ihn bitte so früh wie möglich telefonisch ab.
            </p>
            <ArrowLink href="/patienteninformationen/#erster-besuch" className="mt-6">Mehr zum ersten Besuch</ArrowLink>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <VisitChecklist />
          </div>
        </div>
      </section>
    </>
  );
}

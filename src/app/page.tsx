import type { Metadata } from "next";
import Link from "next/link";
import { Accessibility, CalendarDays, MapPin, Phone } from "lucide-react";
import { faq } from "@/content/faq";
import { conditions } from "@/content/services";
import { directions, practice } from "@/content/practice";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowLink } from "@/components/ui/TextLink";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BookingOptions } from "@/components/sections/BookingOptions";
import { ContactSection } from "@/components/sections/ContactSection";
import { FaqList } from "@/components/sections/FaqList";
import { ServiceIndex } from "@/components/sections/ServiceIndex";
import { TeamGrid } from "@/components/sections/TeamGrid";
import { VisitChecklist } from "@/components/sections/VisitChecklist";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Lungenärzte Bremen – Gemeinschaftspraxis für Lungenheilkunde",
    description:
      "Fachärztliche Pneumologie in Bremen Horn-Lehe: Lungenfunktion, Asthma und Allergologie, COPD, Schlafapnoe-Diagnostik und Gutachten. Termine online oder telefonisch.",
    path: "/",
  }),
  title: { absolute: "Lungenärzte Bremen – Gemeinschaftspraxis für Lungenheilkunde" },
};

const facts = [
  { value: "3", label: "Fachärzte für Innere Medizin", detail: "mit Schwerpunkt Pneumologie" },
  { value: "16 Jahre", label: "klinische Leitungserfahrung", detail: "Dr. Sackmann als Leitende Oberärztin am Klinikum Bremen-Ost" },
  { value: "DMP", label: "Asthma und COPD", detail: "strukturierte Behandlungsprogramme" },
  { value: "Alle", label: "Versicherungsarten", detail: "gesetzlich, privat und Selbstzahler" },
];

const diagnostics = [
  { name: "Bodyplethysmographie", area: "Lungenfunktion" },
  { name: "Diffusionskapazität", area: "Gasaustausch" },
  { name: "Reversibilitätstest", area: "Atemwege" },
  { name: "Bronchiale Provokation", area: "Atemwege" },
  { name: "Haut-Pricktest", area: "Allergologie" },
  { name: "Polygraphie zu Hause", area: "Schlafmedizin" },
  { name: "Blutgasanalyse", area: "Sauerstoff" },
  { name: "Röntgen-Thorax", area: "Bildgebung" },
];

const homeFaq = faq.filter((f) => ["termin", "versicherung", "mitbringen", "rezept", "parken", "dringend"].includes(f.id));

export default function HomePage() {
  return (
    <>
      {/* 1 · Hero */}
      <section className="relative overflow-hidden">
        <div className="container-page grid gap-10 pt-8 pb-14 sm:pt-12 lg:grid-cols-12 lg:gap-8 lg:pt-16 lg:pb-20">
          <div className="flex flex-col justify-center lg:col-span-6 lg:py-10 xl:col-span-5">
            <p className="eyebrow">Gemeinschaftspraxis für Lungenheilkunde</p>
            <h1 className="mt-5 text-display">
              Ihre Lunge
              <br />
              in guten Händen.
            </h1>
            <p className="mt-6 max-w-lg text-lead text-ink-soft">
              Fachärztliche Pneumologie in Bremen – mit moderner Lungenfunktionsdiagnostik, langjähriger Erfahrung und
              persönlicher Betreuung.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/termin/" size="lg" icon={<CalendarDays aria-hidden className="size-[18px]" />}>
                Termin vereinbaren
              </ButtonLink>
              <ButtonLink href="/leistungen/" size="lg" variant="secondary">
                Unsere Leistungen
              </ButtonLink>
            </div>
          </div>

          <div className="relative lg:col-span-6 xl:col-span-7 xl:pl-6">
            <ImageSlot
              placeholderLabel="Teamfoto der drei Ärzte in der Praxis"
              alt="Das Ärzteteam der Gemeinschaftspraxis in den Praxisräumen"
              className="aspect-[4/3] rounded-[22px] sm:aspect-[16/11] lg:aspect-auto lg:h-full lg:min-h-[34rem]"
              priority
              sizes="(min-width: 1024px) 55vw, 100vw"
            />
            <div className="absolute right-4 bottom-4 left-4 hidden max-w-sm rounded-[16px] bg-white/95 p-5 shadow-lift backdrop-blur sm:block lg:right-auto lg:-left-10 lg:bottom-10">
              <p className="text-xs font-bold tracking-[0.12em] text-petrol-700 uppercase">Neue Praxisräume</p>
              <p className="mt-1.5 text-[0.9375rem] leading-snug text-ink">
                Seit dem {practice.openedAtCurrentLocation} in der {practice.address.street} – barrierefrei mit Aufzug.
              </p>
            </div>
          </div>
        </div>

        {/* Informationszeile */}
        <div className="container-page">
          <ul className="grid border-y border-line sm:grid-cols-3 sm:divide-x sm:divide-line">
            <li className="flex items-center gap-4 py-5 sm:pr-6">
              <Phone aria-hidden className="size-5 shrink-0 text-petrol-700" />
              <div>
                <p className="text-sm text-muted">Telefon, Mo–Fr ab 9 Uhr</p>
                <a href={practice.phone.href} className="font-semibold text-petrol-900 hover:underline">
                  {practice.phone.display}
                </a>
              </div>
            </li>
            <li className="flex items-center gap-4 border-t border-line py-5 sm:border-t-0 sm:px-6">
              <MapPin aria-hidden className="size-5 shrink-0 text-petrol-700" />
              <div>
                <p className="text-sm text-muted">Bremen Horn-Lehe</p>
                <Link href="/kontakt/#anfahrt" className="font-semibold text-petrol-900 hover:underline">
                  {practice.address.street}
                </Link>
              </div>
            </li>
            <li className="flex items-center gap-4 border-t border-line py-5 sm:border-t-0 sm:pl-6">
              <Accessibility aria-hidden className="size-5 shrink-0 text-petrol-700" />
              <div>
                <p className="text-sm text-muted">Barrierefreier Zugang</p>
                <p className="font-semibold text-petrol-900">1. Etage, mit Aufzug</p>
              </div>
            </li>
          </ul>
        </div>
      </section>

      {/* 2 · Vertrauen: belegbare Fakten */}
      <section aria-labelledby="fakten-heading" className="py-16 lg:py-20">
        <div className="container-page">
          <h2 id="fakten-heading" className="sr-only">Die Praxis in Zahlen</h2>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4 lg:gap-x-0 lg:divide-x lg:divide-line">
            {facts.map((f, i) => (
              <div key={f.label} className="flex flex-col lg:px-8 first:lg:pl-0" data-reveal style={{ ["--reveal-delay" as string]: `${i * 80}ms` }}>
                <dt className="order-2 mt-2 font-semibold text-petrol-900">{f.label}</dt>
                <dd className="order-1 text-[2.25rem] leading-none font-semibold tracking-[-0.03em] text-petrol-800 lg:text-[2.75rem]">
                  {f.value}
                </dd>
                <dd className="order-3 mt-1 text-[0.9375rem] text-muted">{f.detail}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* 3 · Schwerpunkte */}
      <section aria-labelledby="schwerpunkte-heading" className="bg-white py-20 lg:py-28">
        <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <SectionHeading
                id="schwerpunkte-heading"
                eyebrow="Medizinische Schwerpunkte"
                title="Von der ersten Abklärung bis zur langfristigen Begleitung"
                intro={
                  <p>
                    Wir betreuen Menschen mit akuten und chronischen Erkrankungen der Lunge und der Atemwege – von Asthma und
                    COPD bis zu seltenen Lungenerkrankungen.
                  </p>
                }
              />
              <ul className="mt-8 flex flex-wrap gap-2" aria-label="Behandelte Erkrankungen">
                {conditions.map((c) => (
                  <li key={c} className="rounded-full border border-line px-3 py-1 text-sm text-ink-soft">
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="lg:col-span-8" data-reveal>
            <ServiceIndex />
          </div>
        </div>
      </section>

      {/* 4 · Ärzteteam */}
      <section aria-labelledby="team-heading" className="py-20 lg:py-28">
        <div className="container-page">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              id="team-heading"
              eyebrow="Ärzteteam"
              title="Lernen Sie unser Ärzteteam kennen"
              intro={
                <p>
                  Drei Fachärzte für Innere Medizin mit Schwerpunkt Pneumologie – mit langjähriger Erfahrung aus
                  spezialisierten Lungenkliniken in Norddeutschland.
                </p>
              }
            />
            <ArrowLink href="/aerzteteam/" className="shrink-0">Zum Ärzteteam</ArrowLink>
          </div>
          <div className="mt-14">
            <TeamGrid />
          </div>
        </div>
      </section>

      {/* 5 · Terminvereinbarung */}
      <section aria-labelledby="termin-heading" className="on-dark bg-petrol-900 py-20 text-white lg:py-28">
        <div className="container-page">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="eyebrow">Terminvereinbarung</p>
              <h2 id="termin-heading" className="mt-4 text-h2 text-white">
                Ihr Termin – online oder telefonisch
              </h2>
            </div>
            <p className="text-lead text-sage-100 lg:col-span-5">
              Neue und bekannte Patientinnen und Patienten können ihren Termin bequem online buchen. Bei Fragen ist unser
              Praxisteam telefonisch für Sie da.
            </p>
          </div>
          <div className="mt-12 lg:mt-14">
            <BookingOptions />
          </div>
        </div>
      </section>

      {/* 6 · Diagnostik */}
      <section aria-labelledby="diagnostik-heading" className="py-20 lg:py-28">
        <div className="container-page grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:order-2 lg:col-span-6 lg:col-start-7">
            <SectionHeading
              id="diagnostik-heading"
              eyebrow="Diagnostik"
              title="Umfassende Diagnostik unter einem Dach"
              intro={
                <p>
                  Viele Untersuchungen führen wir direkt in der Praxis durch. Die Lungenfunktionsmessung übernimmt in der
                  Regel unser Praxisteam vor dem Gespräch mit Ihrer Ärztin oder Ihrem Arzt – so liegen alle
                  Werte bereits vor.
                </p>
              }
            />
            <dl className="mt-10 grid grid-cols-1 border-t border-line sm:grid-cols-2 sm:gap-x-8">
              {diagnostics.map((d) => (
                <div key={d.name} className="flex flex-col border-b border-line py-3.5">
                  <dt className="font-semibold text-petrol-900">{d.name}</dt>
                  <dd className="text-sm text-muted">{d.area}</dd>
                </div>
              ))}
            </dl>
            <ArrowLink href="/leistungen/" className="mt-8">Alle Untersuchungen erklärt</ArrowLink>
          </div>
          <div className="lg:order-1 lg:col-span-6" data-reveal>
            <ImageSlot
              placeholderLabel="Lungenfunktionslabor mit Bodyplethysmograph"
              alt="Untersuchungsraum mit Bodyplethysmograph zur Lungenfunktionsmessung"
              className="aspect-[4/5] rounded-[22px] sm:aspect-[5/4] lg:aspect-[4/5]"
              sizes="(min-width: 1024px) 45vw, 100vw"
            />
          </div>
        </div>
      </section>

      {/* 7 · Praxisräume */}
      <section aria-labelledby="raeume-heading" className="bg-sage-100 py-20 lg:py-28">
        <div className="container-page">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <SectionHeading
              id="raeume-heading"
              eyebrow="Unsere Praxis"
              title="Neue Räume in Horn-Lehe"
              className="lg:col-span-7"
            />
            <div className="lg:col-span-5">
              <p className="text-ink-soft">
                Seit Dezember 2025 empfangen wir Sie in unseren neuen Praxisräumen in der {practice.address.street}.{" "}
                {directions.accessibility}
              </p>
              <ArrowLink href="/praxis/" className="mt-5">Die Praxis kennenlernen</ArrowLink>
            </div>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-12 lg:grid-rows-2" data-reveal>
            <ImageSlot
              placeholderLabel="Empfang und Anmeldung"
              alt="Empfang und Anmeldung der Praxis"
              tone="paper"
              className="col-span-2 aspect-[16/10] rounded-[16px] lg:col-span-7 lg:row-span-2 lg:aspect-auto lg:h-full"
              sizes="(min-width: 1024px) 55vw, 100vw"
            />
            <ImageSlot
              placeholderLabel="Wartebereich"
              alt="Wartebereich der Praxis"
              tone="paper"
              className="aspect-square rounded-[16px] lg:col-span-5 lg:aspect-[16/9]"
              sizes="(min-width: 1024px) 40vw, 50vw"
            />
            <ImageSlot
              placeholderLabel="Untersuchungsraum"
              alt="Untersuchungsraum der Praxis"
              tone="paper"
              className="aspect-square rounded-[16px] lg:col-span-5 lg:aspect-[16/9]"
              sizes="(min-width: 1024px) 40vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* 8 · Erster Besuch */}
      <section aria-labelledby="besuch-heading" className="py-20 lg:py-28">
        <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <SectionHeading
              id="besuch-heading"
              eyebrow="Ihr erster Besuch"
              title="Gut vorbereitet in die Praxis"
              intro={
                <p>
                  Mit den richtigen Unterlagen können wir Ihre Beschwerden schneller einordnen. Bitte planen Sie für den
                  ersten Termin etwas Zeit ein – die Lungenfunktionsmessung findet meist vor dem Arztgespräch statt.
                </p>
              }
            />
            <ArrowLink href="/patienteninformationen/#erster-besuch" className="mt-8">Mehr zum ersten Besuch</ArrowLink>
          </div>
          <div className="lg:col-span-6 lg:col-start-7" data-reveal>
            <h3 className="mb-4 text-sm font-semibold tracking-[0.12em] text-muted uppercase">Bitte mitbringen</h3>
            <VisitChecklist />
          </div>
        </div>
      </section>

      {/* 9 · FAQ */}
      <section aria-labelledby="faq-heading" className="border-t border-line py-20 lg:py-28">
        <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <SectionHeading
              id="faq-heading"
              eyebrow="Häufige Fragen"
              title="Kurz beantwortet"
              intro={<p>Ihre Frage ist nicht dabei? Rufen Sie uns gern an – wir helfen Ihnen weiter.</p>}
            />
            <ArrowLink href="/patienteninformationen/#faq" className="mt-8">Alle Fragen ansehen</ArrowLink>
          </div>
          <div className="lg:col-span-8">
            <FaqList items={homeFaq} />
          </div>
        </div>
      </section>

      {/* 10 · Kontakt & Anfahrt */}
      <ContactSection />
    </>
  );
}

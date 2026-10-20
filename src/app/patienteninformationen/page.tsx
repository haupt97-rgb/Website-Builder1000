import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarDays, Pill, Wind } from "lucide-react";
import { faq } from "@/content/faq";
import { insurance } from "@/content/practice";
import { PageHero } from "@/components/sections/PageHero";
import { FaqList } from "@/components/sections/FaqList";
import { VisitChecklist } from "@/components/sections/VisitChecklist";
import { CtaBand } from "@/components/sections/CtaBand";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Patienteninformationen",
  description:
    "Informationen für Ihren Besuch bei den Lungenärzten Bremen: erster Termin, Rezeptbestellung, richtig inhalieren und Antworten auf häufige Fragen.",
  path: "/patienteninformationen/",
});

const serviceLinks = [
  { href: "/termin/", icon: CalendarDays, title: "Termin vereinbaren", text: "Online buchen oder telefonisch vereinbaren." },
  { href: "/rezeptbestellung/", icon: Pill, title: "Rezeptbestellung", text: "Folgerezepte für Ihre Dauermedikation." },
  { href: "/richtig-inhalieren/", icon: Wind, title: "Richtig inhalieren", text: "Damit Ihre Inhalationstherapie wirken kann." },
];

export default function PatientInfoPage() {
  return (
    <>
      <PageHero
        eyebrow="Patienteninformationen"
        title="Gut informiert zu Ihrem Termin"
        crumbs={[{ href: "/patienteninformationen/", label: "Patienteninformationen" }]}
        intro={<p>Praktische Hinweise für Ihren Besuch und unsere Serviceangebote auf einen Blick.</p>}
      />

      <section aria-label="Service" className="py-12 lg:py-16">
        <div className="container-page">
          <ul className="grid gap-4 md:grid-cols-3">
            {serviceLinks.map(({ href, icon: Icon, title, text }) => (
              <li key={href}>
                <Link href={href} className="group flex h-full items-start gap-4 rounded-[16px] border border-line bg-white p-6 transition-[border-color,box-shadow] duration-200 hover:border-petrol-700 hover:shadow-soft">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-[10px] bg-sage-100 text-petrol-800">
                    <Icon aria-hidden className="size-5" />
                  </span>
                  <span className="flex-1">
                    <span className="flex items-center justify-between gap-2 font-semibold text-petrol-900">
                      {title}
                      <ArrowRight aria-hidden className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </span>
                    <span className="mt-1 block text-[0.9375rem] text-ink-soft">{text}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="erster-besuch" aria-labelledby="besuch-heading" className="scroll-mt-24 border-t border-line bg-white py-16 lg:py-24">
        <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <p className="eyebrow">Erster Besuch</p>
            <h2 id="besuch-heading" className="mt-4 text-h2">Was Sie bei Ihrem ersten Besuch erwartet</h2>
            <div className="mt-6 space-y-4 text-ink-soft">
              <p>
                Häufig beginnt Ihr Termin mit einer Lungenfunktionsmessung, die unser Praxisteam vor dem Arztgespräch
                durchführt. Anschließend bespricht Ihre Ärztin bzw. Ihr Arzt mit Ihnen Beschwerden, Vorgeschichte und
                Ergebnisse – und, wenn nötig, weitere Untersuchungen.
              </p>
              <p>Wir behandeln {insurance.join(", ").replace(/, ([^,]*)$/, " und $1")}.</p>
            </div>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <h3 className="mb-4 text-sm font-semibold tracking-[0.12em] text-muted uppercase">Bitte mitbringen</h3>
            <VisitChecklist tone="sage" />
          </div>
        </div>
      </section>

      <section id="faq" aria-labelledby="faq-all-heading" className="scroll-mt-24 py-16 lg:py-24">
        <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <p className="eyebrow">Häufige Fragen</p>
            <h2 id="faq-all-heading" className="mt-4 text-h2">Fragen und Antworten</h2>
            <p className="mt-4 text-ink-soft">Ihre Frage ist nicht dabei? Rufen Sie uns gern an.</p>
          </div>
          <div className="lg:col-span-8">
            <FaqList items={faq} />
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

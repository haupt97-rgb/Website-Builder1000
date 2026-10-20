import type { Metadata } from "next";
import { insurance } from "@/content/practice";
import { conditions } from "@/content/services";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceIndex } from "@/components/sections/ServiceIndex";
import { CtaBand } from "@/components/sections/CtaBand";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Leistungen und Diagnostik",
  description:
    "Unsere Leistungen in Bremen: Lungenfunktionsprüfung, Asthma und Allergologie, COPD, Schlafapnoe-Diagnostik, Blutgasanalyse, Röntgen der Lunge sowie Gutachten.",
  path: "/leistungen/",
});

export default function LeistungenPage() {
  return (
    <>
      <PageHero
        eyebrow="Leistungen"
        title="Diagnostik und Behandlung verständlich erklärt"
        crumbs={[{ href: "/leistungen/", label: "Leistungen" }]}
        intro={
          <p>
            Hier finden Sie einen Überblick über unsere Untersuchungen – mit kurzen Erklärungen, wozu sie dienen und wie
            sie ablaufen. Welche Untersuchungen für Sie sinnvoll sind, besprechen wir persönlich mit Ihnen.
          </p>
        }
      >
        <div className="rounded-[16px] border border-line bg-white p-6">
          <p className="text-sm font-semibold tracking-[0.12em] text-muted uppercase">Wir behandeln</p>
          <p className="mt-2 text-ink">{insurance.join(" · ")}</p>
        </div>
      </PageHero>

      <section aria-label="Leistungsbereiche" className="py-16 lg:py-24">
        <div className="container-page">
          <ServiceIndex headingLevel="h2" />
        </div>
      </section>

      <section aria-labelledby="erkrankungen-heading" className="border-t border-line bg-white py-16 lg:py-24">
        <div className="container-page grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 id="erkrankungen-heading" className="text-h2">Erkrankungen, die wir behandeln</h2>
            <p className="mt-4 text-ink-soft">Eine Auswahl der Krankheitsbilder, mit denen Patientinnen und Patienten zu uns kommen.</p>
          </div>
          <ul className="grid gap-x-8 sm:grid-cols-2 lg:col-span-6 lg:col-start-7">
            {conditions.map((c) => (
              <li key={c} className="border-b border-line py-3.5 font-medium text-petrol-900">{c}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-12">
        <div className="container-page">
          <p className="max-w-3xl text-sm text-muted">
            Die Informationen auf dieser Website dienen der allgemeinen Orientierung und ersetzen keine ärztliche
            Untersuchung oder Beratung.
          </p>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

import type { Metadata } from "next";
import { Phone } from "lucide-react";
import { practice, prescriptionOrder } from "@/content/practice";
import { PageHero } from "@/components/sections/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { PhoneHours } from "@/components/ui/PhoneHours";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Rezeptbestellung",
  description:
    "Folgerezepte für Ihre Dauermedikation bei den Lungenärzten Bremen bestellen: Voraussetzungen, Ablauf und Einlösung des E-Rezepts.",
  path: "/rezeptbestellung/",
});

const rules = [
  {
    title: "Gesundheitskarte im laufenden Quartal",
    text: "Voraussetzung ist, dass Ihre Gesundheitskarte im laufenden Quartal in der Praxis eingelesen wurde. Kommen Sie dafür zunächst einmal während der Sprechzeiten in die Praxis. Danach können Sie bis zum Quartalsende Folgerezepte bestellen.",
  },
  {
    title: "Nur Dauermedikation",
    text: "Ohne Rücksprache mit Ihrer behandelnden Ärztin bzw. Ihrem behandelnden Arzt können grundsätzlich nur Medikamente Ihrer Dauermedikation bestellt werden.",
  },
  {
    title: "E-Rezept in der Apotheke einlösen",
    text: "Ihr Rezept erhalten Sie als E-Rezept. Sie lösen es in der Apotheke Ihrer Wahl durch Vorlage Ihrer Gesundheitskarte ein.",
  },
];

export default function RezeptPage() {
  return (
    <>
      <PageHero
        eyebrow="Service"
        title="Rezeptbestellung"
        crumbs={[
          { href: "/patienteninformationen/", label: "Patienteninformationen" },
          { href: "/rezeptbestellung/", label: "Rezeptbestellung" },
        ]}
        intro={<p>Folgerezepte für Ihre Dauermedikation können Sie bei uns bestellen, ohne dafür einen Termin zu vereinbaren.</p>}
      />

      <section aria-labelledby="regeln-heading" className="py-16 lg:py-24">
        <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <h2 id="regeln-heading" className="text-h2">Gut zu wissen</h2>
            <ol className="mt-8 space-y-4">
              {rules.map((r, i) => (
                <li key={r.title} className="flex gap-5 rounded-[16px] border border-line bg-white p-6">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-sage-100 font-semibold text-petrol-800">{i + 1}</span>
                  <div>
                    <h3 className="text-base font-semibold sm:text-lg">{r.title}</h3>
                    <p className="mt-1.5 text-ink-soft">{r.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <aside aria-labelledby="bestellen-heading" className="lg:col-span-4 lg:col-start-9">
            <div className="rounded-[22px] bg-sage-100 p-7 lg:sticky lg:top-28">
              <h2 id="bestellen-heading" className="text-h3">So bestellen Sie</h2>
              {prescriptionOrder.onlineUrl ? (
                <>
                  <p className="mt-3 text-ink-soft">Nutzen Sie unseren gesicherten Online-Bestellweg oder rufen Sie uns an.</p>
                  <ButtonLink href={prescriptionOrder.onlineUrl} external className="mt-6 w-full">
                    Rezept online bestellen
                  </ButtonLink>
                </>
              ) : (
                <p className="mt-3 text-ink-soft">
                  Bitte bestellen Sie Ihr Folgerezept telefonisch zu unseren Telefonzeiten. Halten Sie dafür den Namen und
                  die Dosierung Ihres Medikaments bereit.
                </p>
              )}
              <ButtonLink
                href={practice.phone.href}
                variant={prescriptionOrder.onlineUrl ? "secondary" : "primary"}
                className="mt-4 w-full"
                icon={<Phone aria-hidden className="size-4" />}
              >
                {practice.phone.display}
              </ButtonLink>
              <div className="mt-6 border-t border-line-strong pt-4">
                <PhoneHours compact />
              </div>
              <p className="mt-5 text-sm text-ink-soft">
                Bitte senden Sie keine Rezeptwünsche mit Gesundheitsdaten per unverschlüsselter E-Mail.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

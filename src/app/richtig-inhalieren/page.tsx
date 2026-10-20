import type { Metadata } from "next";
import { Phone } from "lucide-react";
import { practice } from "@/content/practice";
import { PageHero } from "@/components/sections/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { CtaBand } from "@/components/sections/CtaBand";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Richtig inhalieren",
  description:
    "Warum die richtige Inhalationstechnik wichtig ist und wo Sie Anleitungsvideos für Ihr Inhalationsgerät finden – Hinweise der Lungenärzte Bremen.",
  path: "/richtig-inhalieren/",
});

const ATEMWEGSLIGA_URL = "https://www.atemwegsliga.de/richtig-inhalieren.html";

export default function InhalierenPage() {
  return (
    <>
      <PageHero
        eyebrow="Service"
        title="Richtig inhalieren"
        crumbs={[
          { href: "/patienteninformationen/", label: "Patienteninformationen" },
          { href: "/richtig-inhalieren/", label: "Richtig inhalieren" },
        ]}
        intro={
          <p>
            Viele Medikamente bei Asthma und COPD werden inhaliert. Damit sie ihre Wirkung entfalten können, kommt es auf
            die richtige Anwendung an.
          </p>
        }
      />
      <section className="py-16 lg:py-24">
        <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="prose-page text-lead text-ink-soft lg:col-span-7">
            <h2 className="!mt-0 text-h3 text-petrol-900">Warum die Technik so wichtig ist</h2>
            <p>
              Fehler bei der Handhabung eines Inhalationsgeräts können dazu führen, dass die Wirkung der inhalativen
              Therapie deutlich nachlässt. Jedes Gerät – ob Dosieraerosol oder Pulverinhalator – wird etwas anders
              angewendet.
            </p>
            <h2 className="text-h3 text-petrol-900">Anleitungen als Video</h2>
            <p>
              Die Deutsche Atemwegsliga stellt kostenlose Anleitungsvideos für zahlreiche Inhalationsgeräte bereit. Dort
              finden Sie in wenigen Minuten erklärt, wie Ihr Gerät richtig angewendet wird.
            </p>
            <div className="mt-6">
              <ButtonLink href={ATEMWEGSLIGA_URL} external variant="secondary">
                Videos der Deutschen Atemwegsliga
              </ButtonLink>
            </div>
          </div>
          <aside className="lg:col-span-4 lg:col-start-9">
            <div className="rounded-[22px] bg-sage-100 p-7">
              <h2 className="text-h3">Unsicher bei Ihrem Gerät?</h2>
              <p className="mt-3 text-ink-soft">
                Sprechen Sie uns an. Bringen Sie Ihren Inhalator gern zu Ihrem nächsten Termin mit – wir schauen uns die
                Anwendung gemeinsam mit Ihnen an.
              </p>
              <ButtonLink href={practice.phone.href} className="mt-6 w-full" icon={<Phone aria-hidden className="size-4" />}>
                {practice.phone.display}
              </ButtonLink>
            </div>
          </aside>
        </div>
      </section>
      <CtaBand />
    </>
  );
}

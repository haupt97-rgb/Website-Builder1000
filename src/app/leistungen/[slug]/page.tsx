import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronDown, Info } from "lucide-react";
import { getService, services } from "@/content/services";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { pageMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/leistungen/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return pageMetadata({ title: service.title, description: service.metaDescription, path: `/leistungen/${service.slug}/` });
}

export default async function ServicePage({ params }: PageProps<"/leistungen/[slug]">) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();
  const Icon = service.icon;
  const related = (service.related ?? []).map(getService).filter((s) => s !== undefined);

  return (
    <>
      <PageHero
        eyebrow="Leistungen"
        title={service.title}
        crumbs={[
          { href: "/leistungen/", label: "Leistungen" },
          { href: `/leistungen/${service.slug}/`, label: service.title },
        ]}
        intro={<p>{service.intro}</p>}
      >
        <div className="flex gap-4 rounded-[16px] bg-sage-100 p-6">
          <Icon aria-hidden className="mt-0.5 size-6 shrink-0 text-petrol-800" />
          <div>
            <p className="font-semibold text-petrol-900">Wozu dient das?</p>
            <p className="mt-1.5 text-[0.9375rem] text-ink-soft">{service.purpose}</p>
          </div>
        </div>
      </PageHero>

      <section aria-labelledby="untersuchungen-heading" className="py-16 lg:py-24">
        <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <h2 id="untersuchungen-heading" className="text-h2 lg:sticky lg:top-28">
              {service.examinations.length > 1 ? "Untersuchungen im Überblick" : "Die Untersuchung im Überblick"}
            </h2>
          </div>
          <div className="lg:col-span-8">
            <ol className="space-y-4">
              {service.examinations.map((ex, i) => (
                <li key={ex.name} className="rounded-[16px] border border-line bg-white p-6 sm:p-8" data-reveal>
                  <div className="flex items-baseline gap-4">
                    <span aria-hidden className="text-sm font-semibold tabular-nums text-sage-500">{String(i + 1).padStart(2, "0")}</span>
                    <div className="flex-1">
                      <h3 className="text-h3">{ex.name}</h3>
                      <p className="mt-3 text-ink">{ex.text}</p>
                      {ex.procedure && (
                        <details className="faq-item group mt-5 border-t border-line pt-4">
                          <summary className="flex cursor-pointer items-center gap-2 font-semibold text-petrol-800">
                            <span className="link-underline">So läuft die Untersuchung ab</span>
                            <ChevronDown aria-hidden className="size-4 transition-transform duration-300 group-open:rotate-180" />
                          </summary>
                          <p className="pt-3 text-ink-soft">{ex.procedure}</p>
                        </details>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ol>

            {service.preparation && (
              <aside className="mt-8 flex gap-4 rounded-[16px] border-l-4 border-petrol-800 bg-sage-100 p-6" aria-label="Hinweis zur Vorbereitung">
                <Info aria-hidden className="mt-0.5 size-5 shrink-0 text-petrol-800" />
                <div>
                  <p className="font-semibold text-petrol-900">Hinweis zur Vorbereitung</p>
                  <p className="mt-1.5 text-ink-soft">{service.preparation}</p>
                </div>
              </aside>
            )}
            <p className="mt-8 text-sm text-muted">
              Die Beschreibungen erklären den allgemeinen Ablauf. Ihr individuelles Vorgehen besprechen wir persönlich mit
              Ihnen. Diese Informationen ersetzen keine ärztliche Beratung.
            </p>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section aria-labelledby="verwandt-heading" className="border-t border-line bg-white py-16">
          <div className="container-page">
            <h2 id="verwandt-heading" className="text-h3">Das könnte Sie auch interessieren</h2>
            <ul className="mt-6 grid gap-4 md:grid-cols-3">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link href={`/leistungen/${r.slug}/`} className="group flex h-full flex-col rounded-[16px] border border-line p-6 transition-[border-color,box-shadow] duration-200 hover:border-petrol-700 hover:shadow-soft">
                    <span className="font-semibold text-petrol-900 group-hover:text-petrol-700">{r.title}</span>
                    <span className="mt-2 text-[0.9375rem] text-ink-soft">{r.teaser}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <CtaBand />
    </>
  );
}

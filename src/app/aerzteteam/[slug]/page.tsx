import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { doctors, getDoctor, teamApproach } from "@/content/team";
import { DoctorPortrait } from "@/components/ui/DoctorPortrait";
import { CtaBand } from "@/components/sections/CtaBand";
import { pageMetadata, siteUrl } from "@/lib/seo";
import { practice } from "@/content/practice";

export const dynamicParams = false;

export function generateStaticParams() {
  return doctors.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: PageProps<"/aerzteteam/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const doctor = getDoctor(slug);
  if (!doctor) return {};
  return pageMetadata({
    title: doctor.name,
    description: `${doctor.name}, ${doctor.title}, in der Gemeinschaftspraxis für Lungenheilkunde in Bremen. Werdegang und Qualifikationen.`,
    path: `/aerzteteam/${doctor.slug}/`,
  });
}

export default async function DoctorPage({ params }: PageProps<"/aerzteteam/[slug]">) {
  const { slug } = await params;
  const doctor = getDoctor(slug);
  if (!doctor) notFound();
  const others = doctors.filter((d) => d.slug !== doctor.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: doctor.name,
    jobTitle: doctor.title,
    url: `${siteUrl}/aerzteteam/${doctor.slug}/`,
    worksFor: { "@type": "MedicalClinic", name: practice.legalName, url: siteUrl },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="border-b border-line">
        <div className="container-page grid gap-10 pt-8 pb-16 lg:grid-cols-12 lg:gap-8 lg:pt-10 lg:pb-24">
          <div className="lg:col-span-12">
            <Link href="/aerzteteam/" className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-petrol-800">
              <ArrowLeft aria-hidden className="size-4" />
              Zum Ärzteteam
            </Link>
          </div>
          <div className="lg:col-span-5">
            <DoctorPortrait doctor={doctor} priority className="aspect-[4/5] max-w-md rounded-[22px]" sizes="(min-width: 1024px) 40vw, 100vw" />
          </div>
          <div className="lg:col-span-6 lg:col-start-7 lg:pt-6">
            <p className="eyebrow">Ärzteteam</p>
            <h1 className="mt-4 text-h1">{doctor.name}</h1>
            <p className="mt-3 text-lead font-medium text-petrol-700">{doctor.title}</p>
            <p className="mt-8 text-lead text-ink-soft">{doctor.summary}</p>

            <h2 className="mt-14 text-sm font-semibold tracking-[0.12em] text-muted uppercase">Beruflicher Werdegang</h2>
            <ol className="mt-5 border-l border-line-strong">
              {doctor.career.map((step, i) => (
                <li key={i} className="relative pb-7 pl-7 last:pb-0">
                  <span aria-hidden className="absolute top-2 -left-[5px] size-[9px] rounded-full border-2 border-paper bg-petrol-800" />
                  {step.period && <p className="text-sm font-semibold tabular-nums text-petrol-700">{step.period}</p>}
                  <p className="mt-0.5 text-ink">{step.text}</p>
                </li>
              ))}
            </ol>

            {doctor.roles && (
              <>
                <h2 className="mt-12 text-sm font-semibold tracking-[0.12em] text-muted uppercase">Qualifikationen und Funktionen</h2>
                <ul className="mt-4 divide-y divide-line border-y border-line">
                  {doctor.roles.map((r) => (
                    <li key={r} className="py-3.5 text-ink">{r}</li>
                  ))}
                </ul>
              </>
            )}

            <p className="mt-12 rounded-[16px] bg-sage-100 p-6 text-ink-soft">{teamApproach}</p>
          </div>
        </div>
      </section>

      <section aria-labelledby="weitere-heading" className="py-16 lg:py-20">
        <div className="container-page">
          <h2 id="weitere-heading" className="text-h3">Weitere Ärzte unserer Praxis</h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {others.map((d) => (
              <li key={d.slug}>
                <Link href={`/aerzteteam/${d.slug}/`} className="group flex items-center gap-5 rounded-[16px] border border-line bg-white p-4 transition-shadow duration-200 hover:shadow-soft">
                  <DoctorPortrait doctor={d} className="size-20 shrink-0 rounded-[10px] [&>span]:hidden" sizes="80px" />
                  <span>
                    <span className="block font-semibold text-petrol-900 group-hover:text-petrol-700">{d.name}</span>
                    <span className="block text-sm text-muted">{d.title}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <CtaBand />
    </>
  );
}

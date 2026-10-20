import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { doctors } from "@/content/team";
import { DoctorPortrait } from "@/components/ui/DoctorPortrait";

export function TeamGrid({ headingLevel = "h3" }: { headingLevel?: "h2" | "h3" }) {
  const H = headingLevel;
  return (
    <ul className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
      {doctors.map((d, i) => (
        <li key={d.slug} data-reveal style={{ ["--reveal-delay" as string]: `${i * 90}ms` }}>
          <Link href={`/aerzteteam/${d.slug}/`} className="group block">
            <DoctorPortrait doctor={d} className="aspect-[5/4] rounded-[16px] sm:aspect-[4/5] transition-[box-shadow] duration-300 group-hover:shadow-lift" />
            <H className="mt-6 text-h3 transition-colors group-hover:text-petrol-700">{d.name}</H>
            <p className="mt-1.5 text-[0.9375rem] text-muted">{d.title}</p>
            <span className="mt-4 inline-flex items-center gap-2 text-[0.9375rem] font-semibold text-petrol-800">
              <span className="link-underline">Profil ansehen</span>
              <ArrowRight aria-hidden className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

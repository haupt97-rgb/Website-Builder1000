import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { services } from "@/content/services";

/** Redaktionelle Liste der Leistungsbereiche – bewusst als Zeilen statt identischer Karten. */
export function ServiceIndex({ headingLevel = "h3" }: { headingLevel?: "h2" | "h3" }) {
  const H = headingLevel;
  return (
    <ol className="border-t border-line">
      {services.map((s, i) => {
        const Icon = s.icon;
        return (
          <li key={s.slug} className="border-b border-line">
            <Link
              href={`/leistungen/${s.slug}/`}
              className="group grid grid-cols-[auto_1fr_auto] items-start gap-x-5 py-6 transition-colors duration-200 sm:gap-x-8 sm:py-7 hover:bg-sage-50/70"
            >
              <span className="pt-1 text-sm font-semibold tabular-nums text-muted sm:pl-3">{String(i + 1).padStart(2, "0")}</span>
              <span className="flex gap-4">
                <Icon aria-hidden className="mt-1 hidden size-5 shrink-0 text-sage-500 sm:block" />
                <span className="flex flex-col gap-1.5">
                  <H className="text-[1.1875rem] font-semibold lg:text-[1.3125rem]">{s.title}</H>
                  <span className="max-w-xl text-[0.9375rem] text-ink-soft sm:text-base">{s.teaser}</span>
                </span>
              </span>
              <span className="mt-0.5 flex size-9 items-center justify-center rounded-full border border-line-strong text-petrol-800 transition-[background-color,border-color,color,transform] duration-200 group-hover:border-petrol-800 group-hover:bg-petrol-800 group-hover:text-white sm:mr-3">
                <ArrowRight aria-hidden className="size-4" />
                <span className="sr-only">Mehr zu {s.title}</span>
              </span>
            </Link>
          </li>
        );
      })}
    </ol>
  );
}

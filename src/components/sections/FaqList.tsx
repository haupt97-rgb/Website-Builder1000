import { Plus } from "lucide-react";
import type { FaqItem } from "@/content/faq";
import { ArrowLink } from "@/components/ui/TextLink";

/**
 * Barrierefreie FAQ auf Basis von <details>/<summary>:
 * per Tastatur bedienbar, funktioniert ohne JavaScript, Antworten bleiben durchsuchbar.
 */
export function FaqList({ items }: { items: FaqItem[] }) {
  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item) => (
        <details key={item.id} id={`faq-${item.id}`} className="faq-item group">
          <summary className="flex min-h-16 cursor-pointer items-center justify-between gap-6 py-5 text-left text-[1.0625rem] font-semibold text-petrol-900 transition-colors duration-200 hover:text-petrol-700 sm:text-lg">
            <span>{item.question}</span>
            <span
              aria-hidden
              className="flex size-9 shrink-0 items-center justify-center rounded-full border border-line-strong text-petrol-800 transition-[transform,background-color] duration-300 ease-out group-open:rotate-45 group-open:bg-sage-100"
            >
              <Plus className="size-4" />
            </span>
          </summary>
          <div className="max-w-2xl pr-14 pb-6 text-ink-soft">
            <p>{item.answer}</p>
            {item.link && <ArrowLink href={item.link.href} className="mt-3 text-[0.9375rem]">{item.link.label}</ArrowLink>}
          </div>
        </details>
      ))}
    </div>
  );
}

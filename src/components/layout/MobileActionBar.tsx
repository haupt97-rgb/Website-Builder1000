import Link from "next/link";
import { CalendarDays, Phone } from "lucide-react";
import { practice } from "@/content/practice";

/**
 * Feste Aktionsleiste auf kleinen Bildschirmen. Der Seiteninhalt erhält
 * unten passenden Innenabstand (siehe layout.tsx), damit nichts verdeckt wird.
 */
export function MobileActionBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-paper/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md xl:hidden">
      <div className="container-page grid grid-cols-[auto_1fr] gap-2.5 py-2.5">
        <a
          href={practice.phone.href}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[10px] border border-line-strong bg-white px-4 font-semibold text-petrol-900"
        >
          <Phone aria-hidden className="size-[18px] text-petrol-700" />
          <span>Anrufen</span>
        </a>
        <Link
          href="/termin/"
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[10px] bg-petrol-800 px-4 font-semibold text-white"
        >
          <CalendarDays aria-hidden className="size-[18px]" />
          <span>Termin vereinbaren</span>
        </Link>
      </div>
    </div>
  );
}

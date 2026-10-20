import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Phone, Printer } from "lucide-react";
import { legalNav, mainNav, serviceNav } from "@/content/navigation";
import { onlineBooking, practice, routeLinks } from "@/content/practice";
import { PhoneHours } from "@/components/ui/PhoneHours";
import { Logo } from "./Logo";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="on-dark bg-petrol-900 text-sage-100">
      <div className="container-page grid gap-12 py-16 lg:grid-cols-12 lg:gap-8 lg:py-20">
        <div className="lg:col-span-4">
          <Logo tone="light" />
          <p className="mt-6 max-w-xs text-[0.9375rem] leading-relaxed text-sage-on-dark">
            {practice.shortLegalName} – Fachärzte für Innere Medizin mit Schwerpunkt Pneumologie in Bremen.
          </p>
          <address className="mt-8 space-y-3 text-[0.9375rem] not-italic">
            <p className="flex gap-3">
              <MapPin aria-hidden className="mt-1 size-4 shrink-0 text-sage-on-dark" />
              <span>
                {practice.address.street}
                <br />
                {practice.address.postalCode} {practice.address.city}
                <br />
                <a href={routeLinks.google} target="_blank" rel="noopener" className="link-underline text-white">
                  Route planen<span className="sr-only"> (öffnet Google Maps in neuem Fenster)</span>
                </a>
              </span>
            </p>
            <p className="flex gap-3">
              <Phone aria-hidden className="mt-1 size-4 shrink-0 text-sage-on-dark" />
              <a href={practice.phone.href} className="font-semibold text-white hover:underline">
                <span className="sr-only">Telefon: </span>
                {practice.phone.display}
              </a>
            </p>
            <p className="flex gap-3">
              <Printer aria-hidden className="mt-1 size-4 shrink-0 text-sage-on-dark" />
              <span>
                <span className="sr-only">Fax: </span>Fax {practice.fax.display}
              </span>
            </p>
            <p className="flex gap-3">
              <Mail aria-hidden className="mt-1 size-4 shrink-0 text-sage-on-dark" />
              <a href={`mailto:${practice.email}`} className="text-white hover:underline">
                {practice.email}
              </a>
            </p>
          </address>
        </div>

        <div className="lg:col-span-3 lg:col-start-5">
          <h2 className="text-sm font-semibold tracking-[0.12em] text-sage-on-dark uppercase">Telefonisch erreichbar</h2>
          <div className="mt-4">
            <PhoneHours tone="light" compact />
          </div>
        </div>

        <nav aria-label="Seiten" className="grid grid-cols-2 gap-8 sm:grid-cols-[auto_auto] sm:justify-start sm:gap-16 lg:col-span-5 lg:col-start-8 lg:justify-end lg:gap-12">
          <div>
            <h2 className="text-sm font-semibold tracking-[0.12em] text-sage-on-dark uppercase">Praxis</h2>
            <ul className="mt-4 space-y-2.5 text-[0.9375rem]">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sage-100 hover:text-white hover:underline">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-sm font-semibold tracking-[0.12em] text-sage-on-dark uppercase">Service</h2>
            <ul className="mt-4 space-y-2.5 text-[0.9375rem]">
              {serviceNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sage-100 hover:text-white hover:underline">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <a href={onlineBooking.url} target="_blank" rel="noopener" className="inline-flex items-center gap-1 text-sage-100 hover:text-white hover:underline">
                  {onlineBooking.label}
                  <ArrowUpRight aria-hidden className="size-3.5" />
                  <span className="sr-only"> (öffnet in neuem Fenster)</span>
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-4 py-6 text-sm text-sage-on-dark sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {practice.shortLegalName} · Dr. Felix Haupt, Helmut Golke, Dr. Sandra Sackmann
          </p>
          <ul className="flex gap-6">
            {legalNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-white hover:underline">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

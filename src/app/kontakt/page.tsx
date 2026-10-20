import type { Metadata } from "next";
import { practice } from "@/content/practice";
import { PageHero } from "@/components/sections/PageHero";
import { ContactSection } from "@/components/sections/ContactSection";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Kontakt und Anfahrt",
  description:
    "Kontakt zu den Lungenärzten Bremen: Mary-Astell-Straße 2, 28359 Bremen, Telefon 0421 / 98 98 85 0. Telefonzeiten, Anfahrt mit Bus, Straßenbahn und Auto.",
  path: "/kontakt/",
});

export default function KontaktPage() {
  return (
    <>
      <PageHero
        eyebrow="Kontakt"
        title="Kontakt und Anfahrt"
        crumbs={[{ href: "/kontakt/", label: "Kontakt" }]}
        intro={
          <p>
            Sie erreichen uns telefonisch unter{" "}
            <a href={practice.phone.href} className="link-underline font-semibold text-petrol-900">{practice.phone.display}</a>. Unsere
            Praxis finden Sie in der {practice.address.street} in Bremen Horn-Lehe.
          </p>
        }
      />
      <ContactSection asPage />
      <section className="pb-20">
        <div className="container-page">
          <ImageSlot
            placeholderLabel="Außenansicht des Praxisgebäudes, Ecke Kremser Straße"
            alt="Außenansicht des Gebäudes Mary-Astell-Straße 2"
            tone="sage"
            className="aspect-[16/9] rounded-[22px] lg:aspect-[21/8]"
          />
        </div>
      </section>
    </>
  );
}

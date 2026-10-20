import type { Metadata } from "next";
import { practice } from "@/content/practice";

export const siteUrl = practice.url;

/** Einheitliche Metadaten je Seite inkl. kanonischer URL und Open Graph. */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  /** mit führendem und abschließendem Slash, z. B. „/leistungen/“ */
  path: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | ${practice.name}`,
      description,
      url: path,
      siteName: practice.name,
      locale: "de_DE",
      type: "website",
    },
  };
}

export function clinicJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    name: practice.legalName,
    alternateName: practice.name,
    description: practice.description,
    url: practice.url,
    telephone: "+49 421 9898850",
    faxNumber: "+49 421 98988555",
    email: practice.email,
    medicalSpecialty: "Pulmonary",
    address: {
      "@type": "PostalAddress",
      streetAddress: practice.address.street,
      postalCode: practice.address.postalCode,
      addressLocality: practice.address.city,
      addressCountry: "DE",
    },
  };
}

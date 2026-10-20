import type { MetadataRoute } from "next";
import { doctors } from "@/content/team";
import { services } from "@/content/services";
import { siteUrl } from "@/lib/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "/",
    "/praxis/",
    "/aerzteteam/",
    "/leistungen/",
    "/termin/",
    "/patienteninformationen/",
    "/rezeptbestellung/",
    "/richtig-inhalieren/",
    "/kontakt/",
    "/impressum/",
    "/datenschutz/",
  ];
  const paths = [
    ...staticPaths,
    ...doctors.map((d) => `/aerzteteam/${d.slug}/`),
    ...services.map((s) => `/leistungen/${s.slug}/`),
  ];
  return paths.map((p) => ({
    url: `${siteUrl}${p}`,
    changeFrequency: "monthly",
    priority: p === "/" ? 1 : p === "/termin/" ? 0.9 : 0.7,
  }));
}

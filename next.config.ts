import type { NextConfig } from "next";

// Vollständig statischer Export: Die Website benötigt keinen Server,
// setzt keine Cookies und kann auf jedem Webspace betrieben werden.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  poweredByHeader: false,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Statischer Export: die Website läuft ohne Server auf jedem Hosting (Netlify, Vercel, GitHub Pages, Webspace …)
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
  poweredByHeader: false,
};
export default nextConfig;

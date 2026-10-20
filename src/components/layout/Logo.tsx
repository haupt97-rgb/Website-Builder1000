import Link from "next/link";

/** Wortmarke mit abstraktem Atem-Signet (zwei gespiegelte Luftströme). */
export function LogoMark({ className = "size-9", tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  const bg = tone === "dark" ? "#174b50" : "#e6efeb";
  const fg = tone === "dark" ? "#e6efeb" : "#174b50";
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden>
      <rect width="40" height="40" rx="10" fill={bg} />
      <g fill="none" stroke={fg} strokeWidth="2.2" strokeLinecap="round">
        <path d="M19 9.5v8.5c0 5.5-3.2 10.8-8.6 12.4" opacity="0.95" />
        <path d="M21 9.5v8.5c0 5.5 3.2 10.8 8.6 12.4" opacity="0.95" />
        <path d="M14.8 15.6c-2.4 2.1-3.9 5.3-3.9 8.6" opacity="0.5" />
        <path d="M25.2 15.6c2.4 2.1 3.9 5.3 3.9 8.6" opacity="0.5" />
      </g>
    </svg>
  );
}

export function Logo({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const title = tone === "dark" ? "text-petrol-900" : "text-white";
  const sub = tone === "dark" ? "text-muted" : "text-sage-on-dark";
  return (
    <Link href="/" className="group flex items-center gap-3" aria-label="Lungenärzte Bremen – zur Startseite">
      <LogoMark tone={tone} />
      <span className="flex flex-col leading-none">
        <span className={`text-[1.0625rem] font-bold tracking-[-0.02em] whitespace-nowrap ${title}`}>Lungenärzte Bremen</span>
        <span className={`mt-1 text-[0.75rem] font-medium tracking-[0.01em] ${sub}`}>
          Haupt · Golke · Sackmann
        </span>
      </span>
    </Link>
  );
}

import Image from "next/image";

type Props = {
  /** Pfad zu einem freigegebenen Foto in /public. Ohne Foto wird eine neutrale Fläche gezeigt. */
  src?: string | null;
  alt: string;
  /** Beschreibt, welches Foto hier vorgesehen ist (siehe ASSET_CHECKLIST.md) */
  placeholderLabel: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  tone?: "sage" | "petrol" | "paper";
};

/**
 * Bildfläche mit festem Seitenverhältnis (über className), damit keine
 * Layoutverschiebungen entstehen. Solange keine freigegebenen Fotos der Praxis
 * vorliegen, wird bewusst eine ruhige, abstrakte Fläche gezeigt – keine
 * Stockfotos und keine KI-generierten Personen.
 */
export function ImageSlot({ src, alt, placeholderLabel, className = "", priority, sizes = "100vw", tone = "sage" }: Props) {
  if (src) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <Image src={src} alt={alt} fill priority={priority} sizes={sizes} className="object-cover" />
      </div>
    );
  }

  const palette = {
    sage: { bg: "bg-sage-100", stroke: "#174b50", label: "text-petrol-800/70" },
    petrol: { bg: "bg-petrol-800", stroke: "#e6efeb", label: "text-sage-100/70" },
    paper: { bg: "bg-[#efefe9]", stroke: "#174b50", label: "text-petrol-800/70" },
  }[tone];

  return (
    <div
      className={`relative overflow-hidden ${palette.bg} ${className}`}
      role="img"
      aria-label={`Platzhalter: ${placeholderLabel}`}
      data-placeholder={placeholderLabel}
    >
      <svg
        aria-hidden
        className="absolute inset-0 size-full"
        viewBox="0 0 400 300"
        preserveAspectRatio="xMidYMid slice"
      >
        <g fill="none" stroke={palette.stroke} strokeWidth="1">
          {Array.from({ length: 9 }).map((_, i) => (
            <path
              key={i}
              opacity={0.05 + i * 0.018}
              d={`M -20 ${170 + i * 14} C 80 ${120 + i * 9}, 150 ${235 - i * 6}, 230 ${175 + i * 4} S 360 ${110 + i * 12}, 430 ${150 + i * 10}`}
            />
          ))}
        </g>
      </svg>
      <span
        className={`absolute top-4 right-4 rounded-full bg-white/70 px-3 py-1 text-xs font-medium backdrop-blur-sm ${palette.label} ${tone === "petrol" ? "bg-white/10" : ""}`}
        aria-hidden
      >
        Foto folgt · {placeholderLabel}
      </span>
    </div>
  );
}

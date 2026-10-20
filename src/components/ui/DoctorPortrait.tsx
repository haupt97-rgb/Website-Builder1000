import Image from "next/image";
import type { Doctor } from "@/content/team";

/**
 * Porträt eines Arztes. Solange kein freigegebenes Foto vorliegt, erscheint
 * eine ruhige Monogramm-Fläche – bewusst kein Stock- oder KI-Bild.
 */
export function DoctorPortrait({ doctor, className = "", sizes = "(min-width: 1024px) 30vw, 90vw", priority }: { doctor: Doctor; className?: string; sizes?: string; priority?: boolean }) {
  if (doctor.portrait) {
    return (
      <div className={`relative overflow-hidden bg-sage-100 ${className}`}>
        <Image src={doctor.portrait} alt={`Porträt von ${doctor.name}`} fill sizes={sizes} priority={priority} className="object-cover" />
      </div>
    );
  }
  return (
    <div
      className={`relative flex items-end overflow-hidden bg-sage-100 ${className}`}
      role="img"
      aria-label={`Platzhalter für das Porträt von ${doctor.name}`}
      data-placeholder={`Porträt ${doctor.name}`}
    >
      <svg aria-hidden viewBox="0 0 300 375" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full">
        <circle cx="150" cy="150" r="64" fill="#d4e2db" />
        <path d="M40 375c0-72 49-122 110-122s110 50 110 122z" fill="#d4e2db" />
      </svg>
      <span aria-hidden className="relative m-5 text-sm font-semibold tracking-[0.14em] text-petrol-800/60">
        {doctor.initials} · Foto folgt
      </span>
    </div>
  );
}

import { FolderIcon } from "./Icons";
import s from "./Logo.module.css";

/**
 * Wortmarke „festhalt“ mit Ordner-Bildmarke (nachgebaut nach dem Produktmaterial).
 * TODO: Sobald eine Original-Logodatei vorliegt, hier als SVG einsetzen.
 */
export function Logo({ inverted = false }: { inverted?: boolean }) {
  return (
    <span className={`${s.logo} ${inverted ? s.inverted : ""}`}>
      <span className={s.mark}>
        <FolderIcon />
      </span>
      <span className={s.text}>
        <span className={s.name}>festhalt</span>
        <span className={s.sub}>Der Familienordner</span>
      </span>
    </span>
  );
}

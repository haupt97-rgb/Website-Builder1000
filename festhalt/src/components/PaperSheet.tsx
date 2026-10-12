import type { Sheet } from "@/content/sheets";
import { chapters } from "@/content/chapters";
import { SheetIcon, LightbulbIcon } from "./Icons";
import s from "./PaperSheet.module.css";

type Props = {
  sheet: Sheet;
  /** Kompakt: für Miniaturen (weniger Zeilen, keine Fußzeile) */
  compact?: boolean;
  /** Ringlochung anzeigen */
  punched?: boolean;
  className?: string;
};

/**
 * Nachgebautes Vorschau-Blatt im Stil der Produktseiten.
 * Immer als „Vorschau“ gekennzeichnet – es handelt sich nicht um eine Originalseite.
 */
export function PaperSheet({ sheet, compact, punched = true, className }: Props) {
  const chapter = chapters.find((c) => c.no === sheet.chapter);
  const color = chapter?.color ?? "var(--brand)";

  if (sheet.image) {
    return (
      <div className={`${s.sheet} ${s.imageSheet} ${className ?? ""}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={sheet.image} alt={`Originalseite: ${sheet.title}`} loading="lazy" decoding="async" />
      </div>
    );
  }

  const blocks = compact ? sheet.blocks.slice(0, 1) : sheet.blocks;

  return (
    <div
      className={`${s.sheet} ${punched ? s.punched : ""} ${compact ? s.compact : ""} ${className ?? ""}`}
      style={{ "--accent": color } as React.CSSProperties}
    >
      <header className={s.head}>
        <span className={s.icon}>
          <SheetIcon name={sheet.icon} />
        </span>
        <div>
          <p className={s.title}>{sheet.title}</p>
          <p className={s.subtitle}>{sheet.subtitle}</p>
        </div>
        <span className={s.no} aria-hidden>
          {sheet.chapter}
        </span>
      </header>

      <div className={s.body}>
        {blocks.map((b, i) => {
          if (b.kind === "checklist") {
            const items = compact ? b.items.slice(0, 5) : b.items;
            return (
              <div key={i} className={s.block}>
                {b.heading && <p className={s.blockHead}>{b.heading}</p>}
                <ul className={s.checklist}>
                  {items.map((it) => (
                    <li key={it}>
                      <span className={s.box} aria-hidden />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            );
          }
          if (b.kind === "table") {
            const rows = compact ? b.rows.slice(0, 5) : b.rows;
            return (
              <div key={i} className={s.block}>
                <table className={s.table}>
                  <thead>
                    <tr>
                      {b.columns.map((c) => (
                        <th key={c} scope="col">
                          {c}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((r) => (
                      <tr key={r}>
                        <td>{r}</td>
                        {b.columns.slice(1).map((c) => (
                          <td key={c} aria-label={`${c}: leer`} />
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          }
          if (b.kind === "fields") {
            return (
              <div key={i} className={s.block}>
                {b.heading && <p className={s.blockHead}>{b.heading}</p>}
                <div className={s.fields}>
                  {b.fields.map((f, j) => (
                    <div key={j} className={s.field}>
                      {f && <span>{f}</span>}
                    </div>
                  ))}
                </div>
              </div>
            );
          }
          return (
            <div key={i} className={s.note}>
              <LightbulbIcon />
              <p>
                <strong>{b.label}:</strong> {b.text}
              </p>
            </div>
          );
        })}
      </div>

      {!compact && (
        <footer className={s.foot}>
          <span>
            Kapitel {sheet.chapter} · {chapter?.title}
          </span>
          <span className={s.previewTag}>Vorschau</span>
        </footer>
      )}
    </div>
  );
}

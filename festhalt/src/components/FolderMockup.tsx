"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import { useRef } from "react";
import { chapters } from "@/content/chapters";
import { FolderIcon } from "./Icons";
import s from "./FolderMockup.module.css";

/**
 * Hochwertiges, in CSS gebautes Ordner-Mock-up.
 * Beim Laden öffnet sich der Deckel, die oberste Seite hebt sich kurz an und legt sich wieder ab.
 * Alles in %/cqi aufgebaut → skaliert verlustfrei auf jede Breite.
 */
export function FolderMockup() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 60]);
  const shadowOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.6]);

  return (
    <div ref={ref} className={s.wrap} role="img" aria-label="Geöffneter festhalt-Familienordner mit acht farbigen Registern und der Kapitelseite „Einstieg & Überblick“">
      <motion.div className={s.desk} style={{ y }}>
        <motion.div className={s.shadow} style={{ opacity: shadowOpacity }} aria-hidden />
        <div className={`${s.binder} ${reduce ? s.static : ""}`} aria-hidden>
          {/* Innenseite links (Deckel-Innenseite) */}
          <div className={s.leftBoard}>
            <div className={s.pocket} />
          </div>

          {/* Ringmechanik */}
          <div className={s.spine}>
            {[0, 1, 2, 3].map((i) => (
              <span key={i} className={s.ring} style={{ "--i": i } as React.CSSProperties} />
            ))}
            <span className={s.bar} />
          </div>

          {/* Papierstapel rechts */}
          <div className={s.rightBoard}>
            <div className={s.stack}>
              <span className={s.stackEdge} style={{ "--n": 3 } as React.CSSProperties} />
              <span className={s.stackEdge} style={{ "--n": 2 } as React.CSSProperties} />
              <span className={s.stackEdge} style={{ "--n": 1 } as React.CSSProperties} />

              {/* Register */}
              <div className={s.tabs}>
                {chapters.map((c, i) => (
                  <span key={c.no} className={s.tab} style={{ "--c": c.color, "--i": i } as React.CSSProperties}>
                    {c.no}
                  </span>
                ))}
              </div>

              {/* Oberste Seite – Kapiteltrenner */}
              <div className={s.topPage}>
                <div className={s.holes} />
                <div className={s.divider}>
                  <FolderIcon className={s.dividerIcon} />
                  <p className={s.dividerKicker}>Kapitel 1</p>
                  <p className={s.dividerTitle}>Einstieg &amp; Überblick</p>
                  <span className={s.dividerLine} />
                </div>
                <div className={s.toc}>
                  <p className={s.tocHead}>Inhalt dieses Kapitels:</p>
                  <ol>
                    {chapters[0].topics.map((t, i) => (
                      <li key={t}>
                        <span>1.{i + 1}</span>
                        {t}
                      </li>
                    ))}
                  </ol>
                </div>
                <p className={s.pageFoot}>festhalt · Der Familienordner</p>
              </div>
            </div>
          </div>

          {/* Vorderdeckel – öffnet sich beim Laden */}
          <div className={s.cover}>
            <div className={s.coverFront}>
              <div className={s.coverPanel}>
                <FolderIcon className={s.coverIcon} />
                <p className={s.coverBrand}>festhalt</p>
                <p className={s.coverSub}>Der Familienordner</p>
                <span className={s.coverLine} />
                <p className={s.coverClaim}>Alles festgehalten. Für alle Fälle.</p>
              </div>
              <div className={s.label}>
                <span>Dieser Ordner gehört</span>
                <i />
                <i />
              </div>
            </div>
            <div className={s.coverBack} />
          </div>
        </div>
      </motion.div>
      <p className={s.caption} aria-hidden>
        Darstellung des ausgedruckten Ordners · Ordner &amp; Register nicht im Lieferumfang
      </p>
    </div>
  );
}

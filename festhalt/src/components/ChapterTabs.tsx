"use client";

import { AnimatePresence, motion, type Variants } from "framer-motion";
import { useRef, useState } from "react";
import { site } from "@/config/site";
import { chapters } from "@/content/chapters";
import { sheets } from "@/content/sheets";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import { EyeIcon, FolderIcon, Stroke } from "./Icons";
import { PaperSheet } from "./PaperSheet";
import { Reveal } from "./Reveal";
import { useViewer } from "./ViewerContext";
import s from "./ChapterTabs.module.css";

const turn: Variants = {
  enter: (dir: number) => (dir > 0 ? { rotateY: 0, zIndex: 1 } : { rotateY: -105, zIndex: 3 }),
  center: { rotateY: 0, zIndex: 2, transition: { duration: 0.5, ease: [0.3, 0.7, 0.2, 1] } },
  exit: (dir: number) =>
    dir > 0
      ? { rotateY: -105, zIndex: 3, transition: { duration: 0.5, ease: [0.45, 0.05, 0.4, 1] } }
      : { rotateY: 0, zIndex: 1, transition: { duration: 0.5 } },
};
const none: Variants = { enter: { opacity: 0 }, center: { opacity: 1, transition: { duration: 0 } }, exit: { opacity: 0, transition: { duration: 0 } } };

export function ChapterTabs() {
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(1);
  const reduce = useReducedMotionSafe();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const { openAt } = useViewer();

  const select = (i: number, focus = false) => {
    if (i === active) return;
    setDir(i > active ? 1 : -1);
    setActive(i);
    if (focus) tabRefs.current[i]?.focus();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const n = chapters.length;
    let i: number | null = null;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") i = (active + 1) % n;
    if (e.key === "ArrowUp" || e.key === "ArrowLeft") i = (active - 1 + n) % n;
    if (e.key === "Home") i = 0;
    if (e.key === "End") i = n - 1;
    if (i !== null) {
      e.preventDefault();
      select(i, true);
    }
  };

  const c = chapters[active];
  const chapterSheets = c.sheetIds.map((id) => sheets.find((sh) => sh.id === id)!).filter(Boolean);

  return (
    <section id="kapitel" className={s.section} aria-labelledby="kapitel-title">
      <div className="container">
        <Reveal className="section-head center">
          <p className="eyebrow">
            <span className="reg">05</span> Das Registersystem
          </p>
          <h2 id="kapitel-title" className="h2">
            {site.product.chapters} Kapitel. Ein System.
          </h2>
          <Stroke />
          <p className="lead">
            Jedes Register steht für einen Lebensbereich. Wähle ein Kapitel, um zu sehen, welche Themen dich darin
            erwarten.
          </p>
        </Reveal>

        <Reveal className={s.binder} delay={100}>
          {/* Register */}
          <div className={s.tabs} role="tablist" aria-label="Kapitel des Familienordners" aria-orientation="vertical" onKeyDown={onKeyDown}>
            {chapters.map((ch, i) => (
              <button
                key={ch.no}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                id={`tab-${ch.no}`}
                type="button"
                role="tab"
                aria-selected={i === active}
                aria-controls={`panel-${ch.no}`}
                tabIndex={i === active ? 0 : -1}
                className={`${s.tab} ${i === active ? s.tabActive : ""}`}
                style={{ "--c": ch.color } as React.CSSProperties}
                onClick={() => select(i)}
              >
                <span className={s.tabNo}>{ch.no}</span>
                <span className={s.tabLabel}>{ch.short}</span>
              </button>
            ))}
          </div>

          <div className={s.spread}>
            {/* Linke Seite: Kapiteltrenner */}
            <div className={s.leftPage} aria-hidden>
              <AnimatePresence initial={false} mode="popLayout">
                <motion.div
                  key={c.no}
                  className={s.divider}
                  style={{ "--c": c.color } as React.CSSProperties}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { duration: reduce ? 0 : 0.35, delay: reduce ? 0 : 0.15 } }}
                  exit={{ opacity: 0, transition: { duration: reduce ? 0 : 0.25 } }}
                >
                  <FolderIcon className={s.dividerIcon} />
                  <p className={s.dividerKicker}>Kapitel {Number(c.no)}</p>
                  <p className={s.dividerTitle}>{c.title}</p>
                  <span className={s.dividerLine} />
                </motion.div>
              </AnimatePresence>
              <div className={s.ringsCol}>
                <span />
                <span />
                <span />
              </div>
            </div>

            {/* Rechte Seite: Inhalt */}
            <div className={s.rightWrap}>
              <AnimatePresence initial={false} custom={dir}>
                <motion.div
                  key={c.no}
                  id={`panel-${c.no}`}
                  role="tabpanel"
                  aria-labelledby={`tab-${c.no}`}
                  tabIndex={0}
                  className={`${s.rightPage} punched`}
                  custom={dir}
                  variants={reduce ? none : turn}
                  initial="enter"
                  animate="center"
                  exit="exit"
                >
                  <p className={s.panelKicker} style={{ color: c.color }}>
                    Register {c.no}
                  </p>
                  <h3 className={s.panelTitle}>{c.title}</h3>
                  <p className={s.panelText}>{c.description}</p>

                  <p className={s.contentsHead}>Inhalt dieses Kapitels</p>
                  <ol className={s.contents}>
                    {c.topics.map((t, i) => (
                      <li key={t}>
                        <span>
                          {Number(c.no)}.{i + 1}
                        </span>
                        {t}
                      </li>
                    ))}
                  </ol>

                  {chapterSheets.length > 0 && (
                    <>
                      <p className={s.contentsHead}>Vorschau ansehen</p>
                      <ul className={s.previews}>
                        {chapterSheets.map((sh) => (
                          <li key={sh.id}>
                            <button type="button" className={s.preview} onClick={() => openAt(sh.id)}>
                              <PaperSheet sheet={sh} compact punched={false} />
                              <span className={s.previewLabel}>
                                <EyeIcon /> {sh.title}
                              </span>
                            </button>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                  <span className={s.pageNo} aria-hidden>
                    {c.no}
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </Reveal>
        <p className={s.note}>
          Kapitelstruktur laut Produktdatei. Die Vorschaubilder sind nachgestaltete Beispiele und zeigen nicht jede Seite.
        </p>
      </div>
    </section>
  );
}

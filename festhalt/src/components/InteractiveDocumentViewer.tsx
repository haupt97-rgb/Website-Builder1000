"use client";

import { AnimatePresence, motion, type Variants } from "framer-motion";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { site } from "@/config/site";
import { chapters } from "@/content/chapters";
import { sheets } from "@/content/sheets";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import { EtsyLink } from "./EtsyLink";
import { ArrowLeft, ArrowRight, CloseIcon, ExpandIcon, InfoIcon, MinusIcon, PlusIcon } from "./Icons";
import { PaperSheet } from "./PaperSheet";
import { Reveal } from "./Reveal";
import { useViewer } from "./ViewerContext";
import s from "./InteractiveDocumentViewer.module.css";

const ZOOMS = [1, 1.25, 1.5, 1.75, 2];
const FLIP_MS = 560;

const flip: Variants = {
  enter: (dir: number) =>
    dir > 0
      ? { rotateY: 0, zIndex: 1, opacity: 1, boxShadow: "0 0 0 rgba(0,0,0,0)" }
      : { rotateY: -100, zIndex: 3, opacity: 1 },
  center: { rotateY: 0, zIndex: 2, opacity: 1, transition: { duration: FLIP_MS / 1000, ease: [0.3, 0.7, 0.2, 1] } },
  exit: (dir: number) =>
    dir > 0
      ? { rotateY: -100, zIndex: 3, opacity: 1, transition: { duration: FLIP_MS / 1000, ease: [0.45, 0.05, 0.4, 1] } }
      : { rotateY: 0, zIndex: 1, opacity: 1, transition: { duration: FLIP_MS / 1000 } },
};
const fade: Variants = {
  enter: { opacity: 0 },
  center: { opacity: 1, transition: { duration: 0 } },
  exit: { opacity: 0, transition: { duration: 0 } },
};

export function InteractiveDocumentViewer() {
  const { index, setIndex, expanded, setExpanded, viewerRef } = useViewer();
  const reduce = useReducedMotionSafe();
  const [dir, setDir] = useState(1);
  const [zoomIdx, setZoomIdx] = useState(0);
  const expandBtnRef = useRef<HTMLButtonElement>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const titleId = useId();

  const total = sheets.length;
  const sheet = sheets[index];
  const chapter = chapters.find((c) => c.no === sheet.chapter)!;
  const zoom = ZOOMS[zoomIdx];

  const go = useCallback(
    (to: number) => {
      const next = Math.max(0, Math.min(total - 1, to));
      if (next === index) return;
      setDir(next > index ? 1 : -1);
      setIndex(next);
    },
    [index, setIndex, total],
  );
  const prev = () => go(index - 1);
  const next = () => go(index + 1);

  const goChapter = (no: string) => {
    const i = sheets.findIndex((sh) => sh.chapter === no);
    if (i >= 0) go(i);
  };

  // Tastatur
  const onKeyDown = (e: React.KeyboardEvent) => {
    if ((e.target as HTMLElement).closest("input, textarea")) return;
    switch (e.key) {
      case "ArrowRight":
      case "PageDown":
        e.preventDefault();
        next();
        break;
      case "ArrowLeft":
      case "PageUp":
        e.preventDefault();
        prev();
        break;
      case "Home":
        e.preventDefault();
        go(0);
        break;
      case "End":
        e.preventDefault();
        go(total - 1);
        break;
      case "+":
      case "=":
        setZoomIdx((z) => Math.min(ZOOMS.length - 1, z + 1));
        break;
      case "-":
        setZoomIdx((z) => Math.max(0, z - 1));
        break;
      case "Escape":
        if (expanded) {
          e.preventDefault();
          closeExpanded();
        }
        break;
      case "Tab":
        if (expanded) trapFocus(e);
        break;
    }
  };

  const trapFocus = (e: React.KeyboardEvent) => {
    const root = viewerRef.current;
    if (!root) return;
    const f = Array.from(
      root.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'),
    ).filter((el) => el.offsetParent !== null);
    if (!f.length) return;
    const first = f[0];
    const last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  const closeExpanded = useCallback(() => {
    setExpanded(false);
    window.setTimeout(() => expandBtnRef.current?.focus(), 0);
  }, [setExpanded]);

  // Vollbild: Scroll sperren & Fokus setzen
  useEffect(() => {
    if (!expanded) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    viewerRef.current?.focus({ preventScroll: true });
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [expanded, viewerRef]);

  // Swipe (nur ohne Zoom)
  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touch.current = { x: t.clientX, y: t.clientY };
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const start = touch.current;
    touch.current = null;
    if (!start || zoom > 1) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - start.x;
    const dy = t.clientY - start.y;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.4) {
      if (dx < 0) next();
      else prev();
    }
  };

  const progress = ((index + 1) / total) * 100;

  return (
    <section id="einblick" className={s.section} aria-labelledby="viewer-title">
      <div className="container">
        <Reveal className={`section-head ${s.head}`}>
          <p className="eyebrow">
            <span className="reg">04</span> Blick hinein
          </p>
          <h2 id="viewer-title" className="h2">
            Blättere durch den Familienordner.
          </h2>
          <p className="lead">
            Wähle ein Register oder blättere Seite für Seite. So bekommst du ein Gefühl dafür, wie die{" "}
            {site.product.pages} Seiten aufgebaut sind.
          </p>
        </Reveal>
      </div>

      <div className={expanded ? s.backdrop : undefined} onClick={expanded ? closeExpanded : undefined} aria-hidden />

      <div className={`container ${s.outer}`}>
        <div
          ref={viewerRef}
          className={`${s.viewer} ${expanded ? s.expanded : ""}`}
          tabIndex={-1}
          onKeyDown={onKeyDown}
          role={expanded ? "dialog" : "region"}
          aria-modal={expanded || undefined}
          aria-labelledby={titleId}
          aria-roledescription="Dokument-Vorschau"
        >
          <p id={titleId} className="visually-hidden">
            Vorschau des Familienordners. Mit den Pfeiltasten blättern, mit Plus und Minus zoomen.
          </p>

          {/* Kopfzeile */}
          <div className={s.toolbarTop}>
            <div className={s.progressWrap}>
              <span className={s.counter}>
                Vorschaublatt <strong>{index + 1}</strong> von {total}
              </span>
              <div
                className={s.progress}
                role="progressbar"
                aria-label="Fortschritt in der Vorschau"
                aria-valuemin={1}
                aria-valuemax={total}
                aria-valuenow={index + 1}
              >
                <span style={{ width: `${progress}%` }} />
              </div>
            </div>
            <div className={s.tools}>
              <button
                type="button"
                className={s.iconBtn}
                onClick={() => setZoomIdx((z) => Math.max(0, z - 1))}
                disabled={zoomIdx === 0}
                aria-label="Verkleinern"
              >
                <MinusIcon />
              </button>
              <span className={s.zoomLabel} aria-live="polite">
                {Math.round(zoom * 100)} %
              </span>
              <button
                type="button"
                className={s.iconBtn}
                onClick={() => setZoomIdx((z) => Math.min(ZOOMS.length - 1, z + 1))}
                disabled={zoomIdx === ZOOMS.length - 1}
                aria-label="Vergrößern"
              >
                <PlusIcon />
              </button>
              {expanded ? (
                <button type="button" className={`${s.iconBtn} ${s.closeBtn}`} onClick={closeExpanded} aria-label="Vollbild schließen">
                  <CloseIcon />
                </button>
              ) : (
                <button
                  ref={expandBtnRef}
                  type="button"
                  className={s.iconBtn}
                  onClick={() => setExpanded(true)}
                  aria-label="Vollbildansicht öffnen"
                >
                  <ExpandIcon />
                </button>
              )}
            </div>
          </div>

          <div className={s.body}>
            {/* Ordner-Bühne */}
            <div className={s.binder}>
              <div className={s.rings} aria-hidden>
                <span />
                <span />
                <span />
              </div>

              <div
                className={`${s.scrollArea} ${zoom > 1 ? s.zoomed : ""}`}
                onTouchStart={onTouchStart}
                onTouchEnd={onTouchEnd}
              >
                <div className={s.stage} style={{ width: `${zoom * 100}%` }}>
                  <AnimatePresence initial={false} custom={dir}>
                    <motion.div
                      key={sheet.id}
                      className={s.page}
                      custom={dir}
                      variants={reduce ? fade : flip}
                      initial="enter"
                      animate="center"
                      exit="exit"
                    >
                      <PaperSheet sheet={sheet} />
                      <span className={s.pageShade} aria-hidden />
                    </motion.div>
                  </AnimatePresence>
                  {/* Papierstapel darunter */}
                  <span className={s.under} aria-hidden />
                  <span className={`${s.under} ${s.under2}`} aria-hidden />
                </div>
              </div>

              {/* Register */}
              <div className={s.tabs} role="group" aria-label="Kapitelregister">
                {chapters.map((c) => {
                  const active = c.no === chapter.no;
                  return (
                    <button
                      key={c.no}
                      type="button"
                      className={`${s.tab} ${active ? s.tabActive : ""}`}
                      style={{ "--c": c.color } as React.CSSProperties}
                      onClick={() => goChapter(c.no)}
                      aria-current={active ? "true" : undefined}
                      aria-label={`Kapitel ${c.no}: ${c.title}`}
                      title={c.title}
                    >
                      <span>{c.no}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Info-Panel */}
            <aside className={s.panel} aria-label="Informationen zum aktuellen Kapitel">
              <p className={s.panelKicker} style={{ color: chapter.color }}>
                Kapitel {chapter.no}
              </p>
              <h3 className={s.panelTitle}>{chapter.title}</h3>
              <p className={s.panelText}>{chapter.description}</p>
              <ul className={s.topics}>
                {chapter.topics.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>

              <div className={s.nav}>
                <button type="button" className="btn btn-secondary" onClick={prev} disabled={index === 0} aria-label="Vorheriges Blatt">
                  <ArrowLeft />
                  <span className={s.navLabel}>Zurück</span>
                </button>
                <button type="button" className="btn btn-secondary" onClick={next} disabled={index === total - 1} aria-label="Nächstes Blatt">
                  <span className={s.navLabel}>Weiter</span>
                  <ArrowRight />
                </button>
              </div>

              <div className={s.panelCta}>
                <EtsyLink placement="viewer">Auf Etsy ansehen</EtsyLink>
                <a href="#produkt" className={s.textLink} onClick={() => expanded && setExpanded(false)}>
                  Zur Produktbeschreibung
                </a>
              </div>

              <p className={s.disclaimer}>
                <InfoIcon />
                <span>
                  Vorschau: nachgestaltete Beispielseiten im Stil des Ordners – eine Auswahl, nicht alle{" "}
                  {site.product.pages} Seiten. Details der Originaldatei können abweichen.
                </span>
              </p>
            </aside>
          </div>

          {/* Seitenleiste mit allen Vorschaublättern */}
          <div className={s.strip} role="group" aria-label="Alle Vorschaublätter">
            {sheets.map((sh, i) => {
              const c = chapters.find((ch) => ch.no === sh.chapter)!;
              return (
                <button
                  key={sh.id}
                  type="button"
                  className={`${s.thumb} ${i === index ? s.thumbActive : ""}`}
                  style={{ "--c": c.color } as React.CSSProperties}
                  onClick={() => go(i)}
                  aria-current={i === index ? "true" : undefined}
                  aria-label={`Blatt ${i + 1}: ${sh.title}`}
                >
                  <span className={s.thumbBar} />
                  <span className={s.thumbTitle}>{sh.title}</span>
                  <span className={s.thumbLines} />
                </button>
              );
            })}
          </div>

          <p className="visually-hidden" aria-live="polite" aria-atomic="true">
            Blatt {index + 1} von {total}: {sheet.title}, Kapitel {chapter.no} {chapter.title}
          </p>
          <p className={s.hint} aria-hidden>
            Tipp: Mit ← → blättern · auf dem Smartphone wischen
          </p>
        </div>
      </div>
    </section>
  );
}

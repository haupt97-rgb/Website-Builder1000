"use client";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import { useRef } from "react";
import { chapters } from "@/content/chapters";
import { CheckIcon, FolderIcon, Stroke } from "./Icons";
import { Reveal } from "./Reveal";
import s from "./ProblemSolution.module.css";

type Scrap = {
  text: string;
  kind: "note" | "paper" | "card" | "receipt";
  from: [number, number, number]; // left %, top %, rotation
  to: [number, number]; // Endposition (left %, top %) im Ordner
};

const scraps: Scrap[] = [
  { text: "Tel. Hausarzt?", kind: "note", from: [4, 8, -9], to: [30, 40] },
  { text: "Versicherungs­nummer …", kind: "paper", from: [62, 4, 7], to: [33, 37] },
  { text: "Wo liegt die Vollmacht?", kind: "note", from: [74, 46, 11], to: [36, 34] },
  { text: "Kontoübersicht", kind: "paper", from: [10, 56, 6], to: [39, 31] },
  { text: "Zugang E-Mail", kind: "card", from: [40, 64, -5], to: [42, 28] },
  { text: "Kündigungsfrist Abo", kind: "receipt", from: [34, 16, -3], to: [45, 25] },
];

const labels = ["Verstreut", "Gesammelt", "Geordnet"];

export function ProblemSolution() {
  const reduce = useReducedMotionSafe();
  return (
    <section className={s.section} aria-labelledby="problem-title">
      <div className="container">
        <Reveal className="section-head center">
          <p className="eyebrow">
            <span className="reg">02</span> Das Problem
          </p>
          <h2 id="problem-title" className="h2">
            Wichtige Informationen gehören an einen Ort.
          </h2>
          <Stroke />
          <p className="lead">
            Telefonnummern, Vertragsdaten, Zugangsdaten und persönliche Wünsche liegen oft verteilt – in Schubladen, auf
            Zetteln, im Kopf. Passiert etwas Unvorhergesehenes, fehlt genau dann der Überblick.
          </p>
        </Reveal>
      </div>

      {reduce ? <StaticStory /> : <ScrollStory />}

      <div className="container">
        <SolutionList />
      </div>
    </section>
  );
}

function ScrollStory() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const folderOpacity = useTransform(scrollYProgress, [0.15, 0.4], [0, 1]);
  const folderY = useTransform(scrollYProgress, [0.15, 0.4], [40, 0]);
  const tabsOpacity = useTransform(scrollYProgress, [0.72, 0.88], [0, 1]);
  const doneOpacity = useTransform(scrollYProgress, [0.82, 0.95], [0, 1]);

  return (
    <div ref={ref} className={s.scroller}>
      <div className={s.sticky}>
        <div className={`container ${s.stageWrap}`}>
          <Steps progress={scrollYProgress} />
          <div className={s.stage} aria-hidden>
            {/* Ordner (Rückwand) */}
            <motion.div className={s.folderBack} style={{ opacity: folderOpacity, y: folderY }} />
            {scraps.map((sc, i) => (
              <ScrapItem key={sc.text} scrap={sc} i={i} progress={scrollYProgress} />
            ))}
            {/* Ordner (Vorderseite mit Registern) */}
            <motion.div className={s.folderFront} style={{ opacity: folderOpacity, y: folderY }}>
              <motion.div className={s.tabs} style={{ opacity: tabsOpacity }}>
                {chapters.map((c) => (
                  <span key={c.no} style={{ background: c.color }}>
                    {c.no}
                  </span>
                ))}
              </motion.div>
              <FolderIcon className={s.frontIcon} />
              <span className={s.frontBrand}>festhalt</span>
              <motion.span className={s.frontDone} style={{ opacity: doneOpacity }}>
                <CheckIcon /> Alles an einem Ort
              </motion.span>
            </motion.div>
          </div>
        </div>
      </div>
      <p className="visually-hidden">
        Illustration: Verstreute Notizzettel und Unterlagen werden Schritt für Schritt gesammelt und in einem Ordner mit
        acht Registern geordnet.
      </p>
    </div>
  );
}

function ScrapItem({ scrap, i, progress }: { scrap: Scrap; i: number; progress: MotionValue<number> }) {
  const start = 0.32 + i * 0.05;
  const end = start + 0.28;
  const left = useTransform(progress, [start, end], [`${scrap.from[0]}%`, `${scrap.to[0]}%`]);
  const top = useTransform(progress, [start, end], [`${scrap.from[1]}%`, `${scrap.to[1]}%`]);
  const rotate = useTransform(progress, [0, start, end], [scrap.from[2] * 1.4, scrap.from[2], 0]);
  const scale = useTransform(progress, [start, end], [1, 0.88]);
  const float = useTransform(progress, [0, 0.3], [0, -10 - i * 3]);

  return (
    <motion.div className={`${s.scrap} ${s[scrap.kind]}`} style={{ left, top, rotate, scale, y: float, zIndex: 2 + i }}>
      {scrap.text}
    </motion.div>
  );
}

function Steps({ progress }: { progress: MotionValue<number> }) {
  const ranges: [number, number, number, number][] = [
    [0, 0.02, 0.28, 0.36],
    [0.3, 0.38, 0.62, 0.7],
    [0.66, 0.74, 0.99, 1],
  ];
  return (
    <ol className={s.steps} aria-hidden>
      {labels.map((l, i) => (
        <Step key={l} label={l} n={i + 1} progress={progress} range={ranges[i]} />
      ))}
    </ol>
  );
}

function Step({ label, n, progress, range }: { label: string; n: number; progress: MotionValue<number>; range: [number, number, number, number] }) {
  const opacity = useTransform(progress, range, n === 1 ? [1, 1, 1, 0.35] : [0.35, 1, 1, 0.35]);
  const x = useTransform(progress, range, n === 1 ? [6, 6, 6, 0] : [0, 6, 6, 0]);
  return (
    <motion.li style={{ opacity, x }}>
      <span className={s.stepNo}>{String(n).padStart(2, "0")}</span>
      {label}
    </motion.li>
  );
}

/** Reduzierte Bewegung: Vorher/Nachher als statische Gegenüberstellung */
function StaticStory() {
  return (
    <div className="container">
      <div className={s.staticGrid}>
        <figure className={s.staticCard}>
          <div className={s.staticStage} aria-hidden>
            {scraps.map((sc, i) => (
              <div
                key={sc.text}
                className={`${s.scrap} ${s[sc.kind]}`}
                style={{ left: `${sc.from[0]}%`, top: `${sc.from[1]}%`, transform: `rotate(${sc.from[2]}deg)`, zIndex: i }}
              >
                {sc.text}
              </div>
            ))}
          </div>
          <figcaption>Vorher: Informationen verstreut</figcaption>
        </figure>
        <figure className={s.staticCard}>
          <div className={s.staticStage} aria-hidden>
            <div className={s.folderFront} style={{ position: "absolute" }}>
              <div className={s.tabs}>
                {chapters.map((c) => (
                  <span key={c.no} style={{ background: c.color }}>
                    {c.no}
                  </span>
                ))}
              </div>
              <FolderIcon className={s.frontIcon} />
              <span className={s.frontBrand}>festhalt</span>
            </div>
          </div>
          <figcaption>Nachher: geordnet in acht Kapiteln</figcaption>
        </figure>
      </div>
    </div>
  );
}

const solutions = [
  "Wichtige Informationen strukturiert festhalten",
  "Relevante Unterlagen und Kontakte übersichtlich sammeln",
  "Persönliche Angaben in Ruhe ergänzen",
  "Bei Bedarf einzelne Seiten ausdrucken",
  "Die eigene Vorsorge bewusster organisieren",
  "Angehörigen das Auffinden wichtiger Informationen erleichtern",
];

function SolutionList() {
  return (
    <div className={s.solution}>
      <Reveal className={s.solutionText}>
        <p className="eyebrow">
          <span className="reg">03</span> Die Lösung
        </p>
        <h3 className="h2">Ein Ordner, der Ordnung schafft.</h3>
        <p className="lead">
          Festhalt – Der Familienordner gibt deinen Informationen eine feste Struktur: {chapters.length} Kapitel, klare
          Checklisten und Seiten zum Ausfüllen. Kein Ersatz für Beratung, aber eine praktische Grundlage, um Wichtiges
          geordnet bereitzuhalten.
        </p>
      </Reveal>
      <Reveal className={`paper punched grain ${s.checkSheet}`} delay={120}>
        <p className={s.checkHead}>Was der Ordner dir erleichtert</p>
        <ul>
          {solutions.map((t, i) => (
            <li key={t} style={{ "--i": i } as React.CSSProperties}>
              <span className={s.tick} aria-hidden>
                <CheckIcon />
              </span>
              {t}
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
  );
}

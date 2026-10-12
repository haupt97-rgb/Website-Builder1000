"use client";

import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";
import { sheetIndexById } from "@/content/sheets";

type ViewerCtx = {
  index: number;
  setIndex: (i: number | ((prev: number) => number)) => void;
  /** Springt zum Viewer (optional auf ein bestimmtes Blatt) und fokussiert ihn. */
  openAt: (sheetId?: string, opts?: { expand?: boolean }) => void;
  expanded: boolean;
  setExpanded: (v: boolean) => void;
  viewerRef: React.RefObject<HTMLDivElement | null>;
};

const Ctx = createContext<ViewerCtx | null>(null);

export function ViewerProvider({ children }: { children: React.ReactNode }) {
  const [index, setIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const viewerRef = useRef<HTMLDivElement | null>(null);

  const openAt = useCallback((sheetId?: string, opts?: { expand?: boolean }) => {
    if (sheetId) {
      const i = sheetIndexById(sheetId);
      if (i >= 0) setIndex(i);
    }
    if (opts?.expand) {
      setExpanded(true);
      return;
    }
    const section = document.getElementById("einblick");
    if (section) {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      section.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
      history.replaceState(null, "", "#einblick");
    }
    // Fokus nach dem Scrollen setzen, damit Tastaturnutzer direkt blättern können
    window.setTimeout(() => viewerRef.current?.focus({ preventScroll: true }), 450);
  }, []);

  const value = useMemo(
    () => ({ index, setIndex, openAt, expanded, setExpanded, viewerRef }),
    [index, openAt, expanded],
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useViewer() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useViewer must be used inside <ViewerProvider>");
  return v;
}

"use client";

import { useEffect, useState } from "react";

/**
 * Wie `prefers-reduced-motion`, aber hydration-sicher:
 * Beim ersten Render (Server + Client) immer `false`, danach der echte Wert.
 * Reine CSS-Animationen werden zusätzlich per Media Query abgeschaltet.
 */
export function useReducedMotionSafe() {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduce(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return reduce;
}

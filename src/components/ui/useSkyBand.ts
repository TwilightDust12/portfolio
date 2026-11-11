"use client";

import { useSyncExternalStore } from "react";
import { SKY_BANDS, type SkyBand } from "@/lib/sky";

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-sky"] });
  return () => observer.disconnect();
}

const snapshot = () => (document.documentElement.dataset.sky as SkyBand | undefined) ?? null;

/** The current Lucena City sky band, read from <html data-sky>. Null on the server and without JS. */
export function useSkyBand(): SkyBand | null {
  return useSyncExternalStore(subscribe, snapshot, () => null);
}

export const skyLabel = (band: SkyBand) => SKY_BANDS.find((b) => b.id === band)!.label;

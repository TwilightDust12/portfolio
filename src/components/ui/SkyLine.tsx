"use client";

import { skyLabel, useSkyBand } from "./useSkyBand";

export function SkyLine() {
  const band = useSkyBand();
  if (!band) return null;
  return <p className="sky-line">{skyLabel(band)}</p>;
}

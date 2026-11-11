"use client";

import { useEffect, useState } from "react";
import { skyBandAt } from "@/lib/sky";

export function ManilaClock() {
  const [time, setTime] = useState("--:--:--");

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Manila",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    const root = document.documentElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let timeout: ReturnType<typeof setTimeout> | undefined;
    const tick = () => {
      const now = new Date();
      setTime(fmt.format(now));
      const band = skyBandAt(now);
      if (root.dataset.sky !== band) {
        if (!reduced.matches) {
          root.setAttribute("data-sky-transition", "");
          clearTimeout(timeout);
          timeout = setTimeout(() => root.removeAttribute("data-sky-transition"), 2100);
        }
        root.dataset.sky = band;
      }
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => {
      clearInterval(id);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <time
      suppressHydrationWarning
      className="font-mono text-xs text-muted whitespace-nowrap tabular-nums"
    >
      <span className="sky-dot" aria-hidden="true" />
      {time} PHT
    </time>
  );
}

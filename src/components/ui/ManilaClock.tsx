"use client";

import { useEffect, useState } from "react";

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
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <time
      suppressHydrationWarning
      className="font-mono text-xs text-muted whitespace-nowrap tabular-nums"
    >
      {time} PHT
    </time>
  );
}

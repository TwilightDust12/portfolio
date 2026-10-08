"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  useEffect(() => setMounted(true), []);
  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      disabled={!mounted}
      className="theme-toggle btn-press"
      aria-label={mounted ? `Switch to ${isDark ? "Latte light" : "Mocha dark"} theme` : "Change theme"}
      title={mounted ? `Catppuccin ${isDark ? "Mocha" : "Latte"}` : undefined}
    >
      {mounted && (isDark ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />)}
    </button>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  useEffect(() => setMounted(true), []);
  const isDark = resolvedTheme === "dark";

  if (!mounted) return <span className="theme-toggle" aria-hidden="true" />;

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="theme-toggle btn-press"
      aria-label={`Switch to ${isDark ? "Latte light" : "Mocha dark"} theme`}
      title={`Catppuccin ${isDark ? "Mocha" : "Latte"}`}
    >
      {isDark ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
    </button>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        type="button"
        aria-label="Toggle Catppuccin theme (Latte / Mocha)"
        className="w-9 h-9 sm:w-8 sm:h-8 rounded-md bg-ink/5 border border-ink/10 flex items-center justify-center opacity-0 pointer-events-none"
      >
        <span className="w-4 h-4" />
      </button>
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="btn-press relative after:absolute after:-inset-1.5 w-9 h-9 sm:w-8 sm:h-8 rounded-md bg-ink/5 hover:bg-ink/10 border border-ink/10 flex items-center justify-center text-ink/80 hover:text-accent-text transition-[background-color,border-color,color,transform] duration-150 touch-manipulation"
      aria-label="Toggle Catppuccin theme (Latte / Mocha)"
      title={`Switch to ${isDark ? "Latte (Light)" : "Mocha (Dark)"} mode`}
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-amber-300 transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] rotate-0 hover:rotate-45" />
      ) : (
        <Moon className="w-4 h-4 text-accent-text transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] -rotate-12 hover:rotate-0" />
      )}
    </button>
  );
}

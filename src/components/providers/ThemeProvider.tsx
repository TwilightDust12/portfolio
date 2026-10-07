"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Toaster } from "sonner";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="dark" enableSystem>
      {children}
      <Toaster
        position="bottom-right"
        toastOptions={{
          className:
            "font-mono text-xs border border-ink/15 bg-bg/95 text-ink shadow-xl backdrop-blur-md rounded-xl p-3.5",
        }}
      />
    </NextThemesProvider>
  );
}

export default ThemeProvider;

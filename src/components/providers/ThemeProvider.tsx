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
          className: "font-sans text-sm",
          style: {
            background: "var(--surface-raised)",
            color: "var(--ink)",
            borderColor: "var(--line)",
          },
        }}
      />
    </NextThemesProvider>
  );
}

export default ThemeProvider;

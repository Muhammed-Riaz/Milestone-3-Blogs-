"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

function PreloadThemeScript() {
  const scriptContent = `
    (function() {
      const theme = localStorage.getItem('theme') || 'system';
      const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const appliedTheme = theme === 'system' ? (systemDark ? 'dark' : 'light') : theme;
      document.documentElement.className = appliedTheme;
    })();
  `;

  return <script dangerouslySetInnerHTML={{ __html: scriptContent }} />;
}

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <>
      <PreloadThemeScript />
      <NextThemesProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
        {...props}
      >
        {children}
      </NextThemesProvider>
    </>
  );
}

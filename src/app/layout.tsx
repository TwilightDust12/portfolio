import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Plus_Jakarta_Sans, Noto_Sans_JP } from "next/font/google";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { skyCss, skyScript } from "@/lib/sky";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-jp",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://twilightdust.me"),
  alternates: { canonical: "/" },
  title: "Jose Raphael Jaro (Twilight) | Aspiring Full-Stack Developer",
  description:
    "Jose Raphael Jaro (Twilight), a full-stack developer and Computer Science student in Lucena City, Philippines. Seeking internships; junior roles also welcome.",
  openGraph: {
    title: "Jose Raphael Jaro (Twilight) | Aspiring Full-Stack Developer",
    description:
      "Campus workflows, client websites, and creative experiments. Seeking full-stack internships; junior roles also welcome.",
    url: "/",
    siteName: "Jose Raphael Jaro Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jose Raphael Jaro (Twilight) | Full-Stack Developer",
    description: "Campus workflows, client websites, and creative experiments. Seeking full-stack internships; junior roles also welcome.",
    images: ["/opengraph-image"],
  },
};

export const viewport: Viewport = {
  themeColor: "#11111b",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${jetbrainsMono.variable} ${plusJakarta.variable} ${notoSansJP.variable}`}
    >
      <head>
        <style dangerouslySetInnerHTML={{ __html: skyCss() }} />
        <script dangerouslySetInnerHTML={{ __html: skyScript() }} />
      </head>
      <body className="antialiased relative min-h-screen">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 px-4 py-2 bg-[#8839ef] text-white rounded-lg shadow-lg font-mono text-xs"
        >
          Skip to main content
        </a>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}

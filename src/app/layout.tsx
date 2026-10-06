import type { Metadata, Viewport } from "next";
import { Newsreader, Space_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  style: ["normal", "italic"],
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Twilight — Software Engineer & Systems Tinkerer",
  description: "Personal portfolio, Linux environment rices, low-latency audio tooling, and responsive web systems.",
  authors: [{ name: "Twilight", url: "https://github.com/TwilightDust12" }],
  keywords: ["Software Engineer", "Systems", "Linux", "Hyprland", "osu!", "TypeScript", "Next.js", "Web Development"],
  openGraph: {
    title: "Twilight — Software Engineer & Systems Tinkerer",
    description: "Curated archive of web architectures, Linux suites, and low-latency systems.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#09090b",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${newsreader.variable} ${spaceMono.variable} ${plusJakarta.variable}`}>
      <body className="bg-studio-950 text-ivory-100 antialiased relative min-h-screen">
        <div className="film-grain" aria-hidden="true" />
        <div className="lens-vignette" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}

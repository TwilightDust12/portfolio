import type { Metadata, Viewport } from "next";
import { Silkscreen, Space_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const silkscreen = Silkscreen({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-pixel",
  display: "swap",
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
  title: "Twilight — Building. Learning. Shipping.",
  description: "Personal portfolio, Linux desktop suites, low-latency audio tooling, and responsive web systems.",
  authors: [{ name: "Twilight", url: "https://github.com/TwilightDust12" }],
  keywords: ["Software Engineer", "Systems", "Linux", "Hyprland", "osu!", "TypeScript", "Next.js", "DevOps"],
  openGraph: {
    title: "Twilight — Software Engineer & Systems Tinkerer",
    description: "Building. Learning. Shipping. Personal portfolio & systems showcase.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#08080a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${silkscreen.variable} ${spaceMono.variable} ${plusJakarta.variable}`}>
      <body className="bg-[#08080a] text-zinc-100 antialiased relative min-h-screen selection:bg-zinc-800 selection:text-white">
        {children}
      </body>
    </html>
  );
}

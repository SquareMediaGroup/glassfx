import type { Metadata } from "next";
import { Instrument_Serif, Hanken_Grotesk, IBM_Plex_Mono } from "next/font/google";
import { GlassFilter } from "glassfx/react";
import "./globals.css";

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "GlassFX — real glass for the web",
  description:
    "Real-refraction glassmorphism for any element. Backdrop lensing, chromatic dispersion, depth and a cursor-tracking bloom — in one class. MIT, ~1KB, drop-in.",
  openGraph: {
    title: "GlassFX — real glass for the web",
    description:
      "Refraction, chromatic dispersion, depth and bloom in one class. MIT, ~1KB.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${instrument.variable} ${hanken.variable} ${plexMono.variable}`}
      >
        {/* Injects the shared #glassfx-refract filter + starts the cursor bloom. */}
        <GlassFilter />
        {children}
      </body>
    </html>
  );
}

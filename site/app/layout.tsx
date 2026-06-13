import type { Metadata } from "next";
import { Inter, IBM_Plex_Mono } from "next/font/google";
import { GlassFilter } from "glassfx/react";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
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
        className={`${inter.variable} ${plexMono.variable}`}
      >
        {/* Injects the shared #glassfx-refract filter + starts the cursor bloom. */}
        <GlassFilter />
        {children}
      </body>
    </html>
  );
}

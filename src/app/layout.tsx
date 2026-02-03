/**
 * File: src/app/layout.tsx
 * Purpose: Root layout for the Next.js application. Wraps pages with
 *   site-wide UI (Navbar, Footer) and injects global fonts and styles.
 * Component type: Server component (async) — performs server-side data fetching
 *   using the TinaCMS generated `client` (no `use client` directive).
 * Key dependencies:
 *   - `next` (`Metadata` type, app router layout)
 *   - `next/font/google` (Geist, Geist_Mono fonts)
 *   - `tina/__generated__/client` (CMS queries: navbar, footer, global, person)
 *   - `@/components/Navbar`, `@/components/Footer` (page chrome)
 *   - `./globals.css` (global styles)
 * Notes:
 *   - This is intentionally a server component so data is loaded server-side.
 *   - If converting to a client component, move data fetching to a parent
 *     server route or use client-side fetching and add `"use client"`.
 */
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import client from "@/../tina/__generated__/client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bilal Portfolio",
  description: "Personal portfolio of Bilal as PPC Manager",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // TinaCMS (server) queries
  const navbarResponse = await client.queries.navbar({
    relativePath: "index.json",
  });
  const footerResponse = await client.queries.footer({
    relativePath: "index.json",
  });
  const globalResponse = await client.queries.global({
    relativePath: "index.json",
  });
  const personResponse = await client.queries.person({
    relativePath: "bilal-hassan.json",
  });

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Navbar */}
        <Navbar
          globalResponse={globalResponse}
          navbarResponse={navbarResponse}
          socials={personResponse.data.person.socials}
        />
        {children}
        {/* Footer */}
        <Footer
          footerResponse={footerResponse}
          personResponse={personResponse}
          globalResponse={globalResponse}
        />
      </body>
    </html>
  );
}

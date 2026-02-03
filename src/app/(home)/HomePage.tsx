"use client";
/**
 * File: src/app/(home)/HomePage.tsx
 * Purpose: Homepage container — wires TinaCMS responses into presentational
 *  sections (Hero, Audit, About) and initializes client-only effects.
 * Component: Client component (uses `useEffect` and dynamic imports).
 * Client-safe: Yes
 * Presentational: No — acts as page/container.
 * Key dependencies:
 *  - `tinacms/react` : `useTina` hooks for live-edit data
 *  - `locomotive-scroll` : client-only smooth scroll (dynamically imported)
 *  - `@/../tina/__generated__/client` : generated client types for queries
 *  - Section components: `HeroSection`, `AuditSection`, `AboutSection`
 */
import { useEffect } from "react";

import { useTina } from "tinacms/react";

import type client from "@/../tina/__generated__/client";
import Container from "@/components/Container";

import AboutSection from "./_sections/AboutSection";
import AuditSection from "./_sections/AuditSection";
import HeroSection from "./_sections/HeroSection";

type PersonResponse = Awaited<ReturnType<typeof client.queries.person>>;
type HomepageResponse = Awaited<ReturnType<typeof client.queries.homepage>>;

interface HomePageProps {
  personResponse: PersonResponse;
  homepageResponse: HomepageResponse;
}

const HomePage = ({ personResponse, homepageResponse }: HomePageProps) => {
  const {
    data: { homepage },
  } = useTina({ ...homepageResponse });
  const {
    data: { person },
  } = useTina({ ...personResponse });

  // Wire TinaCMS preview/live-edit data into local `homepage` and `person`
  // `useTina` forwards the server-provided response and enables Tina's UI.

  // Initialize client-only smooth scroll library dynamically to avoid
  // loading it on the server bundle; run once on mount.
  useEffect(() => {
    (async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;

      new LocomotiveScroll();
    })();
  }, []);

  return (
    <Container className="flex flex-col gap-44 px-8">
      {/* Sections receive parsed TinaCMS content objects */}
      <HeroSection content={homepage.heroSection} />
      <AuditSection content={homepage.auditSection} />
      <AboutSection content={homepage.aboutSection} person={person} />
    </Container>
  );
};

export default HomePage;

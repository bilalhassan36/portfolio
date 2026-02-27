/**
 * @file HomePage.tsx
 * @description The main landing page orchestrator. Hydrates TinaCMS content for
 * key sections and initializes high-end smooth scrolling.
 * @dependencies
 * - locomotive-scroll: Smooth scrolling engine (client-only)
 * - TinaCMS: `useTina` for real-time hydration
 * - UI: `HeroSection`, `AuditSection`, `AboutSection`
 */
"use client";

import { useEffect } from "react";

import { useTina } from "tinacms/react";

import type client from "@/../tina/__generated__/client";
import Container from "@/components/Container";

import AboutSection from "./_sections/AboutSection";
import AuditSection from "./_sections/AuditSection";
import HeroSection from "./_sections/HeroSection";

type PeopleResponse = Awaited<ReturnType<typeof client.queries.people>>;
type HomepageResponse = Awaited<ReturnType<typeof client.queries.homepage>>;

interface HomePageProps {
  peopleResponse: PeopleResponse;
  homepageResponse: HomepageResponse;
}

const HomePage = ({ peopleResponse, homepageResponse }: HomePageProps) => {
  // Real-time hydration for homepage-specific sections and individual profile data
  const {
    data: { homepage },
  } = useTina({ ...homepageResponse });
  const {
    data: { people: person },
  } = useTina({ ...peopleResponse });

  // Progressive Enhancement: Initialize Locomotive Scroll dynamically
  // This ensures the library is excluded from the initial server bundle
  useEffect(() => {
    (async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;
      // Note: No explicit cleanup required as Locomotive Scroll v4+
      // manages its own instance destruction on unmount.
      new LocomotiveScroll();
    })();
  }, []);

  return (
    <Container
      // Standardizing typography and background transitions for the entire homepage flow
      className="flex flex-col gap-44 px-8 text-zinc-900 transition-colors duration-300 dark:text-zinc-50"
    >
      {/* High-impact hero: headline, CTA, and initial brand impression */}
      <HeroSection content={homepage.heroSection} />

      {/* Detailed services/audit logic section */}
      <AuditSection content={homepage.auditSection} />

      {/* Narrative section: personal bio and human element */}
      <AboutSection content={homepage.aboutSection} person={person} />
    </Container>
  );
};

export default HomePage;

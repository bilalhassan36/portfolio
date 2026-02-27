/**
 * @file PortfolioPage.tsx
 * @description Client-side layout for the Portfolio experience.
 * Orchestrates the hydration of TinaCMS data for the page-specific content
 * and global assets like client brands and the masonry gallery.
 * @dependencies
 * - TinaCMS: `useTina` for live-editing hydration
 * - UI: `Container`, `PageHero`, `LogoMarquee`, `MasonryGallery`, `Callout`
 */
"use client";

import { useTina } from "tinacms/react";

import type client from "@/../tina/__generated__/client";
import Callout from "@/components/Callout";
import Container from "@/components/Container";
import PageHero from "@/components/PageHero";
import { RevealWrapper } from "@/components/RevealWrapper";

import LogoMarquee from "./LogoMarque";
import MasonryGallery from "./MasonryGallery";

type PageResponse = Awaited<ReturnType<typeof client.queries.pages>>;
type GlobalResponse = Awaited<ReturnType<typeof client.queries.global>>;

interface PortfolioPageProps {
  portfolioResponse: PageResponse;
  globalResponse: GlobalResponse;
}

const PortfolioPage = ({
  portfolioResponse,
  globalResponse,
}: PortfolioPageProps) => {
  const { data: portfolioPageData } = useTina({
    ...portfolioResponse,
  });

  const { data: globalData } = useTina({
    ...globalResponse,
  });

  return (
    <Container
      // Applying cascading text and transition tokens for a seamless dark mode experience
      className="flex min-h-screen flex-col items-center gap-6 py-32 text-zinc-900 transition-colors duration-300 dark:text-zinc-50"
    >
      <PageHero data={portfolioPageData.pages} />

      {/* Renders client proof logos from global configuration */}
      <LogoMarquee brands={globalData.global.clientBrands} />

      <RevealWrapper>
        {/* Main visual showcase: Dashboard/UI screenshots */}
        <MasonryGallery images={globalData.global.gallery} />
      </RevealWrapper>

      {/* Page-level Call to Action */}
      <Callout data={portfolioPageData.pages.callout} className="w-full" />
    </Container>
  );
};

export default PortfolioPage;

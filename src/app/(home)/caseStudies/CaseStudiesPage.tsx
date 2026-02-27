/**
 * @file CaseStudiesPage.tsx
 * @description Client-side layout component for the main case studies index page.
 * Hydrates TinaCMS data and orchestrates the PageHero, company stats, Browser (filtering/grid), and Callout sections.
 * @dependencies
 * - TinaCMS: `useTina` for live-editing hydration
 * - UI: `Callout`, `Container`, `PageHero`, `RevealWrapper`, `Browser`
 */
"use client";

import { useTina } from "tinacms/dist/react";

import type client from "@/../tina/__generated__/client";
import Callout from "@/components/Callout";
import Container from "@/components/Container";
import PageHero from "@/components/PageHero";
import { RevealWrapper } from "@/components/RevealWrapper";

import Browser from "./Browser";

type PageResponse = Awaited<ReturnType<typeof client.queries.pages>>;
type GlobalResponse = Awaited<ReturnType<typeof client.queries.global>>;

interface ContentProps {
  pageResponse: PageResponse;
  globalResponse: GlobalResponse;
}

export default function CaseStudiesPage({
  pageResponse,
  globalResponse,
}: ContentProps) {
  const { data: pageData } = useTina({
    ...pageResponse,
  });

  const {
    data: {
      global: { companyStats, caseStudyConfig },
    },
  } = useTina({
    ...globalResponse,
  });

  return (
    <Container
      // Applying cascading text colors here to cleanly propagate down to children (PageHero, Callout)
      className="flex min-h-screen flex-col gap-16 py-32 text-zinc-900 transition-colors duration-300 dark:text-zinc-50"
    >
      <div>
        <PageHero data={pageData.pages} />

        {companyStats && companyStats.length > 0 && (
          <RevealWrapper>
            <div className="mx-auto grid w-full max-w-3xl grid-cols-3 gap-4 md:gap-16">
              {companyStats.map((stat, i) => (
                <div
                  className="reveal-item flex flex-col gap-1 text-center md:gap-2"
                  key={i}
                >
                  <span className="text-foreground text-2xl font-bold tabular-nums transition-colors duration-300 sm:text-3xl md:text-4xl dark:text-zinc-50">
                    {stat?.value}
                  </span>
                  <span className="text-clay text-[10px] font-bold tracking-widest uppercase transition-colors duration-300 md:text-xs dark:text-zinc-400">
                    {stat?.label}
                  </span>
                </div>
              ))}
            </div>
          </RevealWrapper>
        )}
      </div>

      {caseStudyConfig && (
        <RevealWrapper>
          <Browser caseStudyConfig={caseStudyConfig} />
        </RevealWrapper>
      )}

      <Callout data={pageData.pages.callout} />
    </Container>
  );
}

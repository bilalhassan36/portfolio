/**
 * File: src/app/(home)/caseStudies/CaseStudiesPage.tsx
 * Purpose: Client-side page component for rendering case studies with CMS hydration.
 * Component: Client
 * Client-safe: Yes — uses `useTina` to hydrate server-provided data for preview.
 * Presentational: Yes (composes PageHero, Browser, and CTA)
 * Key dependencies: `tinacms` (`useTina`), `Container`, `PageHero`
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
    <Container className="flex min-h-screen flex-col gap-16 py-32">
      <div>
        <PageHero data={pageData.pages} />
        {/* Company stats grid (if provided by global data) */}
        {companyStats && companyStats.length > 0 && (
          <RevealWrapper>
            <div className="mx-auto grid w-full max-w-3xl grid-cols-3 gap-4 md:gap-16">
              {companyStats.map((stat, i) => (
                <div
                  className="reveal-item flex flex-col gap-1 text-center md:gap-2"
                  key={i}
                >
                  <span className="text-main text-2xl font-bold tabular-nums sm:text-3xl md:text-4xl">
                    {stat?.value}
                  </span>
                  <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase md:text-xs">
                    {stat?.label}
                  </span>
                </div>
              ))}
            </div>
          </RevealWrapper>
        )}
      </div>

      {/* Browser: interactive case study explorer using global config */}
      {caseStudyConfig && (
        <RevealWrapper>
          <Browser caseStudyConfig={caseStudyConfig} />
        </RevealWrapper>
      )}

      {/* CTA: page call-to-action */}
      <Callout data={pageData.pages.callout} />
    </Container>
  );
}

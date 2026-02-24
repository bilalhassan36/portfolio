/**
 * File: src/app/(home)/caseStudies/[id]/CaseStudyDetailsPage.tsx
 * Purpose: Client page that hydrates a single case study from Tina and composes the Hero, Content and Sidebar.
 * Component: Client
 * Client-safe: Yes — uses `useTina` to hydrate server-provided data for inline editing/preview.
 * Presentational: Yes
 * Key dependencies: `tinacms` (`useTina`), `Container`, `Hero`, `Content`, `Sidebar`
 */
"use client";

import { useTina } from "tinacms/dist/react";

import type client from "@/../tina/__generated__/client";
import Container from "@/components/Container";
import { RevealWrapper } from "@/components/RevealWrapper";

import { Content } from "./Content";
import { Hero } from "./Hero";
import { Sidebar } from "./Sidebar";

type CaseStudyResponse = Awaited<ReturnType<typeof client.queries.caseStudy>>;

interface ClientPageProps {
  caseStudyResponse: CaseStudyResponse;
}

export default function CaseStudyDetails({
  caseStudyResponse,
}: ClientPageProps) {
  // Hydrate Tina preview data on the client so editors see live content
  const { data } = useTina({
    ...caseStudyResponse,
  });

  const study = data.caseStudy;

  // Guard: if CMS data is missing, render nothing
  if (!study) return null;

  return (
    <Container className="bg-background text-foreground selection:bg-brand/20 min-h-screen font-sans">
      {/* Page hero displays title, metadata and hero media */}
      <RevealWrapper>
        <Hero study={study} />
      </RevealWrapper>

      <RevealWrapper>
        <div className="relative z-10 pt-16 pb-24">
          <div className="mx-auto max-w-5xl">
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
              {/* Main Narrative (article content) */}
              <div className="lg:col-span-8">
                <Content study={study} />
              </div>
              {/* Sticky Sidebar (metrics, before/after, CTA) */}
              <div className="lg:col-span-4">
                <Sidebar study={study} />
              </div>
            </div>
          </div>
        </div>
      </RevealWrapper>
    </Container>
  );
}

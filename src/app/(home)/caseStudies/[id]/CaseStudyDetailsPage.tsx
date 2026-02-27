/**
 * @file CaseStudyDetailsPage.tsx
 * @description Client-side layout component for individual case study pages.
 * Hydrates TinaCMS data and orchestrates the Hero, Content (narrative), and Sidebar sections.
 * @dependencies
 * - TinaCMS: `useTina` for live-editing hydration
 * - UI: `Container`, `RevealWrapper`, `Content`, `Hero`, `Sidebar`
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
  const { data } = useTina({
    ...caseStudyResponse,
  });

  const study = data.caseStudy;

  if (!study) return null;

  return (
    <Container className="bg-background text-foreground selection:bg-brand/20 dark:selection:bg-brand/40 min-h-screen font-sans transition-colors duration-300 dark:text-zinc-50">
      <RevealWrapper>
        <Hero study={study} />
      </RevealWrapper>

      <RevealWrapper>
        <div className="relative z-10 pt-16 pb-24">
          <div className="mx-auto max-w-5xl">
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-8">
                <Content study={study} />
              </div>
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

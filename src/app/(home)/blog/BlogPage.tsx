/**
 * File: src/app/(home)/blog/BlogPage.tsx
 * Purpose: Client-side page component for rendering blog with CMS hydration.
 */
"use client";

import { useTina } from "tinacms/dist/react";

import type client from "@/../tina/__generated__/client";
import Callout from "@/components/Callout";
import Container from "@/components/Container";
import PageHero from "@/components/PageHero";

import Browser from "./Browser";

type PageResponse = Awaited<ReturnType<typeof client.queries.pages>>;
type GlobalResponse = Awaited<ReturnType<typeof client.queries.global>>;

interface ContentProps {
  pageResponse: PageResponse;
  globalResponse: GlobalResponse;
}

export default function BlogPage({
  pageResponse,
  globalResponse,
}: ContentProps) {
  const { data: pageData } = useTina({ ...pageResponse });

  const {
    data: {
      global: { blogConfig }, // Assuming a blogConfig mirrors caseStudyConfig
    },
  } = useTina({ ...globalResponse });

  return (
    <Container className="flex min-h-screen flex-col gap-16 py-32">
      <PageHero data={pageData.pages} />

      {/* Interactive explorer */}
      {blogConfig && <Browser blogConfig={blogConfig} />}

      {/* CTA / Newsletter mapping */}
      <Callout data={pageData.pages.callout} />
    </Container>
  );
}

/**
 * @file BlogPage.tsx
 * @description Client-side layout component for the main blog index page.
 * Hydrates TinaCMS data and orchestrates the PageHero, Browser (filtering/grid), and Callout sections.
 * @dependencies
 * - TinaCMS: `useTina` for live-editing hydration
 * - UI: `Callout`, `Container`, `PageHero`, `Browser`
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
      global: { blogConfig },
    },
  } = useTina({ ...globalResponse });

  return (
    <Container
      // Applying cascading text colors here to cleanly propagate down to children
      className="flex min-h-screen flex-col gap-16 py-32 text-zinc-900 transition-colors duration-300 dark:text-zinc-50"
    >
      <PageHero data={pageData.pages} />

      {blogConfig && <Browser blogConfig={blogConfig} />}

      <Callout data={pageData.pages.callout} />
    </Container>
  );
}

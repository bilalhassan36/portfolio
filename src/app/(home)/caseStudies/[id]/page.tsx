/**
 * File: src/app/(home)/caseStudies/[id]/page.tsx
 * Purpose: Server route that loads a single case study by id and renders the details page.
 * Component: Server
 * Client-safe: N/A — loads data on the server and passes it to a client-side details component.
 * Presentational: No — responsible for data loading and 404 handling.
 * Key dependencies: `next/navigation` (`notFound`), Tina generated `client`, `CaseStudyDetails` (client component)
 */
import { notFound } from "next/navigation";

import { client } from "@/../tina/__generated__/client";

import CaseStudyDetails from "./CaseStudyDetailsPage";

export async function generateStaticParams() {
  const globalResponse = await client.queries.global({
    relativePath: "index.json",
  });

  const caseStudiesConfig = globalResponse.data.global.caseStudyConfig;
  const caseStudies = caseStudiesConfig?.studyList || [];
  const featuredStudyId = caseStudiesConfig?.featuredStudy?.id;

  // 1. Map the standard study list into the required Next.js object shape
  const params = caseStudies
    .map((studyItem) => {
      const rawId = studyItem?.study?.id || "";
      // Smart regex handles the .json files perfectly
      const slug = rawId
        .split("/")
        .pop()
        ?.replace(/\.(mdx?|json)$/, "");

      // Return null if no slug is found
      return slug ? { id: slug } : null;
    })
    // Filter out the nulls
    .filter((param): param is { id: string } => param !== null);

  // 2. Format and inject the featured study (if it exists)
  if (featuredStudyId) {
    const featuredSlug = featuredStudyId
      .split("/")
      .pop()
      ?.replace(/\.(mdx?|json)$/, "");

    // Check for duplicates before unshifting
    if (featuredSlug && !params.find((p) => p.id === featuredSlug)) {
      params.unshift({ id: featuredSlug });
    }
  }

  // 3. Return the fully assembled array of objects
  return params.slice(0, 5); // Limit to 5 for performance; adjust as needed
}

export async function generateMetadata(props: PageProps) {
  const id = (await props.params).id;

  return {
    title: `${id} - Case Study`,
    description: `Explore Bilal's success stories and insights in this detailed case study on Amazon Brand Management.`,
  };
}

interface PageProps {
  // Next passes async route params as a promise in App Router
  params: Promise<{ id: string }>;
}

// Server page: fetch case study JSON by content path and render client details
export default async function CaseStudyPage({ params }: PageProps) {
  const { id } = await params;

  const caseStudyResponse = await client.queries.caseStudy({
    relativePath: `${id}.json`,
  });

  // If the CMS has no matching case study, render Next's 404
  if (!caseStudyResponse.data?.caseStudy) {
    return notFound();
  }

  // Pass server-fetched response to the client component for Tina hydration/preview
  return <CaseStudyDetails caseStudyResponse={caseStudyResponse} />;
}

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

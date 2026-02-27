/**
 * @file page.tsx
 * @description Server route for the main case studies index (/caseStudies). Handles metadata
 * formulation and server-side data fetching for the page layout and global configurations.
 * @dependencies
 * - TinaCMS: `client.queries` for fetching page and global data
 */
import { client } from "@/../tina/__generated__/client";

import CaseStudiesPage from "./CaseStudiesPage";

export const metadata = {
  title: "Case Studies",
  description:
    "Explore Bilal's portfolio of successful amazon brand manager case studies.",
};

export default async function Page() {
  const pageResponse = await client.queries.pages({
    relativePath: "caseStudies.mdx",
  });

  const globalResponse = await client.queries.global({
    relativePath: "index.json",
  });

  return (
    <CaseStudiesPage
      pageResponse={pageResponse}
      globalResponse={globalResponse}
    />
  );
}

/**
 * File: src/app/(home)/caseStudies/page.tsx
 * Purpose: Server loader for the Case Studies page — fetches page content
 * and global settings (ordered case studies, stats) via the generated Tina
 * client and forwards responses to the client `CaseStudiesPage` component.
 * Component: Server (performs server-side data fetching)
 * Client-safe: No
 * Presentational: No (data loader)
 * Key dependencies:
 *  - `@/../tina/__generated__/client` : Tina client for `pages`/`global` queries
 *  - `CaseStudiesPage` (client) : receives server responses for preview hydration
 */
import { client } from "@/../tina/__generated__/client";

import CaseStudiesPage from "./CaseStudiesPage";

export const metadata = {
  title: "Case Studies",
  description:
    "Explore Bilal's portfolio of successful Amazon Brand Manager projects and case studies.",
};

export default async function Page() {
  // server-side: fetch page content (hero text, page-level blocks)
  const pageResponse = await client.queries.pages({
    relativePath: "caseStudies.mdx",
  });

  // server-side: fetch global settings (stats, ordered case study list)
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

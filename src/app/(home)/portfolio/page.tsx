/**
 * @file page.tsx
 * @description Server-side route for the Portfolio section. Orchestrates metadata
 * formulation and handles parallel data fetching from TinaCMS for hydration.
 * @dependencies
 * - TinaCMS: `client.queries` for server-side fetching
 * - UI: `PortfolioPage` (Client Component)
 */
import client from "@/../tina/__generated__/client";

import PortfolioPage from "./PortfolioPage";

export const metadata = {
  title: "Portfolio",
  description:
    "Explore a curated showcase of results in Amazon Brand Management by Bilal Hassan.",
};

export default async function Page() {
  // Parallel fetching: Intelligent design to minimize TTFB
  const [pageResponse, globalResponse] = await Promise.all([
    client.queries.pages({
      relativePath: "portfolio.mdx",
    }),
    client.queries.global({
      relativePath: "index.json",
    }),
  ]);

  return (
    <PortfolioPage
      portfolioResponse={pageResponse}
      globalResponse={globalResponse}
    />
  );
}

/**
 * File: src/app/(home)/portfolio/page.tsx
 * Purpose: Server page loader for the portfolio section — fetches Tina page + global content.
 * Component: default exported `Page` server component.
 * Client-safe: No — this is a server component that queries the Tina client.
 * Presentational: Delegates rendering to `PortfolioPage` (presentational component).
 * Key dependencies: Tina generated `client` queries and `PortfolioPage` component.
 */
import client from "@/../tina/__generated__/client";

import PortfolioPage from "./PortfolioPage";

export default async function Page() {
  // Load the Portfolio page content from Tina (MDX file)
  const pageResponse = await client.queries.pages({
    relativePath: "portfolio.mdx",
  });

  // Load global site content
  const globalResponse = await client.queries.global({
    relativePath: "index.json",
  });

  // Pass server responses into the presentational page component
  return (
    <PortfolioPage
      portfolioResponse={pageResponse}
      globalResponse={globalResponse}
    />
  );
}

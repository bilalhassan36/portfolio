/**
 * File: src/app/(home)/packages/page.tsx
 * Purpose: Server loader for the Packages page — fetches global settings
 * and the packages page content from TinaCMS, then passes responses to the
 * client `PackagesPage` component for hydration/preview.
 * Component: Server (server-side data fetching)
 * Client-safe: No
 * Presentational: No (data loader)
 * Key dependencies:
 *  - `@/../tina/__generated__/client` : generated Tina client for queries
 *  - `PackagesPage` (client) : receives server responses for preview hydration
 */
import client from "@/../tina/__generated__/client";

import PackagesPage from "./PackagesPage";

export const metadata = {
  title: "Packages",
  description:
    "Explore Bilal's service packages and find the perfect fit for your Amazon Brand Manager needs.",
};

const Page = async () => {
  // server-side: fetch shared/global settings (pricing config, etc.)
  const globalResponse = await client.queries.global({
    relativePath: "index.json",
  });

  // server-side: fetch the packages page content
  const pageResponse = await client.queries.pages({
    relativePath: "packages.mdx",
  });

  return (
    <PackagesPage globalResponse={globalResponse} pageResponse={pageResponse} />
  );
};

export default Page;

/**
 * @file page.tsx
 * @description Server-side route for the Packages page. Handles parallel data
 * fetching for global pricing configurations and page-specific content,
 * feeding them into the client-side PackagesPage component.
 * @dependencies
 * - TinaCMS: `client.queries` for server-side data fetching
 * - UI: `PackagesPage` (Client Component)
 */
import client from "@/../tina/__generated__/client";

import PackagesPage from "./PackagesPage";

export const metadata = {
  title: "Packages ",
  description:
    "Explore Bilal Hassan's professional service packages, ranging from MVP development to full-stack scaling and intelligent design consulting.",
};

export default async function Page() {
  // Parallel fetching of global configuration and page-specific content
  const [globalResponse, pageResponse] = await Promise.all([
    client.queries.global({
      relativePath: "index.json",
    }),
    client.queries.pages({
      relativePath: "packages.mdx",
    }),
  ]);

  return (
    <PackagesPage globalResponse={globalResponse} pageResponse={pageResponse} />
  );
}

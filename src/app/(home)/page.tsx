/**
 * File: src/app/(home)/page.tsx
 * Purpose: Page-level server component for the home route. Performs server-
 *  side TinaCMS queries and passes responses to the client `HomePage`.
 * Component: Server component
 * Client-safe: N/A (server-only)
 * Presentational: No — acts as data loader + page wrapper
 * Key dependencies:
 *  - `tina/__generated__/client` : generated queries for CMS data
 *  - `./HomePage` : client-side page component that consumes responses
 */
import client from "@/../tina/__generated__/client";

import HomePage from "./HomePage";

export default async function Page() {
  // Server-side TinaCMS fetches
  const peopleResponse = await client.queries.people({
    relativePath: "bilal-hassan.json",
  });

  const homepageResponse = await client.queries.homepage({
    relativePath: "home-page.mdx",
  });

  // Pass raw responses to the client `HomePage` for rendering / live-edit
  return (
    <HomePage
      peopleResponse={peopleResponse}
      homepageResponse={homepageResponse}
    />
  );
}

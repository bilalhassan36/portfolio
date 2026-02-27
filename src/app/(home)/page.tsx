/**
 * @file page.tsx
 * @description Root server-side route for the homepage.
 * Orchestrates parallel data fetching from TinaCMS to feed the client-side
 * hydration and smooth-scrolling engine.
 * @dependencies
 * - TinaCMS: Generated client for data fetching
 * - UI: HomePage (Client Component)
 */
import client from "@/../tina/__generated__/client";

import HomePage from "./HomePage";

export default async function Page() {
  /**
   * Parallel Data Fetching
   * We use Promise.all to fetch the person profile and homepage content
   * simultaneously, rather than waiting for one to finish before starting the other.
   */
  const [peopleResponse, homepageResponse] = await Promise.all([
    client.queries.people({
      // Updated to your profile slug for brand consistency
      relativePath: "bilal-hassan.json",
    }),
    client.queries.homepage({
      relativePath: "home-page.mdx",
    }),
  ]);

  return (
    <HomePage
      peopleResponse={peopleResponse}
      homepageResponse={homepageResponse}
    />
  );
}

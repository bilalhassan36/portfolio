/**
 * @file page.tsx
 * @description Server route for the Team page. Orchestrates metadata formulation
 * and handles parallel data fetching from TinaCMS for the page layout and global team settings.
 * @dependencies
 * - TinaCMS: `client.queries` for server-side data fetching
 * - UI: `TeamPage` (Client Component)
 */
import client from "@/../tina/__generated__/client";

import TeamPage from "./TeamPage";

export const metadata = {
  title: "Team",
  description:
    "Meet the talented minds with Bilal Hassan to deliver exceptional Amazon Brand Management services. Our team combines expertise in strategy, design, and execution to drive your brand's success on Amazon.",
};

export default async function Page() {
  // Parallel fetching: Executing both queries simultaneously to maximize server performance
  const [pageResponse, globalResponse] = await Promise.all([
    client.queries.pages({
      relativePath: "team.mdx",
    }),
    client.queries.global({
      relativePath: "index.json",
    }),
  ]);

  return (
    <TeamPage teamPageResponse={pageResponse} globalResponse={globalResponse} />
  );
}

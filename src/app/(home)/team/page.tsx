/**
 * File: src/app/(home)/team/page.tsx
 * Purpose: Server loader for the Team page — fetches TinaCMS data and passes
 * the responses to the client `TeamPage` for hydration/preview.
 * Component: Server (performs server-side data fetching)
 * Client-safe: No
 * Presentational: No (data loader)
 * Key dependencies:
 *  - `@/../tina/__generated__/client` : generated Tina client for `pages`/`global` queries
 *  - `TeamPage` (client) : receives server responses for preview hydration
 */
import client from "@/../tina/__generated__/client";

import TeamPage from "./TeamPage";

export const metadata = {
  title: "Team",
  description:
    "Meet the talented team behind Bilal's success as a PPC Manager.",
};

const Page = async () => {
  // server-side: fetch the team page content
  const pageResponse = await client.queries.pages({
    relativePath: "team.mdx",
  });

  // server-side: fetch global settings (e.g., teamMembers)
  const globalResponse = await client.queries.global({
    relativePath: "index.json",
  });

  return (
    <TeamPage teamPageResponse={pageResponse} globalResponse={globalResponse} />
  );
};

export default Page;

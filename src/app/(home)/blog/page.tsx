/**
 * File: src/app/(home)/blog/page.tsx
 * Purpose: Server loader for the Blog page
 */
import { client } from "@/../tina/__generated__/client";

import BlogPage from "./BlogPage";

export default async function Page() {
  const pageResponse = await client.queries.pages({
    relativePath: "blog.mdx",
  });

  const globalResponse = await client.queries.global({
    relativePath: "index.json",
  });

  return (
    <BlogPage pageResponse={pageResponse} globalResponse={globalResponse} />
  );
}

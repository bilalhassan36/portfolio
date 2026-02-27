/**
 * @file page.tsx
 * @description Server route for the main blog index (/blog). Handles metadata formulation
 * and data fetching for the page layout and global blog configurations.
 * @dependencies
 * - TinaCMS: `client.queries` for fetching page and global data
 */
import { client } from "@/../tina/__generated__/client";

import BlogPage from "./BlogPage";

export const metadata = {
  title: "Blogs",
  description:
    "Read Bilal Hassan's latest insights and articles on software engineering, web development, and intelligent design.",
};

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

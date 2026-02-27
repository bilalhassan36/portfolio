/**
 * File: src/app/(home)/blog/page.tsx
 * Purpose: Server loader for the Blog page
 */
import { client } from "@/../tina/__generated__/client";

import BlogPage from "./BlogPage";

export const metadata = {
  title: "Blogs",
  description:
    "Read Bilal's latest insights and articles on Amazon Brand Manger.",
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

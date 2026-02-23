/**
 * File: src/app/(home)/blog/[id]/page.tsx
 * Purpose: Server route that loads a single blog post and global config.
 */
import { notFound } from "next/navigation";

import { client } from "@/../tina/__generated__/client";

import BlogPostPage from "./BlogPostPage";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  // Fetch the specific blog post
  const blogResponse = await client.queries.blog({
    relativePath: `${id}.mdx`,
  });

  // Fetch global config to populate "Related Posts"
  const globalResponse = await client.queries.global({
    relativePath: "index.json",
  });

  if (!blogResponse.data?.blog) {
    return notFound();
  }

  return (
    <BlogPostPage blogResponse={blogResponse} globalResponse={globalResponse} />
  );
}

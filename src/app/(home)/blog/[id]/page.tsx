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

export async function generateStaticParams() {
  const globalResponse = await client.queries.global({
    relativePath: "index.json",
  });

  const blogConfig = globalResponse.data.global.blogConfig;
  const posts = blogConfig?.postList || [];
  const featuredPostId = blogConfig?.featuredPost?.id;

  // 1. Map the standard post list into the required Next.js object shape
  const params = posts
    .map((postItem) => {
      const rawId = postItem?.post?.id || "";
      // Smart regex strips out the path and any common TinaCMS extension
      const slug = rawId
        .split("/")
        .pop()
        ?.replace(/\.(mdx?|json)$/, "");

      // Return null if no slug is found to prevent empty route generation
      return slug ? { id: slug } : null;
    })
    // Filter out the nulls and keep TypeScript happy
    .filter((param): param is { id: string } => param !== null);

  // 2. Format and inject the featured post (if it exists)
  if (featuredPostId) {
    const featuredSlug = featuredPostId
      .split("/")
      .pop()
      ?.replace(/\.(mdx?|json)$/, "");

    // Check for duplicates before unshifting
    if (featuredSlug && !params.find((p) => p.id === featuredSlug)) {
      params.unshift({ id: featuredSlug });
    }
  }

  // 3. Return the fully assembled array of objects
  return params.slice(0, 5); // Limit to 5 for performance; adjust as needed
}

export async function generateMetadata(props: PageProps) {
  const id = (await props.params).id;

  return {
    title: `${id} - Blog Post`,
    description: `Read Bilal's insights on Amazon Brand Manager in this blog post.`,
  };
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

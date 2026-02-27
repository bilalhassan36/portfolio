/**
 * @file page.tsx
 * @description Server route for individual blog posts (/blog/[id]). Handles static path generation,
 * metadata formulation, and data fetching for the post and global configurations.
 * @dependencies
 * - Next.js: `notFound`, `generateStaticParams`, `generateMetadata`
 * - TinaCMS: `client.queries` for fetching blog and global data
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

  const params = posts
    .map((postItem) => {
      const rawId = postItem?.post?.id || "";
      const slug = rawId
        .split("/")
        .pop()
        ?.replace(/\.(mdx?|json)$/, "");

      return slug ? { id: slug } : null;
    })
    .filter((param): param is { id: string } => param !== null);

  if (featuredPostId) {
    const featuredSlug = featuredPostId
      .split("/")
      .pop()
      ?.replace(/\.(mdx?|json)$/, "");

    if (featuredSlug && !params.find((p) => p.id === featuredSlug)) {
      params.unshift({ id: featuredSlug });
    }
  }

  return params.slice(0, 5);
}

export async function generateMetadata(props: PageProps) {
  const id = (await props.params).id;

  return {
    title: `${id} - Blog Post`,
    description: `Read Bilal Hassan's latest insights on ${id} and more in his blog.`,
  };
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  const blogResponse = await client.queries.blog({
    relativePath: `${id}.mdx`,
  });

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

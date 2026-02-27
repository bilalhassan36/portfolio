/**
 * @file RelatedPosts.tsx
 * @description Renders a grid of up to three related blog posts, intelligently prioritizing
 * posts that share the same category as the current article.
 * @dependencies
 * - TinaCMS: Global query types for post resolution
 * - UI: `BlogCard` for rendering individual post previews
 */
import { useMemo } from "react";

import type client from "@/../tina/__generated__/client";

import { BlogCard } from "../BlogCard";

type GlobalResponse = Awaited<ReturnType<typeof client.queries.global>>;
type PostList = NonNullable<
  GlobalResponse["data"]["global"]["blogConfig"]
>["postList"];

interface RelatedProps {
  currentId: string;
  category: string;
  allPosts: PostList;
}

export const RelatedPosts = ({
  currentId,
  category,
  allPosts,
}: RelatedProps) => {
  const related = useMemo(() => {
    if (!allPosts) return [];

    return allPosts
      .map((item) => item?.post)
      .filter(Boolean)
      .filter((p) => p?.id !== currentId)
      .sort((a, b) => {
        const aMatches = a?.category === category;
        const bMatches = b?.category === category;
        if (aMatches && !bMatches) return -1;
        if (!aMatches && bMatches) return 1;
        return 0;
      })
      .slice(0, 3);
  }, [currentId, category, allPosts]);

  if (related.length === 0) return null;

  return (
    <section className="reveal-item bg-surface/30 border-linen border-y py-16 transition-colors duration-300 lg:py-24 dark:border-zinc-800 dark:bg-transparent">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-foreground text-2xl font-bold tracking-tight transition-colors duration-300 dark:text-zinc-50">
            Related Articles
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {related.map((post) => (
            <BlogCard key={post?.id} post={post!} />
          ))}
        </div>
      </div>
    </section>
  );
};

/**
 * File: src/app/(home)/blog/[id]/RelatedPosts.tsx
 * Purpose: Renders a grid of related blog posts based on category.
 */
import { useMemo } from "react";

import type client from "@/../tina/__generated__/client";

import { BlogCard } from "../BlogCard";

// Re-using the card component from the index page

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
      .filter((p) => p?.id !== currentId) // Exclude current post
      .sort((a) => (a?.category === category ? -1 : 1)) // Prioritize same category
      .slice(0, 3); // Take top 3
  }, [currentId, category, allPosts]);

  if (related.length === 0) return null;

  return (
    <section className="reveal-item bg-surface/30 border-linen border-t py-16 lg:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-foreground text-2xl font-bold tracking-tight">
            Related Articles
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {related.map((post) => (
            // Re-using the exact BlogCard we built for the index page
            <BlogCard key={post?.id} post={post!} />
          ))}
        </div>
      </div>
    </section>
  );
};

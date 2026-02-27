/**
 * @file BlogGrid.tsx
 * @description Orchestrates the layout for the blog index, rendering a responsive grid of
 * `BlogCard` and `FeaturedBlogPost` components. Handles pagination (Load More) and empty states.
 * @dependencies
 * - UI: `Filter`, `Zap` (Lucide icons), `BlogCard`, `FeaturedBlogPost`
 * - Utils: `cn` (Tailwind class merging)
 */
import { Filter, Zap } from "lucide-react";

import type client from "@/../tina/__generated__/client";
import { cn } from "@/lib/utils";

import { BlogCard } from "./BlogCard";
import { FeaturedBlogPost } from "./FeaturedBlogPost";

type GlobalResponse = Awaited<ReturnType<typeof client.queries.global>>;
type PostItemWrapper = NonNullable<
  NonNullable<
    NonNullable<GlobalResponse["data"]["global"]["blogConfig"]>["postList"]
  >[number]
>["post"];

interface GridProps {
  posts: PostItemWrapper[];
  meta: { totalCount: number; hasMore: boolean; isEmpty: boolean };
  actions: { handleLoadMore: () => void; handleClear: () => void };
}

export const BlogGrid = ({
  posts,
  meta: { totalCount, hasMore, isEmpty },
  actions: { handleLoadMore, handleClear },
}: GridProps) => {
  // Centralized button styling with corresponding dark mode tokens for text, borders, and interactive states.
  const outlineButtonStyles =
    "relative overflow-hidden inline-flex items-center justify-center whitespace-nowrap rounded-full text-xs md:text-sm font-bold tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand disabled:pointer-events-none disabled:opacity-50 active:scale-95 select-none border border-linen dark:border-zinc-800 bg-white dark:bg-zinc-900 text-clay dark:text-zinc-300 hover:text-brand dark:hover:text-brand-400 hover:border-brand/50 dark:hover:border-brand-400/50 hover:bg-brand/5 dark:hover:bg-brand-400/10";

  return (
    <div className="reveal-item mx-auto flex max-w-5xl flex-col gap-4">
      <div className="mb-2 flex items-end justify-between px-1">
        <div className="text-clay flex items-center gap-2 text-xs font-bold tracking-wider uppercase transition-colors duration-300 dark:text-zinc-400">
          <Zap className="text-brand fill-brand dark:text-brand-400 dark:fill-brand-400 h-3.5 w-3.5 transition-colors duration-300" />
          Showing {totalCount} Articles
        </div>
      </div>

      <div className="flex flex-col gap-6">
        {posts && posts.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => {
              if (!post) return null;
              if (post.featured)
                return <FeaturedBlogPost key={post.id} post={post} />;
              return <BlogCard key={post.id} post={post} />;
            })}
          </div>
        ) : (
          isEmpty && (
            <div className="border-linen/80 bg-linen/50 dark:bg-linen/10 rounded-3xl border-2 border-dashed px-4 py-16 text-center backdrop-blur-sm transition-colors duration-300">
              <div className="bg-surface mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full transition-colors duration-300 dark:bg-zinc-800/50">
                <Filter className="text-clay/40 h-6 w-6 transition-colors duration-300 dark:text-zinc-500" />
              </div>
              <h3 className="text-foreground mb-2 text-lg font-bold transition-colors duration-300 dark:text-zinc-50">
                No articles found
              </h3>
              <p className="text-clay mx-auto mb-6 max-w-xs text-sm transition-colors duration-300 dark:text-zinc-400">
                Try adjusting your filters or search query.
              </p>
              <button
                onClick={handleClear}
                className={cn(outlineButtonStyles, "h-9 px-5 md:h-10")}
              >
                Clear Filters
              </button>
            </div>
          )
        )}
      </div>

      {hasMore && (
        <div className="mt-6 mb-12 flex justify-center">
          <button
            onClick={handleLoadMore}
            className={cn(
              outlineButtonStyles,
              "h-10 px-8 text-sm shadow-md md:h-12 dark:shadow-none"
            )}
          >
            Load More Articles
          </button>
        </div>
      )}
    </div>
  );
};

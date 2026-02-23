/**
 * File: src/app/(home)/blog/BlogGrid.tsx
 * Purpose: Structure matches CaseStudiesGrid, but handles blog components.
 */
import { Filter, Zap } from "lucide-react";

import type client from "@/../tina/__generated__/client";
import { cn } from "@/lib/utils";

import { BlogCard } from "./BlogCard";
import { FeaturedBlogPost } from "./FeaturedBlogPost";

type GlobalResponse = Awaited<ReturnType<typeof client.queries.global>>;
type PostItemWrapper = NonNullable<
  NonNullable<
    GlobalResponse["data"]["global"]["blogConfig"]["postList"]
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
  const outlineButtonStyles =
    "relative overflow-hidden inline-flex items-center justify-center whitespace-nowrap rounded-full text-xs md:text-sm font-bold tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand disabled:pointer-events-none disabled:opacity-50 active:scale-95 select-none border border-linen bg-white text-clay hover:text-brand hover:border-brand/50 hover:bg-brand/5";

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-4">
      <div className="mb-2 flex items-end justify-between px-1">
        <div className="text-clay flex items-center gap-2 text-xs font-bold tracking-wider uppercase">
          <Zap className="text-brand fill-brand h-3.5 w-3.5" />
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
            <div className="border-linen/80 rounded-3xl border-2 border-dashed bg-white/40 px-4 py-16 text-center backdrop-blur-sm">
              <div className="bg-surface mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                <Filter className="text-clay/40 h-6 w-6" />
              </div>
              <h3 className="text-foreground mb-2 text-lg font-bold">
                No articles found
              </h3>
              <p className="text-clay mx-auto mb-6 max-w-xs text-sm">
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
              "h-10 bg-white px-8 text-sm shadow-md md:h-12"
            )}
          >
            Load More Articles
          </button>
        </div>
      )}
    </div>
  );
};

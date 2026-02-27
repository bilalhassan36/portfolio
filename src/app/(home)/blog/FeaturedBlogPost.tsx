/**
 * @file FeaturedBlogPost.tsx
 * @description Renders a high-prominence card for the featured blog post.
 * Spans multiple columns in a grid and includes a distinctive animated hover state.
 * @dependencies
 * - Next.js: `Link` for routing
 * - TinaCMS: Global query types
 * - UI: `ArrowRight`, `Calendar`, `Clock`, `Sparkles` (Lucide icons)
 */
import Link from "next/link";

import { ArrowRight, Calendar, Clock, Sparkles } from "lucide-react";

import type client from "@/../tina/__generated__/client";

type GlobalResponse = Awaited<ReturnType<typeof client.queries.global>>;
type PostItemWrapper = NonNullable<
  NonNullable<
    NonNullable<GlobalResponse["data"]["global"]["blogConfig"]>["postList"]
  >[number]
>["post"];

interface FeaturedPostProps {
  post: PostItemWrapper;
}

export const FeaturedBlogPost = ({ post }: FeaturedPostProps) => {
  if (!post) return null;
  const postId = post.id.split("/")[2].split(".")[0];

  return (
    <div className="col-span-1 mb-6 md:col-span-2 lg:col-span-3">
      <Link
        href={`/blog/${postId}`}
        className="group bg-background border-linen hover:shadow-brand/10 hover:border-brand/40 dark:hover:border-brand/40 relative block overflow-hidden rounded-3xl border transition-all duration-500 hover:-translate-y-1 hover:shadow-xl dark:border-zinc-800 dark:hover:shadow-none"
      >
        <div className="via-brand/5 pointer-events-none absolute inset-0 z-0 -translate-x-full bg-linear-to-r from-transparent to-transparent transition-transform duration-1000 ease-in-out group-hover:translate-x-full" />

        <div className="relative z-10 p-8 md:p-12">
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <span className="bg-brand/10 text-brand dark:text-brand-400 border-brand/20 dark:border-brand-400/20 flex items-center gap-2 rounded-md border px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase transition-colors duration-300">
              <Sparkles className="fill-brand dark:fill-brand-400 h-3 w-3 transition-colors duration-300" />
              Featured
            </span>
            <span className="bg-surface border-linen text-clay/70 group-hover:text-foreground inline-flex items-center rounded-md border px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase transition-colors duration-300 dark:border-zinc-700 dark:text-zinc-400 dark:group-hover:text-zinc-50">
              {post.category}
            </span>
          </div>

          <h2 className="text-foreground group-hover:text-brand dark:group-hover:text-brand-400 mb-4 text-2xl leading-tight font-black tracking-tight transition-colors duration-300 sm:text-3xl lg:text-4xl dark:text-zinc-50">
            {post.title}
          </h2>

          <p className="text-clay mb-6 max-w-2xl text-sm leading-relaxed transition-colors duration-300 md:text-base dark:text-zinc-400">
            {post.excerpt}
          </p>

          <div className="border-linen group-hover:border-brand/20 dark:group-hover:border-brand-400/30 mt-8 flex flex-wrap items-center gap-6 border-t border-dashed pt-6 transition-colors duration-300 dark:border-zinc-800">
            <div className="flex items-center gap-3">
              <div className="bg-brand/20 text-brand dark:text-brand-400 flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-bold transition-colors duration-300">
                {post.author?.initials}
              </div>
              <span className="text-foreground text-[10px] font-bold tracking-wide uppercase transition-colors duration-300 dark:text-zinc-100">
                {post.author?.name}
              </span>
            </div>

            <div className="text-clay flex items-center gap-1.5 text-[10px] font-bold tracking-widest uppercase transition-colors duration-300 dark:text-zinc-400">
              <Calendar className="h-3.5 w-3.5" />
              <span>
                {post.date
                  ? new Date(post.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  : ""}
              </span>
            </div>

            <div className="text-clay flex items-center gap-1.5 text-[10px] font-bold tracking-widest uppercase transition-colors duration-300 dark:text-zinc-400">
              <Clock className="h-3.5 w-3.5" />
              <span>{post.readingTime} min read</span>
            </div>

            <span className="text-brand dark:text-brand-400 ml-auto flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase transition-all duration-300 group-hover:translate-x-2">
              Read article <ArrowRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

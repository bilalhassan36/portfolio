/**
 * @file BlogCard.tsx
 * @description Renders an interactive, highly-reusable card for individual blog posts.
 * Handles hover states, routing, and displays key metadata (category, read time, author).
 * @dependencies
 * - Next.js: `Link` for client-side routing
 * - TinaCMS: Global query types for post resolution
 * - UI: `Clock` (Lucide)
 */
import Link from "next/link";

import { Clock } from "lucide-react";

import type client from "@/../tina/__generated__/client";

type GlobalResponse = Awaited<ReturnType<typeof client.queries.global>>;
type PostItemWrapper = NonNullable<
  NonNullable<
    NonNullable<GlobalResponse["data"]["global"]["blogConfig"]>["postList"]
  >[number]
>["post"];

interface BlogCardProps {
  post: PostItemWrapper;
}

export const BlogCard = ({ post }: BlogCardProps) => {
  if (!post) return null;
  const postId = post.id.split("/")[2].split(".")[0];

  return (
    <Link
      href={`/blog/${postId}`}
      className="group bg-background border-linen hover:border-brand/40 dark:hover:border-brand/40 hover:shadow-brand/10 relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border p-5 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl md:p-6 dark:border-zinc-800"
    >
      <div className="from-brand/5 to-brand/0 pointer-events-none absolute inset-0 bg-linear-to-br via-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative z-10 flex h-full flex-col">
        <div className="mb-4 flex items-center justify-between">
          <span className="bg-surface border-linen text-brand dark:text-brand-400 group-hover:bg-brand inline-flex items-center rounded-md border px-2 py-1 text-[10px] font-bold tracking-wider uppercase shadow-sm transition-colors duration-300 group-hover:text-white dark:border-zinc-700 dark:group-hover:text-white">
            {post.category}
          </span>
          <span className="text-clay group-hover:text-brand dark:group-hover:text-brand-400 flex items-center gap-1.5 text-[10px] font-bold tracking-widest uppercase transition-colors duration-300 dark:text-zinc-400">
            <Clock className="h-3 w-3" />
            {post.readingTime} min
          </span>
        </div>

        <div className="mb-6 grow">
          <h3 className="text-foreground group-hover:text-brand dark:group-hover:text-brand-400 mb-2 line-clamp-2 text-lg leading-snug font-bold transition-colors duration-300 md:text-xl dark:text-zinc-50">
            {post.title}
          </h3>
          <p className="text-clay line-clamp-3 text-xs leading-relaxed transition-colors duration-300 md:text-sm dark:text-zinc-400">
            {post.excerpt}
          </p>
        </div>

        <div className="border-linen group-hover:border-brand/20 dark:group-hover:border-brand/30 mt-auto flex items-center justify-between border-t border-dashed pt-4 transition-colors duration-300 dark:border-zinc-800">
          <div className="flex items-center gap-2.5">
            <div className="bg-brand/20 text-brand dark:text-brand-400 flex h-6 w-6 items-center justify-center rounded-full text-[9px] font-bold transition-colors duration-300">
              {post.author?.initials}
            </div>
            <span className="text-foreground text-[10px] font-bold tracking-wide uppercase transition-colors duration-300 dark:text-zinc-100">
              {post.author?.name}
            </span>
          </div>
          <span className="text-clay text-[9px] font-semibold tracking-widest uppercase transition-colors duration-300 dark:text-zinc-500">
            {post.date
              ? new Date(post.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              : ""}
          </span>
        </div>
      </div>
    </Link>
  );
};

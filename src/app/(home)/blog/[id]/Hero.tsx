/**
 * @file Hero.tsx
 * @description Renders the hero header for a single blog post, displaying the title, category,
 * reading time, publication date, and author metadata.
 * @dependencies
 * - TinaCMS: Blog query types
 * - UI: `ArrowLeft`, `Calendar`, `Clock` (Lucide icons)
 */
import Link from "next/link";

import { ArrowLeft, Calendar, Clock } from "lucide-react";

import type client from "@/../tina/__generated__/client";

type BlogResponse = Awaited<
  ReturnType<typeof client.queries.blog>
>["data"]["blog"];

interface HeroProps {
  post: BlogResponse;
}

export const Hero = ({ post }: HeroProps) => {
  return (
    <header className="reveal-item border-linen mb-12 border-b pb-8 transition-colors duration-300 dark:border-zinc-800">
      <Link
        href="/blog"
        className="text-clay hover:text-brand dark:hover:text-brand-400 group mb-8 inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase transition-colors duration-300 dark:text-zinc-400"
      >
        <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-1" />
        Back to Blog
      </Link>

      <div className="mb-6 flex flex-wrap items-center gap-4">
        <span className="bg-surface border-linen text-brand dark:text-brand-400 inline-flex items-center rounded-md border px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase shadow-sm transition-colors duration-300 dark:border-zinc-700">
          {post.category}
        </span>

        <div className="text-clay flex items-center gap-1.5 text-[10px] font-bold tracking-widest uppercase transition-colors duration-300 dark:text-zinc-400">
          <Clock className="h-3.5 w-3.5" />
          <span>{post.readingTime} min read</span>
        </div>

        <div className="text-clay flex items-center gap-1.5 text-[10px] font-bold tracking-widest uppercase transition-colors duration-300 dark:text-zinc-400">
          <Calendar className="h-3.5 w-3.5" />
          <span>
            {post.date
              ? new Date(post.date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })
              : ""}
          </span>
        </div>
      </div>

      <h1 className="reveal-item text-foreground mb-8 text-3xl leading-tight font-black tracking-tight transition-colors duration-300 md:text-4xl lg:text-5xl dark:text-zinc-50">
        {post.title}
      </h1>

      <div className="reveal-item flex items-center gap-4">
        <div className="bg-brand/10 text-brand dark:text-brand-400 flex h-12 w-12 items-center justify-center rounded-full text-sm font-bold transition-colors duration-300">
          {post.author?.initials}
        </div>
        <div>
          <div className="text-foreground text-sm font-bold transition-colors duration-300 dark:text-zinc-50">
            {post.author?.name}
          </div>
          <div className="text-clay text-xs tracking-wider uppercase transition-colors duration-300 dark:text-zinc-400">
            Author
          </div>
        </div>
      </div>
    </header>
  );
};

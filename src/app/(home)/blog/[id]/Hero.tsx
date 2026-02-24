/**
 * File: src/app/(home)/blog/[id]/Hero.tsx
 * Purpose: Display the blog post hero with metadata and author info.
 */
import Link from "next/link";

import { ArrowLeft, Calendar, Clock } from "lucide-react";

import type client from "@/../tina/__generated__/client";

type BlogResponse = Awaited<
  ReturnType<typeof client.queries.blog>
>["data"]["blog"];

export const Hero = ({ post }: { post: BlogResponse }) => {
  return (
    <header className="reveal-item border-linen mb-12 border-b pb-8">
      {/* Back Link */}
      <Link
        href="/blog"
        className="text-clay hover:text-brand group mb-8 inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase transition-colors"
      >
        <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-1" />
        Back to Blog
      </Link>

      {/* Meta Tags */}
      <div className="mb-6 flex flex-wrap items-center gap-4">
        <span className="bg-surface border-linen text-brand inline-flex items-center rounded-md border px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase shadow-sm">
          {post.category}
        </span>
        <div className="text-clay flex items-center gap-1.5 text-[10px] font-bold tracking-widest uppercase">
          <Clock className="h-3.5 w-3.5" />
          <span>{post.readingTime} min read</span>
        </div>
        <div className="text-clay flex items-center gap-1.5 text-[10px] font-bold tracking-widest uppercase">
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

      {/* Title */}
      <h1 className="reveal-item text-foreground mb-8 text-3xl leading-tight font-black tracking-tight md:text-4xl lg:text-5xl">
        {post.title}
      </h1>

      {/* Author Block */}
      <div className="reveal-item flex items-center gap-4">
        <div className="bg-brand/10 text-brand flex h-12 w-12 items-center justify-center rounded-full text-sm font-bold">
          {post.author?.initials}
        </div>
        <div>
          <div className="text-foreground text-sm font-bold">
            {post.author?.name}
          </div>
          <div className="text-clay text-xs tracking-wider uppercase">
            Author
          </div>
        </div>
      </div>
    </header>
  );
};

/**
 * File: src/app/(home)/blog/FeaturedBlogPost.tsx
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

export const FeaturedBlogPost = ({ post }: { post: PostItemWrapper }) => {
  if (!post) return null;
  const postId = post.id.split("/")[2].split(".")[0];

  return (
    <div className="reveal-item col-span-1 mb-6 md:col-span-2 lg:col-span-3">
      <Link
        href={`/blog/${postId}`}
        className="group bg-background border-linen hover:shadow-brand/10 hover:border-brand/40 relative block overflow-hidden rounded-3xl border transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"
      >
        {/* Hover Sweep Gradient Overlay */}
        <div className="via-brand/5 pointer-events-none absolute inset-0 z-0 -translate-x-full bg-linear-to-r from-transparent to-transparent transition-transform duration-1000 ease-in-out group-hover:translate-x-full" />

        <div className="relative z-10 p-8 md:p-12">
          {/* Tags */}
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <span className="bg-brand/10 text-brand border-brand/20 flex items-center gap-2 rounded-md border px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase">
              <Sparkles className="fill-brand h-3 w-3" />
              Featured
            </span>
            <span className="bg-surface border-linen text-clay/70 group-hover:text-foreground inline-flex items-center rounded-md border px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase transition-colors">
              {post.category}
            </span>
          </div>

          <h2 className="text-foreground group-hover:text-brand mb-4 text-2xl leading-tight font-black tracking-tight transition-colors duration-300 sm:text-3xl lg:text-4xl">
            {post.title}
          </h2>

          <p className="text-clay mb-6 max-w-2xl text-sm leading-relaxed md:text-base">
            {post.excerpt}
          </p>

          {/* Bottom Area with Dashed Border */}
          <div className="border-linen group-hover:border-brand/20 mt-8 flex flex-wrap items-center gap-6 border-t border-dashed pt-6 transition-colors duration-300">
            {/* Author */}
            <div className="flex items-center gap-3">
              <div className="bg-brand/20 text-brand flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-bold">
                {post.author?.initials}
              </div>
              <span className="text-foreground text-[10px] font-bold tracking-wide uppercase">
                {post.author?.name}
              </span>
            </div>

            {/* Date */}
            <div className="text-clay flex items-center gap-1.5 text-[10px] font-bold tracking-widest uppercase">
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

            {/* Reading Time */}
            <div className="text-clay flex items-center gap-1.5 text-[10px] font-bold tracking-widest uppercase">
              <Clock className="h-3.5 w-3.5" />
              <span>{post.readingTime} min read</span>
            </div>

            {/* CTA Arrow */}
            <span className="text-brand ml-auto flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase transition-all duration-300 group-hover:translate-x-2">
              Read article <ArrowRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

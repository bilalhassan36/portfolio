/**
 * File: src/app/(home)/blog/BlogCard.tsx
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

export const BlogCard = ({ post }: { post: PostItemWrapper }) => {
  if (!post) return null;
  const postId = post.id.split("/")[2].split(".")[0];

  return (
    <Link
      href={`/blog/${postId}`}
      className="reveal-item group bg-background border-linen hover:border-brand/40 hover:shadow-brand/10 relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border p-5 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl md:p-6"
    >
      {/* Corner Gradient Hover Overlay */}
      <div className="from-brand/5 to-brand/0 pointer-events-none absolute inset-0 bg-linear-to-br via-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative z-10 flex h-full flex-col">
        {/* Top Meta Area */}
        <div className="mb-4 flex items-center justify-between">
          <span className="bg-surface border-linen text-brand group-hover:bg-brand inline-flex items-center rounded-md border px-2 py-1 text-[10px] font-bold tracking-wider uppercase shadow-sm transition-colors duration-300 group-hover:text-white">
            {post.category}
          </span>
          <span className="text-clay group-hover:text-brand flex items-center gap-1.5 text-[10px] font-bold tracking-widest uppercase transition-colors">
            <Clock className="h-3 w-3" />
            {post.readingTime} min
          </span>
        </div>

        {/* Content Area */}
        <div className="mb-6 grow">
          <h3 className="text-foreground group-hover:text-brand mb-2 line-clamp-2 text-lg leading-snug font-bold transition-colors duration-300 md:text-xl">
            {post.title}
          </h3>
          <p className="text-clay line-clamp-3 text-xs leading-relaxed md:text-sm">
            {post.excerpt}
          </p>
        </div>

        {/* Bottom Metrics Area with Dashed Border */}
        <div className="border-linen group-hover:border-brand/20 mt-auto flex items-center justify-between border-t border-dashed pt-4 transition-colors duration-300">
          <div className="flex items-center gap-2.5">
            <div className="bg-brand/20 text-brand flex h-6 w-6 items-center justify-center rounded-full text-[9px] font-bold">
              {post.author?.initials}
            </div>
            <span className="text-foreground text-[10px] font-bold tracking-wide uppercase">
              {post.author?.name}
            </span>
          </div>
          <span className="text-clay text-[9px] font-semibold tracking-widest uppercase">
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

/**
 * @file Content.tsx
 * @description Renders the rich-text body of a blog post using TinaCMS markdown and Tailwind Typography.
 * @dependencies
 * - TinaCMS: `TinaMarkdown` for rich text rendering
 * - Tailwind Typography: Utilizes `prose` and `dark:prose-invert` for automated text styling
 */
import { TinaMarkdown } from "tinacms/dist/rich-text";

import type client from "@/../tina/__generated__/client";

type BlogResponse = Awaited<
  ReturnType<typeof client.queries.blog>
>["data"]["blog"];

interface ContentProps {
  post: BlogResponse;
}

export const Content = ({ post }: ContentProps) => {
  return (
    <div className="reveal-item relative">
      <div
        // `dark:prose-invert` handles all nested text/border inversions natively.
        // Background remains untouched.
        className="prose prose-lg prose-brand dark:prose-invert prose-a:underline-offset-4 prose-a:transition-colors hover:prose-a:text-brand/80 dark:hover:prose-a:text-brand/90 max-w-none transition-colors duration-300"
      >
        <TinaMarkdown content={post.body} />
      </div>
    </div>
  );
};

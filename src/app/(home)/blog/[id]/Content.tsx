/**
 * File: src/app/(home)/blog/[id]/Content.tsx
 * Purpose: Render the rich-text body using global Tailwind typography.
 */
import { TinaMarkdown } from "tinacms/dist/rich-text";

import type client from "@/../tina/__generated__/client";

type BlogResponse = Awaited<
  ReturnType<typeof client.queries.blog>
>["data"]["blog"];

export const Content = ({ post }: { post: BlogResponse }) => {
  return (
    <div className="reveal-item relative">
      {/* 'prose' enables the typography plugin.
        'prose-lg' scales up the text slightly for readability.
        'prose-brand' applies your custom CSS variables.
        'max-w-none' prevents Tailwind from forcing a max-width, letting it fill the container.
      */}
      <div className="prose prose-lg prose-brand prose-a:underline-offset-4 prose-a:transition-colors hover:prose-a:text-brand/80 max-w-none">
        <TinaMarkdown content={post.body} />
      </div>
    </div>
  );
};

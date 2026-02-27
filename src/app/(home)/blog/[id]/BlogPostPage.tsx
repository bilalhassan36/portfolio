/**
 * @file BlogPostPage.tsx
 * @description Client-side page component for rendering and hydrating a single blog post using TinaCMS.
 * Acts as the top-level layout wrapper for the post's hero, content, and related posts sections.
 * @dependencies
 * - TinaCMS: `useTina` for live editing hydration
 * - UI: `Container`, `RevealWrapper`, `Hero`, `Content`, `RelatedPosts`
 */
"use client";

import { useTina } from "tinacms/dist/react";

import type client from "@/../tina/__generated__/client";
import Container from "@/components/Container";
import { RevealWrapper } from "@/components/RevealWrapper";

import { Content } from "./Content";
import { Hero } from "./Hero";
import { RelatedPosts } from "./RelatedPosts";

type BlogResponse = Awaited<ReturnType<typeof client.queries.blog>>;
type GlobalResponse = Awaited<ReturnType<typeof client.queries.global>>;

interface ClientPageProps {
  blogResponse: BlogResponse;
  globalResponse: GlobalResponse;
}

export default function BlogPostPage({
  blogResponse,
  globalResponse,
}: ClientPageProps) {
  const { data: blogData } = useTina({ ...blogResponse });
  const { data: globalData } = useTina({ ...globalResponse });

  const post = blogData.blog;
  const postList = globalData.global.blogConfig?.postList;

  if (!post) return null;

  return (
    <div
      // Background left untouched; cascading text colors added for children inheritance.
      className="bg-background min-h-screen text-zinc-900 transition-colors duration-300 dark:text-zinc-50"
    >
      <RevealWrapper>
        <Container className="pt-32 pb-16 lg:pt-40">
          <article className="mx-auto max-w-3xl">
            <Hero post={post} />
            <Content post={post} />
          </article>
        </Container>
      </RevealWrapper>

      <RevealWrapper>
        <RelatedPosts
          currentId={post.id}
          category={post.category || ""}
          allPosts={postList}
        />
      </RevealWrapper>
    </div>
  );
}

/**
 * File: src/app/(home)/blog/[id]/BlogPostPage.tsx
 * Purpose: Client page hydrating the blog post from Tina.
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
    <div className="bg-background min-h-screen">
      <RevealWrapper>
        <Container className="pt-32 pb-16 lg:pt-40">
          <article className="mx-auto max-w-3xl">
            <Hero post={post} />
            <Content post={post} />
          </article>
        </Container>
      </RevealWrapper>

      {/* Related Posts Section mapping the global post list */}
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

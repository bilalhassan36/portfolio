/**
 * @file Browser.tsx
 * @description Client-side controller for the blog exploration experience.
 * Manages state for filtering, searching, and pagination logic, combining data
 * from the featured post and the general post list.
 * @dependencies
 * - UI: `BlogFilter`, `BlogGrid`, `RevealWrapper`
 * - Types: `GlobalResponse` (TinaCMS generated)
 */
"use client";

import { useMemo, useState } from "react";

import type client from "@/../tina/__generated__/client";
import { RevealWrapper } from "@/components/RevealWrapper";

import { BlogFilter } from "./BlogFilter";
import { BlogGrid } from "./BlogGrid";

type GlobalResponse = Awaited<ReturnType<typeof client.queries.global>>;
type GlobalConfig = NonNullable<GlobalResponse["data"]["global"]["blogConfig"]>;
type PostItemWrapper = NonNullable<
  NonNullable<GlobalConfig["postList"]>[number]
>["post"];

interface BrowserProps {
  blogConfig: GlobalConfig;
}

const Browser = ({ blogConfig: { featuredPost, postList } }: BrowserProps) => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(6);

  // Consolidates all post sources into a single unified array
  const allPosts = useMemo(() => {
    if (!postList && !featuredPost) return [];

    const posts = postList?.map((item) => item?.post).filter(Boolean) || [];

    if (featuredPost) {
      // Logic check: Ensure we don't duplicate the post if it exists in both places
      const isAlreadyInList = posts.some((p) => p?.id === featuredPost.id);
      return isAlreadyInList ? posts : [featuredPost, ...posts];
    }

    return posts;
  }, [postList, featuredPost]);

  // Extracts unique categories for the filter component
  const categories = useMemo(() => {
    const cats = new Set<string>();
    cats.add("All");

    allPosts.forEach((post) => {
      if (post?.category) cats.add(post.category);
    });

    return Array.from(cats);
  }, [allPosts]);

  const filteredPosts = useMemo(() => {
    const queryLower = searchQuery.toLowerCase();

    return allPosts?.filter((p) => {
      const matchesCategory =
        activeCategory === "All" || p?.category === activeCategory;
      const matchesSearch =
        !searchQuery ||
        p?.title.toLowerCase().includes(queryLower) ||
        (p?.excerpt?.toLowerCase().includes(queryLower) ?? false);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery, allPosts]);

  const displayedList = filteredPosts?.slice(
    0,
    visibleCount
  ) as PostItemWrapper[];

  const hasMore = (filteredPosts?.length ?? 0) > visibleCount;

  return (
    <>
      <RevealWrapper>
        <BlogFilter
          categories={categories}
          filters={{ activeCategory, searchQuery }}
          actions={{
            handleCategoryChange: (c) => {
              setActiveCategory(c);
              setVisibleCount(6);
            },
            handleQueryChange: (q) => {
              setSearchQuery(q);
              setVisibleCount(6);
            },
          }}
        />
      </RevealWrapper>

      <RevealWrapper>
        <BlogGrid
          posts={displayedList}
          meta={{
            totalCount: filteredPosts?.length ?? 0,
            hasMore,
            isEmpty: !displayedList.length,
          }}
          actions={{
            handleLoadMore: () => setVisibleCount((prev) => prev + 6),
            handleClear: () => {
              setActiveCategory("All");
              setSearchQuery("");
              setVisibleCount(6);
            },
          }}
        />
      </RevealWrapper>
    </>
  );
};

export default Browser;

/**
 * File: src/app/(home)/blog/Browser.tsx
 * Purpose: Client-side explorer composing filters and grid.
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
  const [visibleCount, setVisibleCount] = useState(6); // Blogs usually show more per row

  const allPosts = useMemo(() => {
    if (!postList && !featuredPost) return [];
    if (!postList) return [featuredPost];
    if (!featuredPost)
      return postList.map((item) => item?.post).filter(Boolean);

    return [
      featuredPost,
      ...postList.map((item) => item?.post).filter(Boolean),
    ];
  }, [postList, featuredPost]);

  const categories = useMemo(() => {
    const cats = new Set<string>();
    cats.add("All");
    if (featuredPost?.category) cats.add(featuredPost.category);
    postList?.forEach((item) => {
      if (item?.post?.category) cats.add(item.post.category);
    });
    return Array.from(cats);
  }, [postList, featuredPost]);

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

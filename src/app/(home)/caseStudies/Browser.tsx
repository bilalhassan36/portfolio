"use client";

import { useMemo, useState } from "react";

import type client from "@/../tina/__generated__/client";

import { CaseStudiesGrid } from "./CaseStudiesGrid";
import { CaseStudyFilter } from "./CaseStudyFilter";

/**
 * File: src/app/(home)/caseStudies/Browser.tsx
 * Purpose: Client-side explorer that composes filter controls and the case studies grid.
 * Component: Client
 * Client-safe: Yes — manages local UI state (filters, pagination) and derives a filtered list.
 * Presentational: Yes (wires `CaseStudyFilter` -> `CaseStudiesGrid`)
 * Key dependencies: Tina-generated types, `CaseStudyFilter`, `CaseStudiesGrid`
 */

// Tina-derived types for the case study config and wrapped study node
type GlobalResponse = Awaited<ReturnType<typeof client.queries.global>>;
type GlobalConfig = NonNullable<
  GlobalResponse["data"]["global"]["caseStudyConfig"]
>;
type StudyItemWrapper = NonNullable<
  NonNullable<GlobalConfig["studyList"]>[number]
>["study"];

interface BrowserProps {
  caseStudyConfig: GlobalConfig;
}

const Browser = ({
  caseStudyConfig: { featuredStudy, studyList },
}: BrowserProps) => {
  // Local filter + pagination state
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(4);

  // Combine featuredStudy (if present) with the studyList into a single array
  const allStudies = useMemo(() => {
    if (!studyList && !featuredStudy) return [];
    if (!studyList) return [featuredStudy];
    if (!featuredStudy)
      return studyList.map((item) => item?.study).filter(Boolean);

    return [
      featuredStudy,
      ...studyList.map((item) => item?.study).filter(Boolean),
    ];
  }, [studyList, featuredStudy]);

  // Build category list (includes "All" and featured industry)
  const industryCategories = useMemo(() => {
    const categories = new Set<string>();
    categories.add("All");

    if (featuredStudy?.industry) categories.add(featuredStudy.industry);

    studyList?.forEach((item) => {
      const industry = item?.study?.industry;
      if (industry) categories.add(industry);
    });

    return Array.from(categories);
  }, [studyList, featuredStudy]);

  // Filter by active category and search query
  const filteredStudies = useMemo(() => {
    const queryLower = searchQuery.toLowerCase();

    return allStudies?.filter((s) => {
      const matchesCategory =
        activeCategory === "All" || s?.industry === activeCategory;

      const matchesSearch =
        !searchQuery ||
        s?.headline.toLowerCase().includes(queryLower) ||
        (s?.description?.toLowerCase().includes(queryLower) ?? false) ||
        (s?.tags?.some((t) => t?.toLowerCase().includes(queryLower)) ?? false);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery, allStudies]);

  // Pagination helpers
  const displayedList = filteredStudies?.slice(
    0,
    visibleCount
  ) as StudyItemWrapper[];
  const hasMore = (filteredStudies?.length ?? 0) > visibleCount;
  const totalCount = filteredStudies?.length ?? 0;

  const filterActions = {
    handleCategoryChange: (category: string) => {
      setActiveCategory(category);
      setVisibleCount(4);
    },
    handleQueryChange: (query: string) => {
      setSearchQuery(query);
      setVisibleCount(4);
    },
  };

  const filters = { activeCategory, searchQuery };

  const gridActions = {
    handleLoadMore: () => setVisibleCount((prev) => prev + 4),
    handleClear: () => {
      setActiveCategory("All");
      setSearchQuery("");
      setVisibleCount(4);
    },
  };

  const gridMeta = {
    totalCount,
    hasMore,
    isEmpty: !displayedList || displayedList.length === 0,
  };

  return (
    <div className="flex flex-col gap-8">
      <CaseStudyFilter
        categories={industryCategories}
        filters={filters}
        actions={filterActions}
      />

      <CaseStudiesGrid
        caseStudies={displayedList}
        meta={gridMeta}
        actions={gridActions}
      />
    </div>
  );
};

export default Browser;

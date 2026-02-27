/**
 * @file Browser.tsx
 * @description Client-side controller for the case studies exploration experience.
 * Manages state for filtering, searching, and pagination, combining data
 * from the featured study and the general study list.
 * @dependencies
 * - UI: `CaseStudyFilter`, `CaseStudiesGrid`
 * - Types: `GlobalResponse` (TinaCMS generated)
 */
"use client";

import { useMemo, useState } from "react";

import type client from "@/../tina/__generated__/client";

import { CaseStudiesGrid } from "./CaseStudiesGrid";
import { CaseStudyFilter } from "./CaseStudyFilter";

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
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(4);

  // Consolidates all study sources into a single unified array, preventing duplicates
  const allStudies = useMemo(() => {
    if (!studyList && !featuredStudy) return [];

    const studies = studyList?.map((item) => item?.study).filter(Boolean) || [];

    if (featuredStudy) {
      // Logic check: Ensure we don't duplicate the study if it exists in both places
      const isAlreadyInList = studies.some((s) => s?.id === featuredStudy.id);
      return isAlreadyInList ? studies : [featuredStudy, ...studies];
    }

    return studies;
  }, [studyList, featuredStudy]);

  // Extracts unique industry categories for the filter component from the unified array
  const industryCategories = useMemo(() => {
    const categories = new Set<string>();
    categories.add("All");

    allStudies.forEach((study) => {
      if (study?.industry) categories.add(study.industry);
    });

    return Array.from(categories);
  }, [allStudies]);

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

  const displayedList = filteredStudies?.slice(
    0,
    visibleCount
  ) as StudyItemWrapper[];

  const totalCount = filteredStudies?.length ?? 0;
  const hasMore = totalCount > visibleCount;

  return (
    <div className="flex flex-col gap-8">
      <CaseStudyFilter
        categories={industryCategories}
        filters={{ activeCategory, searchQuery }}
        actions={{
          handleCategoryChange: (category: string) => {
            setActiveCategory(category);
            setVisibleCount(4);
          },
          handleQueryChange: (query: string) => {
            setSearchQuery(query);
            setVisibleCount(4);
          },
        }}
      />

      <CaseStudiesGrid
        caseStudies={displayedList}
        meta={{
          totalCount,
          hasMore,
          isEmpty: !displayedList || displayedList.length === 0,
        }}
        actions={{
          handleLoadMore: () => setVisibleCount((prev) => prev + 4),
          handleClear: () => {
            setActiveCategory("All");
            setSearchQuery("");
            setVisibleCount(4);
          },
        }}
      />
    </div>
  );
};

export default Browser;

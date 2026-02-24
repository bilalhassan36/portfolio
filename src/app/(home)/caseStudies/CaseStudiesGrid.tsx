/**
 * File: src/app/(home)/caseStudies/CaseStudiesGrid.tsx
 * Purpose: Display a responsive grid of case studies with support for empty state and pagination.
 * Component: Client
 * Client-safe: Yes — receives data from server and exposes interactive handlers (load more, clear).
 * Presentational: Yes
 * Key dependencies: `lucide-react` (icons), `cn` utility, `FeaturedCard`/`Card` components
 */
import { Filter, Zap } from "lucide-react";

import type client from "@/../tina/__generated__/client";
import { FeaturedCard } from "@/app/(home)/caseStudies/FeaturedCard";
import { cn } from "@/lib/utils";

import { Card } from "./Card";

// Global types derived from Tina-generated client for the case study config
type GlobalResponse = Awaited<ReturnType<typeof client.queries.global>>;
type GlobalConfig = NonNullable<
  GlobalResponse["data"]["global"]["caseStudyConfig"]
>;
type StudyItemWrapper = NonNullable<
  NonNullable<GlobalConfig["studyList"]>[number]
>["study"];

interface GridProps {
  caseStudies: StudyItemWrapper[];
  meta: { totalCount: number; hasMore: boolean; isEmpty: boolean };
  actions: {
    handleLoadMore: () => void;
    handleClear: () => void;
  };
}

export const CaseStudiesGrid = ({
  caseStudies,
  meta: { totalCount, hasMore, isEmpty },
  actions: { handleLoadMore, handleClear },
}: GridProps) => {
  // Shared outline-style button classes used for Clear and Load More actions
  const outlineButtonStyles =
    "relative overflow-hidden inline-flex items-center justify-center whitespace-nowrap rounded-full text-xs md:text-sm font-bold tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand disabled:pointer-events-none disabled:opacity-50 active:scale-95 select-none border border-linen bg-white text-clay hover:text-brand hover:border-brand/50 hover:bg-brand/5";

  return (
    <div className="reveal-item mx-auto flex max-w-5xl flex-col gap-4">
      {/* 1. Results Header */}
      <div className="mb-2 flex items-end justify-between px-1">
        <div className="text-clay flex items-center gap-2 text-xs font-bold tracking-wider uppercase">
          <Zap className="text-brand fill-brand h-3.5 w-3.5" />
          Showing {totalCount} Results
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {/* 2. Grid Content */}
        {caseStudies && caseStudies.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
            {caseStudies.map((study) => {
              if (!study) return null;
              // Rendering all as standard cards since everything is in one list
              if (study.featured)
                return <FeaturedCard key={study.id} study={study} />;
              return <Card key={study.id} study={study} />;
            })}
          </div>
        ) : (
          // 3. Empty State
          isEmpty && (
            <div className="border-linen/80 rounded-3xl border-2 border-dashed bg-white/40 px-4 py-16 text-center backdrop-blur-sm">
              <div className="bg-surface mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                <Filter className="text-clay/40 h-6 w-6" />
              </div>
              <h3 className="text-foreground mb-2 text-lg font-bold">
                No results found
              </h3>
              <p className="text-clay mx-auto mb-6 max-w-xs text-sm">
                Try adjusting your filters or search query.
              </p>
              <button
                onClick={handleClear}
                className={cn(outlineButtonStyles, "h-9 px-5 md:h-10")}
              >
                Clear Filters
              </button>
            </div>
          )
        )}
      </div>

      {/* 4. Load More Button */}
      {hasMore && (
        <div className="mb-12 flex justify-center">
          <button
            onClick={handleLoadMore}
            className={cn(
              outlineButtonStyles,
              "h-10 bg-white px-8 text-sm shadow-md md:h-12"
            )}
          >
            Load More Case Studies
          </button>
        </div>
      )}
    </div>
  );
};

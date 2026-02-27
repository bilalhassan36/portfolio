/**
 * @file CaseStudyFilter.tsx
 * @description Provides a cohesive filtering interface for case studies, including category
 * selection pills and a text-based search input. Identical in structure to the BlogFilter.
 * @dependencies
 * - UI: `Search`, `X` (Lucide icons)
 * - Utils: `cn` (Tailwind class merging)
 */
import { Search as SearchIcon, X } from "lucide-react";

import { cn } from "@/lib/utils";

interface FilterProps {
  categories: string[];
  filters: {
    activeCategory: string;
    searchQuery: string;
  };
  actions: {
    handleCategoryChange: (cat: string) => void;
    handleQueryChange: (query: string) => void;
  };
}

export const CaseStudyFilter = ({
  categories,
  filters: { activeCategory, searchQuery },
  actions: { handleCategoryChange, handleQueryChange },
}: FilterProps) => {
  const pillButtonStyles =
    "relative cursor-pointer rounded-md px-4 py-1.5 text-xs font-semibold whitespace-nowrap transition-all duration-300 select-none md:text-sm";

  return (
    <div className="reveal-item mx-auto w-fit max-w-5xl">
      <div className="bg-linen/10 border-linen shadow-clay/5 hover:border-brand/20 dark:hover:border-brand/40 flex flex-col items-center justify-between gap-3 rounded-xl border p-1.5 shadow-lg backdrop-blur-xl transition-all md:flex-row dark:border-zinc-800">
        <div className="inline-flex w-full max-w-full items-center overflow-x-auto rounded-lg p-1 md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={cn(
                pillButtonStyles,
                activeCategory === cat
                  ? "bg-background text-foreground shadow-sm dark:text-zinc-50"
                  : "text-clay/80 hover:text-foreground dark:text-zinc-400 dark:hover:text-zinc-50"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="group relative w-full md:w-64">
          <SearchIcon className="text-clay group-focus-within:text-brand dark:group-focus-within:text-brand-400 absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2 transition-colors duration-300 dark:text-zinc-400" />

          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => handleQueryChange(e.target.value)}
            className="bg-background text-foreground placeholder:text-clay/50 focus:border-brand/20 dark:focus:border-brand/40 h-9 w-full rounded-lg border-2 border-transparent pr-9 pl-9 text-xs font-medium transition-all focus:bg-white focus:outline-none md:h-10 md:text-sm dark:text-zinc-50 dark:placeholder:text-zinc-500 dark:focus:bg-zinc-900/50"
          />

          {searchQuery && (
            <button
              onClick={() => handleQueryChange("")}
              className="text-clay absolute top-1/2 right-2 -translate-y-1/2 rounded-full p-1 transition-colors duration-300 hover:bg-red-50 hover:text-red-500 dark:text-zinc-500 dark:hover:bg-red-500/10 dark:hover:text-red-400"
            >
              <X className="h-3 w-3" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

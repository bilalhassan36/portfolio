/**
 * File: src/app/(home)/blog/BlogFilter.tsx
 * Purpose: Exact clone of CaseStudyFilter structure.
 */
import { Search as SearchIcon, X } from "lucide-react";

import { cn } from "@/lib/utils";

interface FilterProps {
  categories: string[];
  filters: { activeCategory: string; searchQuery: string };
  actions: {
    handleCategoryChange: (cat: string) => void;
    handleQueryChange: (q: string) => void;
  };
}

export const BlogFilter = ({
  categories,
  filters: { activeCategory, searchQuery },
  actions: { handleCategoryChange, handleQueryChange },
}: FilterProps) => {
  const pillButtonStyles =
    "relative cursor-pointer rounded-md px-4 py-1.5 text-xs font-semibold whitespace-nowrap transition-all duration-300 select-none md:text-sm";

  return (
    <div className="reveal-item mx-auto w-fit max-w-5xl">
      <div className="bg-linen/50 border-linen shadow-clay/5 hover:border-brand/20 flex flex-col items-center justify-between gap-3 rounded-xl border p-1.5 shadow-lg backdrop-blur-xl transition-all md:flex-row">
        <div className="inline-flex w-full max-w-full items-center overflow-x-auto rounded-lg p-1 md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={cn(
                pillButtonStyles,
                activeCategory === cat
                  ? "bg-background text-foreground shadow-sm"
                  : "text-clay/80 hover:text-foreground"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="group relative w-full md:w-64">
          <SearchIcon className="text-clay group-focus-within:text-brand absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2 transition-colors" />
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => handleQueryChange(e.target.value)}
            className="bg-background focus:border-brand/20 text-foreground placeholder:text-clay/50 h-9 w-full rounded-lg border-2 border-transparent pr-9 pl-9 text-xs font-medium transition-all focus:bg-white focus:outline-none md:h-10 md:text-sm"
          />
          {searchQuery && (
            <button
              onClick={() => handleQueryChange("")}
              className="text-clay absolute top-1/2 right-2 -translate-y-1/2 rounded-full p-1 transition-colors hover:bg-red-50 hover:text-red-500"
            >
              <X className="h-3 w-3" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

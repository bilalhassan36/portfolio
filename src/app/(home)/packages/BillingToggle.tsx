/**
 * File: src/app/(home)/packages/BillingToggle.tsx
 * Purpose: Interactive billing period toggle used on the Packages page.
 * Component: Client (uses user interaction)
 * Client-safe: Yes
 * Presentational: No — interactive control that updates parent state
 * Key dependencies:
 *  - `@/lib/utils` : `cn` for class merging
 *  - `BillingPeriod` type from `PackagesPage`
 */

"use client";

import { cn } from "@/lib/utils";

import { type BillingPeriod } from "./../packages/PackagesPage";

interface BillingToggleProps {
  currentPeriod: BillingPeriod;
  onPeriodChange: (period: BillingPeriod) => void;
}

export const BillingToggle = ({
  currentPeriod,
  onPeriodChange,
}: BillingToggleProps) => {
  // available billing cadences
  const periods: BillingPeriod[] = ["weekly", "monthly", "yearly"];

  return (
    <div className="bg-linen/50 border-linen no-scrollbar inline-flex max-w-full items-center overflow-x-auto rounded-full border p-1 md:p-1.5">
      {periods.map((period) => (
        <button
          key={period}
          onClick={() => onPeriodChange(period)}
          className={cn(
            "relative cursor-pointer rounded-full px-4 py-1.5 text-xs font-bold whitespace-nowrap transition-all duration-300 select-none md:px-5 md:py-2 md:text-sm",
            currentPeriod === period
              ? "bg-background text-foreground shadow-sm"
              : "text-clay/80 hover:text-foreground hover:bg-white/50"
          )}
        >
          {period.charAt(0).toUpperCase() + period.slice(1)}
          {/* small savings badge shown for monthly/yearly plans */}
          {period && (
            <span className="text-brand ml-1.5 hidden text-[10px] font-extrabold sm:inline">
              {period === "monthly"
                ? "• Save 10%"
                : period === "yearly"
                  ? "• Save 30%"
                  : ""}
            </span>
          )}
        </button>
      ))}
    </div>
  );
};

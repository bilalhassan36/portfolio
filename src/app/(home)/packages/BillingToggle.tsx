/**
 * @file BillingToggle.tsx
 * @description A high-end interactive selection control for switching between
 * billing cadences. Features smooth transitions and highlighted savings badges.
 * @dependencies
 * - Utils: `cn` (Tailwind class merging)
 * - Types: `BillingPeriod`
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
  const periods: BillingPeriod[] = ["weekly", "monthly", "yearly"];

  return (
    <div className="reveal-item bg-linen/50 border-linen no-scrollbar dark:bg-linen/10 inline-flex max-w-full items-center overflow-x-auto rounded-full border p-1 transition-all duration-300 md:p-1.5 dark:border-zinc-800">
      {periods.map((period) => (
        <button
          key={period}
          onClick={() => onPeriodChange(period)}
          className={cn(
            "relative cursor-pointer rounded-full px-4 py-1.5 text-xs font-bold whitespace-nowrap transition-all duration-300 select-none md:px-5 md:py-2 md:text-sm",
            currentPeriod === period
              ? "bg-background text-foreground shadow-sm dark:bg-zinc-800 dark:text-zinc-50"
              : "text-clay/80 hover:text-foreground hover:bg-white/50 dark:text-zinc-400 dark:hover:bg-zinc-800/50 dark:hover:text-zinc-50"
          )}
        >
          {period.charAt(0).toUpperCase() + period.slice(1)}

          {/* Promotion Badge: Incentivizing longer commitments with brand-colored text */}
          {period !== "weekly" && (
            <span className="text-brand dark:text-brand-400 ml-1.5 hidden text-[10px] font-extrabold transition-colors duration-300 sm:inline">
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

/**
 * @file Table.tsx
 * @description A high-end pricing and features comparison matrix.
 * Supports sticky headers, interactive column highlighting, and dynamic
 * cell rendering (checks, crosses, or text).
 * @dependencies
 * - UI: `Check`, `X`, `ArrowRight` (Lucide), `AnimatedPrice`
 * - Utils: `cn` (Tailwind class merging)
 */
import React, { useState } from "react";

import Link from "next/link";

import { ArrowRight, Check, X } from "lucide-react";

import type client from "@/../tina/__generated__/client";
import { cn } from "@/lib/utils";

import { type BillingPeriod } from "./../packages/PackagesPage";
import { AnimatedPrice } from "./AnimatedPrice";

type GlobalResponse = NonNullable<
  Awaited<ReturnType<typeof client.queries.global>>
>;

interface TableProps {
  config: GlobalResponse["data"]["global"]["pricingTable"];
  billingPeriod: BillingPeriod;
}

export const Table = ({ config, billingPeriod }: TableProps) => {
  const [hoveredColumn, setHoveredColumn] = useState<number | null>(null);

  if (!config) return null;

  const packages =
    config?.activePackages
      ?.map((item) => item?.package)
      .filter((pkg): pkg is NonNullable<typeof pkg> => !!pkg) || [];

  if (packages.length === 0) return null;

  const getFeatureValue = (
    pkg: NonNullable<(typeof packages)[number]>,
    rowKey: string
  ) => {
    const match = pkg.features?.find((f) => f?.key === rowKey);
    return match?.value || "cross";
  };

  const renderCellContent = (val: string | null | undefined) => {
    const safeVal = val || "cross";

    if (safeVal === "check" || safeVal === "true") {
      return (
        <Check className="text-brand dark:text-brand-400 mx-auto h-4 w-4 stroke-[3px] transition-colors duration-300 md:h-5 md:w-5" />
      );
    }
    if (safeVal === "cross" || safeVal === "false") {
      return (
        <X className="text-linen dark:text-linen/80 mx-auto h-4 w-4 transition-colors duration-300 md:h-5 md:w-5" />
      );
    }
    return (
      <span className="text-foreground text-xs font-bold transition-colors duration-300 md:text-sm dark:text-zinc-50">
        {safeVal}
      </span>
    );
  };

  const periodLabels: Record<BillingPeriod, string> = {
    weekly: "/wk",
    monthly: "/mo",
    yearly: "/yr",
  };

  return (
    <section className="max-w-full self-start overflow-x-auto pb-20 lg:self-center">
      <div className="no-scrollbar mx-auto max-w-5xl overflow-x-auto overflow-y-visible pb-12">
        <table className="w-full min-w-175 border-separate border-spacing-0 overflow-hidden">
          <thead className="reveal-item sticky top-0 z-30">
            <tr>
              <th className="bg-background border-linen/80 w-1/4 border-b p-4 transition-colors duration-300 dark:border-zinc-800" />
              {packages.map((pkg, index) => (
                <th
                  key={pkg.id || index}
                  className={cn(
                    "border-linen/80 relative rounded-t-2xl border-b p-4 text-center align-top transition-colors duration-300 md:p-6 dark:border-zinc-800",
                    hoveredColumn === index
                      ? "bg-brand/5 dark:bg-brand-400/10"
                      : "bg-background"
                  )}
                  onMouseEnter={() => setHoveredColumn(index)}
                  onMouseLeave={() => setHoveredColumn(null)}
                >
                  <div className="relative z-10 mb-3">
                    <h3
                      className={cn(
                        "mb-1 text-base font-bold transition-colors duration-300 md:text-lg",
                        pkg.isPopular
                          ? "text-brand dark:text-brand-400"
                          : "text-foreground dark:text-zinc-50"
                      )}
                    >
                      {pkg.name}
                    </h3>
                  </div>
                  <div className="relative z-10">
                    <AnimatedPrice
                      price={pkg.price?.[billingPeriod] || "0"}
                      period={periodLabels[billingPeriod]}
                    />
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="reveal-item text-sm">
            {config.summaryRows?.map((row, i) => (
              <tr
                key={`sum-${i}`}
                className="group border-linen/50 border-b dark:border-zinc-800"
              >
                <td className="text-clay bg-background group-hover:bg-surface border-linen/50 dark:group-hover:bg-linen/10 cursor-default border-b px-4 py-4 text-xs font-semibold transition-colors duration-200 md:text-sm dark:border-zinc-800 dark:text-zinc-400">
                  {row?.label}
                </td>
                {packages.map((pkg, colIndex) => (
                  <td
                    key={pkg.id || colIndex}
                    className={cn(
                      "text-foreground border-linen/50 group-hover:bg-surface dark:group-hover:bg-linen/10 cursor-default border-b px-4 py-4 text-center text-xs font-bold transition-colors duration-200 md:text-sm dark:border-zinc-800 dark:text-zinc-50",
                      hoveredColumn === colIndex &&
                        "bg-brand/5 dark:bg-brand-400/10"
                    )}
                    onMouseEnter={() => setHoveredColumn(colIndex)}
                    onMouseLeave={() => setHoveredColumn(null)}
                  >
                    {renderCellContent(getFeatureValue(pkg, row?.key || ""))}
                  </td>
                ))}
              </tr>
            ))}

            {config.sections?.map((section, sIndex) => (
              <React.Fragment key={`cat-${sIndex}`}>
                <tr>
                  <td
                    colSpan={packages.length + 1}
                    className="text-foreground bg-background sticky left-0 cursor-default px-4 pt-8 pb-3 text-[10px] font-black tracking-widest uppercase transition-colors duration-300 md:text-xs dark:text-zinc-50"
                  >
                    {section?.categoryName}
                  </td>
                </tr>

                {section?.rows?.map((row, rIndex) => (
                  <tr
                    key={`${sIndex}-${rIndex}`}
                    className="group border-linen/50 border-b dark:border-zinc-800"
                  >
                    <td className="text-clay bg-background group-hover:bg-surface border-linen/50 dark:group-hover:bg-linen/10 cursor-default border-b px-4 py-3.5 text-xs font-medium transition-colors duration-200 md:text-sm dark:border-zinc-800 dark:text-zinc-400">
                      {row?.label}
                    </td>

                    {packages.map((pkg, colIndex) => (
                      <td
                        key={pkg.id || colIndex}
                        className={cn(
                          "border-linen/50 group-hover:bg-surface text-foreground dark:group-hover:bg-linen/10 cursor-default border-b px-4 py-3.5 text-center transition-colors duration-200 dark:border-zinc-800 dark:text-zinc-50",
                          hoveredColumn === colIndex &&
                            "bg-brand/5 dark:bg-brand-400/10"
                        )}
                        onMouseEnter={() => setHoveredColumn(colIndex)}
                        onMouseLeave={() => setHoveredColumn(null)}
                      >
                        {renderCellContent(
                          getFeatureValue(pkg, row?.key || "")
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>

          <tfoot>
            <tr>
              <td className="bg-background p-4 transition-colors duration-300" />
              {packages.map((pkg, index) => (
                <td
                  key={`cta-${pkg.id || index}`}
                  className={cn(
                    "reveal-item rounded-b-2xl p-4 text-center transition-colors duration-300 md:p-6",
                    hoveredColumn === index
                      ? "bg-brand/5 dark:bg-brand-400/10"
                      : "bg-background"
                  )}
                  onMouseEnter={() => setHoveredColumn(index)}
                  onMouseLeave={() => setHoveredColumn(null)}
                >
                  <Link href="/contact" className="block w-full">
                    <button
                      className={cn(
                        "group relative inline-flex h-10 w-full cursor-pointer items-center justify-center overflow-hidden rounded-full px-4 text-xs font-bold tracking-wide transition-all duration-300 ease-out active:scale-95 disabled:opacity-50 md:h-12 md:text-sm",
                        pkg.isPopular
                          ? "bg-brand dark:bg-brand-400 hover:shadow-brand/20 text-white shadow-md hover:shadow-lg"
                          : "border-linen text-foreground hover:bg-surface hover:border-brand dark:hover:border-brand-400 border bg-transparent dark:border-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-800"
                      )}
                    >
                      Choose {pkg.name}
                      <ArrowRight className="ml-2 h-3 w-3 transition-transform group-hover:translate-x-1 md:h-4 md:w-4" />
                    </button>
                  </Link>
                </td>
              ))}
            </tr>
          </tfoot>
        </table>
      </div>
    </section>
  );
};

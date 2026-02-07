/**
 * File: src/app/(home)/caseStudies/CTA.tsx
 * Purpose: Reusable CTA block used across pages — shows headline, supporting
 * copy and action buttons (Schedule / View Packages).
 * Component: Presentational (interactive buttons)
 * Client-safe: Yes
 * Presentational: Yes
 * Key dependencies:
 *  - `next/link` for navigation
 *  - `lucide-react` for icons
 *  - `cn` utility for class merging
 */
import Link from "next/link";

import { ArrowRight, Phone } from "lucide-react";

// local util for className merging
import { cn } from "@/lib/utils";

export const CTA = () => {
  // Shared button styles for consistent sizing/behavior
  const baseButtonStyles =
    "relative overflow-hidden inline-flex items-center justify-center whitespace-nowrap rounded-full text-xs md:text-sm font-bold tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand disabled:pointer-events-none disabled:opacity-50 h-12 px-8 w-full cursor-pointer";

  return (
    <section className="py-20">
      <div className="mx-auto max-w-5xl">
        <div className="bg-foreground text-background relative overflow-hidden rounded-[2.5rem] border border-white/5 px-6 py-12 text-center md:rounded-[3rem] md:px-16 md:py-20">
          {/* Background texture: subtle dotted pattern */}
          <div
            className="pointer-events-none absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "radial-gradient(circle, #fff 1px, transparent 1px)",
              backgroundSize: "16px 16px",
            }}
          />

          <div className="relative z-10 flex flex-col items-center">
            {/* Animated phone icon for visual emphasis */}
            <div className="text-brand mb-6 flex h-14 w-14 rotate-6 transform animate-bounce items-center justify-center rounded-2xl bg-white shadow-lg shadow-white/10">
              <Phone className="h-6 w-6" />
            </div>

            {/* Headline with an emphasized brand-colored phrase */}
            <h2 className="mb-4 text-2xl leading-tight font-black tracking-tight text-white sm:text-3xl md:text-5xl">
              Ready to be our next <br />
              <span className="text-brand inline-block transform cursor-default transition-transform duration-300 hover:scale-105">
                Success Story?
              </span>
            </h2>

            {/* Supporting copy */}
            <p className="mb-8 max-w-md text-sm leading-relaxed font-medium text-white/70 md:text-base">
              Book a free consultation and we&apos;ll analyze your business to
              find the perfect strategy for your growth.
            </p>

            {/* Primary action buttons (Schedule + View Packages) */}
            <div className="flex w-full flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/contact" className="w-full sm:w-auto">
                <button
                  className={cn(
                    baseButtonStyles,
                    "bg-brand shadow-brand/20 hover:shadow-brand/40 group text-white shadow-md hover:-translate-y-0.5"
                  )}
                >
                  Schedule a Call
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </Link>

              <Link href="/pricing" className="w-full sm:w-auto">
                <button
                  className={cn(
                    baseButtonStyles,
                    "text-foreground bg-white shadow-lg shadow-white/5 hover:bg-white/90"
                  )}
                >
                  View Packages
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

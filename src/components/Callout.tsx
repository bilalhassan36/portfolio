/**
 * @file Callout.tsx
 * @description Conversion-focused section used to drive users toward contact
 * or pricing. Features a "sidebar" variant for case studies and a "standard"
 * variant for page footers.
 * @dependencies
 * - UI: `ArrowRight`, `Phone` (Lucide), `RevealWrapper`
 * - Utils: `cn` (Tailwind class merging)
 */
import Link from "next/link";

import { ArrowRight, Phone } from "lucide-react";

import type client from "@/../tina/__generated__/client";
import { RevealWrapper } from "@/components/RevealWrapper";
import { cn } from "@/lib/utils";

type CalloutData = Awaited<
  ReturnType<typeof client.queries.pages>
>["data"]["pages"]["callout"];

type Props = {
  data?: CalloutData;
  className?: string;
};

export const Callout = ({ data, className }: Props) => {
  if (data?.enabled === false) return null;

  const baseButtonStyles =
    "relative overflow-hidden inline-flex items-center justify-center whitespace-nowrap rounded-full text-xs md:text-sm font-bold tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand disabled:pointer-events-none disabled:opacity-50 h-12 px-8 w-full cursor-pointer";

  /**
   * Sidebar Variant:
   * Optimized for narrow containers, typically used in case-study sidebars.
   */
  if (data?.variant === "sidebar") {
    return (
      <div
        className={cn(
          "reveal-item bg-foreground text-background relative overflow-hidden rounded-2xl border border-white/5 p-6 text-center transition-colors duration-300 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-50",
          className
        )}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle, #fff 1px, transparent 1px)",
            backgroundSize: "10px 10px",
          }}
        />
        <h4 className="relative z-10 mb-2 text-xl font-bold tracking-tight">
          {data?.headline || "Need scale like this?"}
        </h4>
        <p className="relative z-10 mb-6 text-sm text-white/70 dark:text-zinc-400">
          {data?.copy || "Let's audit your current setup."}
        </p>
        <Link
          href={data?.primary?.url || "/contact"}
          className="bg-brand hover:bg-brand/90 relative z-10 inline-flex h-10 w-full items-center justify-center rounded-lg text-sm font-bold text-white transition-all duration-300 active:scale-95"
        >
          {data?.primary?.label || "Book Audit"}
        </Link>
      </div>
    );
  }

  /**
   * Default Variant:
   * Full-width, high-impact section with dual CTAs and animated icons.
   */
  return (
    <RevealWrapper asChild>
      <section className={cn("py-12", className)}>
        <div className="mx-auto max-w-5xl px-4">
          <div className="bg-foreground relative overflow-hidden rounded-[2.5rem] border border-white/5 px-6 py-12 text-center text-white transition-colors duration-300 md:rounded-[3rem] md:px-16 md:py-20 dark:border-zinc-800 dark:bg-zinc-900">
            {/* Background Pattern */}
            <div
              className="pointer-events-none absolute inset-0 opacity-10 dark:opacity-5"
              style={{
                backgroundImage:
                  "radial-gradient(circle, #fff 1px, transparent 1px)",
                backgroundSize: "16px 16px",
              }}
            />

            <div className="reveal-item relative z-10 flex flex-col items-center">
              {/* Animated Icon Container */}
              <div className="text-brand dark:text-brand-400 mb-6 flex h-14 w-14 rotate-6 transform animate-bounce items-center justify-center rounded-2xl bg-white shadow-lg shadow-white/10 transition-colors duration-300 dark:bg-zinc-800 dark:shadow-none">
                <Phone className="h-6 w-6" />
              </div>

              <h2 className="reveal-item mb-4 text-2xl leading-tight font-black tracking-tight text-white transition-colors duration-300 sm:text-3xl md:text-5xl">
                {data?.headline || "Ready to be our next"} <br />
                <span className="text-brand dark:text-brand-400 inline-block transform cursor-default transition-transform duration-300 hover:scale-105">
                  {data?.emphasis || "Success Story?"}
                </span>
              </h2>

              <p className="reveal-item mb-8 max-w-md text-sm leading-relaxed font-medium text-white/70 transition-colors duration-300 md:text-base dark:text-zinc-400">
                {data?.copy ||
                  "Book a free consultation and we'll analyze your business to find the perfect strategy for your growth."}
              </p>

              <div className="flex w-full flex-col items-center justify-center gap-3 sm:flex-row">
                {/* Primary CTA */}
                <Link
                  href={data?.primary?.url || "/contact"}
                  className="reveal-item w-full sm:w-auto"
                >
                  <button
                    className={cn(
                      baseButtonStyles,
                      "bg-brand dark:bg-brand-500 shadow-brand/20 hover:shadow-brand/40 group text-white shadow-md hover:-translate-y-0.5"
                    )}
                  >
                    {data?.primary?.label || "Schedule a Call"}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </Link>

                {/* Secondary CTA */}
                <Link
                  href={data?.secondary?.url || "/packages"}
                  className="reveal-item w-full sm:w-auto"
                >
                  <button
                    className={cn(
                      baseButtonStyles,
                      "text-foreground bg-white shadow-lg shadow-white/5 hover:bg-white/90 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-zinc-200"
                    )}
                  >
                    {data?.secondary?.label || "View Packages"}
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </RevealWrapper>
  );
};

export default Callout;

/**
 * @file Hero.tsx
 * @description Renders the hero section for an individual case study, displaying the headline,
 * industry, description, metadata, and high-level performance metrics.
 * @dependencies
 * - Next.js: `Link` for client-side routing
 * - TinaCMS: `CaseStudy` query response type
 * - UI: `ArrowLeft`, `Calendar`, `DollarSign`, `TrendingUp` (Lucide icons)
 */
import Link from "next/link";

import { ArrowLeft, Calendar, DollarSign, TrendingUp } from "lucide-react";

import type client from "@/../tina/__generated__/client";

type CaseStudyResponse = Awaited<
  ReturnType<typeof client.queries.caseStudy>
>["data"]["caseStudy"];

interface HeroProps {
  study: CaseStudyResponse;
}

export const Hero = ({ study }: HeroProps) => {
  return (
    <section className="bg-background border-linen relative z-10 border-b pt-32 pb-12 transition-colors duration-300 lg:pt-40 lg:pb-20 dark:border-zinc-800">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/caseStudies"
          className="reveal-item text-clay hover:text-brand dark:hover:text-brand-400 group mb-8 inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase transition-colors duration-300 dark:text-zinc-400"
        >
          <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-1" />
          Back to Portfolio
        </Link>

        <div className="reveal-item space-y-6">
          <div className="flex items-center gap-3">
            <span className="bg-brand/10 text-brand dark:text-brand-400 border-brand/20 dark:border-brand-400/20 rounded-full border px-3 py-1 text-[10px] font-bold tracking-wider uppercase transition-colors duration-300">
              Case Study
            </span>
            <span className="text-linen transition-colors duration-300 dark:text-zinc-700">
              •
            </span>
            <span className="text-clay text-xs font-medium transition-colors duration-300 dark:text-zinc-400">
              {study.industry}
            </span>
          </div>

          <h1 className="reveal-item text-foreground text-4xl leading-[1.1] font-black tracking-tight transition-colors duration-300 md:text-5xl lg:text-6xl dark:text-zinc-50">
            {study.headline}
          </h1>

          <p className="reveal-item text-clay max-w-3xl text-lg leading-relaxed transition-colors duration-300 md:text-xl dark:text-zinc-400">
            {study.description}
          </p>

          <div className="reveal-item text-clay flex flex-wrap items-center gap-8 pt-4 text-sm font-medium transition-colors duration-300 dark:text-zinc-400">
            <div className="flex items-center gap-2">
              <Calendar className="text-brand dark:text-brand-400 h-4 w-4 transition-colors duration-300" />
              <span>
                Duration:{" "}
                <span className="text-foreground transition-colors duration-300 dark:text-zinc-50">
                  60 Days
                </span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="text-brand dark:text-brand-400 h-4 w-4 transition-colors duration-300" />
              <span>
                Ad Spend:{" "}
                <span className="text-foreground transition-colors duration-300 dark:text-zinc-50">
                  Confidential
                </span>
              </span>
            </div>
          </div>
        </div>

        <div className="reveal-item mt-16 grid grid-cols-2 gap-4 md:grid-cols-4">
          {study.metrics?.map((metric, index) => (
            <div
              key={index}
              className="border-linen dark:bg-linen/10 rounded-2xl border bg-white p-6 transition-colors duration-300 dark:border-zinc-800"
            >
              <div className="mb-4 flex items-center justify-between">
                <TrendingUp className="text-brand dark:text-brand-400 h-5 w-5 transition-colors duration-300" />
                {metric?.trend === "up" && (
                  <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-600 transition-colors duration-300 dark:bg-emerald-500/10 dark:text-emerald-400">
                    Trending Up
                  </span>
                )}
              </div>
              <div className="text-foreground mb-1 text-3xl font-black tracking-tight tabular-nums transition-colors duration-300 dark:text-zinc-50">
                {metric?.value}
              </div>
              <div className="text-clay text-xs font-bold tracking-wider uppercase transition-colors duration-300 dark:text-zinc-400">
                {metric?.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

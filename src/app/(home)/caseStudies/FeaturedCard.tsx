/**
 * File: src/app/(home)/caseStudies/FeaturedCard.tsx
 * Purpose: Presentational card for a featured case study; shows headline,
 * description, testimonial, key metrics and a small visual trend chart.
 * Component: Presentational (pure, no hooks)
 * Client-safe: Yes
 * Presentational: Yes
 * Key dependencies:
 *  - `next/link` for navigation
 *  - `lucide-react` for icons
 *  - `MiniChart` small sparkline component
 */
import Link from "next/link";

import { ArrowUpRight, Quote, Sparkles, TrendingUp } from "lucide-react";

import type client from "@/../tina/__generated__/client";
import { MiniChart } from "@/components/MiniChart";

type GlobalResponse = Awaited<ReturnType<typeof client.queries.global>>;
type GlobalConfig = NonNullable<
  GlobalResponse["data"]["global"]["caseStudyConfig"]
>;
type StudyItemWrapper = NonNullable<
  NonNullable<GlobalConfig["studyList"]>[number]
>["study"];

export const FeaturedCard = ({ study }: { study: StudyItemWrapper }) => {
  // guard: ensure study exists
  if (!study) return null;

  // derive stable route id from Tina file path (e.g. 'content/caseStudies/foo.mdx')
  const studyId = study.id.split("/")[2].split(".")[0];

  // sample visual data used for the small bar-chart graphic
  const visualTrendData = [30, 45, 35, 60, 50, 75, 65, 90, 80, 100];

  return (
    /* Link wraps the whole card and navigates to the study detail */
    <Link href={`/caseStudies/${studyId}`} className="reveal-item col-span-2">
      <article className="group bg-background border-linen hover:shadow-brand/10 hover:border-brand/40 relative overflow-hidden rounded-3xl border transition-all duration-500 hover:-translate-y-1 hover:shadow-xl md:rounded-3xl">
        <div className="via-brand/5 pointer-events-none absolute inset-0 z-0 -translate-x-full bg-linear-to-r from-transparent to-transparent transition-transform duration-1000 ease-in-out group-hover:translate-x-full" />

        <div className="relative z-10 grid h-full grid-cols-1 gap-0 lg:grid-cols-12">
          {/* LEFT PANEL */}
          <div className="border-linen group-hover:border-brand/20 flex flex-col justify-between border-b border-dashed p-6 transition-colors md:p-8 lg:col-span-7 lg:border-r lg:border-b-0">
            <div>
              <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-center sm:gap-0">
                <div className="flex flex-wrap gap-2">
                  <div className="bg-brand/10 text-brand border-brand/20 flex items-center gap-2 rounded-md border px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase">
                    <Sparkles className="fill-brand h-3 w-3" />
                    Featured
                  </div>
                  <span className="bg-surface border-linen text-clay/70 group-hover:text-foreground inline-flex items-center rounded-md border px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase transition-colors">
                    {study.industry}
                  </span>
                </div>
                {/* MiniChart is hidden on small screens and shown on sm+ */}
                <div className="hidden sm:block">
                  <MiniChart />
                </div>
              </div>

              <h2 className="text-foreground group-hover:text-brand mb-4 text-2xl leading-tight font-black tracking-tight transition-colors duration-300 sm:text-3xl lg:text-4xl">
                {study.headline}
              </h2>

              <p className="text-clay mb-6 max-w-xl text-sm leading-relaxed md:text-base">
                {study.description}
              </p>
            </div>

            {/* Testimonial */}
            <div className="mt-auto">
              <div className="bg-surface/50 border-linen group-hover:bg-brand/5 group-hover:border-brand/20 relative rounded-xl border p-4 transition-all duration-300">
                <Quote className="text-brand/20 absolute top-3 left-3 h-5 w-5 rotate-180 md:h-6 md:w-6" />
                <div className="relative z-10 pl-2">
                  <p className="text-foreground mb-3 text-xs leading-relaxed font-medium italic md:text-sm">
                    &quot;{study.author?.quote}&quot;
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="bg-brand/20 text-brand flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-bold">
                      {study.author?.name?.charAt(0)}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-foreground text-[10px] font-bold tracking-wide uppercase">
                        {study.author?.name}
                      </span>
                      <span className="text-clay text-[9px] font-semibold tracking-widest uppercase">
                        {study.author?.role}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL (Metrics) */}
          <div className="bg-surface/30 group-hover:bg-brand/5 flex flex-col justify-between p-6 transition-colors duration-300 md:p-8 lg:col-span-5">
            <div className="mb-6 flex items-center justify-between sm:justify-end">
              <div className="sm:hidden">
                <MiniChart />
              </div>
              <div className="text-clay group-hover:text-brand inline-flex items-center gap-2 text-xs font-bold transition-colors">
                Read Analysis <ArrowUpRight className="h-3.5 w-3.5" />
              </div>
            </div>

            {/* show the top 4 metrics; trend icons indicate direction */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-6 md:gap-x-6 md:gap-y-8">
              {study.metrics?.slice(0, 4).map((metric, i) => (
                <div key={i} className="group/metric relative">
                  <div className="text-clay/60 group-hover/metric:text-brand mb-1 text-[9px] font-bold tracking-widest uppercase transition-colors md:text-[10px]">
                    {metric?.label}
                  </div>
                  <div className="flex items-end gap-1.5">
                    <span className="text-foreground origin-left text-xl font-black tracking-tight tabular-nums transition-transform duration-300 group-hover/metric:scale-105 sm:text-2xl lg:text-3xl">
                      {metric?.value}
                    </span>
                    {metric?.trend === "up" && (
                      <TrendingUp className="mb-1 h-3.5 w-3.5 text-green-500 md:h-4 md:w-4" />
                    )}
                    {metric?.trend === "down" && (
                      <TrendingUp className="mb-1 h-3.5 w-3.5 rotate-180 text-green-500 md:h-4 md:w-4" />
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Visual Chart Graphic — bars animate on group-hover */}
            <div className="border-linen/80 group-hover:border-brand/20 relative mt-8 border-t border-dashed pt-6 transition-colors">
              <span className="text-clay/50 absolute -top-3 left-0 bg-transparent pr-2 text-[9px] font-bold tracking-widest uppercase">
                Growth Trajectory
              </span>
              <div className="mt-2 flex h-12 w-full items-end justify-between gap-1 md:h-16">
                {visualTrendData.map((height, idx) => (
                  <div
                    key={idx}
                    className="bg-brand/20 group-hover:bg-brand/30 relative w-full overflow-hidden rounded-t-[1px] transition-colors duration-500"
                    style={{ height: `${height}%` }}
                  >
                    <div className="bg-brand absolute bottom-0 left-0 h-0 w-full transition-all delay-50 duration-700 ease-out group-hover:h-full" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};

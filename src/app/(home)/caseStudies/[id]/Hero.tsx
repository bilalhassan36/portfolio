/**
 * File: src/app/(home)/caseStudies/[id]/Hero.tsx
 * Purpose: Display the case study hero with headline, metadata and metrics.
 * Component: Presentational
 * Client-safe: Yes — purely presentational and safe for server or client usage.
 * Key dependencies: `next/link`, `lucide-react`
 */
import Link from "next/link";

import { ArrowLeft, Calendar, DollarSign, TrendingUp } from "lucide-react";

import type client from "@/../tina/__generated__/client";

type CaseStudyResponse = Awaited<
  ReturnType<typeof client.queries.caseStudy>
>["data"]["caseStudy"];

export const Hero = ({ study }: { study: CaseStudyResponse }) => {
  return (
    <section className="bg-background border-linen relative z-10 border-b pt-32 pb-12 lg:pt-40 lg:pb-20">
      <div className="mx-auto max-w-5xl">
        {/* Navigation: back to case studies index */}
        <Link
          href="/case-studies"
          className="reveal-item text-clay hover:text-brand group mb-8 inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase transition-colors"
        >
          <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-1" />
          Back to Portfolio
        </Link>

        {/* Header Content */}
        <div className="reveal-item space-y-6">
          <div className="flex items-center gap-3">
            {/* Category is optional in schema; show if present */}
            <span className="bg-brand/10 text-brand border-brand/20 rounded-full border px-3 py-1 text-[10px] font-bold tracking-wider uppercase">
              Case Study
            </span>
            <span className="text-linen">•</span>
            <span className="text-clay text-xs font-medium">
              {study.industry}
            </span>
          </div>

          <h1 className="reveal-item text-foreground text-4xl leading-[1.1] font-black tracking-tight md:text-5xl lg:text-6xl">
            {study.headline}
          </h1>

          {/* Using description as subheadline/intro */}
          <p className="reveal-item text-clay max-w-3xl text-lg leading-relaxed md:text-xl">
            {study.description}
          </p>

          {/* Project metadata (static placeholders; can be extended in CMS schema) */}
          <div className="reveal-item text-clay flex flex-wrap items-center gap-8 pt-4 text-sm font-medium">
            <div className="flex items-center gap-2">
              <Calendar className="text-brand h-4 w-4" />
              <span>
                Duration: <span className="text-foreground">60 Days</span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="text-brand h-4 w-4" />
              <span>
                Ad Spend: <span className="text-foreground">Confidential</span>
              </span>
            </div>
          </div>
        </div>

        {/* Metrics Grid — render metric cards if provided */}
        <div className="reveal-item mt-16 grid grid-cols-2 gap-4 md:grid-cols-4">
          {study.metrics?.map((metric, index) => (
            <div
              key={index}
              className="border-linen bg-surface/30 rounded-2xl border p-6"
            >
              <div className="mb-4 flex items-center justify-between">
                <TrendingUp className="text-brand h-5 w-5" />
                {metric?.trend === "up" && (
                  <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-600">
                    Trending Up
                  </span>
                )}
              </div>
              <div className="text-foreground mb-1 text-3xl font-black tracking-tight tabular-nums">
                {metric?.value}
              </div>
              <div className="text-clay text-xs font-bold tracking-wider uppercase">
                {metric?.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/**
 * @file Card.tsx
 * @description Renders a highly interactive, reusable case study card for grid layouts.
 * Features hover-revealed CTAs, dynamic metrics, and a miniature sparkline preview.
 * @dependencies
 * - Next.js: `Link` for client-side routing
 * - TinaCMS: Global query types for study resolution
 * - UI: `ArrowRight` (Lucide), `MiniChart`
 */
import Link from "next/link";

import { ArrowRight } from "lucide-react";

import type client from "@/../tina/__generated__/client";
import { MiniChart } from "@/components/MiniChart";

type GlobalResponse = Awaited<ReturnType<typeof client.queries.global>>;
type GlobalConfig = NonNullable<
  GlobalResponse["data"]["global"]["caseStudyConfig"]
>;
type StudyItemWrapper = NonNullable<
  NonNullable<GlobalConfig["studyList"]>[number]
>["study"];

interface CardProps {
  study: StudyItemWrapper;
}

export const Card = ({ study }: CardProps) => {
  if (!study) return null;

  const studyId = study.id.split("/")[2].split(".")[0];

  return (
    <Link href={`/caseStudies/${studyId}`} className="block h-full">
      <article className="group bg-background border-linen hover:border-brand/40 dark:hover:border-brand/40 hover:shadow-brand/10 relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border p-5 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl md:p-6 dark:border-zinc-800 dark:hover:shadow-none">
        <div className="from-brand/5 to-brand/0 pointer-events-none absolute inset-0 bg-linear-to-br via-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <div className="relative z-10 flex h-full flex-col">
          <div className="mb-4 flex items-start justify-between">
            <div className="flex flex-wrap gap-2">
              <span className="bg-surface border-linen text-brand dark:text-brand-400 group-hover:bg-brand inline-flex items-center rounded-md border px-2 py-1 text-[10px] font-bold tracking-wider uppercase shadow-sm transition-colors duration-300 group-hover:text-white dark:border-zinc-700 dark:group-hover:text-white">
                {study.industry}
              </span>

              {study.tags?.[0] && (
                <span className="bg-surface border-linen text-clay/70 inline-flex items-center rounded-md border px-2 py-1 text-[10px] font-bold tracking-wider uppercase transition-colors duration-300 dark:border-zinc-700 dark:text-zinc-400">
                  {study.tags[0]}
                </span>
              )}
            </div>

            <MiniChart />
          </div>

          <div className="mb-6 grow">
            <h3 className="text-foreground group-hover:text-brand dark:group-hover:text-brand-400 mb-2 text-lg leading-snug font-bold transition-colors duration-300 md:text-xl dark:text-zinc-50">
              {study.headline}
            </h3>
            <p className="text-clay line-clamp-2 text-xs leading-relaxed transition-colors duration-300 md:text-sm dark:text-zinc-400">
              {study.description}
            </p>
          </div>

          <div className="border-linen group-hover:border-brand/20 dark:group-hover:border-brand-400/30 mt-auto border-t border-dashed pt-4 transition-colors duration-300 dark:border-zinc-800">
            <div className="mb-4 grid grid-cols-2 gap-3">
              {study.metrics?.slice(0, 2).map((metric, i) => (
                <div key={i} className="flex flex-col">
                  <span className="text-clay/60 mb-0.5 text-[9px] font-semibold tracking-widest uppercase transition-colors duration-300 dark:text-zinc-500">
                    {metric?.label}
                  </span>
                  <span className="text-foreground group-hover:text-brand dark:group-hover:text-brand-400 text-base font-bold tracking-tight tabular-nums transition-colors duration-300 md:text-lg dark:text-zinc-50">
                    {metric?.value}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <span className="text-brand dark:text-brand-400 -translate-x-4 text-[10px] font-bold tracking-wide uppercase opacity-0 transition-all duration-300 ease-out group-hover:translate-x-0 group-hover:opacity-100">
                View Full Case Study
              </span>

              <div className="bg-surface border-linen text-clay group-hover:bg-brand group-hover:border-brand dark:group-hover:border-brand-400 flex h-8 w-8 items-center justify-center rounded-full border shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:-rotate-45 group-hover:text-white dark:border-zinc-700 dark:text-zinc-400 dark:group-hover:text-white">
                <ArrowRight className="h-3 w-3" />
              </div>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};

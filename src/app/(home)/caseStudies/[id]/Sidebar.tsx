/**
 * File: src/app/(home)/caseStudies/[id]/Sidebar.tsx
 * Purpose: Sidebar shown on individual case study pages (download, tactics, testimonial, CTA).
 * Component: `Sidebar`
 * Client-safe: Yes — presentational, no browser-only APIs or hooks.
 * Presentational: Yes — renders props from the `study` response.
 * Key dependencies: `next/link`, `lucide-react`, Tina generated `client` types.
 */
import { CheckCircle2, Download, ExternalLink } from "lucide-react";

import type client from "@/../tina/__generated__/client";
import Callout from "@/components/Callout";

type CaseStudyResponse = Awaited<
  ReturnType<typeof client.queries.caseStudy>
>["data"]["caseStudy"];

export const Sidebar = ({ study }: { study: CaseStudyResponse }) => {
  // Extract highlights array from the study details (may be undefined)
  const highlights = study.details?.highlights;

  return (
    <aside className="space-y-8 lg:sticky lg:top-24">
      {/* 1. Download Widget (Static for now) — primary access to full report */}
      <div className="reveal-item border-linen hover:border-brand/30 group flex w-full cursor-pointer items-center gap-4 rounded-xl border bg-white p-4 text-left transition-all hover:shadow-md">
        <div className="bg-brand/10 text-brand flex h-12 w-12 shrink-0 items-center justify-center rounded-lg">
          <Download className="h-6 w-6" />
        </div>
        <div>
          <div className="text-foreground group-hover:text-brand text-sm font-bold transition-colors">
            Download Full Report
          </div>
          <div className="text-clay text-xs">PDF • Detailed Analysis</div>
        </div>
      </div>

      {/* 2. Key Tactics — render when highlights exist */}
      {highlights && highlights.length > 0 && (
        <div className="reveal-item border-linen rounded-2xl border bg-white p-6 shadow-sm">
          <h4 className="text-foreground mb-6 flex items-center gap-2 font-bold">
            <CheckCircle2 className="text-brand h-5 w-5" />
            Key Tactics Used
          </h4>
          <div className="space-y-4">
            {highlights.map((highlight, index) => (
              <div
                key={index}
                className="border-linen border-b pb-4 last:border-0 last:pb-0"
              >
                <div className="text-foreground mb-1 text-sm font-bold">
                  {highlight?.title}
                </div>
                <div className="text-clay text-xs leading-relaxed">
                  {highlight?.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. Testimonial — render if an author object exists */}
      {study.author && (
        <div className="reveal-item bg-surface border-linen relative overflow-hidden rounded-2xl border p-6">
          <div className="pointer-events-none absolute top-0 right-0 p-4 opacity-10">
            <ExternalLink className="text-brand h-24 w-24" />
          </div>

          <blockquote className="text-foreground relative z-10 mb-4 text-sm leading-relaxed italic">
            &quot;{study.author.quote}&quot;
          </blockquote>

          <div className="relative z-10">
            <div className="text-brand text-sm font-bold">
              {study.author.name}
            </div>
            <div className="text-clay text-xs tracking-wider uppercase">
              {study.author.role}
            </div>
          </div>
        </div>
      )}

      {/* 4. CTA Widget — primary conversion action for this page */}
      <Callout
        data={
          (study as any).callout
            ? (study as any).callout
            : {
                headline: "Need scale like this?",
                copy: "Let's audit your current setup.",
                primary: { label: "Book Audit", url: "/contact" },
                variant: "sidebar",
              }
        }
      />
    </aside>
  );
};

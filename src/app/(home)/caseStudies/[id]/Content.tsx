/**
 * File: src/app/(home)/caseStudies/[id]/Content.tsx
 * Purpose: Render the main case study article sections (summary, timeline, metrics, gallery).
 * Component: Presentational (can be used in server or client pages)
 * Client-safe: Yes — relies on passed `study` data and composes subcomponents.
 * Key dependencies: `BeforeAfterTable`, `ProofGallery`, `Timeline`
 */
import type client from "@/../tina/__generated__/client";

import { BeforeAfterTable } from "./BeforeAfterTable";
import { ProofGallery } from "./ProofGallery";
import { Timeline } from "./Timeline";

type CaseStudyResponse = Awaited<
  ReturnType<typeof client.queries.caseStudy>
>["data"]["caseStudy"];

export const Content = ({ study }: { study: CaseStudyResponse }) => {
  // Structured details block (may be undefined when not provided in CMS)
  const details = study.details;

  return (
    <div className="space-y-16">
      {/* 1. Executive Summary */}
      <div className="reveal-item">
        <h2 className="text-foreground mb-6 flex items-center gap-3 text-2xl font-bold">
          <span className="bg-brand h-1 w-8 rounded-full" />
          Executive Summary
        </h2>
        <p className="text-clay text-lg leading-relaxed">
          {/* Reusing description or could be a specific field */}
          {study.description}
        </p>
      </div>

      {/* 2. Strategy Timeline */}
      <div className="reveal-item">
        <h2 className="text-foreground mb-8 text-2xl font-bold">
          The Strategy
        </h2>
        {/* Timeline uses challenge/solution/results from `details` */}
        <Timeline
          challenge={details?.challenge || ""}
          solution={details?.solution || ""}
          results={details?.results || ""}
        />
      </div>

      {/* 3. Performance Data */}
      {details?.beforeAfter && details.beforeAfter.length > 0 && (
        <div className="reveal-item">
          <h2 className="text-foreground mb-6 text-2xl font-bold">
            Performance Data
          </h2>
          {/* Render before/after metrics table when available */}
          <BeforeAfterTable data={details.beforeAfter} />
        </div>
      )}

      {/* 4. Visual Assets */}
      {details?.proofImages && details.proofImages.length > 0 && (
        <div className="reveal-item">
          <h2 className="text-foreground mb-6 text-2xl font-bold">
            Visual Proof
          </h2>
          {/* Image gallery of proof screenshots / charts */}
          <ProofGallery images={details.proofImages} />
        </div>
      )}
    </div>
  );
};

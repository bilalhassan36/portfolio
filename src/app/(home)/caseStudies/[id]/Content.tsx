/**
 * @file Content.tsx
 * @description Renders the main narrative sections of a case study, including the
 * executive summary, strategy timeline, performance metrics, and visual proof gallery.
 * @dependencies
 * - TinaCMS: CaseStudy query response type
 * - Subcomponents: `BeforeAfterTable`, `ProofGallery`, `Timeline`
 */
import type client from "@/../tina/__generated__/client";

import { BeforeAfterTable } from "./BeforeAfterTable";
import { ProofGallery } from "./ProofGallery";
import { Timeline } from "./Timeline";

type CaseStudyResponse = Awaited<
  ReturnType<typeof client.queries.caseStudy>
>["data"]["caseStudy"];

interface ContentProps {
  study: CaseStudyResponse;
}

export const Content = ({ study }: ContentProps) => {
  const details = study.details;

  return (
    <div className="reveal-item space-y-16">
      <div>
        <h2 className="text-foreground mb-6 flex items-center gap-3 text-2xl font-bold transition-colors duration-300 dark:text-zinc-50">
          {/* Accent Line: Treating this as a decorative border/text equivalent */}
          <span className="bg-brand dark:bg-brand-400 h-1 w-8 rounded-full transition-colors duration-300" />
          Executive Summary
        </h2>
        <p className="text-clay text-lg leading-relaxed transition-colors duration-300 dark:text-zinc-400">
          {study.description}
        </p>
      </div>

      <div>
        <h2 className="text-foreground mb-8 text-2xl font-bold transition-colors duration-300 dark:text-zinc-50">
          The Strategy
        </h2>
        <Timeline
          challenge={details?.challenge || ""}
          solution={details?.solution || ""}
          results={details?.results || ""}
        />
      </div>

      {details?.beforeAfter && details.beforeAfter.length > 0 && (
        <div>
          <h2 className="text-foreground mb-6 text-2xl font-bold transition-colors duration-300 dark:text-zinc-50">
            Performance Data
          </h2>
          <BeforeAfterTable data={details.beforeAfter} />
        </div>
      )}

      {details?.proofImages && details.proofImages.length > 0 && (
        <div>
          <h2 className="text-foreground mb-6 text-2xl font-bold transition-colors duration-300 dark:text-zinc-50">
            Visual Proof
          </h2>
          <ProofGallery images={details.proofImages} />
        </div>
      )}
    </div>
  );
};

/**
 * @file Sidebar.tsx
 * @description Renders the sticky sidebar for individual case study pages.
 * Displays the download widget, key tactics, testimonial, and the primary CTA.
 * @dependencies
 * - TinaCMS: CaseStudy query response type
 * - UI: `Callout`, `CheckCircle2`, `Download`, `ExternalLink` (Lucide icons)
 */
import { CheckCircle2 } from "lucide-react";

import type client from "@/../tina/__generated__/client";
import Callout from "@/components/Callout";

type CaseStudyResponse = Awaited<
  ReturnType<typeof client.queries.caseStudy>
>["data"]["caseStudy"];

interface SidebarProps {
  study: CaseStudyResponse;
}

export const Sidebar = ({ study }: SidebarProps) => {
  const highlights = study.details?.highlights;

  return (
    <aside className="reveal-item space-y-8 lg:sticky lg:top-24">
      {/* 2. Key Tactics */}
      {highlights && highlights.length > 0 && (
        <div className="border-linen dark:bg-linen/10 rounded-2xl border bg-white p-6 shadow-sm transition-colors duration-300 dark:border-zinc-800 dark:shadow-none">
          <h4 className="text-foreground mb-6 flex items-center gap-2 font-bold transition-colors duration-300 dark:text-zinc-50">
            <CheckCircle2 className="text-brand dark:text-brand-400 h-5 w-5 transition-colors duration-300" />
            Key Tactics Used
          </h4>
          <div className="space-y-2">
            {highlights.map((highlight, index) => (
              <div
                key={index}
                // Child Background Alteration: Added hover backgrounds to inner rows for a premium interactive feel
                className="border-linen -mx-3 rounded-xl border-b p-3 transition-colors duration-300 last:border-0 hover:bg-zinc-50 dark:border-zinc-800/50 dark:hover:bg-zinc-800/50"
              >
                <div className="text-foreground mb-1 text-sm font-bold transition-colors duration-300 dark:text-zinc-50">
                  {highlight?.title}
                </div>
                <div className="text-clay text-xs leading-relaxed transition-colors duration-300 dark:text-zinc-400">
                  {highlight?.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. Testimonial */}
      {study.author && (
        <div className="border-linen dark:bg-linen/10 relative overflow-hidden rounded-2xl border bg-white p-6 transition-colors duration-300 dark:border-zinc-800">
          <blockquote className="text-foreground relative z-10 mb-4 text-sm leading-relaxed italic transition-colors duration-300 dark:text-zinc-50">
            &quot;{study.author.quote}&quot;
          </blockquote>

          <div className="relative z-10">
            <div className="text-brand dark:text-brand-400 text-sm font-bold transition-colors duration-300">
              {study.author.name}
            </div>
            <div className="text-clay text-xs tracking-wider uppercase transition-colors duration-300 dark:text-zinc-400">
              {study.author.role}
            </div>
          </div>
        </div>
      )}

      {/* 4. CTA */}
      <Callout
        data={
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (study as any).callout
            ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
              (study as any).callout
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

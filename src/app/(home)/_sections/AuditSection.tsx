/**
 * @file AuditSection.tsx
 * @description Renders the Audit CTA section on the homepage, including the headline, benefits list,
 * CTA button, and an optional styled "ticket savings" card.
 * Designed as a Server Component.
 * @dependencies
 * - Types: `HomepageQuery` (TinaCMS generated)
 * - UI: `RevealWrapper`, `RollingLabel`, `SectionHeader`, `ArrowRight` (Lucide), `Check` (Lucide)
 */
import Link from "next/link";

import { ArrowRight, Check } from "lucide-react";

import { type HomepageQuery } from "@/../tina/__generated__/types";
import { RevealWrapper } from "@/components/RevealWrapper";
import RollingLabel from "@/components/RollingLabel";
import SectionHeader from "@/components/SectionHeader";

interface AuditSectionProps {
  content: HomepageQuery["homepage"]["auditSection"];
}

export const AuditSection = ({ content }: AuditSectionProps) => {
  if (!content) return null;

  const headerContent = {
    headlineMain: content.title!,
    headlineHighlight: content.worth!,
    eyebrow: content.label!,
  };

  return (
    <RevealWrapper>
      <section
        id="freeAuditSection"
        className="flex flex-col gap-12 px-2 text-zinc-900 transition-colors duration-300 md:px-6 lg:px-10 dark:text-zinc-50"
      >
        <SectionHeader content={headerContent} animationClass="reveal-item" />
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            {/* Note: Overriding the inherited text color specifically for the description text to maintain a softer reading color */}
            <p className="reveal-item text-clay mb-8 max-w-md text-base leading-relaxed font-medium transition-colors duration-300 md:text-lg dark:text-zinc-400">
              {content.description}
            </p>
            {content.benefits && (
              <ul className="reveal-item mb-10 space-y-3">
                {content.benefits.map((point, i) =>
                  point ? (
                    <li
                      key={i}
                      className="group flex cursor-default items-start gap-3 transition-all duration-300 hover:translate-x-1"
                    >
                      <div className="bg-brand/10 dark:bg-brand/20 group-hover:bg-brand dark:group-hover:bg-brand mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full transition-all duration-300 group-hover:scale-110">
                        <Check
                          className="text-brand dark:text-brand-300 h-3 w-3 transition-colors duration-300 group-hover:text-white"
                          strokeWidth={3}
                        />
                      </div>
                      <span className="text-clay group-hover:text-brand dark:group-hover:text-brand-400 text-base leading-relaxed font-medium transition-colors duration-300 md:text-lg dark:text-zinc-300">
                        {point}
                      </span>
                    </li>
                  ) : null
                )}
              </ul>
            )}
            {content.cta && (
              <div className="reveal-item flex flex-col items-start gap-4">
                <Link
                  href={content.cta.url}
                  className="group bg-brand relative h-12 w-full cursor-pointer overflow-hidden rounded-full px-10 text-sm font-bold tracking-widest text-white uppercase sm:w-auto md:h-14 md:px-30"
                >
                  <RollingLabel
                    rollingLabels={{
                      label1: content.cta.label,
                      label2: content.cta.hoverLabel || content.cta.label,
                    }}
                  />
                  <ArrowRight className="absolute top-1/2 right-4 origin-left -translate-y-1/2 scale-0 transform text-white transition-all duration-200 group-hover:scale-100" />
                </Link>
              </div>
            )}
          </div>

          {content.ticket && (
            <div className="reveal-item group perspective-1000 relative z-10 mx-auto w-full max-w-lg lg:max-w-none">
              <div className="bg-brand/20 dark:bg-brand/10 absolute top-1/2 left-1/2 -z-10 h-[102%] w-[101%] -translate-x-1/2 -translate-y-1/2 rounded-[2.5rem] opacity-0 blur-md transition-all duration-500 group-hover:opacity-100" />

              <div className="border-linen/50 hover:border-brand/30 dark:hover:border-brand/40 ease-in-out-expo dark:hover:shadow-brand/5 relative overflow-hidden rounded-4xl border-[3px] bg-white p-6 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-lg md:p-8 dark:border-zinc-800 dark:bg-zinc-900/90 dark:shadow-none dark:backdrop-blur-sm">
                {/* Ticket cutouts:
                  The bg color of these needs to match the parent section background (which is handled outside this component).
                  Added dark:bg-zinc-950 as a standard fallback assuming the parent is zinc-950, but adjust if your app background differs.
                */}
                <div className="bg-background border-linen/50 group-hover:border-brand/30 dark:group-hover:border-brand/40 absolute top-1/2 -left-6 z-20 h-12 w-12 -translate-y-1/2 rounded-full border-[3px] transition-colors duration-500 dark:border-zinc-800 dark:bg-zinc-950" />
                <div className="bg-background border-linen/50 group-hover:border-brand/30 dark:group-hover:border-brand/40 absolute top-1/2 -right-6 z-20 h-12 w-12 -translate-y-1/2 rounded-full border-[3px] transition-colors duration-500 dark:border-zinc-800 dark:bg-zinc-950" />

                <div className="border-linen/80 pointer-events-none absolute top-1/2 right-6 left-6 z-0 h-px border-t-2 border-dashed dark:border-zinc-700" />

                <div className="relative z-10">
                  <div className="mb-8 flex items-center justify-between md:mb-10">
                    <span className="text-clay text-xs font-bold tracking-wider uppercase transition-colors duration-300 md:text-sm dark:text-zinc-400">
                      {content.ticket.header}
                    </span>
                    <span className="bg-brand -rotate-2 transform cursor-default rounded-md border border-white/20 px-3 py-1 text-[10px] font-bold tracking-wide text-white uppercase shadow-sm transition-transform duration-300 group-hover:scale-105 group-hover:rotate-0 md:text-xs">
                      {content.ticket.badge}
                    </span>
                  </div>

                  <div className="relative mb-10 cursor-default text-center md:mb-14">
                    <div className="relative inline-block transition-all duration-300 group-hover:scale-105">
                      <span className="text-brand/5 dark:text-brand/20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-7xl font-black transition-colors duration-300 select-none md:text-8xl">
                        $
                      </span>
                      <div className="text-foreground group-hover:text-brand dark:group-hover:text-brand-400 relative z-10 mb-1 text-4xl font-black tracking-tight drop-shadow-sm transition-colors duration-300 dark:text-zinc-100 dark:drop-shadow-none">
                        {content.ticket.mainValue}
                      </div>
                    </div>
                    <div className="text-clay text-sm font-medium transition-colors duration-300 md:text-base dark:text-zinc-400">
                      {content.ticket.subLabel}
                    </div>
                  </div>

                  {content.ticket.breakdown && (
                    <div className="relative space-y-2 pt-2">
                      {content.ticket.breakdown.map((item, index) => (
                        <div
                          key={index}
                          className="hover:bg-brand/5 dark:hover:bg-brand/10 group/row hover:border-brand/10 dark:hover:border-brand/20 -mx-3 flex cursor-default items-center justify-between rounded-xl border border-transparent p-3 transition-all duration-300"
                        >
                          <span className="text-clay group-hover/row:text-foreground flex items-center gap-2 text-sm font-medium transition-colors duration-300 dark:text-zinc-400 dark:group-hover/row:text-zinc-200">
                            <div className="bg-brand/30 dark:bg-brand/40 group-hover/row:bg-brand h-1.5 w-1.5 rounded-full transition-colors duration-300" />
                            {item?.label}
                          </span>
                          <span className="text-foreground group-hover/row:text-brand dark:group-hover/row:text-brand-400 text-lg font-bold tabular-nums transition-all duration-300 group-hover/row:scale-105 dark:text-zinc-100">
                            {item?.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </RevealWrapper>
  );
};

export default AuditSection;

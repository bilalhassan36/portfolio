/**
 * File: src/app/(home)/_sections/HeroSection.tsx
 * Purpose: Hero section on the homepage. Renders greeting, name, role,
 *  optional highlighted description, CTAs and stats.
 * Component: Server component (renders on server).
 * Client-safe: Yes — no browser-only APIs used directly here.
 * Presentational: Yes
 *  (convert to client if `RollingLabel` requires browser APIs)
 * Key dependencies:
 *  - `next/link` : navigation for CTA links
 *  - `lucide-react` : icons (`ArrowDown`, `ArrowRight`)
 *  - `@/../tina/__generated__/types` : `HomepageQuery` type for content
 *  - `@/components/RollingLabel` : animated label used in CTAs
 * Notes:
 *  - Expects `content` shaped as `HomepageQuery["homepage"]["heroSection"]`.
 */
import Link from "next/link";

import { ArrowDown, ArrowRight } from "lucide-react";

import { type HomepageQuery } from "@/../tina/__generated__/types";
import RollingLabel from "@/components/RollingLabel";

interface HeroSectionProps {
  content: HomepageQuery["homepage"]["heroSection"];
}

const HeroSection = ({ content }: HeroSectionProps) => {
  if (!content) return null;

  return (
    <section
      id="heroSection"
      className="selection:bg-brand grid h-screen max-h-320 place-content-center font-sans selection:text-white"
    >
      <section className="flex flex-col items-center justify-center px-4 text-center md:px-6">
        <div className="mx-auto flex max-w-3xl flex-col items-center justify-center gap-4">
          <p className="text-sm font-medium italic md:text-base">
            {content.greeting}
          </p>

          <h1 className="text-4xl leading-[1.1] font-extrabold tracking-tight sm:text-5xl md:text-6xl">
            {content.name}
            <span className="text-brand">.</span>
          </h1>

          <h2 className="text-xl font-bold sm:text-2xl">{content.role}</h2>

          {/* Description with optional highlighted phrase */}
          {content.description &&
            (() => {
              const descriptionText = content.description?.text || "";
              const highlightPhrase = content.description?.highlight || "";
              const parts = descriptionText.split(highlightPhrase);

              return (
                <p className="max-w-xl text-sm leading-relaxed sm:text-base md:text-lg">
                  {parts[0]}
                  {parts.length > 1 && (
                    <span className="decoration-brand font-bold underline decoration-2 underline-offset-4">
                      {highlightPhrase}
                    </span>
                  )}
                  {parts[1]}
                </p>
              );
            })()}
        </div>

        {content.buttons && (
          <div className="mt-8 flex items-center gap-2 md:mt-10">
            <Link
              href={content.buttons.primary.url}
              className="group bg-brand relative flex w-full cursor-pointer items-center justify-center rounded-full px-12 py-5 text-sm font-semibold text-white transition-all duration-500 hover:px-24 sm:w-auto md:px-16 md:py-6 md:text-base md:hover:px-30"
            >
              <RollingLabel
                rollingLabels={{
                  label1: content.buttons.primary.label,
                  label2:
                    content.buttons.primary?.hoverLabel ||
                    content.buttons.primary.label,
                }}
              />
              <ArrowRight className="absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2 transform text-white opacity-0 transition-opacity group-hover:opacity-100" />
            </Link>

            <Link
              href={content.buttons.secondary.url}
              className="group border-clay/30 relative flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-full border bg-transparent px-16 py-5 text-sm font-semibold transition-all duration-500 hover:px-20 sm:w-auto md:px-20 md:py-6 md:text-base md:hover:px-26"
            >
              <RollingLabel
                rollingLabels={{
                  label1: content.buttons.secondary.label,
                  label2:
                    content.buttons.secondary.hoverLabel ||
                    content.buttons.secondary.label,
                }}
              />
              <ArrowDown className="absolute top-1/2 right-4 h-5 w-5 -translate-y-1/2 transform opacity-0 transition-opacity group-hover:opacity-100" />
            </Link>
          </div>
        )}

        {/* Optional stats grid */}
        {content.stats && (
          <div className="mt-12 grid w-full max-w-3xl grid-cols-3 gap-4 md:mt-16 md:gap-16">
            {content.stats.map((stat, index) => (
              <div key={index} className="flex flex-col gap-1 md:gap-2">
                <span className="text-2xl font-bold tabular-nums sm:text-3xl md:text-4xl">
                  {stat?.value}
                </span>
                <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase md:text-xs">
                  {stat?.label}
                </span>
              </div>
            ))}
          </div>
        )}
      </section>
    </section>
  );
};

export default HeroSection;

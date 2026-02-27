/**
 * @file HeroSection.tsx
 * @description Renders the Hero section on the homepage, displaying the greeting, name, role,
 * an optionally highlighted description, CTA buttons, and key statistics.
 * Designed as a Server Component.
 * @dependencies
 * - Types: `HomepageQuery` (TinaCMS generated)
 * - UI: `RevealWrapper`, `RollingLabel`, `ArrowRight` (Lucide), `ArrowUpRight` (Lucide)
 */
import Link from "next/link";

import { ArrowRight, ArrowUpRight } from "lucide-react";

import { type HomepageQuery } from "@/../tina/__generated__/types";
import { RevealWrapper } from "@/components/RevealWrapper";
import RollingLabel from "@/components/RollingLabel";

interface HeroSectionProps {
  content: HomepageQuery["homepage"]["heroSection"];
}

const HeroSection = ({ content }: HeroSectionProps) => {
  if (!content) return null;

  return (
    <RevealWrapper>
      <section
        id="heroSection"
        // Cascading base text color; background is untouched as requested.
        className="selection:bg-brand grid h-screen max-h-320 place-content-center font-sans text-zinc-900 transition-colors duration-300 selection:text-white dark:text-zinc-50"
      >
        <section className="flex flex-col items-center justify-center px-4 text-center md:px-6">
          <div className="mx-auto flex max-w-3xl flex-col items-center justify-center gap-4">
            <p className="reveal-item text-sm font-medium text-zinc-600 italic transition-colors duration-300 md:text-base dark:text-zinc-400">
              {content.greeting}
            </p>

            <h1 className="reveal-item text-4xl leading-[1.1] font-extrabold tracking-tight sm:text-5xl md:text-6xl">
              {content.name}
              <span className="text-brand">.</span>
            </h1>

            <h2 className="reveal-item text-xl font-bold sm:text-2xl">
              {content.role}
            </h2>

            {content.description &&
              (() => {
                const descriptionText = content.description?.text || "";
                const highlightPhrase = content.description?.highlight || "";
                const parts = descriptionText.split(highlightPhrase);

                return (
                  <p className="reveal-item max-w-xl text-sm leading-relaxed text-zinc-600 transition-colors duration-300 sm:text-base md:text-lg dark:text-zinc-400">
                    {parts[0]}
                    {parts.length > 1 && (
                      <span className="decoration-brand font-bold text-zinc-900 underline decoration-2 underline-offset-4 transition-colors duration-300 dark:text-zinc-50">
                        {highlightPhrase}
                      </span>
                    )}
                    {parts[1]}
                  </p>
                );
              })()}
          </div>

          {content.buttons && (
            <div className="reveal-item mt-8 flex items-center gap-2 md:mt-10">
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
                className="group border-clay/30 relative flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-full border bg-transparent px-16 py-5 text-sm font-semibold transition-all duration-500 hover:border-zinc-900 hover:px-20 sm:w-auto md:px-20 md:py-6 md:text-base md:hover:px-26 dark:border-zinc-700 dark:hover:border-zinc-400"
              >
                <RollingLabel
                  rollingLabels={{
                    label1: content.buttons.secondary.label,
                    label2:
                      content.buttons.secondary.hoverLabel ||
                      content.buttons.secondary.label,
                  }}
                />
                <ArrowUpRight className="absolute top-1/2 right-4 h-5 w-5 -translate-y-1/2 transform opacity-0 transition-opacity group-hover:opacity-100" />
              </Link>
            </div>
          )}

          {content.stats && (
            <div className="reveal-item mt-12 grid w-full max-w-3xl grid-cols-3 gap-4 md:mt-16 md:gap-16">
              {content.stats.map((stat, index) => (
                <div key={index} className="flex flex-col gap-1 md:gap-2">
                  <span className="text-2xl font-bold tabular-nums sm:text-3xl md:text-4xl">
                    {stat?.value}
                  </span>
                  <span className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase transition-colors duration-300 md:text-xs dark:text-zinc-400">
                    {stat?.label}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>
      </section>
    </RevealWrapper>
  );
};

export default HeroSection;

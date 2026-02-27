/**
 * @file PageHero.tsx
 * @description Standardized header block for sub-pages.
 * Orchestrates headline emphasis and supporting copy with a clean, centered layout.
 * @dependencies
 * - UI: `RevealWrapper`
 */
import { type PagesQuery } from "@/../tina/__generated__/types";
import { RevealWrapper } from "@/components/RevealWrapper";

interface Props {
  data: PagesQuery["pages"];
}

export const PageHero = ({ data }: Props) => {
  return (
    <RevealWrapper asChild>
      <div className="mb-10 flex cursor-default flex-col items-center gap-3 text-center transition-colors duration-300">
        <h2 className="reveal-item text-foreground max-w-xl text-3xl leading-tight font-extrabold tracking-tight transition-colors duration-300 sm:text-4xl md:text-5xl dark:text-zinc-50">
          {data.titleSimple}{" "}
          <span className="text-brand dark:text-brand-400">
            {data.titleHighlight}
          </span>
        </h2>

        {/* Supporting text: Mapped to a mid-range zinc for typographic hierarchy */}
        {data.supportingText && (
          <p className="reveal-item text-clay mx-auto max-w-lg text-sm leading-relaxed transition-colors duration-300 sm:text-base md:text-lg dark:text-zinc-400">
            {data.supportingText}
          </p>
        )}
      </div>
    </RevealWrapper>
  );
};

export default PageHero;

/**
 * @file SectionHeader.tsx
 * @description Standardized header for page sections.
 * Orchestrates an eyebrow label and a dual-toned headline with
 * theme-aware typographic scaling.
 */
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  content: {
    headlineMain: string;
    headlineHighlight: string;
    eyebrow: string;
  };
  animationClass?: string;
}

const SectionHeader = ({
  content: { headlineMain, headlineHighlight, eyebrow },
  animationClass = "",
}: SectionHeaderProps) => {
  return (
    <div className="flex flex-col gap-3 text-center transition-colors duration-300">
      {/* Eyebrow Label: Mapped to brand color for high visibility */}
      <span
        className={cn(
          "text-brand dark:text-brand-400 block text-xs font-bold tracking-widest uppercase md:text-sm",
          animationClass
        )}
      >
        {eyebrow}
      </span>

      {/* Primary Headline: High contrast Zinc for dark mode clarity */}
      <h2
        className={cn(
          "text-foreground text-3xl leading-tight font-black tracking-tight sm:text-4xl md:text-5xl dark:text-zinc-50",
          animationClass
        )}
      >
        {headlineMain}{" "}
        <span className="text-brand dark:text-brand-400">
          {headlineHighlight}
        </span>
      </h2>
    </div>
  );
};

export default SectionHeader;

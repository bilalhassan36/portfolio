/**
 * File: src/components/SectionHeader.tsx
 * Purpose: Small presentational header used across pages/sections. Renders
 * an eyebrow label and a headline with a highlighted portion.
 * Component: Presentational (pure)
 */
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
    <div className="flex flex-col gap-3 text-center">
      <span
        className={`text-brand block text-xs font-bold tracking-widest uppercase md:text-sm ${animationClass}`}
      >
        {eyebrow}
      </span>
      {/* Headline with an emphasized / brand-colored highlight */}
      <h2
        className={`text-foreground text-3xl leading-tight font-bold sm:text-4xl md:text-5xl ${animationClass}`}
      >
        {headlineMain} <span className="text-brand">{headlineHighlight}</span>
      </h2>
    </div>
  );
};

export default SectionHeader;

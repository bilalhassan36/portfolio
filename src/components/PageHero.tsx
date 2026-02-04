import { type PagesQuery } from "@/../tina/__generated__/types";

/**
 * File: src/components/PageHero.tsx
 * Purpose: Small hero/title block used across pages (title + highlight + text).
 * Component: Presentational (pure rendering)
 * Client-safe: Yes
 * Presentational: Yes
 * Key dependencies: None (simple props-driven UI)
 * Notes: Keeps markup minimal and accessible.
 */
interface Props {
  data: PagesQuery["pages"];
}

// Simple presentational component: renders a title with a highlighted part
const PageHero = ({ data }: Props) => {
  return (
    <div className="mb-10 flex cursor-default flex-col items-center gap-3 text-center">
      <h2 className="text-foreground max-w-xl text-3xl leading-tight font-extrabold tracking-tight sm:text-4xl md:text-5xl">
        {data.titleSimple}{" "}
        <span className="text-brand">{data.titleHighlight}</span>
      </h2>

      {/* Optional supporting text */}
      <p className="text-clay mx-auto max-w-lg text-sm leading-relaxed sm:text-base md:text-lg">
        {data.supportingText}
      </p>
    </div>
  );
};

export default PageHero;

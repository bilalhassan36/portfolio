/**
 * File: src/app/(home)/caseStudies/[id]/Timeline.tsx
 * Purpose: Small vertical timeline used on case study detail pages.
 * Component: `Timeline`
 * Client-safe: Yes — presentational only.
 * Presentational: Yes — renders three phases (challenge, strategy, results).
 * Key dependencies: `cn` utility from `@/lib/utils` for conditional class names.
 */
import { cn } from "@/lib/utils";

interface TimelineProps {
  challenge: string;
  solution: string;
  results: string;
}

export const Timeline = ({ challenge, solution, results }: TimelineProps) => {
  // Prepare the ordered phases displayed in the timeline
  const items = [
    {
      phase: "Challenge",
      content: challenge,
      color: "text-red-500",
      dot: "bg-red-500",
    },
    {
      phase: "Strategy",
      content: solution,
      color: "text-brand",
      dot: "bg-brand",
    },
    {
      phase: "Results",
      content: results,
      color: "text-emerald-600",
      dot: "bg-emerald-500",
    },
  ];

  return (
    <div className="space-y-0">
      {items.map((item, index) => (
        <div key={index} className="relative pb-12 pl-8 last:pb-0">
          {/* Vertical connector line (omit for last item) */}
          {index !== items.length - 1 && (
            <div className="bg-linen absolute top-2 bottom-0 left-1.25 w-px" />
          )}

          {/* Phase dot with outer ring */}
          <div
            className={cn(
              "ring-background absolute top-1.5 left-0 h-2.5 w-2.5 rounded-full ring-4",
              item.dot
            )}
          />

          <div>
            {/* Phase label */}
            <span
              className={cn(
                "mb-2 block text-xs font-bold tracking-wider uppercase",
                item.color
              )}
            >
              {item.phase}
            </span>

            {/* Content with fallback when missing */}
            <p className="text-clay text-sm leading-relaxed md:text-base">
              {item.content || "No details provided."}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

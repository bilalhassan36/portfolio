/**
 * @file Timeline.tsx
 * @description Renders a vertical, three-phase timeline (Challenge, Strategy, Results)
 * for the case study details page.
 * @dependencies
 * - Utils: `cn` (Tailwind class merging)
 */
import { cn } from "@/lib/utils";

interface TimelineProps {
  challenge: string;
  solution: string;
  results: string;
}

export const Timeline = ({ challenge, solution, results }: TimelineProps) => {
  // Injecting the dark mode text and background tokens directly into the data array
  const items = [
    {
      phase: "Challenge",
      content: challenge,
      color: "text-red-500 dark:text-red-400",
      dot: "bg-red-500 dark:bg-red-400",
    },
    {
      phase: "Strategy",
      content: solution,
      color: "text-brand dark:text-brand-400",
      dot: "bg-brand dark:bg-brand-400",
    },
    {
      phase: "Results",
      content: results,
      color: "text-emerald-600 dark:text-emerald-400",
      dot: "bg-emerald-500 dark:bg-emerald-400",
    },
  ];

  return (
    <div className="space-y-0">
      {items.map((item, index) => (
        <div key={index} className="relative pb-12 pl-8 last:pb-0">
          {index !== items.length - 1 && (
            <div className="bg-linen absolute top-2 bottom-0 left-1.25 w-px transition-colors duration-300 dark:bg-zinc-800" />
          )}

          <div
            className={cn(
              "ring-background absolute top-1.5 left-0 h-2.5 w-2.5 rounded-full ring-4 transition-colors duration-300",
              item.dot
            )}
          />

          <div>
            <span
              className={cn(
                "mb-2 block text-xs font-bold tracking-wider uppercase transition-colors duration-300",
                item.color
              )}
            >
              {item.phase}
            </span>

            <p className="text-clay text-sm leading-relaxed transition-colors duration-300 md:text-base dark:text-zinc-400">
              {item.content || "No details provided."}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

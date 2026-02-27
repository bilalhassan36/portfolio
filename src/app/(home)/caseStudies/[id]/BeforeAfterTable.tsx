/**
 * @file BeforeAfterTable.tsx
 * @description Renders a before/after metric comparison table for case study pages.
 * Designed as a purely presentational Server Component.
 * @dependencies
 * - UI: `ArrowRight` (Lucide icon)
 */
import { ArrowRight } from "lucide-react";

interface MetricRow {
  metric?: string | null;
  before?: string | null;
  after?: string | null;
}

interface BeforeAfterTableProps {
  data: (MetricRow | null)[];
}

export const BeforeAfterTable = ({ data }: BeforeAfterTableProps) => {
  return (
    <div className="border-linen bg-surface/30 dark:bg-linen/10 overflow-hidden rounded-xl border transition-colors duration-300 dark:border-zinc-800">
      {/* Table Header */}
      <div className="bg-surface dark:bg-linen/20 border-linen text-clay grid grid-cols-3 border-b p-4 text-xs font-bold tracking-wider uppercase transition-colors duration-300 dark:border-zinc-800 dark:text-white">
        <div>Metric</div>
        <div>Before</div>
        <div>After</div>
      </div>

      {/* Table Rows */}
      {data.map((row, index) => (
        <div
          key={index}
          // The hover state here is the only background modification to prevent invisible text in dark mode.
          className="border-linen grid grid-cols-3 border-b p-4 transition-colors duration-300 last:border-0 hover:bg-white dark:border-zinc-800 dark:hover:bg-white/5"
        >
          <div className="text-foreground text-sm font-medium transition-colors duration-300 dark:text-zinc-50">
            {row?.metric}
          </div>

          <div className="text-clay text-sm transition-colors duration-300 dark:text-zinc-400">
            {row?.before}
          </div>

          <div className="text-brand dark:text-brand-400 flex items-center gap-1 text-sm font-bold transition-colors duration-300">
            {row?.after}
            <ArrowRight className="ml-1 h-3 w-3 opacity-50" />
          </div>
        </div>
      ))}
    </div>
  );
};

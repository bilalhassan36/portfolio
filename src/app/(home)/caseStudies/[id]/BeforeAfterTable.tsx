/**
 * File: src/app/(home)/caseStudies/[id]/BeforeAfterTable.tsx
 * Purpose: Render a before/after metric table used in case study pages.
 * Component: Server
 * Client-safe: Yes — purely presentational (no hooks) and can be used in server or client components.
 * Presentational: Yes
 * Key dependencies: `lucide-react` (ArrowRight icon)
 */
import { ArrowRight } from "lucide-react";

// Use a partial type to handle potential nulls returned by the CMS/GraphQL
interface MetricRow {
  metric?: string | null;
  before?: string | null;
  after?: string | null;
}

export const BeforeAfterTable = ({ data }: { data: (MetricRow | null)[] }) => {
  return (
    <div className="border-linen bg-surface/30 overflow-hidden rounded-xl border">
      <div className="bg-surface border-linen text-clay grid grid-cols-3 border-b p-4 text-xs font-bold tracking-wider uppercase">
        <div>Metric</div>
        <div>Before</div>
        <div>After</div>
      </div>
      {data.map((row, index) => (
        <div
          key={index}
          className="border-linen grid grid-cols-3 border-b p-4 transition-colors last:border-0 hover:bg-white"
        >
          <div className="text-foreground text-sm font-medium">
            {row?.metric}
          </div>
          <div className="text-clay text-sm">{row?.before}</div>
          <div className="text-brand flex items-center gap-1 text-sm font-bold">
            {/* After value with subtle arrow indicating progression */}
            {row?.after}
            <ArrowRight className="ml-1 h-3 w-3 opacity-50" />
          </div>
        </div>
      ))}
    </div>
  );
};

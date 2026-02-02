import { cn } from "@/lib/utils";

interface RollingLabelProps {
  rollingLabels: {
    label1: string;
    label2?: string | null;
  };
  className?: string;
}

const RollingLabel = ({ rollingLabels, className = "" }: RollingLabelProps) => (
  <div
    className={cn(
      "pointer-events-none absolute inset-0 overflow-hidden",
      className
    )}
  >
    <div className="ease-in-out-expo flex h-[200%] w-full flex-col transition-transform duration-500 group-hover:-translate-y-1/2">
      <div className="flex h-1/2 w-full items-center justify-center whitespace-nowrap">
        {rollingLabels.label1}
      </div>
      <div className="flex h-1/2 w-full items-center justify-center whitespace-nowrap">
        {rollingLabels.label2 || rollingLabels.label1}
      </div>
    </div>
  </div>
);

export default RollingLabel;

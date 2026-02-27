/**
 * @file SubmitButton.tsx
 * @description Highly interactive form submission button.
 * Features a progress loading bar, success state confirmation, and
 * hover-triggered SVG animations.
 * @dependencies
 * - UI: `Check`, `Loader2`, `Send` (Lucide)
 * - Utils: `cn` (Tailwind class merging)
 */
"use client";

import { Check, Loader2, Send } from "lucide-react";

import { cn } from "@/lib/utils";

interface SubmitButtonProps {
  isSubmitting: boolean;
  isSuccess?: boolean;
  text?: string | null;
}

export const SubmitButton = ({
  isSubmitting,
  isSuccess = false,
  text,
}: SubmitButtonProps) => {
  return (
    <button
      type="submit"
      disabled={isSubmitting || isSuccess}
      className={cn(
        "group relative h-14 w-full overflow-hidden rounded-full px-8 transition-all duration-500 sm:w-auto sm:px-12",
        // Adapting the primary palette: Foreground/White to Zinc-50/Zinc-950 in dark mode
        "bg-foreground text-white shadow-xl shadow-black/5 dark:bg-zinc-50 dark:text-zinc-950 dark:shadow-none",
        !isSubmitting &&
          !isSuccess &&
          "hover:bg-brand dark:hover:bg-brand-400 hover:shadow-brand/20 hover:px-14 hover:text-white dark:hover:text-white",
        (isSubmitting || isSuccess) && "cursor-default px-14 opacity-100"
      )}
    >
      {/* Loading Progress Bar */}
      <div
        className={cn(
          "bg-brand/20 dark:bg-brand-400/20 absolute inset-0 origin-left transition-transform duration-[3s] ease-out",
          isSubmitting ? "scale-x-100" : "scale-x-0"
        )}
      />

      <div className="relative z-10 flex items-center justify-center gap-3 text-sm font-bold tracking-widest uppercase">
        {isSuccess ? (
          <>
            <span className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              Sent
            </span>
            {/* Success Icon: Adapting the white background to a light zinc in dark mode */}
            <div className="text-brand dark:text-brand-500 animate-in zoom-in flex h-5 w-5 items-center justify-center rounded-full bg-white duration-300 dark:bg-zinc-100">
              <Check className="h-3 w-3" strokeWidth={4} />
            </div>
          </>
        ) : isSubmitting ? (
          <>
            <span className="animate-pulse">Sending</span>
            <Loader2 className="h-4 w-4 animate-spin" />
          </>
        ) : (
          <>
            <span>{text || "Send Message"}</span>
            <div className="relative h-4 w-4 overflow-hidden">
              <Send className="absolute inset-0 h-4 w-4 transition-all duration-500 group-hover:translate-x-4 group-hover:-translate-y-4" />
              <Send className="absolute inset-0 h-4 w-4 -translate-x-4 translate-y-4 transition-all duration-500 group-hover:translate-x-0 group-hover:translate-y-0" />
            </div>
          </>
        )}
      </div>
    </button>
  );
};

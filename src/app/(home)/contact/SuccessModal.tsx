/**
 * @file SuccessModal.tsx
 * @description A high-prominence modal overlay triggered after successful form submission.
 * Manages body scroll-locking and features animated entry/exit transitions.
 * @dependencies
 * - UI: `CheckCircle2`, `X` (Lucide)
 * - Utils: `cn` (Tailwind class merging)
 */
"use client";

import { useEffect, useState } from "react";

import { CheckCircle2, X } from "lucide-react";

import { cn } from "@/lib/utils";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string | null;
  message?: string | null;
}

export const SuccessModal = ({
  isOpen,
  onClose,
  title,
  message,
}: SuccessModalProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setIsVisible(true), 0);
      document.body.style.overflow = "hidden";
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300);
      document.body.style.overflow = "unset";
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isVisible && !isOpen) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-100 flex items-center justify-center px-4 transition-all duration-300",
        // Enhanced backdrop: mapping to a deeper black in dark mode for better isolation
        isOpen
          ? "bg-foreground/40 backdrop-blur-sm dark:bg-black/60"
          : "pointer-events-none bg-transparent"
      )}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={cn(
          "border-linen relative flex w-full max-w-md flex-col items-center rounded-2xl border bg-white p-8 text-center shadow-2xl transition-all duration-500 dark:border-zinc-800 dark:bg-zinc-900 dark:shadow-none",
          isOpen
            ? "translate-y-0 scale-100 opacity-100"
            : "translate-y-8 scale-95 opacity-0"
        )}
      >
        <button
          onClick={onClose}
          className="text-clay hover:text-brand dark:hover:text-brand-400 absolute top-4 right-4 p-1 transition-colors duration-300 dark:text-zinc-500"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="bg-brand/10 dark:bg-brand-400/10 text-brand dark:text-brand-400 animate-in zoom-in mb-6 flex h-16 w-16 items-center justify-center rounded-full delay-100 duration-500">
          <CheckCircle2 className="h-8 w-8" strokeWidth={3} />
        </div>

        <h3 className="text-foreground mb-2 text-2xl font-black tracking-tight transition-colors duration-300 dark:text-zinc-50">
          {title || "Message Sent!"}
        </h3>

        <p className="text-clay mb-8 max-w-[80%] text-sm leading-relaxed transition-colors duration-300 dark:text-zinc-400">
          {message ||
            "Thanks for reaching out. I'll get back to you within 24 hours."}
        </p>

        <button
          onClick={onClose}
          className="bg-foreground hover:bg-brand dark:hover:bg-brand-400 w-full rounded-xl py-4 text-sm font-bold tracking-widest text-white uppercase shadow-lg shadow-black/5 transition-colors duration-300 hover:text-white dark:bg-zinc-50 dark:text-zinc-950 dark:shadow-none"
        >
          Close
        </button>
      </div>
    </div>
  );
};

/**
 * @file Container.tsx
 * @description The primary layout constraint for the application.
 * Defines the global max-width, horizontal gutters, and the baseline
 * background transition for the Dark Mode ecosystem.
 */
import { type ReactNode } from "react";

import { cn } from "@/lib/utils";

interface Props {
  children: ReactNode;
  className?: string;
}

/**
 * @component Container
 * @description Constrains content to a maximum width of 1280px (7xl) and
 * provides responsive horizontal padding.
 */
const Container = ({ children, className }: Props) => {
  return (
    <main
      className={cn(
        "mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8",
        "duration-500 ease-in-out",
        className
      )}
      aria-live="polite"
    >
      {children}
    </main>
  );
};

export default Container;

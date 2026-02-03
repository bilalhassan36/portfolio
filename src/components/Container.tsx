/**
 * File: src/components/Container.tsx
 * Purpose: Layout wrapper that constrains content width and applies padding.
 * Component: Client/Server-safe presentational component.
 * Client-safe: Yes
 * Presentational: Yes
 * Key dependencies: React types (`ReactNode`)
 * Notes: Adds `aria-live="polite"` to assistive technologies when content
 *  updates are delivered to this region.
 */
import { type ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

// Simple wrapper to apply consistent max-width and horizontal padding
const Container = ({ children, className = "" }: Props) => {
  return (
    <main
      className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}
      aria-live="polite"
    >
      {children}
    </main>
  );
};

export default Container;

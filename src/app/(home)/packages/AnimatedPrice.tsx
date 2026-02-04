/**
 * File: src/app/(home)/packages/AnimatedPrice.tsx
 * Purpose: Animate numeric price changes using GSAP for a smooth counting effect.
 * Component: Client (uses `useLayoutEffect` and direct DOM updates)
 * Client-safe: Yes
 * Presentational: Yes (visual only)
 * Key dependencies:
 *  - `gsap`: animation engine for tweening counter values
 */

"use client";

import { useLayoutEffect, useRef } from "react";

import gsap from "gsap";

interface AnimatedPriceProps {
  price: string;
  period: string;
}

export const AnimatedPrice = ({ price, period }: AnimatedPriceProps) => {
  const priceRef = useRef<HTMLSpanElement>(null);

  // Parse numeric value for animation (strip non-numeric chars except period)
  const numericValue = parseFloat(price.replace(/[^0-9.]/g, ""));

  // Use a ref to hold the animated counter value to avoid React re-renders
  const counter = useRef({ val: isNaN(numericValue) ? 0 : numericValue });

  useLayoutEffect(() => {
    const el = priceRef.current;
    if (!el || isNaN(numericValue)) return;

    // Tween the `counter.current.val` to the target numericValue and update DOM
    gsap.to(counter.current, {
      val: numericValue,
      duration: 0.6,
      ease: "power4.out",
      onUpdate: () => {
        // Direct DOM manipulation for high-performance counting
        el.innerText = `$${Math.round(counter.current.val).toLocaleString()}`;
      },
    });
  }, [numericValue]);

  return (
    <div className="flex items-baseline justify-center gap-1 overflow-hidden">
      <span
        ref={priceRef}
        className="text-foreground cursor-default text-2xl font-extrabold tracking-tight tabular-nums will-change-contents sm:text-3xl md:text-4xl"
      >
        {price}
      </span>
      {/* show period suffix only when price is numeric */}
      {!isNaN(numericValue) && (
        <span className="text-clay cursor-default text-[10px] font-bold tracking-wide uppercase sm:text-xs">
          {period}
        </span>
      )}
    </div>
  );
};

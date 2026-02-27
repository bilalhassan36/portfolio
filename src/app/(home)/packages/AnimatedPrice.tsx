/**
 * @file AnimatedPrice.tsx
 * @description A high-performance pricing display that uses GSAP to animate
 * numeric transitions. Employs direct DOM manipulation to bypass React
 * reconciliation for smooth, 60fps counting effects.
 * @dependencies
 * - gsap: Core animation engine
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

  // Ref-based counter prevents unnecessary React re-renders during the tween
  const counter = useRef({ val: isNaN(numericValue) ? 0 : numericValue });

  useLayoutEffect(() => {
    const el = priceRef.current;
    if (!el || isNaN(numericValue)) return;

    gsap.to(counter.current, {
      val: numericValue,
      duration: 0.8, // Slightly increased duration for a more luxurious ease
      ease: "power4.out",
      onUpdate: () => {
        // Direct DOM update for performance
        el.innerText = `$${Math.round(counter.current.val).toLocaleString()}`;
      },
    });
  }, [numericValue]);

  return (
    <div className="flex items-baseline justify-center gap-1 overflow-hidden transition-colors duration-300">
      <span
        ref={priceRef}
        className="text-foreground cursor-default text-2xl font-extrabold tracking-tight tabular-nums transition-colors duration-300 will-change-contents sm:text-3xl md:text-4xl dark:text-zinc-50"
      >
        {price}
      </span>

      {!isNaN(numericValue) && (
        <span className="text-clay cursor-default text-[10px] font-bold tracking-wide uppercase transition-colors duration-300 sm:text-xs dark:text-zinc-500">
          {period}
        </span>
      )}
    </div>
  );
};

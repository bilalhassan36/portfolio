/**
 * File: src/lib/utils.ts
 * Purpose: Small utility helpers shared across the app.
 * Exports:
 *  - `cn` : merge className values using `clsx` then dedupe with `twMerge`.
 * Notes: Isomorphic utility — safe to use in server and client code.
 */
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge arbitrary `clsx`-compatible values and normalize Tailwind classes.
 * @param inputs - class values (strings, arrays, objects) accepted by `clsx`
 * @returns a single, merged className string with Tailwind class conflicts resolved
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// src/utils/formatSlug.ts

export const formatSlug = (text: string): string => {
  if (!text) return "";

  return text.toLowerCase().replace(/ /g, "-");
};

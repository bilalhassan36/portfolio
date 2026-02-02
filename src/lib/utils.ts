/**
 * @file utils.ts
 * @description Global utility functions.
 * @dependencies clsx, tailwind-merge
 */
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges Tailwind CSS classes intelligently.
 * * @param inputs - List of class names, arrays, or conditional objects.
 * @returns A single string with merged classes (resolving conflicts like p-4 vs p-8).
 * * @example
 * cn("p-4", isActive && "bg-blue-500", "p-8") // Returns "bg-blue-500 p-8"
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

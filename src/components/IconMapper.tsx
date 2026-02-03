/**
 * File: src/components/IconMapper.tsx
 * Purpose: Resolve a social platform name to a Lucide icon component.
 * Component: N/A
 * Client-safe: Yes
 * Presentational: N/A
 * Key dependencies:
 *  - `lucide-react` for icon components and `LucideIcon` type.
 * Notes: Normalizes platform names and falls back to `Globe` if unknown.
 */
import {
  Facebook,
  Github,
  Globe,
  Instagram,
  Linkedin,
  type LucideIcon,
  Mail,
  Twitter,
  Youtube,
} from "lucide-react";

// Map normalized platform keys to Lucide icon components
const iconMap: Record<string, LucideIcon> = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  x: Twitter,
  instagram: Instagram,
  facebook: Facebook,
  youtube: Youtube,
  email: Mail,
  website: Globe,
};

// Return the icon component for `platformName` or `Globe` as fallback
export const getSocialIcon = (platformName: string) => {
  const key = platformName?.toLowerCase().trim();
  return iconMap[key] || Globe;
};

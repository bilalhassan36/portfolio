"use client";

/**
 * File: src/components/MobileMenu.tsx
 * Purpose: Mobile navigation drawer for small screens.
 * Component: Client component (UI interactions + DOM side-effects)
 * Client-safe: No — manipulates `document` and uses browser APIs
 * Presentational: Yes (UI wrapper + navigation logic)
 * Key dependencies:
 *  - `react` for hooks
 *  - `next/link` for navigation
 *  - `lucide-react` for the close icon
 *  - Tina types for `navLinks` and `socials` shapes
 * Notes: Locks scroll when open and renders nav links + socials.
 */
import React, { useEffect } from "react";

import Link from "next/link";

import { X } from "lucide-react";

import {
  type GlobalQuery,
  type PersonQuery,
} from "@/../tina/__generated__/types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  navLinks: GlobalQuery["global"]["navLinks"];
  socials: PersonQuery["person"]["socials"];
}

const MobileMenu: React.FC<Props> = ({
  isOpen,
  onClose,
  navLinks,
  socials,
}) => {
  // Lock page scroll while the menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!socials) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-hidden={!isOpen}
      className={`bg-background fixed -top-full left-0 z-50 flex h-screen w-full flex-col justify-between p-8 transition-all duration-1000 ease-in-out md:hidden ${
        isOpen ? "visible translate-y-full" : "invisible"
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between pt-4">
        <div className="flex flex-col gap-1">
          <p className="text-[10px] font-bold tracking-[0.3em] text-black/40 uppercase">
            Navigation
          </p>
          <div className="h-px w-8 bg-black/20" />
        </div>

        <button
          onClick={onClose}
          aria-label="Close Menu"
          className="group flex h-14 w-14 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-black shadow-xl"
        >
          <X
            size={24}
            strokeWidth={1.5}
            className="relative z-10 text-white transition-transform duration-500 group-hover:rotate-90"
          />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-4">
        {navLinks.map((link) => (
          <div key={link.label} className="overflow-hidden">
            <Link href={link.href}>
              <button
                onClick={onClose}
                className="hover:text-brand ease-in-out-expo block cursor-pointer text-5xl leading-[0.85] font-bold tracking-tighter uppercase transition-all duration-500 hover:translate-x-4"
              >
                {link.label}
              </button>
            </Link>
          </div>
        ))}
      </nav>

      {/* Socials */}
      <div className="flex items-end justify-between border-t border-black/10 pt-10 pb-4">
        <div className="flex flex-col gap-4">
          <p className="text-[10px] font-bold tracking-[0.3em] text-black/40 uppercase">
            Socials
          </p>
          <div className="flex flex-wrap gap-x-8 gap-y-2 text-xs font-bold tracking-wide uppercase">
            {socials.map((social) => (
              <a
                key={social!.platform}
                href={social!.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                className="hover:text-brand ease-in-out-expo decoration-2 transition-all duration-300 hover:-translate-y-1"
              >
                {social!.platform}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;

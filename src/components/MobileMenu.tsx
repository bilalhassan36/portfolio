"use client";

/**
 * File: src/components/MobileMenu.tsx
 * Purpose: Mobile navigation drawer for small screens.
 * Component: Client component (UI interactions + DOM side-effects)
 * Client-safe: No — manipulates `document` and uses browser APIs
 * Presentational: Yes (UI wrapper + navigation logic)
 * Key dependencies:
 * - `react` for hooks
 * - `next/link` for navigation
 * - `lucide-react` for the close icon
 * - `gsap` & `@gsap/react` for complex animation choreography
 * - Tina types for `navLinks` and `socials` shapes
 */
import React, { useEffect, useRef } from "react";

import Link from "next/link";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { X } from "lucide-react";

import {
  type GlobalQuery,
  type PeopleQuery,
} from "@/../tina/__generated__/types";

// Register GSAP plugins to prevent tree-shaking issues
if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  navLinks: GlobalQuery["global"]["navLinks"];
  socials: PeopleQuery["people"]["socials"];
}

const MobileMenu: React.FC<Props> = ({
  isOpen,
  onClose,
  navLinks,
  socials,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  // 1. Setup GSAP Timeline and Initial States
  useGSAP(
    () => {
      // Set initial states to prevent FOUC (Flash of Unstyled Content)
      gsap.set(containerRef.current, { yPercent: -100, autoAlpha: 0 });
      gsap.set(".menu-header", { autoAlpha: 0, y: -20 });
      gsap.set(".nav-link-inner", { yPercent: 120 }); // Pushed down for mask reveal
      gsap.set(".social-link", { autoAlpha: 0, y: 20 });

      // Build the paused timeline
      tl.current = gsap
        .timeline({ paused: true })
        // Slide in the main container
        .to(containerRef.current, {
          yPercent: 0,
          autoAlpha: 1,
          duration: 0.7,
          ease: "power4.inOut",
        })
        // Fade/slide down the header
        .to(
          ".menu-header",
          { autoAlpha: 1, y: 0, duration: 0.4, ease: "power2.out" },
          "-=0.2" // Overlap with container animation
        )
        // Stagger the navigation links up from behind their hidden overflow mask
        .to(
          ".nav-link-inner",
          {
            yPercent: 0,
            stagger: 0.08,
            duration: 0.6,
            ease: "power4.out",
          },
          "-=0.3"
        )
        // Stagger in the social links
        .to(
          ".social-link",
          {
            autoAlpha: 1,
            y: 0,
            stagger: 0.05,
            duration: 0.4,
            ease: "power3.out",
          },
          "-=0.4"
        );
    },
    { scope: containerRef } // Scope all selector strings strictly to this component
  );

  // 2. Play or Reverse Timeline based on `isOpen` prop
  useEffect(() => {
    if (isOpen) {
      tl.current?.timeScale(1).play();
    } else {
      // Speed up the reverse animation slightly for a snappier close
      tl.current?.timeScale(1.5).reverse();
    }
  }, [isOpen]);

  // 3. Lock page scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!socials) return null;

  return (
    <div
      ref={containerRef}
      role="dialog"
      aria-modal="true"
      aria-hidden={!isOpen}
      // Removed standard CSS transitions. GSAP handles visibility and transform now.
      className="bg-background invisible fixed inset-0 z-50 flex h-screen w-full flex-col justify-between p-8 md:hidden"
    >
      {/* Header */}
      <div className="menu-header flex items-start justify-between pt-4">
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
          // The outer div acts as the mask (overflow-hidden)
          <div key={link.label} className="overflow-hidden p-1">
            {/* The inner div is what GSAP actually animates (translates up) */}
            <div className="nav-link-inner block">
              <Link
                href={link.href}
                onClick={onClose}
                // Removed the nested <button>. Next.js links handle clicks natively.
                className="hover:text-brand ease-in-out-expo block cursor-pointer text-5xl leading-[0.85] font-bold tracking-tighter uppercase transition-colors duration-500 hover:translate-x-4"
              >
                {link.label}
              </Link>
            </div>
          </div>
        ))}
      </nav>

      {/* Socials */}
      <div className="flex items-end justify-between border-t border-black/10 pt-10 pb-4">
        <div className="flex flex-col gap-4">
          <p className="menu-header text-[10px] font-bold tracking-[0.3em] text-black/40 uppercase">
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
                className="social-link hover:text-brand ease-in-out-expo block decoration-2 transition-all duration-300 hover:-translate-y-1"
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

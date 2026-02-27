/**
 * @file MobileMenu.tsx
 * @description Immersive mobile navigation drawer. Uses GSAP for high-performance
 * transform/opacity choreography and scroll-locking for UX consistency.
 * @dependencies
 * - gsap & @gsap/react: Animation timeline management
 * - UI: `X` (Lucide)
 */
"use client";

import React, { useEffect, useRef } from "react";

import Link from "next/link";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { X } from "lucide-react";

import {
  type GlobalQuery,
  type PeopleQuery,
} from "@/../tina/__generated__/types";

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

  useGSAP(
    () => {
      gsap.set(containerRef.current, { yPercent: -100, autoAlpha: 0 });
      gsap.set(".menu-header", { autoAlpha: 0, y: -20 });
      gsap.set(".nav-link-inner", { yPercent: 120 });
      gsap.set(".social-link", { autoAlpha: 0, y: 20 });

      tl.current = gsap
        .timeline({ paused: true })
        .to(containerRef.current, {
          yPercent: 0,
          autoAlpha: 1,
          duration: 0.7,
          ease: "power4.inOut",
        })
        .to(
          ".menu-header",
          { autoAlpha: 1, y: 0, duration: 0.4, ease: "power2.out" },
          "-=0.2"
        )
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
    { scope: containerRef }
  );

  useEffect(() => {
    if (isOpen) {
      tl.current?.timeScale(1).play();
    } else {
      tl.current?.timeScale(1.5).reverse();
    }
  }, [isOpen]);

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
      className="bg-background invisible fixed inset-0 z-50 flex h-screen w-full flex-col justify-between p-8 transition-colors duration-300 md:hidden dark:bg-zinc-950"
    >
      {/* Header */}
      <div className="menu-header flex items-start justify-between pt-4">
        <div className="flex flex-col gap-1">
          <p className="text-[10px] font-bold tracking-[0.3em] text-black/40 uppercase transition-colors duration-300 dark:text-zinc-500">
            Navigation
          </p>
          <div className="h-px w-8 bg-black/20 transition-colors duration-300 dark:bg-zinc-800" />
        </div>

        <button
          onClick={onClose}
          aria-label="Close Menu"
          className="group flex h-14 w-14 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-black shadow-xl transition-all duration-300 active:scale-90 dark:bg-zinc-50"
        >
          <X
            size={24}
            strokeWidth={1.5}
            className="relative z-10 text-white transition-transform duration-500 group-hover:rotate-90 dark:text-zinc-950"
          />
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col gap-4">
        {navLinks.map((link) => (
          <div key={link.label} className="overflow-hidden p-1">
            <div className="nav-link-inner block">
              <Link
                href={link.href}
                onClick={onClose}
                className="text-foreground hover:text-brand dark:hover:text-brand-400 ease-in-out-expo block cursor-pointer text-5xl leading-[0.85] font-bold tracking-tighter uppercase transition-all duration-500 hover:translate-x-4 dark:text-zinc-50"
              >
                {link.label}
              </Link>
            </div>
          </div>
        ))}
      </nav>

      {/* Social Links Footer */}
      <div className="flex items-end justify-between border-t border-black/10 pt-10 pb-4 transition-colors duration-300 dark:border-zinc-800">
        <div className="flex w-full flex-col gap-4">
          <p className="menu-header text-[10px] font-bold tracking-[0.3em] text-black/40 uppercase transition-colors duration-300 dark:text-zinc-500">
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
                className="social-link text-foreground hover:text-brand dark:hover:text-brand-400 ease-in-out-expo block transition-all duration-300 hover:-translate-y-1 dark:text-zinc-400"
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

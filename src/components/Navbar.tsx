"use client";

/**
 * File: src/components/Navbar.tsx
 * Purpose: Site navigation — logo, desktop links, CTA and mobile menu trigger.
 * Component: Client component (uses scroll listeners and DOM state)
 * Client-safe: No — uses `window`/`document` APIs
 * Presentational: No — includes interaction/state
 * Key dependencies:
 *  - `next/navigation` (`usePathname`) for active link detection
 *  - `tinacms/react` (`useTina`) for live-edit preview of nav content
 *  - `RollingLabel`, `MobileMenu` for UI pieces
 * Notes: Listens to scroll to toggle background and visibility; mobile menu
 *  opens client-side.
 */
import { useEffect, useRef, useState } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { useTina } from "tinacms/react";

import type client from "@/../tina/__generated__/client";
import { type PeopleQuery } from "@/../tina/__generated__/types";
import RollingLabel from "@/components/RollingLabel";

import MobileMenu from "./MobileMenu";

type globalResponse = Awaited<ReturnType<typeof client.queries.global>>;
type navbarResponse = Awaited<ReturnType<typeof client.queries.navbar>>;

interface NavbarProps {
  globalResponse: globalResponse;
  navbarResponse: navbarResponse;
  socials: PeopleQuery["people"]["socials"];
}

const Navbar: React.FC<NavbarProps> = ({
  globalResponse,
  navbarResponse,
  socials,
}) => {
  const pathname = usePathname() || "/";

  const { data: globalData } = useTina({
    query: globalResponse.query,
    variables: globalResponse.variables,
    data: globalResponse.data,
  });

  const { data: navbarData } = useTina({
    query: navbarResponse.query,
    variables: navbarResponse.variables,
    data: navbarResponse.data,
  });

  const navLinks = globalData.global.navLinks;

  const header = {
    cta: navbarData.navbar.cta,
    logoText: navbarData.navbar.logoText,
  };

  // State
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const container = useRef<HTMLElement | null>(null);
  const lastScrollY = useRef<number>(0);

  const initialVisibilityClass = "opacity-100";

  // Toggle nav background & visibility based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // background when scrolled past threshold
      setIsScrolled(currentScrollY > 50);

      // hide on scroll down, show on scroll up
      if (currentScrollY < 10) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY.current) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        id="navbar"
        ref={container}
        className={`fixed top-0 left-0 z-50 w-full px-4 transition-all duration-500 ease-in-out sm:px-6 lg:px-8 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        } ${
          isScrolled
            ? "bg-background/80 py-3 shadow-sm backdrop-blur-md md:py-4"
            : "bg-transparent py-6 md:py-8"
        }`}
      >
        <div className="container mx-auto flex items-center justify-between">
          {/* --- Logo --- */}
          <div
            className={`nav-reveal relative shrink-0 ${initialVisibilityClass}`}
          >
            <Link
              href="/"
              className="block text-2xl font-black tracking-tight text-black"
            >
              {header.logoText}
              <span className="text-brand">.</span>
            </Link>
          </div>

          {/* --- Desktop Links --- */}
          {navLinks && (
            <ul className="hidden items-center gap-1 md:flex lg:gap-2">
              {navLinks!.map((link) => {
                // Check active state
                const isActive =
                  pathname === link.href ||
                  (link.href !== "/" && pathname.startsWith(link.href));

                return (
                  <li
                    key={link.label}
                    className={`nav-reveal relative text-center ${initialVisibilityClass}`}
                  >
                    <Link
                      href={link.href}
                      className={`group relative block h-8 overflow-hidden px-12 duration-500 ${
                        isActive && "text-brand"
                      }`}
                    >
                      <RollingLabel
                        rollingLabels={{
                          label1: link.label,
                        }}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}

          {/* --- CTA Button (Desktop) --- */}
          {header.cta && (
            <div
              className={`nav-reveal relative hidden shrink-0 md:block ${initialVisibilityClass}`}
            >
              <Link href={header.cta.href || "/contact"}>
                <button className="group bg-brand relative h-12 cursor-pointer overflow-hidden rounded-full px-18 text-xs font-bold tracking-widest text-white uppercase">
                  <RollingLabel
                    rollingLabels={{
                      label1: header.cta.label,
                      label2: header.cta.hoverLabel || header.cta.label,
                    }}
                  />
                </button>
              </Link>
            </div>
          )}

          {/* --- Mobile Hamburger Trigger --- */}
          <button
            onClick={() => setIsOpen(true)}
            className={`group nav-reveal relative flex cursor-pointer flex-col items-end gap-2 p-3 md:hidden ${initialVisibilityClass}`}
            aria-label="Open Menu"
          >
            <svg
              width="32"
              height="18"
              viewBox="0 0 32 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="overflow-visible"
            >
              {/* Top Line */}
              <line
                x1="12"
                y1="2"
                x2="32"
                y2="2"
                stroke="black"
                strokeWidth="1.5"
                strokeLinecap="round"
                className="ease-in-out-expo group-hover:x1-0 transition-all duration-500"
              />
              {/* Middle Line */}
              <line
                x1="0"
                y1="9"
                x2="32"
                y2="9"
                stroke="black"
                strokeWidth="1.5"
                strokeLinecap="round"
                className="ease-in-out-expo group-hover:x1-8 transition-all duration-500"
              />
              {/* Bottom Line */}
              <line
                x1="20"
                y1="16"
                x2="32"
                y2="16"
                stroke="black"
                strokeWidth="1.5"
                strokeLinecap="round"
                className="ease-in-out-expo group-hover:x1-0 transition-all duration-500"
              />
            </svg>
          </button>
        </div>
      </nav>

      {/* --- Mobile Menu --- */}
      <MobileMenu
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        navLinks={navLinks}
        socials={socials}
      />
    </>
  );
};

export default Navbar;

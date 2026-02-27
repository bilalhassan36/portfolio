/**
 * @file Navbar.tsx
 * @description Global navigation controller. Handles scroll-based visibility,
 * active link detection, and theme-aware styling for the site-wide header.
 * @dependencies
 * - UI: `RollingLabel`, `MobileMenu`, `MobileMenuTrigger` (SVG)
 * - TinaCMS: `useTina` for real-time header content updates
 */
"use client";

import { useEffect, useRef, useState } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { useTina } from "tinacms/react";

import type client from "@/../tina/__generated__/client";
import { type PeopleQuery } from "@/../tina/__generated__/types";
import RollingLabel from "@/components/RollingLabel";
import { cn } from "@/lib/utils";

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

  const { data: globalData } = useTina({ ...globalResponse });
  const { data: navbarData } = useTina({ ...navbarResponse });

  const navLinks = globalData.global.navLinks;
  const header = {
    cta: navbarData.navbar.cta,
    logoText: navbarData.navbar.logoText,
  };

  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const container = useRef<HTMLElement | null>(null);
  const lastScrollY = useRef<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);

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
        className={cn(
          "fixed top-0 left-0 z-50 w-full px-4 transition-all duration-500 ease-in-out sm:px-6 lg:px-8",
          isVisible ? "translate-y-0" : "-translate-y-full",
          isScrolled
            ? "bg-white/80 py-3 shadow-sm backdrop-blur-md md:py-4 dark:border-white/5 dark:bg-zinc-950/50"
            : "bg-transparent py-6 md:py-8"
        )}
      >
        <div className="container mx-auto flex items-center justify-between">
          {/* --- Logo --- */}
          <div className="nav-reveal relative shrink-0 opacity-100">
            <Link
              href="/"
              className="block text-2xl font-black tracking-tight text-zinc-950 dark:text-zinc-50"
            >
              {header.logoText}
              <span className="text-brand">.</span>
            </Link>
          </div>

          {/* --- Desktop Links --- */}
          {navLinks && (
            <ul className="hidden items-center gap-1 lg:flex lg:gap-2">
              {navLinks.map((link) => {
                const isActive =
                  pathname === link.href ||
                  (link.href !== "/" && pathname.startsWith(link.href));

                return (
                  <li
                    key={link.label}
                    className="nav-reveal relative text-center opacity-100"
                  >
                    <Link
                      href={link.href}
                      className={cn(
                        "group hover:text-brand dark:hover:text-brand-400 relative block h-8 overflow-hidden px-12 text-zinc-600 transition-colors duration-500 dark:text-zinc-100",
                        isActive && "text-brand dark:text-brand-400"
                      )}
                    >
                      <RollingLabel rollingLabels={{ label1: link.label }} />
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}

          {/* --- CTA Button --- */}
          {header.cta && (
            <div className="nav-reveal relative hidden shrink-0 opacity-100 lg:block">
              <Link href={header.cta.href || "/contact"}>
                <button className="group bg-brand dark:bg-brand-500 shadow-brand/20 relative h-12 cursor-pointer overflow-hidden rounded-full px-18 text-xs font-bold tracking-widest text-white uppercase shadow-lg transition-all duration-300 active:scale-95 dark:text-zinc-100">
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
            className="group nav-reveal relative flex cursor-pointer flex-col items-end gap-2 p-3 opacity-100 transition-colors lg:hidden"
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
              <line
                x1="12"
                y1="2"
                x2="32"
                y2="2"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                className="ease-in-out-expo text-zinc-950 transition-all duration-500 group-hover:-translate-x-3 dark:text-zinc-50"
              />
              <line
                x1="0"
                y1="9"
                x2="32"
                y2="9"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                className="ease-in-out-expo text-zinc-950 transition-all duration-500 group-hover:translate-x-2 dark:text-zinc-50"
              />
              <line
                x1="20"
                y1="16"
                x2="32"
                y2="16"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                className="ease-in-out-expo text-zinc-950 transition-all duration-500 group-hover:-translate-x-5 dark:text-zinc-50"
              />
            </svg>
          </button>
        </div>
      </nav>

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

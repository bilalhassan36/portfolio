"use client";

/**
 * File: src/components/Footer.tsx
 * Purpose: Footer UI — renders bio, socials, navigation, expertise and bottom bar.
 * Component: Client component (uses `useTina` for live edits and browser links)
 * Client-safe: Yes
 * Presentational: Yes
 * Key dependencies:
 *  - `next/link` for navigation
 *  - `lucide-react` for icons
 *  - `tinacms` (`useTina`) for live-edit preview
 *  - `@/../tina/__generated__/client` types for query responses
 *  - `./IconMapper` to resolve social icons
 * Notes: Expects TinaCMS query responses for `footer`, `person`, and `global`.
 */
import Link from "next/link";

import { ArrowUpRight } from "lucide-react";
import { useTina } from "tinacms/dist/react";

import type client from "@/../tina/__generated__/client";

import { getSocialIcon } from "./IconMapper";

type footerResponse = Awaited<ReturnType<typeof client.queries.footer>>;
type peopleResponse = Awaited<ReturnType<typeof client.queries.people>>;
type globalResponse = Awaited<ReturnType<typeof client.queries.global>>;

interface FooterProps {
  footerResponse: footerResponse;
  peopleResponse: peopleResponse;
  globalResponse: globalResponse;
}

export const Footer = ({
  footerResponse,
  peopleResponse,
  globalResponse,
}: FooterProps) => {
  // Live-edit enabled footer data (TinaCMS)
  const { data: footerData } = useTina({
    query: footerResponse.query,
    variables: footerResponse.variables,
    data: footerResponse.data,
  });

  const { copyrightText, tagline } = footerData.footer;

  // Normalize person data
  const person = {
    name: peopleResponse.data.people.identity.name,
    bio: peopleResponse.data.people.bio?.[0]?.text || "",
    skills: peopleResponse.data.people.skills,
    socials: peopleResponse.data.people.socials,
  };

  const {
    data: {
      global: { navLinks: links },
    },
  } = globalResponse;

  return (
    <footer
      id="footer"
      className="bg-background overflow-hidden border-t border-black/10 py-16"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 grid gap-10 md:grid-cols-4">
          {/* --- COLUMN 1: Bio & Socials --- */}
          <div className="md:col-span-2">
            <Link
              href="/"
              className="text-foreground group inline-block text-2xl font-black transition-transform duration-300 hover:scale-105"
            >
              {person.name}
              <span className="text-brand group-hover:text-foreground transition-colors duration-300">
                .
              </span>
            </Link>

            <p className="text-foreground mt-4 max-w-sm text-sm leading-relaxed">
              {person.bio ||
                "Amazon Brand Manager helping sellers transform advertising from a cost center into a profit engine."}
            </p>

            {person.socials && person.socials.length > 0 && (
              <div className="mt-6 flex items-center gap-3">
                {person.socials.map((item, i: number) => {
                  // skip empty entries
                  if (!item || !item.platform) return null;

                  const Icon = getSocialIcon(item.platform);

                  const finalHref =
                    item.platform === "Email" && !item.url.startsWith("mailto:")
                      ? `mailto:${item.url}`
                      : item.url;

                  return (
                    <a
                      key={i}
                      href={finalHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={item.platform}
                      className="text-foreground hover:bg-brand border-linen hover:text-background rounded-lg border p-2 transition-colors duration-300"
                    >
                      <Icon
                        size={18}
                        className="transition-transform duration-300 group-hover:scale-110"
                      />
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          {/* --- COLUMN 2: Navigation --- */}
          <div>
            <h4 className="text-foreground mb-6 text-xs font-bold tracking-wider uppercase">
              Navigation
            </h4>
            <ul className="space-y-3">
              {links?.map((link) => (
                <li key={link?.label}>
                  <Link
                    href={link.href}
                    className="text-foreground hover:text-brand group inline-flex items-center gap-1 text-sm font-medium transition-all duration-300 hover:translate-x-1"
                  >
                    {link?.label}
                    <ArrowUpRight className="h-3 w-3 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* --- COLUMN 3: Expertise --- */}
          <div>
            <h4 className="text-foreground mb-6 text-xs font-bold tracking-wider uppercase">
              Expertise
            </h4>
            <ul className="space-y-3">
              {person.skills?.slice(0, 6).map((item, index) =>
                item ? (
                  <li key={index}>
                    <span className="text-foreground hover:text-brand block cursor-default text-sm transition-all duration-300 hover:translate-x-1">
                      {item}
                    </span>
                  </li>
                ) : null
              )}
            </ul>
          </div>
        </div>

        {/* --- BOTTOM BAR --- */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-black/10 pt-8 sm:flex-row">
          <p className="text-foreground text-xs font-medium">
            {copyrightText ||
              `© ${new Date().getFullYear()} ${person.name}. All rights reserved.`}
          </p>
          <p className="text-foreground text-xs font-medium">{tagline}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

"use client";
/**
 * @file Footer.tsx
 * @description Global footer orchestrator. Hydrates bio, navigation, and expertise
 * data from TinaCMS. Optimized for dark mode with subtle border transitions.
 * @dependencies
 * - UI: `ArrowUpRight`, `useTina`, `IconMapper`
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
  const { data: footerData } = useTina({ ...footerResponse });
  const { copyrightText, tagline } = footerData.footer;

  const { data: peopleData } = useTina({ ...peopleResponse });

  const person = {
    name: peopleData.people.identity.name,
    bio: peopleData.people.bio?.[0]?.text || "",
    skills: peopleData.people.skills,
    socials: peopleData.people.socials,
  };

  const { data: globalData } = useTina({ ...globalResponse });
  const {
    global: { navLinks: links },
  } = globalData;

  return (
    <footer
      id="footer"
      className="bg-background overflow-hidden border-t border-black/10 py-16 transition-colors duration-500 dark:border-zinc-800 dark:bg-zinc-950"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 grid gap-10 md:grid-cols-4">
          {/* --- COLUMN 1: Bio & Socials --- */}
          <div className="md:col-span-2">
            <Link
              href="/"
              className="text-foreground group inline-block text-2xl font-black transition-transform duration-300 hover:scale-105 dark:text-zinc-50"
            >
              {person.name}
              <span className="text-brand dark:text-brand-400 group-hover:text-foreground transition-colors duration-300">
                .
              </span>
            </Link>

            <p className="text-foreground mt-4 max-w-sm text-sm leading-relaxed transition-colors duration-300 dark:text-zinc-400">
              {person.bio}
            </p>

            {person.socials && (
              <div className="mt-6 flex items-center gap-3">
                {person.socials.map((item, i) => {
                  if (!item || !item.platform) return null;
                  const Icon = getSocialIcon(item.platform);
                  const finalHref =
                    item.platform === "Email" && !item.url.startsWith("mailto:")
                      ? `mailto:${item.url}`
                      : item.url;

                  return (
                    <Link
                      key={i}
                      href={finalHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground hover:bg-brand dark:hover:bg-brand-400 border-linen rounded-lg border p-2 transition-all duration-300 hover:text-white dark:border-zinc-800 dark:text-zinc-50"
                    >
                      <Icon size={18} />
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* --- COLUMN 2: Navigation --- */}
          <div>
            <h4 className="text-foreground mb-6 text-xs font-bold tracking-wider uppercase transition-colors duration-300 dark:text-zinc-500">
              Navigation
            </h4>
            <ul className="space-y-3">
              {links?.map((link) => (
                <li key={link?.label}>
                  <Link
                    href={link.href}
                    className="text-foreground hover:text-brand dark:hover:text-brand-400 group inline-flex items-center gap-1 text-sm font-medium transition-all duration-300 hover:translate-x-1 dark:text-zinc-400"
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
            <h4 className="text-foreground mb-6 text-xs font-bold tracking-wider uppercase transition-colors duration-300 dark:text-zinc-500">
              Expertise
            </h4>
            <ul className="space-y-3">
              {person.skills?.slice(0, 6).map((item, index) => (
                <li key={index}>
                  <span className="text-foreground hover:text-brand dark:hover:text-brand-400 block cursor-default text-sm transition-all duration-300 hover:translate-x-1 dark:text-zinc-400">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* --- BOTTOM BAR --- */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-black/10 pt-8 transition-colors duration-300 sm:flex-row dark:border-zinc-800">
          <p className="text-foreground text-xs font-medium dark:text-zinc-500">
            {copyrightText || `© ${new Date().getFullYear()} ${person.name}.`}
          </p>
          <p className="text-foreground text-xs font-medium dark:text-zinc-500">
            {tagline}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

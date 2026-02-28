/**
 * @file Profile.tsx
 * @description Renders a professional profile section with a staggered layout.
 * Features automated dark mode theme switching and rolling micro-interactions.
 */
import Image from "next/image";

import { ArrowRight } from "lucide-react";

import { type PeopleQuery } from "@/../tina/__generated__/types";
import { getSocialIcon } from "@/components/IconMapper";
import { RevealWrapper } from "@/components/RevealWrapper";
import RollingLabel from "@/components/RollingLabel";
import { cn } from "@/lib/utils";

interface ProfileProps {
  invert?: boolean;
  person: PeopleQuery["people"];
}

const Profile = ({
  invert = false,
  person: { identity, socials, bio, skills, callToAction },
}: ProfileProps) => {
  return (
    <div className="grid grid-cols-1 items-center justify-center gap-10 py-12 pb-16 transition-colors duration-300 lg:gap-12 xl:grid-cols-12">
      {/* --- PROFILE CARD COLUMN --- */}
      {identity && (
        <RevealWrapper asChild>
          <div
            className={cn(
              "flex justify-center xl:col-span-5",
              invert && "xl:order-last"
            )}
          >
            <div className="group ease-in-out-expo relative w-full max-w-sm duration-300 hover:scale-[1.01]">
              <div className="border-linen overflow-hidden rounded-2xl border bg-white shadow-xl transition-colors md:rounded-3xl dark:border-zinc-800 dark:bg-zinc-900">
                {/* Avatar / Initials Container */}
                <div className="bg-linen flex aspect-4/5 items-center justify-center transition-colors dark:bg-zinc-800/50">
                  {identity.avatar ? (
                    <Image
                      src={identity.avatar}
                      alt={identity.name}
                      width={400} // Increased for better resolution on retina
                      height={500}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="text-clay/40 text-6xl font-bold select-none md:text-8xl dark:text-zinc-600">
                      {identity.initials}
                    </span>
                  )}
                </div>

                {/* Profile Details */}
                <div className="reveal-item border-linen border-t p-5 md:p-6 dark:border-zinc-800">
                  <h3 className="text-foreground text-xl font-bold transition-colors md:text-2xl dark:text-zinc-50">
                    {identity.name}
                  </h3>
                  <p className="reveal-item text-brand dark:text-brand-400 mt-1 text-sm font-medium transition-colors md:text-base">
                    {identity.role}
                  </p>

                  {/* Social Links */}
                  {socials && socials.length > 0 && (
                    <div className="mt-4 flex items-center gap-2">
                      {socials.map((item, i) => {
                        if (!item) return null;
                        const Icon = getSocialIcon(item.platform);
                        return (
                          <a
                            key={i}
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="reveal-item text-foreground hover:bg-brand dark:hover:bg-brand-500 border-linen rounded-lg border p-2 transition-all duration-300 hover:text-white dark:border-zinc-800 dark:text-zinc-400"
                          >
                            <Icon size={18} />
                          </a>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              {/* Availability Badge */}
              <div className="bg-brand dark:bg-brand-500 absolute -right-3 -bottom-3 -rotate-12 rounded-lg px-3 py-1.5 text-white shadow-lg transition-transform duration-300 group-hover:rotate-0 md:-right-4 md:-bottom-4 md:rounded-xl md:px-4 md:py-2 dark:text-white">
                <span className="text-xs font-semibold tracking-wider uppercase md:text-sm">
                  {identity.availabilityBadge}
                </span>
              </div>
            </div>
          </div>
        </RevealWrapper>
      )}

      {/* --- CONTENT COLUMN --- */}
      <RevealWrapper asChild>
        <div
          className={cn(
            "flex flex-col justify-center text-center lg:text-left xl:col-span-7",
            invert && "xl:order-first"
          )}
        >
          {/* Bio Paragraphs */}
          {bio &&
            bio.map((paragraph, index) => {
              const parts = paragraph!.text.split(paragraph?.highlight || "");
              return (
                <p
                  key={index}
                  className="reveal-item text-clay mb-6 text-sm leading-relaxed transition-colors last:mb-8 md:text-base dark:text-zinc-400"
                >
                  {parts[0]}
                  {parts.length > 1 && (
                    <span className="text-foreground font-bold transition-colors dark:text-zinc-100">
                      {paragraph!.highlight}
                    </span>
                  )}
                  {parts[1]}
                </p>
              );
            })}

          {/* Skills Tags */}
          {skills && (
            <div className="mb-8">
              <p className="reveal-item text-clay/70 mb-3 text-[10px] font-bold tracking-wider uppercase md:text-xs dark:text-zinc-500">
                Expertise
              </p>
              <div className="reveal-item flex flex-wrap justify-center gap-2 lg:justify-start">
                {skills.map((skill, i) => (
                  <div
                    key={i}
                    className="group border-clay/30 hover:border-brand dark:hover:border-brand-400 hover:text-brand dark:hover:text-brand-400 text-foreground relative h-8 overflow-hidden rounded-full border px-16 py-1.5 text-[10px] font-semibold whitespace-nowrap transition-colors duration-200 sm:px-22 sm:text-xs md:text-sm dark:border-zinc-800 dark:text-zinc-300"
                  >
                    <RollingLabel rollingLabels={{ label1: skill! }} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Call to Action Button */}
          {callToAction && (
            <div className="reveal-item flex justify-center lg:justify-start">
              <button className="group bg-brand dark:bg-brand-500 relative flex cursor-pointer items-center rounded-full px-12 py-5 text-sm font-semibold text-white transition-all duration-500 hover:px-20 active:scale-95 md:px-16 md:py-6 md:text-base md:hover:px-30 dark:text-white">
                <RollingLabel
                  rollingLabels={{
                    label1: callToAction.ctaPrimary,
                    label2:
                      callToAction.ctaSecondary || callToAction.ctaPrimary,
                  }}
                />
                <ArrowRight className="absolute top-1/2 right-4 h-5 w-5 -translate-y-1/2 transform opacity-0 transition-opacity group-hover:opacity-100" />
              </button>
            </div>
          )}
        </div>
      </RevealWrapper>
    </div>
  );
};

export default Profile;

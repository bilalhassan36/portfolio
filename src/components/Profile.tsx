/**
 * File: src/components/Profile.tsx
 * Purpose: Render person's profile card, socials, bio, skills and CTA.
 * Component: Server component (presentational)
 * Client-safe: Yes
 * Presentational: Yes
 * Key dependencies:
 *  - `lucide-react` for icons
 *  - Tina generated `PersonQuery` types
 *  - `IconMapper` to resolve social icons
 *  - `RollingLabel` for animated labels (encapsulated)
 */
import { ArrowRight } from "lucide-react";

import { type PersonQuery } from "@/../tina/__generated__/types";
import { getSocialIcon } from "@/components/IconMapper";
import RollingLabel from "@/components/RollingLabel";

interface ProfileProps {
  person: PersonQuery["person"];
}

const Profile = ({
  person: { identity, socials, bio, skills, callToAction },
}: ProfileProps) => {
  return (
    <div className="grid-col-1 grid items-center justify-center gap-10 py-12 pb-16 lg:gap-12 xl:grid-cols-6">
      {/* Profile card (visuals + socials) */}
      {identity && (
        <div className="flex justify-center xl:col-span-2">
          <div className="group ease-in-out-expo relative w-full max-w-sm duration-300 hover:scale-[1.01]">
            <div className="border-linen overflow-hidden rounded-2xl border shadow-xl md:rounded-3xl">
              <div className="bg-linen flex aspect-4/5 items-center justify-center">
                {/* initials (non-interactive) */}
                <span className="text-clay/40 text-6xl font-bold select-none md:text-8xl">
                  {identity.initials}
                </span>
              </div>
              <div className="border-linen border-t p-5 md:p-6">
                <h3 className="text-foreground text-xl font-bold md:text-2xl">
                  {identity.name}
                </h3>
                <p className="text-brand mt-1 text-sm font-medium md:text-base">
                  {identity.role}
                </p>
                {socials && socials.length > 0 && (
                  <div className="mt-4 flex items-center gap-2">
                    {socials.map((item, i: number) => {
                      if (!item) return null;

                      const Icon = getSocialIcon(item.platform);

                      return (
                        <a
                          key={i}
                          href={item.url}
                          target="_blank"
                          className="text-foreground hover:bg-brand border-linen hover:text-background rounded-lg border p-2 transition-colors duration-300"
                        >
                          <Icon size={18} />
                        </a>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* availability badge */}
            <div className="bg-brand absolute -right-3 -bottom-3 -rotate-12 rounded-lg px-3 py-1.5 text-white shadow-lg transition-transform duration-300 group-hover:rotate-0 md:-right-4 md:-bottom-4 md:rounded-xl md:px-4 md:py-2">
              <span className="text-xs font-semibold md:text-sm">
                {identity.availabilityBadge}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Right column: bio, skills and CTA */}
      <div className="flex flex-col justify-center text-center lg:text-left xl:col-span-4">
        {bio &&
          bio.map((paragraph, index: number) => {
            const parts = paragraph!.text.split(paragraph?.highlight || "");
            return (
              <p
                key={index}
                className="text-clay mb-6 text-sm leading-relaxed last:mb-8 md:text-base"
              >
                {parts[0]}
                {parts.length > 1 && (
                  <span className="text-foreground font-bold">
                    {paragraph!.highlight}
                  </span>
                )}
                {parts[1]}
              </p>
            );
          })}

        {/* Skills grid */}
        {skills && (
          <div className="mb-8">
            <p className="text-clay/70 mb-3 text-[10px] font-bold tracking-wider uppercase md:text-xs">
              Skills
            </p>
            <div className="flex flex-wrap justify-center gap-2 lg:justify-start">
              {skills.map((skill, i) => (
                <div
                  key={i}
                  className="group border-clay hover:border-brand hover:text-brand ease-in-out-expo text-foreground relative h-8 overflow-hidden rounded-full border px-16 py-1.5 text-[10px] font-semibold whitespace-nowrap duration-200 sm:px-22 sm:text-xs md:text-sm"
                >
                  {/* RollingLabel handles client animation internally */}
                  <RollingLabel rollingLabels={{ label1: skill! }} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        {callToAction && (
          <div className="flex justify-center lg:justify-start">
            <button className="group bg-brand relative flex cursor-pointer items-center rounded-full px-12 py-5 text-sm font-semibold text-white transition-all duration-500 hover:px-20 md:px-16 md:py-6 md:text-base md:hover:px-30">
              <RollingLabel
                rollingLabels={{
                  label1: callToAction.ctaPrimary,
                  label2: callToAction.ctaSecondary || callToAction.ctaPrimary,
                }}
              />
              <ArrowRight className="absolute top-1/2 right-4 h-5 w-5 -translate-y-1/2 transform opacity-0 transition-opacity group-hover:opacity-100" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;

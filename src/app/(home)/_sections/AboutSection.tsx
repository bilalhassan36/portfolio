/**
 * @file AboutSection.tsx
 * @description Renders the About section on the homepage, combining the section header and user profile.
 * Designed as a Server Component.
 * * @dependencies
 * - Types: `HomepageQuery`, `PeopleQuery` (TinaCMS generated)
 * - UI: `Profile`, `RevealWrapper`, `SectionHeader`
 */
import {
  type HomepageQuery,
  type PeopleQuery,
} from "@/../../tina/__generated__/types";
import Profile from "@/components/Profile";
import { RevealWrapper } from "@/components/RevealWrapper";
import SectionHeader from "@/components/SectionHeader";

interface AboutSectionProps {
  content: HomepageQuery["homepage"]["aboutSection"];
  person: PeopleQuery["people"];
}

const AboutSection = ({ content, person }: AboutSectionProps) => {
  if (!content) return null;

  return (
    <section
      id="aboutSection"
      // Cascading text colors to children; backgrounds left untouched.
      className="text-zinc-900 transition-colors duration-300 dark:text-zinc-100"
    >
      <RevealWrapper>
        <SectionHeader content={content} animationClass="reveal-item" />
      </RevealWrapper>

      <Profile person={person} />
    </section>
  );
};

export default AboutSection;

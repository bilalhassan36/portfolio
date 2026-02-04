/**
 * File: src/app/(home)/_sections/AboutSection.tsx
 * Purpose: Renders the About section on the homepage (section header + profile).
 * Component: Server component (renders on server).
 * Client-safe: Yes
 * Presentational: Yes
 * Key dependencies:
 *  - `@/../../tina/__generated__/types` : `HomepageQuery`, `PeopleQuery` types
 *  - `@/components/Profile`, `@/components/SectionHeader` : UI components
 * Notes:
 *  - Expects `content` and `person` shaped according to TinaCMS generated types.
 */
import {
  type HomepageQuery,
  type PeopleQuery,
} from "@/../../tina/__generated__/types";
import Profile from "@/components/Profile";
import SectionHeader from "@/components/SectionHeader";

// Props: `content` from homepage.aboutSection and `person` from PeopleQuery
interface AboutSectionProps {
  content: HomepageQuery["homepage"]["aboutSection"];
  person: PeopleQuery["people"];
}

const AboutSection = ({ content, person }: AboutSectionProps) => {
  // Guard: nothing to render without content
  if (!content) return null;

  return (
    <section id="aboutSection">
      {/* Header driven by `content` */}
      <SectionHeader content={content} />
      {/* Profile component renders person details */}
      <Profile person={person} />
    </section>
  );
};

export default AboutSection;

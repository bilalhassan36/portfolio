"use client";

/**
 * File: src/app/(home)/team/TeamPage.tsx
 * Purpose: Team listing page — hydrates TinaCMS preview data and renders
 * a `PageHero` followed by `Profile` cards for each team member.
 * Component: Client (uses `useTina` hook)
 * Client-safe: Yes
 * Presentational: No — acts as a page/container for team members
 * Key dependencies:
 *  - `tinacms/react` : `useTina` for preview/live-edit hydration
 *  - `@/../tina/__generated__/client` : generated types for queries
 *  - `PageHero`, `Profile`, `Container` components for layout and cards
 */
import { useTina } from "tinacms/react";

import type client from "@/../tina/__generated__/client";
import Callout from "@/components/Callout";
import Container from "@/components/Container";
import PageHero from "@/components/PageHero";
import Profile from "@/components/Profile";

type PageResponse = Awaited<ReturnType<typeof client.queries.pages>>;
type GlobalResponse = Awaited<ReturnType<typeof client.queries.global>>;

interface TeamPageProps {
  teamPageResponse: PageResponse;
  globalResponse: GlobalResponse;
}

const TeamPage = ({ teamPageResponse, globalResponse }: TeamPageProps) => {
  // hydrate Tina preview data so components show live edits during preview
  const { data: teamPageData } = useTina({
    ...teamPageResponse,
  });

  const { data: globalData } = useTina({
    ...globalResponse,
  });

  return (
    <Container className="flex min-h-screen flex-col items-center gap-6 py-32">
      <PageHero data={teamPageData.pages} />
      {/* PageHero: receives the server-provided `pages` object for hero content */}
      {/* Render team members from global data (guard nulls) */}
      {globalData.global.teamMembers?.map((member, i) => {
        if (!member?.member) return null;

        return (
          <Profile
            // key: use stable Tina id when available
            key={member.member?.id}
            person={member.member}
            // `invert` alternates layout for odd-indexed profiles (visual variation)
            invert={i % 2 === 1}
          />
        );
      })}

      {/* Optional callout at the bottom of the page, using `pages.callout` */}
      <Callout data={teamPageData.pages.callout} className="w-full" />
    </Container>
  );
};

export default TeamPage;

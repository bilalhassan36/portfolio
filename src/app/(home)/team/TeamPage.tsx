/**
 * @file TeamPage.tsx
 * @description Client-side orchestrator for the Team section.
 * Handles live-preview hydration for page content and the global team registry.
 * @dependencies
 * - TinaCMS: `useTina` for hydration
 * - UI: `Container`, `PageHero`, `Profile`, `Callout`
 */
"use client";

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
  const { data: teamPageData } = useTina({
    ...teamPageResponse,
  });

  const { data: globalData } = useTina({
    ...globalResponse,
  });

  return (
    <Container
      // Synchronizing typography and theme transitions across the whole team view
      className="flex min-h-screen flex-col items-center gap-6 py-32 text-zinc-900 transition-colors duration-300 dark:text-zinc-50"
    >
      <PageHero data={teamPageData.pages} />

      {/* Renders individual Profile components.
          The 'invert' prop ensures a staggered visual layout (Left vs Right alignment).
      */}
      <div className="flex w-full flex-col gap-12 md:gap-24">
        {globalData.global.teamMembers?.map((member, i) => {
          if (!member?.member) return null;

          return (
            <Profile
              key={member.member?.id || i}
              person={member.member}
              invert={i % 2 === 1}
            />
          );
        })}
      </div>

      <Callout data={teamPageData.pages.callout} className="w-full" />
    </Container>
  );
};

export default TeamPage;

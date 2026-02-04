"use client";
import { useEffect } from "react";

import { useTina } from "tinacms/react";

import type client from "@/../tina/__generated__/client";
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

  // Initialize client-only smooth scroll library dynamically to avoid
  // loading it on the server bundle; run once on mount.
  useEffect(() => {
    (async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;

      new LocomotiveScroll();
    })();
  }, []);

  return (
    <Container className="flex min-h-screen flex-col items-center gap-6 py-32">
      <PageHero data={teamPageData.pages} />
      {globalData.global.teamMembers?.map((member, i) => {
        if (!member?.member) return null;

        return (
          <Profile
            key={member.member?.id}
            person={member.member}
            invert={i % 2 === 1}
          />
        );
      })}
    </Container>
  );
};

export default TeamPage;

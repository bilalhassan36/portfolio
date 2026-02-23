"use client";
import { useTina } from "tinacms/react";

import type client from "@/../tina/__generated__/client";
import Callout from "@/components/Callout";
import Container from "@/components/Container";
import PageHero from "@/components/PageHero";

import LogoMarquee from "./LogoMarque";
import MasonryGallery from "./MasonryGallery";

type PageResponse = Awaited<ReturnType<typeof client.queries.pages>>;
type GlobalResponse = Awaited<ReturnType<typeof client.queries.global>>;

interface PortfolioPageProps {
  portfolioResponse: PageResponse;
  globalResponse: GlobalResponse;
}

const PortfolioPage = ({
  portfolioResponse,
  globalResponse,
}: PortfolioPageProps) => {
  const { data: portfolioPageData } = useTina({
    ...portfolioResponse,
  });

  const { data: globalData } = useTina({
    ...globalResponse,
  });

  return (
    <Container className="flex min-h-screen flex-col items-center gap-6 py-32">
      <PageHero data={portfolioPageData.pages} />
      <LogoMarquee brands={globalData.global.clientBrands} />
      <MasonryGallery images={globalData.global.gallery} />
      <Callout data={portfolioPageData.pages.callout} className="w-full" />
    </Container>
  );
};

export default PortfolioPage;

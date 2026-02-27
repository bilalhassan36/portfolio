/**
 * @file page.tsx
 * @description Server route for individual case study pages (/caseStudies/[id]).
 * Handles static path generation, metadata formulation, and data fetching.
 * @dependencies
 * - Next.js: `notFound`, `generateStaticParams`, `generateMetadata`
 * - TinaCMS: `client.queries` for fetching case study and global data
 */
import { notFound } from "next/navigation";

import { client } from "@/../tina/__generated__/client";

import CaseStudyDetails from "./CaseStudyDetailsPage";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const globalResponse = await client.queries.global({
    relativePath: "index.json",
  });

  const caseStudiesConfig = globalResponse.data.global.caseStudyConfig;
  const caseStudies = caseStudiesConfig?.studyList || [];
  const featuredStudyId = caseStudiesConfig?.featuredStudy?.id;

  const params = caseStudies
    .map((studyItem) => {
      const rawId = studyItem?.study?.id || "";
      const slug = rawId
        .split("/")
        .pop()
        ?.replace(/\.(mdx?|json)$/, "");

      return slug ? { id: slug } : null;
    })
    .filter((param): param is { id: string } => param !== null);

  if (featuredStudyId) {
    const featuredSlug = featuredStudyId
      .split("/")
      .pop()
      ?.replace(/\.(mdx?|json)$/, "");

    if (featuredSlug && !params.find((p) => p.id === featuredSlug)) {
      params.unshift({ id: featuredSlug });
    }
  }

  return params.slice(0, 5);
}

export async function generateMetadata(props: PageProps) {
  const id = (await props.params).id;

  return {
    title: `${id} - Case Study`,
    // Corrected the hardcoded name and niche to match your profile.
    // Architectural Note: Consider fetching the actual study excerpt from TinaCMS here in the future.
    description: `Explore Bilal Hassan's success stories and insights in this detailed Amazon Brand Managing case study.`,
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { id } = await params;

  const caseStudyResponse = await client.queries.caseStudy({
    relativePath: `${id}.json`,
  });

  if (!caseStudyResponse.data?.caseStudy) {
    return notFound();
  }

  return <CaseStudyDetails caseStudyResponse={caseStudyResponse} />;
}

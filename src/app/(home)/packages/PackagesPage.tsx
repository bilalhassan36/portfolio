/**
 * @file PackagesPage.tsx
 * @description Main client-side orchestrator for the pricing section.
 * Manages billing period state and hydrates TinaCMS data for both
 * the static page content and the global pricing configuration.
 * @dependencies
 * - TinaCMS: `useTina` for hydration
 * - UI: `BillingToggle`, `Table`, `Callout`, `Container`, `PageHero`
 */
"use client";

import { useState } from "react";

import { useTina } from "tinacms/react";

import type client from "@/../tina/__generated__/client";
import { BillingToggle } from "@/app/(home)/packages/BillingToggle";
import Callout from "@/components/Callout";
import Container from "@/components/Container";
import PageHero from "@/components/PageHero";
import { RevealWrapper } from "@/components/RevealWrapper";

import { Table } from "./Table";

type GlobalResponse = Awaited<ReturnType<typeof client.queries.global>>;
type PagesResponse = Awaited<ReturnType<typeof client.queries.pages>>;

interface PackagesPageProps {
  globalResponse: GlobalResponse;
  pageResponse: PagesResponse;
}

export type BillingPeriod = "weekly" | "monthly" | "yearly";

const PackagesPage = ({ globalResponse, pageResponse }: PackagesPageProps) => {
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>("monthly");

  const { data: globalData } = useTina({
    ...globalResponse,
  });

  const { data: pageData } = useTina({
    ...pageResponse,
  });

  if (!globalData.global.pricingTable) {
    return null;
  }

  return (
    <Container
      // Cascading text defaults for dark mode to ensure total readability
      // across all child components (Table, Hero, Callout).
      className="flex min-h-screen flex-col items-center gap-4 py-32 text-zinc-900 transition-colors duration-300 dark:text-zinc-50"
    >
      <PageHero data={pageData.pages} />

      <RevealWrapper asChild>
        <section className="flex w-full flex-col items-center gap-12">
          <BillingToggle
            currentPeriod={billingPeriod}
            onPeriodChange={setBillingPeriod}
          />

          <Table
            config={globalData.global.pricingTable}
            billingPeriod={billingPeriod}
          />
        </section>
      </RevealWrapper>

      <Callout data={pageData.pages.callout} className="w-full" />
    </Container>
  );
};

export default PackagesPage;

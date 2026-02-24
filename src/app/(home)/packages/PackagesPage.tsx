"use client";

/**
 * File: src/app/(home)/packages/PackagesPage.tsx
 * Purpose: Client page for the Packages section — hydrates Tina preview data
 * and renders the packages pricing UI (billing toggle + pricing table).
 * Component: Client (uses `useState` and `useTina`)
 * Client-safe: Yes
 * Presentational: No — page/container with interactive controls
 * Key dependencies:
 *  - `tinacms/react` : `useTina` for preview/live-edit data
 *  - `BillingToggle` : switch billing period
 *  - `Table`/`AnimatedPrice` : pricing UI
 */
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
  // local UI state for selected billing cadence
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>("monthly");

  // hydrate Tina preview data for global and page contexts
  const { data: globalData } = useTina({
    ...globalResponse,
  });

  const { data: pageData } = useTina({
    ...pageResponse,
  });

  // guard: pricingTable must exist in global settings
  if (!globalData.global.pricingTable) {
    return null;
  }

  return (
    <Container className="flex min-h-screen flex-col items-center gap-4 py-32">
      {/* PageHero consumes the server-provided `pages` payload for hero content */}
      <PageHero data={pageData.pages} />

      <RevealWrapper asChild>
        <section className="flex flex-col items-center gap-12">
          <BillingToggle
            currentPeriod={billingPeriod}
            onPeriodChange={setBillingPeriod}
          />
          {/* Table builds the pricing matrix from `global.pricingTable` */}
          <Table
            config={globalData.global.pricingTable}
            billingPeriod={billingPeriod}
          />
        </section>
      </RevealWrapper>

      {/* Optional callout at the bottom of the page, using `pages.callout` */}
      <Callout data={pageData.pages.callout} className="w-full" />
    </Container>
  );
};

export default PackagesPage;

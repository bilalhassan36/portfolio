/**
 * @file page.tsx
 * @description Server route for the Contact page. Handles metadata formulation
 * and parallel data fetching for page content and form configurations.
 * @dependencies
 * - TinaCMS: `client.queries` for fetching pages and form configuration
 */
import { client } from "@/../tina/__generated__/client";

import ContactPageContent from "./ContactPage";

export const metadata = {
  title: "Contact",
  description:
    "Get in touch to discuss you brand growth, Amazon strategies, or just to say hi! I'm always open to new opportunities and collaborations.",
};

export default async function ContactPage() {
  // 1. Fetch Page Content (Hero, Headlines, etc.)
  const pageRes = await client.queries.pages({
    relativePath: "contact.mdx",
  });

  // 2. Fetch Form Configuration (Global Settings, Labels, Services)
  const formRes = await client.queries.formConfig({
    relativePath: "index.json",
  });

  return <ContactPageContent pageProp={pageRes} formProp={formRes} />;
}

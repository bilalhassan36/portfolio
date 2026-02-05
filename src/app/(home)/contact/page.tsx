import { client } from "@/../tina/__generated__/client";

import ContactPageContent from "./ContactPage";

export default async function ContactPage() {
  // 1. Fetch Page Content (Hero)
  const pageRes = await client.queries.pages({
    relativePath: "contact.mdx",
  });

  // 2. Fetch Form Configuration (Global Settings)
  const formRes = await client.queries.formConfig({
    relativePath: "index.json",
  });

  return <ContactPageContent pageProp={pageRes} formProp={formRes} />;
}

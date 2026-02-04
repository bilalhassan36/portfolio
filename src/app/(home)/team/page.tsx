import client from "@/../tina/__generated__/client";

import TeamPage from "./TeamPage";

const Page = async () => {
  const pageResponse = await client.queries.pages({
    relativePath: "team.mdx",
  });

  const globalResponse = await client.queries.global({
    relativePath: "index.json",
  });

  return (
    <TeamPage teamPageResponse={pageResponse} globalResponse={globalResponse} />
  );
};

export default Page;

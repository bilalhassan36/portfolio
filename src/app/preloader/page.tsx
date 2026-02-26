import client from "@/../tina/__generated__/client";
import PreloaderPage from "@/app/preloader/PreloaderPage";

const page = async () => {
  const preloaderResponse = await client.queries.preloader({
    relativePath: "index.json",
  });

  return <PreloaderPage preloaderResponse={preloaderResponse} />;
};

export default page;

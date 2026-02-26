"use client";

import { useTina } from "tinacms/react";

import type client from "@/../tina/__generated__/client";
import Preloader from "@/components/Preloader";

type PreloaderConfigResponse = Awaited<
  ReturnType<typeof client.queries.preloader>
>;

interface preloaderPageProps {
  preloaderResponse: PreloaderConfigResponse;
}

const PreloaderPage = ({ preloaderResponse }: preloaderPageProps) => {
  const { data: preloaderData } = useTina({
    ...preloaderResponse,
  });

  return (
    <Preloader
      isLivePreview={true} // Pass this prop to enable TinaCMS editing mode
      data={preloaderData.preloader}
    />
  );
};

export default PreloaderPage;

import type { Metadata } from "next";

import client from "@/../tina/__generated__/client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Preloader from "@/components/Preloader";
import { ScrollLockProvider } from "@/components/providers/scroll-lock-provider";

export const metadata: Metadata = {
  title: "Bilal Portfolio",
  description: "Personal portfolio of Bilal as PPC Manager",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navbarResponse = await client.queries.navbar({
    relativePath: "index.json",
  });
  const footerResponse = await client.queries.footer({
    relativePath: "index.json",
  });
  const globalResponse = await client.queries.global({
    relativePath: "index.json",
  });
  const peopleResponse = await client.queries.people({
    relativePath: "bilal-hassan.json",
  });

  const preloaderResponse = await client.queries.preloader({
    relativePath: "index.json",
  });

  return (
    <>
      {/* Manage scroll state globally */}
      <ScrollLockProvider>
        <Preloader data={preloaderResponse.data?.preloader} />
        <Navbar
          globalResponse={globalResponse}
          navbarResponse={navbarResponse}
          socials={peopleResponse.data.people.socials}
        />
        {children}
        <Footer
          footerResponse={footerResponse}
          peopleResponse={peopleResponse}
          globalResponse={globalResponse}
        />
      </ScrollLockProvider>
    </>
  );
}

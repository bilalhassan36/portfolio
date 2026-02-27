/**
 * @file ContactPageContent.tsx
 * @description Client-side layout component for the main contact page.
 * Hydrates TinaCMS data for both the page content and global form configuration,
 * orchestrating the PageHero, ContactForm, and ContactSidebar.
 * @dependencies
 * - TinaCMS: `useTina` for live-editing hydration
 * - UI: `Container`, `PageHero`, `ContactForm`, `ContactSidebar`
 */
"use client";

import { useTina } from "tinacms/dist/react";

import type client from "@/../tina/__generated__/client";
import Container from "@/components/Container";
import PageHero from "@/components/PageHero";

import { ContactForm } from "./ContactForm";
import { ContactSidebar } from "./ContactLayouts";

type PageQueryResponse = Awaited<ReturnType<typeof client.queries.pages>>;
type FormConfigQueryResponse = Awaited<
  ReturnType<typeof client.queries.formConfig>
>;

interface ContactPageContentProps {
  pageProp: PageQueryResponse;
  formProp: FormConfigQueryResponse;
}

export default function ContactPageContent({
  pageProp,
  formProp,
}: ContactPageContentProps) {
  const { data: pageData } = useTina({
    query: pageProp.query,
    variables: pageProp.variables,
    data: pageProp.data,
  });

  const { data: formData } = useTina({
    query: formProp.query,
    variables: formProp.variables,
    data: formProp.data,
  });

  const contactPage = pageData.pages;
  const formSettings = formData.formConfig;

  return (
    <Container
      // Applying cascading text colors here to cleanly propagate down to the PageHero and form layout
      className="flex min-h-screen flex-col items-center gap-6 py-32 text-zinc-900 transition-colors duration-300 dark:text-zinc-50"
    >
      <PageHero data={contactPage} />

      <div className="w-full pt-16 pb-24">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-12">
          <div className="order-2 lg:order-1 lg:col-span-8">
            <ContactForm
              formId={formSettings.formspreeId}
              services={formSettings.services}
              budgets={formSettings.budgets}
              labels={formSettings.labels}
            />
          </div>

          <div className="order-1 lg:order-2 lg:col-span-4">
            <ContactSidebar data={formSettings.sidebar} />
          </div>
        </div>
      </div>
    </Container>
  );
}

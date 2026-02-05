"use client";

import { useTina } from "tinacms/dist/react";

import type client from "@/../tina/__generated__/client";
import Container from "@/components/Container";
import PageHero from "@/components/PageHero";

import { ContactForm } from "./ContactForm";
import { ContactSidebar } from "./ContactLayouts";

// --- TYPE INFERENCE ---
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
  // 1. Live Hook for Page Content
  const { data: pageData } = useTina({
    query: pageProp.query,
    variables: pageProp.variables,
    data: pageProp.data,
  });

  // 2. Live Hook for Form Config
  const { data: formData } = useTina({
    query: formProp.query,
    variables: formProp.variables,
    data: formProp.data,
  });

  const contactPage = pageData.pages;
  const formSettings = formData.formConfig;

  return (
    <Container className="flex min-h-screen flex-col items-center gap-6 py-32">
      <PageHero data={contactPage} />

      <div className="pt-16 pb-24">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Form Area */}
          <div className="order-2 lg:order-1 lg:col-span-8">
            <ContactForm
              formId={formSettings.formspreeId}
              services={formSettings.services}
              budgets={formSettings.budgets}
              labels={formSettings.labels}
            />
          </div>

          {/* Sidebar Area */}
          <div className="order-1 lg:order-2 lg:col-span-4">
            <ContactSidebar data={formSettings.sidebar} />
          </div>
        </div>
      </div>
    </Container>
  );
}

import { type Collection } from "tinacms";

const FormConfig: Collection = {
  name: "formConfig",
  label: "Form Settings",
  path: "content/formConfig",
  format: "json",
  ui: {
    // Prevent creating multiple form configs (act as Singleton)
    allowedActions: { create: false, delete: false },
    router: () => {
      return `/contact`;
    },
  },
  fields: [
    // --- Form Logic ---
    {
      name: "formspreeId",
      label: "Formspree Form ID",
      type: "string",
    },
    {
      name: "services",
      label: "Service Options",
      type: "string",
      list: true,
    },
    {
      name: "budgets",
      label: "Budget Options",
      type: "string",
      list: true,
    },

    // --- Form Labels & UI Text ---
    {
      name: "labels",
      label: "Form Labels & UI",
      type: "object",
      fields: [
        // 1. Personal Info
        { name: "nameLabel", label: "Name Label", type: "string" },
        { name: "namePlaceholder", label: "Name Placeholder", type: "string" },
        { name: "emailLabel", label: "Email Label", type: "string" },
        {
          name: "emailPlaceholder",
          label: "Email Placeholder",
          type: "string",
        },

        // 2. Business Info
        { name: "companyLabel", label: "Company Label", type: "string" },
        {
          name: "companyPlaceholder",
          label: "Company Placeholder",
          type: "string",
        },
        { name: "websiteLabel", label: "Website Label", type: "string" },
        {
          name: "websitePlaceholder",
          label: "Website Placeholder",
          type: "string",
        },

        // 3. Dropdowns
        { name: "serviceLabel", label: "Service Label", type: "string" },
        { name: "budgetLabel", label: "Budget Label", type: "string" },

        // 4. Message Area
        { name: "messageLabel", label: "Message Label", type: "string" },
        {
          name: "messagePlaceholder",
          label: "Message Placeholder",
          type: "string",
        },

        // 5. Button & Modal
        { name: "submitText", label: "Submit Button Text", type: "string" },
        { name: "successTitle", label: "Success Modal Title", type: "string" },
        {
          name: "successMessage",
          label: "Success Modal Message",
          type: "string",
          ui: { component: "textarea" },
        },
      ],
    },

    // --- Sidebar Info ---
    {
      type: "object",
      name: "sidebar",
      label: "Sidebar Contact Info",
      fields: [
        { name: "email", label: "Email", type: "string" },
        { name: "phone", label: "Phone", type: "string" },
        { name: "address", label: "Address", type: "string" },
        { name: "hours", label: "Hours", type: "string" },
        {
          name: "responseTime",
          label: "Response Time Text",
          type: "string",
          description: "e.g. 'Usually within 24 hours on business days.'",
        },
      ],
    },
  ],
};

export default FormConfig;

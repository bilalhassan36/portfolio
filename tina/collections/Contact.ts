// tina/collections/contact.ts
import { type Collection } from "tinacms";

const Form: Collection = {
  name: "form",
  label: "Contact Form",
  path: "content/form",
  format: "json",
  ui: {
    allowedActions: {
      create: false,
      delete: false,
    },
  },
  fields: [
    // --- FORM CONFIGURATION ---
    {
      type: "object",
      name: "form",
      label: "Form Configuration",
      fields: [
        {
          type: "string",
          name: "formspreeId",
          label: "Formspree Form ID",
          description: "The ID from your Formspree dashboard",
        },
        {
          type: "string",
          name: "services",
          label: "Service Options",
          list: true,
          ui: { component: "list" },
        },
        {
          type: "string",
          name: "budgets",
          label: "Budget Options",
          list: true,
          ui: { component: "list" },
        },
      ],
    },
  ],
};

export default Form;

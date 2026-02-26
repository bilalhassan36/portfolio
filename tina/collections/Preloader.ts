/**
 * File: tina/collections/preloader.ts
 * Purpose: Standalone collection for the global Preloader configuration.
 */
import { type Collection } from "tinacms";

const PreloaderConfig: Collection = {
  name: "preloader",
  label: "Preloader Settings",
  path: "content/preloader",
  format: "json",
  ui: {
    // Acts as a singleton. Editors can only edit the existing file, not make new ones.
    allowedActions: {
      create: false,
      delete: false,
    },
    router: () => "/preloader", // Redirect to the Preloader editing page when clicking this collection in the sidebar
  },
  fields: [
    {
      type: "boolean",
      name: "enabled",
      label: "Enable Preloader",
      description: "Toggle the preloader on or off for the site.",
    },

    {
      type: "object",
      name: "name",
      label: "Main Name",
      fields: [
        { type: "string", name: "first", label: "First Name", required: true },
        { type: "string", name: "last", label: "Last Name", required: true },
      ],
    },
    {
      type: "object",
      name: "titles",
      label: "Hero Titles",
      fields: [
        { type: "string", name: "line1", label: "Line 1", required: true },
        { type: "string", name: "line2", label: "Line 2", required: true },
        { type: "string", name: "line3", label: "Line 3", required: true },
      ],
    },
    {
      type: "object",
      name: "metrics",
      label: "Counter Metrics",
      fields: [
        {
          type: "string",
          name: "label",
          label: "Metric Label",
          required: true,
        },
        {
          type: "number",
          name: "targetRevenue",
          label: "Target Revenue / Value",
          description: "The number the chart will count up to (e.g., 2000000)",
          required: true,
        },
      ],
    },
  ],
};

export default PreloaderConfig;

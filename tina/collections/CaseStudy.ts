import { type Collection } from "tinacms";

const CaseStudy: Collection = {
  name: "caseStudy",
  label: "Case Studies",
  path: "content/caseStudies",
  format: "json",
  ui: {
    // This generates the filename from the Headline automatically
    filename: {
      readonly: false,
      slugify: (values) => {
        return values?.headline
          ? values.headline
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/(^-|-$)+/g, "")
          : "new-case-study";
      },
    },
    router: ({ document }) => {
      return `/caseStudies/${document._sys.filename}`;
    },
  },
  fields: [
    { type: "boolean", name: "featured", label: "Is Featured?" },
    {
      type: "string",
      name: "industry",
      label: "Industry",
      options: ["Consumer Goods", "Tech", "Fashion", "Health", "Home"],
    },
    {
      type: "string",
      name: "headline",
      label: "Headline",
      isTitle: true,
      required: true,
    },
    {
      type: "string",
      name: "description",
      label: "Short Description",
      ui: { component: "textarea" },
    },
    { type: "string", name: "tags", label: "Tags", list: true },

    // --- Author Info ---
    {
      type: "object",
      name: "author",
      label: "Author / Client",
      fields: [
        { type: "string", name: "name", label: "Name" },
        { type: "string", name: "role", label: "Role" },
        {
          type: "string",
          name: "quote",
          label: "Quote",
          ui: { component: "textarea" },
        },
      ],
    },

    // --- Metrics Grid ---
    {
      type: "object",
      name: "metrics",
      label: "Key Metrics",
      list: true,
      ui: {
        itemProps: (item) => ({ label: item?.label || "New Metric" }),
      },
      fields: [
        { type: "string", name: "label", label: "Label (e.g. Revenue Growth)" },
        { type: "string", name: "value", label: "Value (e.g. +275%)" },
        {
          type: "string",
          name: "trend",
          label: "Trend Direction",
          options: ["up", "down", "neutral"],
        },
      ],
    },

    // --- Details (For the Inner Page) ---

    {
      type: "object",
      name: "details",
      label: "Case Study Details",
      fields: [
        {
          type: "string",
          name: "challenge",
          label: "The Challenge",
          ui: { component: "textarea" },
        },
        {
          type: "string",
          name: "solution",
          label: "The Solution",
          ui: { component: "textarea" },
        },
        {
          type: "string",
          name: "results",
          label: "The Results",
          ui: { component: "textarea" },
        },

        // 👇 NEW: BEFORE / AFTER TABLE
        {
          type: "object",
          name: "beforeAfter",
          label: "Before & After Metrics",
          list: true,
          ui: { itemProps: (item) => ({ label: item?.metric || "Metric" }) },
          fields: [
            {
              type: "string",
              name: "metric",
              label: "Metric Name (e.g. ROAS)",
            },
            { type: "string", name: "before", label: "Before Value" },
            { type: "string", name: "after", label: "After Value" },
          ],
        },

        // 👇 NEW: PROOF GALLERY
        {
          type: "object",
          name: "proofImages",
          label: "Proof Gallery",
          list: true,
          fields: [
            { type: "image", name: "src", label: "Image" },
            {
              type: "string",
              name: "label",
              label: "Label (e.g. Sales Graph)",
            },
            { type: "string", name: "description", label: "Caption" },
          ],
        },

        // 👇 NEW: HIGHLIGHTS (Sidebar)
        {
          type: "object",
          name: "highlights",
          label: "Sidebar Highlights",
          list: true,
          fields: [
            { type: "string", name: "title", label: "Title" },
            { type: "string", name: "description", label: "Description" },
          ],
        },
      ],
    },
  ],
};

export default CaseStudy;

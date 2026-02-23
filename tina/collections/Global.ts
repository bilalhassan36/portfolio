import { type Collection } from "tinacms";

// 1. GLOBAL (Data Only - The Single Source of Truth)
const Global: Collection = {
  name: "global",
  label: "Global / Site Config",
  path: "content/global",
  format: "json",
  ui: {
    allowedActions: { create: false, delete: false },
  },
  fields: [
    {
      name: "navLinks",
      label: "Navigation Links",
      type: "object",
      list: true,
      required: true,
      ui: { itemProps: (item) => ({ label: item?.label }) },
      fields: [
        { name: "label", label: "Label", type: "string", required: true },
        { name: "href", label: "URL", type: "string", required: true },
      ],
    },
    {
      name: "teamMembers",
      label: "Team Members List",
      type: "object",
      list: true,
      ui: {
        // Optional: Tries to show the person's filename in the list
        itemProps: (item) => ({
          label:
            item?.member?.replace("content/people/", "").replace(".json", "") ||
            "Select Member",
        }),
      },
      fields: [
        {
          name: "member",
          label: "Person",
          type: "reference",
          collections: ["people"],
        },
      ],
    },
    {
      name: "pricingTable",
      label: "Pricing Table Config",
      type: "object",
      fields: [
        // A. Which Packages to show?
        {
          name: "activePackages",
          label: "Active Packages (Columns)",
          type: "object",
          list: true,
          ui: {
            itemProps: (item) => ({
              label: item?.package
                ? item.package
                    .replace("content/packages/", "")
                    .replace(".json", "")
                : "Select Package",
            }),
          },
          fields: [
            { name: "package", type: "reference", collections: ["packages"] },
          ],
        },

        // B. Summary Rows (Top Section)
        {
          name: "summaryRows",
          label: "Summary Rows (Top)",
          type: "object",
          list: true,
          ui: { itemProps: (item) => ({ label: item?.label || "New Row" }) },
          fields: [
            { name: "label", label: "Label", type: "string" },
            { name: "key", label: "Data Key", type: "string" },
          ],
        },

        // C. Detailed Sections (Categorized)
        {
          name: "sections",
          label: "Feature Categories",
          type: "object",
          list: true,
          ui: {
            itemProps: (item) => ({
              label: item?.categoryName || "New Category",
            }),
          },
          fields: [
            { name: "categoryName", label: "Category Name", type: "string" },
            {
              name: "rows",
              label: "Rows",
              type: "object",
              list: true,
              ui: {
                itemProps: (item) => ({ label: item?.label || "New Row" }),
              },
              fields: [
                { name: "label", label: "Label", type: "string" },
                { name: "key", label: "Data Key", type: "string" },
              ],
            },
          ],
        },
      ],
    },
    {
      type: "object",
      name: "companyStats",
      label: "Company Statistics",
      list: true,
      ui: { itemProps: (item) => ({ label: item?.label || "New Stat" }) },
      fields: [
        { type: "string", name: "value", label: "Value (e.g. 50+)" },
        { type: "string", name: "label", label: "Label (e.g. Clients)" },
      ],
    },
    {
      type: "object",
      name: "caseStudyConfig",
      label: "Case Study Manager",
      fields: [
        // 1. Featured (Single Reference is fine directly)
        {
          type: "reference",
          name: "featuredStudy",
          label: "Featured Case Study (Hero)",
          description: "Select the study to show at the top with the big card.",
          collections: ["caseStudy"],
        },

        // 2. Grid Sequence (WRAPPED LIST)
        {
          name: "studyList",
          label: "Grid Sequence",
          description: "Drag and drop to reorder the list below.",
          type: "object",
          list: true,
          ui: {
            // This shows the filename in the drag-and-drop list so you know what you are moving
            itemProps: (item) => ({
              label: item?.study
                ? item.study
                    .replace("content/caseStudies/", "")
                    .replace(".json", "")
                : "Select Case Study",
            }),
          },
          fields: [
            {
              name: "study",
              label: "Case Study",
              type: "reference",
              collections: ["caseStudy"],
            },
          ],
        },
      ],
    },
    {
      type: "object",
      name: "clientBrands",
      label: "Client Brands (Marquee)",
      description: "Logos displayed in the scrolling marquee across the site.",
      list: true,
      ui: {
        // This makes the CMS list view cleaner by showing the brand name instead of "Item 1, Item 2"
        itemProps: (item) => {
          return { label: item?.name || "New Brand" };
        },
      },
      fields: [
        {
          type: "string",
          name: "name",
          label: "Brand Name",
          description: "Used for alt text and CMS organization.",
        },
        {
          type: "image",
          name: "logo",
          label: "Brand Logo",
          description:
            "Upload a high-quality logo (transparent PNG/SVG recommended).",
        },
      ],
    },
    {
      type: "object",
      name: "gallery",
      label: "Masonry Gallery",
      description: "Images displayed in the masonry grid layout.",
      list: true,
      ui: {
        // Displays the image title in the CMS sidebar for easier sorting
        itemProps: (item) => {
          return { label: item?.title || "New Gallery Image" };
        },
      },
      fields: [
        {
          type: "image",
          name: "src",
          label: "Image",
          description: "Upload the high-res image.",
          required: true,
        },
        {
          type: "string",
          name: "title",
          label: "Title",
          description: "e.g., 'Campaign Manager Overview'",
        },
        {
          type: "string",
          name: "label",
          label: "Tag/Label",
          description: "e.g., 'Dashboard', 'Analytics', 'Growth'",
        },
      ],
    },
    {
      type: "object",
      name: "blogConfig",
      label: "Blog Configuration",
      fields: [
        {
          type: "reference",
          name: "featuredPost",
          label: "Featured Blog Post",
          collections: ["blog"], // Must match the `name` of your Blog collection
          description:
            "Select the post to highlight at the top of the blog page.",
        },
        {
          type: "object",
          name: "postList",
          label: "Standard Blog Posts",
          description:
            "Add and drag to reorder the standard blog posts in the grid.",
          list: true,
          ui: {
            itemProps: (item) => ({
              // Extracts the filename for a cleaner label in the CMS sidebar
              label:
                item?.post?.split("/").pop()?.replace(".mdx", "") ||
                "Select a post",
            }),
          },
          fields: [
            {
              type: "reference",
              name: "post",
              label: "Blog Post",
              collections: ["blog"],
            },
          ],
        },
      ],
    },
  ],
};

export default Global;

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
  ],
};

export default Global;

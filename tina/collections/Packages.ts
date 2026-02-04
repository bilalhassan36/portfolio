import { type Collection } from "tinacms";

// 1. Define the Package Collection
const Packages: Collection = {
  name: "packages",
  label: "Packages",
  path: "content/packages",
  format: "json",
  ui: {
    router: () => {
      return `/packages`;
    },
  },
  fields: [
    { name: "name", label: "Plan Name", type: "string", required: true },
    { name: "isPopular", label: "Highlight (Popular)", type: "boolean" },
    {
      name: "price",
      label: "Pricing",
      type: "object",
      fields: [
        { name: "weekly", label: "Weekly Price", type: "string" },
        { name: "monthly", label: "Monthly Price", type: "string" },
        { name: "yearly", label: "Yearly Price", type: "string" },
      ],
    },
    // The Flexible Feature List
    {
      name: "features",
      label: "Feature Values",
      type: "object",
      list: true,
      ui: {
        itemProps: (item) => ({
          label: `${item?.key || "New"}: ${item?.value || "Check"}`,
        }),
      },
      fields: [
        {
          name: "key",
          label: "Feature Key",
          type: "string",
          description: "Must match the Key in Global Table (e.g. 'sku_count')",
          required: true,
        },
        {
          name: "value",
          label: "Value",
          type: "string",
          description: "Enter text ('1-4 SKUs') OR 'check' OR 'cross'.",
        },
      ],
    },
  ],
};

export default Packages;

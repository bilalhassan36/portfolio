import { type Collection } from "tinacms";

// 1. GLOBAL (Data Only - The Single Source of Truth)
const Global: Collection = {
  name: "global",
  label: "Global / Site Config",
  path: "content/global",
  format: "json",
  ui: {
    allowedActions: { create: false, delete: false },
    router: () => "/",
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
  ],
};

export default Global;

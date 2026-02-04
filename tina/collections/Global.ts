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
          name: "member", // The actual link
          label: "Person",
          type: "reference", // 👈 Single Reference (No list here)
          collections: ["people"],
        },
      ],
    },
  ],
};

export default Global;

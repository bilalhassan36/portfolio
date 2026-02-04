import { type Collection } from "tinacms";

// NAVBAR COLLECTION
const Header: Collection = {
  name: "navbar",
  label: "Navbar Visuals",
  path: "content/navbar",
  format: "json",
  ui: {
    allowedActions: { create: false, delete: false },
  },
  fields: [
    { name: "logoText", label: "Logo Text", type: "string", required: true },
    {
      name: "cta",
      label: "Header CTA",
      type: "object",
      fields: [
        { name: "label", label: "Label", type: "string", required: true },
        { name: "hoverLabel", label: "Hover Label", type: "string" },
        { name: "href", label: "Link", type: "string" },
      ],
    },
  ],
};

export default Header;

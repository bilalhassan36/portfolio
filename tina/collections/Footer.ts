import { type Collection } from "tinacms";

// FOOTER COLLECTION
const Footer: Collection = {
  name: "footer",
  label: "Footer Visuals",
  path: "content/footer",
  format: "json",
  ui: {
    router: () => "/#footer",
    allowedActions: { create: false, delete: false },
  },
  fields: [
    { name: "copyrightText", label: "Copyright", type: "string" },
    { name: "tagline", label: "Bottom Tagline", type: "string" },
  ],
};

export default Footer;

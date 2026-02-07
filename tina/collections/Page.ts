import { type Collection } from "tinacms";

const Page: Collection = {
  name: "pages",
  label: "Pages",
  path: "content/pages",
  format: "mdx",
  ui: {
    router: ({ document }) => `/${document._sys.filename}`,
  },
  fields: [
    {
      name: "titleSimple",
      label: "Simple Title",
      type: "string",
      required: true,
    },
    {
      name: "titleHighlight",
      label: "Highlight Title",
      type: "string",
      required: true,
    },
    {
      name: "supportingText",
      label: "Supporting Text",
      type: "string",
      ui: { component: "textarea" },
    },
    {
      name: "callout",
      label: "Callout",
      type: "object",
      fields: [
        { name: "enabled", label: "Enabled", type: "boolean" },
        { name: "label", label: "Label", type: "string" },
        { name: "headline", label: "Headline", type: "string" },
        { name: "emphasis", label: "Emphasis (highlight)", type: "string" },
        {
          name: "copy",
          label: "Supporting Copy",
          type: "string",
          ui: { component: "textarea" },
        },
        { name: "icon", label: "Icon", type: "string" },
        {
          name: "variant",
          label: "Variant",
          type: "string",
          options: ["full", "compact", "sidebar"],
        },
        {
          name: "primary",
          label: "Primary Button",
          type: "object",
          fields: [
            { name: "label", label: "Label", type: "string" },
            { name: "url", label: "URL", type: "string" },
          ],
        },
        {
          name: "secondary",
          label: "Secondary Button",
          type: "object",
          fields: [
            { name: "label", label: "Label", type: "string" },
            { name: "url", label: "URL", type: "string" },
          ],
        },
      ],
    },
  ],
};

export default Page;

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
  ],
};

export default Page;

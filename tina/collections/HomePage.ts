// tina/collections/homepage.ts
import type { Collection } from "tinacms";

const HomePage: Collection = {
  name: "homepage",
  label: "Home Page",
  path: "content/pages",
  format: "mdx",
  ui: {
    router: () => "/",
  },
  fields: [
    {
      name: "heroSection",
      label: "Hero Section",
      type: "object",
      fields: [
        {
          name: "greeting",
          label: "Greeting (Italic)",
          type: "string",
          required: true,
        },
        {
          name: "name",
          label: "Name (Main Heading)",
          type: "string",
          required: true,
        },
        {
          name: "role",
          label: "Role (Subtitle)",
          type: "string",
          required: true,
        },
        {
          name: "description",
          label: "Description",
          type: "object",
          fields: [
            {
              name: "text",
              label: "Full Text",
              type: "string",
              ui: { component: "textarea" },
            },
            {
              name: "highlight",
              label: "Highlight Phrase (Must match text exactly)",
              type: "string",
            },
          ],
        },
        {
          name: "buttons",
          label: "Call to Actions",
          type: "object",
          fields: [
            {
              name: "primary",
              label: "Primary Button",
              type: "object",
              required: true,
              fields: [
                {
                  name: "label",
                  label: "Label",
                  type: "string",
                  required: true,
                },
                { name: "url", label: "URL", type: "string", required: true },
                { name: "hoverLabel", label: "Hover Label", type: "string" },
              ],
            },
            {
              name: "secondary",
              label: "Secondary Button",
              type: "object",
              required: true,
              fields: [
                {
                  name: "label",
                  label: "Label",
                  type: "string",
                  required: true,
                },
                { name: "url", label: "URL", type: "string", required: true },
                { name: "hoverLabel", label: "Hover Label", type: "string" },
              ],
            },
          ],
        },
        {
          name: "stats",
          label: "Statistics Grid",
          type: "object",
          list: true,
          ui: {
            itemProps: (item) => {
              return { label: `${item?.value} - ${item?.label}` };
            },
          },
          fields: [
            {
              name: "value",
              label: "Value (e.g. 10+)",
              type: "string",
            },
            {
              name: "label",
              label: "Label (e.g. Years Exp)",
              type: "string",
            },
          ],
        },
      ],
    },
    {
      name: "auditSection",
      label: "Audit / Offer Section",
      type: "object",
      fields: [
        {
          name: "label",
          label: "Eyebrow Label",
          type: "string",
          required: true,
        },
        {
          name: "title",
          label: "Main Title",
          type: "string",
          required: true,
        },
        {
          name: "worth",
          label: "Value Statement (e.g. $500 Value)",
          type: "string",
        },
        {
          name: "description",
          label: "Description",
          type: "string",
          ui: { component: "textarea" },
        },
        {
          name: "benefits",
          label: "Benefit Points (List)",
          type: "string",
          list: true,
        },
        {
          name: "cta",
          label: "Call to Action",
          type: "object",
          fields: [
            { name: "label", label: "Label", type: "string", required: true },
            { name: "url", label: "URL", type: "string", required: true },
            { name: "hoverLabel", label: "Hover Label", type: "string" },
          ],
        },

        {
          name: "ticket",
          label: "Ticket Card Visualization",
          type: "object",
          fields: [
            { name: "header", label: "Header Text", type: "string" },
            { name: "badge", label: "Badge Text", type: "string" },
            {
              name: "mainValue",
              label: "Main Big Text (e.g. FREE)",
              type: "string",
            },
            { name: "subLabel", label: "Sub Label", type: "string" },
            {
              name: "breakdown",
              label: "Price Breakdown Items",
              type: "object",
              list: true,
              ui: {
                itemProps: (item) => ({
                  label: `${item?.label} - ${item?.value}`,
                }),
              },
              fields: [
                { name: "label", label: "Item Label", type: "string" },
                { name: "value", label: "Value String", type: "string" },
              ],
            },
          ],
        },
      ],
    },
    {
      type: "object",
      name: "aboutSection",
      label: "About Section Settings",
      fields: [
        {
          type: "string",
          name: "eyebrow",
          label: "Eyebrow Text (Small)",
          required: true,
        },
        {
          type: "string",
          name: "headlineMain",
          label: "Main Headline",
          required: true,
        },
        {
          type: "string",
          name: "headlineHighlight",
          label: "Highlighted Word",
          required: true,
        },
      ],
    },
  ],
};

export default HomePage;

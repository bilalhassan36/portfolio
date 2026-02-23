/**
 * File: tina/collections/blog.ts (or added to your tina config)
 * Purpose: Schema for Blog posts to power the new modular UI.
 */
import { type Collection } from "tinacms";

const Blog: Collection = {
  name: "blog",
  label: "Blog Posts",
  path: "content/blog",
  format: "mdx", // Assuming MDX for blog content
  ui: {
    filename: {
      readonly: false,
      slugify: (values) => {
        return values?.title
          ? values.title
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/(^-|-$)+/g, "")
          : "new-blog-post";
      },
    },
    router: ({ document }) => {
      return `/blog/${document._sys.filename}`;
    },
  },
  fields: [
    { type: "boolean", name: "featured", label: "Is Featured?" },
    {
      type: "string",
      name: "category",
      label: "Category",
      options: ["Engineering", "Design", "Business", "Updates", "Tutorial"], // Adjust to your actual categories
    },
    {
      type: "string",
      name: "title",
      label: "Title",
      isTitle: true,
      required: true,
    },
    {
      type: "string",
      name: "excerpt",
      label: "Excerpt",
      ui: { component: "textarea" },
    },
    {
      type: "datetime",
      name: "date",
      label: "Published Date",
      required: true,
    },
    {
      type: "number",
      name: "readingTime",
      label: "Reading Time (minutes)",
      required: true,
    },
    {
      type: "object",
      name: "author",
      label: "Author",
      fields: [
        { type: "string", name: "name", label: "Name" },
        { type: "string", name: "initials", label: "Initials (e.g., HM)" },
      ],
    },
    {
      type: "rich-text",
      name: "body",
      label: "Post Body",
      isBody: true,
    },
  ],
};

export default Blog;

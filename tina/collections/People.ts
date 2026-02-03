import { type Collection } from "tinacms";

const People: Collection = {
  label: "People",
  name: "person",
  path: "content/people",
  format: "json",
  ui: {
    // Optional: Helps you identify the file in the CMS list
    filename: {
      slugify: (values) => {
        // Auto-generates filename from name (e.g. "Jane Doe" -> "jane-doe.json")
        return values?.identity?.name
          ? values.identity.name.toLowerCase().replace(/ /g, "-")
          : "new-person";
      },
    },
    router: async () => {
      return `/`;
    },
  },
  fields: [
    // 1. IDENTITY OBJECT
    {
      type: "object",
      name: "identity",
      label: "Identity & Role",
      required: true,
      fields: [
        {
          type: "string",
          name: "name",
          label: "Full Name",
          required: true,
        }, // isTitle makes this the list label
        {
          type: "string",
          name: "initials",
          label: "Initials (Avatar)",
          required: true,
        },
        { type: "string", name: "role", label: "Job Title", required: true },
        {
          type: "string",
          name: "availabilityBadge",
          label: "Status Badge",
          required: false,
        },
      ],
    },

    // 2. CONTACT OBJECT
    {
      type: "object",
      name: "contact",
      label: "Contact & Resume",
      fields: [
        { type: "string", name: "email", label: "Email Address" },
        { type: "string", name: "phone", label: "Phone Number" },
        {
          type: "image",
          name: "resumeUrl",
          label: "Resume Upload (PDF)",
        },
        { type: "string", name: "resumeSize", label: "File Size Label" },
      ],
    },

    // 3. SOCIALS LIST
    {
      type: "object",
      name: "socials",
      label: "Social Media Links",
      list: true,
      ui: {
        itemProps: (item) => ({ label: item?.platform || "New Link" }),
      },
      fields: [
        { type: "string", name: "platform", label: "Platform", required: true },
        { type: "string", name: "url", label: "URL", required: true },
      ],
    },

    // 4. SKILLS LIST
    {
      type: "string",
      name: "skills",
      label: "Tech Stack / Skills",
      list: true,
    },

    // 5. BIO
    {
      type: "object",
      name: "bio",
      label: "Biography",
      list: true,

      ui: {
        itemProps: (item) => ({
          label: item?.text
            ? item.text.substring(0, 30) + "..."
            : "Bio Paragraph",
        }),
      },
      fields: [
        {
          type: "string",
          name: "text",
          label: "Paragraph Text",
          ui: { component: "textarea" },
          required: true,
        },
        {
          type: "string",
          name: "highlight",
          label: "Highlight Phrase",
        },
      ],
    },

    // 6. CALL TO ACTION BUTTONS
    {
      type: "object",
      name: "callToAction",
      label: "Call to Action Buttons",

      fields: [
        {
          type: "string",
          name: "ctaPrimary",
          label: "Button Label 1",
          required: true,
        },
        { type: "string", name: "ctaSecondary", label: "Button Label 2" },
        {
          type: "string",
          name: "ctaLink",
          label: "Button Link",
        },
      ],
    },
  ],
};

export default People;
